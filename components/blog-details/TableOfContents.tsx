"use client";

import { useEffect, useState } from "react";

/**
 * TableOfContents — Sidebar anchor navigation.
 *
 * Matches Figma node 356:15031 area (TABLE OF CONTENTS section in the article).
 * Auto-highlights the active heading as the user scrolls.
 *
 * Props
 * ─────────────────────────────────────────────────────────────
 * @param {Array<{id: string, label: string, level: number}>} items
 *   – Array of TOC entries.  level 1 = top-level (numbered), level 2 = sub-item (bullet).
 */
export default function TableOfContents({ items = DEFAULT_ITEMS }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the first visible heading
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents" className="w-full">
      {/* Header */}
      <p
        className="text-[#12211C] font-bold text-base tracking-[3.6px] uppercase mb-6"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Table of Contents
      </p>

      {/* Divider */}
      <div className="h-px bg-[#E4DDD0] mb-6" />

      {/* Items */}
      <ol className="flex flex-col gap-3">
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          const isTop = item.level === 1;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                  setActiveId(item.id);
                }}
                className={[
                  "flex items-center gap-4 transition-colors group",
                  isTop ? "ml-0" : "ml-[71px]",
                ].join(" ")}
              >
                {isTop ? (
                  /* Numbered circle */
                  <span
                    className={[
                      "flex-none w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                      isActive
                        ? "bg-brand-royal text-white"
                        : "bg-[#F1E3C8] text-brand-royal",
                    ].join(" ")}
                    aria-hidden
                  >
                    {idx + 1}
                  </span>
                ) : (
                  /* Sub-item bullet */
                  <span
                    className={[
                      "flex-none w-[6px] h-[6px] rounded-full transition-colors",
                      isActive ? "bg-brand-royal" : "bg-[#12211C]",
                    ].join(" ")}
                    aria-hidden
                  />
                )}

                <span
                  className={[
                    "text-[20px] leading-[1.569] tracking-[0.4px] transition-colors",
                    isTop ? "font-semibold" : "font-normal",
                    isActive
                      ? "text-brand-royal"
                      : "text-[#12211C] group-hover:text-brand-royal",
                  ].join(" ")}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      {/* Divider */}
      <div className="h-px bg-[#E4DDD0] mt-6" />
    </nav>
  );
}

/* ── Default items matching Figma ── */
const DEFAULT_ITEMS = [
  { id: "why-study-abroad", label: "Why Study Abroad?", level: 1 },
  {
    id: "top-destinations",
    label: "Top Destinations for International Students",
    level: 1,
  },
  {
    id: "application-process",
    label: "Application Process: A Step-by-Step Guide",
    level: 2,
  },
  {
    id: "visa-requirements",
    label: "Visa Requirements and Application Tips",
    level: 2,
  },
];
