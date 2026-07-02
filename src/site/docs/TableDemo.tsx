"use client";

import { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

type SortKey = "name" | "status" | "role" | "joined";
type SortDir = "asc" | "desc";

const MEMBERS = [
  { id: 1, name: "Jamieson Rothwell", role: "Admin",     status: "online"  as const, joined: "2023-01-12" },
  { id: 2, name: "Sam Park",          role: "Developer", status: "away"    as const, joined: "2023-03-05" },
  { id: 3, name: "Lena Müller",       role: "Designer",  status: "offline" as const, joined: "2023-06-18" },
  { id: 4, name: "Amir Karimi",       role: "Developer", status: "busy"    as const, joined: "2024-01-30" },
  { id: 5, name: "Dev Bot",           role: "Bot",       status: "online"  as const, joined: "2024-02-14" },
];

const statusVariant: Record<string, "success" | "warning" | "danger" | "default"> = {
  online: "success", away: "warning", busy: "danger", offline: "default",
};

export function SortableTableDemo() {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...MEMBERS].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const dir = (key: SortKey) =>
    sortKey === key ? sortDir : false;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sortable sortDirection={dir("name")} onSort={() => handleSort("name")}>Name</TableHead>
          <TableHead sortable sortDirection={dir("role")} onSort={() => handleSort("role")}>Role</TableHead>
          <TableHead sortable sortDirection={dir("status")} onSort={() => handleSort("status")}>Status</TableHead>
          <TableHead sortable sortDirection={dir("joined")} onSort={() => handleSort("joined")}>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((m) => (
          <TableRow key={m.id}>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <Avatar alt={m.name} size="sm" status={m.status} />
                <span className="font-medium text-[rgb(var(--text-primary))]">{m.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-[rgb(var(--text-secondary))]">{m.role}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[m.status]} dot>
                {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-[rgb(var(--text-tertiary))] font-mono text-[12px]">
              {new Date(m.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
