// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 65:236

import figma from '@figma/code-connect';
import { Tooltip } from './Tooltip';
import { Button } from './Button';

figma.connect(
  Tooltip,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=65-236',
  {
    props: {
      side: figma.enum('Side', {
        Top:    'top',
        Bottom: 'bottom',
        Left:   'left',
        Right:  'right',
      }),
      content: figma.string('Content'),
    },
    example: ({ side, content }) => (
      <Tooltip content={content} side={side}>
        <Button variant="secondary" size="md">Hover me</Button>
      </Tooltip>
    ),
  }
);
