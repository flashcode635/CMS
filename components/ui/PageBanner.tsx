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
      className="relative w-full font-serif h-[68vh] min-h-[420px] max-h-[720px] overflow-hidden bg-[#072A21]"
      aria-label={`${title} banner`}
    >
      <div className="absolute inset-0 bg-[#072A21]" />

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
            "linear-gradient(to bottom, rgba(7,42,33,0.15) 0%, rgba(7,42,33,0.55) 55%, rgba(7,42,33,1) 100%)",
        }}
        aria-hidden
      />

      {/* champagne hairline keeps the banner in the premium family */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-champagne/60 to-transparent"
        aria-hidden
      />

      <div
        className="relative w-full z-10 font-serif flex flex-col items-center 
        justify-center px-4 text-center h-full gap-2"
        
      >
        <h1
          className="text-white w-3/4 font-bold leading-tight"
          style={{
            fontSize: "clamp(30px, 3.9vw, 54px)",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="mt-2 text-white/80 font-sans tracking-wider font-medium"
            style={{
              fontSize: "clamp(13px, 1.1vw, 18px)",
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
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
