// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 68:142

import figma from '@figma/code-connect';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';

figma.connect(
  Table,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=68-142',
  {
    props: {
      density: figma.enum('Density', {
        default:     'default',
        compact:     'compact',
        comfortable: 'comfortable',
      }),
      striped:  figma.boolean('Striped'),
      bordered: figma.boolean('Bordered'),
    },
    example: ({ density, striped, bordered }) => (
      <Table density={density} striped={striped} bordered={bordered}>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Item A</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>2024-01-01</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  }
);
