// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 68:250

import figma from '@figma/code-connect';
import { DataGrid } from './DataGrid';

figma.connect(
  DataGrid,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=68-250',
  {
    props: {
      selectable: figma.boolean('Selectable'),
    },
    example: ({ selectable }) => (
      <DataGrid
        selectable={selectable}
        columns={[
          { key: 'name',   header: 'Name',   sortable: true },
          { key: 'status', header: 'Status', filterable: true },
          { key: 'date',   header: 'Date',   sortable: true },
        ]}
        rows={[
          { id: 1, name: 'Item A', status: 'Active', date: '2024-01-01' },
          { id: 2, name: 'Item B', status: 'Inactive', date: '2024-01-02' },
        ]}
      />
    ),
  }
);
