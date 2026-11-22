// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 66:233

import figma from '@figma/code-connect';
import { Collapsible } from './Collapsible';

figma.connect(
  Collapsible,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=66-233',
  {
    props: {
      defaultOpen: figma.boolean('Open'),
    },
    example: ({ defaultOpen }) => (
      <Collapsible title="Section title" defaultOpen={defaultOpen}>
        Collapsible content
      </Collapsible>
    ),
  }
);
