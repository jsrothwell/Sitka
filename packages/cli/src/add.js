import { createWriteStream, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";
import { get } from "https";
import chalk from "chalk";

const REGISTRY_BASE =
  "https://raw.githubusercontent.com/jsrothwell/Sitka/main/src/components/ui";

const REGISTRY = {
  // Actions
  button:              "Button.tsx",
  "split-button":      "SplitButton.tsx",
  "segmented-button":  "SegmentedButton.tsx",
  toggle:              "Toggle.tsx",
  // Inputs
  input:               "Input.tsx",
  textarea:            "Textarea.tsx",
  "prompt-input":      "PromptInput.tsx",
  otp:                 "OTPInput.tsx",
  "otp-input":         "OTPInput.tsx",
  pin:                 "OTPInput.tsx",
  select:              "Select.tsx",
  checkbox:            "Checkbox.tsx",
  radio:               "Radio.tsx",
  switch:              "Switch.tsx",
  label:               "Label.tsx",
  "file-upload":       "FileUpload.tsx",
  // Overlays
  modal:               "Modal.tsx",
  tooltip:             "Tooltip.tsx",
  "bottom-sheet":      "BottomSheet.tsx",
  drawer:              "Drawer.tsx",
  toast:               "Toast.tsx",
  // Navigation
  tabs:                "Tabs.tsx",
  menubar:             "Menubar.tsx",
  "nav-menu":          "NavigationMenu.tsx",
  "navigation-menu":   "NavigationMenu.tsx",
  "bottom-tab-bar":    "BottomTabBar.tsx",
  // Display
  badge:               "Badge.tsx",
  avatar:              "Avatar.tsx",
  card:                "Card.tsx",
  table:               "Table.tsx",
  "data-grid":         "DataGrid.tsx",
  spinner:             "Spinner.tsx",
  divider:             "Divider.tsx",
  "code-block":        "CodeBlock.tsx",
  "streaming-text":    "StreamingText.tsx",
  "chat-message":      "ChatMessage.tsx",
  "pricing-table":     "PricingTable.tsx",
  // Layout
  collapsible:         "Collapsible.tsx",
  pagination:          "Pagination.tsx",
  box:                 "Box.tsx",
  stack:               "Stack.tsx",
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
