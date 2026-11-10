"use client";

import { getLucideIcon } from "@/components/ui/iconRegistry";
import { WHY_CHOOSE_US_CONTENT } from "@/lib/universitySectionData";

type WhyChooseReason = {
    title: string;
    description: string;
    /** Optional icon NAME (kebab-case lucide) — renders only when set. */
    icon?: string;
};

type WhyChooseUsProps = {
    /** Anchor id for the sub-nav (WITHOUT the leading "#" — e.g. "why-choose-us"). */
    anchorId?: string;
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Heading part in green (before the university name). */
    titleGreen?: string;
    /** Heading part in blue (the university name part). */
    titleBlue?: string;
    /** Centered subtitle under the heading (two lines in the design). */
    subtitle?: string;
    /** Six numbered reason cards. Numbers are derived from the array order. */
    reasons?: WhyChooseReason[];
};

export const DEFAULT_CONTENT: Required<WhyChooseUsProps> = WHY_CHOOSE_US_CONTENT;

export default function WhyChooseUsSection({
    anchorId = DEFAULT_CONTENT.anchorId,
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    titleGreen = DEFAULT_CONTENT.titleGreen,
    titleBlue = DEFAULT_CONTENT.titleBlue,
    subtitle = DEFAULT_CONTENT.subtitle,
    reasons = DEFAULT_CONTENT.reasons,
}: WhyChooseUsProps) {
    return (
        <>
            <section
                id={anchorId}
                aria-label={sectionLabel}
                className="bg-[linear-gradient(120deg,var(--color-surface-alt)_0%,var(--color-surface-alt)_50%,var(--color-surface-alt)_100%)] py-16 @min-[1024px]:py-24"
            >
                <div className="mx-auto max-w-6xl px-4 @min-[640px]:px-6">
                    {/* md+ pe single-line gradient (design) — mobile pe natural wrap, warna long
                        university names canvas se bahar nikal jaate hain */}
                    <h2 className="text-center text-[clamp(1.25rem,4vw,1.875rem)] font-semibold leading-tight @min-[768px]:whitespace-nowrap">
                        <span className="inline-block bg-linear-to-r from-brand-emerald-deep to-brand-navy bg-clip-text text-transparent">
                            {titleGreen} {titleBlue}
                        </span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted">
                        {subtitle}
                    </p>

                    <div className="mt-12 grid grid-cols-1 gap-5 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3">
                        {reasons.map((reason, index) => {
                            const ReasonIcon = getLucideIcon(reason.icon);
                            return (
                                <div
                                    key={`${reason.title}-${index}`}
                                    className="relative rounded-xl bg-white p-5 pl-7 shadow-sm"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-brand-emerald"
                                    />
                                    <div className="flex items-center gap-2.5">
                                        {ReasonIcon && (
                                            <span
                                                aria-hidden="true"
                                                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-champagne-soft-bg"
                                            >
                                                <ReasonIcon size={16} className="text-brand-emerald-deep" />
                                            </span>
                                        )}
                                        <h3 className="text-base font-semibold text-ink">
                                            {index + 1}. {reason.title}
                                        </h3>
                                    </div>
                                    <p className="mt-3 text-xs leading-relaxed text-muted">
                                        {reason.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
