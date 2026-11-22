#!/usr/bin/env node
// Sitka MCP server. Zero dependencies: MCP over stdio is newline-delimited JSON-RPC 2.0.
//
// Data comes from a local Sitka checkout when one is found (SITKA_ROOT, or the repo this file
// lives in), otherwise from the published docs site (SITKA_URL, default below).
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";

const PROTOCOL_VERSION = "2025-06-18";
const SITE = (process.env.SITKA_URL || "https://jsrothwell.github.io/Sitka").replace(/\/$/, "");
const here = dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.SITKA_ROOT || resolve(here, "../..");
const LOCAL = existsSync(resolve(ROOT, "src/tokens/tokens.json"));

const SOURCES = {
  components: { local: "public/components.json", remote: "/components.json", json: true },
  tokens: { local: "src/tokens/tokens.json", remote: "/downloads/sitka-tokens.json", json: true },
  llms: { local: "public/llms.txt", remote: "/llms.txt", json: false },
};
const cache = new Map();
async function load(name) {
  if (cache.has(name)) return cache.get(name);
  const src = SOURCES[name];
  let text;
  if (LOCAL) text = await readFile(resolve(ROOT, src.local), "utf8");
  else {
    const res = await fetch(SITE + src.remote);
    if (!res.ok) throw new Error(`GET ${SITE + src.remote} → ${res.status}`);
    text = await res.text();
  }
  const value = src.json ? JSON.parse(text) : text;
  cache.set(name, value);
  return value;
}

// ── Token helpers ────────────────────────────────────────────────────────────
function* leaves(node, path = []) {
  if (node && typeof node === "object" && "$value" in node) {
    yield { path: path.join("."), type: node.$type, value: node.$value, description: node.$description };
    return;
  }
  for (const [k, v] of Object.entries(node ?? {})) {
    if (k.startsWith("$") || typeof v !== "object") continue;
    yield* leaves(v, [...path, k]);
  }
}
function lookup(tokens, path) {
  return path.split(".").reduce((n, k) => (n == null ? n : n[k]), tokens);
}
function resolveRef(tokens, value, depth = 0) {
  if (depth > 10) return value;
  if (Array.isArray(value)) return value.map((v) => resolveRef(tokens, v, depth + 1));
  if (value && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolveRef(tokens, v, depth + 1)]));
  if (typeof value !== "string") return value;
  const m = value.match(/^\{(.+)\}$/);
  if (!m) return value;
  const target = lookup(tokens, m[1]) ?? lookup(tokens, "color." + m[1]);
  return target && "$value" in target ? resolveRef(tokens, target.$value, depth + 1) : value;
}
function parseColor(input) {
  const s = String(input).trim();
  let m = s.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  m = s.match(/^#([0-9a-f]{3})$/i);
  if (m) return [...m[1]].map((c) => parseInt(c + c, 16));
  m = s.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (m) return [m[1], m[2], m[3]].map(Number);
  m = s.match(/^(\d+)\s+(\d+)\s+(\d+)$/); // CSS var triplet
  if (m) return [m[1], m[2], m[3]].map(Number);
  return null;
}
const luminance = ([r, g, b]) => {
  const ch = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
async function colorFor(input, theme) {
  const direct = parseColor(input);
  if (direct) return { rgb: direct, source: input };
  const tokens = await load("tokens");
  const name = String(input).replace(/^--/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const candidates = [`color.themes.${theme}.${name}`, name, `color.${name}`];
  for (const p of candidates) {
    const node = lookup(tokens, p);
    if (node && "$value" in node) {
      const rgb = parseColor(resolveRef(tokens, node.$value));
      if (rgb) return { rgb, source: p };
    }
  }
  throw new Error(`Unknown colour or token "${input}". Use a hex value or a theme token such as textSecondary.`);
}

// ── Tools ────────────────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: "list_components",
    description: "List Sitka React components with their import line and one-line description.",
    inputSchema: { type: "object", properties: {} },
    run: async () => {
      const { components } = await load("components");
      return components.map((c) => `${c.name} — ${c.import}${c.description ? `\n  ${c.description}` : ""}`).join("\n");
    },
  },
  {
    name: "get_component",
    description: "Props (with types), tokens used, docs and Figma links for one Sitka React component.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "Component name, e.g. Button" } },
      required: ["name"],
    },
    run: async ({ name }) => {
      const { components } = await load("components");
      const c = components.find((x) => x.name.toLowerCase() === String(name).toLowerCase());
      if (!c) throw new Error(`No component "${name}". Call list_components for the full list.`);
      return JSON.stringify(c, null, 2);
    },
  },
  {
    name: "get_tokens",
    description:
      "Design tokens under a path, with references resolved. Examples: color.themes.dark, color.themes.light, spacing, typography.fontSize, motion.duration. Omit path for the top-level groups.",
    inputSchema: { type: "object", properties: { path: { type: "string" } } },
    run: async ({ path } = {}) => {
      const tokens = await load("tokens");
      if (!path) return "Top-level groups: " + Object.keys(tokens).filter((k) => !k.startsWith("$") && k !== "meta").join(", ");
      const node = lookup(tokens, path);
      if (!node) throw new Error(`No tokens at "${path}".`);
      const rows = [...leaves(node, path.split("."))].map((t) => {
        const resolved = resolveRef(tokens, t.value);
        const v = typeof resolved === "string" ? resolved : JSON.stringify(resolved);
        return `${t.path} (${t.type ?? "?"}) = ${v}${t.description ? ` — ${t.description}` : ""}`;
      });
      return rows.length ? rows.join("\n") : JSON.stringify(node, null, 2);
    },
  },
  {
    name: "search_docs",
    description: "Search the Sitka docs index (llms.txt) and return matching pages with URLs.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"],
    },
    run: async ({ query }) => {
      const text = await load("llms");
      const terms = String(query).toLowerCase().split(/\s+/).filter(Boolean);
      const hits = text
        .split("\n")
        .filter((l) => l.startsWith("- ["))
        .map((l) => ({ l, score: terms.filter((t) => l.toLowerCase().includes(t)).length }))
        .filter((h) => h.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 15);
      return hits.length ? hits.map((h) => h.l).join("\n") : `No pages match "${query}".`;
    },
  },
  {
    name: "check_contrast",
    description:
      "WCAG 2.2 contrast ratio between two colours. Each can be a hex/rgb value or a theme token name (textSecondary, --status-danger-text). Reports AA/AAA for normal text, large text and UI components.",
    inputSchema: {
      type: "object",
      properties: {
        foreground: { type: "string" },
        background: { type: "string" },
        theme: { type: "string", enum: ["light", "dark"], default: "light" },
      },
      required: ["foreground", "background"],
    },
    run: async ({ foreground, background, theme = "light" }) => {
      const fg = await colorFor(foreground, theme);
      const bg = await colorFor(background, theme);
      const r = contrast(fg.rgb, bg.rgb);
      const ok = (min) => (r >= min ? "pass" : "fail");
      return [
        `${fg.source} on ${bg.source} (${theme}): ${r.toFixed(2)}:1`,
        `Normal text AA (4.5): ${ok(4.5)}  AAA (7): ${ok(7)}`,
        `Large text AA (3): ${ok(3)}  AAA (4.5): ${ok(4.5)}`,
        `UI components and graphics (3): ${ok(3)}`,
      ].join("\n");
    },
  },
];

