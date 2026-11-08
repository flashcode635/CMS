"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

// ── Country pin data — exact Figma positions (design canvas: 1109×674px) ─
// Each pin: pin image + label above it
// Figma pin size: w=46.156px h=62.852px
// All positions as % of the 1109×674 canvas so they scale with the section
// pin.left / pin.top = pin element left/top as % of container width/height
// label is positioned above the pin
const PINS = [
  {
    name: "Russia",
    // pin left=572px (51.58%), top=316.99px (47.03%)
    // label left=600.65px center (54.16%), top=289.64px (42.97%)
    pinLeft:   "51.58%",
    pinTop:    "47.03%",
    labelLeft: "54.16%",
    labelTop:  "39.97%",
    rotate:    0,
    flip:      true,   // Figma: -scale-y-100 rotate-180 = flipped upside-down pin = standard upright pin
  },
  {
    name: "Italy",
    // pin left=366.13px (33.01%), top=322.51px (47.85%)
    // label left=389.71px center (35.14%), top=297.64px (44.16%)
    pinLeft:   "33.01%",
    pinTop:    "47.85%",
    labelLeft: "35.14%",
    labelTop:  "40.16%",
    rotate:    0,
    flip:      false,
  },
  {
    name: "Nepal",
    // pin left=554.31px (49.98%), top=465.91px (69.12%)
    // label left=578.58px center (52.17%), top=438.05px (64.99%)
    pinLeft:   "49.98%",
    pinTop:    "69.12%",
    labelLeft: "52.17%",
    labelTop:  "62.99%",
    rotate:    0,
    flip:      false,
  },
  {
    name: "Australia",
    // pin left=253.46px (22.86%), top=434.49px (64.46%)
    // label centered at 266.72px (24.05%), top=402.94px (59.78%), rotated -12.67deg
    pinLeft:   "22.86%",
    pinTop:    "64.46%",
    labelLeft: "24.05%",
    labelTop:  "57.78%",
    rotate:    -12.67,
    flip:      false,
  },
  {
    name: "Georgia",
    // pin left=787.59px (71.02%), top=421.09px (62.48%)
    // label left=810.17px center (73.06%), top=396.49px (58.82%)
    pinLeft:   "71.02%",
    pinTop:    "62.48%",
    labelLeft: "73.06%",
    labelTop:  "56.82%",
    rotate:    0,
    flip:      true,
  },
];

