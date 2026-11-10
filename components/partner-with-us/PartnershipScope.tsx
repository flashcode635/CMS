/**
 * PartnershipScope — Figma nodes 271:1145 (desktop) + 796:1694 (mobile)
 * Partner With Us page — 4th component
 *
 * Desktop: Inter ExtraBold heading, 4-col flex-wrap row of cards
 *   - Blue cards: bg-brand-champagne-soft-bg border-brand-champagne/50
 *   - Green cards: bg-surface-alt border-brand-royal/50
 *   - Card shape: rounded-tl-xl rounded-tr-[82px] rounded-br-xl rounded-bl-xl
 *   - Icon: 64px bg-brand-champagne-soft-bg rounded-xl
 *   - Title: Fraunces 20px (heading tier), subtitle: Inter Regular 14px var(--color-muted)
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
  blue:  { bg: "bg-brand-champagne-soft-bg", border: "border-brand-champagne/50"  },
  green: { bg: "bg-surface-alt", border: "border-brand-royal/50"    },
};

export default function PartnershipScope() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-8 xl:px-10 py-12 lg:py-16">
      <div className="max-w-[1784px] mx-auto flex flex-col gap-8 lg:gap-12">

        {/* ── Heading ── */}
        <h2
          className="font-extrabold text-ink text-2xl sm:text-3xl lg:text-4xl 
           leading-tight lg:leading-12"
          style={{ fontFamily: "var(--font-sub)" }}
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
                "shadow-xl shadow-black/16",
                "transition-all duration-300",
                "hover:-translate-y-2 hover:shadow-xl shadow-brand-champagne/15",
              ].join(" ")}
            >
              {/* Icon 64px */}
              <div className="relative w-12 h-12 rounded-lg bg-brand-champagne-soft-bg overflow-hidden shrink-0">
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
                  className="text-ink text-sm leading-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {p.title}
                </p>
                <p
                  className="text-muted text-[9px] leading-4
                   font-normal"
                  style={{ fontFamily: 'var(--font-body)' }}
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
                "shadow-xl shadow-black/16",
              ].join(" ")}
            >
              {/* Icon 40px */}
              <div className="relative w-10 h-10 rounded-lg bg-brand-champagne-soft-bg overflow-hidden shrink-0">
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
                  className="text-ink text-base font-semibold leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {p.title}
                </p>
                <p
                  className="text-muted text-xs font-light leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
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
