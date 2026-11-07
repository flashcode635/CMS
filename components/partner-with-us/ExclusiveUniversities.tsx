/**
 * ExclusiveUniversities — Figma nodes 966:2379 (desktop) + 973:1339 (mobile)
 * Partner With Us page — 7th component
 *
 * Desktop: eyebrow + gradient heading + subtitle, 3 filter tabs,
 *          6 university cards in a flex-wrap row (253×375px each)
 *          Each card: coloured bg, logo centred, coloured footer label
 *
 * Mobile:  centered header, pill badges (wrap), 2-col grid of cards (240px tall)
 */

"use client";
import UnivCard from "@/components/homepage/univCard";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// ── University data ───────────────────────────────────────────────────────────
const UNIVERSITIES = [
  {
    id: 1,
    name: "Samara State Medical University",
    bg:         "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    logo:       "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&q=80",
    footerBg:   "#1d6eb7",
    mobileBg:   "#dfe7f1",
    mobileLogo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&q=80",
    filter: "russia",
  },
  {
    id: 2,
    name: "Novosibirsk State University",
    bg:         "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
    logo:       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&q=80",
    footerBg:   "#77c043",
    mobileBg:   "#e7fcd8",
    mobileLogo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&q=80",
    filter: "russia",
  },
  {
    id: 3,
    name: "Kabardino-Balkarian State University",
    bg:         "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80",
    logo:       "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=80",
    footerBg:   "#33588b",
    mobileBg:   "#d6e1f0",
    mobileLogo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80",
    filter: "russia",
  },
  {
    id: 4,
    name: "Ural State Medical University",
    bg:         "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80",
    logo:       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
    footerBg:   "#864b08",
    mobileBg:   "#ffedd4",
    mobileLogo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
    filter: "russia",
  },
  {
    id: 5,
    name: "East European University",
    bg:         "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    logo:       "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=300&q=80",
    footerBg:   "#910b0b",
    mobileBg:   "#ffe1e1",
    mobileLogo: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=200&q=80",
    filter: "georgia",
  },
  {
    id: 6,
    name: "International Black Sea University",
    bg:         "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80",
    logo:       "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&q=80",
    footerBg:   "#2b62a6",
    mobileBg:   "#d6e1f0",
    mobileLogo: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=200&q=80",
    filter: "kyrgyzstan",
  },
];

const FILTERS = [
  { key: "russia",     label: "MBBS In Russia"     },
  { key: "georgia",    label: "MBBS In Georgia"    },
  { key: "kyrgyzstan", label: "MBBS In Kyrgyzstan" },
];

export default function ExclusiveUniversities() {
  const [active, setActive] = useState("russia");

  // show all when "russia" selected (all 6), otherwise filter
  const visible = active === "russia"
    ? UNIVERSITIES
    : UNIVERSITIES.filter(u => u.filter === active);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-14 xl:px-16 py-14 lg:py-20">
      <div className="max-w-[1720px] mx-auto flex flex-col gap-10 lg:gap-12">

        {/* ── Header ── */}
        <div className="flex flex-col items-start sm:items-center gap-3 text-center sm:text-center">
          <p
            className="text-brand-royal font-normal tracking-[0.8533px] text-base sm:text-xl"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Our Partners
          </p>
          <h2
            className="font-bold text-left sm:text-center text-black"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(28px, 4.17vw, 64px)",
              lineHeight: 1.2,
            }}
          >
            Our Exclusive Universities
          </h2>
          <p
            className="text-[#5a6777] font-normal text-sm sm:text-base leading-relaxed max-w-160 text-left sm:text-center"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Help us get to know you better. Fill in the details and our team will
            contact you within the next 24 hours!
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-3 items-center">
          {FILTERS.map((f) => {
            const isActive = active === f.key;
            return (
              <Button variant="unstyled"
                key={f.key}
                onClick={() => setActive(f.key)}
                className={[
                  "h-12 px-6 rounded-full font-semibold text-base transition-all shadow-none",
                  isActive
                    ? "text-white"
                    : "border border-brand-green bg-white text-transparent bg-clip-text",
                ].join(" ")}
                style={{
                  fontFamily: "Inter, sans-serif",
                  ...(isActive
                    ? { backgroundImage: "linear-gradient(140.2deg, #00923F 12.704%, #3163FF 87.17%)" }
                    : {}),
                }}
              >
                {isActive ? (
                  <span className="text-white">{f.label}</span>
                ) : (
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(165deg, #00923F 12.704%, #3163FF 87.17%)" }}
                  >
                    {f.label}
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════
            DESKTOP cards (hidden below sm)
        ══════════════════════════════════════════ */}
        <div className="hidden sm:grid sm:grid-cols-4 xl:grid-cols-6 items-start">
          {visible.map((u) => (
            <div
              key={u.id}
              className="relative shrink-0 overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ width: 180, height: 263 }}
            >
              {/* Background image */}
              <Image
                src={u.bg}
                alt=""
                fill
                className="object-cover object-center"
                unoptimized
                sizes="253px"
                aria-hidden
              />

              {/* University logo — centred */}
              <div className="absolute inset-0 flex items-center justify-center pb-12.5">
                <div className="relative" style={{ width: 157, height: 157 }}>
                  <Image
                    src={u.logo}
                    alt={u.name}
                    fill
                    className="object-contain drop-shadow-md"
                    unoptimized
                    sizes="157px"
                  />
                </div>
              </div>

              {/* Footer label */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-center px-3 rounded-xl mx-3 mb-3"
                style={{ height: 38, backgroundColor: u.footerBg }}
              >
                <p
                  className="text-white font-semibold text-xs text-center leading-tight"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {u.name}
                </p>
              </div>
            </div>
          ))}

          
        </div>

        {/* ══════════════════════════════════════════
            MOBILE cards 2-col grid (hidden sm+)
        ══════════════════════════════════════════ */}
        <div className="grid sm:hidden grid-cols-2 gap-4">
          {visible.map((u) => (
            <div
              key={u.id}
              className="flex flex-col overflow-hidden rounded-2xl"
              style={{ height: 240 }}
            >
              {/* Logo area */}
              <div
                className="flex flex-1 items-center justify-center p-5"
                style={{ backgroundColor: u.mobileBg }}
              >
                <div className="relative w-20 h-20 shadow-md">
                  <Image
                    src={u.mobileLogo}
                    alt={u.name}
                    fill
                    className="object-contain"
                    unoptimized
                    sizes="80px"
                  />
                </div>
              </div>

              {/* Footer label */}
              <div
                className="flex items-center justify-center px-2 py-1 h-12 shrink-0"
                style={{ backgroundColor: u.footerBg }}
              >
                <p
                  className="text-white font-semibold text-[11px] text-center leading-snug"
                  style={{ fontFamily: "'Lexend', sans-serif" }}
                >
                  {u.name}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
