"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WEB_STORIES, type WebStory } from "@/components/web-stories/WebStoriesCarousel";

// ── Autoplay timing ──────────────────────────────────────────────────────────
const DURATION_MS = 7000; // one story is shown for 7 s
const TICK_MS = 100;
const PROGRESS_STEP = (TICK_MS / DURATION_MS) * 100;

/**
 * Story tray + viewer (above the carousel on /web-stories):
 * left column — scrollable list of stories, the selected one highlighted with
 * the brand gradient; right column — the selected story as a full-bleed image
 * with segmented progress bars on top and prev/next arrows at the bottom.
 */
export default function WebStoriesViewer() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = WEB_STORIES.length;

  // Restart the progress whenever the story changes
  useEffect(() => {
    setProgress(0);
  }, [active]);

  // Advance the progress bar only while not paused / not mid-transition
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(
      () => setProgress(p => Math.min(100, p + PROGRESS_STEP)),
      TICK_MS,
    );
    return () => clearInterval(interval);
  }, [paused, active]);

  // Story done → auto-advance to the next one (wraps around)
  useEffect(() => {
    if (progress < 100) return;
    setActive(a => (a + 1) % total);
  }, [progress, total]);

  const step = (dir: 1 | -1) =>
    setActive(a => (((a + dir) % total) + total) % total);

  const story: WebStory = WEB_STORIES[active];
const buttonStyles=`flex size-10 items-center justify-center 
                rounded-full border border-white/15 bg-brand-forest-deep/5
                text-white backdrop-blur-sm transition-all duration-200
                  hover:bg-brand-forest-deep hover:scale-105 active:scale-95 cursor-pointer`;
  return (
    <section
      className=" p-3 sm:p-9 lg:p-12"
      style={{ background: "linear-gradient(160deg, var(--color-brand-forest-deep) 0%, var(--color-brand-forest-deep) 100%)" }}
      aria-label="Web stories viewer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
        {/* ── Story viewer (first on mobile; moved to the right on desktop) ── */}
        <div
          className="order-1 lg:order-2 lg:col-span-3 relative rounded-2xl overflow-hidden bg-brand-forest-deep"
          style={{ height: "clamp(380px, 52vw, 520px)" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Segmented progress bars — one per story */}
          <div className="absolute inset-x-0 top-0 z-20 flex gap-1.5 p-3" aria-hidden>
            {WEB_STORIES.map((s, i) => (
              <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: i < active ? "100%" : i === active ? `${progress}%` : "0%" }}
                />
              </div>
            ))}
          </div>

          <Image
            key={story.id}
            src={story.image}
            alt={story.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
          />

          {/* Prev / Next */}
          <div className="absolute bottom-4 right-4 z-20 flex gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous story"
                className={buttonStyles}
            >
              <ChevronLeft size={18} strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next story"
              className={buttonStyles}
            >
              <ChevronRight size={18} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        {/* ── Story tray (list) ── */}
        <div className="order-2 lg:order-1 lg:col-span-2 rounded-2xl bg-white p-2.5 sm:p-3">
          <ul className="wsv-list flex max-h-[clamp(340px,46vw,480px)] flex-col gap-2.5 overflow-y-auto pr-1" role="list">
            {WEB_STORIES.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive}
                    aria-label={`Show story: ${s.title}`}
                    className={cn(
                      "w-full rounded-xl p-3 text-left transition-all duration-300 cursor-pointer",
                      isActive
                        ? "text-white shadow-md"
                        : "border border-line bg-white hover:border-brand-sky hover:bg-surface",
                    )}
                    style={isActive ? { backgroundImage: "linear-gradient(135deg, var(--color-brand-forest) 0%, var(--color-brand-forest-deep) 100%)" } : undefined}
                  >
                    <span className="mb-1.5 flex items-center justify-between gap-2">
                      <Image
                        src="/study_ph_logo.png"
                        alt=""
                        width={26}
                        height={26}
                        className="rounded-full bg-white object-contain"
                      />
                      <span
                        className="text-[11.5px] font-medium"
                        style={{ fontFamily: 'var(--font-body)', color: isActive ? "color-mix(in srgb, white 85%, transparent)" : "var(--color-muted)" }}
                      >
                        {s.date}
                      </span>
                    </span>

                    <span
                      className="block font-semibold"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: "clamp(13.5px, 1.15vw, 15.5px)",
                        lineHeight: 1.4,
                        color: isActive ? "white" : "var(--color-brand-forest-deep)",
                      }}
                    >
                      {s.title}
                    </span>

                    <span
                      className="mt-1.5 block text-[12.5px] leading-[1.55]"
                      style={{ fontFamily: 'var(--font-body)', color: isActive ? "color-mix(in srgb, white 88%, transparent)" : "var(--color-body)" }}
                    >
                      {s.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Scrollbar for the tray: thin bar on desktop, hidden on mobile (same treatment as the page) */}
      <style>{`
        .wsv-list {
          scrollbar-width: thin;
          scrollbar-color: color-mix(in srgb, var(--color-brand-champagne) 22%, transparent) transparent;
        }
        .wsv-list::-webkit-scrollbar       { width:3px; }
        .wsv-list::-webkit-scrollbar-track { background:transparent; }
        .wsv-list::-webkit-scrollbar-thumb { background:color-mix(in srgb, var(--color-brand-champagne) 22%, transparent); border-radius:99px; }
        @media (max-width: 767px) {
          .wsv-list { scrollbar-width: none; -ms-overflow-style: none; }
          .wsv-list::-webkit-scrollbar { width:0; height:0; display:none; }
        }
      `}</style>
    </section>
  );
}