export default function MBBSCountries() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        
        

        .mc-title { opacity: 0; }
        .mc-title.in { animation: sp-fade-up 0.9s 0.05s forwards cubic-bezier(0.22,1,0.36,1); }
        .mc-sub   { opacity: 0; }
        .mc-sub.in   { animation: sp-fade-up 0.8s 0.2s  forwards cubic-bezier(0.22,1,0.36,1); }
        .mc-btn   { opacity: 0; }
        .mc-btn.in   { animation: sp-fade-up 0.7s 0.35s forwards cubic-bezier(0.22,1,0.36,1); }
        .mc-map   { opacity: 0; }
        .mc-map.in   { animation: sp-fade-up 1.0s 0.15s forwards cubic-bezier(0.22,1,0.36,1); }

        .mc-pin { opacity: 0; }
        .mc-pin.in { animation: sp-pin-drop 0.6s forwards cubic-bezier(0.34,1.56,0.64,1); }

        .mc-reg-btn {
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .mc-reg-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px color-mix(in srgb, var(--color-brand-champagne) 35%, transparent);
        }
        .mc-reg-btn:active { transform: scale(0.97); }
        .mc-reg-btn:hover .mc-reg-arrow {
          transform: scaleY(-1) translateX(5px);
        }
        .mc-reg-arrow {
          transform: scaleY(-1);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          // Figma bg: light blue gradient
          background: "var(--color-surface-alt)",
          width: "100%",
          overflow: "hidden",
          position: "relative",
          // Section total height ~674px at 1109w = 60.78%
          // At 1920w scale up proportionally
          paddingBottom: "20px",
        }}
      >
        {/* ── Text block + CTA — centered, top of section ── */}
        {/* Figma: left=139px (12.54%), w=827px (74.57%), gap=48px */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(20px, 2.5vw, 48px)",
            padding: "clamp(32px, 3.33vw, 64px) clamp(20px, 4.17vw, 80px) 0",
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* Heading — Figma: Playfair Display Regular 64px var(--color-brand-forest-deep) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(10px, 1.25vw, 24px)", textAlign: "center" }}>
            <h2
              className={`mc-title${visible ? " in" : ""}`}
              style={{
                fontFamily: 'var(--font-sub)',
                fontWeight: 400,
                fontSize: "clamp(28px, 3.33vw, 64px)",
                lineHeight: "clamp(32px, 2.5vw, 48px)",
                color: "var(--color-brand-forest-deep)",
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              MBBS From 12+ Countries
            </h2>

            {/* Subtitle — Figma: Inter 16px color-mix(in srgb, var(--color-brand-blue) 61%, transparent) */}
            <p
              className={`mc-sub${visible ? " in" : ""}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: "clamp(12px, 0.83vw, 16px)",
                lineHeight: "22px",
                color: "color-mix(in srgb, var(--color-brand-blue) 61%, transparent)",
                margin: 0,
                maxWidth: "clamp(260px, 24.91vw, 478px)",
                textAlign: "center",
              }}
            >
              We offer comprehensive guidance and support for students who want to pursue MBBS in 12+ Country
            </p>
          </div>

          {/* Register Now button — Figma: h=56px gradient 147deg, Inter Regular 21.333px */}
          <div className={`mc-btn${visible ? " in" : ""}`}>
            <Button
            variant="brand"
              className="mc-reg-btn flex items-center justify-center text-white uppercase shadow-none"
              style={{
                height: "clamp(40px, 2.92vw, 56px)",
                padding: "0 clamp(18px, 1.67vw, 32px)",
                backgroundImage: "linear-gradient(147deg, var(--color-brand-forest) 12.7%, var(--color-brand-forest-deep) 87.2%)",
                border: "none",
                cursor: "pointer",
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: "clamp(12px, 1.11vw, 21.333px)",
                letterSpacing: "-0.02em",
                gap: "clamp(6px, 0.63vw, 12px)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>Register Now</span>
              <span className="mc-reg-arrow" aria-hidden>
                <svg viewBox="0 0 24 25" fill="none"
                  style={{ width: "clamp(14px,1.25vw,24px)", height: "clamp(15px,1.3vw,25px)" }}>
                  <path d="M21.2578 12.9688L14.2969 19.9062L12.8672 18.5L17.4141 13.9531H4.00781V11.9609H17.4141L12.8672 7.41406L14.2969 6.00781L21.2578 12.9688Z" fill="white"/>
                </svg>
              </span>
            </Button>
          </div>
        </div>

        {/* ── World map + pins ── */}
        {/* Figma map container: 1109×449px at 46% opacity positioned at top=222px */}
        {/* We make the map responsive using padding-bottom aspect-ratio trick */}
        <div
          style={{
            position: "relative",
            width: "100%",
            // Map appears below the CTA — some overlap via negative margin like Figma
            marginTop: "clamp(-20px, -1.04vw, -20px)",
            // Height: 449/1109 = 40.49% of its own width
            paddingBottom: "40.49%",
          }}
        >
          {/* World map silhouette — opacity 30% + light blue overlay */}
          <div
            className={`mc-map${visible ? " in" : ""} absolute inset-0`}
           
          >
            {/* Light blue rect overlay (mix-blend-lighten effect) */}
            <div
              className="absolute inset-0"
              style={{ mixBlendMode: "lighten", zIndex: 1 }}
            />
            {/* World map image */}
            <div className="absolute insert-0" style={{ zIndex: 10 }}>
             
            </div>
          </div>

          {/* Country pins — absolutely positioned over map */}
         <Image
                src="/home/globe-image.png"
                alt="World map"
                fill
                className=" object-center h-[50vh]"  
                sizes="100vw"
                priority={false}
              />
        </div>
      </section>
    </>
  );
}
