"use client";

import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export function TabsDemo() {
  return (
    <Tabs
      tabs={[
        { id: "overview", label: "Overview" },
        { id: "files", label: "Files", badge: "12" },
        { id: "activity", label: "Activity", badge: "3" },
        { id: "settings", label: "Settings" },
      ]}
    >
      {(active) => (
        <div className="text-[13px] text-[rgb(var(--text-secondary))]">
          {active === "overview" && (
            <div className="flex flex-col gap-3">
              <p className="leading-relaxed">
                Project Alpha is a design system documentation site built with Next.js and
                Tailwind CSS. It defines tokens, components, and guidelines for the Sitka design language.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[["12", "Files"], ["3", "Contributors"], ["28d", "Last updated"]].map(([val, label]) => (
                  <Card key={label} variant="ghost">
                    <CardBody className="py-3">
                      <div className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">{val}</div>
                      <div className="text-[11px] text-[rgb(var(--text-tertiary))] mt-0.5">{label}</div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {active === "files" && (
            <ul className="flex flex-col divide-y divide-[rgb(var(--border-subtle))]">
              {["src/app/page.tsx", "src/components/ui/Button.tsx", "src/components/ui/Input.tsx",
                "src/lib/navigation.ts", "tailwind.config.ts"].map((file) => (
                <li key={file} className="flex items-center gap-2 py-2">
                  <span className="text-[rgb(var(--text-tertiary))]">→</span>
                  <code className="font-mono text-[12px] text-[rgb(var(--text-primary))]">{file}</code>
                </li>
              ))}
            </ul>
          )}
          {active === "activity" && (
            <ul className="flex flex-col gap-2">
              {[
                ["Added Glass foundations page", "2h ago"],
                ["Fixed motion animation bug", "1d ago"],
                ["Updated brand palette to spruce green", "3d ago"],
              ].map(([msg, time]) => (
                <li key={msg} className="flex items-start justify-between gap-4">
                  <span>{msg}</span>
                  <span className="text-[11px] text-[rgb(var(--text-tertiary))] whitespace-nowrap">{time}</span>
                </li>
              ))}
            </ul>
          )}
          {active === "settings" && (
            <div className="flex flex-col gap-3">
              <p>Configure project-level settings below.</p>
              <Button size="sm" variant="secondary">Manage access</Button>
            </div>
          )}
        </div>
      )}
    </Tabs>
  );
}
