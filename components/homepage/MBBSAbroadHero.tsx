"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const DEFAULT_CONTENT = {
  countries: [
    { name: "Samara State University", image: "/home/mbbs-russia.webp" },
    { name: "Novi Sad University", image: "/home/mbbs-georgia.webp" },
    { name: "Tashkent University", image: "/home/mbbs-uzbekistan.webp" },
    { name: "Ural Medical University", image: "/home/mbbs-kazakhstan.webp" },
    { name: "Tver State Medical University", image: "/home/mbbs-nepal.webp" },
  ],
  backgroundImage: "/home/mbbs-bg-pattern.jpg",
  backgroundImageAlt: "",
  subtitle: "Study MBBS Abroad",
  titlePrefix: "Top Countries for",
  titleAccent: "Study in Abroad",
  description: "Study MBBS overseas at MCI-approved universities, which offer low tuition, high-quality education, global recognition, and easy admission.",
  descriptionEmphasis: "These universities are in Top-ranked countries",
  countriesDescription: "Russia, Georgia, Uzbekistan, Kazakhstan, Nepal",
  descriptionSuffix: ", and more. Free counseling available!",
  ctaLabel: "Register Now",
  ctaAriaLabel: "Register Now",
};

type MBBSAbroadHeroProps = {
  countries?: typeof DEFAULT_CONTENT.countries;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  subtitle?: string;
  titlePrefix?: string;
  titleAccent?: string;
  description?: string;
  descriptionEmphasis?: string;
  countriesDescription?: string;
  descriptionSuffix?: string;
  ctaLabel?: string;
  ctaAriaLabel?: string;
};

// Figma specs (px at 1920w)
// Card: w=338 h=364  image-area: h=277  label bottom=45.47px from card bottom
// Gap between cards: 24px
// Cards row top: 440px from section top
// Section total height: ~820px (618 blue band + cards overflow)
// Card label divider: gradient line on hover

