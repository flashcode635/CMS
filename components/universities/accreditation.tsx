"use client";

import { Check } from "lucide-react";
import { getLucideIcon } from "@/components/ui/iconRegistry";
import { ACCREDITATION_CONTENT } from "@/lib/universitySectionData";

/**
 * Accreditation — dark royal band; left = eyebrow/heading/paragraphs/quote/
 * green-check checklist, right = stacked white accreditation cards
 * (icon chip + title + description), bottom = full-width highlight card.
 *
 * Icons are stored as kebab-case lucide NAME strings (CMS-editable via the
 * icon picker — see components/ui/iconRegistry.tsx). `iconTone` keeps the
 * shipped two-colour design (emerald / champagne chips).
 */

type AccreditationCard = {
    title: string;
    description: string;
    /** Icon NAME from the CMS icon registry (kebab-case, e.g. "badge-check"). */
    icon?: string;
    /** Chip colour: "emerald" (default) or "champagne". */
    iconTone?: "emerald" | "champagne";
};

type AccreditationProps = {
    /** Anchor id for the sub-nav (use WITHOUT the leading "#" — e.g. "accreditation"). */
    anchorId?: string;
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Small uppercase label above the heading. */
    eyebrow?: string;
    heading?: string;
    paragraphs?: string[];
    /** Bold stand-out quote under the paragraphs. */
    quote?: string;
    /** Lead-in line above the checklist. */
    checklistLabel?: string;
    /** Green-check bullet items. */
    checklist?: string[];
    /** Stacked white cards on the right. */
    cards?: AccreditationCard[];
    /** Title of the full-width white card at the bottom. */
    highlightTitle?: string;
    /** Body of the full-width white card at the bottom. */
    highlightText?: string;
    /** Icon NAME for the highlight card's round white chip. */
    highlightIcon?: string;
};

const chipToneClass: Record<"emerald" | "champagne", string> = {
    emerald: "text-brand-emerald-deep",
    champagne: "text-brand-champagne",
};

export const DEFAULT_CONTENT: Required<AccreditationProps> = ACCREDITATION_CONTENT;

export default function AccreditationSection({
    anchorId = "accreditation",
    sectionLabel = "Recognition and accreditation",
    eyebrow = DEFAULT_CONTENT.eyebrow,
    heading = DEFAULT_CONTENT.heading,
    paragraphs = DEFAULT_CONTENT.paragraphs,
    quote = DEFAULT_CONTENT.quote,
    checklistLabel = DEFAULT_CONTENT.checklistLabel,
    checklist = DEFAULT_CONTENT.checklist,
    cards = DEFAULT_CONTENT.cards,
    highlightTitle = DEFAULT_CONTENT.highlightTitle,
    highlightText = DEFAULT_CONTENT.highlightText,
    highlightIcon = DEFAULT_CONTENT.highlightIcon,
}: AccreditationProps) {
    const HighlightIcon = getLucideIcon(highlightIcon);
    return (
        <section
            id={anchorId}
            aria-label={sectionLabel}
            className="bg-[radial-gradient(120%_140%_at_88%_35%,var(--color-brand-royal)_0%,var(--color-brand-royal)_45%,var(--color-brand-forest-deep)_100%)] py-9 @min-[1024px]:py-15"
        >
            <div className="mx-auto max-w-7xl px-6 @min-[640px]:px-8 @min-[1024px]:px-15">
                {/* Top: left copy + right cards */}
                <div className="grid grid-cols-1 gap-12 @min-[1024px]:grid-cols-[6fr_5fr] @min-[1024px]:gap-16">
                    {/* Left: heading, paragraphs, quote, checklist */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-champagne">
                            {eyebrow}
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold text-white @min-[1024px]:text-4xl">
                            {heading}
                        </h2>

                        <div className="mt-8 space-y-5 text-sm leading-relaxed text-brand-champagne-soft/80">
                            {paragraphs.map((paragraph) => (
                                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                            ))}
                        </div>

                        <p className="mt-6 text-sm font-semibold leading-relaxed text-white">
                            {quote}
                        </p>

                        <p className="mt-6 text-xs text-brand-champagne-soft/70">{checklistLabel}</p>
                        <ul className="mt-3 space-y-2">
                            {checklist.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-2 text-xs text-brand-champagne-soft/90"
                                >
                                    <Check
                                        className="mt-0.5 h-3.5 w-3.5 flex-none text-brand-champagne"
                                        aria-hidden="true"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: stacked accreditation cards — CMS-editable */}
                    <div className="flex flex-col justify-center gap-6">
                        {cards.map((card, index) => {
                            const CardIcon = getLucideIcon(card.icon);
                            const tone: "emerald" | "champagne" =
                                card.iconTone === "champagne" ? "champagne" : "emerald";
                            return (
                                <div
                                    key={`${card.title}-${index}`}
                                    className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-lg @min-[1024px]:p-6"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="absolute left-0 top-1/2 h-2/3 w-1.5 -translate-y-1/2 rounded-r-full bg-linear-to-b from-brand-emerald to-brand-forest"
                                    />
                                    <div className="flex items-center gap-4">
                                        {CardIcon && (
                                            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-brand-champagne-soft-bg">
                                                <CardIcon
                                                    className={`h-6 w-6 ${chipToneClass[tone]}`}
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        )}
                                        <h3 className="text-lg font-semibold text-brand-forest">
                                            {card.title}
                                        </h3>
                                    </div>
                                    <div className="mt-3 border-t border-line pt-3">
                                        <p className="text-xs leading-relaxed text-muted">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom: full-width highlight card */}
                <div className="mt-12 rounded-2xl bg-white p-6 shadow-lg @min-[1024px]:p-8">
                    <div className="flex items-center gap-3">
                        {HighlightIcon && (
                            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-brand-champagne-soft">
                                <HighlightIcon
                                    className="h-5 w-5 text-brand-emerald-deep"
                                    aria-hidden="true"
                                />
                            </span>
                        )}
                        <h3 className="text-lg font-semibold text-brand-forest">
                            {highlightTitle}
                        </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-brand-emerald-deep/80">
                        {highlightText}
                    </p>
                </div>
            </div>
        </section>
    );
}
