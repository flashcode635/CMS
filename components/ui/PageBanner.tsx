"use client";

import Image from "next/image";

export interface PageBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export default function PageBanner({
  title,
  subtitle,
  backgroundImage="/bd-doctor.jpg",
  overlayOpacity = 0.5,
}: PageBannerProps) {
  return (
    <section
      className="relative w-full font-heading h-[68vh] min-h-[420px] max-h-[720px] overflow-hidden bg-brand-forest-deep"
      aria-label={`${title} banner`}
    >
      <div className="absolute inset-0 bg-brand-forest-deep" />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: overlayOpacity }}
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--color-brand-forest-deep) 15%, transparent) 0%, color-mix(in srgb, var(--color-brand-forest-deep) 55%, transparent) 55%, var(--color-brand-forest-deep) 100%)",
        }}
        aria-hidden
      />

      {/* champagne hairline keeps the banner in the premium family */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-champagne/60 to-transparent"
        aria-hidden
      />

      <div
        className="relative w-full z-10 font-heading flex flex-col items-center 
        justify-center px-4 text-center h-full gap-2"
        
      >
        <h1
          className="text-white w-3/4 font-bold leading-tight"
          style={{
            fontSize: "clamp(30px, 3.9vw, 54px)",
            textShadow: "0 2px 12px color-mix(in srgb, black 60%, transparent)",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="mt-2 text-white/80 font-sans tracking-wider font-medium"
            style={{
              fontSize: "clamp(13px, 1.1vw, 18px)",
              textShadow: "0 1px 6px color-mix(in srgb, black 50%, transparent)",
              maxWidth: "680px",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
