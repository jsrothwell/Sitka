// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 65:109

import figma from '@figma/code-connect';
import { Select } from './Select';

figma.connect(
  Select,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=65-109',
  {
    props: {
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      error: figma.string('Error'),
    },
    example: ({ size, error }) => (
      <Select size={size} label="Label" error={error} placeholder="Select an option">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>
    ),
  }
);
