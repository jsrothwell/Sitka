// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 66:221

import figma from '@figma/code-connect';
import { Pagination } from './Pagination';

figma.connect(
  Pagination,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=66-221',
  {
    props: {
      page: figma.enum('State', {
        FirstPage:  1,
        MiddlePage: 5,
        LastPage:   10,
      }),
    },
    example: ({ page }) => (
      <Pagination
        page={page}
        totalPages={10}
        onPageChange={() => {}}
      />
    ),
  }
);
