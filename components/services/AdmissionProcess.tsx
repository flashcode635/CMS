"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    number: 1,
    title: "Research & Apply",
    description:
      "Choose WHO/MCI-recognized universities, check eligibility (50% in PCB), gather documents, apply online, and receive the admission letter.",
    side: "left",
  },
  {
    number: 2,
    title: "Visa & Travel",
    description:
      "Apply for a student visa with an admission letter, pay tuition fees, book flights, and complete university registration upon arrival.",
    side: "right",
  },
  {
    number: 3,
    title: "Start MBBS Program",
    description:
      "Begin the 6-year course (including internship), learn basic Russian (optional), and participate in clinical practice for hands-on experience.",
    side: "left",
  },
  {
    number: 4,
    title: "Post-Admission Steps",
    description:
      "Prepare for licensing exams (FMGE/USMLE), stay updated on deadlines, and maintain academic performance for a successful medical career.",
    side: "right",
  },
];

export default function AdmissionProcess() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pathLength, setPathLength] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.85;
      const total = rect.height + start;
      const scrolled = start - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));
      setFillProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dashOffset =
    pathLength > 0 ? pathLength * (1 - fillProgress) : pathLength;

  // SVG viewBox: 0 0 700 1060
  // The path threads through each card:
  //   - Odd steps (left): circle center at x=108, card spans x=80..580
  //   - Even steps (right): circle center at x=592, card spans x=120..620
  // Step vertical centers: 180, 380, 580, 780
  // Path:
  //   Start: top center dot (350, 20)
  //   Curve down-left to step1 circle (108, 180)
  //   Curve down-right to step2 circle (592, 380)
  //   Curve down-left to step3 circle (108, 580)
  //   Curve down-right to step4 circle (592, 780)
  //   Curve down-center to arrow (350, 1020)

  const PATH =
    "M 350 20 " +
    "C 350 80, 108 80, 108 140 " +
    "L 108 220 " +
    "C 108 300, 592 300, 592 340 " +
    "L 592 420 " +
    "C 592 500, 108 500, 108 540 " +
    "L 108 620 " +
    "C 108 700, 592 700, 592 740 " +
    "L 592 820 " +
    "C 592 900, 350 900, 350 960 " +
    "L 350 1000";

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-surface via-white to-surface-alt py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-brand-emerald-deep leading-tight mb-3 tracking-tight">
            Admission Process
          </h1>
          <p className="text-muted text-lg font-light">
            A Step-by-Step Guide to How Nominations Are Made
          </p>
        </div>

        {/* Main container with SVG + Cards */}
        <div ref={containerRef} className="relative" style={{ height: "1100px" }}>
          {/* SVG path layer */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 700 1060"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-brand-royal)" />
                <stop offset="100%" stopColor="var(--color-brand-royal)" />
              </linearGradient>
              <marker
                id="arrowGhost"
                markerWidth="10"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-brand-champagne-soft)" />
              </marker>
              <marker
                id="arrowFilled"
                markerWidth="10"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-brand-royal)" />
              </marker>
            </defs>

            {/* Ghost base path */}
            <path
              d={PATH}
              fill="none"
              stroke="var(--color-brand-champagne-soft)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd="url(#arrowGhost)"
            />

            {/* Animated gradient fill path */}
            <path
              ref={pathRef}
              d={PATH}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={pathLength || 9999}
              strokeDashoffset={dashOffset}
              markerEnd={fillProgress > 0.97 ? "url(#arrowFilled)" : undefined}
            />

            {/* Top dot */}
            <circle
              cx="350"
              cy="20"
              r="5"
              fill={fillProgress > 0.01 ? "var(--color-brand-royal)" : "var(--color-brand-champagne-soft)"}
            />
          </svg>

          {/* Step Cards */}
          {steps.map((step, i) => {
            const isLeft = step.side === "left";
            // vertical center of each card in SVG coords
            const svgCenters = [180, 380, 580, 780];
            const svgH = 1060;
            const containerH = 1100;
            const topPx = (svgCenters[i] / svgH) * containerH;

            return (
              <div
                key={step.number}
                className="absolute"
                style={{
                  top: `${topPx}px`,
                  transform: "translateY(-50%)",
                  left: isLeft ? "4%" : "14%",
                  right: isLeft ? "14%" : "4%",
                  width: "82%",
                }}
              >
                {/* Outer rounded border — the card */}
                <div
                  className={`relative flex items-center border-l-2 border-l-indigo-300 rounded-[2.5rem] bg-white/80 backdrop-blur-sm px-5 py-5 ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                  style={{ minHeight: "110px" }}
                >
                  {/* Number circle — sits on the edge of the card border */}
                  <div
                    className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-black/18 z-10"
                    style={{
                      background: "linear-gradient(135deg, var(--color-brand-royal) 0%, var(--color-brand-royal) 100%)",
                      marginLeft: isLeft ? "-2.5rem" : "1rem",
                      marginRight: isLeft ? "1rem" : "-2.5rem",
                    }}
                  >
                    <span className="text-white text-3xl font-extrabold leading-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Text content */}
                  <div
                    className={`flex-1 ${
                      isLeft ? "text-left pl-2" : "text-right pr-2"
                    }`}
                  >
                    <h3 className="text-lg font-bold text-brand-forest mb-1 font-['Inter']">
                      {step.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed font-['Inter']">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Register Now */}
        <div className="flex justify-center -mt-4">
          <Button variant="brand" className="px-16 py-4 rounded-full text-white text-xl font-normal shadow-lg hover:opacity-90 active:scale-95 transition-all"
            style={{ background: "linear-gradient(135deg, var(--color-brand-royal) 0%, var(--color-brand-royal) 100%)" }}
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
}