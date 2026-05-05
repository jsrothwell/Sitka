// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 20:250

import figma from '@figma/code-connect';
import { Switch } from './Switch';

figma.connect(
  Switch,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-246',
  {
    props: {
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      checked:    figma.boolean('On'),
      label:      figma.string('Label'),
      helperText: figma.string('Helper Text'),
      disabled:   figma.boolean('Disabled'),
    },
    example: ({ size, checked, label, helperText, disabled }) => (
      <Switch
        size={size}
        defaultChecked={checked}
        label={label}
        helperText={helperText}
        disabled={disabled}
      />
    ),
  }
);
