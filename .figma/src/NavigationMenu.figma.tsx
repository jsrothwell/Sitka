// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 67:182

import figma from '@figma/code-connect';
import { NavigationMenu } from './NavigationMenu';

figma.connect(
  NavigationMenu,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=67-182',
  {
    props: {},
    example: () => (
      <NavigationMenu
        items={[
          {
            label: 'Products',
            groups: [
              {
                links: [
                  { label: 'Overview', href: '/products' },
                  { label: 'Features', href: '/products/features' },
                ],
              },
            ],
          },
          { label: 'Pricing', href: '/pricing' },
        ]}
      />
    ),
  }
);
