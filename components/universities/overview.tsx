"use client";

import { ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { OVERVIEW_CONTENT } from "@/lib/universitySectionData";

type OverviewProps = {
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Heading part rendered in green (first line). */
    titleGreen?: string;
    /** Heading part rendered in blue (second line). */
    titleBlue?: string;
    /** Intro paragraphs shown under the heading. */
    paragraphs?: string[];
    /** CTA link target. */
    ctaHref?: string;
    /** CTA link text. */
    ctaLabel?: string;
    /** Photo on the right (static import or URL string). */
    imageSrc?: StaticImageData | string;
    /** Alt text for the photo. */
    imageAlt?: string;
    /** Big number inside the overlapping badge, e.g. "14+ Years". */
    badgeCount?: string;
    /** Small caption inside the overlapping badge. */
    badgeText?: string;
};

export const DEFAULT_CONTENT: Required<OverviewProps> = OVERVIEW_CONTENT;

export default function UniversityOverview({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    titleGreen = DEFAULT_CONTENT.titleGreen,
    titleBlue = DEFAULT_CONTENT.titleBlue,
    paragraphs = DEFAULT_CONTENT.paragraphs,
    ctaHref = DEFAULT_CONTENT.ctaHref,
    ctaLabel = DEFAULT_CONTENT.ctaLabel,
    imageSrc = DEFAULT_CONTENT.imageSrc,
    imageAlt = DEFAULT_CONTENT.imageAlt,
    badgeCount = DEFAULT_CONTENT.badgeCount,
    badgeText = DEFAULT_CONTENT.badgeText,
}: OverviewProps) {
    return (
        <section aria-label={sectionLabel} className="bg-surface py-16 @min-[1024px]:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1
             items-center gap-12 px-4 @min-[640px]:px-8 @min-[1024px]:px-25 @min-[1024px]:grid-cols-[5fr_6fr] @min-[1024px]:gap-16">
                {/* Left: heading + paragraphs + CTA */}
                <div>
                    <div className="flex gap-4">
                        <div
                            aria-hidden="true"
                            className="w-1.5 flex-none rounded-full bg-brand-emerald"
                        />
                        <h2 className="text-3xl font-semibold leading-snug @min-[1024px]:text-4xl">
                            <span className="text-brand-emerald-deep">{titleGreen}</span>{" "}
                            <span className="block text-brand-emerald-deep">{titleBlue}</span>
                        </h2>
                    </div>

                    <div className="mt-8 space-y-6 text-sm leading-relaxed text-body @min-[1024px]:pl-5.5">
                        {paragraphs.map((paragraph) => (
                            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                        ))}
                    </div>

                    <Link
                        href={ctaHref}
                        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand-emerald-deep to-brand-forest px-8 py-4 text-sm font-medium text-white shadow-md transition-opacity hover:opacity-90 @min-[1024px]:ml-5.5"
                    >
                        {ctaLabel}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>

                {/* Right: photo with overlapping badge */}
                <div className="relative">
                    <div className="overflow-hidden rounded-2xl">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={1200}
                            height={1600}
                            className="h-full w-full object-cover"
                            placeholder={typeof imageSrc === "string" ? "empty" : "blur"}
                        />
                    </div>

                    <div className="absolute bottom-4 left-4 rounded-xl bg-ink px-6 py-5 shadow-xl @min-[1024px]:-bottom-4 @min-[1024px]:-left-10">
                        <p className="text-xl font-bold text-white">{badgeCount}</p>
                        <p className="mt-1 text-xs text-brand-champagne-soft">{badgeText}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
