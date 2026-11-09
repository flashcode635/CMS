"use client";

import { BadgeCheck, Building2, Check, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";

type AccreditationCard = {
    title: string;
    description: string;
    /** Icon rendered left of the title. */
    icon: ReactNode;
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
    /** Two stacked white cards on the right. */
    cards?: AccreditationCard[];
    /** Title of the full-width white card at the bottom. */
    highlightTitle?: string;
    /** Body of the full-width white card at the bottom. */
    highlightText?: string;
    highlightIcon?: ReactNode;
};

const WFME_ICON: ReactNode = (
    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-champagne-soft-bg">
        <BadgeCheck className="h-6 w-6 text-brand-emerald-deep" aria-hidden="true" />
    </span>
);

const IAAR_ICON: ReactNode = (
    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-champagne-soft-bg">
        <Building2 className="h-6 w-6 text-brand-champagne" aria-hidden="true" />
    </span>
);

export const DEFAULT_CONTENT: Required<AccreditationProps> = {
    anchorId: "accreditation",
    sectionLabel: "Recognition and accreditation",
    eyebrow: "Global Standards",
    heading: "Recognition & Accreditation",
    paragraphs: [
        "Samara State Medical University (SamSMU) holds strong international recognition due to its high academic standards and globally accepted medical education system.",
    ],
    quote:
        "With this dual accreditation system, graduates from SemSMU are eligible to practice in various countries, as the acceptance of their degree is significantly improved.",
    checklistLabel:
        "Practicing medicine in different countries (after required licensing exam):",
    checklist: [
        "Pursue postgraduate medical studies abroad",
        "Securing better international career opportunities",
    ],
    cards: [
        {
            title: "WFME Accredited",
            description:
                "Accredited by the World Federation of Medical Education (WFME), meeting international standards comparable to global medical schools.",
            icon: WFME_ICON,
        },
        {
            title: "IAAR/NAAR Recognized",
            description:
                "Ensuring medical degrees are aligned with European education standards, improving degree acceptance worldwide.",
            icon: IAAR_ICON,
        },
    ],
    highlightTitle: "Global Career Pathway (USA & Canada)",
    highlightText:
        "Accreditation also emphasizes the importance of qualifying your qualifications recognized in various countries. Furthermore, the WFME accreditation qualifies graduates to pursue the Educational Commission for Foreign Medical Graduates (ECFMG) certification, which is a prerequisite for medical careers in the USA and Canada. Graduates can also potentially apply for United States Medical Licensing Examination (USMLE), which is a crucial step for medical licensure in the USA.",
    highlightIcon: (
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-brand-champagne-soft">
            <GraduationCap className="h-5 w-5 text-brand-emerald-deep" aria-hidden="true" />
        </span>
    ),
};

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

                    {/* Right: stacked accreditation cards */}
                    <div className="flex flex-col justify-center gap-6">
                        {cards.map((card) => (
                            <div
                                key={card.title}
                                className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-lg @min-[1024px]:p-6"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute left-0 top-1/2 h-2/3 w-1.5 -translate-y-1/2 rounded-r-full bg-linear-to-b from-brand-emerald to-brand-forest"
                                />
                                <div className="flex items-center gap-4">
                                    {card.icon}
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
                        ))}
                    </div>
                </div>

                {/* Bottom: full-width highlight card */}
                <div className="mt-12 rounded-2xl bg-white p-6 shadow-lg @min-[1024px]:p-8">
                    <div className="flex items-center gap-3">
                        {highlightIcon}
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
