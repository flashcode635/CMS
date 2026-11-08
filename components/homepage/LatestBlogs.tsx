"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const blogs = [
  {
    id: 1,
    category: "Field of Study",
    title: "Top Trending Courses for 2026: Get Ahead in Your Studies Abroad",
    description: "Explore the exciting opportunities for studying medicine abroad, where you can gain a global perspective and enhance your career.",
    image: "/home/blog-graduation.jpg",
  },
  {
    id: 2,
    category: "Field of Study",
    title: "Top Trending Courses for 2026: Get Ahead in Your Studies Abroad",
    description: "Explore the exciting opportunities for studying medicine abroad, where you can gain a global perspective and enhance your career.",
    image: "/home/blog-graduation.jpg",
  },
  {
    id: 3,
    category: "Field of Study",
    title: "Top Trending Courses for 2026: Get Ahead in Your Studies Abroad",
    description: "Explore the exciting opportunities for studying medicine abroad, where you can gain a global perspective and enhance your career.",
    image: "/home/blog-graduation.jpg",
  },
];

export default function LatestBlogs() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const len = blogs.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navigate = (direction: "next" | "prev") => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => direction === "next" ? (c + 1) % len : (c - 1 + len) % len);
      setAnimating(false);
    }, 560);
  };

  return (
    <>
      <style>{`
        
        .lb-heading { opacity: 0; }
        .lb-heading.in { animation: sp-fade-up 0.8s 0.05s forwards cubic-bezier(0.22,1,0.36,1); }
        .lb-sub     { opacity: 0; }
        .lb-sub.in     { animation: sp-fade-up 0.7s 0.18s forwards cubic-bezier(0.22,1,0.36,1); }

        .lb-track {
          display: flex;
          will-change: transform;
          transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .lb-nav-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .lb-nav-btn:hover {
          transform: scale(1.1) translateY(-50%);
          box-shadow: 0 0 25px color-mix(in srgb, var(--color-brand-champagne) 60%, transparent);
        }
        .lb-nav-btn:active { transform: scale(0.95) translateY(-50%); }
      `}</style>

      <section
        ref={sectionRef}
        className="relative bg-surface text-brand-forest-deep py-16 md:py-24 overflow-hidden"
      >
        {/* Soft background ambient glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div
            className="absolute top-0 right-0 w-137.5 h-137.5 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, color-mix(in srgb, var(--color-green-200) 50%, transparent) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-112.5 h-112.5 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, color-mix(in srgb, var(--color-blue-200) 45%, transparent) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ── Header — centred ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(6px,0.63vw,12px)",
            marginBottom: "clamp(24px,2.5vw,48px)",
            padding: "0 clamp(20px,4.17vw,80px)",
          }}
        >
          <p
            className="text-brand-emerald-deep font-semibold tracking-[0.85px] uppercase"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "clamp(12px, 0.83vw, 14px)",
              margin: 0,
            }}
          >
            Insights & Updates
          </p>

          <h2
            className={`lb-heading${visible ? " in" : ""} font-bold text-center bg-linear-to-r from-brand-green via-brand-forest to-brand-forest-deep bg-clip-text text-transparent`}
            style={{
              fontFamily: 'var(--font-sub)',
              fontSize: "clamp(28px,3.33vw,52px)",
              lineHeight: "clamp(34px,3.6vw,60px)",
              margin: 0,
            }}
          >
            Our Latest Blogs
          </h2>

          <p
            className={`lb-sub${visible ? " in" : ""} text-center font-normal text-body`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "clamp(13px,0.94vw,17px)",
              lineHeight: "26px",
              margin: 0,
            }}
          >
            Building trust through experience, expertise, and results
          </p>
        </div>

        {/* ── Carousel area ── */}
        <div className="relative w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Card Viewport */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl border border-surface-alt bg-white">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {blogs.map((blog, i) => {
                const isActive = i === current;
                return (
                  <div
                    key={blog.id}
                    className="w-full shrink-0 flex flex-col md:flex-row items-stretch"
                  >
                    {/* Left: image */}
                    <div className="w-full md:w-[48%] relative min-h-[60] md:min-h-110 overflow-hidden bg-surface-alt">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={isActive}
                      />
                      <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/20 via-transparent to-transparent" />
                    </div>

                    {/* Right: content */}
                    <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-14 gap-4 md:gap-6 bg-white">
                      {/* Category badge */}
                      <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-surface-alt border border-brand-sky">
                        <div className="w-4 h-4 relative shrink-0">
                          <Image src="/home/blog-book-icon.svg" alt="" fill className="object-contain" />
                        </div>
                        <span
                          className="uppercase font-semibold tracking-wider text-brand-emerald-deep"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: "12px",
                            lineHeight: 1.4,
                          }}
                        >
                          {blog.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-brand-forest-deep font-bold hover:text-brand-emerald-deep transition-colors cursor-pointer"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: "clamp(20px, 2.2vw, 36px)",
                          lineHeight: "1.25",
                          margin: 0,
                        }}
                      >
                        {blog.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-body font-normal"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: "clamp(13px, 1vw, 16px)",
                          lineHeight: "1.65",
                          margin: 0,
                        }}
                      >
                        {blog.description}
                      </p>

                      {/* Read More button */}
                      <div className="pt-2">
                        <Button
                        variant="brand"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-emerald/20 hover:-translate-y-0.5 cursor-pointer"
                          style={{
                            background: "linear-gradient(90deg, var(--color-brand-forest) 0%, var(--color-brand-forest-deep) 100%)",
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          <span>Read Full Story</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel navigation arrows inside container */}
            <Button variant="unstyled"
              size="icon"
              onClick={() => navigate("prev")}
              aria-label="Previous blog"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 size-10 md:size-12 rounded-full bg-white/95 hover:bg-white text-body hover:text-brand-emerald-deep border border-line-strong flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Button>

            <Button variant="brand"
              size="icon"
              onClick={() => navigate("next")}
              aria-label="Next blog"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 size-10 md:size-12 rounded-full bg-linear-to-r from-brand-green to-brand-forest-deep hover:opacity-95 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </div>

          {/* ── Dot indicators ── */}
          <div className="flex justify-center items-center gap-2.5 mt-6">
            {blogs.map((_, i) => (
              <Button variant="unstyled"
                size="icon"
                key={i}
                onClick={() => { if (i !== current) navigate(i > current ? "next" : "prev"); }}
                aria-label={`Go to slide ${i + 1}`}
                className="transition-all duration-300 cursor-pointer h-2.5 rounded-full border-0 p-0 shadow-none min-w-0"
                style={{
                  width: i === current ? 32 : 10,
                  backgroundColor: i === current ? "var(--color-brand-forest)" : "var(--color-line-strong)",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
