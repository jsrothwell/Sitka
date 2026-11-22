// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 65:149

import figma from '@figma/code-connect';
import { Textarea } from './Textarea';

figma.connect(
  Textarea,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=65-149',
  {
    props: {
      inputSize: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      error: figma.string('Error'),
    },
    example: ({ inputSize, error }) => (
      <Textarea
        inputSize={inputSize}
        label="Label"
        error={error}
        placeholder="Enter text…"
      />
    ),
  }
);