export default function MBBSAbroadHero({
  countries = DEFAULT_CONTENT.countries,
  backgroundImage = DEFAULT_CONTENT.backgroundImage,
  backgroundImageAlt = DEFAULT_CONTENT.backgroundImageAlt,
  subtitle = DEFAULT_CONTENT.subtitle,
  titlePrefix = DEFAULT_CONTENT.titlePrefix,
  titleAccent = DEFAULT_CONTENT.titleAccent,
  description = DEFAULT_CONTENT.description,
  descriptionEmphasis = DEFAULT_CONTENT.descriptionEmphasis,
  countriesDescription = DEFAULT_CONTENT.countriesDescription,
  descriptionSuffix = DEFAULT_CONTENT.descriptionSuffix,
  ctaLabel = DEFAULT_CONTENT.ctaLabel,
  ctaAriaLabel = DEFAULT_CONTENT.ctaAriaLabel,
}: MBBSAbroadHeroProps) {

  const sectionRef  = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted]       = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Trigger entrance animations when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMounted(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes mbbsFadeUp {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes mbbsCardUp {
          0%   { opacity: 0; transform: translateY(52px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0)   scale(1); }
        }

        .mbbs-subtitle { opacity: 0; }
        .mbbs-subtitle.in { animation: mbbsFadeUp 0.7s 0.05s forwards cubic-bezier(0.22,1,0.36,1); }

        .mbbs-title { opacity: 0; }
        .mbbs-title.in { animation: mbbsFadeUp 0.8s 0.18s forwards cubic-bezier(0.22,1,0.36,1); }

        .mbbs-desc { opacity: 0; }
        .mbbs-desc.in { animation: mbbsFadeUp 0.8s 0.3s forwards cubic-bezier(0.22,1,0.36,1); }

        .mbbs-btn { opacity: 0; }
        .mbbs-btn.in { animation: mbbsFadeUp 0.7s 0.44s forwards cubic-bezier(0.22,1,0.36,1); }

        .mbbs-register-btn {
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .mbbs-register-btn:hover {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }
        .mbbs-register-btn:active { transform: scale(0.97); }
        .mbbs-register-btn:hover .mbbs-btn-arrow {
          transform: scaleY(-1) translateX(5px);
        }
        .mbbs-btn-arrow {
          transform: scaleY(-1);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          display: inline-flex;
          align-items: center;
        }

        .mbbs-card-divider {
          position: absolute;
          top: 0; left: 15%; right: 15%;
          height: 2px;
          background: linear-gradient(to right, #0E8F5B, #0B3B2E);
          border-radius: 999px;
          opacity: 0;
          transform: scaleX(0);
          transition: opacity 0.3s ease, transform 0.35s ease;
          transform-origin: center;
        }
        .mbbs-card:hover .mbbs-card-divider {
          opacity: 1;
          transform: scaleX(1);
        }
        .mbbs-card-label {
          transition: color 0.3s ease;
          color: #072A21;
        }
        .mbbs-card:hover .mbbs-card-label {
          color: #0c2461;
        }
      `}</style>

      {/* ── Outer section wrapper ─────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{
          // Blue band height: 618px at 1920 = 32.19cqw
          // Cards overflow below, total visible ~42.71cqw
          paddingBottom: "clamp(200px, 21cqw, 400px)",
          backgroundColor: "#fff",
        }}
      >

        {/* ── Blue background band ─────────────────────────────────────────────── */}
        <div
          className="absolute top-0 left-0 w-full overflow-hidden"
          style={{ height: "clamp(340px, 32.19cqw, 618px)" }}
          aria-hidden
        >
          {/* Base navy */}
          <div className="absolute inset-0" style={{ backgroundColor: "#0B3B2E" }} />

          {/* City skyline texture at 10% opacity */}
          <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.1 }}>
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: "center top" }}
              priority={false}
            />
          </div>

          {/* White gradient fade at the bottom — blends into white page bg */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #ffffff 0%, rgba(7,42,33,0) 55%)",
            }}
          />
        </div>

        {/* ── Top content: subtitle, title, description, button ────────────────── */}
        <div
          className="relative z-10 flex flex-col items-center gap-[clamp(20px,2.5cqw,48px)] px-[clamp(24px,2.5cqw,48px)]"
          style={{ paddingTop: "clamp(32px, 2.5cqw, 48px)" }}
        >
          {/* Subtitle */}
          <p
            className={`mbbs-subtitle${mounted ? " in" : ""} uppercase font-normal text-[#E8D7B0] text-center`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(13px, 1.25cqw, 24px)",
              letterSpacing: "0.05em",
            }}
          >
            {subtitle}
          </p>

          {/* Main title */}
          <div className={`mbbs-title${mounted ? " in" : ""} text-center`}>
            <h2
              className="font-bold text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 3.33cqw, 64px)",
                lineHeight: 1.15,
              }}
            >
              {titlePrefix}{" "}
              <span style={{ color: "#0E8F5B" }}>{titleAccent}</span>
            </h2>
          </div>

          {/* Description */}
          <p
            className={`mbbs-desc${mounted ? " in" : ""} text-center font-normal`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(12px, 0.83cqw, 16px)",
              lineHeight: "26px",
              color: "#E8D7B0",
              maxWidth: "clamp(300px, 66.36cqw, 1274px)",
            }}
          >
            {description}{" "}
            <strong
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#E8D7B0" }}
            >
              {descriptionEmphasis}{" "}
            </strong>
            like{" "}
            <strong style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#E8D7B0" }}>
              {countriesDescription}
            </strong>
            {descriptionSuffix}
          </p>

          {/* Register Now button */}
          <div className={`mbbs-btn${mounted ? " in" : ""}`}>
            <Button
              variant="unstyled"
              className="mbbs-register-btn flex items-center justify-center gap-[0.63cqw]
              bg-white shadow-none"
              style={{
                height: "clamp(44px, 3.33cqw, 64px)",
                padding: "0 clamp(20px, 1.67cqw, 32px)",
              }}
              aria-label={ctaAriaLabel}
            >
              <span
                className="uppercase font-normal"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(13px, 1.11cqw, 21px)",
                  color: "#0B3B2E",
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {ctaLabel}
              </span>
              {/* Arrow — scaleY(-1) per Figma */}
              <span className="mbbs-btn-arrow" aria-hidden>
                <svg
                  viewBox="0 0 24 25"
                  fill="none"
                  style={{ width: "clamp(16px, 1.25cqw, 24px)", height: "clamp(17px, 1.3cqw, 25px)" }}
                >
                  <path
                    d="M21.2578 12.9688L14.2969 19.9062L12.8672 18.5L17.4141 13.9531H4.00781V11.9609H17.4141L12.8672 7.41406L14.2969 6.00781L21.2578 12.9688Z"
                    fill="#0B3B2E"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </div>

        {/* ── Country cards row ─────────────────────────────────────────────────── */}
        {/* 
            Figma: cards start at top=440px (22.92cqw), centered horizontally.
            Cards: w=338px (17.6cqw), h=364px (18.96cqw), image-area=277px (14.43cqw)
            gap=24px (1.25cqw), rounded-3xl 
            shadow: 0px 56px 120px 0px rgba(0,0,0,0.15)
        */}
        <div
          className="relative z-10 flex items-end justify-start w-full overflow-x-auto @min-[1024px]:justify-center"
          style={{
            marginTop: "clamp(32px, 2.29cqw, 44px)",
            gap: "clamp(10px, 1.25cqw, 24px)",
            paddingLeft:  "clamp(12px, 2.5cqw, 48px)",
            paddingRight: "clamp(12px, 2.5cqw, 48px)",
          }}
        >
          {countries.map((country, idx) => (
            <div key={country.name}>
             <Link href={`/universities/${country.name.toLowerCase().replace(/\s+/g, "-")}`}
              >

                <div
                  key={country.name}
                  className="mbbs-card shrink-0 relative overflow-hidden"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  
                  style={{
                    width:  "clamp(140px, 17.6cqw, 338px)",
                    height: "clamp(155px, 18.96cqw, 364px)",
                    backgroundColor: "#EFE9DE",
                    borderRadius: "clamp(12px, 1.25cqw, 24px)",
                    boxShadow:
                      hoveredCard === idx
                        ? "0px 32px 80px rgba(216,178,110,0.22), 0px 56px 120px rgba(0,0,0,0.15)"
                        : "0px 56px 120px rgba(0,0,0,0.15)",
                    transform: hoveredCard === idx
                      ? "translateY(-10px) scale(1.025)"
                      : "translateY(0) scale(1)",
                    transition:
                      "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
                    // Entrance animation
                    opacity: mounted ? 1 : 0,
                    transitionDelay: `${0.55 + idx * 0.08}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  {/* Country photo — top 277/364 = 76.1% of card height */}
                  <div
                    className="absolute top-0 left-0 w-full overflow-hidden"
                    style={{ height: "76.1%" }}
                  >
            <Image
                      src={country.image}
                      alt={country.name}
                      fill
                      className="object-cover object-center"
                      style={{
                        transform: hoveredCard === idx ? "scale(1.06)" : "scale(1)",
                        transition: "transform 0.5s ease",
                      }}
                      sizes="(max-width:768px) 50vw, 18vw"
                    />
                    {/* Subtle blue tint on hover */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to bottom, transparent 60%, rgba(216,178,110,0.12) 100%)",
                        opacity: hoveredCard === idx ? 1 : 0,
                        transition: "opacity 0.4s ease",
                      }}
                    />
                  </div>

                  {/* Label area — bottom 23.9% of card */}
                  <div
                    className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center"
                    style={{ height: "23.9%", backgroundColor: "#EFE9DE" }}
                  >
                    {/* Gradient divider line — appears on hover */}
                    <div className="mbbs-card-divider" />

                    <span
                      className="mbbs-card-label font-medium text-center"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(12px, 1.25cqw, 24px)",
                        lineHeight: 1,
                      }}
                    >
                      {country.name}
                    </span>
                  </div>
                </div>
            </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
