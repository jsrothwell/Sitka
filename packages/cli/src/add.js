import { createWriteStream, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";
import { get } from "https";
import chalk from "chalk";

const REGISTRY_BASE =
  "https://raw.githubusercontent.com/jsrothwell/Sitka/main/src/components/ui";

const REGISTRY = {
  button:           "Button.tsx",
  input:            "Input.tsx",
  textarea:         "Textarea.tsx",
  select:           "Select.tsx",
  checkbox:         "Checkbox.tsx",
  radio:            "Radio.tsx",
  switch:           "Switch.tsx",
  badge:            "Badge.tsx",
  avatar:           "Avatar.tsx",
  card:             "Card.tsx",
  modal:            "Modal.tsx",
  tooltip:          "Tooltip.tsx",
  tabs:             "Tabs.tsx",
  spinner:          "Spinner.tsx",
  toggle:           "Toggle.tsx",
  divider:          "Divider.tsx",
  pagination:       "Pagination.tsx",
  "data-grid":      "DataGrid.tsx",
  menubar:          "Menubar.tsx",
  "nav-menu":       "NavigationMenu.tsx",
  box:              "Box.tsx",
  stack:            "Stack.tsx",
};

export async function add(component, { dir }) {
  const slug = component.toLowerCase().replace(/\s+/g, "-");
  const filename = REGISTRY[slug];

  if (!filename) {
    console.error(chalk.red(`✗ Unknown component: ${component}`));
    console.log(chalk.dim(`Available: ${Object.keys(REGISTRY).join(", ")}`));
    process.exit(1);
  }

  const dest = resolve(process.cwd(), dir);
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const outPath = join(dest, filename);
  const url = `${REGISTRY_BASE}/${filename}`;

  console.log(chalk.cyan(`↓ Fetching ${filename}…`));

  await download(url, outPath);

  console.log(chalk.green(`✓ Added ${filename} → ${dir}/${filename}`));
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => {
      file.close();
      reject(err);
    });
  });
}
