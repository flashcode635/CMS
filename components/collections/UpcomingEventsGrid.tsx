"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

// ── Event data — 6 cities from Figma ─────────────────────────────────────────
const EVENTS = [
  {
    id: 1,
    date: "16,",
    month: "May",
    time: "12:00 PM ONWARDS",
    city: "New Delhi",
    venue: "Hotel Hyatt Centric",
    address: "Janakpuri District Center, Janakpuri, New Delhi, 110058",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    category: "Medical",
  },
  {
    id: 2,
    date: "10,",
    month: "May",
    time: "11:00 AM ONWARDS",
    city: "Gorakhpur",
    venue: "Rangrezza banquet hall",
    address: "Akshaibar Singh Marg, above Tata Westside, Civil Lines, Gorakhpur, Uttar Pradesh 273001",
    image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&q=80",
    category: "Guidance",
  },
  {
    id: 3,
    date: "10,",
    month: "May",
    time: "12:00 PM ONWARDS",
    city: "Patna",
    venue: "Hotel Gargee Grand Patna",
    address: "825, Exhibition Rd, near Gandhi Maidan Road, Old Jakkanpur, Lodipur, Patna, Bihar 800001",
    image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80",
    category: "Medical",
  },
  {
    id: 4,
    date: "17,",
    month: "May",
    time: "12:00 PM ONWARDS",
    city: "Lucknow",
    venue: "Hotel Hind Palace",
    address: "Hotel Hind Palace Indiranagar Amrapali Chauraha Lucknow",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    category: "Guidance",
  },
  {
    id: 5,
    date: "9th,",
    month: "May",
    time: "12:00 PM ONWARDS",
    city: "Nagpur",
    venue: "The Seven Hotel",
    address: "29, W High Ct Rd, Surendra Nagar, Vivekanand Nagar, Nagpur, Maharashtra 440015",
    image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&q=80",
    category: "Medical",
  },
  {
    id: 6,
    date: "9th,",
    month: "May",
    time: "12:00 PM ONWARDS",
    city: "Pune",
    venue: "Pune",
    address: "Office no. C 450 Gera Imperium Gateway, near Bhosari Metro Station, Kasarwadi, Pune 411034",
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80",
    category: "Guidance",
  },
];

const FILTERS = ["All Cities", "Medical", "Guidance"];

interface EventCardData {
  id: number;
  date: string;
  month: string;
  time: string;
  city: string;
  venue: string;
  address: string;
  image: string;
  category: string;
}

interface EventCardProps {
  event: EventCardData;
  index: number;
  visible: boolean;
}

