"use client";

import type { ReactNode } from "react";
import { COUNTRY_CONTENT } from "@/lib/constants";
import { getLucideIcon } from "@/components/ui/iconRegistry";

/* Fallback copy lives in lib/constants.tsx -> COUNTRY_CONTENT.russia */
const RUSSIA = COUNTRY_CONTENT.russia;

/** One benefit card. CMS stores the icon as a kebab-case lucide NAME string
 *  (see components/ui/iconRegistry.tsx); constants keep the plain-string form. */
export type WhyBenefit = { text: string; icon?: string };

export type WhyRussiaProps = {
  /** Paragraphs under the gradient heading. */
  points?: ReactNode[];
  /** Gradient heading text. */
  heading?: string;
  /** Exam checklist rows (check-icon.svg). */
  exams?: string[];
  /** Label above the benefit cards ("Additionally, Russia provides:"). */
  additionalLabel?: string;
  /** Benefit cards — plain strings (constants) or {text, icon} (CMS). */
  benefits?: Array<string | WhyBenefit>;
  /** Closing paragraph (may contain a styled <Link>). */
  outro?: ReactNode;
};

/** strings -> {text}; empty icon names dropped. */
function normalizeBenefits(benefits: Array<string | WhyBenefit>): WhyBenefit[] {
  return benefits.map((benefit) =>
    typeof benefit === "string"
      ? { text: benefit }
      : { text: benefit?.text ?? "", icon: benefit?.icon || undefined }
  );
}

