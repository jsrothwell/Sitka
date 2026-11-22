import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

/** Every exported page, as a URL path ("/", "/components/button/", …). */
export function exportedPages(): string[] {
  const root = join(process.cwd(), "out");
  const pages: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) {
        if (name === "_next" || name === "downloads") continue;
        walk(full);
      } else if (name === "index.html") {
        const rel = relative(root, dir).split(sep).join("/");
        pages.push(rel ? `/${rel}/` : "/");
      }
    }
  };
  walk(root);
  return pages.sort();
}
