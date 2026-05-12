// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 67:123

import figma from '@figma/code-connect';
import { StreamingText } from './StreamingText';

figma.connect(
  StreamingText,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=67-123',
  {
    props: {
      streaming:  figma.boolean('Streaming'),
      showCursor: figma.boolean('ShowCursor'),
      content:    figma.string('Content'),
    },
    example: ({ streaming, showCursor, content }) => (
      <StreamingText
        content={content}
        streaming={streaming}
        showCursor={showCursor}
      />
    ),
  }
);
