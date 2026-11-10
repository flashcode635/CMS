"use client";

import Image, { type StaticImageData } from "next/image";
import { getLucideIcon } from "@/components/ui/iconRegistry";
import { FMGE_CONTENT } from "@/lib/universitySectionData";

type FmgeFeature = {
    label: string;
    /** Icon NAME from the CMS icon registry (kebab-case, e.g. "book-open"). */
    icon?: string;
};

type FmgeClassesProps = {
    /** Anchor id for the sub-nav (WITHOUT the leading "#" — e.g. "fmge-classes"). */
    anchorId?: string;
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Blue heading next to the green bar. */
    title?: string;
    /** Intro paragraph under the heading. */
    intro?: string;
    /** Light feature rows (icon + label bars). */
    features?: FmgeFeature[];
    /** Italic quote in the tinted box with green bar. */
    quote?: string;
    /** Optional video URL; when empty a placeholder thumbnail is shown. */
    videoUrl?: string;
    /** Title of the video used for the caption. */
    videoTitle?: string;
    /** Small caption under the video card. */
    videoCaption?: string;
    /* --- Bottom block --- */
    pathwaysTitle?: string;
    pathwaysParagraphs?: string[];
    /** Brand line under the paragraphs (uppercase label + icon). */
    standardsLabel?: string;
    /** Icon NAME for the standards chip. */
    standardsIcon?: string;
    /** Thumbnail shown when videoUrl is empty. */
    videoPoster?: StaticImageData | string;
};

export const DEFAULT_CONTENT: Required<FmgeClassesProps> = FMGE_CONTENT;

export default function FmgeClassesSection({
    anchorId = DEFAULT_CONTENT.anchorId,
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    title = DEFAULT_CONTENT.title,
    intro = DEFAULT_CONTENT.intro,
    features = DEFAULT_CONTENT.features,
    quote = DEFAULT_CONTENT.quote,
    videoTitle = DEFAULT_CONTENT.videoTitle,
    videoCaption = DEFAULT_CONTENT.videoCaption,
    videoPoster = DEFAULT_CONTENT.videoPoster,
    pathwaysTitle = DEFAULT_CONTENT.pathwaysTitle,
    pathwaysParagraphs = DEFAULT_CONTENT.pathwaysParagraphs,
    standardsLabel = DEFAULT_CONTENT.standardsLabel,
    standardsIcon = DEFAULT_CONTENT.standardsIcon,
}: FmgeClassesProps) {
    return (
        <section
            id={anchorId}
            aria-label={sectionLabel}
            className="bg-white py-16 @min-[1024px]:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 @min-[640px]:px-6 @min-[1024px]:px-25">
                {/* Top: left copy + right video card */}
                <div className="grid grid-cols-1 gap-12 @min-[1024px]:grid-cols-[5fr_6fr] @min-[1024px]:gap-16">
                    {/* Left: heading, intro, features, quote */}
                    <div>
                        <div className="flex gap-4">
                            <div
                                aria-hidden="true"
                                className="w-1.5 flex-none rounded-full bg-brand-emerald"
                            />
                            <h2 className="text-2xl font-semibold leading-snug text-brand-emerald-deep @min-[1024px]:text-3xl">
                                {title}
                            </h2>
                        </div>

                        <p className="mt-6 text-xs leading-relaxed text-muted @min-[1024px]:pl-5.5">
                            {intro}
                        </p>

                        <div className="mt-6 space-y-3 @min-[1024px]:pl-5.5">
                            {features.map((feature, index) => {
                                const FeatureIcon = getLucideIcon(feature.icon);
                                return (
                                    <div
                                        key={`${feature.label}-${index}`}
                                        className="flex items-center gap-3 rounded-lg bg-surface-alt px-4 py-3"
                                    >
                                        {FeatureIcon && (
                                            <FeatureIcon
                                                className="h-4 w-4 flex-none text-brand-emerald-deep"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <span className="text-xs font-medium text-body">
                                            {feature.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-lg bg-surface-alt p-4 @min-[1024px]:ml-5.5">
                            <div
                                aria-hidden="true"
                                className="h-full w-1 flex-none rounded-full bg-brand-emerald"
                            />
                            <p className="text-sm font-medium italic text-brand-emerald-deep">
                                &ldquo;{quote}&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Right: video card */}
                    <div className="self-center overflow-hidden rounded-2xl bg-white shadow-lg">
                            <div className="relative aspect-video">
                                <Image
                                    src={videoPoster}
                                    alt={videoTitle}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="h-full w-full object-cover"
                                    placeholder={typeof videoPoster === "string" ? "empty" : "blur"}
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-brand-forest-deep/25"
                                />
                                <Image
                                    src="/home/party-yt-wordmark.svg"
                                    alt="Video platform"
                                    width={120}
                                    height={27}
                                    className="absolute bottom-4 right-4"
                                />
                            </div>
                        <div className="flex items-center gap-2 px-4 py-3">
                            <div
                                aria-hidden="true"
                                className="w-1 flex-none rounded-full bg-brand-emerald"
                            />
                            <p className="text-sm font-medium text-brand-emerald-deep">
                                {videoCaption}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom: career pathways block */}
                <div className="mt-12">
                    <h3 className="text-lg font-semibold text-brand-emerald-deep">
                        {pathwaysTitle}
                    </h3>
                    <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted">
                        {pathwaysParagraphs.map((paragraph) => (
                            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                        ))}
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                        {(() => {
                            const StandardsIcon = getLucideIcon(standardsIcon);
                            return StandardsIcon ? (
                                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-emerald text-white">
                                    <StandardsIcon className="h-4 w-4" aria-hidden="true" />
                                </span>
                            ) : null;
                        })()}
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-emerald-deep">
                            {standardsLabel}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
