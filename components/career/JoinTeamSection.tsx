/**
 * JoinTeamSection — Figma node 261:2050
 * Career page — 3rd component
 *
 * Desktop:
 *   - Gradient heading (Inter Bold) + subtitle
 *   - Large office photo (left ~67%), white card overlapping right side
 *
 * Mobile:
 *   - Heading + subtitle stacked
 *   - Photo full-width, card below
 */

import Image from "next/image";
import { Button } from "@/components/ui/Button";

// ── Arrow icon ────────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="#072A21"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function JoinTeamSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 py-14 lg:py-20">
      <div className="max-w-380.25 mx-auto flex flex-col gap-12 lg:gap-16">

        {/* ── Header ── */}
        <div className="flex flex-col gap-3">
          <h2
            className="font-bold bg-clip-text text-transparent leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4.17vw, 64px)",
              lineHeight: 1.2,
              backgroundImage:
                "linear-gradient(167.98deg, #0E8F5B 12.704%, #0B3B2E 87.17%)",
            }}
          >
            Join the My Study Hub Team
          </h2>
          <p
            className="text-[#4A554F] font-normal leading-relaxed"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(14px, 1.11vw, 21px)",
              letterSpacing: "-0.4267px",
            }}
          >
            We&apos;re looking for passionate individuals who are dedicated to
            making a difference in education.
          </p>
        </div>

        {/* ── Photo + Card block ── */}

        {/* ── DESKTOP (lg+): overlapping layout ── */}
        <div className="hidden lg:block relative w-full" style={{ height: 600 }}>

          {/* Office photo — left ~67% */}
          <div
            className="absolute left-0 top-0 h-full rounded-xl overflow-hidden"
            style={{ width: "66.75%" }}
          >
            <Image
              src="/home/about-graduation.png"
              alt="My Study Hub team collaborating in the office"
              fill
              className="object-cover object-center"
              sizes="67vw"
            />
          </div>

          {/* White card — overlaps from ~47% to right edge */}
          <div
            className="absolute right-0 bg-white rounded-xl border border-brand-sky flex flex-col gap-5 p-12"
            style={{
              top:       "19.2%",
              width:     "clamp(460px, 51.5%, 650px)",
              boxShadow: "0px 3px 34.25px rgba(25,33,61,0.08)",
            }}
          >
            {/* About text */}
            <div className="flex flex-col gap-3">
              <h3
                className="font-extrabold text-[#12211C] leading-tight"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(20px, 1.67vw, 32px)",
                  lineHeight: "18px",
                }}
              >
                About My Study Hub
              </h3>
              <p
                className="font-light text-[#4A554F] leading-relaxed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(14px, 0.94vw, 18px)",
                  lineHeight: "25px",
                }}
              >
                Briefly describe My Study Hub&apos;s mission, values, and impact on
                student learning in Delhi. Highlight what makes your company unique
                and the kind of work environment you foster.
              </p>
            </div>

            {/* Brochures button */}
<Button variant="brandOutline" size="bare"
  className="group w-fit border-brand-navy px-6.5 py-2.5 text-lg font-semibold leading-tight text-brand-navy shadow-[0px_1.31px_5.25px_rgba(25,33,61,0.08)] hover:bg-brand-navy">
              Brochures
              <span className="group-hover:[&_path]:stroke-white transition-colors">
                <ArrowRight />
              </span>
            </Button>
          </div>
        </div>

        {/* ── MOBILE (< lg): stacked layout ── */}
        <div className="flex lg:hidden flex-col gap-6">

          {/* Photo full width */}
          <div className="relative w-full rounded-xl overflow-hidden" style={{ height: 260 }}>
            <Image
              src="/home/about-graduation.png"
              alt="My Study Hub team collaborating in the office"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Card below */}
         
        </div>

      </div>
    </section>
  );
}
