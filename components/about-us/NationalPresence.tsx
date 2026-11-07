"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CurveCard from "@/components/ui/curveCard";

// ── Country data ─────────────────────────────────────────────────────────────────
const Country = [
  { name: "Russia", src: "/about-us/bengaluru.webp" },
  { name: "Canada", src: "/about-us/chennai.webp" },
  { name: "Australia", src: "/about-us/gujarat.webp" },
  { name: "Germany", src: "/about-us/gujarat.webp" },
  { name: "Japan", src: "/about-us/nagpur.webp" },
  { name: "France", src: "/about-us/indore.webp" }
];
  
// ── City data ─────────────────────────────────────────────────────────────────
const CITIES = [
  { name: "Bangalore", src: "/about-us/bengaluru.webp" },
  { name: "Chennai", src: "/about-us/chennai.webp" },
  { name: "Ahmedabad", src: "/about-us/gujarat.webp" },
  { name: "Surat", src: "/about-us/gujarat.webp" },
  { name: "Nagpur", src: "/about-us/nagpur.webp" },
  { name: "Indore", src: "/about-us/indore.webp" },
  { name: "Mysore", src: "/about-us/chennai.webp" },
  { name: "Mumbai", src: "/about-us/mumbai.webp" },
  { name: "Bareily", src: "/about-us/bareily.webp" },
  { name: "Bhubaneshwar", src: "/about-us/bhubaneshwar.webp" },
  { name: "Varanasi", src: "/about-us/varanasi.webp" },
  { name: "Latur", src: "/about-us/latur.webp" },
  { name: "Gorakhpur", src: "/about-us/gorakhpur.webp" },
  { name: "Ranchi", src: "/about-us/ranchi.webp" },
  { name: "Sri Nagar", src: "/about-us/srinagar.webp" },
  { name: "Nashik", src: "/about-us/nashik.webp" },
  { name: "Tripura", src: "/about-us/tripura.webp" },
  { name: "Patna", src: "/about-us/patna.webp" },
  { name: "Kolhapur", src: "/about-us/kolhapur.webp" },
  { name: "Kota", src: "/about-us/kota.webp" },
  { name: "Gorakhpur", src: "/about-us/gorakhpur.webp" },
  { name: "Kannur", src: "/about-us/kannur.webp" },
  { name: "Hyderabad", src: "/about-us/hyderabad.webp" },
  { name: "Kolkata", src: "/about-us/kolkata.webp" },
];

// ── Animated header ───────────────────────────────────────────────────────────
function AnimatedHeader() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "flex flex-col items-center gap-4",
        "transition-[opacity,transform] duration-600ms ease-[ease]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
      ].join(" ")}
    >
      <h2
        className="text-brand-emerald-deep text-[46px] font-bold leading-[1.2] text-center m-0 max-sm:text-4xl "
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Our National Presence
      </h2>
      <p
        className="text-body text-base font-normal leading-6 text-center max-w-234.5 m-0 max-sm:text-sm"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Uncover more additional about us and how we help make your dreams a reality.
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function NationalPresence() {
  return (
   <section className="w-full max-w-420.25 mx-auto flex flex-col gap-18 px-7.5 py-8 box-border max-sm:gap-12 max-sm:px-4">
      {/* ── Header ── */}
      <AnimatedHeader />

      {/* ── Proper CSS Grid: 5 columns ── */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-4.5 gap-y-12">
        {CITIES.map((city, idx) => {
          // Calculate the original staggered animation delay using purely math
          const rowIdx = Math.floor(idx / 5);
          const colIdx = idx % 5;

          return (
            <div key={`${city.name}-${idx}`} className="w-full">
              <CurveCard
                src={city.src}
                name={city.name}
                animationDelay={rowIdx * 80 + colIdx * 60}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}