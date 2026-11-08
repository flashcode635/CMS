"use client";

import Image, { type StaticImageData } from "next/image";

/**
 * Events — "Rythm 3.0 2026 – Relive …" style event highlight band:
 * dark navy left panel (green→blue accent bar, two-tone heading, paragraphs)
 * with the event photo occupying the right half behind a DIAGONAL edge
 * (plus a thin gradient stripe along the split), matching the design.
 *
 * CMS compatibility (same approach as the other university sections):
 *  - Every prop is optional with a default from `DEFAULT_CONTENT`, so a CMS can
 *    render it with plain JSON via `<EventsSection {...cmsContent} />`.
 *  - Photo is a URL string (CMS) or static image import.
 *  - Note: the copy mentions the ORGANIZER ("My Study Hub"), not the
 *    university, so univNav's name substitution is a no-op here by design.
 */

type EventsProps = {
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Heading part rendered in WHITE (event name + opening words). */
    titleMain?: string;
    /** Heading part rendered in BLUE (closing words). */
    titleAccent?: string;
    /** Highlight paragraphs (order preserved). */
    paragraphs?: string[];
    /** Event photo — URL string (CMS) or static image import. */
    eventImageSrc?: StaticImageData | string;
    imageAlt?: string;
};

export const DEFAULT_CONTENT: Required<EventsProps> = {
    sectionLabel: "University event highlights",
    titleMain: "Rythm 3.0 2026 – Relive the",
    titleAccent: "Most Electrifying Freshers' Night",
    paragraphs: [
        "Rythm 3.0 – 2025 Freshers' Party, hosted by My Study Hub & others, turned into an electrifying celebration of new beginnings with an incredible crowd of 500+ Indian students. The evening was filled with energy, enthusiasm, and unforgettable moments, creating a grand welcome for the newest batch.",
        "The night sparkled with DJ beats, dance, engaging games, and spectacular stage performances. Special gratitude goes to our dedicated senior volunteers and team members who set up a perfect platform for freshers to interact, bond, and step into their academic journey with confidence, fun, and unity.",
        "Rythm 3.0 – 2026 not only brought smiles and memories but also built friendships that will last throughout the upcoming medical years. A night that truly marked the start of an exciting chapter!",
    ],
    // TODO: swap for this university's real event photo (CMS override works too)
    eventImageSrc: "/home/partyone.webp",
    imageAlt: "Students celebrating at the freshers party",
};

export default function EventsSection({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    titleMain = DEFAULT_CONTENT.titleMain,
    titleAccent = DEFAULT_CONTENT.titleAccent,
    paragraphs = DEFAULT_CONTENT.paragraphs,
    eventImageSrc = DEFAULT_CONTENT.eventImageSrc,
    imageAlt = DEFAULT_CONTENT.imageAlt,
}: EventsProps) {
    return (
        <section
            aria-label={sectionLabel}
            className="relative overflow-hidden bg-[linear-gradient(150deg,var(--color-brand-forest-deep)_0%,var(--color-brand-forest-deep)_100%)] py-16 @min-[1024px]:py-24">
            {/* Decorative corner slices */}
            <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-40 w-14 bg-brand-forest/30 [clip-path:polygon(0_0,100%_0,0_100%)]"
            />
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-32 w-24 bg-[linear-gradient(135deg,var(--color-brand-forest),var(--color-brand-forest-deep))] opacity-20 [clip-path:polygon(0_100%,0_0,100%_100%)]"
            />

            {/* Diagonal gradient stripe + event photo (desktop) */}
            <div
                aria-hidden="true"
                className="absolute inset-0 hidden @min-[1024px]:block bg-[linear-gradient(180deg,var(--color-brand-forest)_0%,var(--color-brand-forest-deep)_100%)] [clip-path:polygon(58.5%_0,60.2%_0,47.2%_100%,45.5%_100%)]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 hidden @min-[1024px]:block [clip-path:polygon(60.2%_0,100%_0,100%_100%,47.2%_100%)]"
            >
                <Image
                    src={eventImageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0px, 45vw"
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 @min-[640px]:px-6 @min-[1024px]:px-25">
                <div className="@min-[1024px]:w-[45%]">
                    <div className="flex gap-4">
                        <div
                            aria-hidden="true"
                            className="w-1.5 flex-none self-stretch rounded-full bg-linear-to-b from-brand-emerald to-brand-forest"
                        />
                        <h2 className="text-[clamp(1.35rem,3vw,1.9rem)] font-semibold leading-snug">
                            <span className="text-white">{titleMain}</span>{" "}
                            <span className="text-brand-champagne">{titleAccent}</span>
                        </h2>
                    </div>

                    <div className="mt-6 space-y-3 @min-[1024px]:space-y-4">
                        {paragraphs.map((paragraph) => (
                            <p
                                key={paragraph.slice(0, 32)}
                                className="text-xs leading-relaxed text-brand-champagne-soft/70 @min-[640px]:text-sm"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Event photo block (mobile/tablet — the lg clip-path layer above is hidden) */}
                <div className="relative mt-8 h-56 overflow-hidden @min-[1024px]:hidden rounded-2xl">
                    <Image
                        src={eventImageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 0px"
                    />
                </div>
            </div>
        </section>
    );
}
