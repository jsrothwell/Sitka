import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { loadChangelog, tokenizeInline } from "@/site/changelog";

export const metadata: Metadata = { title: "Changelog" };

const TAG_STYLES: Record<string, string> = {
  Latest:   "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--text-primary))]",
  Breaking: "bg-[rgb(var(--status-danger)/0.12)] text-[rgb(var(--status-danger-text))]",
};

function Inline({ text }: { text: string }) {
  return (
    <>
      {tokenizeInline(text).map((t, i) =>
        t.type === "code" ? (
          <code key={i} className="font-mono text-[0.86em] text-[rgb(var(--text-primary))]">{t.value}</code>
        ) : t.type === "bold" ? (
          <strong key={i} className="font-semibold text-[rgb(var(--text-primary))]">{t.value}</strong>
        ) : t.type === "link" ? (
          <a key={i} href={t.href} className="text-[rgb(var(--accent-text))] underline underline-offset-2">{t.value}</a>
        ) : (
          <span key={i}>{t.value}</span>
        )
      )}
    </>
  );
}

export default function ChangelogPage() {
  // Rendered from CHANGELOG.md at build time; the first released version is "Latest".
  const releases = loadChangelog();
  const latest = releases.find((r) => r.version.toLowerCase() !== "unreleased")?.version;

  return (
    <div>
      <PageHeader
        title="Changelog"
        description="Every release, summarised. Breaking changes are marked explicitly."
      />

      <div className="space-y-14">
        {releases.map((release) => {
          const tag = release.breaking ? "Breaking" : release.version === latest ? "Latest" : "";
          return (
            <div key={release.version} className="grid grid-cols-[160px_1fr] gap-8 max-sm:grid-cols-1 max-sm:gap-4">
              <div className="pt-0.5">
                <p className="font-mono text-[22px] font-bold text-[rgb(var(--text-primary))] leading-none mb-1">
                  {/^\d/.test(release.version) ? `v${release.version}` : release.version}
                </p>
                {release.date && <p className="text-[12px] text-[rgb(var(--text-tertiary))] font-mono mb-2">{release.date}</p>}
                {tag && (
                  <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${TAG_STYLES[tag]}`}>{tag}</span>
                )}
              </div>

              <div className="space-y-6 min-w-0">
                {release.summary && (
                  <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed">
                    <Inline text={release.summary} />
                  </p>
                )}
                {release.sections.map((section, si) => (
                  <div key={`${section.label}-${si}`}>
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">{section.label}</h3>
                    <div className="space-y-4">
                      {section.groups.map((group, gi) => (
                        <div key={gi}>
                          {group.title && <h4 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-2">{group.title}</h4>}
                          <ul className="space-y-2">
                            {group.items.map((item, ii) => (
                              <li key={ii} className="flex gap-2 text-[14px] text-[rgb(var(--text-secondary))] min-w-0">
                                <span className="text-[rgb(var(--accent-text))] mt-0.5 shrink-0" aria-hidden>→</span>
                                <span className="min-w-0 break-words"><Inline text={item} /></span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
