"use client";

import { FACULTY_CONTENT } from "@/lib/universitySectionData";

/**
 * Faculty — "Faculty of <University>, Russia" section:
 * dark navy band with a decorative circle; white left-aligned heading, a thin
 * divider, a muted intro paragraph and a responsive grid of numbered white
 * faculty cards (auto-numbered label + blue faculty name).
 *
 * CMS compatibility (same approach as the other university sections):
 *  - Every prop is optional with a default from `DEFAULT_CONTENT`, so a CMS can
 *    render it with plain JSON via `<FacultySection {...cmsContent} />`.
 *  - The univNav wiring passes `universityName` and swaps the hard-coded
 *    "Samara …" tokens at render time (see `universityName.ts`) — no React
 *    nodes required in the data.
 *  - Card numbers derive from array order, NOT stored in the data.
 */

type FacultyItem = {
    /** Faculty name as it should be displayed, e.g. "Institute of Pharmacy". */
    label: string;
    /** Optional link target — an <a> when set, plain text otherwise. */
    href?: string;
};

type FacultyProps = {
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Full heading — plain white (per the design, not two-tone). */
    title?: string;
    /** Intro paragraph under the divider. */
    intro?: string;
    /** Faculty cards (grid, order preserved; numbers come from array order). */
    items?: FacultyItem[];
};

export const DEFAULT_CONTENT: Required<FacultyProps> = FACULTY_CONTENT;

export default function FacultySection({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    title = DEFAULT_CONTENT.title,
    intro = DEFAULT_CONTENT.intro,
    items = DEFAULT_CONTENT.items,
}: FacultyProps) {
    return (
        <section
            aria-label={sectionLabel}
            className="relative overflow-hidden bg-[linear-gradient(150deg,var(--color-brand-forest-deep)_0%,var(--color-brand-forest-deep)_100%)] py-16 @min-[1024px]:py-24"
        >
            {/* Decorative circle (bottom-right, as in the design) */}
            <div
                aria-hidden="true"
                className="absolute -bottom-40 right-[-6rem] size-[26rem] rounded-full bg-brand-forest/25"
            />

            <div className="relative mx-auto max-w-7xl px-4 @min-[640px]:px-6 @min-[1024px]:px-25">
                <h2 className="max-w-2xl text-[clamp(1.35rem,3vw,1.9rem)] font-semibold leading-snug text-white">
                    {title}
                </h2>
                <div
                    aria-hidden="true"
                    className="mt-3 h-px bg-white/20"
                />
                <p className="mt-4 max-w-2xl text-xs leading-relaxed text-brand-champagne-soft/70 @min-[640px]:text-sm">
                    {intro}
                </p>

                {/* Numbered faculty cards */}
                <ul className="mt-10 grid grid-cols-1 gap-3 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-4">
                    {items.map((item, index) => (
                        <li
                            key={item.label}
                            className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-md"
                        >
                            <span
                                aria-hidden="true"
                                className="text-xs font-bold text-ink"
                            >
                                {index + 1}.
                            </span>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="text-xs font-medium text-brand-emerald-deep hover:underline"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span className="text-xs font-medium text-brand-emerald-deep">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
