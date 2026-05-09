import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "@/components/ui/CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "Display/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  argTypes: {
    language: { control: "select", options: ["tsx", "ts", "js", "html", "css", "swift", "json", "bash"] },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const tsxExample = `import { Button } from "@/components/ui/Button";

export function Example() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}`;

const hookExample = `import { useState, useCallback } from "react";

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initial), [initial]);

  return { count, increment, decrement, reset };
}`;

const jsonExample = `{
  "name": "sitka-ui",
  "version": "1.0.0",
  "description": "Design system component library",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }
}`;

const bashExample = `# Install the package
npm install sitka-ui

# Or with pnpm
pnpm add sitka-ui

# Or with yarn
yarn add sitka-ui`;

export const Default: Story = {
  render: () => <CodeBlock code={tsxExample} language="tsx" />,
};

export const WithFilename: Story = {
  render: () => <CodeBlock code={tsxExample} language="tsx" filename="Example.tsx" />,
};

export const TypeScript: Story = {
  render: () => <CodeBlock code={hookExample} language="ts" filename="useCounter.ts" />,
};

export const JSON: Story = {
  render: () => <CodeBlock code={jsonExample} language="json" filename="package.json" />,
};

export const Bash: Story = {
  render: () => <CodeBlock code={bashExample} language="bash" />,
};
