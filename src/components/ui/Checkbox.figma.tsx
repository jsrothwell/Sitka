// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 63:97

import figma from '@figma/code-connect';
import { Checkbox } from './Checkbox';

figma.connect(
  Checkbox,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-97',
  {
    props: {
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      checked:       figma.boolean('Checked'),
      indeterminate: figma.boolean('Indeterminate'),
      disabled:      figma.boolean('Disabled'),
    },
    example: ({ size, checked, indeterminate, disabled }) => (
      <Checkbox
        size={size}
        defaultChecked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        label="Label"
      />
    ),
  }
);
