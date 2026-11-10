"use client";

import Image, { type StaticImageData } from "next/image";
import { getLucideIcon } from "@/components/ui/iconRegistry";
import { DOCUMENTS_CONTENT } from "@/lib/universitySectionData";

/**
 * Documents — "Documents Required For <University>" section:
 * mint→periwinkle gradient band; left = oval-clipped photo with an outer ring,
 * right = green-bar two-tone heading, intro paragraphs and a 2-col grid of
 * white document cards (tinted icon + label).
 *
 * CMS compatibility (same approach as `admissionProcess.tsx`):
 *  - Every prop is optional with a default from `DEFAULT_CONTENT`, so a CMS can
 *    render it with plain JSON via `<DocumentsSection {...cmsContent} />`.
 *  - Items reference icons by NAME string via the central CMS icon registry
 *    (components/ui/iconRegistry.tsx) and colours by NAME string (TONES below)
 *    — data stays serializable, no React nodes.
 *  - Unknown icon names render no icon; unknown tones fall back to "blue".
 */

/* Colour tones for the icon chips, also referenced by NAME string. */
const TONES: Record<string, string> = {
    blue: "bg-brand-champagne-soft-bg/50 text-brand-emerald-deep",
    red: "bg-red-50 text-red-600",
    green: "bg-brand-champagne-soft-bg/60 text-brand-emerald-deep",
};
type DocumentItem = {
    /** Card label, e.g. "Passport-size photos". Doubles as the React key. */
    title: string;
    /** Icon NAME from the ICONS registry (kebab-case string, e.g. "mail"). */
    icon?: string;
    /** Chip colour NAME from the TONES registry ("blue" | "red" | "green"). */
    tone?: string;
};

type DocumentsProps = {
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Heading part in green (before the university name). */
    titleGreen?: string;
    /** Heading part in blue (the university name part). */
    titleBlue?: string;
    /** Intro paragraphs under the heading (order preserved). */
    paragraphs?: string[];
    /** Document cards (2-col grid, order preserved). */
    items?: DocumentItem[];
    /** Oval-clipped photo — URL string (CMS) or static image import. */
    imageSrc?: StaticImageData | string;
    imageAlt?: string;
};

export const DEFAULT_CONTENT: Required<DocumentsProps> = DOCUMENTS_CONTENT;

export default function DocumentsSection({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    titleGreen = DEFAULT_CONTENT.titleGreen,
    titleBlue = DEFAULT_CONTENT.titleBlue,
    paragraphs = DEFAULT_CONTENT.paragraphs,
    items = DEFAULT_CONTENT.items,
    imageSrc = DEFAULT_CONTENT.imageSrc,
    imageAlt = DEFAULT_CONTENT.imageAlt,
}: DocumentsProps) {
    return (
        <section
            aria-label={sectionLabel}
            className="bg-[linear-gradient(120deg,var(--color-surface-alt)_0%,var(--color-surface-alt)_50%,var(--color-surface-alt)_100%)] py-16 @min-[1024px]:py-24"
        >
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 @min-[640px]:px-6 @min-[1024px]:grid-cols-2 @min-[1024px]:gap-16">
                {/* Left: capsule-clipped photo (rectangle, top & bottom fully rounded) */}
                <div className="relative mx-auto aspect-3/4 w-64 @min-[640px]:w-80 @min-[768px]:h-full @min-[1024px]:max-w-md">
                    <div
                        aria-hidden="true"
                        className="absolute -inset-3 rounded-t-full rounded-b-full border border-muted/50"
                    />
                    <div className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-full">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 448px"
                        />
                        
                    </div>
                </div>

                {/* Right: heading, intro paragraphs, document cards
                    (extra right padding so content breathes before the edge) */}
                <div className="@min-[1024px]:pr-10">
                    <div className="flex gap-4">
                        <div
                            aria-hidden="true"
                            className="w-1.5 flex-none rounded-full bg-brand-emerald"
                        />
                        <h2 className="text-2xl font-semibold leading-snug @min-[1024px]:text-3xl">
                            <span className="text-brand-emerald-deep">{titleGreen}</span>{" "}
                            <span className="text-brand-emerald-deep">{titleBlue}</span>
                        </h2>
                    </div>

                    <div className="mt-6 space-y-4 @min-[1024px]:pl-5.5">
                        {paragraphs.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="text-xs leading-relaxed text-muted @min-[640px]:text-sm"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <ul className="mt-8 grid grid-cols-1 gap-3 @min-[640px]:grid-cols-2">
                        {items.map((item, index) => {
                            const ItemIcon = getLucideIcon(item.icon);
                            const tone = TONES[item.tone ?? "blue"] ?? TONES.blue;
                            return (
                                <li
                                    key={`${item.title}-${index}`}
                                    className="flex items-start gap-3 rounded-lg bg-white p-3.5 shadow-sm"
                                >
                                    {ItemIcon && (
                                        <span
                                            className={`flex h-6 w-6 flex-none items-center justify-center rounded-md ${tone}`}
                                        >
                                            <ItemIcon
                                                aria-hidden="true"
                                                className="h-4 w-4"
                                            />
                                        </span>
                                    )}
                                    <span className="text-xs leading-relaxed text-body">
                                        {item.title}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
