// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 20:128

import figma from '@figma/code-connect';
import { Badge } from './Badge';

figma.connect(
  Badge,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-126',
  {
    props: {
      variant: figma.enum('Variant', {
        default: 'default',
        primary: 'primary',
        success: 'success',
        warning: 'warning',
        danger:  'danger',
        ghost:   'ghost',
      }),
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      dot:   figma.boolean('Dot'),
      label: figma.string('Label'),
    },
    example: ({ variant, size, dot, label }) => (
      <Badge variant={variant} size={size} dot={dot}>
        {label}
      </Badge>
    ),
  }
);
