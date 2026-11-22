// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 66:171

import figma from '@figma/code-connect';
import { OTPInput } from './OTPInput';

figma.connect(
  OTPInput,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=66-171',
  {
    props: {
      length: figma.enum('Length', {
        '4': 4,
        '6': 6,
      }),
      error:    figma.string('Error'),
      disabled: figma.boolean('Disabled'),
      mask:     figma.boolean('Mask'),
    },
    example: ({ length, error, disabled, mask }) => (
      <OTPInput
        length={length}
        onComplete={() => {}}
        error={error}
        disabled={disabled}
        mask={mask}
      />
    ),
  }
);
