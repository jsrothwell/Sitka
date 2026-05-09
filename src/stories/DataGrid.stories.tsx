import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid } from "@/components/ui/DataGrid";

const meta: Meta = {
  title: "Display/DataGrid",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

type User = { id: number; name: string; email: string; role: string; status: string; joined: string };

const rows: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@acme.com", role: "Admin", status: "Active", joined: "2024-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@acme.com", role: "Editor", status: "Active", joined: "2024-02-20" },
  { id: 3, name: "Carol White", email: "carol@acme.com", role: "Viewer", status: "Inactive", joined: "2024-03-05" },
  { id: 4, name: "Dave Brown", email: "dave@acme.com", role: "Editor", status: "Active", joined: "2024-04-11" },
  { id: 5, name: "Eve Davis", email: "eve@acme.com", role: "Admin", status: "Active", joined: "2024-05-22" },
  { id: 6, name: "Frank Miller", email: "frank@acme.com", role: "Viewer", status: "Active", joined: "2024-06-08" },
];

const columns = [
  { key: "name" as const, header: "Name", sortable: true, filterable: true },
  { key: "email" as const, header: "Email", sortable: true, filterable: true },
  { key: "role" as const, header: "Role", sortable: true },
  { key: "status" as const, header: "Status", sortable: true },
  { key: "joined" as const, header: "Joined", sortable: true },
];

export const Default: Story = {
  render: () => <DataGrid columns={columns} rows={rows} />,
};

export const Selectable: Story = {
  render: () => <DataGrid columns={columns} rows={rows} selectable />,
};

export const SmallPageSize: Story = {
  render: () => <DataGrid columns={columns} rows={rows} pageSize={3} />,
};
