"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface WebStory {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export const WEB_STORIES: WebStory[] = [
  {
    id: "budget-countries",
    title: "Top Budget-Friendly Countries to Study MBBS Abroad",
    description:
      "Looking for low-cost MBBS abroad? Here's a quick guide to the most affordable countries for MBBS with top medical universities, total expense range, FMGE scope, and quality education for Indians.",
    date: "December 30, 2025",
    image: "/home/mbbs-abroad-georgia.jpg",
  },
  {
    id: "neet-2025",
    title: "NEET 2025 Exam Pattern and Marking Scheme Explained!",
    description:
      "A quick visual guide to the NEET 2025 exam pattern, marking scheme and subject-wise weightage — plus smart preparation tips from our counsellors for Indian aspirants.",
    date: "December 26, 2025",
    image: "/home/blog-graduation.jpg",
  },
  {
    id: "mbbs-russia",
    title: "Study MBBS in Russia – Budget-friendly & Globally Accepted!",
    description:
      "Looking for low-cost MBBS abroad? Here's a quick guide to the most affordable countries for MBBS with top medical universities, total expense range, FMGE scope, and quality education for Indians.",
    date: "December 29, 2025",
    image: "/home/mbbs-abroad-russia.jpg",
  },
  {
    id: "mbbs-georgia",
    title: "MBBS in Georgia – European Degree Without the Hefty Price Tag",
    description:
      "Discover why Indian students are choosing Georgia: English-medium programmes, globally recognised universities and a safe, affordable student life near home.",
    date: "December 14, 2025",
    image: "/home/mbbs-georgia.webp",
  },
  {
    id: "mbbs-kazakhstan",
    title: "MBBS in Kazakhstan – Lowest Cost, High FMGE Success",
    description:
      "A complete cost breakdown for studying MBBS in Kazakhstan — tuition, hostel, food and living expenses — plus how graduates are preparing for the FMGE exam.",
    date: "December 6, 2025",
    image: "/home/mbbs-abroad-kazakhstan.jpg",
  },
  {
    id: "mbbs-kyrgyzstan",
    title: "MBBS in Kyrgyzstan – A Smart Choice for Indian Aspirants",
    description:
      "NMC-approved universities, budget-friendly fees and a growing Indian student community — everything you should know before applying for MBBS in Kyrgyzstan.",
    date: "November 29, 2025",
    image: "/home/mbbs-abroad-kyrgyzstan.jpg",
  },
  {
    id: "mbbs-uzbekistan",
    title: "MBBS in Uzbekistan – Quality Education at an Honest Price",
    description:
      "From admission steps to visa processing and hostel life, here's a fast visual walkthrough of pursuing MBBS in Uzbekistan for Indian students.",
    date: "November 21, 2025",
    image: "/home/mbbs-abroad-uzbekistan.jpg",
  },
];

const STORY_DURATION_MS = 6000;
const PROGRESS_TICK_MS = 50;
const TRANSITION_MS = 700;

