"use client";

import Image, { type StaticImageData } from "next/image";
import { CircleCheck, Info } from "lucide-react";
import aboutGraduationImg from "@/public/home/about-graduation.png";
import blogGraduationImg from "@/public/home/blog-graduation.jpg";
import univCampusImg from "@/public/home/univ-campus.jpg";
import heroBgImg from "@/public/home/hero-bg.jpg";
import mbbsAbroadRussiaImg from "@/public/home/mbbs-abroad-russia.jpg";
import mbbsAbroadKazakhstanImg from "@/public/home/mbbs-abroad-kazakhstan.jpg";

/**
 * Hostel & Mess Facilities — light mint→periwinkle band in two parts:
 *  1. "Campus Life" eyebrow + centered heading/intro, then a flex-wrap centred
 *     grid of photo-topped feature cards (3 + 2 layout from the design).
 *  2. A split white card for Indian Mess Facilities (copy + green check
 *     bullets | photo), followed by a centered ⓘ closing note.
 *
 * CMS compatibility (same approach as the other university sections):
 *  - Every prop is optional with a default from `DEFAULT_CONTENT`, so a CMS can
 *    render it with plain JSON via `<HostelFacilitiesSection {...cmsContent} />`.
 *  - Photos are URL strings (CMS) or static image imports.
 *  - The univNav wiring swaps hard-coded "Samara …" tokens at render time
 *    (see `universityName.ts`) — the section code itself stays generic.
 */

type HostelFeature = {
    /** Card title, e.g. "Fully Furnished Rooms". Doubles as the React key. */
    title: string;
    description: string;
    /** Card photo — URL string (CMS) or static image import. */
    imageSrc?: StaticImageData | string;
    imageAlt?: string;
};

type HostelFacilitiesProps = {
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Small uppercase eyebrow above the heading (with flanking dashes). */
    eyebrow?: string;
    /** Centered section heading. */
    title?: string;
    /** Centered intro paragraph under the heading. */
    intro?: string;
    /** Sub-block heading above the feature cards. */
    featuresHeading?: string;
    /** Photo-topped feature cards. */
    features?: HostelFeature[];
    /** Red eyebrow of the mess card. */
    messEyebrow?: string;
    /** Heading of the mess card. */
    messTitle?: string;
    /** Intro paragraph of the mess card. */
    messIntro?: string;
    /** Green-check bullet labels of the mess card. */
    messPoints?: string[];
    /** Mess photo — URL string (CMS) or static image import. */
    messImageSrc?: StaticImageData | string;
    messImageAlt?: string;
    /** Centered ⓘ note at the bottom of the section. */
    closingNote?: string;
};

export const DEFAULT_CONTENT: Required<HostelFacilitiesProps> = {
    sectionLabel: "Hostel and mess facilities",
    eyebrow: "Campus Life",
    title: "Hostel & Mess Facilities",
    intro:
        "Accommodation is one of the major concerns for students going abroad. Samara State Medical University ensures that students feel at home by providing comfortable and secure hostel facilities.",
    featuresHeading: "Hostel Features",
    // TODO: photos below are borrowed campus/blog placeholders — swap for real
    // hostel/mess photos (or CMS overrides) when proper assets land in `public/`.
    features: [
        {
            title: "Fully Furnished Rooms",
            description:
                "Equipped with essential furniture including study desks, wardrobes, and comfortable bedding.",
            imageSrc: aboutGraduationImg,
            imageAlt: "Fully furnished hostel room",
        },
        {
            title: "Separate Accommodation",
            description:
                "Dedicated and secure wings for boys and girls to ensure privacy and comfort.",
            imageSrc: blogGraduationImg,
            imageAlt: "Separate hostel accommodation corridor",
        },
        {
            title: "24/7 Security & CCTV",
            description:
                "Round-the-clock surveillance and on-site security personnel for a safe living environment.",
            imageSrc: univCampusImg,
            imageAlt: "Security desk with CCTV monitors",
        },
        {
            title: "Central Heating System",
            description:
                "Advanced heating infrastructure providing consistent warmth during Samara's cold winters.",
            imageSrc: heroBgImg,
            imageAlt: "Warm hostel room during winter",
        },
        {
            title: "Wi-Fi & Study Areas",
            description:
                "High-speed internet access and quiet zones designed for academic focus and research.",
            imageSrc: mbbsAbroadRussiaImg,
            imageAlt: "Wi-Fi enabled shared study area",
        },
    ],
    messEyebrow: "Dining Services",
    messTitle: "Indian Mess Facilities",
    messIntro:
        "One of the biggest advantages for Indian students is the availability of Indian food. The university or nearby facilities offer Indian mess services where students can get familiar meals, reducing the struggle of adapting to a new cuisine.",
    messPoints: [
        "Authentic Indian Spices & Recipes",
        "Hygienic and Nutritious Meal Plans",
    ],
    messImageSrc: mbbsAbroadKazakhstanImg,
    messImageAlt: "Indian mess serving a variety of dishes",
    closingNote:
        "This combination of safe housing and food availability makes life easier for first-year students who are new to a foreign country.",
};

