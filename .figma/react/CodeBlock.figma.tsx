// Figma: Components › CodeBlock (67:157).
import figma from "@figma/code-connect";
import { CodeBlock } from "../../src/components/ui/CodeBlock";

figma.connect(CodeBlock, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=67-157", {
  props: {
    language: figma.enum("Language", { tsx: "tsx", bash: "bash", json: "json", css: "css" }),
    code: figma.enum("Language", {
      tsx: "import { Button } from 'sitka-ui'",
      bash: "npm install sitka-ui",
      json: '{ "name": "sitka", "type": "module" }',
      css: ":root { --accent: 0 192 232; }",
    }),
  },
  example: ({ language, code }) => <CodeBlock language={language} code={code} />,
});
