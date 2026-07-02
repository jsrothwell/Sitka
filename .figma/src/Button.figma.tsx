// figma.connect — publish with: npx @figma/code-connect publish
// Requires Figma Developer seat (Organization / Enterprise plan)
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 20:74

import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=20-74',
  {
    props: {
      variant: figma.enum('Variant', {
        primary:   'primary',
        secondary: 'secondary',
        ghost:     'ghost',
        danger:    'danger',
        glass:     'glass',
      }),
      size: figma.enum('Size', {
        sm:   'sm',
        md:   'md',
        lg:   'lg',
        icon: 'icon',
      }),
      loading: figma.boolean('Loading'),
      label:   figma.string('Label'),
    },
    example: ({ variant, size, loading, label }) => (
      <Button variant={variant} size={size} loading={loading}>
        {label}
      </Button>
    ),
  }
);
