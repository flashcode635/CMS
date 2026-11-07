"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CurveCardProps {
  src: string;
  name: string;
  animationDelay?: number;
}


// ── Location pin icon ─────────────────────────────────────────────────────────
export function PinIcon() {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M8 0C3.589 0 0 3.589 0 8c0 6.053 7.25 11.695 7.555 11.938a.75.75 0 0 0 .89 0C8.75 19.695 16 14.053 16 8c0-4.411-3.589-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
        fill="#12211C"
      />
    </svg>
  );
}


// ── City card ─────────────────────────────────────────────────────────────────
export default function CurveCard({ src, name, animationDelay = 0 }: CurveCardProps) {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

return (
  <div
    ref={ref}
    className={[
      "city-card",
      "relative w-full h-38",
      "transition-[opacity,transform] duration-550 ease-[ease]",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7",
    ].join(" ")}
    style={{ transitionDelay: `${animationDelay}ms` }}
  >
      <div className="card-img-wrap absolute top-0 left-0 w-full h-33.75 rounded-2xl overflow-hidden transition-transform duration-400 ease-[ease]">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 320px"
          unoptimized
        />
      </div>

      <div className="city-pill absolute left-1/2 -translate-x-1/2 rounded-2xl top-29.5 w-[82%] h-8.5 px-2.5 bg-[#E4DDD0] rounded-25 flex items-center gap-2 overflow-hidden transition-[background,box-shadow] duration-300 ease-[ease]">
        <div className="size-5 flex items-center justify-center shrink-0">
          <PinIcon />
        </div>
        <span
          className="text-[#12211C] text-sm font-light leading-5 whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {name}
        </span>
      </div>

      <style>{`
        .city-card:hover .card-img-wrap {
          transform: scale(1.03);
        }
        .city-card:hover .city-pill {
          background: #D6CCBA;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
        }
      `}</style>
    </div>
  );
}