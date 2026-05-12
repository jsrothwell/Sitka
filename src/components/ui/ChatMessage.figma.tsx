// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 67:117

import figma from '@figma/code-connect';
import { ChatMessage } from './ChatMessage';

figma.connect(
  ChatMessage,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=67-117',
  {
    props: {
      role: figma.enum('Role', {
        user:      'user',
        assistant: 'assistant',
        system:    'system',
      }),
      content:   figma.string('Content'),
      streaming: figma.boolean('Streaming'),
    },
    example: ({ role, content, streaming }) => (
      <ChatMessage role={role} content={content} streaming={streaming} />
    ),
  }
);
