"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

// ── Feature cards data ──────────────────────────────────────────────────────
const features = [
  {
    title: "Top ranked partner Universities",
    description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
    iconSrc: "/home/about-check-blue.svg",
    iconBg: "var(--color-surface-alt)",
  },
  {
    title: "Top ranked partner Universities",
    description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
    iconSrc: "/home/about-check-green.svg",
    iconBg: "var(--color-surface-alt)",
  },
  {
    title: "Top ranked partner Universities",
    description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
    iconSrc: "/home/about-check-orange.svg",
    iconBg: "var(--color-brand-champagne-soft-bg)",
  },
];

interface FeatureCardProps {
  title: string;
  description: string;
  iconSrc: string;
  iconBg: string;
  visible: boolean;
  delay: string;
}

// ── Feature card row ─────────────────────────────────────────────────────────
function FeatureCard({ title, description, iconSrc, iconBg, visible, delay }: FeatureCardProps) {
  return (
    <div
      className="flex items-center gap-4 overflow-hidden px-4 py-3 rounded-3 border border-line w-full"
      style={{
        height: 80,
        backgroundColor: "color-mix(in srgb, var(--color-brand-sky) 20%, transparent)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.6s ease ${delay}, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}`,
      }}
    >
      {/* Icon box */}
      <div
        className="relative shrink-0 rounded-2 flex items-center justify-center"
        style={{ width: 48, height: 48, backgroundColor: iconBg }}
      >
        <div style={{ width: 24.5, height: 24.5 }}>
          <Image src={iconSrc} alt="" width={25} height={25} className="w-full h-full" />
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col gap-2">
        <p
          className="font-semibold text-ink leading-none"
          style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
        >
          {title}
        </p>
        <p
          className="text-muted capitalize"
          style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        
        

        .about-badge {
          opacity: 0;
        }
        .about-badge.visible {
          animation: sp-fade-up 0.7s 0.05s forwards cubic-bezier(0.22,1,0.36,1);
        }
        .about-title {
          opacity: 0;
        }
        .about-title.visible {
          animation: sp-fade-up 0.8s 0.18s forwards cubic-bezier(0.22,1,0.36,1);
        }
        .about-body {
          opacity: 0;
        }
        .about-body.visible {
          animation: sp-fade-up 0.8s 0.3s forwards cubic-bezier(0.22,1,0.36,1);
        }
        .about-btn {
          opacity: 0;
        }
        .about-btn.visible {
          animation: sp-fade-up 0.7s 0.72s forwards cubic-bezier(0.22,1,0.36,1);
        }
        .about-image {
          opacity: 0;
        }
        .about-image.visible {
          animation: sp-slide-right 1.0s 0.2s forwards cubic-bezier(0.22,1,0.36,1);
        }

        .about-read-btn {
          border: 1.5px solid color-mix(in srgb, var(--color-brand-forest) 55%, transparent);
          box-shadow: 0 0 0 1px color-mix(in srgb, white 35%, transparent) inset;
          transition: opacity 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease,
            border-color 0.25s ease;
        }
        .about-read-btn:hover {
          opacity: 0.88;
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--color-brand-forest) 85%, transparent);
          box-shadow:
            0 0 0 1px color-mix(in srgb, white 45%, transparent) inset,
            0 8px 28px color-mix(in srgb, var(--color-brand-forest) 35%, transparent);
        }
        .about-read-btn:active {
          transform: scale(0.97);
        }
        .about-read-btn:hover .about-btn-arrow {
          transform: scaleY(-1) translateX(5px);
        }
        .about-btn-arrow {
          transform: scaleY(-1) translateX(0);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          display: inline-flex;
          align-items: center;
        }
      `}</style>

      {/* Outer section with the light bg matching project */}
      <section
        className="w-full px-[1.25vw] py-[1.25vw]"
        style={{ backgroundColor: "var(--color-surface-alt)" }}
        ref={sectionRef}
      >
        {/* White card with drop shadow — exact Figma spec */}
        <div
          className="w-full bg-white rounded-4xl flex items-stretch justify-between overflow-hidden"
          style={{
            maxWidth: "88.54vw",
            margin: "0 auto",
            boxShadow: "0px 16px 40px -8px color-mix(in srgb, black 16%, transparent)",
            minHeight: "clamp(500px, 42.66vw, 819px)",
          }}
        >
          {/* ── LEFT: Content column ── */}
          <div
            className="flex flex-col justify-between gap-[3.33vw] p-[2.08vw] lg:p-[1.67vw]"
            style={{ width: "clamp(300px, 34.27vw, 658px)", flexShrink: 0 }}
          >
            {/* Top block: badge + title + body + cards */}
            <div className="flex flex-col gap-[1.25vw]">

              {/* Badge */}
              <div
                className={`about-badge${visible ? " visible" : ""} inline-flex items-center gap-[0.56vw] px-[0.83vw] py-[0.31vw] rounded-full w-fit`}
                style={{ backgroundColor: "color-mix(in srgb, var(--color-brand-champagne) 10%, transparent)", height: 38 }}
              >
                <div style={{ width: 16, height: 16, flexShrink: 0 }}>
                  <Image
                    src="/home/about-book-icon.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="w-full h-full"
                  />
                </div>
                <span
                  className="uppercase tracking-wider font-normal"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: "clamp(9px, 0.63vw, 12px)",
                    color: "var(--color-brand-champagne-deep)",
                    letterSpacing: "0.08em",
                    whiteSpace: "nowrap",
                  }}
                >
                  Study MBBS Abroad
                </span>
              </div>

              {/* Title */}
              <div className={`about-title${visible ? " visible" : ""}`}>
                <h2
                  className="font-bold leading-none bg-clip-text text-transparent"
                  style={{
                    fontFamily: 'var(--font-sub)',
                    fontSize: "clamp(28px, 3.33vw, 64px)",
                    lineHeight: 1.0,
                    backgroundImage: "linear-gradient(149deg, var(--color-brand-forest) 12.7%, var(--color-brand-forest-deep) 87.2%)",
                  }}
                >
                  About My Study Hub
                </h2>
              </div>

              {/* Body text + feature cards */}
              <div className="flex flex-col gap-[2.5vw]">

                {/* Description */}
                <div className={`about-body${visible ? " visible" : ""}`}>
                  <p
                    className="font-light"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: "clamp(13px, 0.94vw, 18px)",
                      lineHeight: "27px",
                      color: "var(--color-muted)",
                    }}
                  >
                    For over a decade, we have been a trusted name in MBBS abroad guidance,
                    helping thousands of aspiring students turn their dream of becoming doctors
                    into reality. With expert counselling, transparent guidance, and strong
                    partnerships with leading medical universities, we ensure every student
                    receives the right support at every step. Our commitment is to make your
                    MBBS abroad journey smooth, reliable, and successful from admission to
                    arrival.
                  </p>
                </div>

                {/* Feature cards */}
                <div className="flex flex-col gap-[0.83vw]">
                  {features.map((f, i) => (
                    <FeatureCard
                      key={i}
                      {...f}
                      visible={visible}
                      delay={`${0.38 + i * 0.1}s`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Read More button */}
            <div className={`about-btn${visible ? " visible" : ""}`}>
              <Button
                variant="brand"
                size="bare"
                shape="pill"
                className="about-read-btn h-[clamp(40px,2.92vw,56px)] gap-[0.63vw] px-[clamp(18px,1.67vw,32px)] text-[clamp(13px,1.11vw,21px)] font-normal tracking-[-0.02em]"
              >
                Read more
                <span className="about-btn-arrow" aria-hidden>
                  <svg
                    width="clamp(16px, 1.25vw, 24px)"
                    height="clamp(17px, 1.3vw, 25px)"
                    viewBox="0 0 24 25"
                    fill="none"
                    style={{ width: "clamp(16px, 1.25vw, 24px)", height: "clamp(17px, 1.3vw, 25px)" }}
                  >
                    <path
                      d="M20.625 12.5117L13.6641 19.4492L12.2344 18.043L16.7812 13.4961H3.375V11.5039H16.7812L12.2344 6.95703L13.6641 5.55078L20.625 12.5117Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </Button>
            </div>
          </div>

          {/* ── RIGHT: Image column ── */}
          <div
            className={`about-image${visible ? " visible" : ""} relative flex-1 overflow-hidden`}
            style={{
              borderRadius: "0 24px 24px 0",
              minHeight: "clamp(400px, 42.66vw, 819px)",
            }}
          >
            <Image
              src="/home/about-graduation.png"
              alt="Graduates celebrating their medical degrees abroad"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 60vw, 45vw"
              priority={false}
            />

            {/* Top-right floating card — "Elite Colleges" */}
            <div
              className="absolute"
              style={{ top: 20, right: 20 }}
            >
              <div
                className="bg-white flex items-center gap-2.5 overflow-hidden 
                px-2.5 py-3 rounded-3"
                style={{
                  width: 188,
                  height: 64,
                  boxShadow: "0px 8px 24px color-mix(in srgb, black 14%, transparent)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(-16px) scale(0.95)",
                  transition: "opacity 0.7s ease 0.65s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.65s",
                }}
              >
                <div
                  className="relative shrink-0 rounded-lg flex items-center justify-center"
                  style={{ width: 48, height: 48, backgroundColor: "var(--color-surface-alt)" }}
                >
                  <Image
                    src="/home/about-check-blue.svg"
                    alt=""
                    width={25}
                    height={25}
                    style={{ width: 24.5, height: 24.5 }}
                  />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <p
                    className="font-semibold text-ink leading-none"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                  >
                    Elite Colleges
                  </p>
                  <p
                    className="text-muted truncate"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, maxWidth: 114 }}
                  >
                    Lorem Ipsum D...
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom-left floating card — "Elite Colleges" */}
            <div
              className="absolute"
              style={{ bottom: 20, left: 20 }}
            >
              <div
                className="bg-white flex items-center gap-2.5 overflow-hidden 
                px-2.5 py-3 rounded-3"
                style={{
                  width: 188,
                  height: 64,
                  boxShadow: "0px 8px 24px color-mix(in srgb, black 14%, transparent)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
                  transition: "opacity 0.7s ease 0.8s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.8s",
                }}
              >
                <div
                  className="relative shrink-0 rounded-lg flex items-center justify-center"
                  style={{ width: 48, height: 48, backgroundColor: "var(--color-surface-alt)" }}
                >
                  <Image
                    src="/home/about-check-blue.svg"
                    alt=""
                    width={25}
                    height={25}
                    style={{ width: 24.5, height: 24.5 }}
                  />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <p
                    className="font-semibold text-ink leading-none"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                  >
                    Elite Colleges
                  </p>
                  <p
                    className="text-muted truncate"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, maxWidth: 114 }}
                  >
                    Lorem Ipsum D...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
