// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 63:172

import figma from '@figma/code-connect';
import { Label } from './Label';

figma.connect(
  Label,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-172',
  {
    props: {
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      required: figma.boolean('Required'),
      disabled: figma.boolean('Disabled'),
    },
    example: ({ size, required, disabled }) => (
      <Label size={size} required={required} disabled={disabled}>
        Label text
      </Label>
    ),
  }
);
