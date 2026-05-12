// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 66:95

import figma from '@figma/code-connect';
import { PromptInput } from './PromptInput';

figma.connect(
  PromptInput,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=66-95',
  {
    props: {
      loading:  figma.boolean('Loading'),
      disabled: figma.boolean('Disabled'),
    },
    example: ({ loading, disabled }) => (
      <PromptInput
        onSubmit={() => {}}
        loading={loading}
        disabled={disabled}
        placeholder="Type a message…"
      />
    ),
  }
);
