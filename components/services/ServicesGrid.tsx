"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// ── Keyframe styles ───────────────────────────────────────────────────────────
const ANIMATION_STYLES = `
  /* Bottom-left radial sweep */
  
  

  /* Card entrance */
  

  /* Text entrance */
  

  /* Image subtle zoom on hover */
  
  



  .card-sweep-bg     { animation: sp-sweep-in  0.95s cubic-bezier(0.16,1,0.3,1) forwards; }
  .card-sweep-bg-out { animation: sp-sweep-out 0.75s cubic-bezier(0.4,0,0.6,1) forwards; }
  .card-enter        { animation: sp-slide-up  0.85s cubic-bezier(0.22,1,0.36,1) both; }
  .text-enter        { animation: sp-fade-up  0.65s cubic-bezier(0.22,1,0.36,1) both; }

  .img-zoom-in  { animation: sp-zoom-in  0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
  .img-zoom-out { animation: sp-zoom-out 0.5s cubic-bezier(0.55,0,0.45,1) forwards; }

  .shine-pass { animation: shinePass 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }

  /* Grid layout */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.67vw;
    width: 100%;
    align-items: stretch;
  }
  @media (max-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5vw;
    }
  }
  @media (max-width: 640px) {
    .services-grid {
      grid-template-columns: 1fr;
      gap: 5vw;
    }
  }

  /* Mobile: tap-to-reveal card (no hover on touch) */
  @media (max-width: 640px) {
    .service-card {
      border-radius: 20px;
    }
    .service-card-image {
      border-radius: 16px;
    }
  }
`;

// ── Service card data ─────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    title: "Personal Guidance & Counseling",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    body: [
      "Finding a university abroad that matches your budget and needs can be challenging. As a result, many students are unsure about which country to choose or which university to enroll in.",
      "To assist with this process, we have a team of skilled and trained consultants who will help you identify your needs and objectives. They will provide you with personalized advice regarding admissions and career opportunities.",
    ],
  },
  {
    id: 2,
    title: "Selection of University",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    body: [
      "My Study Hub consultants are highly experienced and knowledgeable professionals dedicated to helping students find the right university for their studies abroad, tailored to their individual needs and preferences.",
      "They provide a curated selection of options from over 50+ top medical universities across more than 20 countries, assisting you on your path to becoming a successful doctor.",
    ],
  },
  {
    id: 3,
    title: "100% Admission Assistance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    body: [
      "Finding a university abroad that matches your budget and needs can be challenging. As a result, many students are unsure about which country to choose or which university to enroll in.",
      "To assist with this process, we have a team of skilled and trained consultants who will help you identify your needs and objectives. They will provide you with personalized advice regarding admissions and career opportunities.",
    ],
  },
  {
    id: 4,
    title: "Pre-Departure Pilotage",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    body: [
      "Finding a university abroad that matches your budget and needs can be challenging. As a result, many students are unsure about which country to choose or which university to enroll in.",
      "To assist with this process, we have a team of skilled and trained consultants who will help you identify your needs and objectives. They will provide you with personalized advice regarding admissions and career opportunities.",
    ],
  },
  {
    id: 5,
    title: "FMGE/NEXT Coaching",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    body: [
      "My Study Hub consultants are highly experienced and knowledgeable professionals dedicated to helping students find the right university for their studies abroad, tailored to their individual needs and preferences.",
      "They provide a curated selection of options from over 50+ top medical universities across more than 20 countries, assisting you on your path to becoming a successful doctor.",
    ],
  },
  {
    id: 6,
    title: "Continuous Student Support",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    body: [
      "Finding a university abroad that matches your budget and needs can be challenging. As a result, many students are unsure about which country to choose or which university to enroll in.",
      "To assist with this process, we have a team of skilled and trained consultants who will help you identify your needs and objectives. They will provide you with personalized advice regarding admissions and career opportunities.",
    ],
  },
  {
    id: 7,
    title: "On-Arrival Benefits.",
    image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80",
    body: [
      "Finding a university abroad that matches your budget and needs can be challenging. As a result, many students are unsure about which country to choose or which university to enroll in.",
      "To assist with this process, we have a team of skilled and trained consultants who will help you identify your needs and objectives. They will provide you with personalized advice regarding admissions and career opportunities.",
    ],
  },
  {
    id: 8,
    title: "Indian Food & Lifestyle Support.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    body: [
      "My Study Hub consultants are highly experienced and knowledgeable professionals dedicated to helping students find the right university for their studies abroad, tailored to their individual needs and preferences.",
      "They provide a curated selection of options from over 50+ top medical universities across more than 20 countries, assisting you on your path to becoming a successful doctor.",
    ],
  },
  {
    id: 9,
    title: "Accommodation Guidance",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    body: [
      "Finding a university abroad that matches your budget and needs can be challenging. As a result, many students are unsure about which country to choose or which university to enroll in.",
      "To assist with this process, we have a team of skilled and trained consultants who will help you identify your needs and objectives. They will provide you with personalized advice regarding admissions and career opportunities.",
    ],
  },
];

interface ServiceItem {
  id: number;
  title: string;
  image: string;
  body: string[];
}

interface ServiceCardProps {
  service: ServiceItem;
  isVisible: boolean;
  cardDelay: number;
}

