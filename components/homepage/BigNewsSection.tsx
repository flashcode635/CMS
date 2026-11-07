"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// ── Slide data (extendable for carousel) ─────────────────────────────────────
const slides = [
  {
    id: 1,
    image: "/home/amurcontract.webp",
    title: "A Proud Milestone at North Caucasian State Academy",
    body: [
      { text: "A proud and significant moment at ", bold: false },
      { text: "North Caucasian State Medical Academy", bold: true },
      { text: ", marked by an official meeting between the ", bold: false },
      { text: "Director of the Academy", bold: true },
      { text: " and ", bold: false },
      { text: "Dr. Shubham Kumar Saurabh", bold: true },
      { text: ", ", bold: false },
      { text: "Managing Director of My Study Hub", bold: true },
      { text: ", held in the esteemed presence of ", bold: false },
      { text: "Mr. Arnav Pratap Singh, 3rd Secretary, Indian Embassy in Moscow.", bold: true },
    ],
    footer: [
      { text: "Rooted in strong and long-standing ", bold: false },
      { text: "India–Russia relations", bold: true },
      { text: ", this collaboration reflects a shared vision for global education, academic excellence, and student-focused support.", bold: false },
    ],
    card: "My Study Hub and North Caucasian State Academy officially signed an exclusive agreement to create transparent and trusted academic pathways for Indian students pursuing medical education in Russia.",
  },
  {
    id: 2,
    image: "/home/amurcontract.webp",
    title: "My Study Hub Becomes Official Contractor of Amur State Medical Academy",
    body: [
      { text: "A significant achievement for ", bold: false },
      { text: "My Study Hub", bold: true },
      { text: " as it officially becomes the ", bold: false },
      { text: "Official Contractor of Amur State Medical Academy", bold: true },
      { text: ", strengthening its commitment to providing ", bold: false },
      { text: "Indian students", bold: true },
      { text: " with reliable pathways to pursue ", bold: false },
      { text: "MBBS in Russia.", bold: true },
    ],
    footer: [
      { text: "This collaboration offers students ", bold: false },
      { text: "direct admission support", bold: true },
      { text: ", authentic university guidance, and personalized assistance throughout the admission process — ", bold: false },
      { text: "shaping future medical careers", bold: true },
      { text: " with quality education and global opportunities.", bold: false },
    ],
    card: "My Study Hub and Amur State Medical Academy are dedicated to helping aspiring doctors access quality medical education, global opportunities, and a strong foundation for future success.",
  },
  {
    id: 3,
    image: "/home/uralcontract.webp",
    title: "My Study Hub – Official Contractor of Ural State Medical University",
    body: [
      { text: "A proud milestone for ", bold: false },
      { text: "My Study Hub", bold: true },
      { text: " as it officially becomes the ", bold: false },
      { text: "Official Contractor of Ural State Medical University", bold: true },
      { text: ", one of ", bold: false },
      { text: "Russia's leading medical institutions", bold: true },
      { text: ". This partnership strengthens opportunities for Indian students by providing ", bold: false },
      { text: "trusted guidance, direct admission support,", bold: true },
      { text: " and a transparent pathway to pursue MBBS in Russia.", bold: false },
    ],
    footer: [
      { text: "Rooted in strong ", bold: false },
      { text: "India–Russia educational ties", bold: true },
      { text: ", this partnership reflects a shared commitment to ", bold: false },
      { text: "academic excellence, student success,", bold: true },
      { text: " and global medical education.", bold: false },
    ],
    card: "Through this collaboration, students benefit from authentic university information, dedicated admission assistance, and end-to-end support throughout their medical education journey.",
  },
];

