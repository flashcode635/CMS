"use client";

/**
 * GalleryGrid — Gallery/Images page second section
 *
 * Features:
 *  1. Category filter tabs — each tab filters the visible cards
 *  2. Hover animations — card lifts + shadow deepens + image zooms
 *  3. Scroll-triggered fade-up — cards animate in when they enter viewport
 *
 * Desktop: sticky filter bar + 3-col grid
 * Mobile:  scrollable pill tabs + 1-col stacked cards + "View All" expand
 */

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// ── Category tags per event ───────────────────────────────────────────────────
const EVENTS = [
  {
    id: 1,
    year: "Event 2025",
    slug: "event-2025",
    category: "Medical Seminars",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 2,
    year: "Event 2026",
    category: "Academic Fests",
    image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 3,
    year: "Event 2024",
    category: "Workshops",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 4,
    year: "Event 2022",
    category: "Medical Seminars",
    image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 5,
    year: "Event 2021",
    category: "Academic Fests",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 6,
    year: "Event 2019",
    category: "Workshops",
    image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 7,
    year: "Event 2020",
    category: "Medical Seminars",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 8,
    year: "Event 2016",
    category: "Academic Fests",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 9,
    year: "Event 2023",
    category: "Workshops",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 10,
    year: "Event 2015",
    category: "Medical Seminars",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 11,
    year: "Event 2017",
    category: "Academic Fests",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
  {
    id: 12,
    year: "Event 2018",
    category: "Workshops",
    image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&q=80",
    body: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!",
  },
];

const TABS = ["All Images", "Medical Seminars", "Academic Fests", "Workshops"];
const LOCATION = "A-456, C Block, Sector 12, Greater Noida, Uttar Pradesh 201310";
const BTN_GRAD = "linear-gradient(140.84deg, #00923F 12.704%, #3163FF 87.17%)";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "az",     label: "A → Z" },
  { value: "za",     label: "Z → A" },
];

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

