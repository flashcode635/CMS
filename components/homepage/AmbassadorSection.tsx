"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function AmbassadorSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {       if (entry.isIntersecting) observer.disconnect(); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-surface-alt px-[3.33vw] py-[3.33vw] flex justify-center">
      <div className="inline-flex justify-start items-center gap-[2.5vw] max-w-[83.33vw] w-full">

        {/* ── LEFT: Text block ── */}
        <div className="w-[38.54vw] shrink-0 flex flex-col justify-start items-start gap-[1.25vw]">
          <h1 className="self-stretch leading-[1.4]">
            <span className="text-brand-forest text-[2.5vw] font-bold font-['Inter']">Big Moment </span>
            <span className="text-brand-royal text-[2.5vw] font-bold font-['Inter']">Indian Ambassador</span>
            <span className="text-brand-forest text-[2.5vw] font-bold font-['Inter']"> at </span>
            <span className="text-brand-royal text-[2.5vw] font-bold font-['Inter']">SamSMU</span>
          </h1>

          <div className="w-[31.88vw] flex flex-col justify-start items-start gap-[0.63vw]">
            <p className="self-stretch leading-[1.46vw] text-[0.94vw] font-light font-['Inter']">
              <span className="text-brand-royal text-[1.56vw] font-light font-['Inter']">S</span>
              <span className="text-brand-royal font-['Inter']">amara State Medical University</span>
              <span className="text-muted font-['Inter']"> witnessed a proud and memorable moment with the gracious presence of the Indian Ambassador, marking a significant milestone in strengthening India-Russia educational and cultural relations.</span>
            </p>
            <p className="self-stretch text-muted text-[0.94vw] font-light font-['Inter'] leading-[1.46vw]">
              students had the opportunity to engage directly in an open, insightful, and motivating discussion. The session focused on student welfare, academic excellence, cultural integration, and future medical opportunities for Indian students studying in Russia.
            </p>
          </div>
        </div>

        {/* ── RIGHT: event highlight placeholder ── */}
        <div
          className="w-[42.24vw] h-[23.96vw] shrink-0 relative rounded-[1.67vw] overflow-hidden"
          style={{ boxShadow: "21px 21px 0px 0px var(--color-brand-forest)" }}
        >
          <Image
            src="/home/party-video1.jpg"
            alt="Indian Ambassador visit at Samara State Medical University"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-brand-forest-deep/45 px-8 text-center">
            <div className="relative flex flex-col items-center gap-4">
              <p className="text-2xl font-semibold text-white">Big Moment at SamSMU</p>
              <Image src="/home/party-yt-wordmark.svg" alt="Video platform" width={120} height={27} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
