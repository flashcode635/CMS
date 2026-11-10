"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLucideIcon } from "@/components/ui/iconRegistry";
import { ADMISSION_CONTENT } from "@/lib/universitySectionData";

/**
 * AdmissionProcess — dark photo band with a horizontal step timeline
 * (heading → numbered step cards on a dotted rail → gradient CTA button),
 * styled after the university page design.
 *
 * CMS compatibility:
 *  - Every prop is optional with a default from `DEFAULT_CONTENT`, so a CMS can
 *    render it with plain JSON via `<AdmissionProcessSection {...cmsContent} />`.
 *  - Steps reference icons by NAME string via the central CMS icon registry
 *    (components/ui/iconRegistry.tsx) — serializable, no React nodes. Unknown
 *    names render no icon.
 *  - Step numbers are derived from array order, NOT stored in the data
 *    (reordering/reducing the `steps` array renumbers automatically).
 *
 * Note: the section itself carries NO anchor id — the wrapper `<div id>` in the
 * page layout provides the anchor for the sticky sub-nav.
 */

type AdmissionStep = {
    /** Card title, e.g. "Application Submission". */
    title: string;
    description: string;
    /** Icon NAME from the ICONS registry (kebab-case string, e.g. "plane"). */
    icon?: string;
    /** Optional explicit label ("Step 1" etc.); derived from array order when omitted. */
    stepLabel?: string;
};

type AdmissionProcessProps = {
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Full heading — rendered with a green→blue gradient (per the design). */
    title?: string;
    subtitle?: string;
    /** Step cards. Numbers come from the array order (Step 1, Step 2, …). */
    steps?: AdmissionStep[];
    ctaLabel?: string;
    /** Where the CTA button links (default: the in-page Free Counselling form). */
    ctaHref?: string;
    /** Band background photo — URL string (CMS) or static image import. */
    backgroundImageSrc?: StaticImageData | string;
    imageAlt?: string;
};

export const DEFAULT_CONTENT: Required<AdmissionProcessProps> = ADMISSION_CONTENT;

export default function AdmissionProcessSection({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    title = DEFAULT_CONTENT.title,
    subtitle = DEFAULT_CONTENT.subtitle,
    steps = DEFAULT_CONTENT.steps,
    ctaLabel = DEFAULT_CONTENT.ctaLabel,
    ctaHref = DEFAULT_CONTENT.ctaHref,
    backgroundImageSrc = DEFAULT_CONTENT.backgroundImageSrc,
    imageAlt = DEFAULT_CONTENT.imageAlt,
}: AdmissionProcessProps) {
    return (
        <section
            aria-label={sectionLabel}
            className="relative overflow-hidden py-14 @min-[1024px]:py-20"
        >
            {/* Background photo + dark overlay */}
            <Image
                src={backgroundImageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-brand-forest-deep/90"
            />

            <div className="relative mx-auto max-w-7xl px-4 @min-[640px]:px-6">
                <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight">
                    <span className="bg-linear-to-r from-brand-emerald to-brand-champagne bg-clip-text text-transparent">
                        {title}
                    </span>
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-center text-sm text-brand-champagne-soft/80">
                    {subtitle}
                </p>

                {/* Timeline rail with dots — desktop only (aligns with the card row) */}
                <div
                    aria-hidden="true"
                    className="relative mt-14 hidden @min-[1024px]:block"
                >
                    <div className="absolute inset-x-10 top-1/2 h-px -translate-y-1/2 bg-white/50" />
                    <div className="grid" style={{ gridTemplateColumns: `repeat(${Math.max(steps.length, 1)}, minmax(0, 1fr))` }}>
                        {steps.map((step, index) => (
                            <div
                                key={`${step.title}-${index}`}
                                className="flex justify-center"
                            >
                                <span className="relative z-10 block size-3 rounded-full border-2 border-white bg-brand-forest-deep" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step cards — CMS-editable (add/delete/reorder + icon picker) */}
                <ol
                    className="mt-6 grid grid-cols-1 gap-4 @min-[640px]:grid-cols-2 @min-[1024px]:mt-2 @min-[1024px]:grid-cols-[repeat(var(--adp-cols),minmax(0,1fr))] @min-[1024px]:gap-3"
                    style={{ "--adp-cols": Math.max(steps.length, 1) } as React.CSSProperties}
                >
                    {steps.map((step, index) => {
                        const StepIcon = getLucideIcon(step.icon);
                        return (
                            <li
                                key={`${step.title}-${index}`}
                                className="rounded-xl border border-white/30 bg-white/5 p-4 backdrop-blur-sm"
                            >
                                {StepIcon && (
                                    <StepIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 text-white/90"
                                        strokeWidth={1.5}
                                    />
                                )}
                                <p className="mt-3 text-[10px] font-semibold tracking-wide text-brand-champagne uppercase">
                                    {step.stepLabel ?? `Step ${index + 1}`}
                                </p>
                                <h3 className="mt-1 text-sm font-semibold text-brand-champagne-soft">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed text-brand-champagne-soft/70">
                                    {step.description}
                                </p>
                            </li>
                        );
                    })}
                </ol>

                {/* CTA */}
                <div className="mt-10 flex justify-center">
                    <Link
                        href={ctaHref}
                        className="group inline-flex items-center gap-2 rounded-md bg-linear-to-r from-brand-emerald-deep to-brand-forest px-6 py-3 text-sm font-medium text-white shadow-md transition-opacity hover:opacity-90"
                    >
                        {ctaLabel}
                        <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
