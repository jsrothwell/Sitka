// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 65:223

import figma from '@figma/code-connect';
import { SplitButton } from './SplitButton';

figma.connect(
  SplitButton,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=65-223',
  {
    props: {
      variant: figma.enum('Variant', {
        primary:   'primary',
        secondary: 'secondary',
        ghost:     'ghost',
      }),
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      loading: figma.boolean('Loading'),
    },
    example: ({ variant, size, loading }) => (
      <SplitButton
        variant={variant}
        size={size}
        loading={loading}
        label="Action"
        onClick={() => {}}
        items={[
          { label: 'Option A', onClick: () => {} },
          { label: 'Option B', onClick: () => {} },
        ]}
      />
    ),
  }
);
