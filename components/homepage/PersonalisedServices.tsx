"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── Service card data — exact order from Figma (row-by-row, 3 cols) ────────
const services = [
  // Row 1
  { id: 1, title: "One-to-One Career Counselling",    icon: "/home/service-onetoone.png"    },
  { id: 2, title: "University Selection Assistance.", icon: "/home/service-university.png"  },
  { id: 3, title: "Admission Guidance.",              icon: "/home/service-admission.png"   },
  // Row 2
  { id: 4, title: "Visa & Documentation Support.",    icon: "/home/service-visa.png"        },
  { id: 5, title: "Travel & Pre-Departure Assistance.", icon: "/home/service-travel.png"   },
  { id: 6, title: "Continuous Student Support",       icon: "/home/service-student.png"    },
  // Row 3
  { id: 7, title: "On-Arrival Benefits.",             icon: "/home/service-arrival.png"    },
  { id: 8, title: "Indian Food & Lifestyle Support.", icon: "/home/service-food.png"       },
  { id: 9, title: "Accommodation Guidance",           icon: "/home/service-accommodation.png" },
];

// ── Single card ────────────────────────────────────────────────────────────
function ServiceCard({ title, icon, visible, index }: { title: string; icon: string; visible: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center gap-[14px] overflow-hidden group cursor-pointer select-none rounded-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "clamp(14px, 1.25vw, 22px)",
        backgroundColor: "#ffffff",
        border: `1.5px solid ${hovered ? "#0E8F5B" : "#EDF3EF"}`,
        boxShadow: hovered
          ? "0 12px 28px -6px rgba(14, 143, 91, 0.18), 0 4px 12px rgba(0, 0, 0, 0.04)"
          : "0 2px 10px rgba(0, 0, 0, 0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${0.04 + index * 0.04}s`,
      }}
    >
      {/* Soft Green Top-Right Gradient Glow on hover */}
      <div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at top right, rgba(14, 143, 91, 0.12) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Elegant Bottom Accent Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2.5px] transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(90deg, #0E8F5B 0%, #0E8F5B 50%, #0B3B2E 100%)"
            : "transparent",
        }}
      />

      {/* Icon box - light greenish white container */}
      <div
        className="relative shrink-0 rounded-xl flex items-center justify-center p-2 transition-all duration-300"
        style={{
          width: "clamp(44px, 3.4vw, 60px)",
          height: "clamp(44px, 3.4vw, 60px)",
          backgroundColor: hovered ? "#EDF3EF" : "#F1F6F2",
          border: `1px solid ${hovered ? "#C9E6D6" : "#EDF3EF"}`,
          boxShadow: hovered ? "0 4px 12px rgba(14, 143, 91, 0.12)" : "none",
        }}
      >
        <Image
          src={icon}
          alt={title}
          fill
          className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
          sizes="64px"
        />
      </div>

      {/* Title */}
      <p
        className="font-medium text-[#0B3B2E] group-hover:text-brand-green transition-colors"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(13px, 0.88vw, 16px)",
          lineHeight: "clamp(20px, 1.45vw, 26px)",
          margin: 0,
        }}
      >
        {title}
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PersonalisedServices() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes psFadeUp {
          0%   { opacity: 0; transform: translateY(22px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .ps-title { opacity: 0; }
        .ps-title.in { animation: psFadeUp 0.8s 0.05s forwards cubic-bezier(0.22,1,0.36,1); }
        .ps-sub   { opacity: 0; }
        .ps-sub.in   { animation: psFadeUp 0.7s 0.18s forwards cubic-bezier(0.22,1,0.36,1); }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#F1F6F2] text-[#0B3B2E]"
        style={{
          padding: "clamp(48px, 5.2vw, 96px) clamp(20px, 4.17vw, 80px)",
        }}
      >
        {/* Soft greenish ambient gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute -top-24 right-0 w-125 h-125 rounded-full blur-3xl opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(167, 243, 208, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
            }}
          />
          <div
            className="absolute -bottom-24 -left-20 w-[450px] h-[450px] rounded-full blur-3xl opacity-35"
            style={{
              background: "radial-gradient(circle, rgba(187, 247, 208, 0.5) 0%, rgba(219, 234, 254, 0) 70%)",
            }}
          />
        </div>

        {/* ── Centered max-width container ── */}
        <div
          className="relative z-10"
          style={{
            maxWidth: "clamp(600px, 71.04vw, 1364px)",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(24px, 2.5vw, 48px)",
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(6px, 0.63vw, 12px)",
            }}
          >
            {/* Tagline / Subtitle small */}
            <p
              className="text-brand-green font-semibold tracking-[0.85px] uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(12px, 0.83vw, 14px)",
                margin: 0,
              }}
            >
              Tailored Guidance
            </p>

            {/* Title */}
            <h2
              className={`ps-title${visible ? " in" : ""} font-bold text-center bg-linear-to-r from-brand-green via-[#0E8F5B] to-[#0B3B2E] bg-clip-text text-transparent`}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 3.33vw, 52px)",
                lineHeight: "clamp(34px, 3.6vw, 60px)",
                margin: 0,
              }}
            >
              Our Personalised Services
            </h2>

            {/* Subtitle */}
            <p
              className={`ps-sub${visible ? " in" : ""} text-center font-normal text-[#4A554F]`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 0.94vw, 17px)",
                lineHeight: "26px",
                margin: 0,
              }}
            >
              Services tailored to perfectly fit your needs.
            </p>
          </div>

          {/* ── 3×3 service grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(12px, 1.4vw, 24px)",
              width: "100%",
            }}
          >
            {services.map((s, i) => (
              <ServiceCard
                key={s.id}
                title={s.title}
                icon={s.icon}
                visible={visible}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
