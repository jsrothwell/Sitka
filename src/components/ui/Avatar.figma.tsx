// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 20:310

import figma from '@figma/code-connect';
import { Avatar, AvatarGroup } from './Avatar';

figma.connect(
  Avatar,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-304',
  {
    props: {
      size: figma.enum('Size', {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
      status: figma.enum('Status', {
        online:  'online',
        offline: 'offline',
        away:    'away',
        busy:    'busy',
        none:    undefined,
      }),
      src:      figma.string('Image URL'),
      initials: figma.string('Initials'),
      alt:      figma.string('Alt Text'),
    },
    example: ({ size, status, src, initials, alt }) => (
      <Avatar
        size={size}
        status={status}
        src={src}
        initials={initials}
        alt={alt}
      />
    ),
  }
);
