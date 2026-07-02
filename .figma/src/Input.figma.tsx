// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 20:198

import figma from '@figma/code-connect';
import { Input } from './Input';

figma.connect(
  Input,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-195',
  {
    props: {
      inputSize: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      label:       figma.string('Label'),
      placeholder: figma.string('Placeholder'),
      helperText:  figma.string('Helper Text'),
      error:       figma.string('Error'),
      disabled:    figma.boolean('Disabled'),
    },
    example: ({ inputSize, label, placeholder, helperText, error, disabled }) => (
      <Input
        inputSize={inputSize}
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        disabled={disabled}
      />
    ),
  }
);