// ── Sort dropdown ─────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = SORT_OPTIONS.find(o => o.value === value);

  return (
    <div ref={ref} className="relative select-none">
      <Button variant="outline"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 bg-white rounded-full h-10 px-4.5 cursor-pointer hover:bg-gray-50 transition-colors border border-transparent hover:border-[#d7d7d7] text-black font-medium text-base shadow-none"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <FilterIcon />
        <span className="text-black font-medium text-base whitespace-nowrap">
          Sort: {current?.label}
        </span>
        {/* chevron */}
        <svg
          width="12" height="8" viewBox="0 0 12 8" fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1L6 7L11 1" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 bg-white rounded-2xl shadow-[0px_16px_48px_rgba(0,0,0,0.12)] border border-[#e5e7eb] py-2 min-w-45 overflow-hidden">
          {SORT_OPTIONS.map((opt) => (
            <Button variant="unstyled"
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={[
                "w-full text-left px-5 py-3 text-sm font-medium transition-colors justify-start rounded-none h-auto shadow-none",
                value === opt.value
                  ? "text-white"
                  : "text-[#1a1a1a] hover:bg-[#f0f4ff] bg-transparent",
              ].join(" ")}
              style={
                value === opt.value
                  ? { backgroundImage: BTN_GRAD, fontFamily: "Inter, sans-serif" }
                  : { fontFamily: "Inter, sans-serif" }
              }
            >
              {opt.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
function PinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
        fill="#79859b"
      />
    </svg>
  );
}

// ── Filter icon ───────────────────────────────────────────────────────────────
function FilterIcon() {
  return (
    <div className="flex flex-col gap-1 w-4.5 h-3.5 justify-center shrink-0">
      <div className="bg-[#595959] h-0.5 w-4.5 rounded-full" />
      <div className="bg-[#595959] h-0.5 w-3 rounded-full" />
      <div className="bg-[#595959] h-0.5 w-3 rounded-full" />
    </div>
  );
}

// ── Scroll-triggered fade-up hook ─────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

interface EventCardItem {
  id: number;
  year: string;
  category: string;
  image: string;
  body: string;
  slug?: string;
}

interface EventCardProps {
  event: EventCardItem;
  delay?: number;
}

// ── Desktop event card ────────────────────────────────────────────────────────
function DesktopCard({ event, delay = 0 }: EventCardProps) {
  const { ref, visible } = useFadeUp();

  return (
    <>
      <div ref={ref}  style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.4s ease, filter 0.5s ease`,
          }} className="h-full">
        <div
          
          className="group bg-white flex flex-col justify-between rounded-2xl overflow-hidden
                    cursor-pointer h-full
                    shadow-[15px_21px_11.75px_rgba(0,0,0,0.05)]
                    hover:-translate-y-3
                    hover:shadow-[0px_32px_64px_rgba(49,99,255,0.18)]
                    transition-all hover:duration-700 ease-out"
         
        >
          <div>
            {/* Photo with zoom on hover */}
            <div className="relative w-full h-50 xl:h-63 rounded-t-xl overflow-hidden shrink-0">
              <Image
                src={event.image}
                alt={event.year}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                unoptimized
                sizes="33vw"
              />
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-[rgba(49,99,255,0.15)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2 px-6 pt-4 pb-4">
              <p
                className="text-brand-blue font-bold text-2xl lg:text-[28px] xl:text-4xl  leading-tight tracking-[-0.60px] transition-colors duration-300 group-hover:text-brand-green"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {event.year}
              </p>
              <p className="text-[#777] font-normal text-sm lg:text-base leading-normal line-clamp-3" style={{ fontFamily: "Inter, sans-serif" }}>
                {event.body}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 px-6 pb-6 pt-2 border-t border-[#f0f0f2]">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <PinIcon size={20} />
              <p className="text-[#79859b] font-medium text-xs lg:text-sm leading-5 truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                {LOCATION}
              </p>
            </div>
            <Link
              href={`/gallery/images/${event.slug || event.year.toLowerCase().replace(/\s+/g, "-")}`}
              className="shrink-0 flex items-center justify-center px-6 h-10 rounded-lg text-white font-semibold text-sm whitespace-nowrap hover:opacity-90 transition-opacity active:scale-[0.98] w-full xl:w-auto"
              style={{ backgroundImage: BTN_GRAD, fontFamily: "Inter, sans-serif" }}
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Mobile card with fade-up ──────────────────────────────────────────────────
function MobileCard({ event, delay = 0 }: EventCardProps) {
  const { ref, visible } = useFadeUp();

  return (
    <div
      ref={ref}
      className="group bg-white flex flex-col rounded-3xl overflow-hidden w-full
                 shadow-[0px_12px_24px_rgba(0,0,0,0.05)]
                 hover:-translate-y-2
                 hover:shadow-[0px_20px_40px_rgba(49,99,255,0.15)]
                 transition-all duration-500 ease-out"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.4s ease`,
      }}
    >
      <div className="relative w-full h-55 shrink-0 overflow-hidden">
        <Image
          src={event.image}
          alt={event.year}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
          unoptimized
          sizes="100vw"
        />
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-2 pb-4 border-b border-[#e5e7eb]">
          <p className="text-brand-blue font-bold text-xl sm:text-2xl transition-colors duration-300 group-hover:text-brand-green" style={{ fontFamily: "Inter, sans-serif" }}>
            {event.year}
          </p>
          <p className="text-[#777] font-normal text-xs sm:text-sm leading-relaxed line-clamp-3" style={{ fontFamily: "Inter, sans-serif" }}>
            {event.body}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <PinIcon size={18} />
            <p className="text-[#79859b] text-xs sm:text-sm truncate flex-1 min-w-0" style={{ fontFamily: "Inter, sans-serif" }}>
              {LOCATION}
            </p>
          </div>
          <Link
            href={`/gallery/images/${event.slug || event.year.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center justify-center px-6 py-2.5 rounded-lg text-white font-semibold text-sm w-full hover:opacity-90 transition-opacity active:scale-[0.98]"
            style={{ backgroundImage: BTN_GRAD, fontFamily: "Inter, sans-serif" }}
          >
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function GalleryGrid() {
  const [activeTab, setActiveTab] = useState("All Images");
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Filter by category
  const filtered = activeTab === "All Images"
    ? EVENTS
    : EVENTS.filter(e => e.category === activeTab);

  // Sort the filtered results
  const sorted = [...filtered].sort((a, b) => {
    const yearA = parseInt(a.year.replace(/\D/g, ""));
    const yearB = parseInt(b.year.replace(/\D/g, ""));
    if (sortBy === "newest") return yearB - yearA;
    if (sortBy === "oldest") return yearA - yearB;
    if (sortBy === "az")     return a.year.localeCompare(b.year);
    if (sortBy === "za")     return b.year.localeCompare(a.year);
    return 0;
  });

  // Reset "show all" when tab or sort changes
  const handleTabChange = (tab: string) => { setActiveTab(tab); setShowAll(false); };
  const handleSortChange = (val: string) => { setSortBy(val);  setShowAll(false); };

  const mobileVisible = showAll ? sorted : sorted.slice(0, 3);

  return (
    <section className="w-full" style={{ backgroundColor: "#e8f0f9" }}>

      {/* ══════════════════════════════════════════
          DESKTOP (hidden on mobile)
      ══════════════════════════════════════════ */}
      <div className="hidden sm:block">

        {/* Sticky filter bar */}
        <div className=" top-0 z-20 bg-white/10 ">
          <div className="h-18 px-20 flex items-center justify-between">
            {/* Category tabs */}
            <div className="flex items-center gap-3">
              {TABS.map((tab) => (
                <Button variant="unstyled"
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={[
                    "h-10 px-6 rounded-full text-[15px] whitespace-nowrap transition-all duration-300 shadow-none",
                    activeTab === tab
                      ? "text-white font-semibold scale-105"
                      : "bg-white text-black font-medium hover:bg-gray-50 hover:scale-105",
                  ].join(" ")}
                  style={
                    activeTab === tab
                      ? { backgroundImage: "linear-gradient(134.38deg, #00923F 12.704%, #3163FF 87.17%)", fontFamily: "Inter, sans-serif" }
                      : { fontFamily: "Inter, sans-serif" }
                  }
                >
                  {tab}
                </Button>
              ))}
            </div>

            {/* Sort dropdown */}
            <SortDropdown value={sortBy} onChange={handleSortChange} />
          </div>
        </div>

        {/* Grid */}
        <div className="px-18 py-12 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-12">
          {sorted.length > 0 ? (
            sorted.map((event, idx) => (
              <DesktopCard
                key={`${activeTab}-${sortBy}-${event.id}`}
                event={event}
                delay={idx * 80}
              />
            ))
          ) : (
            <div className="col-span-3 flex items-center justify-center py-24">
              <p className="text-[#79859b] text-xl font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                No events found for this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE (hidden on sm+)
      ══════════════════════════════════════════ */}
      <div className="flex sm:hidden flex-col">

        {/* Sticky filter bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-[#d7d7d7]">
          <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 shrink-0">
              {TABS.map((tab) => (
                <Button variant="unstyled"
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={[
                    "h-9 px-4 rounded-full text-[13px] whitespace-nowrap shrink-0 transition-all duration-200 shadow-none",
                    activeTab === tab
                      ? "text-white font-semibold"
                      : "bg-white border border-[#d7d7d7] text-[#1a1a1a] font-medium hover:bg-gray-50",
                  ].join(" ")}
                  style={
                    activeTab === tab
                      ? { backgroundImage: "linear-gradient(133.03deg, #00923F 12.704%, #3163FF 87.17%)", fontFamily: "Inter, sans-serif" }
                      : { fontFamily: "Inter, sans-serif" }
                  }
                >
                  {tab === "Medical Seminars" ? "Medical" : tab === "Academic Fests" ? "Academic" : tab}
                </Button>
              ))}
            </div>
            <div className="w-px h-6 bg-[#d7d7d7] shrink-0" />
            {/* Mobile sort — compact pill */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-white border border-[#d7d7d7] rounded-full h-9 pl-3 pr-8 text-[#1a1a1a] font-medium text-[13px] cursor-pointer outline-none"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path d="M1 1L5 5L9 1" stroke="#595959" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6 p-5">
          {mobileVisible.length > 0 ? (
            mobileVisible.map((event, idx) => (
              <MobileCard
                key={`${activeTab}-${sortBy}-${event.id}`}
                event={event}
                delay={idx * 80}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-16">
              <p className="text-[#79859b] text-base font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                No events found.
              </p>
            </div>
          )}

          {/* View All / Collapse */}
          {sorted.length > 3 && !showAll && (
            <Button variant="brandOutline"
              onClick={() => setShowAll(true)}
              fullWidth
              className="h-12 flex items-center justify-center rounded-full border border-brand-blue text-brand-blue font-semibold text-sm hover:bg-brand-blue hover:text-white transition-all duration-200 bg-transparent shadow-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              View All ({sorted.length - 3} more)
            </Button>
          )}
        </div>
      </div>

    </section>
  );
}
