"use client";

import { GraduationCap, Compass, PlaneTakeoff, Users, Sparkles } from "lucide-react";

interface EventDescriptionProps {
  title?: string;
}

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: "Academic Orientation",
    text: "Curriculum overview, academic calendar, grading system, and essential guidelines for the 2025–2026 academic session.",
    gradient: "from-brand-green to-brand-forest",
  },
  {
    icon: Compass,
    title: "Cultural Integration",
    text: "Interactive workshop covering conversational Russian, local customs, campus life, and student safety measures.",
    gradient: "from-brand-blue to-brand-royal",
  },
  {
    icon: PlaneTakeoff,
    title: "Logistics & Travel Guidance",
    text: "Comprehensive assistance with student visa documentation, flight bookings, forex management, and hostel accommodations.",
    gradient: "from-brand-green to-brand-blue",
  },
  {
    icon: Users,
    title: "Alumni Mentorship",
    text: "First-hand insights from senior students and alumni, offering practical advice for academic excellence and life in Russia.",
    gradient: "from-brand-blue to-brand-forest-deep",
  },
];

export default function EventDescription({
  title = "Samara State Medical University – Pre-Departure Seminar 2025",
}: EventDescriptionProps) {
  return (
    <section className="w-full px-5 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-20 font-['Inter',sans-serif]">
      <div className="max-w-[1640px] mx-auto flex flex-col gap-10 lg:gap-14">

        {/* ── Main Header Card ── */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-md shadow-black/12 border border-line relative overflow-hidden">
          {/* Subtle gradient accent bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-brand-green via-brand-forest to-brand-blue" />

          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-champagne-soft-bg/50 border border-brand-champagne-soft text-brand-blue text-xs sm:text-sm font-semibold w-fit">
              <Sparkles size={16} />
              <span>Seminar Highlights & Overview</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight font-['Inter',sans-serif]">
              {title}
            </h1>

            <p className="text-body text-base sm:text-lg leading-relaxed font-['Inter',sans-serif]">
              My Study Hub successfully organized the{" "}
              <span className="text-brand-emerald-deep font-semibold">2025 Pre-Departure Seminar</span>{" "}
              for aspiring medical students joining{" "}
              <span className="text-brand-blue font-semibold">
                Samara State Medical University, Russia
              </span>
              . This event marks the beginning of an exciting international medical education journey.
            </p>
          </div>
        </div>

        {/* ── 4 Highlight Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 border border-line shadow-lg shadow-black/4 hover:shadow-lg shadow-brand-champagne/12 hover:-translate-y-1.5 transition-all duration-300 flex flex-col gap-5 relative group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${item.gradient} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-ink font-['Inter',sans-serif]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-body text-sm sm:text-base leading-relaxed font-['Inter',sans-serif]">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Conclusion Banner ── */}
        <div className="rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden bg-linear-to-r from-brand-forest-deep via-brand-royal to-brand-blue shadow-xl">
          <div className="relative z-10 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-brand-champagne-soft font-semibold">
              Looking Forward
            </p>
            <p className="text-base sm:text-xl font-light leading-relaxed font-['Inter',sans-serif]">
              The event concluded with a <strong className="font-semibold text-white">networking lunch and group photo session</strong>, giving students the opportunity to connect with peers and build lifelong friendships. My Study Hub remains dedicated to supporting every student from admission to graduation!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
