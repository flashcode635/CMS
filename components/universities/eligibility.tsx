"use client";

import type { ReactNode } from "react";

export type EligibilityCriterion = {
    title: string;
    description: ReactNode;
};

type EligibilityProps = {
    anchorId?: string;
    sectionLabel?: string;
    heading?: string;
    intro?: string;
    criteria?: EligibilityCriterion[];
    footer?: ReactNode;
};

export const DEFAULT_CONTENT: Required<EligibilityProps> = {
    anchorId: "eligibility",
    sectionLabel: "Eligibility criteria",
    heading: "Eligibility Criteria",
    intro:
        "To secure admission in Samara State Medical University for MBBS, students must fulfill the following criteria:",
    criteria: [
        {
            title: "Education",
            description:
                "The applicant must have completed 10+2 education with Physics, Chemistry, and Biology.",
        },
        {
            title: "PCB marks",
            description:
                "A minimum of 50% marks in PCB subjects is required for general category students (40% for reserved categories).",
        },
        {
            title: "NEET",
            description:
                "The student must qualify for the NEET examination.",
        },
        {
            title: "Age",
            description:
                "The minimum age should be 17 years at the time of admission.",
        },
    ],
    footer: (
        <>
            These requirements are in line with the guidelines for Indian students
            planning to study <strong className="text-red-400">MBBS abroad</strong>,
            ensuring eligibility for future medical licensing exams.
        </>
    ),
};

export default function EligibilitySection({
    anchorId = DEFAULT_CONTENT.anchorId,
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    heading = DEFAULT_CONTENT.heading,
    intro = DEFAULT_CONTENT.intro,
    criteria = DEFAULT_CONTENT.criteria,
    footer = DEFAULT_CONTENT.footer,
}: EligibilityProps) {
    return (
        <section
            id={anchorId}
            aria-label={sectionLabel}
            className="bg-[linear-gradient(135deg,#061d3b_0%,#0b2f80_48%,#123fe0_100%)] py-12 text-white @min-[640px]:py-14 @min-[1024px]:py-16"
        >
            <div className="mx-auto max-w-7xl px-6 @min-[640px]:px-8 @min-[1024px]:px-25">
                <h2 className="text-3xl font-medium tracking-tight @min-[640px]:text-4xl">
                    {heading}
                </h2>
                <div
                    aria-hidden="true"
                    className="mt-2 h-0.5 w-full rounded-full bg-[#70ad52]"
                />
                <p className="mt-3 text-xs leading-relaxed text-brand-champagne-soft/80 @min-[640px]:text-sm">
                    {intro}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-4">
                    {criteria.map((criterion, index) => (
                        <article
                            key={`${criterion.title}-${index}`}
                            className="min-h-24 rounded-md bg-white px-4 py-4 text-[#0B3B2E] shadow-md @min-[640px]:min-h-28"
                        >
                            <h3 className="flex items-baseline gap-1 text-base font-medium">
                                <span className="text-2xl font-semibold text-[#0E8F5B]">
                                    {index + 1}.
                                </span>
                                <span className="text-brand-emerald-deep">
                                    {criterion.title}
                                </span>
                            </h3>
                            <p className="mt-2 text-[10px] leading-[1.4] text-body @min-[640px]:text-[11px]">
                                {criterion.description}
                            </p>
                        </article>
                    ))}
                </div>

                <p className="mt-6 max-w-3xl text-xs leading-relaxed text-brand-champagne-soft/90 @min-[640px]:text-sm">
                    {footer}
                </p>
            </div>
        </section>
    );
}
