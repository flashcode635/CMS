"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

// ── 2025 event data ───────────────────────────────────────────────────────────
const EVENTS_2025 = [
  {
    id: 1,
    date: "17 JUNE",
    city: "Karnal, Haryana",
    venue: "Deventure Hotel Karnal",
    address: "NH1, Namaste Chowk Flyover, Pritam Nagar, Sector 14, Karnal, Haryana 132001",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
  },
  {
    id: 2,
    date: "8th JUNE",
    city: "Jaipur, Rajasthan",
    venue: "Lords Plaza Jaipur",
    address: "Suchna Kendra, Sawai Ram Singh Rd, near Jaipur, Dusadon Ka Bagh, Sangram Colony, Ashok Nagar, Jaipur, Rajasthan 302001",
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80",
  },
  {
    id: 3,
    date: "8th JUNE",
    city: "Varanasi, Uttar Pradesh",
    venue: "Hotel Plaza Inn",
    address: "S 21, 116 H, Parade Kothi Rd, Pared Kothi, Vijay Nagar Colony, Varanasi cantonment, Varanasi, Uttar Pradesh 221002",
    image: "https://images.unsplash.com/photo-1605537964076-bd0b8525cee0?w=800&q=80",
  },
  {
    id: 4,
    date: "1st JUNE",
    city: "Bhubaneswar, Odisha",
    venue: "Hotel Pushpak",
    address: "Plot No 68, Kalpana Square, Puri – Cuttack Road, Buddha Nagar, Bhubaneswar, Odisha 751006",
    image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80",
  },
  {
    id: 5,
    date: "17 JUNE",
    city: "Bengaluru, Karnataka",
    venue: "JCCA Club",
    address: "NH1, Namaste Chowk Flyover, Pritam Nagar, Sector 14, Karnal, Haryana 132001",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    id: 6,
    date: "8th JUNE",
    city: "Hyderabad, Telangana",
    venue: "Amrutha Castle",
    address: "Suchna Kendra, Sawai Ram Singh Rd, near Jaipur, Dusadon Ka Bagh, Sangram Colony, Ashok Nagar, Jaipur, Rajasthan 302001",
    image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&q=80",
  },
  {
    id: 7,
    date: "8th JUNE",
    city: "New Delhi, Delhi",
    venue: "Statesman House",
    address: "S 21, 116 H, Parade Kothi Rd, Pared Kothi, Vijay Nagar Colony, Varanasi cantonment, Varanasi, Uttar Pradesh 221002",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  },
  {
    id: 8,
    date: "1st JUNE",
    city: "Chennai, Tamilnadu",
    venue: "The Vijay Park",
    address: "Plot No 68, Kalpana Square, Puri – Cuttack Road, Buddha Nagar, Bhubaneswar, Odisha 751006",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
  },
  {
    id: 9,
    date: "17 JUNE",
    city: "Bengaluru, Karnataka",
    venue: "JCCA Club",
    address: "NH1, Namaste Chowk Flyover, Pritam Nagar, Sector 14, Karnal, Haryana 132001",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  },
  {
    id: 10,
    date: "8th JUNE",
    city: "Hyderabad, Telangana",
    venue: "Amrutha Castle",
    address: "Suchna Kendra, Sawai Ram Singh Rd, near Jaipur, Dusadon Ka Bagh, Sangram Colony, Ashok Nagar, Jaipur, Rajasthan 302001",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
  },
  {
    id: 11,
    date: "8th JUNE",
    city: "New Delhi, Delhi",
    venue: "Statesman House",
    address: "S 21, 116 H, Parade Kothi Rd, Pared Kothi, Vijay Nagar Colony, Varanasi cantonment, Varanasi, Uttar Pradesh 221002",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
  },
  {
    id: 12,
    date: "1st JUNE",
    city: "Chennai, Tamilnadu",
    venue: "The Vijay Park",
    address: "Plot No 68, Kalpana Square, Puri – Cuttack Road, Buddha Nagar, Bhubaneswar, Odisha 751006",
    image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80",
  },
];

