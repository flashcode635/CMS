"use client";

import Image from "next/image";

// ── Partner logos — mapped to existing files in /public/home/partner/ ─────
// Figma shows 11 logos in the marquee strip, each in a 222×100 card
// bg=var(--color-surface-alt), border=var(--color-brand-champagne-soft-bg), rounded=12px
// We use all available SVGs for a richer, seamless loop
const partners = [
  { name: "Novosibirsk State University",         src: "/home/partner/novosibirsk.svg"       },
  { name: "Samara State Medical University",      src: "/home/partner/samarastatemedical.svg" },
  { name: "Kabardino-Balkarian State University", src: "/home/partner/kabardinobalkarian.svg" },
  { name: "East European University",             src: "/home/partner/easteuropian.svg"       },
  { name: "Kokand / Gruni University",            src: "/home/partner/gruni.svg"              },
  { name: "North Caucasus State Academy",         src: "/home/partner/ncsa.svg"               },
  { name: "International Black Sea University",   src: "/home/partner/logo-ibsu.png"          },
  { name: "Ural State Medical University",        src: "/home/partner/ural.svg"               },
  { name: "Grigol Robakidze University",          src: "/home/partner/grigol.svg"             },
  { name: "European University",                  src: "/home/partner/europeanuniveristy.svg" },
  { name: "Amur State Medical Academy",           src: "/home/partner/amur.svg"               },
  { name: "Bashkir State Medical University",     src: "/home/partner/bau.svg"                },
  { name: "Dagestan State Medical University",    src: "/home/partner/dtmu.svg"               },
  { name: "Jalal-Abad International University",  src: "/home/partner/jalalabadinternational.svg" },
  { name: "Jalal-Abad State University",          src: "/home/partner/jalalabadstate.svg"     },
  { name: "Kazan Federal University",             src: "/home/partner/kazanfederal.svg"       },
  { name: "Kazan State Medical University",       src: "/home/partner/kazanstate.svg"         },
  { name: "Osh International Medical University", src: "/home/partner/oshinternational.svg"   },
  { name: "Osh State University",                 src: "/home/partner/oshstate.svg"           },
];

// Duplicate for seamless infinite loop
const track = [...partners, ...partners];

export default function PartnersMarquee() {
  return (
    <>
      <style>{`
        

        .partners-track {
          display: inline-flex;
          align-items: center;
          gap: 48px;
          width: max-content;
          animation: sp-marquee 40s linear infinite;
        }
        .partners-track:hover {
          animation-play-state: paused;
        }

        /* Card hover lift */
        .partner-card {
          transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
        }
        .partner-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--color-brand-champagne) 14%, transparent);
          border-color: var(--color-brand-champagne);
        }
      `}</style>

      <section
        className="w-full flex flex-col items-center overflow-hidden"
        style={{
          backgroundColor: "var(--color-surface-alt)",
          gap: "clamp(24px, 2.5vw, 48px)",
          padding: "clamp(32px, 3.33vw, 64px) 0",
        }}
      >
        {/* ── Header ── */}
        <div className="flex flex-col items-center" style={{ gap: "clamp(6px, 0.63vw, 12px)" }}>

          {/* Title — Figma: Inter Bold 64px, gradient 160deg var(--color-brand-forest)→var(--color-brand-forest-deep) */}
          <h2
            className="font-bold text-center pt-19"
            style={{
              fontFamily: 'var(--font-sub)',
              fontSize: "clamp(28px, 3.33vw, 64px)",
              lineHeight: "clamp(32px, 2.5vw, 48px)",
              backgroundImage: "linear-gradient(160deg, var(--color-brand-forest) 12.7%, var(--color-brand-forest-deep) 87.2%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            Our Partner
          </h2>

          {/* Subtitle — Figma: Inter Regular 16px var(--color-body) */}
          <p
            className="text-center font-normal"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "clamp(12px, 0.83vw, 16px)",
              lineHeight: "24px",
              color: "var(--color-body)",
              margin: 0,
            }}
          >
            A Trusted Network Spanning the Entire Country
          </p>
        </div>

        {/* ── Marquee strip ── */}
        <div className="relative w-full overflow-hidden">

          {/* Left edge fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full z-10"
            style={{ width: "clamp(40px,6vw,120px)", background: "linear-gradient(to right, var(--color-surface-alt), transparent)" }}
          />
          {/* Right edge fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full z-10"
            style={{ width: "clamp(40px,6vw,120px)", background: "linear-gradient(to left, var(--color-surface-alt), transparent)" }}
          />

          <div className="partners-track">
            {track.map((partner, i) => (
              <div
                key={i}
                className="partner-card shrink-0 relative overflow-hidden flex items-center justify-center"
                style={{
                  // Figma: w=222px h=100px, rounded=12px, bg=var(--color-surface-alt), border=var(--color-brand-champagne-soft-bg)
                  width:  "clamp(120px, 11.56vw, 222px)",
                  height: "clamp(54px,  5.21vw, 100px)",
                  backgroundColor: "var(--color-surface-alt)",
                  borderRadius: "clamp(6px, 0.63vw, 12px)",
                  border: "1px solid var(--color-brand-champagne-soft-bg)",
                  padding: "clamp(8px, 0.63vw, 12px)",
                }}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={180}
                  height={80}
                  className="object-contain w-full h-full"
                  draggable={false}
                  style={{ maxWidth: "82%", maxHeight: "86%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
