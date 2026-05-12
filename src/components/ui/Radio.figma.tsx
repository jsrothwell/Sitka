// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 63:119

import figma from '@figma/code-connect';
import { Radio, RadioGroup } from './Radio';

figma.connect(
  Radio,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-119',
  {
    props: {
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      checked:  figma.boolean('Selected'),
      disabled: figma.boolean('Disabled'),
    },
    example: ({ size, checked, disabled }) => (
      <RadioGroup name="example" value={checked ? 'option' : ''} size={size}>
        <Radio value="option" label="Option" disabled={disabled} />
      </RadioGroup>
    ),
  }
);
