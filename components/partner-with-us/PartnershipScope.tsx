/**
 * PartnershipScope — Figma nodes 271:1145 (desktop) + 796:1694 (mobile)
 * Partner With Us page — 4th component
 *
 * Desktop: Inter ExtraBold heading, 4-col flex-wrap row of cards
 *   - Blue cards: bg-[#F1E3C8] border-[rgba(216,178,110,0.5)]
 *   - Green cards: bg-[#EDF3EF] border-[rgba(10,107,68,0.5)]
 *   - Card shape: rounded-tl-xl rounded-tr-[82px] rounded-br-xl rounded-bl-xl
 *   - Icon: 64px bg-[#F1E3C8] rounded-xl
 *   - Title: Playfair Display 20px, subtitle: Inter Regular 14px #66716A
 *
 * Mobile: same cards stacked 1-col, icon 40px, "View All" outline button at bottom
 */

import Image from "next/image";
import image1 from "@/public/svg/card-image.png";
import image2 from "@/public/svg/card-image2.png";
import image3 from "@/public/svg/card-image3.png";
import image4 from "@/public/svg/card-image4.png";
// ── Partner data ──────────────────────────────────────────────────────────────
const PARTNERS = [
  {
    id: 1,
    variant: "blue",
    desktopIcon: image1,
    mobileIcon: image1,
    title:    "Universities & Institutes",
    subtitle: "(Student exchanges, research collaborations)",
  },
  {
    id: 2,
    variant: "green",
    desktopIcon: image2,
    mobileIcon: image2,
    title:    "Businesses & Corporates",
    subtitle: "(Sponsorships, training programs)",
  },
  {
    id: 3,
    variant: "blue",
    desktopIcon: image3,
    mobileIcon: image3,
    title:    "Government & NGOs",
    subtitle: "(Community development projects)",
  },
  {
    id: 4,
    variant: "green",
    desktopIcon: image4,
    mobileIcon: image4,
    title:    "Technology & Service Providers",
    subtitle: "(Joint ventures, digital solutions)",
  },
];

// colour tokens per variant
const VARIANT: Record<string, { bg: string; border: string }> = {
  blue:  { bg: "bg-[#F1E3C8]", border: "border-[rgba(216,178,110,0.5)]"  },
  green: { bg: "bg-[#EDF3EF]", border: "border-[rgba(10,107,68,0.5)]"    },
};

export default function PartnershipScope() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-8 xl:px-10 py-12 lg:py-16">
      <div className="max-w-[1784px] mx-auto flex flex-col gap-8 lg:gap-12">

        {/* ── Heading ── */}
        <h2
          className="font-extrabold text-[#12211C] text-2xl sm:text-3xl lg:text-4xl 
           leading-tight lg:leading-12"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Who Can Partner With Us?
        </h2>

        {/* ══════════════════════════════════════════
            DESKTOP cards — flex-wrap 4 col (hidden on mobile)
        ══════════════════════════════════════════ */}
        <div className="hidden sm:flex flex-wrap gap-4 items-stretch">
          {PARTNERS.map((p) => (
            <div
              key={p.id}
              className={[
                "flex flex-col gap-3 p-4 pb-3 flex-1 min-w-55",
                "border",
                VARIANT[p.variant].bg,
                VARIANT[p.variant].border,
                /* asymmetric radius: tl normal, tr large pill */
                "rounded-tl-md rounded-tr-[70px] rounded-br-md rounded-bl-md",
                "shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)]",
                "transition-all duration-300",
                "hover:-translate-y-2 hover:shadow-[0px_24px_48px_rgba(216,178,110,0.15)]",
              ].join(" ")}
            >
              {/* Icon 64px */}
              <div className="relative w-12 h-12 rounded-lg bg-[#F1E3C8] overflow-hidden shrink-0">
                <Image
                  src={p.desktopIcon}
                  alt={p.title}
                  fill
                  className="object-cover object-center"
                  unoptimized
                  sizes="60px"
                />
              </div>

              {/* Title + subtitle */}
              <div className="flex flex-col h-fit">
                <p
                  className="text-[#12211C] text-sm leading-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {p.title}
                </p>
                <p
                  className="text-[#66716A] text-[9px] leading-4
                   font-normal"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {p.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            MOBILE cards — single column (hidden on sm+)
        ══════════════════════════════════════════ */}
        <div className="flex sm:hidden flex-col gap-4">
          {PARTNERS.map((p) => (
            <div
              key={p.id}
              className={[
                "flex flex-col gap-3 p-5 w-full",
                "border",
                VARIANT[p.variant].bg,
                VARIANT[p.variant].border,
                /* mobile: smaller tr pill radius */
                "rounded-tl-xl rounded-tr-[48px] rounded-br-xl rounded-bl-xl",
                "shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)]",
              ].join(" ")}
            >
              {/* Icon 40px */}
              <div className="relative w-10 h-10 rounded-lg bg-[#F1E3C8] overflow-hidden shrink-0">
                <Image
                  src={p.mobileIcon}
                  alt={p.title}
                  fill
                  className="object-cover object-center"
                  unoptimized
                  sizes="40px"
                />
              </div>

              {/* Title + subtitle */}
              <div className="flex flex-col gap-0.5">
                <p
                  className="text-[#12211C] text-base font-semibold leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {p.title}
                </p>
                <p
                  className="text-[#66716A] text-xs font-light leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {p.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
