"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Mail, Phone, MapPin, Building2, Calendar, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

type Status = "online" | "away" | "offline" | "busy";

interface Contact {
  id: number;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  joined: string;
  status: Status;
  tags: string[];
  bio: string;
}

const CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Jamieson Rothwell",
    role: "Founder & CEO",
    company: "Sitka",
    email: "jamieson@sitka.design",
    phone: "+1 (415) 555-0101",
    location: "San Francisco, CA",
    joined: "Jan 2023",
    status: "online",
    tags: ["Admin", "Billing"],
    bio: "Building design systems and tools for modern product teams. Previously at Linear and Figma.",
  },
  {
    id: 2,
    name: "Sam Park",
    role: "Senior Engineer",
    company: "Sitka",
    email: "sam@sitka.design",
    phone: "+1 (415) 555-0142",
    location: "New York, NY",
    joined: "Mar 2023",
    status: "away",
    tags: ["Developer"],
    bio: "Full-stack engineer focused on design tooling and component infrastructure.",
  },
  {
    id: 3,
    name: "Lena Müller",
    role: "Product Designer",
    company: "Sitka",
    email: "lena@sitka.design",
    phone: "+1 (415) 555-0198",
    location: "Berlin, DE",
    joined: "Jun 2023",
    status: "offline",
    tags: ["Designer"],
    bio: "Crafting interfaces for complex workflows. Obsessed with typography and motion.",
  },
  {
    id: 4,
    name: "Amir Karimi",
    role: "Developer Advocate",
    company: "Sitka",
    email: "amir@sitka.design",
    phone: "+1 (415) 555-0177",
    location: "Toronto, CA",
    joined: "Jan 2024",
    status: "busy",
    tags: ["Developer", "Marketing"],
    bio: "Bridging the gap between engineering and design. Speaker, writer, open-source contributor.",
  },
  {
    id: 5,
    name: "Dev Bot",
    role: "Automation",
    company: "Sitka",
    email: "bot@sitka.design",
    phone: "—",
    location: "Cloud",
    joined: "Feb 2024",
    status: "online",
    tags: ["Bot"],
    bio: "Automated CI/CD pipelines, release tooling, and Slack notifications.",
  },
];

const statusVariant: Record<Status, "success" | "warning" | "danger" | "default"> = {
  online: "success", away: "warning", busy: "danger", offline: "default",
};

export function MasterDetailDemo() {
  const [selected, setSelected] = useState<Contact>(CONTACTS[0]);
  const [showDetail, setShowDetail] = useState(false);

  const selectContact = (c: Contact) => {
    setSelected(c);
    setShowDetail(true);
  };

  return (
    <div className="w-full rounded-xl border border-[rgb(var(--border))] overflow-hidden bg-[rgb(var(--background))]" style={{ height: 480 }}>
      <div className="flex h-full">

        {/* Master — contact list */}
        <div className={cn(
          "w-full md:w-[260px] flex-shrink-0 border-r border-[rgb(var(--border))]",
          "flex flex-col",
          // On small screens: hide when detail is open
          showDetail && "hidden md:flex"
        )}>
          <div className="px-4 py-3 border-b border-[rgb(var(--border))]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
              Team · {CONTACTS.length} members
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONTACTS.map((c) => (
              <button
                key={c.id}
                onClick={() => selectContact(c)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                  "border-b border-[rgb(var(--border-subtle))] last:border-0",
                  selected.id === c.id
                    ? "bg-[rgb(var(--accent-subtle))]"
                    : "hover:bg-[rgb(var(--surface))]"
                )}
              >
                <Avatar alt={c.name} size="sm" status={c.status} />
                <div className="min-w-0 flex-1">
                  <p className={cn(
                    "text-[13px] font-medium truncate",
                    selected.id === c.id ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-primary))]"
                  )}>
                    {c.name}
                  </p>
                  <p className="text-[11px] text-[rgb(var(--text-tertiary))] truncate">{c.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className={cn(
          "flex-1 flex flex-col min-w-0",
          !showDetail && "hidden md:flex"
        )}>
          {/* Detail header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-[rgb(var(--border))]">
            <button
              onClick={() => setShowDetail(false)}
              className="md:hidden flex items-center gap-1.5 text-[rgb(var(--accent))] text-[13px] font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex-1 min-w-0" />
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgb(var(--surface))] text-[rgb(var(--text-tertiary))] transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Detail content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Profile header */}
              <div className="flex items-start gap-4 mb-6">
                <Avatar alt={selected.name} size="xl" status={selected.status} />
                <div className="flex-1 min-w-0">
                  <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))] leading-tight">
                    {selected.name}
                  </h2>
                  <p className="text-[13px] text-[rgb(var(--text-secondary))] mt-0.5">
                    {selected.role} · {selected.company}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge variant={statusVariant[selected.status]} dot>
                      {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                    </Badge>
                    {selected.tags.map((t) => (
                      <Badge key={t} variant="ghost">{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
                {selected.bio}
              </p>

              {/* Contact details */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: Mail,      value: selected.email    },
                  { icon: Phone,     value: selected.phone    },
                  { icon: MapPin,    value: selected.location },
                  { icon: Building2, value: selected.company  },
                  { icon: Calendar,  value: `Joined ${selected.joined}` },
                ].map(({ icon: Icon, value }) => (
                  <div key={value} className="flex items-center gap-3 text-[13px]">
                    <Icon className="w-4 h-4 text-[rgb(var(--text-tertiary))] flex-shrink-0" />
                    <span className="text-[rgb(var(--text-secondary))]">{value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="primary" size="sm" leftIcon={<Mail className="w-4 h-4" />}>
                  Message
                </Button>
                <Button variant="secondary" size="sm">Edit</Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
