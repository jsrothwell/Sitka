import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Layout/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    totalPages: { control: "number" },
    siblings: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(7);
    return <Pagination page={page} totalPages={50} onPageChange={setPage} />;
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return <Pagination page={page} totalPages={4} onPageChange={setPage} />;
  },
};

export const WithSiblings: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return <Pagination page={page} totalPages={20} onPageChange={setPage} siblings={2} />;
  },
};