/**
 * Bento grid spans for a 6-column desktop grid:
 * rows are filled greedily — first rows take 3 items (each `col-span-2`),
 * the remainder takes 2 items (each `col-span-3`), a single leftover takes the
 * full row (`col-span-6`). Larger rows are placed first so 5 items produce the
 * design's 3 + 2 layout. Works for any CMS-provided count.
 */
function computeBentoSpans(count: number): number[] {
    if (count <= 0) return [];
    const rows = Math.max(1, Math.ceil(count / 3));
    const base = Math.floor(count / rows);
    const extra = count % rows;

    const spans: number[] = [];
    for (let row = 0; row < rows; row += 1) {
        const itemsInRow = base + (row < extra ? 1 : 0);
        const span = itemsInRow === 1 ? 6 : itemsInRow === 2 ? 3 : 2;
        for (let i = 0; i < itemsInRow; i += 1) {
            spans.push(span);
        }
    }
    return spans;
}

export default function HostelFacilitiesSection({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    eyebrow = DEFAULT_CONTENT.eyebrow,
    title = DEFAULT_CONTENT.title,
    intro = DEFAULT_CONTENT.intro,
    featuresHeading = DEFAULT_CONTENT.featuresHeading,
    features = DEFAULT_CONTENT.features,
    messEyebrow = DEFAULT_CONTENT.messEyebrow,
    messTitle = DEFAULT_CONTENT.messTitle,
    messIntro = DEFAULT_CONTENT.messIntro,
    messPoints = DEFAULT_CONTENT.messPoints,
    messImageSrc = DEFAULT_CONTENT.messImageSrc,
    messImageAlt = DEFAULT_CONTENT.messImageAlt,
    closingNote = DEFAULT_CONTENT.closingNote,
}: HostelFacilitiesProps) {
    const bentoSpans = computeBentoSpans(features.length);

    return (
        <section
            aria-label={sectionLabel}
            className="bg-[linear-gradient(120deg,#EDF3EF_0%,#EDF3EF_50%,#EFE9DE_100%)] py-16 @min-[1024px]:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 @min-[640px]:px-6 @min-[1024px]:px-25">
                {/* Eyebrow + centered heading + intro */}
                <div className="flex items-center justify-center gap-2">
                    <span
                        aria-hidden="true"
                        className="h-px flex-none w-4 bg-brand-emerald/60"
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-emerald-deep">
                        {eyebrow}
                    </p>
                    <span
                        aria-hidden="true"
                        className="h-px flex-none w-4 bg-brand-emerald/60"
                    />
                </div>
                <h2 className="mt-3 text-center text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#1C2B25]">
                    {title}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed text-muted @min-[640px]:text-sm">
                    {intro}
                </p>

                {/* Hostel feature cards — flex-wrap keeps leftover rows centred */}
                <h3 className="text-lg font-bold text-[#1C2B25]">
                    {featuresHeading}
                </h3>
                <div
                    aria-hidden="true"
                    className="mt-2 h-px bg-[#1C2B25]/10"
                />
                <div className="mt-6 grid grid-cols-1 gap-6 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-6">
                    {features.map((feature, index) => {
                        const span = bentoSpans[index] ?? 2;
                        const spanClass =
                            span === 6
                                ? "@min-[1024px]:col-span-6"
                                : span === 3
                                  ? "@min-[1024px]:col-span-3"
                                  : "@min-[1024px]:col-span-2";
                        return (
                            <div
                                key={feature.title}
                                className={`flex flex-col overflow-hidden rounded-xl bg-white shadow-md ${spanClass}`}
                            >
                                <div className="relative aspect-[16/10]">
                                    <Image
                                        src={feature.imageSrc ?? univCampusImg}
                                        alt={feature.imageAlt ?? feature.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-sm font-bold text-[#1C2B25]">
                                        {feature.title}
                                    </h4>
                                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mess facilities split card */}
                <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-lg @min-[1024px]:grid-cols-2">
                    <div className="flex flex-col justify-center p-6 @min-[640px]:p-8">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-red-500">
                            {messEyebrow}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-[#1C2B25]">
                            {messTitle}
                        </h3>
                        <p className="mt-4 text-xs leading-relaxed text-muted @min-[640px]:text-sm">
                            {messIntro}
                        </p>
                        <ul className="mt-5 flex flex-col gap-3">
                            {messPoints.map((point) => (
                                <li
                                    key={point}
                                    className="flex items-center gap-2"
                                >
                                    <CircleCheck
                                        aria-hidden="true"
                                        className="h-4 w-4 flex-none text-brand-emerald-deep"
                                    />
                                    <span className="text-xs font-medium text-[#1C2B25]">
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative min-h-64 @min-[1024px]:min-h-full">
                        <Image
                            src={messImageSrc}
                            alt={messImageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 640px"
                        />
                    </div>
                </div>

                {/* Closing note */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-brand-emerald/30">
                        <Info
                            aria-hidden="true"
                            className="h-4 w-4 text-brand-emerald-deep"
                        />
                    </span>
                    <p className="max-w-xl text-center text-xs font-normal text-[#1C2B25]">
                        {closingNote}
                    </p>
                </div>
            </div>
        </section>
    );
}