export default function BigNewsSection() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<"next" | "prev" | null>(null);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const len = slides.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navigate = (dir: "next" | "prev") => {
    if (animating || len <= 1) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => dir === "next" ? (c + 1) % len : (c - 1 + len) % len);
      setAnimDir(null);
      setAnimating(false);
    }, 420);
  };

  const slide = slides[current];

  return (
    <>
      <style>{`
        @keyframes bnSlideInLeft {
          0%   { opacity: 0; transform: translateX(-48px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes bnSlideInRight {
          0%   { opacity: 0; transform: translateX(48px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes bnFadeSlideNext {
          0%   { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes bnFadeSlidePrev {
          0%   { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(40px); }
        }
        @keyframes bnCardFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }

        .bn-left.visible {
          animation: bnSlideInLeft 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .bn-right.visible {
          animation: bnSlideInRight 0.9s 0.15s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .bn-left, .bn-right { opacity: 0; }

        .bn-content-animating-next { animation: bnFadeSlideNext 0.42s ease forwards; }
        .bn-content-animating-prev { animation: bnFadeSlidePrev 0.42s ease forwards; }

        .bn-card-float { animation: bnCardFloat 5s ease-in-out infinite; }

        .bn-nav-btn {
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .bn-nav-btn:hover { opacity: 0.75; transform: translateX(2px); }
        .bn-nav-btn:first-child:hover { transform: translateX(-2px); }
        .bn-nav-btn:active { transform: scale(0.92); }

        /* Ken Burns on the photo */
        @keyframes bnKenBurns {
          0%   { transform: scale(1)    translateX(0); }
          100% { transform: scale(1.05) translateX(-1%); }
        }
        .bn-photo { animation: bnKenBurns 14s ease-in-out infinite alternate; }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden flex"
        style={{
          // Figma: 940px tall at 1920w = 48.96vw
          height: "clamp(480px, 48.96vw, 940px)",
          background: "linear-gradient(125deg, #0E8F5B 12.7%, #0B3B2E 87.2%)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── LEFT: Photo column (948/1920 = 49.375%) ── */}
        <div
          className={`bn-left${visible ? " visible" : ""} relative shrink-0 overflow-hidden`}
          style={{ width: "49.375%" }}
        >
          <div className="bn-photo absolute inset-0">
            <Image
              src={slide.image}
              alt="North Caucasian State Medical Academy"
              fill
              className="object-cover object-center"
              sizes="50vw"
              priority
            />
          </div>
          {/* Subtle right-edge blend into gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent 70%, rgba(0,80,40,0.18) 100%)" }}
          />
        </div>

        {/* ── RIGHT: Content column (972/1920 = 50.625%) ── */}
        {/*
          Figma absolute positions inside right column (940px tall):
            Top content block : top=24px,  left=32px
            Footer paragraph  : top=726.85px, left=32px
            Prev/Next nav     : top=870px, right-aligned
          We replicate this with percentage-based absolute positioning.
        */}
        <div
          className={`bn-right${visible ? " visible" : ""} relative flex-1`}
          style={{ overflow: "hidden" }}
        >
          {/* ── Top content block: Big News + title + body ── */}
          {/* Figma: top=24px, left=32px (24/940=2.55%, 32/972=3.29%) */}
          <div
            className="absolute"
            style={{
              top: "clamp(16px, 2.55vw, 24px)",
              left: "clamp(18px, 1.67vw, 32px)",
              right: "clamp(18px, 1.67vw, 32px)",
            }}
          >
            <div
              className={
                animating && animDir === "next" ? "bn-content-animating-next" :
                  animating && animDir === "prev" ? "bn-content-animating-prev" : ""
              }
            >
              {/* "Big News" DM Serif heading */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 3.33vw, 64px)",
                  lineHeight: "clamp(48px, 5vw, 96px)",
                  color: "white",
                  margin: 0,
                }}
              >
                Big News
              </h2>

              {/* Article title + body — gap: 12px */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 0.63vw, 12px)" }}>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(16px, 1.67vw, 32px)",
                    lineHeight: "clamp(24px, 2.5vw, 48px)",
                    color: "white",
                    margin: 0,
                    maxWidth: "clamp(300px, 39.01vw, 749px)",
                  }}
                >
                  {slide.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(12px, 0.94vw, 18px)",
                    lineHeight: "27px",
                    color: "#F1E3C8",
                    margin: 0,
                    maxWidth: "clamp(300px, 39.01vw, 749px)",
                  }}
                >
                  {slide.body.map((seg, i) =>
                    seg.bold
                      ? <strong key={i} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "white" }}>{seg.text}</strong>
                      : <span key={i}>{seg.text}</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* ── Footer paragraph — absolutely positioned below the white card ── */}
          {/* Figma: top=726.85px out of 940px = 77.32% of section height */}
          <div
            className="absolute"
            style={{
              top: "77.32%",
              left: "clamp(18px, 1.67vw, 32px)",
              right: "clamp(18px, 1.67vw, 32px)",
              maxWidth: "clamp(300px, 39.01vw, 749px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s",
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(12px, 0.94vw, 18px)",
                lineHeight: "27px",
                color: "#F1E3C8",
                margin: 0,
              }}
            >
              {slide.footer.map((seg, i) =>
                seg.bold
                  ? <strong key={i} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "white" }}>{seg.text}</strong>
                  : <span key={i}>{seg.text}</span>
              )}
            </p>
          </div>

          {/* ── Prev / Next navigation — Figma: top=870px = 92.55% of section ── */}
          <div
            className="absolute flex items-center"
            style={{
              top: "92.55%",
              right: "clamp(18px, 1.67vw, 32px)",
              gap: "clamp(16px, 1.25vw, 24px)",
              transform: "translateY(-50%)",
            }}
          >
            {/* Previous */}
<Button variant="unstyled" size="bare" shape="none" onClick={() => navigate("prev")} aria-label="Previous"
  className="bn-nav-btn gap-[0.63vw] border-b border-brand-sky px-[clamp(12px,1.25vw,24px)] py-[clamp(8px,0.83vw,16px)]">
              {/* Chevron left — rotated chevron-right */}
              <svg width="9" height="15" viewBox="0 0 8.236 14.775" fill="none" style={{ transform: "rotate(180deg)" }}>
                <path d="M0.424 0.424L7.387 7.387L0.424 14.351" stroke="#F1E3C8" strokeWidth="1.2" />
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(11px, 0.83vw, 16px)",
                  color: "#F1E3C8",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Previous
              </span>
            </Button>

            {/* Next */}
<Button variant="unstyled" size="bare" shape="none" onClick={() => navigate("next")} aria-label="Next"
  className="bn-nav-btn gap-[0.63vw] border-b border-white px-[clamp(12px,1.25vw,24px)] py-[clamp(8px,0.83vw,16px)]">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(11px, 0.83vw, 16px)",
                  color: "white",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                NEXT
              </span>
              {/* Chevron right */}
              <svg width="9" height="15" viewBox="0 0 8.236 14.775" fill="none">
                <path d="M0.424 0.424L7.387 7.387L0.424 14.351" stroke="white" strokeWidth="1.2" />
              </svg>
            </Button>
          </div>
        </div>  {/* end right column */}

        {/* ── WHITE FLOATING CARD — straddles both columns ── */}
        {/* Figma: left=786px (40.94%), top=373.4px, w=760px (39.58%), h=309px */}
        <div
          className="bn-card-float absolute bg-white overflow-hidden"
          style={{
            left: "clamp(200px, 40.94%, 786px)",
            top: "clamp(160px, 19.45vw, 373px)",
            width: "clamp(260px, 39.58vw, 760px)",
            height: "clamp(120px, 16.09vw, 309px)",
            borderRadius: "clamp(12px, 1.25vw, 24px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 32px 80px rgba(29,78,216,0.12)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
            transition: "opacity 0.9s ease 0.5s, transform 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.5s",
            zIndex: 20,
          }}
        >
          {/* Opening quote mark — top-left, partially outside card (Figma: top=-89px) */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "clamp(6px, 0.54vw, 10px)",
              top: "clamp(-36px, -4.65vw, -89px)",
              width: "clamp(46px, 5.86vw, 112px)",
              height: "clamp(32px, 4.01vw, 77px)",
              opacity: 0.18,
            }}
            aria-hidden
          >
            <Image
              src="/home/bignews-quote-open.svg"
              alt=""
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>

          {/* Closing quote mark — bottom-right, partially outside (Figma: rotate-180) */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "clamp(-14px, -0.73vw, -14px)",
              bottom: "clamp(-24px, -1.25vw, -24px)",
              width: "clamp(46px, 5.86vw, 112px)",
              height: "clamp(32px, 4.01vw, 77px)",
              transform: "rotate(180deg)",
              opacity: 0.18,
            }}
            aria-hidden
          >
            <Image
              src="/home/bignews-quote-close.svg"
              alt=""
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>

          {/* Card text — centred vertically */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ padding: "clamp(16px,2.08vw,40px) clamp(20px,2.92vw,56px)" }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(11px, 0.94vw, 18px)",
                lineHeight: "clamp(18px, 1.41vw, 27px)",
                color: "#66716A",
                textAlign: "justify",
                margin: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "clamp(13px, 1.25vw, 24px)",
                  lineHeight: "clamp(22px, 1.88vw, 36px)",
                  color: "#072A21",
                }}
              >
                Exclusive Bilateral Partnership:
              </span>{" "}
              {slide.card}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