// ── JSON-RPC over stdio ──────────────────────────────────────────────────────
const send = (msg) => process.stdout.write(JSON.stringify({ jsonrpc: "2.0", ...msg }) + "\n");

async function handle(req) {
  const { id, method, params } = req;
  switch (method) {
    case "initialize":
      return {
        protocolVersion: params?.protocolVersion || PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: "sitka", version: "1.13.0" },
        instructions:
          "Sitka design system. Use tokens, never raw colours (CSS rgb(var(--token)), Swift Color.sitka(\\.token)). Import React components from sitka-ui. Check get_component before using a component, and check_contrast before pairing colours.",
      };
    case "ping":
      return {};
    case "tools/list":
      return { tools: TOOLS.map(({ run, ...t }) => t) };
    case "tools/call": {
      const tool = TOOLS.find((t) => t.name === params?.name);
      if (!tool) throw Object.assign(new Error(`Unknown tool ${params?.name}`), { code: -32602 });
      try {
        const text = await tool.run(params.arguments ?? {});
        return { content: [{ type: "text", text }] };
      } catch (e) {
        return { content: [{ type: "text", text: e.message }], isError: true };
      }
    }
    default:
      if (id === undefined) return undefined; // notification
      throw Object.assign(new Error(`Method not found: ${method}`), { code: -32601 });
  }
}

createInterface({ input: process.stdin }).on("line", async (line) => {
  if (!line.trim()) return;
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    return send({ id: null, error: { code: -32700, message: "Parse error" } });
  }
  try {
    const result = await handle(req);
    if (req.id !== undefined && result !== undefined) send({ id: req.id, result });
  } catch (e) {
    if (req.id !== undefined) send({ id: req.id, error: { code: e.code ?? -32603, message: e.message } });
  }
});
