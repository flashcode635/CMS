import Link from "next/link";

/**
 * TagsList — Pill-style tags sidebar widget.
 *
 * Matches Figma node 634:2286 (Tags section in right sidebar).
 * Each tag renders as a bordered rounded pill with the project's
 * primary blue (#0A6B44) text on white background.
 *
 * Props
 * ─────────────────────────────────────────────────────────────
 * @param {string[]} tags – Array of tag labels (with or without leading #)
 */
export default function TagsList({ tags = DEFAULT_TAGS }) {
  return (
    <aside aria-label="Post tags" className="w-full flex flex-col gap-4">
      {/* Section heading */}
      <h2
        className="text-black text-xl font-semibold leading-tight capitalize"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        Tags
      </h2>

      {/* Tag pills */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const label = tag.startsWith("#") ? tag : `#${tag}`;
          const slug = tag
            .replace(/^#/, "")
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <Link
              key={tag}
              href={`/collections/blog?tag=${slug}`}
              className="
                inline-flex items-center justify-center
                px-2.5 py-1
                bg-white
                border border-brand-sky
                rounded-[20px]
                text-brand-royal text-xs font-medium leading-normal capitalize
                transition-colors hover:bg-[#EFE9DE] whitespace-nowrap
              "
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

/* ── Default tags matching Figma ── */
const DEFAULT_TAGS = [
  "#Global Connections",
  "#Study Match",
  "#Academic Passion",
  "#Finding Your Academic Soulmate",
  "#Ideal Study Pairing",
  "#Study Romance",
  "#Pursue Your Path",
];
