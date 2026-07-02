// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 66:250

import figma from '@figma/code-connect';
import { BottomSheet } from './BottomSheet';

figma.connect(
  BottomSheet,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=66-250',
  {
    props: {
      snapHeight: figma.enum('SnapHeight', {
        Auto: 'auto',
        Half: 'half',
        Full: 'full',
      }),
      title: figma.string('Title'),
    },
    example: ({ snapHeight, title }) => (
      <BottomSheet open onClose={() => {}} snapHeight={snapHeight} title={title}>
        Sheet content
      </BottomSheet>
    ),
  }
);
