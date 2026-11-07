"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbassadorSection() {
  const [autoplay, setAutoplay] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAutoplay(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const src = autoplay
    ? "https://www.youtube.com/embed/65sJUo-Blqg?rel=0&modestbranding=1&autoplay=1&mute=1"
    : "https://www.youtube.com/embed/65sJUo-Blqg?rel=0&modestbranding=1";

  return (
    <section ref={sectionRef} className="w-full bg-[#e8f2f4] px-[3.33vw] py-[3.33vw] flex justify-center">
      <div className="inline-flex justify-start items-center gap-[2.5vw] max-w-[83.33vw] w-full">

        {/* ── LEFT: Text block ── */}
        <div className="w-[38.54vw] shrink-0 flex flex-col justify-start items-start gap-[1.25vw]">
          <h1 className="self-stretch leading-[1.4]">
            <span className="text-[#0d1b2e] text-[2.5vw] font-bold font-['Poppins']">Big Moment </span>
            <span className="text-[#1a56db] text-[2.5vw] font-bold font-['Poppins']">Indian Ambassador</span>
            <span className="text-[#0d1b2e] text-[2.5vw] font-bold font-['Poppins']"> at </span>
            <span className="text-[#15803d] text-[2.5vw] font-bold font-['Poppins']">SamSMU</span>
          </h1>

          <div className="w-[31.88vw] flex flex-col justify-start items-start gap-[0.63vw]">
            <p className="self-stretch leading-[1.46vw] text-[0.94vw] font-light font-['Lexend']">
              <span className="text-[#1a56db] text-[1.56vw] font-light font-['Inter']">S</span>
              <span className="text-[#1a56db] font-['Lexend']">amara State Medical University</span>
              <span className="text-gray-500 font-['Lexend']"> witnessed a proud and memorable moment with the gracious presence of the Indian Ambassador, marking a significant milestone in strengthening India-Russia educational and cultural relations.</span>
            </p>
            <p className="self-stretch text-gray-500 text-[0.94vw] font-light font-['Lexend'] leading-[1.46vw]">
              students had the opportunity to engage directly in an open, insightful, and motivating discussion. The session focused on student welfare, academic excellence, cultural integration, and future medical opportunities for Indian students studying in Russia.
            </p>
          </div>
        </div>

        {/* ── RIGHT: YouTube iframe ── */}
        <div
          className="w-[42.24vw] h-[23.96vw] shrink-0 relative rounded-[1.67vw] overflow-hidden"
          style={{ boxShadow: "21px 21px 0px 0px rgba(2,135,59,1)" }}
        >
          <iframe
            src={src}
            title="Big Moment: Indian Ambassador at SamSMU"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
