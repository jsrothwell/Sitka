"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { PropsTable, type PropRow } from "@/site/docs/PropsTable";
import { ArrowList, DocSection, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

type Kind = "book" | "music" | "film" | "game";

const KINDS: Record<Kind, { aspect: string; glyph: string; tint: string; label: string }> = {
  book: { aspect: "2 / 3", glyph: "📖", tint: "var(--categorical-3)", label: "Book" },
  music: { aspect: "1 / 1", glyph: "♪", tint: "var(--categorical-7)", label: "Album" },
  film: { aspect: "2 / 3", glyph: "🎞", tint: "var(--categorical-6)", label: "Film" },
  game: { aspect: "2 / 3", glyph: "🎮", tint: "var(--categorical-5)", label: "Game" },
};

const ITEMS: { title: string; creator: string; kind: Kind; image?: string }[] = [
  { title: "The Left Hand of Darkness", creator: "Ursula K. Le Guin", kind: "book" },
  { title: "Kind of Blue", creator: "Miles Davis", kind: "music" },
  { title: "Stalker", creator: "Andrei Tarkovsky", kind: "film" },
  { title: "Untitled Box", creator: "", kind: "game" },
];

function TypographicCover({ title, creator, kind }: { title: string; creator: string; kind: Kind }) {
  const k = KINDS[kind];
  return (
    <div
      className="@container flex h-full w-full flex-col justify-between p-[9cqw] text-white"
      style={{
        background: `linear-gradient(to bottom, rgb(0 0 0 / 0.14), rgb(0 0 0 / 0.42)), rgb(${k.tint})`,
        filter: "saturate(0.72)",
      }}
    >
      <span className="text-[9cqw] opacity-85" aria-hidden>
        {k.glyph}
      </span>
      <div>
        <p className="line-clamp-5 font-serif text-[11.5cqw] font-semibold leading-tight">{title || k.label}</p>
        {creator && <p className="mt-[3cqw] line-clamp-2 text-[6.5cqw] font-medium">{creator}</p>}
      </div>
    </div>
  );
}

const PROPS: PropRow[] = [
  { name: "title", type: "string", required: true, description: "Set in a serif at ~11.5% of cover width. Falls back to the kind's name when empty." },
  { name: "creator", type: "string", default: '""', description: "Author, artist or studio. Omitted entirely when empty." },
  { name: "kind", type: "MediaKind", required: true, description: "Drives the aspect ratio (books/films 2:3, music 1:1, products 4:5), the corner glyph and the tint." },
  { name: "imageUrl", type: "string | null", default: "null", description: "Real artwork. The typographic cover is the loading and failure placeholder for it, not a separate state." },
  { name: "cornerRadius", type: "number", default: "5", description: "Kept small — covers are objects, not cards." },
];

const CODE = {
  react: {
    filename: "CoverArt.tsx",
    code: `const ASPECT: Record<MediaKind, string> = { book: "2 / 3", film: "2 / 3", music: "1 / 1", product: "4 / 5" };

/** An item's cover at its natural shape, or a designed one when it has no image,
 *  so a missing cover reads as part of the collection rather than as something broken. */
export function CoverArt({ title, creator = "", kind, imageUrl }: CoverArtProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="cover-finish" style={{ aspectRatio: ASPECT[kind] }} aria-hidden>
      {imageUrl && !failed
        ? <img src={imageUrl} alt="" onError={() => setFailed(true)} className="h-full w-full object-cover" />
        : <TypographicCover title={title} creator={creator} kind={kind} />}
    </div>
  );
}

// "What makes artwork feel like an object": soft edge + grounding shadow.
// .cover-finish { border-radius: 5px; overflow: hidden;
//   box-shadow: inset 0 0 0 0.5px rgb(var(--text-primary) / .1), 0 4px 8px rgb(0 0 0 / .18); }

function TypographicCover({ title, creator, kind }: { title: string; creator: string; kind: MediaKind }) {
  // Sizes in container-query units so the type scales with the tile.
  return (
    <div className="@container flex h-full flex-col justify-between p-[9cqw] text-white"
         style={{ background: \`linear-gradient(rgb(0 0 0/.14), rgb(0 0 0/.42)), rgb(var(--categorical-\${TINT[kind]}))\`,
                  filter: "saturate(.72)" }}>
      <KindIcon kind={kind} className="w-[9cqw] opacity-85" />
      <div>
        <p className="font-serif text-[11.5cqw] font-semibold leading-tight line-clamp-5">{title || LABEL[kind]}</p>
        {creator && <p className="mt-[3cqw] text-[6.5cqw] font-medium line-clamp-2">{creator}</p>}
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "cover-art.html",
    code: `<!-- Tiles sit on a common baseline whatever their shape, as books do on a shelf -->
<ul class="shelf">
  <li class="tile">
    <div class="tile__slot">
      <div class="cover cover--typographic" style="aspect-ratio: 2/3; --tint: var(--categorical-3)" aria-hidden="true">
        <span class="cover__glyph">📖</span>
        <div><p class="cover__title">The Left Hand of Darkness</p><p class="cover__creator">Ursula K. Le Guin</p></div>
      </div>
    </div>
    <p class="tile__title">The Left Hand of Darkness</p>
    <p class="tile__creator">Ursula K. Le Guin</p>
  </li>
</ul>

<style>
.shelf { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 24px 16px; }
.tile__slot { aspect-ratio: 2 / 3; display: flex; align-items: flex-end; }   /* common baseline */
.cover { width: 100%; border-radius: 5px; overflow: hidden; container-type: inline-size;
         box-shadow: inset 0 0 0 .5px rgb(var(--text-primary) / .1), 0 4px 8px rgb(0 0 0 / .18); }
.cover--typographic { display: flex; flex-direction: column; justify-content: space-between; padding: 9cqw; color: #fff;
  background: linear-gradient(rgb(0 0 0 / .14), rgb(0 0 0 / .42)), rgb(var(--tint)); filter: saturate(.72); }
.cover__title   { font: 600 11.5cqw/1.15 Georgia, serif; }
.cover__creator { font: 500 6.5cqw/1.3 system-ui; margin-top: 3cqw; }
</style>`,
  },
  swift: {
    filename: "CoverArtView.swift",
    code: `import SwiftUI

/// An item's cover at its natural shape, or a designed one when it has no image, so a
/// missing cover reads as part of the collection rather than as something broken.
struct CoverArtView: View {
    let item: CatalogItem
    var cornerRadius: CGFloat = 5

    var body: some View {
        AsyncImage(url: item.thumbnailURL) { image in
            image.resizable().scaledToFit().modifier(CoverFinish(cornerRadius: cornerRadius))
        } placeholder: {
            TypographicCover(title: item.title, creator: item.creator, kind: item.kind)
                .aspectRatio(item.kind.coverAspectRatio, contentMode: .fit)
                .modifier(CoverFinish(cornerRadius: cornerRadius))
        }
        .accessibilityHidden(true)   // The tile's title text carries the name.
    }
}

private struct CoverFinish: ViewModifier {
    let cornerRadius: CGFloat
    func body(content: Content) -> some View {
        let shape = RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
        content
            .clipShape(shape)
            .overlay(shape.strokeBorder(.primary.opacity(0.1), lineWidth: 0.5))
            .shadow(color: .black.opacity(0.18), radius: 8, y: 4)
    }
}

/// Set like a plain cloth binding: muted, so it doesn't shout over real artwork.
private struct TypographicCover: View {
    let title: String, creator: String, kind: MediaKind

    var body: some View {
        GeometryReader { geo in
            let unit = geo.size.width
            VStack(alignment: .leading, spacing: unit * 0.03) {
                Image(systemName: kind.systemImage)
                    .font(.system(size: unit * 0.09, weight: .medium))
                    .foregroundStyle(.white.opacity(0.85))
                Spacer(minLength: 0)
                Text(title.isEmpty ? kind.displayName : title)
                    .font(.system(size: unit * 0.115, weight: .semibold, design: .serif))
                    .lineLimit(5).minimumScaleFactor(0.6)
                if !creator.isEmpty {
                    Text(creator).font(.system(size: unit * 0.065, weight: .medium)).lineLimit(2)
                }
            }
            .foregroundStyle(.white)
            .padding(unit * 0.09)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
            .background {
                ZStack {
                    kind.tint.saturation(0.72)   // Base tints measured ≥ 4.5:1 against white
                    LinearGradient(colors: [.black.opacity(0.14), .black.opacity(0.42)],
                                   startPoint: .top, endPoint: .bottom)
                }
            }
        }
    }
}`,
  },
};

export default function CoverArtPage() {
  const [width, setWidth] = useState(130);
  return (
    <div>
      <PageHeader
        title="Cover Art"
        badge="New"
        description="Artwork for a catalog item at its natural shape — 2:3 for books and films, square for albums — with a designed typographic cover when there's no image, so a missing cover looks like part of the collection instead of a broken thumbnail."
      />
      <SourceNote
        sources={[
          { app: "scanflo", file: "DesignTokens/CoverArt.swift" },
          { app: "scanflo", file: "DesignTokens/ThumbnailCropView.swift" },
        ]}
      />

      <PreviewSection>
        <ul className="grid gap-x-4 gap-y-6" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${width}px, 1fr))` }}>
          {ITEMS.map((item) => (
            <li key={item.title}>
              {/* Common baseline: every slot is 2:3, covers sit at its bottom */}
              <div className="flex items-end" style={{ aspectRatio: "2 / 3" }}>
                <div
                  className="w-full overflow-hidden rounded-[5px] shadow-[inset_0_0_0_0.5px_rgb(var(--text-primary)/0.1),0_4px_8px_rgb(0_0_0/0.18)]"
                  style={{ aspectRatio: KINDS[item.kind].aspect }}
                  aria-hidden
                >
                  <TypographicCover title={item.title} creator={item.creator} kind={item.kind} />
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-[13px] font-medium text-[rgb(var(--text-primary))]">{item.title}</p>
              {item.creator && <p className="line-clamp-1 text-[12px] text-[rgb(var(--text-secondary))]">{item.creator}</p>}
            </li>
          ))}
        </ul>
        <label className="mt-6 flex items-center gap-3 text-[12px] text-[rgb(var(--text-secondary))]">
          Tile width
          <input type="range" min={90} max={220} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="flex-1" />
          <span className="w-12 text-right tabular-nums">{width}px</span>
        </label>
      </PreviewSection>

      <DocSection title="Props">
        <PropsTable props={PROPS} />
      </DocSection>

      <DocSection title="Design rules">
        <ArrowList
          items={[
            "Natural shape, common baseline: covers keep their real aspect ratio and sit on the bottom of a fixed 2:3 slot, so a square album and a tall paperback line up like objects on a shelf.",
            "No card around tiles. The cover's 0.5px hairline and grounding shadow make it an object; a card would make it a UI element.",
            "Muted on purpose: the generated cover desaturates its tint (×0.72) and darkens toward the bottom, so it never out-shouts real artwork beside it.",
            "All type scales with the cover's width (container units / GeometryReader), so one design works from a 60px list thumbnail to a 300px detail hero.",
            "Custom artwork is cropped to the same fixed ratio (drag + pinch, one mask, one “Use Photo”) — deliberately not a photo editor.",
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Catalogs of physical things", body: "Books, records, films, games, collectibles — anything with a title and creator where real artwork is often missing.", good: true },
            { heading: "Loading placeholder", body: "Show the typographic cover while the real image loads; it's a better skeleton than a gray box because it's already informative.", good: true },
            { heading: "Avatars and people", body: "Use Avatar with initials instead. Cover Art implies an object with a title.", good: false },
            { heading: "Bright brand tints", body: "Don't feed it saturated brand colors — white text needs the base tint to clear 4.5:1 before the darkening overlay.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "The cover is decorative (aria-hidden / accessibilityHidden): the tile's visible title and creator text carry the name, so it isn't read twice.",
            "At accessibility Dynamic Type sizes, let the tile's title wrap to 5 lines instead of 2 rather than truncating.",
            "Selection and “open in detail pane” states need a non-color mark (checkmark badge, 2.5px outline) — not only a tint change.",
          ]}
        />
      </DocSection>
    </div>
  );
}
