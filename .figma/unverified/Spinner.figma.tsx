// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 63:185

import figma from '@figma/code-connect';
import { Spinner } from './Spinner';

figma.connect(
  Spinner,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-185',
  {
    props: {
      size: figma.enum('Size', {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
    },
    example: ({ size }) => <Spinner size={size} />,
  }
);
