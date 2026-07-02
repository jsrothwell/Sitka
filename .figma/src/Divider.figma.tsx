// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 63:190

import figma from '@figma/code-connect';
import { Divider } from './Divider';

figma.connect(
  Divider,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-190',
  {
    props: {
      orientation: figma.enum('Orientation', {
        Horizontal: 'horizontal',
        Vertical:   'vertical',
      }),
    },
    example: ({ orientation }) => <Divider orientation={orientation} />,
  }
);
