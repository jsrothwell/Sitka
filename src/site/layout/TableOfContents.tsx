"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib";

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Small delay so the new page's DOM is fully painted before we scan.
    const timer = setTimeout(() => {
      const main = document.querySelector("main");
      if (!main) return;

      const elements = Array.from(main.querySelectorAll("h2, h3"));
      const entries: TocEntry[] = [];
      const seen = new Map<string, number>();

      elements.forEach((el) => {
        const text = el.textContent?.trim() ?? "";
        if (!text) return;

        const base = slugify(text);
        if (!base) return;

        // Deduplicate: "implementation", "implementation-2", "implementation-3"…
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        const id = count === 0 ? base : `${base}-${count + 1}`;

        el.id = id;
        entries.push({ id, text, level: parseInt(el.tagName[1], 10) });
      });

      setHeadings(entries);
      setActiveId(entries[0]?.id ?? "");

      const observer = new IntersectionObserver(
        (obs) => {
          const visible = obs
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        },
        { rootMargin: "-10% 0% -60% 0%", threshold: 0 }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="On this page">
      <p className="label-mono mb-3 text-[rgb(var(--text-tertiary))]">On this page</p>
      <ul className="flex flex-col gap-0.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(h.id);
                }
              }}
              className={cn(
                "block py-1 text-[12px] leading-snug transition-colors duration-150",
                h.level === 3 && "pl-3",
                activeId === h.id
                  ? "font-medium"
                  : "hover:text-[rgb(var(--text-secondary))]"
              )}
              style={
                activeId === h.id
                  ? { color: "var(--nav-active-color)" }
                  : { color: "rgb(var(--text-tertiary))" }
              }
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
