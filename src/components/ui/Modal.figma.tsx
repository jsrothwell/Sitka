// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 65:261

import figma from '@figma/code-connect';
import { Modal } from './Modal';

figma.connect(
  Modal,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=65-261',
  {
    props: {
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
      title:       figma.string('Title'),
      description: figma.string('Description'),
    },
    example: ({ size, title, description }) => (
      <Modal
        open
        onClose={() => {}}
        size={size}
        title={title}
        description={description}
      >
        Modal content
      </Modal>
    ),
  }
);
