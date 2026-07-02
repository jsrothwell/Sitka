// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 68:359

import figma from '@figma/code-connect';
import { Stack } from './Stack';

figma.connect(
  Stack,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=68-359',
  {
    props: {
      direction: figma.enum('Direction', {
        col: 'col',
        row: 'row',
      }),
      gap: figma.enum('Gap', {
        '2': '2',
        '4': '4',
        '8': '8',
      }),
      align: figma.enum('Align', {
        start:   'start',
        center:  'center',
        end:     'end',
        stretch: 'stretch',
      }),
    },
    example: ({ direction, gap, align }) => (
      <Stack direction={direction} gap={gap} align={align}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>
    ),
  }
);
