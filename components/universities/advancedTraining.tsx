"use client";

import { CircleCheck } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { ADVANCED_TRAINING_CONTENT } from "@/lib/universitySectionData";

type AdvancedTrainingProps = {
    /** Anchor id for the sub-nav (WITHOUT the leading "#"). */
    anchorId?: string;
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Heading part in green (first line). */
    titleGreen?: string;
    /** Heading part in blue (second line). */
    titleBlue?: string;
    /** Intro paragraph on the dark panel. */
    intro?: string;
    /** Teal-check bullet items. */
    highlights?: string[];
    /** Photo on the right half of the card (static import or URL string). */
    imageSrc?: StaticImageData | string;
    /** Alt text for the photo. */
    imageAlt?: string;
};

export const DEFAULT_CONTENT: Required<AdvancedTrainingProps> = ADVANCED_TRAINING_CONTENT;

export default function AdvancedTrainingSection({
    anchorId = DEFAULT_CONTENT.anchorId,
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    titleGreen = DEFAULT_CONTENT.titleGreen,
    titleBlue = DEFAULT_CONTENT.titleBlue,
    intro = DEFAULT_CONTENT.intro,
    highlights = DEFAULT_CONTENT.highlights,
    imageSrc = DEFAULT_CONTENT.imageSrc,
    imageAlt = DEFAULT_CONTENT.imageAlt,
}: AdvancedTrainingProps) {
    return (
        <section
            id={anchorId}
            aria-label={sectionLabel}
            className="bg-[linear-gradient(120deg,var(--color-surface-alt)_0%,var(--color-surface-alt)_50%,var(--color-surface-alt)_100%)] py-16 @min-[1024px]:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 @min-[640px]:px-6">
                <div className="grid overflow-hidden rounded-2xl shadow-xl @min-[1024px]:grid-cols-2">
                    {/* Left: dark navy panel */}
                    <div className="bg-brand-forest-deep p-8 @min-[1024px]:p-12">
                        <h2 className="text-2xl font-semibold leading-snug @min-[1024px]:text-3xl">
                            <span className="text-brand-champagne">{titleGreen}</span>{" "}
                            <span className="block text-brand-champagne">{titleBlue}</span>
                        </h2>

                        <p className="mt-6 text-xs leading-relaxed text-brand-champagne-soft/75">
                            {intro}
                        </p>

                        <ul className="mt-8 space-y-3">
                            {highlights.map((highlight) => (
                                <li
                                    key={highlight}
                                    className="flex items-start gap-2.5 text-xs text-brand-champagne-soft/90"
                                >
                                    <CircleCheck
                                        className="mt-0.5 h-4 w-4 flex-none text-brand-champagne"
                                        aria-hidden="true"
                                    />
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: photo */}
                    <div className="relative min-h-64 @min-[1024px]:min-h-96">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            placeholder={typeof imageSrc === "string" ? "empty" : "blur"}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
