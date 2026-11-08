"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import UnivCard from "./univCard"
// ── Data — colors ab Tailwind classes ke roop me ──────────────────────────
const universities = [
  // Row 0
  {
    id: 1,
    name: "Samara State Medical University",
    logo: "/home/partner/logo-samara.png",
    logoSize: 157,
    cardBg: "bg-line-strong",
    labelBg: "bg-brand-royal",
  },
  {
    id: 2,
    name: "Novosibirsk State University",
    logo: "/home/partner/logo-novosibirsk.png",
    logoSize: 157,
    cardBg: "bg-surface-alt",
    labelBg: "bg-brand-royal",
  },
  {
    id: 3,
    name: "Kabardino-Balkarian State University",
    logo: "/home/partner/logo-kbsu.png",
    logoSize: 117,
    cardBg: "bg-surface-alt",
    labelBg: "bg-brand-royal",
  },
  // Row 1
  {
    id: 4,
    name: "Ural State Medical University",
    logo: "/home/partner/logo-ural.png",
    logoSize: 133,
    cardBg: "bg-orange-100",
    labelBg: "bg-amber-800",
  },
  {
    id: 5,
    name: "East European University",
    logo: "/home/partner/logo-eeu.png",
    logoSize: 161,
    cardBg: "bg-red-100",
    labelBg: "bg-red-700",
  },
  {
    id: 6,
    name: "International Black Sea University",
    logo: "/home/partner/logo-ibsu.png",
    logoSize: 163,
    cardBg: "bg-surface-alt",
    labelBg: "bg-brand-royal",
  },
];

export interface UnivCardProps {
  univ: (typeof universities)[number];
  visible: boolean;
  index: number;
}

const PECK_GAP = 5; // px, keep within 4-6
const PECK_RADII = [9, 5, 9]; // px

type Pt = [number, number];

const unit = (from: Pt, to: Pt): Pt => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
};

function roundedPolygon(pts: Pt[], radii: number[]) {
  const n = pts.length;
  let d = "";
  pts.forEach((cur, i) => {
    const prev = pts[(i + n - 1) % n];
    const next = pts[(i + 1) % n];
    const t = Math.min(
      radii[i],
      Math.hypot(prev[0] - cur[0], prev[1] - cur[1]) / 2,
      Math.hypot(next[0] - cur[0], next[1] - cur[1]) / 2
    );
    const [ux, uy] = unit(cur, prev);
    const [vx, vy] = unit(cur, next);
    const p1: Pt = [cur[0] + ux * t, cur[1] + uy * t];
    const p2: Pt = [cur[0] + vx * t, cur[1] + vy * t];
    d += `${i === 0 ? "M" : "L"} ${p1[0]} ${p1[1]} Q ${cur[0]} ${cur[1]} ${p2[0]} ${p2[1]} `;
  });
  return d + "Z";
}

function peckPath(w: number, h: number) {
  const len = Math.hypot(w, h);
  const A: Pt = [(PECK_GAP * len) / h, 0];
  const B: Pt = [w, 0];
  const C: Pt = [w, h - (PECK_GAP * len) / w];
  return roundedPolygon([A, B, C], PECK_RADII);
}

export function Peck ({
  color,
  show,
  width,
  height,
}: {
  color: string;
  show: boolean;
  width: string;
  height: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setBox({ w: e.contentRect.width, h: e.contentRect.height })
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute top-0 right-0 z-20
        transition-opacity duration-300 ease-in-out
        ${show ? "opacity-100" : "opacity-0"}`}
      style={{ width, height }}
    >
      {box && (
        <svg
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w} ${box.h}`}
          className="block overflow-visible"
        >
          <path d={peckPath(box.w, box.h)} fill={color} />
        </svg>
      )}
    </div>
  );
}

const cardGap = "gap-[clamp(10px,1.45vw,26px)]";

// ── Main component ────────────────────────────────────────────────────────
export default function GloballyRecognizedUniversities() {
  const sectionRef = useRef<HTMLElement | null>(null);
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

  const row0 = universities.slice(0, 3);
  const row1 = universities.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-[clamp(20px,4.17vw,80px)] py-[clamp(32px,3.13vw,60px)]"
    >
      <div className="mx-auto max-w-[1640px]">
        {/* ── Header ── */}
        <div className="mb-[clamp(24px,2.5vw,48px)] flex flex-col gap-[clamp(12px,1.25vw,24px)]">
          {/* Title */}
          <h2
            className={`m-0 font-bold font-sub text-[clamp(28px,3.33vw,64px)] leading-[1.1]
              bg-linear-173 from-brand-green from-13% to-brand-blue to-87%
              bg-clip-text text-transparent transition-all duration-700 ease-out
              ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "0.05s" }}
          >
            Globally Recognized Universities
          </h2>

          {/* Description */}
          <p
            className={`m-0 max-w-[clamp(300px,52.87vw,1015px)] font-normal font-['Inter',sans-serif]
              text-[clamp(13px,1.04vw,20px)] leading-6
               text-muted
              transition-all duration-700 ease-out
              ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "0.15s" }}
          >
            Turn your dream of <span className="text-brand-royal">Study MBBS Abroad</span> into
            reality with top&#8209;ranked, globally recognized universities abroad. Study Palace
            Hub ensures you get the best guidance for a brighter medical journey.
          </p>

          {/* WHO & NMC line */}
          <p
            className={`m-0 font-normal font-heading
              text-[clamp(14px,1.25vw,24px)] leading-9 text-black
              transition-all duration-700 ease-out
              ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "0.25s" }}
          >
            WHO &amp; NMC&#8209;approved Universities for a future&#8209;ready medical career
          </p>
        </div>

        {/* ── Layout: campus photo + 3×2 cards ── */}
        <div
          className={`flex flex-col gap-[clamp(12px,1.46vw,24px)] transition-all duration-700 ease-out md:flex-row md:items-stretch
            ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ transitionDelay: "0.1s" }}
        >
          {/* Left: campus photo */}
          <div className="relative aspect-808/774 w-full overflow-hidden rounded-[clamp(12px,1.25vw,24px)] md:flex-[0_0_49.3%]">
            <Image
              src="/home/univ-campus.jpg"
              alt="Globally recognized university campus"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 90vw, 49vw"
            />
          </div>

          {/* Right: 3-col × 2-row cards */}
          <div className={`flex w-full flex-col ${cardGap}  md:flex-[0_0_49.3%]`}>
            <div className={`flex flex-1 ${cardGap} `}>
              {row0.map((univ, i) => (
                <UnivCard key={univ.id} univ={univ} visible={visible} index={i} />
              ))}
            </div>
            <div className={`flex flex-1 ${cardGap} `}>
              {row1.map((univ, i) => (
                <UnivCard key={univ.id} univ={univ} visible={visible} index={i + 3} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