function TabShape({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 28 96"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${
        flip ? "-scale-x-100" : ""
      }`}
    >
      {/* trapezium: lambi side x=0 (panel), choti side x=24 (bahar) */}
      <polygon points="0,0 24,30 24,66 0,96" className="fill-brand-sky" />
      {/* border sirf teen slanted/bahar sides par, panel wali side par nahi */}
      <polyline
        points="0,0 24,30 24,66 0,96"
        fill="none"
        stroke="#3163ff"
        strokeWidth="1.2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function WebStoriesCarousel() {
  const [current, setCurrent] = useState(2);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const lockRef = useRef(false);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const total = WEB_STORIES.length;

  const goTo = useCallback(
    (index: number) => {
      if (lockRef.current) return;

      lockRef.current = true;

      if (unlockTimerRef.current) {
        clearTimeout(unlockTimerRef.current);
      }

      setProgress(0);
      setCurrent(((index % total) + total) % total);

      unlockTimerRef.current = setTimeout(() => {
        lockRef.current = false;
        unlockTimerRef.current = null;
      }, TRANSITION_MS);
    },
    [total],
  );

  useEffect(() => {
    return () => {
      if (unlockTimerRef.current) {
        clearTimeout(unlockTimerRef.current);
      }
    };
  }, []);

  // Autoplay: pause while the pointer is over the carousel.
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      goTo(current + 1);
    }, STORY_DURATION_MS);

    return () => clearInterval(interval);
  }, [current, paused, goTo]);

  // Instagram-style segmented progress.
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setProgress((value) =>
        Math.min(
          100,
          value + (PROGRESS_TICK_MS / STORY_DURATION_MS) * 100,
        ),
      );
    }, PROGRESS_TICK_MS);

    return () => clearInterval(interval);
  }, [current, paused]);

  const arrowBase =
    "absolute top-1/2 z-20 flex h-[112px] w-[36px] " +
    "-translate-y-1/2 items-center justify-center " +
    "text-[#001d3d] cursor-pointer " +
    "transition-[filter] duration-300 ease-out " +
    "hover:brightness-105 focus-visible:outline-2 " +
    "focus-visible:outline-offset-2 focus-visible:outline-[#3163ff]";

  return (
    <section
      className="relative mx-auto w-full max-w-292"
      aria-roledescription="carousel"
      aria-label="Web stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {/* Previous story — trapezium tab */}
      <button
        type="button"
        onClick={() => goTo(current - 1)}
        aria-label="Previous story"
        className={`${arrowBase} left-0`}
      >
        <TabShape />
        <ChevronLeft
          size={23}
          strokeWidth={2}
          className="relative z-10 -ml-1"
        />
      </button>

      {/* Next story — mirrored tab */}
      <button
        type="button"
        onClick={() => goTo(current + 1)}
        aria-label="Next story"
        className={`${arrowBase} right-0`}
      >
        <TabShape flip />
        <ChevronRight
          size={23}
          strokeWidth={2}
          className="relative z-10 -mr-1"
        />
      </button>

      {/* Main story card */}
      <div
        className="relative overflow-hidden rounded-[28px] bg-[#001838]
          shadow-[0_18px_42px_rgba(23,66,100,0.18)]"
        style={{
          height: "clamp(360px, 31.5vw, 440px)",
        }}
      >
        <div
          className="flex h-full transition-transform
            duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {WEB_STORIES.map((story, index) => (
            <article
              key={story.id}
              className="relative h-full w-full shrink-0"
              aria-hidden={index !== current}
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                priority={index === current}
                sizes="(max-width: 768px) 100vw, 1168px"
                className="object-cover object-center"
              />

              {/* Stronger bottom gradient for readable text */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, " +
                    "rgba(0,13,39,0.98) 0%, " +
                    "rgba(0,13,39,0.82) 22%, " +
                    "rgba(0,13,39,0.38) 48%, " +
                    "rgba(0,13,39,0.06) 72%, " +
                    "rgba(0,13,39,0) 100%)",
                }}
              />

              {/* Story content */}
              <div
                className="absolute inset-x-0 bottom-0 flex flex-col
                  gap-2 px-6 pb-7 sm:gap-2.5 sm:px-8.5
                   sm:pb-7.5"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <Image
                    src="/study_ph_logo.png"
                    alt="Study Palace"
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-full
                      bg-white object-contain p-0.5"
                  />

                  <span
                    className="font-medium text-white"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    {story.date}
                  </span>
                </div>

                <h2
                  className="m-0 font-normal text-white"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(22px, 2.1vw, 34px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {story.title}
                </h2>

                <p
                  className="m-0 line-clamp-2 text-white/70"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(12px, 1.05vw, 16px)",
                    lineHeight: 1.45,
                  }}
                >
                  {story.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Instagram-style segmented loading indicator */}
        <div
          className="pointer-events-none absolute 
          inset-x-5 top-1.75
            z-10 flex gap-2.5 sm:inset-x-5 sm:gap-3"
          aria-hidden="true"
        >
          {WEB_STORIES.map((story, index) => (
            <div
              key={story.id}
              className="relative h-1 min-w-0 flex-1
                overflow-hidden rounded-full bg-white/40
                shadow-[0_1px_3px_rgba(0,0,0,0.22)]"
            >
              <div
                className="h-full rounded-full bg-white
                  shadow-[0_0_2px_rgba(255,255,255,0.6)]"
                style={{
                  width:
                    index < current
                      ? "100%"
                      : index === current
                        ? `${progress}%`
                        : "0%",
                  transition: `width ${PROGRESS_TICK_MS}ms linear`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
