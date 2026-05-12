// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 63:156

import figma from '@figma/code-connect';
import { Toggle } from './Toggle';

figma.connect(
  Toggle,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-156',
  {
    props: {
      variant: figma.enum('Variant', {
        Default: 'default',
        Outline: 'outline',
      }),
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      pressed: figma.boolean('Pressed'),
    },
    example: ({ variant, size, pressed }) => (
      <Toggle variant={variant} size={size} pressed={pressed}>
        Label
      </Toggle>
    ),
  }
);
