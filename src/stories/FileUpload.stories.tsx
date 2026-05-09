import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "@/components/ui/FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Forms/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => (
    <FileUpload
      label="Attachment"
      helperText="PDF, DOC, or image files"
      onFilesChange={(files) => console.log("Files:", files)}
    />
  ),
};

export const ImageOnly: Story = {
  render: () => (
    <FileUpload
      label="Profile photo"
      accept="image/*"
      maxSize={2 * 1024 * 1024}
      onFilesChange={() => {}}
    />
  ),
};

export const MultipleFiles: Story = {
  render: () => (
    <FileUpload
      label="Documents"
      multiple
      accept=".pdf,.doc,.docx,.txt"
      maxSize={10 * 1024 * 1024}
      onFilesChange={() => {}}
      helperText="Up to 10 MB per file"
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <FileUpload
      label="Resume"
      accept=".pdf"
      error="Only PDF files are accepted."
      onFilesChange={() => {}}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <FileUpload
      label="Disabled upload"
      disabled
      onFilesChange={() => {}}
      helperText="Upload is currently unavailable"
    />
  ),
};
