"use client";

import UnivNav from "@/components/universities/univNav";
import image from "@/public/bg-doctor.jpg";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BG_IMAGE =
  "https://www.figma.com/api/mcp/asset/a0589cbc-b890-4e4d-8c47-5732c5033016";

// SVG component definitions removed; using public SVG assets from /svg
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//     <path d="M12 .587l3.668 7.568L24 9.75l-6 5.857L19.335 24 12 20.013 4.665 24 6 15.607 0 9.75l8.332-1.595z" />
//   </svg>

// const StarHalf = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//     <defs>
//       <linearGradient id="halfGrad">
//         <stop offset="50%" stopColor="currentColor" />
//         <stop offset="50%" stopColor="transparent" />
//       </linearGradient>
//     </defs>
//     <path d="M12 .587l3.668 7.568L24 9.75l-6 5.857L19.335 24 12 20.013 4.665 24 6 15.607 0 9.75l8.332-1.595z" fill="url(#halfGrad)" />
//   </svg>
// );

// const StarEmpty = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
//     <path d="M12 .587l3.668 7.568L24 9.75l-6 5.857L19.335 24 12 20.013 4.665 24 6 15.607 0 9.75l8.332-1.595z" />
//   </svg>
// );

// const ArrowIcon = () => (
//   <svg width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden="true">
//     <path d="M5 12.5h14M13 5l6 7.5-6 7.5" stroke="currentColor" strokeWidth="2" />
//   </svg>
// );

// Removed image-based stars; will use inline SVG components
// sample content
import { DEFAULT_CONTENT } from "@/lib/constants";
import type { RussiaBannerProps } from "@/types/types";


export default function RussiaBanner({
  sectionLabel = DEFAULT_CONTENT.sectionLabel,
  title = DEFAULT_CONTENT.title,
  subtitle = DEFAULT_CONTENT.subtitle,
  rating = DEFAULT_CONTENT.rating,
  ratingLabel = DEFAULT_CONTENT.ratingLabel,
  yellowStarSrc = DEFAULT_CONTENT.yellowStarSrc,
  greyStarSrc = DEFAULT_CONTENT.greyStarSrc,
  consultationHref = DEFAULT_CONTENT.consultationHref,
  consultationLabel = DEFAULT_CONTENT.consultationLabel,
  languagesLabel = DEFAULT_CONTENT.languagesLabel,
  languages = DEFAULT_CONTENT.languages,
  currencyLabel = DEFAULT_CONTENT.currencyLabel,
  currency = DEFAULT_CONTENT.currency,
}: RussiaBannerProps) {
 return (
  <section
    className="relative flex w-full min-h-135 flex-col overflow-hidden @min-[640px]:min-h-[clamp(460px,40.15cqw,871px)]"
    aria-label={sectionLabel}
  >
    {/* Background (only layer that stays absolute) */}
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-linear-to-b from-black/80 to-black/20 bg-cover bg-center" />
      <div className="absolute inset-0 opacity-50">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          priority
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0.753%, var(--color-brand-forest-deep) 100.75%)",
        }}
      />
    </div>

    {/* Foreground: normal flow column -> centre / info row / nav */}
    <div className="relative z-10 flex flex-1 flex-col">
      {/* Centre content */}
      <div
        className="flex flex-1 flex-col items-center justify-center text-center"
        style={{ padding: "0 clamp(20px, 5cqw, 80px)" }}
      >
        <div
          className="flex w-full flex-col items-center"
          style={{ gap: "clamp(20px, 3.33cqw, 64px)", maxWidth: 1315 }}
        >
          <div
            className="flex w-full flex-col items-center"
            style={{ gap: "clamp(12px, 1.25cqw, 24px)" }}
          >
            <h1
              className="m-0 text-center text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: "clamp(26px, 3.33cqw, 64px)",
                lineHeight: 1.094,
              }}
            >
              {title}
            </h1>

            <div
              className="flex flex-col items-center"
              style={{ gap: "clamp(12px, 1.25cqw, 24px)", maxWidth: 602 }}
            >
              <p
                className="m-0 text-center text-white"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: "clamp(13px, 1.04cqw, 20px)",
                  lineHeight: 1.3,
                }}
              >
                {subtitle}
              </p>

              <div className="flex items-center gap-2.5" aria-label={ratingLabel}>
                <div className="flex h-4.5 items-center">
                  {[yellowStarSrc, yellowStarSrc, yellowStarSrc, yellowStarSrc, greyStarSrc].map(
                    (src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className="h-4.5 w-6 object-contain"
                      />
                    )
                  )}
                </div>
                <span
                  className="text-white"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: "clamp(12px, 0.73cqw, 14px)",
                    lineHeight: 1.14,
                    opacity: 0.6,
                  }}
                >
                  {rating}
                </span>
              </div>
            </div>
          </div>

          <Link
            href={consultationHref ?? "#"}
            className="flex items-center justify-center gap-2 whitespace-nowrap text-white no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:opacity-90"
            style={{
              backgroundImage:
                "linear-gradient(152.61deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)",
              borderRadius: 8,
              padding: "clamp(12px, 0.83cqw, 16px) clamp(20px, 1.46cqw, 28px)",
              height: "clamp(44px, 2.71cqw, 52px)",
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: "clamp(13px, 0.83cqw, 16px)",
              lineHeight: 1.25,
            }}
          >
            <span>{consultationLabel}</span>
            <span
              className="flex shrink-0 items-center justify-center text-white"
              style={{
                width: "clamp(20px, 1.8cqw, 34.65px)",
                height: "clamp(20px, 1.8cqw, 34.65px)",
                transform: "rotate(-45deg) scaleY(-1)",
              }}
            >
              <ArrowRight size={24} strokeWidth={2} />
            </span>
          </Link>
        </div>
      </div>

      {/* Languages (left) + Currency (right) */}
      <div
        className="flex items-end justify-between gap-4"
        style={{
          padding: "0 clamp(16px, 5.16cqw, 99px)",
          paddingBottom: "clamp(8px, 0.8cqw, 16px)",
        }}
      >
        <div className="flex max-w-[55%] flex-col items-start text-left" aria-label="Languages spoken">
          <span
            className="text-white"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: "clamp(11px, 0.89cqw, 17px)",
              lineHeight: "28px",
            }}
          >
            {languagesLabel}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: "clamp(11px, 0.89cqw, 17px)",
              lineHeight: "28px",
              color: "var(--color-body)",
            }}
          >
            {languages}
          </span>
        </div>

        {/* thoda sa upar offset, image jaisa */}
        <div
          className="flex max-w-[45%] flex-col items-end text-right"
          style={{ marginBottom: "clamp(2px, 0.3cqw, 5px)" }}
          aria-label="Currency"
        >
          <span
            className="text-white"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: "clamp(11px, 0.89cqw, 17px)",
              lineHeight: "28px",
            }}
          >
            {currencyLabel}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: "clamp(11px, 0.89cqw, 17px)",
              lineHeight: "28px",
              color: "var(--color-body)",
            }}
          >
            {currency}
          </span>
        </div>
      </div>

     
    </div>
  </section>
);
}