// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 20:278

import figma from '@figma/code-connect';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

figma.connect(
  Card,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-273',
  {
    props: {
      variant: figma.enum('Variant', {
        default:  'default',
        elevated: 'elevated',
        ghost:    'ghost',
        accent:   'accent',
      }),
      interactive: figma.boolean('Interactive'),
    },
    example: ({ variant, interactive }) => (
      <Card variant={variant} interactive={interactive}>
        <CardHeader>Card Title</CardHeader>
        <CardBody>Card body content.</CardBody>
        <CardFooter>Footer action</CardFooter>
      </Card>
    ),
  }
);
