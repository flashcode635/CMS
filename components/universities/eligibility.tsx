"use client";

import type { ReactNode } from "react";
import { ELIGIBILITY_CONTENT } from "@/lib/universitySectionData";

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

export const DEFAULT_CONTENT: Required<EligibilityProps> = ELIGIBILITY_CONTENT;

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
            className="bg-[linear-gradient(135deg,var(--color-brand-forest-deep)_0%,var(--color-brand-royal)_48%,var(--color-brand-royal)_100%)] py-12 text-white @min-[640px]:py-14 @min-[1024px]:py-16"
        >
            <div className="mx-auto max-w-7xl px-6 @min-[640px]:px-8 @min-[1024px]:px-25">
                <h2 className="text-3xl font-medium tracking-tight @min-[640px]:text-4xl">
                    {heading}
                </h2>
                <div
                    aria-hidden="true"
                    className="mt-2 h-0.5 w-full rounded-full bg-brand-champagne"
                />
                <p className="mt-3 text-xs leading-relaxed text-brand-champagne-soft/80 @min-[640px]:text-sm">
                    {intro}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-4">
                    {criteria.map((criterion, index) => (
                        <article
                            key={`${criterion.title}-${index}`}
                            className="min-h-24 rounded-md bg-white px-4 py-4 text-brand-forest-deep shadow-md @min-[640px]:min-h-28"
                        >
                            <h3 className="flex items-baseline gap-1 text-base font-medium">
                                <span className="text-2xl font-semibold text-brand-forest">
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
