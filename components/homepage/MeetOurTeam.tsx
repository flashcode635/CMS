"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TeamMember } from "@/types/interfaces";

// ── Data ──────────────────────────────────────────────────────────────────
// Layout (reference):
//  Row 1–2 : Big card (2×2 span) + 4 small cards (2×2)
//  Row 3   : 4 cards
//  Row 4   : 4 cards

const featured = {
  name: "Dr. Ben Carter",
  role: "Director",
  photo: "/home/team-paul.jpg",
};

const featuredSide = [
  { name: "Dr. Chloe Davis", role: "Chief Counselor",    photo: "/home/team-chloe.jpg" },
  { name: "Dr. Ethan Ford",  role: "Vice Chancellor",    photo: "/home/team-ethan.jpg" },
  { name: "Dr. Kara Lee",    role: "Marketing Director", photo: "/home/team-kara.jpg"  },
  { name: "Dr. Leo Martin",  role: "IT Support",         photo: "/home/team-leo.jpg"   },
];

const bottomRows = [
  [
    { name: "Dr. Nadia Owen", role: "Legal Counsel",         photo: "/home/team-nadia.jpg" },
    { name: "Dr. Paul Quinn", role: "Financial Aid Officer", photo: "/home/team-paul.jpg"  },
    { name: "Dr. Ruth Stone", role: "Research Director",     photo: "/home/team-ruth.jpg"  },
    { name: "Dr. Sam Taylor", role: "HR Manager",            photo: "/home/team-sam.jpg"   },
  ],
  [
    { name: "Dr. Uma Vance",  role: "Event Coordinator",    photo: "/home/team-uma.jpg" },
    { name: "Dr. Will Xu",    role: "Professor of Anatomy", photo: "/home/team-will.jpg" },
    { name: "Dr. Yara Zafar", role: "Head Librarian",       photo: "/home/team-yara.jpg" },
    { name: "Dr. Amy Baker",  role: "Dean of Academics",    photo: "/home/team-amy.jpg"  },
  ],
];

interface CustomTeamMember extends Partial<TeamMember> {
  name: string;
  role: string;
  photo: string;
}

interface MemberCardProps {
  member: CustomTeamMember;
  visible: boolean;
  index: number;
  featured?: boolean;
}

// ── Individual member card ────────────────────────────────────────────────
function MemberCard({ member, visible, index, featured = false }: MemberCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden
        ${featured
          ? "col-span-2 aspect-4/5 md:row-span-2 md:aspect-auto"
          : "aspect-[0.7]"}
        transition-all duration-700 ease-out
        ${visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"}`}
      style={{ transitionDelay: `${0.05 + index * 0.06}s` }}
    >
      {/* Photo */}
      <Image
        src={member.photo}
        alt={member.name}
        fill
        sizes={featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
        className={`object-cover transition-transform duration-600ms ease-out
          ${hovered ? "scale-[1.06]" : "scale-100"}`}
      />

      {/* Black gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,_black_90%,_transparent)_0%,color-mix(in_srgb,_black_45%,_transparent)_28%,transparent_58%)]" />

      {/* Green hover tint */}
      <div
      style={{backgroundImage:` url("")`}}
        className={`absolute inset-0 bg-linear-to-t from-brand-green/20 
          to-transparent
          transition-opacity duration-400ms ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      {/* Text — bottom-left */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-[clamp(2px,0.4vw,6px)] p-[clamp(10px,1.2vw,20px)]">
        {/* accent bar on hover */}
        <div
          className={`h-0.75 rounded-full bg-brand-champagne transition-all duration-400ms
            ${hovered ? "w-[clamp(20px,2vw,36px)]" : "w-0"}`}
        />

        {/* Name */}
        <p
          className={`m-0 font-semibold text-white font-['Inter',sans-serif]
            ${featured
              ? "text-[clamp(22px,2.4vw,40px)] leading-[1.2]"
              : "text-[clamp(13px,1.25vw,20px)] leading-tight"}`}
        >
          {member.name}
        </p>

        {/* Role */}
        <p
          className={`m-0 font-light text-white/80 font-['Inter',sans-serif]
            ${featured
              ? "text-[clamp(11px,1vw,16px)]"
              : "text-[clamp(9px,0.8vw,13px)]"}`}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function MeetOurTeam() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
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
    <section ref={sectionRef} className="bg-linear-to-r from-surface-alt via-surface-alt to-surface-alt">
      {/* ── Header ── */}
      <div className="flex flex-col items-center gap-[clamp(6px,0.42vw,8px)] px-[clamp(20px,4.17vw,80px)] pt-[clamp(32px,3.33vw,64px)]
       pb-[clamp(34px,2.08vw,40px)]">
        <p
          className={`m-0 text-center font-normal uppercase tracking-widest text-brand-champagne-rich
            font-['Inter',sans-serif] text-[clamp(11px,1.04vw,20px)] leading-8
            transition-all duration-700
            ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: "0.18s" }}
        >
          Meet Our Team
        </p>

        <h2
          className={`m-0 text-center font-sub font-bold leading-[1.15] text-[clamp(28px,3.13vw,60px)]
            bg-linear-to-br from-brand-green to-brand-blue bg-clip-text text-transparent
            transition-all duration-700  
            ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: "0.05s" }}
        >
          People Behind Our Success
        </h2>
      </div>

      {/* ── Grid — exactly like reference image ── */}
   <div className="grid grid-cols-2 gap-[clamp(8px,0.9vw,14px)] px-[clamp(24px,8vw,140px)] pb-[clamp(32px,3.33vw,64px)] md:grid-cols-4">
        {/* Big card — 2 cols × 2 rows */}
        <MemberCard member={featured} visible={visible} index={0} featured />

        {/* 2×2 side cards */}
        {featuredSide.map((m, i) => (
          <MemberCard key={m.name} member={m} visible={visible} index={i + 1} />
        ))}

        {/* Bottom rows — 4 + 4 */}
        {bottomRows.flat().map((m, i) => (
          <MemberCard key={m.name} member={m} visible={visible} index={i + 5} />
        ))}
      </div>
    </section>
  );
}