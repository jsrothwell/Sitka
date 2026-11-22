#!/usr/bin/env node
// Builds machine-readable entry points so coding agents can use Sitka without scraping pages:
//   public/llms.txt          – every docs page with its one-line description (llmstxt.org format)
//   public/components.json   – each React component: import, props, tokens used, docs + Figma links
//
// Sources are the same ones the site renders from (navigation.ts, page descriptions,
// component prop types), so the manifest can't drift from the docs.
// Run: npm run agents:build   (also runs before `npm run build`)
import { readFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import ts from "typescript";
import { ROOT, VERSION, writeIfChanged } from "../tokens/lib.mjs";

const SITE = "https://jsrothwell.github.io/Sitka";
const read = (p) => readFileSync(resolve(ROOT, p), "utf8");

// ── Navigation (transpile navigation.ts and evaluate it) ───────────────────────
const navJs = ts.transpileModule(read("src/site/navigation.ts"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { navigation } = await import(`data:text/javascript;base64,${Buffer.from(navJs).toString("base64")}`);

/** First PageHeader description (or metadata description) on a page, flattened to one line. */
function describe(href) {
  if (href.startsWith("http")) return "";
  const file = join(ROOT, "src/app", href === "/" ? "" : href, "page.tsx");
  if (!existsSync(file)) return "";
  const src = readFileSync(file, "utf8");
  const m = src.match(/<PageHeader[\s\S]*?description=(?:"([^"]*)"|\{\s*["'`]([^"'`]*)["'`]\s*\})/) ?? src.match(/description:\s*["'`]([^"'`]+)["'`]/);
  return (m?.[1] ?? m?.[2] ?? "").replace(/\s+/g, " ").trim();
}

const sections = navigation.map((section) => ({
  title: section.title,
  groups: [
    ...(section.items ? [{ title: null, items: section.items }] : []),
    ...(section.groups ?? []),
  ],
}));

let llms = `# Sitka Design System

> Cross-platform design system (web, iOS, macOS, Android, visionOS), version ${VERSION}. Tokens live in W3C DTCG JSON and are generated for CSS, TypeScript, React Native, Compose and Swift. React components ship as \`sitka-ui\`; Swift tokens ship as the \`SitkaTokens\` Swift package.

Rules for generating code with Sitka:
- Use tokens, never raw colours: CSS \`rgb(var(--token))\`, Swift \`Color.sitka(\\.token)\`. Status colours as text use \`--status-*-text\`; text on the accent uses \`--on-accent\`.
- Import React components from \`sitka-ui\`. Props, tokens and docs links for each are in ${SITE}/components.json.
- Every pattern page lists accessibility requirements; follow them.

## Machine-readable files
- [components.json](${SITE}/components.json): React components with props, tokens used, docs and Figma links
- [tokens.json](${SITE}/downloads/sitka-tokens.json): all design tokens (W3C DTCG)
- [SitkaTokens.swift](${SITE}/downloads/SitkaTokens.swift): generated Swift tokens
`;
for (const section of sections) {
  llms += `\n## ${section.title}\n`;
  for (const group of section.groups) {
    if (group.title) llms += `\n### ${group.title}\n`;
    for (const item of group.items) {
      const url = item.href.startsWith("http") ? item.href : `${SITE}${item.href === "/" ? "/" : `${item.href}/`}`;
      const d = describe(item.href);
      llms += `- [${item.title}](${url})${d ? `: ${d}` : ""}\n`;
    }
  }
}

// ── Components ────────────────────────────────────────────────────────────────
const program = ts.createProgram([resolve(ROOT, "packages/sitka-ui/src/index.ts")], { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, target: ts.ScriptTarget.ES2022, strict: true, skipLibCheck: true, baseUrl: ROOT, paths: { "@/*": ["src/*"] } });
const checker = program.getTypeChecker();

function propsOf(fileRel, component) {
  // Match by repo-relative path: the checkout may be reached through differently-cased paths.
  const sf = program.getSourceFiles().find((f) => f.fileName.toLowerCase().endsWith(fileRel.toLowerCase()));
  if (!sf) return [];
  let decl;
  ts.forEachChild(sf, (n) => {
    if ((ts.isInterfaceDeclaration(n) || ts.isTypeAliasDeclaration(n)) && n.name.text === `${component}Props`) decl = n;
  });
  if (!decl) return [];
  const type = checker.getTypeAtLocation(decl);
  return type
    .getProperties()
    .filter((p) => {
      // Own props only: skip everything inherited from React/DOM attribute types.
      const d = p.declarations?.[0];
      return d && !d.getSourceFile().fileName.includes("node_modules");
    })
    .map((p) => {
      const d = p.declarations[0];
      const pt = checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(p, d));
      // Spell out literal unions ("primary" | "secondary" …) instead of alias names like ButtonVariant.
      const t =
        pt.isUnion() && pt.types.every((u) => u.isStringLiteral() || u.isNumberLiteral())
          ? pt.types.map((u) => JSON.stringify(u.value)).join(" | ")
          : checker.typeToString(pt, undefined, ts.TypeFormatFlags.NoTruncation);
      const doc = ts.displayPartsToString(p.getDocumentationComment(checker)).trim();
      return { name: p.name, type: t, required: !(p.flags & ts.SymbolFlags.Optional), ...(doc ? { description: doc } : {}) };
    });
}

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const index = read("packages/sitka-ui/src/index.ts");
const components = [];
for (const m of index.matchAll(/export \{([^}]+)\} from "\.\.\/\.\.\/\.\.\/src\/components\/ui\/(\w+)"/g)) {
  const names = m[1].split(",").map((s) => s.trim()).filter(Boolean);
  const fileRel = `src/components/ui/${m[2]}.tsx`;
  const file = resolve(ROOT, fileRel);
  const src = readFileSync(file, "utf8");
  const tokens = [...new Set([...src.matchAll(/var\(--([a-z0-9-]+)\)/g)].map((x) => x[1]))].sort();
  const figmaFile = resolve(ROOT, `.figma/react/${m[2]}.figma.tsx`);
  const figma = existsSync(figmaFile) ? readFileSync(figmaFile, "utf8").match(/https:\/\/www\.figma\.com\/design\/[^"']+/)?.[0] : undefined;
  for (const name of names) {
    const docsDir = resolve(ROOT, "src/app/components", kebab(name));
    components.push({
      name,
      import: `import { ${name} } from "sitka-ui";`,
      source: fileRel,
      docs: existsSync(docsDir) ? `${SITE}/components/${kebab(name)}/` : undefined,
      description: existsSync(docsDir) ? describe(`/components/${kebab(name)}`) || undefined : undefined,
      figma: name === m[2] ? figma : undefined,
      props: propsOf(fileRel, name),
      tokens,
    });
  }
}

const manifest = { $comment: "Generated by scripts/agents/build.mjs. Do not edit.", name: "sitka-ui", version: VERSION, docs: SITE, components };

for (const [path, content] of [
  ["public/llms.txt", llms],
  ["public/components.json", JSON.stringify(manifest, null, 2) + "\n"],
]) {
  console.log(`${writeIfChanged(path, content) ? "wrote    " : "unchanged"} ${path}`);
}
console.log(`${components.length} components, ${components.filter((c) => c.props.length).length} with props, ${components.filter((c) => c.figma).length} with Figma links`);