export default function WhyRussia({
  points = RUSSIA.whyPoints ?? [],
  heading = RUSSIA.whyHeading ?? "",
  exams = RUSSIA.whyExams ?? [],
  additionalLabel = RUSSIA.whyAdditionalLabel ?? "",
  benefits = RUSSIA.whyBenefits ?? [],
  outro = RUSSIA.whyOutro ?? null,
}: WhyRussiaProps) {
  return (
    <section
      className="relative w-full overflow-hidden py-14 @min-[640px]:py-20 @min-[1024px]:py-24 px-5 @min-[640px]:px-8 @min-[768px]:px-2"
      style={{
        backgroundColor: "var(--color-brand-forest-deep)",
        backgroundImage:
          "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-forest) 5%, transparent) 0%, color-mix(in srgb, var(--color-brand-champagne) 8%, transparent) 100%), var(--color-brand-forest-deep)",
      }}
      aria-label={heading}
    >
      {/* ── Background Ellipse Glow (Right side) ── */}
      <div
        className="absolute -right-24 @min-[640px]:-right-40 top-1/2 -translate-y-1/2 w-95 @min-[640px]:w-125 @min-[1024px]:w-170 aspect-square pointer-events-none opacity-30 select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/countries/russia/ellipse-glow.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* ── Main Container ── */}
      <div className="relative max-w-384 mx-auto flex flex-col @min-[1024px]:flex-row items-center gap-10 @min-[1024px]:gap-12 @min-[1280px]:gap-16 z-10 p-[clamp(0.5rem,3.5cqw,3rem)] ">
        
        {/* ── Left Column: 3D Question Mark Background + Russia Sticker ── */}
        <div className="relative w-full @min-[1024px]:w-[45%] flex items-center justify-center shrink-0 min-h-72 @min-[640px]:min-h-105 @min-[1024px]:min-h-140">
          {/* bg-map.png with opacity-20 (3D Question Mark Background) */}
          <div
            className="absolute -left-6 @min-[640px]:-left-12 @min-[1024px]:-left-17 top-6 -translate-y-1/2 w-70 @min-[640px]:w-120 @min-[1024px]:w-160 aspect-square pointer-events-none select-none opacity-20 z-0"
            aria-hidden="true"
          >
            <img
              src="/countries/russia/bg-map.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* bg-worldmap.png with opacity-100 (Russia Illustrated Map Sticker) */}
          <div className="relative z-10 w-full max-w-75 @min-[640px]:max-w-110 @min-[1024px]:max-w-135
           @min-[1280px]:max-w-150 flex items-center justify-center">
            <img
              src="/countries/russia/russia-map.svg"
              alt="Illustrated Russia map sticker"
              className="w-full h-auto object-contain drop-shadow-lg shadow-black/60 opacity-100"
            />
          </div>
        </div>

        {/* ── Right Column: Text & Features ── */}
        <div className="relative z-10 w-full @min-[1024px]:w-[55%] flex flex-col items-start
         gap-4 @min-[640px]:gap-5 text-left">
          
          {/* Section Header */}
          <div className="flex flex-col w-full gap-3 @min-[640px]:gap-4">
            <h2
              className="font-semibold tracking-tight text-[26px] 
              @min-[640px]:text-[34px] @min-[1024px]:text-[40px] @min-[1280px]:text-[44px] leading-[1.18] m-0 text-white"
              style={{
                fontFamily: 'var(--font-heading)',
              }}
            >
              {heading}
            </h2>
            <div
              className="h-0.5 w-full rounded-full"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-brand-forest) 45%, transparent)" }}
              aria-hidden="true"
            />
          </div>

          {/* Point paragraphs */}
        { points.map((point, index) => (
          <p
            key={index}
            className="text-white text-[13.5px] @min-[640px]:text-[14.5px]
             @min-[1024px]:text-[15.5px] leading-[1.6] m-0 font-normal"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {point}
          </p>
        ))}

          {/* Exam checklist with check-icon.svg */}
          <div className="flex flex-col gap-2.5 @min-[640px]:gap-3 py-1">
            {exams.map((exam) => (
              <div key={exam} className="flex items-center gap-3">
                <img
                  src="/countries/russia/check-icon.svg"
                  alt=""
                  className="w-5 h-5 @min-[640px]:w-6 @min-[640px]:h-6 shrink-0"
                  aria-hidden="true"
                />
                <span
                  className="text-white text-[13.5px] @min-[640px]:text-[14.5px] font-normal"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {exam}
                </span>
              </div>
            ))}
          </div>

          {/* Additionally subtitle */}
          <p
            className="text-white text-[13.5px] @min-[640px]:text-[14.5px]
             @min-[1024px]:text-[15.5px]
             font-normal m-0 pt-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {additionalLabel}
          </p>

          {/* Benefit Cards — CMS-editable (add/delete/reorder + optional lucide icon) */}
          <div className="grid @min-[640px]:grid-cols-1 @min-[1024px]:grid-cols-3
           gap-3 @min-[640px]:gap-3.5 @min-[1024px]:gap-4 w-full">
            {normalizeBenefits(benefits).map((benefit, index) => {
              const BenefitIcon = getLucideIcon(benefit.icon);
              return (
                <div
                  key={`${benefit.text}-${index}`}
                  className="relative overflow-hidden rounded-xl p-3.5 @min-[640px]:p-4 bg-white/8 border border-white/10 backdrop-blur-sm flex flex-col justify-center min-h-19 @min-[640px]:min-h-22 shadow-lg"
                >
                  {/* Left gradient border bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.25 @min-[640px]:w-1.5"
                    style={{
                      backgroundImage:
                        "linear-gradient(152.61deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)",
                    }}
                    aria-hidden="true"
                  />
                  {BenefitIcon && (
                    <span
                      className="mb-2 ml-1.5 @min-[640px]:ml-2 grid h-8 w-8 place-items-center rounded-lg bg-white/10"
                      aria-hidden="true"
                    >
                      <BenefitIcon size={16} className="text-white" />
                    </span>
                  )}
                  <p
                    className="m-0 pl-1.5 @min-[640px]:pl-2 text-white
                   font-semibold text-[12.5px] @min-[640px]:text-[13px]
                   @min-[1024px]:text-[14px] leading-snug"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Paragraph 3 — CMS content is plain semantic HTML (a/strong);
              presentation for it comes from the .cms-prose rules in globals.css */}
          <p
            className="cms-prose cms-prose-inverse text-white text-[13.5px] @min-[640px]:text-[14.5px] @min-[1024px]:text-[15.5px] leading-[1.6] m-0 font-normal pt-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {outro}
          </p>
        </div>

      </div>
    </section>
  );
}