// ── Single service card ───────────────────────────────────────────────────────
function ServiceCard({ service, isVisible, cardDelay }: ServiceCardProps) {
  const { title, image, body } = service;

  // 3-state: idle → in → out  (prevents flash on first render)
  const [sweepState, setSweepState] = useState("idle");
  // Separate shine trigger so it fires once per hover-enter
  const [shining, setShining] = useState(false);
  const isHovered = sweepState === "in";

  const handleMouseEnter = () => {
    setSweepState("in");
    setShining(false);
    // Slight delay so shine starts as sweep reaches midway
    requestAnimationFrame(() => {
      setTimeout(() => setShining(true), 180);
    });
  };
  const handleMouseLeave = () => {
    setSweepState("out");
    setShining(false);
  };

  // Multi-layer shadow: lift + coloured glow + deep ambient
  const hoverShadow = `
    0px 2px  8px  0px  color-mix(in srgb, black 6%, transparent),
    0px 8px  24px -4px color-mix(in srgb, var(--color-brand-champagne) 18%, transparent),
    0px 24px 56px -8px color-mix(in srgb, var(--color-brand-forest) 22%, transparent),
    0px 40px 80px -12px color-mix(in srgb, var(--color-brand-champagne) 28%, transparent)
  `;
  const idleShadow = `0px 16px 40px -8px color-mix(in srgb, black 16%, transparent)`;

  return (
    <div
      className={[
        "service-card",
        isVisible ? "card-enter" : "opacity-0",
        "relative flex flex-col rounded-2xl overflow-hidden",
        "border border-brand-sky",
        "cursor-pointer w-full bg-white",
        // Lift on hover
        "transition-transform duration-500 ease-out",
        isHovered ? "-translate-y-2" : "translate-y-0",
      ].join(" ")}
      style={{
        minHeight: "clamp(380px, 32vw, 560px)",
        padding: "clamp(16px, 1.25vw, 24px)",
        gap: "clamp(6px, 0.49vw, 9px)",
        animationDelay: isVisible ? `${cardDelay}ms` : undefined,
        boxShadow: isHovered ? hoverShadow : idleShadow,
        transition: "transform 0.5s ease, box-shadow 0.65s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Gradient sweep layer ── */}
      {sweepState !== "idle" && (
        <div
          className={[
            "absolute inset-0 rounded-2xl pointer-events-none z-0",
            sweepState === "in" ? "card-sweep-bg" : "card-sweep-bg-out",
          ].join(" ")}
          style={{
            backgroundImage: "linear-gradient(102.49deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)",
          }}
        />
      )}

      {/* ── Shine streak layer ── */}
      {shining && (
        <div
          className="shine-pass absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl"
          style={{ background: "transparent" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "45%",
              height: "100%",
              background:
                "linear-gradient(105deg, transparent 20%, color-mix(in srgb, white 18%, transparent) 50%, transparent 80%)",
              transform: "translateX(-120%) skewX(-20deg)",
              animation: "shinePass 0.75s cubic-bezier(0.22,1,0.36,1) forwards",
            }}
          />
        </div>
      )}

      {/* ── Photo ── */}
      <div
        className="service-card-image relative w-full rounded-2xl overflow-hidden shrink-0 z-10"
        style={{ height: "clamp(150px, 13vw, 230px)" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className={[
            "object-cover object-center",
            // img zoom tied to sweep state
            sweepState === "in"  ? "img-zoom-in"  : "",
            sweepState === "out" ? "img-zoom-out" : "",
          ].join(" ")}
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* ── Title ── */}
      <h3
        className={[
          "font-bold leading-snug relative z-10 min-h-[2em] flex items-center",
          "transition-colors duration-300",
          isHovered ? "text-white" : "text-ink",
          isVisible ? "text-enter" : "opacity-0",
        ].join(" ")}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: "clamp(16px, 1.25vw, 22px)",
          animationDelay: isVisible ? `${cardDelay + 120}ms` : undefined,
        }}
      >
        {title}
      </h3>

      {/* ── Body paragraphs ── */}
      <div className="flex flex-col relative z-10 flex-1 justify-start" style={{ gap: "clamp(6px, 0.5vw, 10px)" }}>
        {body.map((para: string, i: number) => (
          <p
            key={i}
            className={[
              "leading-[1.55] font-normal",
              "transition-colors duration-300",
              isHovered ? "text-white/85" : "text-ink/75",
              isVisible ? "text-enter" : "opacity-0",
            ].join(" ")}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "clamp(12px, 0.8vw, 14.5px)",
              animationDelay: isVisible ? `${cardDelay + 200 + i * 80}ms` : undefined,
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ServicesGrid() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(Array(SERVICES.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          SERVICES.forEach((_, i) => {
            setTimeout(() => {
              setCardsVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 140);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{ANIMATION_STYLES}</style>

      <section
        ref={sectionRef}
        className={[
          "w-full transition-all duration-1000 ease-out",
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        ].join(" ")}
        style={{
          padding: "clamp(20px, 2.5vw, 46px) clamp(16px, 8.33vw, 160px)",
        }}
      >
        <div className="max-w-261 mx-auto flex flex-col items-center" style={{ gap: "clamp(32px, 4vw, 64px)" }}>

          {/* ── Grid ── */}
          <div className="services-grid">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                isVisible={cardsVisible[i]}
                cardDelay={i * 140}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}