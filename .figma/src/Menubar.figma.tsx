// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 67:205

import figma from '@figma/code-connect';
import { Menubar } from './Menubar';

figma.connect(
  Menubar,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=67-205',
  {
    props: {},
    example: () => (
      <Menubar
        menus={[
          {
            label: 'File',
            items: [
              { label: 'New',  shortcut: '⌘N', onSelect: () => {} },
              { label: 'Open', shortcut: '⌘O', onSelect: () => {} },
              { type: 'separator' },
              { label: 'Save', shortcut: '⌘S', onSelect: () => {} },
            ],
          },
          {
            label: 'Edit',
            items: [
              { label: 'Undo', shortcut: '⌘Z', onSelect: () => {} },
              { label: 'Redo', shortcut: '⌘⇧Z', onSelect: () => {} },
            ],
          },
        ]}
      />
    ),
  }
);