// ── 2024 event data (same structure, reused as placeholder) ─────────────────
const EVENTS_2024 = [
  {
    id: 1,
    date: "22 JUNE",
    city: "Mumbai, Maharashtra",
    venue: "Hotel Grand Hyatt",
    address: "Off Western Express Highway, Santacruz East, Mumbai, Maharashtra 400055",
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80",
  },
  {
    id: 2,
    date: "15 JUNE",
    city: "Kolkata, West Bengal",
    venue: "ITC Sonar",
    address: "JBS Haldane Ave, Kolkata, West Bengal 700046",
    image: "https://images.unsplash.com/photo-1605537964076-bd0b8525cee0?w=800&q=80",
  },
  {
    id: 3,
    date: "10 JUNE",
    city: "Pune, Maharashtra",
    venue: "The Westin Pune",
    address: "36/3-B, Koregaon Park Annex, Mundhwa, Pune, Maharashtra 411036",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
  },
  {
    id: 4,
    date: "5 JUNE",
    city: "Ahmedabad, Gujarat",
    venue: "Hyatt Regency Ahmedabad",
    address: "Judges Bungalow Road, Vastrapur, Ahmedabad, Gujarat 380015",
    image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80",
  },
  {
    id: 5,
    date: "20 MAY",
    city: "Chandigarh",
    venue: "Hotel Mountview",
    address: "Sector 10-B, Chandigarh 160011",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    id: 6,
    date: "18 MAY",
    city: "Indore, Madhya Pradesh",
    venue: "Hotel Sayaji",
    address: "H-1, Scheme No 54, Vijay Nagar, Indore, Madhya Pradesh 452010",
    image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&q=80",
  },
  {
    id: 7,
    date: "12 MAY",
    city: "Lucknow, Uttar Pradesh",
    venue: "Taj Mahal Hotel",
    address: "Vipin Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  },
  {
    id: 8,
    date: "8 MAY",
    city: "Nagpur, Maharashtra",
    venue: "Hotel Centre Point",
    address: "Seminary Hills, Nagpur, Maharashtra 440006",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
  },
];

interface EventCardData {
  id: number;
  date: string;
  city: string;
  venue: string;
  address: string;
  image: string;
}

interface EventCardProps {
  event: EventCardData;
  index: number;
  visible: boolean;
}

// ── Single event card ─────────────────────────────────────────────────────────
function EventCard({ event, index, visible }: EventCardProps) {
  return (
    <div
      className="pes-card relative overflow-hidden rounded-[16px] shrink-0 w-full"
      style={{
        aspectRatio: "3 / 4",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.98)",
        transition: `opacity 0.65s ease ${0.05 + (index % 4) * 0.08}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${0.05 + (index % 4) * 0.08}s`,
      }}
    >
      {/* Background photo + gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src={event.image}
          alt={event.city}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 53.515%)",
          }}
        />
      </div>

      {/* Date badge — top-left, blue rounded-br pill */}
      <div
        className="absolute top-0 left-0 flex items-center px-4 py-2 rounded-br-[28px]"
        style={{ backgroundColor: "#0A6B44" }}
      >
        <span
          className="text-white text-xs sm:text-sm font-semibold whitespace-nowrap"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {event.date}
        </span>
      </div>

      {/* Text overlay — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
        {/* City name */}
        <h3
          className="text-white text-xl sm:text-2xl lg:text-[28px] font-bold leading-tight m-0 line-clamp-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {event.city}
        </h3>
        {/* Venue */}
        <p
          className="text-white text-sm sm:text-base font-semibold leading-tight m-0 truncate"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {event.venue}
        </p>
        {/* Address */}
        <p
          className="text-white/90 text-xs sm:text-sm font-light leading-snug m-0 line-clamp-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {event.address}
        </p>
      </div>
    </div>
  );
}

// ── Mobile card — photo + white caption row ──────────────────────────────────
function CompactEventCard({ event }: { event: EventCardData }) {
  return (
    <article className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,20,45,0.08)]">
      <div className="relative aspect-[2/1] w-full">
        <Image
          src={event.image}
          alt={event.city}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute top-0 left-0 flex items-center rounded-br-2xl px-3 py-1.5"
          style={{ backgroundColor: "#0A6B44" }}
        >
          <span
            className="text-[11px] leading-none font-semibold whitespace-nowrap text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {event.date}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <h3
          className="m-0 min-w-0 truncate text-base leading-tight font-bold text-[#12211C]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {event.city}
        </h3>
        <p
          className="m-0 max-w-[52%] min-w-0 shrink-0 truncate text-xs leading-tight font-medium text-[#4A554F]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {event.venue}
        </p>
      </div>
    </article>
  );
}

interface YearGroupProps {
  year: string;
  events: EventCardData[];
}

// ── Year group block ──────────────────────────────────────────────────────────
function YearGroup({ year, events }: YearGroupProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    <div ref={sectionRef} className="flex flex-col gap-8 md:gap-16">
      {/* Section heading */}
      <h2
        className="pes-heading text-[#12211C] text-[28px] md:text-[36px] font-bold leading-tight m-0"
        style={{
          fontFamily: "'Playfair Display', serif",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.05s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s",
        }}
      >
        {/* "MBBS Abroad Guidance Seminar " in normal weight */}
        <span style={{ fontWeight: 700 }}>MBBS Abroad Guidance Seminar </span>
        {/* Year in green italic */}
        <span
          className="italic"
          style={{ color: "#0E8F5B", fontWeight: 700 }}
        >
          {year}
        </span>
        {/* " — " italic */}
        <span className="italic" style={{ fontWeight: 700 }}>{" \u2014 "}</span>
        {/* "Successfully Conducted" in green italic */}
        <span
          className="italic"
          style={{ color: "#0E8F5B", fontWeight: 700 }}
        >
          Successfully Conducted
        </span>
      </h2>

      {/* ── Mobile: 2 compact cards, "View All" reveals the rest ── */}
      <div className="flex flex-col gap-4 md:hidden">
        <div id={`past-events-${year}`} className="flex flex-col gap-5">
          {(expanded ? events : events.slice(0, 2)).map((event) => (
            <CompactEventCard key={event.id} event={event} />
          ))}
        </div>

        {events.length > 2 && (
          <Button
            fullWidth
            variant="brandOutline"
            size="bare"
            shape="pill"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={`past-events-${year}`}
            className="px-6 py-3 text-sm font-semibold"
          >
            {expanded ? "Show Less" : "View All"}
          </Button>
        )}
      </div>

      {/* ── Tablet / desktop: 4 cols desktop, 3 cols laptop, 2 cols tablet ── */}
      <div className="hidden grid-cols-2 gap-4 md:grid lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            index={i}
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function PreviousEventsSection() {
  return (
    <>
      <style>{`
        .pes-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .pes-card:hover {
          box-shadow: 0 20px 56px rgba(0, 57, 234, 0.20);
          transform: translateY(-4px) scale(1.01) !important;
        }
      `}</style>

      <section className="flex flex-col gap-12 px-[clamp(10px,5.29vw,110px)] py-[clamp(38px,4.5vw,66px)] md:gap-24">
        <YearGroup year="2025" events={EVENTS_2025} />
        <YearGroup year="2024" events={EVENTS_2024} />
      </section>
    </>
  );
}
