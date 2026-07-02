// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 67:104

import figma from '@figma/code-connect';
import { FileUpload } from './FileUpload';

figma.connect(
  FileUpload,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=67-104',
  {
    props: {
      multiple: figma.boolean('Multiple'),
      disabled: figma.boolean('Disabled'),
      error:    figma.string('Error'),
    },
    example: ({ multiple, disabled, error }) => (
      <FileUpload
        multiple={multiple}
        disabled={disabled}
        error={error}
        label="Upload files"
        helperText="PNG, JPG, PDF up to 10 MB"
      />
    ),
  }
);
