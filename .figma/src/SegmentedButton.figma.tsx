// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 65:168

import figma from '@figma/code-connect';
import { SegmentedButton } from './SegmentedButton';

figma.connect(
  SegmentedButton,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=65-168',
  {
    props: {
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
    },
    example: ({ size }) => (
      <SegmentedButton
        size={size}
        value="a"
        onChange={() => {}}
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
        ]}
      />
    ),
  }
);
