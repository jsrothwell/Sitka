"use client";

import { Tabs } from "@/components/ui/Tabs";

export function TabsVariantsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full max-w-lg">
        <Tabs
          tabs={[
            { id: "all", label: "All" },
            { id: "open", label: "Open" },
            { id: "closed", label: "Closed" },
            { id: "archived", label: "Archived" },
          ]}
        >
          {(active) => (
            <p className="text-[13px] text-[rgb(var(--text-secondary))]">
              Showing <strong className="text-[rgb(var(--text-primary))]">{active}</strong> items.
            </p>
          )}
        </Tabs>
      </div>

      <div className="w-full max-w-lg">
        <Tabs
          tabs={[
            { id: "inbox", label: "Inbox", badge: "4" },
            { id: "sent", label: "Sent" },
            { id: "drafts", label: "Drafts", badge: "2" },
            { id: "spam", label: "Spam", badge: "11" },
          ]}
        >
          {(active) => (
            <p className="text-[13px] text-[rgb(var(--text-secondary))]">
              Viewing <strong className="text-[rgb(var(--text-primary))]">{active}</strong>.
            </p>
          )}
        </Tabs>
      </div>
    </div>
  );
}
