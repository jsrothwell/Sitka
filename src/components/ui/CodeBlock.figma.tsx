// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 67:157

import figma from '@figma/code-connect';
import { CodeBlock } from './CodeBlock';

figma.connect(
  CodeBlock,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=67-157',
  {
    props: {
      language: figma.enum('Language', {
        tsx:  'tsx',
        ts:   'ts',
        bash: 'bash',
        js:   'js',
      }),
      filename: figma.string('Filename'),
      code:     figma.string('Code'),
    },
    example: ({ language, filename, code }) => (
      <CodeBlock language={language} filename={filename} code={code} />
    ),
  }
);
