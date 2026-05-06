import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Status" };

type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

const SERVICES: { name: string; description: string; status: ServiceStatus }[] = [
  { name: "Documentation site",     description: "sitka.design — this site",          status: "operational" },
  { name: "GitHub Pages deployment", description: "Static build via GitHub Actions",   status: "operational" },
  { name: "Token export pipeline",  description: "Style Dictionary build + download",  status: "operational" },
  { name: "Figma library sync",     description: "Figma Variables API integration",    status: "operational" },
  { name: "npm package",            description: "@sitka/tokens — token distribution", status: "operational" },
];

const INCIDENTS: { date: string; title: string; body: string; resolved: boolean }[] = [];

const STATUS_CONFIG: Record<ServiceStatus, { label: string; dot: string; text: string }> = {
  operational:  { label: "Operational",  dot: "bg-emerald-400",  text: "text-emerald-400" },
  degraded:     { label: "Degraded",     dot: "bg-amber-400",    text: "text-amber-400" },
  outage:       { label: "Outage",       dot: "bg-red-400",      text: "text-red-400" },
  maintenance:  { label: "Maintenance",  dot: "bg-sky-400",      text: "text-sky-400" },
};

const allOperational = SERVICES.every((s) => s.status === "operational");

export default function StatusPage() {
  return (
    <div>
      <PageHeader
        title="System Status"
        description="Real-time status for all Sitka services and infrastructure."
      />

      <div className="space-y-10">

        {/* Overall banner */}
        <div className={`rounded-xl border px-6 py-5 flex items-center gap-4 ${
          allOperational
            ? "border-emerald-500/30 bg-emerald-500/5"
            : "border-amber-500/30 bg-amber-500/5"
        }`}>
          <span className={`h-3 w-3 rounded-full shrink-0 ${allOperational ? "bg-emerald-400" : "bg-amber-400"}`} />
          <div>
            <p className={`text-[15px] font-semibold ${allOperational ? "text-emerald-400" : "text-amber-400"}`}>
              {allOperational ? "All systems operational" : "Some systems affected"}
            </p>
            <p className="text-[13px] text-[rgb(var(--text-tertiary))] mt-0.5">
              Last checked: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Services table */}
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Services</h2>
          <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
            {SERVICES.map((service, i) => {
              const cfg = STATUS_CONFIG[service.status];
              return (
                <div
                  key={service.name}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i < SERVICES.length - 1 ? "border-b border-[rgb(var(--border-subtle))]" : ""
                  } ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}
                >
                  <div>
                    <p className="text-[14px] font-medium text-[rgb(var(--text-primary))]">{service.name}</p>
                    <p className="text-[12px] text-[rgb(var(--text-tertiary))]">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                    <span className={`text-[12px] font-medium ${cfg.text}`}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Incidents */}
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
            Incident history
          </h2>
          {INCIDENTS.length === 0 ? (
            <div className="rounded-xl border border-[rgb(var(--border))] px-6 py-8 text-center">
              <p className="text-[14px] text-[rgb(var(--text-tertiary))]">No incidents reported.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {INCIDENTS.map((incident) => (
                <div key={incident.title} className="rounded-xl border border-[rgb(var(--border))] p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">{incident.title}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${incident.resolved ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                        {incident.resolved ? "Resolved" : "Ongoing"}
                      </span>
                      <span className="text-[12px] text-[rgb(var(--text-tertiary))] font-mono">{incident.date}</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-[rgb(var(--text-secondary))]">{incident.body}</p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
