"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { COUNTRY_CONTENT } from "@/lib/constants";

/* Fallback copy lives in lib/constants.tsx -> COUNTRY_CONTENT.russia */
const RUSSIA = COUNTRY_CONTENT.russia;

export type CountryIntroProps = {
  /** Gradient heading (e.g. "MBBS in Russia for Indian Students 2026-27"). */
  heading?: string;
  /** Paragraphs 1/3/4 as JSX; slot 2 (index 1) is replaced by `intro`. */
  paragraphs?: ReactNode[];
  /** The CMS-editable intro paragraph — rendered as paragraph 2. */
  intro?: string;
};

/*
 * Figma frame: 1724 × 1001px  (canvas has 98px side margins = 1920px total)
 *
 * Inside the 1724px frame:
 *   Image div  : x=571, y=0,   w=1153, h=1001   → right-aligned, full frame height
 *   White card : x=0,   y=110, w=891,  h=780
 *
 * The outer <section> adds the 98px side padding + 111px top/bottom padding.
 * Inside that padded space the image and card are positioned relatively.
 *
 * Visual result: green border visible top/right/bottom, card overlaps image.
 */

export default function CountryIntro({
  heading = RUSSIA.introHeading ?? "",
  paragraphs = RUSSIA.introParagraphs ?? [],
  intro = RUSSIA.intro,
}: CountryIntroProps) {
  /* The CMS intro field edits paragraph 2 — swap it in when provided. */
  const body = [
    paragraphs[0],
    <>{intro}</>,
    ...paragraphs.slice(2),
  ];

  return (
    <section className="w-full bg-surface-alt px-5 py-12 @min-[640px]:px-8 @min-[640px]:py-16 @min-[1024px]:px-24.5 @min-[1024px]:py-27.75">
      {/* Inner frame — mirrors the 1724px Figma frame; on phones the image and
          card simply stack instead of being overlaid */}
      <div className="relative mx-auto h-auto w-full max-w-[1724px] @min-[1024px]:h-[clamp(500px,52.135cqw,1001px)]">
        {/* ── Russia photo ── full-width banner on mobile, right half on desktop ── */}
        <div className="relative h-55 w-full overflow-hidden @min-[640px]:h-80 @min-[1024px]:absolute @min-[1024px]:inset-y-0 @min-[1024px]:left-[33.12%] @min-[1024px]:right-0 @min-[1024px]:h-auto @min-[1024px]:w-auto">
          <Image
            src="/home/mbbs-abroad-russia.jpg"
            alt="Red Square, Moscow, Russia"
            fill
            sizes="(max-width:1023px) 100vw, 67vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        </div>

        {/* ── White content card ── in normal flow on mobile, absolute on desktop ── */}
        <div className="relative z-2 flex w-full flex-col gap-[clamp(16px,1.667cqw,32px)] bg-white p-[clamp(24px,3.333cqw,64px)] shadow-xl shadow-ink/8 @min-[1024px]:absolute @min-[1024px]:left-0 @min-[1024px]:top-[clamp(40px,5.729cqw,110px)] @min-[1024px]:w-[clamp(300px,46.406cqw,891px)]">
          {/* Heading group — gap 16px */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(8px, 0.833cqw, 16px)",
            }}
          >
            {/* Gradient heading */}
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-sub)',
                fontWeight: 600,
                fontSize: "clamp(24px, 2.813cqw, 54px)",
                lineHeight: "clamp(32px, 3.333cqw, 64px)",
                backgroundImage:
                  "linear-gradient(149.39deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>

            {/* Paragraph 1..4 — copy lives in lib/constants.tsx (COUNTRY_CONTENT) */}
            {body.map((paragraph, index) => (
              <p key={index} style={p}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact-us"
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(130px, 10.469cqw, 201px)",
              height: "clamp(42px, 3.333cqw, 64px)",
              padding: "16px 32px",
              backgroundImage:
                "linear-gradient(137.12deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)",
              borderRadius: 8,
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: "clamp(13px, 0.938cqw, 18px)",
              lineHeight: "24px",
              color: "white",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
}

const p = {
  margin: 0,
  fontFamily: 'var(--font-body)',
  fontWeight: 400,
  fontSize: "clamp(14px, 0.938cqw, 18px)",
  lineHeight: "clamp(18px, 1.458cqw, 28px)",
  color: "var(--color-body)",
};
