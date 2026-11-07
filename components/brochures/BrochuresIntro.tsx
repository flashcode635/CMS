"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const imgDoctor =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80";
const imgLaptop =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80";
const imgMicroscope =
  "https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80";

export default function BrochuresIntro() {
  const sectionRef = useRef(null);
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
    <section
      ref={sectionRef}
      className="w-full px-5 md:px-10 lg:px-14 xl:px-20 py-10 md:py-12 lg:py-14"
      style={{ backgroundColor: "#e8f2f4" }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 xl:gap-16 justify-between w-full">

        {/* ── LEFT: Text ────────────────────────────────────────────────── */}
        <div
          className="flex flex-col gap-4 w-full md:max-w-155 lg:flex-1 lg:min-w-0 lg:max-w-170"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease 0.05s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.05s",
          }}
        >
          <h2
            className="text-[32px] md:text-[42px] lg:text-[46px] font-semibold leading-[1.15] tracking-[-0.9px] capitalize m-0"
            style={{
              fontFamily: "'Poppins', sans-serif",
              backgroundImage: "linear-gradient(164.48deg, #00923f 12.704%, #3163ff 87.17%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            brochures
          </h2>

          <div
            className="flex flex-col gap-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.05vw, 18px)",
              lineHeight: 1.55,
              color: "#606c83",
            }}
          >
            <p className="m-0">
              Explore all official brochures, prospectuses, and admission guides
              by Study Palace Hub below and get complete information about
              studying MBBS abroad. From top medical universities and affordable
              fee structures to hostel facilities, admission procedures,
              eligibility criteria, student life, campus facilities, and
              country-wise MBBS options — everything you need to start your
              medical journey is available here in one place.
            </p>
            <p className="m-0">
              Browse and download all Study Palace Hub brochures to explore the
              best opportunities for your future and take the first step toward
              achieving your dream of becoming a doctor with expert guidance and
              complete support from Study Palace Hub.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Collage ──────────────────────────────────────────────
            Canvas: 503 × 600 (based on screenshot pixel measurements)

            IMAGES (z-order: doctor bottom, laptop middle, microscope top):
              Doctor:      left=8%,  top=3%,   w=57%, h=41%
              Laptop:      left=0%,  top=52%,  w=53%, h=45%
              Microscope:  left=46%, top=30%,  w=52%, h=48%

            DECORATIVE OUTLINES:
              Large square:  right=0%,  top=0%,   w=28%, h=23%  r=24px
              Medium square: right=5%,  top=3.5%, w=18%, h=15%  r=16px
              Small square:  right=9%,  top=11%,  w=9%,  h=7.5% r=10px
              Wide rect:     left=0%,   top=43%,  w=28%, h=10%  r=20px
              Bottom rect:   right=0%,  bottom=0%,w=27%, h=12%  r=20px
        ──────────────────────────────────────────────────────────────── */}
        <div
          className="relative w-full max-w-105 mx-auto lg:mx-0 lg:w-[38%] lg:max-w-110 shrink-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s",
          }}
        >
          {/* Aspect ratio box: 503 × 600 → 119.3% */}
          <div className="relative w-full" style={{ paddingBottom: "119.3%" }}>
            <div className="absolute inset-0">

              {/* ── Decorative outline boxes ────────────────────────────── */}

              {/* Large square — top right */}
              <div
                className="absolute border-2 border-brand-sky rounded-3xl "
                style={{ right: "0%", top: "0%", width: "28%", height: "23%" }}
              />
              {/* Medium square — inset inside large */}
              <div
                className="absolute border-2 border-brand-sky rounded-2xl]"
                style={{ right: "4.5%", top: "3.5%", width: "17.5%", height: "14.5%" }}
              />
              {/* Small square — inset inside medium */}
              <div
                className="absolute border-2 border-brand-sky rounded-[10px]"
                style={{ right: "8.5%", top: "10.5%", width: "8.5%", height: "7%" }}
              />

              {/* Wide horizontal rect — left middle (gap between doctor & laptop) */}
              <div
                className="absolute border-2 border-brand-sky rounded-[20px]"
                style={{ left: "0%", top: "43%", width: "29%", height: "9.5%" }}
              />

              {/* Small rect — bottom right (below microscope) */}
              <div
                className="absolute border-2 border-brand-sky rounded-[20px]"
                style={{ right: "0%", bottom: "0%", width: "27%", height: "11%" }}
              />

              {/* ── Images ──────────────────────────────────────────────── */}

              {/* Doctor — top left (rendered first = visually behind) */}
              <div
                className="absolute overflow-hidden rounded-3xl "
                style={{ left: "8%", top: "3%", width: "57%", height: "41%" }}
              >
                <Image
                  src={imgDoctor}
                  alt="Doctor smiling at desk"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 57vw, 286px"
                />
              </div>

              {/* Laptop — bottom left (middle layer) */}
              <div
                className="absolute overflow-hidden rounded-3xl "
                style={{ left: "0%", top: "52%", width: "53%", height: "45%" }}
              >
                <Image
                  src={imgLaptop}
                  alt="Laptop with stethoscope"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 53vw, 267px"
                />
              </div>

              {/* Microscope — centre-right, overlaps both (top layer) */}
              <div
                className="absolute overflow-hidden rounded-3xl "
                style={{ left: "46%", top: "30%", width: "52%", height: "48%" }}
              >
                <Image
                  src={imgMicroscope}
                  alt="Researcher using microscope"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 52vw, 262px"
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
