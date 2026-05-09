import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";

const meta: Meta<typeof Table> = {
  title: "Display/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    density: { control: "select", options: ["default", "compact", "comfortable"] },
    striped: { control: "boolean" },
    bordered: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const users = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
  { name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive" },
  { name: "Dave Brown", email: "dave@example.com", role: "Editor", status: "Active" },
];

const SampleTable = (props: React.ComponentProps<typeof Table>) => (
  <Table {...props}>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((u) => (
        <TableRow key={u.email}>
          <TableCell style={{ fontWeight: 500 }}>{u.name}</TableCell>
          <TableCell>{u.email}</TableCell>
          <TableCell>{u.role}</TableCell>
          <TableCell>
            <span style={{
              display: "inline-block",
              padding: "2px 8px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              background: u.status === "Active" ? "rgba(34,197,94,0.12)" : "rgba(148,163,184,0.12)",
              color: u.status === "Active" ? "#22c55e" : "#94a3b8",
            }}>
              {u.status}
            </span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const Default: Story = { render: () => <SampleTable /> };
export const Striped: Story = { render: () => <SampleTable striped /> };
export const Compact: Story = { render: () => <SampleTable density="compact" /> };
export const Comfortable: Story = { render: () => <SampleTable density="comfortable" /> };
export const Bordered: Story = { render: () => <SampleTable bordered /> };
