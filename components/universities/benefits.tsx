"use client";

import Image, { type StaticImageData } from "next/image";
import { GraduationCap } from "lucide-react";
import univCampusImg from "@/public/home/univ-campus.jpg";

/**
 * Benefits — "Benefits of Studying MBBS in <University>" section:
 * dark navy band with decorative circles; eyebrow line, green+blue two-tone
 * heading, a left stack of numbered white benefit cards and a right highlight
 * video card (embed when `videoUrl` is set, poster + play overlay otherwise).
 *
 * CMS compatibility (same approach as `admissionProcess.tsx` / `documents.tsx`):
 *  - Every prop is optional with a default from `DEFAULT_CONTENT`, so a CMS can
 *    render it with plain JSON via `<BenefitsSection {...cmsContent} />`.
 *  - Card numbers derive from array order ("01", "02", …) — reordering or
 *    adding/removing items renumbers automatically.
 */

type BenefitItem = {
    /** Card title, e.g. "Globally Recognized Degree". Doubles as the React key. */
    title: string;
    /** Card description (small muted text). */
    description: string;
};

type BenefitsProps = {
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Small uppercase eyebrow above the heading (teal, with a leading dash). */
    eyebrow?: string;
    /** Heading part in green (before the university name). */
    titleGreen?: string;
    /** Heading part in blue (the university name part). */
    titleBlue?: string;
    /** Numbered benefit cards (left column). */
    benefits?: BenefitItem[];
    /** Optional video URL; empty string keeps the placeholder poster card. */
    videoUrl?: string;
    /** Title of the video (iframe title + overlay heading). */
    videoTitle?: string;
    /** Small line under the overlay title (channel/brand name). */
    videoBadge?: string;
    /** Bottom-right label on the placeholder card. */
    watchLabel?: string;
    /** Placeholder thumbnail — URL string (CMS) or static image import. */
    videoPoster?: StaticImageData | string;
};

export const DEFAULT_CONTENT: Required<BenefitsProps> = {
    sectionLabel: "Benefits of studying at this university",
    eyebrow: "Why Samara State",
    titleGreen: "Benefits of Studying MBBS in",
    titleBlue: "Samara State Medical University, Russia",
    benefits: [
        {
            title: "Globally Recognized Degree",
            description:
                "Accredited by WHO, MCI/NMC, and UNESCO, allowing graduates to practice medicine globally after clearing the screening tests.",
        },
        {
            title: "Advanced Research Facilities",
            description:
                "Home to some of Russia's most specialized medical research centers, including their own specialized university hospitals.",
        },
        {
            title: "English Medium Education",
            description:
                "A dedicated faculty for international students providing 100% English-medium instruction for the entire duration of the course.",
        },
        {
            title: "Affordable Tuition & Living",
            description:
                "High-quality education at a fraction of the cost compared to private medical colleges in India or the West.",
        },
    ],
    videoUrl: "",
    videoTitle: "FMGE Classes at Samara State Medical University",
    videoBadge: "My Study Hub",
    watchLabel: "Event highlight",
    videoPoster: univCampusImg,
};

export default function BenefitsSection({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    eyebrow = DEFAULT_CONTENT.eyebrow,
    titleGreen = DEFAULT_CONTENT.titleGreen,
    titleBlue = DEFAULT_CONTENT.titleBlue,
    benefits = DEFAULT_CONTENT.benefits,
    videoTitle = DEFAULT_CONTENT.videoTitle,
    videoBadge = DEFAULT_CONTENT.videoBadge,
    videoPoster = DEFAULT_CONTENT.videoPoster,
}: BenefitsProps) {
    return (
        <section
            aria-label={sectionLabel}
            className="relative overflow-hidden bg-[linear-gradient(150deg,#0B3B2E_0%,#072A21_100%)] py-16 @min-[1024px]:py-24"
        >
            {/* Decorative circles */}
            <div
                aria-hidden="true"
                className="absolute -right-32 -top-44 size-112 rounded-full border border-brand-champagne/25"
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-16 size-64 rounded-full bg-brand-forest/25"
            />

            <div className="relative mx-auto max-w-7xl px-4 @min-[640px]:px-6 @min-[1024px]:px-25">
                {/* Eyebrow + two-tone heading */}
                <div className="flex items-center gap-2">
                    <span
                        aria-hidden="true"
                        className="h-px flex-none w-4 bg-brand-champagne"
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-champagne">
                        {eyebrow}
                    </p>
                </div>
                <h2 className="mt-3 max-w-2xl text-[clamp(1.35rem,3vw,1.9rem)] font-semibold leading-snug">
                    <span className="text-brand-champagne">{titleGreen}</span>{" "}
                    <span className="text-brand-champagne">{titleBlue}</span>
                </h2>

                <div className="mt-10 grid grid-cols-1 items-center gap-12 @min-[1024px]:grid-cols-2 @min-[1024px]:gap-16">
                    {/* Left: numbered benefit cards */}
                    <ul className="flex flex-col gap-4">
                        {benefits.map((benefit, index) => (
                            <li
                                key={benefit.title}
                                className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-md"
                            >
                                <span
                                    aria-hidden="true"
                                    className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-brand-champagne-soft-bg text-xs font-bold text-brand-emerald-deep"
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#1C2B25]">
                                        {benefit.title}
                                    </h3>
                                    <p className="mt-1 text-xs leading-relaxed text-muted">
                                        {benefit.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Right: video card */}
                    <div className="self-center overflow-hidden rounded-2xl bg-[#072A21] shadow-lg ring-1 ring-white/10">
                            <div className="relative aspect-video">
                                <Image
                                    src={videoPoster}
                                    alt={videoTitle}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 640px"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-[#072A21]/25"
                                />
                                <Image
                                    src="/home/party-yt-wordmark.svg"
                                    alt="Video platform"
                                    width={120}
                                    height={27}
                                    className="absolute bottom-4 right-4"
                                />

                                {/* Top-left caption overlay */}
                                <div className="absolute inset-x-0 top-0 flex items-center gap-2 bg-[#072A21]/35 p-3">
                                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/90">
                                        <GraduationCap
                                            aria-hidden="true"
                                            className="h-4 w-4 text-brand-emerald-deep"
                                        />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-xs font-semibold text-white">
                                            {videoTitle}
                                        </p>
                                        <p className="truncate text-[10px] text-white/80">
                                            {videoBadge}
                                        </p>
                                    </div>
                                </div>

                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