// ── Desktop card (760px tall, full photo + blue info panel overlaid) ──────────
function DesktopCard({ event, index, visible }: EventCardProps) {
  return (
    <div
      className="ueg-card relative overflow-hidden rounded-4xl  shrink-0 flex flex-col justify-end"
      style={{
        height: "clamp(340px, 32.69vw, 562px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.98)",
        transition: `opacity 0.7s ease ${0.1 + index * 0.08}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.08}s`,
      }}
    >
      {/* Background photo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src={event.image}
          alt={event.city}
          fill
          className="object-cover rounded-4xl "
          sizes="(max-width:1024px) 50vw, 560px"
        />
        {/* Bottom-to-mid dark gradient */}
        <div
          className="absolute inset-0 rounded-4xl "
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 53.5%)",
          }}
        />
      </div>

      {/* Blue info panel — anchored to bottom-left, inset 20px */}
      <div
        className="relative z-10 m-4 lg:m-8 rounded-[20px] p-5 xl:p-8 flex flex-col gap-4 xl:gap-6"
        style={{ backgroundColor: "#0039ea" }}
      >
        {/* Date + time row */}
        <div className="flex flex-col gap-1.5 xl:gap-3">
          <p
            className="text-white leading-none"
            style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: "clamp(22px, 2vw, 40px)",
              fontWeight: 300,
            }}
          >
            <span>{event.date} </span>
            <span style={{ fontWeight: 700 }}>{event.month}</span>
          </p>
          <p
            style={{
              fontFamily: "'Lexend', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(12px, 0.83vw, 16px)",
              color: "#bacbff",
            }}
          >
            {event.time}
          </p>
        </div>

        {/* City + venue + address */}
        <div className="flex flex-col gap-3 xl:gap-6">
          <p
            className="text-white leading-tight font-extrabold truncate"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(24px, 2.5vw, 48px)",
            }}
          >
            {event.city}
          </p>
          <div className="flex flex-col gap-1.5 w-full">
            <p
              className="text-white font-bold truncate"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 1.04vw, 20px)",
              }}
            >
              {event.venue}
            </p>
            <p
              className="text-white/90 font-light line-clamp-2"
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: "clamp(11px, 0.83vw, 15px)",
                lineHeight: "1.4",
              }}
            >
              {event.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile card (full-width, photo top + blue info panel below) ──────────────
function MobileCard({ event, index, visible }: EventCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl  w-full shrink-0 flex flex-col justify-end"
      style={{
        height: "clamp(330px, 100vw, 400px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${0.1 + index * 0.1}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.1}s`,
      }}
    >
      {/* Background photo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src={event.image}
          alt={event.city}
          fill
          className="object-cover rounded-3xl "
          sizes="100vw"
        />
        <div
          className="absolute inset-0 rounded-3xl "
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        />
      </div>

      {/* Date badge — top-left pill */}
      <div
        className="absolute top-0 left-0 flex items-center px-4 py-2 rounded-br-3xl  z-10"
        style={{ backgroundColor: "#0039ea" }}
      >
        <p
          className="text-white text-xs sm:text-sm leading-none whitespace-nowrap"
          style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 300 }}
        >
          <span>{event.date} </span>
          <span style={{ fontWeight: 700 }}>{event.month}</span>
        </p>
      </div>

      {/* Info panel — bottom strip */}
      <div
        className="relative z-10 flex flex-col gap-2.5 p-5 rounded-b-3xl "
        style={{ backgroundColor: "#0039ea", opacity: 0.97 }}
      >
        <p
          className="text-brand-sky text-xs font-semibold leading-normal whitespace-nowrap"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {event.time}
        </p>
        <p
          className="text-white text-2xl sm:text-[28px] font-extrabold leading-tight truncate"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {event.city}
        </p>
        <div className="flex flex-col gap-1 text-white w-full">
          <p
            className="text-sm sm:text-base font-bold leading-tight truncate"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {event.venue}
          </p>
          <p
            className="text-xs sm:text-[13px] font-normal leading-relaxed opacity-90 line-clamp-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {event.address}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function UpcomingEventsGrid() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Cities");
  const [showAllMobile, setShowAllMobile] = useState(false);

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

  const filtered =
    activeFilter === "All Cities"
      ? EVENTS
      : EVENTS.filter((e) => e.category === activeFilter);

  // Mobile shows the first 3 events; "View All" reveals the rest.
  const mobileEvents = showAllMobile ? filtered : filtered.slice(0, 3);

  return (
    <>
      <style>{`
        @keyframes uegFadeUp {
          0%   { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .ueg-heading { opacity: 0; }
        .ueg-heading.in {
          animation: uegFadeUp 0.9s 0.05s forwards cubic-bezier(0.22,1,0.36,1);
        }
        .ueg-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ueg-card:hover {
          box-shadow: 0 24px 60px rgba(0,57,234,0.22);
          transform: translateY(-4px) scale(1.01) !important;
        }
        .ueg-filter-btn {
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .ueg-view-btn {
          transition: background 0.2s ease, color 0.2s ease;
        }
        .ueg-view-btn:hover {
          background-color: #3163ff;
          color: white;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          padding: "clamp(38px,4.5vw, 66px) clamp(10px, 5.29vw, 110px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(32px, 3.65vw, 70px)",
        }}
      >
        {/* ── Section heading ── */}
        {/*
          Desktop: "UPCOMING MBBS " ExtraBold + "ADMISSION GATEWAY - 2026" Medium Italic
          Gradient: 170.75deg, #00923F 12.7% → #3163FF 87.17%
        */}
        <h2
          className={`ueg-heading${visible ? " in" : ""} w-full leading-none`}
          style={{
            fontSize: "clamp(28px, 2.5vw, 48px)",
            backgroundImage:
              "linear-gradient(170.75deg, #00923F 12.704%, #3163FF 87.17%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontStyle: "normal",
            }}
          >
            UPCOMING MBBS{" "}
          </span>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >
            ADMISSION GATEWAY - 2026
          </span>
        </h2>

        {/* ── MOBILE: filter tabs — hidden on desktop ── */}
        <div className="flex gap-2 flex-wrap md:hidden">
          {FILTERS.map((f) => (
<Button key={f} onClick={() => setActiveFilter(f)} variant="outline" size="bare" shape="pill"
  active={activeFilter === f}
  className="ueg-filter-btn border-[#ddd] px-4 py-2 text-sm font-semibold text-[#79859b] data-[active=true]:border-brand-royal data-[active=true]:bg-brand-blue/10 data-[active=true]:text-brand-royal">
              {f}
            </Button>
          ))}
        </div>

        {/* ── DESKTOP grid: 2 cols on tablet, 3 cols on laptop+ — hidden on mobile ── */}
        <div
          className="hidden grid-cols-2 md:grid lg:grid-cols-3"
          style={{
            gap: "clamp(15px, 1.54vw, 25px)",
          }}
        >
          {EVENTS.map((event, i) => (
            <DesktopCard
              key={event.id}
              event={event}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* ── MOBILE stack — 3 cards, "View All" reveals the rest ── */}
        <div className="flex flex-col gap-6 md:hidden">
          <div id="upcoming-mobile-list" className="flex flex-col gap-6">
            {mobileEvents.map((event, i) => (
              <MobileCard
                key={event.id}
                event={event}
                index={i}
                visible={visible}
              />
            ))}
          </div>

          {filtered.length > 3 && (
            <Button
              fullWidth
              variant="brandOutline"
              size="bare"
              shape="pill"
              onClick={() => setShowAllMobile((v) => !v)}
              aria-expanded={showAllMobile}
              aria-controls="upcoming-mobile-list"
              className="ueg-view-btn px-6 py-3 text-sm font-semibold"
            >
              {showAllMobile ? "Show Less" : "View All"}
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
