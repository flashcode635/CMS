"use client";

/**
 * RecruitmentGrid — Career page section 4
 *
 * Behavior:
 *  - Cards start with light blue tint bg
 *  - On hover: card fades to solid blue, button fades gradient -> white
 *  - Subtle 3D tilt follows the mouse (mouse only, not touch)
 *  - Mobile: first 3 cards visible, rest shown on "View All Recruitment" click
 */

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

// ── Job data ──────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    title: "Accountant",
    body: "As a Financial Analyst at My Study Hub, you will analyze financial data, prepare reports, and provide insights to support our company's financial planning and decision-making.",
    subRole: null,
  },
  {
    id: 2,
    title: "Human Resource",
    body: "As a Recruitment Manager at My Study Hub, you will lead our recruitment efforts, develop and implement recruitment strategies, and ensure we attract and hire top talent to support our mission.",
    subRole: null,
  },
  {
    id: 3,
    title: "Open Marketing Vacancies",
    body: "As a Digital Marketing Specialist at My Study Hub, you will develop and execute digital marketing campaigns, promote our brand, attract students, and drive engagement across online channels.",
    subRole: null,
  },
  {
    id: 4,
    title: "Data Entry",
    body: "As an Admission Counselor at My Study Hub, you will guide prospective students through the admission process, provide information about our programs, and assist them in making informed decisions about their education.",
    subRole: null,
  },
  {
    id: 5,
    title: "Social Media",
    body: "As a Social Media Manager at My Study Hub, you will manage our social media presence, create engaging content, and interact with our online community to build brand awareness and foster meaningful connections.",
    subRole: null,
  },
  {
    id: 6,
    title: "Open Counselor Vacancies",
    body: "At My Study Hub, you will provide assistance and resources to students, address their concerns, and ensure they have a positive and successful learning.",
    subRole: "Receptionist cum Academic Counsellor",
  },
  {
    id: 7,
    title: "Graphic Designer",
    body: "As a Creative Designer at My Study Hub, you will create visually appealing graphics and designs for our marketing materials, website, and other communication channels, ensuring a consistent and engaging brand image.",
    subRole: null,
  },
  {
    id: 8,
    title: "Video Creator",
    body: "As a Content Writer at My Study Hub, you will create informative and engaging content for our website, blog, and marketing materials, showcasing our expertise and attracting prospective students.",
    subRole: null,
  },
  {
    id: 9,
    title: "Video Editor",
    body: "As a Video Editor at My Study Hub, you will edit and produce high-quality videos for our marketing campaigns, social media channels, and website, capturing the essence of our brand and engaging our target audience.",
    subRole: null,
  },
];

const BRAND_GRADIENT = "linear-gradient(136.5deg, #0E8F5B 12.704%, #0B3B2E 87.17%)";

// ── Arrow icon (inherits color from parent via currentColor) ──────────────────
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface JobItem {
  id: number;
  title: string;
  body: string;
  subRole: string | null;
}

function JobCard({ job }: { job: JobItem }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Events live on the stable (non-rotating) wrapper so the hit area never
  // moves under the cursor -> no enter/leave flicker at the edges.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const card = cardRef.current;
    if (!card) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateX(${-py * 10}deg) rotateY(${px * 10}deg)`;
  };

  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div
      className="group perspective-midrange hover:cursor-pointer"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        ref={cardRef}
        className={[
          "flex flex-col justify-between gap-4 p-8 rounded-4xl border border-brand-sky",
          "min-h-80 cursor-pointer transform-3d",
          "transition-[transform,background-color,box-shadow] duration-300 ease-out",
          // default
          "bg-brand-blue/1 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_3px_0_#F1E3C8]",
          // hover
          "group-hover:bg-brand-blue group-hover:shadow-[0_20px_40px_-12px_rgba(0,40,165,0.5),0_4px_0_#072A21]",
        ].join(" ")}
      >
        {/* Text */}
        <div className="flex flex-col gap-3 translate-z-10">
          <h3
            className="font-bold text-xl sm:text-2xl leading-tight text-[#2A3A33] transition-colors duration-300 group-hover:text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {job.title}
          </h3>

          {job.subRole && (
            <p
              className="font-normal text-sm leading-relaxed text-brand-royal transition-colors duration-300 group-hover:text-brand-sky"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {job.subRole}
            </p>
          )}

          <p
            className="font-normal text-sm leading-relaxed text-[#4A554F] transition-colors duration-300 group-hover:text-white/80"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {job.body}
          </p>
        </div>

        {/* Button: white base + gradient layer that fades out on card hover */}
        <div className="translate-z-16 cursor-pointer">
<Button variant="unstyled" size="md" shape="xl"
  className="group-hover:text-brand-navy relative isolate gap-2 overflow-hidden bg-white px-4 text-base text-white shadow-[0_3px_0_#0A6B44] transition-[box-shadow,color,translate] duration-300 group-hover:shadow-[0_3px_0_#F1E3C8] active:translate-y-0.5">
            <span
              aria-hidden
              className="absolute inset-0 text-white -z-10 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
              style={{ background: BRAND_GRADIENT }}
            />
            Apply Now
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function RecruitmentGrid() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 py-16 lg:py-24">
      <div className="max-w-420 mx-auto flex flex-col items-center gap-12 lg:gap-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            className="font-bold bg-clip-text text-transparent leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4.17vw, 64px)",
              backgroundImage:
                "linear-gradient(157.64deg, #0E8F5B 12.704%, #0B3B2E 87.17%)",
            }}
          >
            Our Recruitment
          </h2>
          <p
            className="text-[#4A554F] font-normal"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(14px, 1.11vw, 21px)",
            }}
          >
            Explore our current openings and start your journey with us today!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
          {JOBS.map((job, idx) => {
            const hiddenOnMobile = idx >= 3 && !showAll;
            return (
              <div
                key={job.id}
                className={hiddenOnMobile ? "hidden sm:block" : "block"}
              >
                <JobCard job={job} />
              </div>
            );
          })}
        </div>

        {/* View All — mobile only, hidden once expanded */}
        {!showAll && (
<Button variant="brand" size="bare" shape="pill" onClick={() => setShowAll(true)}
  className="px-10 py-4 text-base font-semibold sm:hidden">
            View All Recruitment
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 9l6 6 6-6"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        )}
      </div>
    </section>
  );
}