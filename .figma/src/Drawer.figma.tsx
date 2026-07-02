// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 66:73

import figma from '@figma/code-connect';
import { Drawer } from './Drawer';

figma.connect(
  Drawer,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=66-73',
  {
    props: {
      side: figma.enum('Side', {
        Left:  'left',
        Right: 'right',
      }),
      title: figma.string('Title'),
    },
    example: ({ side, title }) => (
      <Drawer open onClose={() => {}} side={side} title={title}>
        Drawer content
      </Drawer>
    ),
  }
);
