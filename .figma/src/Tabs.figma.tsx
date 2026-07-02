// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 20:364

import figma from '@figma/code-connect';
import { Tabs } from './Tabs';

figma.connect(
  Tabs,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-352',
  {
    props: {
      defaultTab: figma.string('Active Tab'),
    },
    example: ({ defaultTab }) => (
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'usage',    label: 'Usage' },
          { id: 'api',      label: 'API', badge: 'New' },
        ]}
        defaultTab={defaultTab}
      >
        {(activeId) => <div>{activeId}</div>}
      </Tabs>
    ),
  }
);
