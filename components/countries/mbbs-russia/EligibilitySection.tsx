"use client";
import InfoCard from "@/components/ui/infoCard";
import type { ReactNode } from "react";
// Per-card gradient angles taken directly from Figma node data
import { CARD_GRADIENTS, COUNTRY_CONTENT } from "@/lib/constants";

/* Fallback copy lives in lib/constants.tsx -> COUNTRY_CONTENT.russia */
const RUSSIA = COUNTRY_CONTENT.russia;

export type EligibilitySectionProps = {
  /** Gradient heading above the cards. */
  heading?: string;
  /** Numbered cards; `description` may be JSX with bold highlights. */
  cards?: { number: string; title: string; description: ReactNode }[];
};

export default function EligibilitySection({
  heading = RUSSIA.eligibilityHeading ?? "",
  cards = RUSSIA.eligibilityCards ?? [],
}: EligibilitySectionProps) {
  const eligibilityCards = cards;
  return (
    /*
     * Section background: light blue-grey (#E8F0FA) — the Figma page canvas
     * colour visible behind all the white cards in the screenshot.
     */
    <section
      className="w-full py-16 px-5 @min-[1024px]:px-24.75"
      style={{ backgroundColor: "#E8F0FA" }}
    >
      <div
        className="flex flex-col w-full mx-auto"
        style={{ maxWidth: 1322, gap: 32 }}
      >
        {/* ── Section Header ── */}
        <div className="flex flex-col w-full" style={{ gap: 16 }}>
          {/*
           * Heading gradient: 172.68deg  →  left = #00923F (green),
           * right = #3163FF (blue).  Visually the left portion of the long
           * heading text appears green and slides into teal/blue at the right.
           */}
          <h2
            className="w-full font-semibold"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "clamp(32px, 2.5cqw, 48px)",
              lineHeight: "clamp(38px, 2.92cqw, 56px)",
              backgroundImage:
                "linear-gradient(172.684deg, rgb(0, 146, 63) 12.704%, rgb(49, 99, 255) 87.17%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            {heading}
          </h2>

          {/* Green divider */}
          <div
            style={{
              height: 2,
              width: "100%",
              backgroundColor: "#a3d487",
              borderRadius: 9999,
            }}
          />
        </div>

        {/* ── Cards ──
            Mobile : horizontal swipe-row (`flex-row`), each card full width
            md+    : stacked (flex-col), lg restores the 2-col flex-wrap
        ── */}
        <div
          className="flex flex-row overflow-x-auto @min-[768px]:flex-col @min-[768px]:overflow-x-visible @min-[1024px]:flex-row @min-[1024px]:flex-wrap"
          style={{ gap: 24 }}
        >
          {eligibilityCards.map((card, i) => (
            <InfoCard
              key={i}
              card={card}
              lgw={false}
              /* container-based 2-col width (canvas responsiveness);
                 InfoCard's own `lg:` is viewport-based and fires at laptop
                 width even in the narrow CMS canvas */
              className="shrink-0 @min-[1024px]:w-[calc(50%-12px)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
