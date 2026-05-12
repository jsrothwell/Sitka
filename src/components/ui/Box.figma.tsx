// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 68:316

import figma from '@figma/code-connect';
import { Box } from './Box';

figma.connect(
  Box,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=68-316',
  {
    props: {
      as: figma.enum('As', {
        div:     'div',
        section: 'section',
        article: 'article',
        aside:   'aside',
      }),
    },
    example: ({ as }) => (
      <Box as={as}>Content</Box>
    ),
  }
);
