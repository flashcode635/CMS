
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function EnrollNowSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

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
        @keyframes enrollFadeUp {
          0%   { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes enrollFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes enrollSlideUp {
          0%   { opacity: 0; transform: translateY(48px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes arrowSlide {
          0%   { transform: translateX(-5px) scaleY(-1); opacity: 0; }
          100% { transform: translateX(0)    scaleY(-1); opacity: 1; }
        }

        .enroll-subtitle {
          opacity: 0;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }
        .enroll-subtitle.visible {
          animation: enrollFadeUp 0.8s 0.1s forwards cubic-bezier(0.22, 1, 0.36, 1);
        }

        .enroll-title {
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .enroll-title.visible {
          animation: enrollFadeUp 0.9s 0.25s forwards cubic-bezier(0.22, 1, 0.36, 1);
        }

        .enroll-btn {
          opacity: 0;
        }
        .enroll-btn.visible {
          animation: enrollFadeUp 0.8s 0.42s forwards cubic-bezier(0.22, 1, 0.36, 1);
        }

        .enroll-image {
          opacity: 0;
        }
        .enroll-image.visible {
          animation: enrollSlideUp 1.1s 0.55s forwards cubic-bezier(0.22, 1, 0.36, 1);
        }

        .enroll-btn-inner {
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .enroll-btn-inner:hover {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.25);
          transform: translateY(-2px);
        }
        .enroll-btn-inner:active {
          transform: scale(0.97) translateY(0);
        }

        .enroll-arrow {
          display: inline-flex;
          align-items: center;
          transform: scaleY(-1);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .enroll-btn-inner:hover .enroll-arrow {
          transform: scaleY(-1) translateX(5px);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B3B2E"}}
        aria-label="Enroll Now Section"
      >
        {/* ── Background city skyline pattern ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <Image
            src="/home/enroll-bg-pattern.png"
            alt=""
            fill
            className="object-cover w-full"
            style={{ opacity: 0.05, objectPosition: "center top" }}
            priority={false}
            sizes="100vw"
          />
        </div>

        {/* ── Top content block ── */}
        <div className="relative z-10 flex flex-col items-center gap-[3vw] px-[2.5vw] pt-[3vw] pb-[3vw]">

          {/* Subtitle */}
          <div className={`enroll-subtitle${visible ? " visible" : ""}`}>
            <p
              className="text-center uppercase tracking-[0.16em] font-semibold"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(11px, 1.11vw, 18px)",
                color: "#F1E3C8",
                letterSpacing: "3.41px",
              }}
            >
              My Study Hub
            </p>
          </div>

          {/* Main heading */}
          <div
            className={`enroll-title${visible ? " visible" : ""} flex items-center justify-center w-full`}
          >
            <h2
              className="text-white text-center"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 3.33vw, 64px)",
                lineHeight: 1.2,
                maxWidth: "clamp(320px, 55.67vw, 1070px)",
              }}
            >
              Enroll Now!..{" "}
              <span style={{ fontStyle: "italic" }}>to study MBBS in Abroad</span>{" "}
              Next Year 2026&#x2011;27!..
            </h2>
          </div>

          {/* CTA Button */}
          <div className={`enroll-btn${visible ? " visible" : ""}`}>
            <Link
              href="/contact-us"
              className="enroll-btn-inner flex items-center justify-center gap-[0.63vw] bg-white"
              style={{
                height: "clamp(42px, 3.33vw, 64px)",
                padding: "0 clamp(20px, 1.67vw, 32px)",
                textDecoration: "none",
              }}
              aria-label="Enroll now"
            >
              <span
                className="uppercase tracking-tight font-normal"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(12px, 1.11vw, 21px)",
                  color: "#0B3B2E",
                  letterSpacing: "-0.02em",
                }}
              >
                Enroll now
              </span>

              {/* Arrow icon — scaleY(-1) flipped as per Figma */}
              <span className="enroll-arrow" aria-hidden>
                <svg
                  width="clamp(16px, 1.25vw, 24px)"
                  height="clamp(17px, 1.3vw, 25px)"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "clamp(16px, 1.25vw, 24px)", height: "clamp(17px, 1.3vw, 25px)" }}
                >
                  <path
                    d="M21.2578 12.9688L14.2969 19.9062L12.8672 18.5L17.4141 13.9531H4.00781V11.9609H17.4141L12.8672 7.41406L14.2969 6.00781L21.2578 12.9688Z"
                    fill="#0B3B2E"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* ── Classroom image ── */}
        <div
          className={`enroll-image${visible ? " visible" : ""} relative w-full`}
          style={{ height: "clamp(200px, 24.17vw, 464px)" }}
        >
          <Image
            src="/contact-us/chairs.jpg"
            alt="Lecture hall with rows of chairs for MBBS students"
            fill
            className="object-cover object-center p-7"
            sizes="100vw"
          />
        </div>
      </section>
    </>
  );
}
