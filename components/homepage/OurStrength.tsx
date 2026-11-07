"use client";

import { useEffect, useState, useRef } from "react";
import { GraduationCap, Building2, Globe, Award, MapPin, Users, BookOpen, Stethoscope, LucideIcon } from "lucide-react";

export interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

const ROW_ONE: StatItem[] = [
  { icon: GraduationCap, value: 4000, suffix: "+", label: "Students Placed" },
  { icon: Building2, value: 50, suffix: "+", label: "Partner Universities" },
  { icon: Globe, value: 15, suffix: "+", label: "Countries" },
  { icon: Award, value: 2000, suffix: "+", label: "Successful Graduates" },
];

const ROW_TWO: StatItem[] = [
  { icon: MapPin, value: 45, suffix: "+", label: "Branches Across India" },
  { icon: Users, value: 150, suffix: "+", label: "Team Members in India" },
  { icon: BookOpen, value: 50, suffix: "+", label: "Universities Affiliated With" },
  { icon: Stethoscope, value: 2000, suffix: "+", label: "Doctors We Have Helped" },
];

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number, duration = 1800, start = false): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!start) { setCount(0); return; }
    let startTime: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(easeOutExpo(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return count;
}

function GhostCard() {
  return (
 <div
  className="shrink-0 rounded-2xl"
  style={{
  width: "clamp(120px, 13.5vw, 240px)",
  height: "clamp(120px, 13.5vw, 240px)",
  background: "rgba(0, 0, 0, 0.01)",
  boxShadow: "rgba(0, 0, 0, 0.36) 16px 0px 32px -8px inset",
  border: "1px solid rgba(0, 0, 0, 0.043)"
}}
/>
  );
}

export interface StatCardProps {
  item: StatItem;
  iconSize: string;
  numSize: string;
  labelSize: string;
  playing: boolean;
  cardSize?: string;
}

function StatCard({ item, iconSize, numSize, labelSize, playing }: StatCardProps) {
  const count = useCountUp(item.value, 1800, playing);
  const Icon = item.icon;
  const gradId = `grad-${item.label.replace(/\s+/g, "")}`;
  const cardSize = "clamp(120px, 13.5vw, 240px)";

  return (
    <div
      className="shrink-0 relative bg-white rounded-2xl cursor-default select-none"
      style={{
        width: cardSize,
        height: cardSize,
        boxShadow: "12px 16px 22px rgba(0,0,0,0.06)",
        outline: "1.5px solid rgba(29,78,216,0.16)",
        outlineOffset: "-1.5px",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 22px 44px rgba(14,143,91,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "12px 16px 22px rgba(0,0,0,0.06)";
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A6B44" />
            <stop offset="100%" stopColor="#0B3B2E" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ gap: "clamp(10px, 1.2vw, 18px)", padding: "0 10%" }}
      >
        <Icon
          style={{
            width: iconSize,
            height: iconSize,
            stroke: `url(#${gradId})`,
            flexShrink: 0,
          }}
          strokeWidth={1.7}
        />
        <div className="flex flex-col items-center w-full">
          <span
            className="text-ink font-bold text-center leading-none tabular-nums"
            style={{ fontSize: numSize, fontFamily: "'Inter', sans-serif" }}
          >
            {count.toLocaleString()}{item.suffix}
          </span>
          <span
            className="text-muted font-normal text-center leading-snug"
            style={{ fontSize: labelSize, fontFamily: "'Inter', sans-serif", marginTop: "4px" }}
          >
            {item.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export interface StatRowProps {
  items: StatItem[];
  ghostsBefore: number;
  ghostsAfter: number;
  offsetLeft: string;
  playing: boolean;
}

function StatRow({ items, ghostsBefore, ghostsAfter, offsetLeft, playing }: StatRowProps) {
  const iconSize = "clamp(22px, 2vw, 34px)";
  const numSize = "clamp(20px, 2.2vw, 40px)";
  const labelSize = "clamp(9px, 0.78vw, 13px)";
  const gap = "clamp(10px, 1.2vw, 20px)";

  return (
    <div
      className="flex items-center overflow-visible relative"
      style={{ marginLeft: offsetLeft, gap }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-full z-10"
        style={{
          width: "clamp(40px, 6vw, 100px)",
          background: "linear-gradient(to right, #EFE9DE, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full z-10"
        style={{
          width: "clamp(40px, 6vw, 100px)",
          background: "linear-gradient(to left, #EFE9DE, transparent)",
        }}
      />

      {Array.from({ length: ghostsBefore }).map((_, i) => (
        <GhostCard key={`gb-${i}`} />
      ))}

      {items.map((item) => (
        <StatCard
          key={item.label}
          item={item}
          iconSize={iconSize}
          numSize={numSize}
          labelSize={labelSize}
          playing={playing}
        />
      ))}

      {Array.from({ length: ghostsAfter }).map((_, i) => (
        <GhostCard key={`ga-${i}`} />
      ))}
    </div>
  );
}

export default function OurStrength() {
  const [playing, setPlaying] = useState<boolean>(false);
  const played = useRef<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-19"
      style={{ backgroundColor: "#EFE9DE" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 rounded-full"
        style={{
          width: 320, height: 320,
          background: "radial-gradient(circle, rgba(216,178,110,0.15), transparent 70%)",
        }}
      />

      <div className="flex flex-col items-center gap-2 px-4 text-center" style={{ marginBottom: "40px" }}>
        <h2
          className="font-bold leading-tight bg-linear-to-r from-brand-green to-brand-blue bg-clip-text text-transparent"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 3.2vw, 56px)",
            lineHeight: "1.15",
          }}
        >
          Our Strength in Numbers
        </h2>
        <p
          className="text-muted text-base font-normal leading-6 text-center"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Building trust through experience, expertise, and results
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <StatRow items={ROW_ONE} ghostsBefore={2} ghostsAfter={1} offsetLeft="clamp(-160px, -9vw, -20px)" playing={playing} />
      </div>

      <StatRow items={ROW_TWO} ghostsBefore={1} ghostsAfter={2} offsetLeft="clamp(-40px, -2vw, 0px)" playing={playing} />
    </section>
  );
}
