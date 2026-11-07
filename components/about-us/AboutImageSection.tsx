/**
 * AboutImageSection — Third section of the About Us / Overview page.
 * Figma node 7:413
 *
 * Layout:
 *  - Full-width container with padding
 *  - Asymmetric-radius photo block:
 *      top-left:  32px  (square-ish)
 *      top-right: 500px (full pill)
 *      bottom-right: 32px
 *      bottom-left:  500px (full pill)
 *  - Top-left floating info card  (light glass)
 *  - Bottom-right floating info card  (dark/gradient glass)
 */

import Image from "next/image";
import ImageComboBanner from "./ImageComboBanner";

// ── Tick / check icon (inline SVG matching the Figma circle-tick) ────────────
function CircleTick({ dark = false }) {
  return (
    <svg
      viewBox="0 0 38 38"
      fill="none"
      className="w-full h-full"
      aria-hidden
    >
      <circle
        cx="19"
        cy="19"
        r="17"
        stroke={dark ? "white" : "white"}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M11 19.5L16.5 25L27 14"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Reusable Info Card ────────────────────────────────────────────────────────
function InfoCard({ dark = false }) {
  return (
    <div
      className="flex items-center gap-4 rounded-4.5 px-4 py-4"
      style={{
        width: "clamp(220px, 20.4vw, 294px)",
        height: "clamp(72px, 6.94vw, 100px)",
        background: dark
          ? "rgba(10,14,34,0.75)"
          : "rgba(255,255,255,0.18)",
        backdropFilter: "blur(16px) saturate(1.4)",
        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
        border: dark
          ? "1px solid rgba(186,203,255,0.18)"
          : "1px solid rgba(255,255,255,0.35)",
        boxShadow: dark
          ? "0 8px 32px rgba(0,0,0,0.35)"
          : "0 8px 24px rgba(0,0,0,0.12)",
      }}
    >
      {/* Gradient icon square */}
      <div
        className="relative shrink-0 rounded-xl"
        style={{
          width:  "clamp(48px, 5.21vw, 75px)",
          height: "clamp(48px, 5.21vw, 75px)",
          backgroundImage:
            "linear-gradient(108.93deg, #0E8F5B 12.704%, #0B3B2E 87.17%)",
        }}
      >
        <div
          className="absolute"
          style={{ inset: "14%" }}
        >
          <CircleTick />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 min-w-0">
        <p
          className="font-semibold leading-tight truncate"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(13px, 1.04vw, 20px)",
            color: dark ? "#ffffff" : "#12211C",
          }}
        >
          Elite Colleges
        </p>
        <p
          className="font-medium truncate capitalize"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(10px, 0.83vw, 14px)",
            color: dark ? "#F1E3C8" : "#66716A",
          }}
        >
          Top Ranked Universities
        </p>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function AboutImageSection() {
  return (
    <section className="w-full py-6 lg:py-10">
      <div className="max-w-full ">

        {/*
          Photo wrapper
          border-radius: top-left=32px, top-right=500px, bottom-right=32px, bottom-left=500px
          This matches the Figma "rounded-tl-4xl  rounded-tr-125 rounded-br-4xl  rounded-bl-125"
        */}

            <ImageComboBanner/>
      </div>
    </section>
  );
}
