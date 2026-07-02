// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 67:85

import figma from '@figma/code-connect';
import { Toast } from './Toast';

figma.connect(
  Toast,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=67-85',
  {
    props: {
      variant: figma.enum('Variant', {
        info:    'info',
        success: 'success',
        warning: 'warning',
        error:   'error',
      }),
      title:       figma.string('Title'),
      description: figma.string('Description'),
    },
    example: ({ variant, title, description }) => (
      <Toast
        open
        onClose={() => {}}
        variant={variant}
        title={title}
        description={description}
      />
    ),
  }
);
