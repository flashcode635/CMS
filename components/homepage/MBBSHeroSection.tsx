"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  Wallet,
  ClipboardList,
  CalendarDays,
  Building2,
  Users,
  BadgeCheck,
  IndianRupee,
  PlayCircle,
  MessageCircle,
  ChevronDown,
  Globe,
  Plane,
  Pill,
  Dna,
  UserCheck,
} from "lucide-react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

interface FloatingIconProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// ─── Floating Medical Icon ────────────────────────────────────────────────────
function FloatingIcon({ children, className = "", delay = 0 }: FloatingIconProps) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        animation: `floatY ${3 + delay * 0.5}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Globe SVG ────────────────────────────────────────────────────────────────
function GlobeSVG() {
  return (
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="globeGrad" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#0E8F5B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B3B2E" stopOpacity="0.15" />
        </radialGradient>
        <radialGradient id="globeCore" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(216,178,110,0.08)" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="148" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="url(#globeGrad)" />
      <circle cx="160" cy="160" r="148" stroke="rgba(74,222,128,0.2)" strokeWidth="0.5" fill="none" />
      <circle cx="160" cy="160" r="155" stroke="rgba(14,143,91,0.1)" strokeWidth="1" fill="none" style={{ animation: "ringPulse 3s ease-in-out infinite" }} />
      <circle cx="160" cy="160" r="162" stroke="rgba(216,178,110,0.07)" strokeWidth="1" fill="none" style={{ animation: "ringPulse 3.5s ease-in-out infinite", animationDelay: "0.5s" }} />
      <circle cx="160" cy="160" r="128" fill="url(#globeCore)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {[40, 80, 110, 130, 145, 160, 175, 195, 220, 250, 280].map((cy, i) => {
        const r = Math.sqrt(Math.max(0, 128 * 128 - (cy - 160) * (cy - 160)));
        if (r < 5) return null;
        return <ellipse key={i} cx="160" cy={cy} rx={r} ry={r * 0.28} stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" fill="none" />;
      })}
      {[0, 30, 60, 90, 120, 150].map((deg, i) => (
        <ellipse key={i} cx="160" cy="160" rx={128 * Math.abs(Math.cos((deg * Math.PI) / 180))} ry="128"
          stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" fill="none" transform={`rotate(${deg}, 160, 160)`} />
      ))}
      <g opacity="0.38">
        <ellipse cx="120" cy="130" rx="28" ry="18" fill="#0E8F5B" transform="rotate(-15,120,130)" />
        <ellipse cx="155" cy="125" rx="18" ry="14" fill="#0E8F5B" transform="rotate(10,155,125)" />
        <ellipse cx="195" cy="140" rx="22" ry="15" fill="#0E8F5B" transform="rotate(-8,195,140)" />
        <ellipse cx="130" cy="175" rx="20" ry="12" fill="#0E8F5B" transform="rotate(20,130,175)" />
        <ellipse cx="175" cy="165" rx="25" ry="10" fill="#0E8F5B" transform="rotate(-5,175,165)" />
        <ellipse cx="210" cy="170" rx="12" ry="8" fill="#0E8F5B" />
      </g>
      <ellipse cx="128" cy="118" rx="38" ry="22" fill="rgba(255,255,255,0.08)" transform="rotate(-25,128,118)" />
      <ellipse cx="160" cy="160" rx="148" ry="40" stroke="rgba(74,222,128,0.18)" strokeWidth="1" fill="none" strokeDasharray="4 6" transform="rotate(-20,160,160)" />
      <circle cx="57" cy="130" r="5" fill="#0E8F5B" opacity="0.85" />
      <circle cx="57" cy="130" r="9" fill="#0E8F5B" opacity="0.2" />
    </svg>
  );
}

interface IconBubbleProps {
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  bgColor: string;
  strokeColor: string;
  size?: number;
}

// ─── Floating deco icon bubble ────────────────────────────────────────────────
function IconBubble({ icon: Icon, bgColor, strokeColor, size = 52 }: IconBubbleProps) {
  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: bgColor,
        border: `1px solid ${strokeColor}`,
      }}
    >
      <Icon size={size * 0.42} color="white" strokeWidth={1.5} />
    </div>
  );
}

interface CountryBadgeProps {
  code: string;
  name: string;
  delay: number;
}

// ─── Country Badge ────────────────────────────────────────────────────────────
function CountryBadge({ code, name, delay }: CountryBadgeProps) {
  return (
    <div
      className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium"
      style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: `${delay}s`, opacity: 0 }}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border border-white/30"
        style={{ background: "rgba(255,255,255,0.15)", fontSize: "10px", minWidth: "20px" }}
      >
        {code}
      </span>
      <span>{name}</span>
    </div>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  iconColor: string;
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, iconColor, value, suffix, label, delay }: StatCardProps) {
  return (
    <div
      className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-5 text-white text-center min-w-[130px]"
      style={{ animation: "fadeSlideUp 0.7s ease forwards", animationDelay: `${delay}s`, opacity: 0 }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center mb-1"
        style={{ background: iconColor }}
      >
        <Icon size={18} color="white" strokeWidth={1.8} />
      </div>
      <div className="text-3xl font-bold tracking-tight leading-none">
        <AnimatedCounter target={value} suffix={suffix} />
      </div>
      <div className="text-xs text-white/70 font-medium uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  iconBg: string;
  label: string;
  value: string;
  animDelay: string;
  className?: string;
}

// ─── Info Card (Globe) ────────────────────────────────────────────────────────
function InfoCard({ icon: Icon, iconBg, label, value, animDelay, className = "" }: InfoCardProps) {
  return (
    <div
      className={`absolute flex items-center gap-3 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl px-5 py-4 text-white shadow-2xl ${className}`}
      style={{ animation: "badgePop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards", animationDelay: animDelay, opacity: 0, minWidth: "182px" }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: iconBg }}>
        <Icon size={18} color="white" strokeWidth={1.8} />
      </div>
      <div>
        <div className="text-xs text-white/60 font-medium">{label}</div>
        <div className="text-sm font-bold">{value}</div>
      </div>
    </div>
  );
}

interface ParticleProps {
  style: React.CSSProperties;
}

// ─── Particle ─────────────────────────────────────────────────────────────────
function Particle({ style }: ParticleProps) {
  return <div className="absolute rounded-full pointer-events-none" style={style} />;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MBBSHeroSection() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMouseX((e.clientX - rect.left) / rect.width - 0.5);
      setMouseY((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    const el = heroRef.current;
    if (el) el.addEventListener("mousemove", handleMouse as unknown as EventListener);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (el) el.removeEventListener("mousemove", handleMouse as unknown as EventListener);
    };
  }, []);

  const particles = Array.from({ length: 28 }, (_, i) => ({
    left: `${(i * 37 + 5) % 100}%`,
    top: `${(i * 53 + 10) % 100}%`,
    width: `${2 + (i % 5)}px`,
    height: `${2 + (i % 5)}px`,
    background:
      i % 3 === 0
        ? "rgba(14,143,91,0.55)"
        : i % 3 === 1
        ? "rgba(216,178,110,0.5)"
        : "rgba(255,255,255,0.22)",
    animation: `particleDrift ${6 + (i % 8)}s ease-in-out infinite`,
    animationDelay: `${(i * 0.4) % 6}s`,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

        @keyframes floatY {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes floatY2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-3deg); }
        }
        @keyframes particleDrift {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.6; }
          33% { transform: translate(12px,-16px) scale(1.3); opacity: 1; }
          66% { transform: translate(-8px,12px) scale(0.8); opacity: 0.4; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes planeFly {
          0%   { transform: translateX(-60px) translateY(10px) rotate(-5deg); opacity: 0; }
          10%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateX(200px) translateY(-32px) rotate(6deg); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(14,143,91,0.5), 0 8px 32px rgba(14,143,91,0.4); }
          50%      { box-shadow: 0 0 0 10px rgba(14,143,91,0), 0 12px 40px rgba(14,143,91,0.65); }
        }
        @keyframes shimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        @keyframes waveScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes badgePop {
          0%  { opacity: 0; transform: scale(0.75) translateY(12px); }
          70% { transform: scale(1.05) translateY(-2px); }
          100%{ opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes orbitDot {
          from { transform: rotate(0deg)   translateX(74px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(74px) rotate(-360deg); }
        }
        @keyframes orbitDot2 {
          from { transform: rotate(120deg) translateX(74px) rotate(-120deg); }
          to   { transform: rotate(480deg) translateX(74px) rotate(-480deg); }
        }
        @keyframes ringPulse {
          0%,100% { opacity: 0.3; transform: scale(1); }
          50%      { opacity: 0.12; transform: scale(1.06); }
        }
        @keyframes scrollBounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(6px); }
        }
        @keyframes onlinePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.6); }
          50%      { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
        }

        .hero-section { font-family: 'Inter', sans-serif; }
        .dm-serif    { font-family: 'Playfair Display', serif; }
        .shimmer-text {
          background: linear-gradient(90deg,#ffffff 0%,#D8B26E 25%,#ffffff 50%,#E8D7B0 75%,#ffffff 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <section
        ref={heroRef}
        className="hero-section relative overflow-hidden"
        style={{
          width: "1920px",
          height: "1009.33px",
          background: "linear-gradient(130deg,#072A21 0%,#0A6B44 18%,#0E8F5B 35%,#0B3B2E 65%,#0B3B2E 100%)",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* ── Background radial overlays ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(14,143,91,0.3) 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 70% at 88% 40%, rgba(216,178,110,0.4) 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 40% at 50% 95%, rgba(0,0,0,0.28) 0%, transparent 60%)" }} />
        </div>

        {/* ── Grid overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Particles ── */}
        {particles.map((p, i) => <Particle key={i} style={p} />)}

        {/* ── Animated wave bottom ── */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ height: "90px" }}>
          <svg viewBox="0 0 3840 90" xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0"
            style={{ width: "200%", animation: "waveScroll 14s linear infinite" }}>
            <path d="M0,45 C320,80 640,10 960,45 C1280,80 1600,10 1920,45 C2240,80 2560,10 2880,45 C3200,80 3520,10 3840,45 L3840,90 L0,90 Z" fill="rgba(255,255,255,0.05)" />
            <path d="M0,60 C480,28 960,82 1440,55 C1920,28 2400,80 2880,55 C3360,28 3600,70 3840,50 L3840,90 L0,90 Z" fill="rgba(255,255,255,0.03)" />
          </svg>
        </div>

        {/* ── Floating decorative icon bubbles ── */}
        <FloatingIcon className="left-[6%] top-[12%]" delay={0}>
          <IconBubble icon={GraduationCap} size={56} bgColor="rgba(255,255,255,0.1)" strokeColor="rgba(255,255,255,0.28)" />
        </FloatingIcon>
        <FloatingIcon className="left-[3%] top-[57%]" delay={1.5}>
          <IconBubble icon={Pill} size={46} bgColor="rgba(216,178,110,0.2)" strokeColor="rgba(216,178,110,0.4)" />
        </FloatingIcon>
        <FloatingIcon className="right-[5%] top-[16%]" delay={0.8}>
          <IconBubble icon={Dna} size={46} bgColor="rgba(216,178,110,0.18)" strokeColor="rgba(216,178,110,0.38)" />
        </FloatingIcon>
        <FloatingIcon className="right-[3%] bottom-[22%]" delay={2}>
          <IconBubble icon={Stethoscope} size={50} bgColor="rgba(14,143,91,0.2)" strokeColor="rgba(14,143,91,0.4)" />
        </FloatingIcon>
        <FloatingIcon className="left-[13%] bottom-[18%]" delay={1.2}>
          <IconBubble icon={Globe} size={38} bgColor="rgba(255,255,255,0.08)" strokeColor="rgba(255,255,255,0.2)" />
        </FloatingIcon>

        {/* ── Flying planes (Lucide Plane icon via SVG inline) ── */}
        <div
          className="absolute top-[20%] pointer-events-none"
          style={{ left: "9%", animation: "planeFly 10s ease-in-out infinite", animationDelay: "1.5s" }}
        >
          <Plane size={38} color="rgba(255,255,255,0.75)" strokeWidth={1.4} style={{ transform: "rotate(-30deg)" }} />
        </div>
        <div
          className="absolute top-[60%] pointer-events-none"
          style={{ left: "28%", animation: "planeFly 13s ease-in-out infinite", animationDelay: "5.5s" }}
        >
          <Plane size={24} color="rgba(255,255,255,0.38)" strokeWidth={1.4} style={{ transform: "rotate(-30deg)" }} />
        </div>

        {/* ══════════════════════════════════════════════
            MAIN LAYOUT
        ══════════════════════════════════════════════ */}
        <div className="relative z-10 flex h-full">

          {/* ── LEFT CONTENT ─────────────────────────────── */}
          <div className="flex flex-col justify-center pl-24 pr-10 w-[52%] h-full">

            {/* Top badge */}
            <div
              className="flex items-center gap-3 mb-8"
              style={{ animation: "fadeSlideUp 0.5s ease forwards", opacity: 0 }}
            >
              <div
                className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-5 py-2.5 text-white text-sm font-semibold"
                style={{ animation: "pulseGlow 3s ease-in-out infinite" }}
              >
                <Stethoscope size={16} color="white" strokeWidth={1.8} />
                <span>World-Class Medical Education</span>
              </div>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg,rgba(255,255,255,0.5),transparent)" }} />
            </div>

            {/* Headline */}
            <div
              className="mb-6"
              style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.15s", opacity: 0 }}
            >
              <div className="dm-serif text-white/78 text-3xl italic mb-1 tracking-wide">
                Your Dream Career Starts Here
              </div>
              <h1 className="text-white font-black leading-[1.05] tracking-tight" style={{ fontSize: "76px" }}>
                Study <span className="shimmer-text">MBBS</span>
                <br />
                <span style={{ fontSize: "68px" }}>Abroad</span>
              </h1>
            </div>

            {/* Subheading */}
            <p
              className="text-white/75 text-lg font-light leading-relaxed max-w-[520px] mb-10"
              style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.3s", opacity: 0 }}
            >
              Join{" "}
              <span className="text-brand-champagne-soft font-semibold">10,000+ Indian students</span>{" "}
              who chose globally recognised universities across Russia, Kazakhstan, China,
              Philippines & beyond — with full NMC / WHO approval.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap items-center gap-4 mb-12"
              style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.45s", opacity: 0 }}
            >
              <Button variant="brand"
                className="relative overflow-hidden text-white font-bold text-base px-10 py-4 rounded-2xl transition-all duration-300 hover:scale-105 h-auto"
                style={{
                  background: "linear-gradient(135deg,#0E8F5B,#0E8F5B)",
                  boxShadow: "0 8px 32px rgba(14,143,91,0.45),inset 0 1px 0 rgba(255,255,255,0.2)",
                  animation: "pulseGlow 3.5s ease-in-out infinite",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 16px 48px rgba(14,143,91,0.65),inset 0 1px 0 rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(14,143,91,0.45),inset 0 1px 0 rgba(255,255,255,0.2)")}
              >
                <span className="flex items-center gap-2.5">
                  <GraduationCap size={18} color="white" strokeWidth={2} />
                  Apply Now – Free Counselling
                </span>
              </Button>

              <Button variant="glass"
                className="flex items-center gap-2.5 text-white font-semibold text-base px-8 py-4 rounded-2xl border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/15 h-auto shadow-none"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <PlayCircle size={16} color="white" strokeWidth={1.8} />
                </span>
                Watch Success Stories
              </Button>
            </div>

            {/* Country badges */}
            <div
              className="flex flex-wrap items-center gap-3 mb-12"
              style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.55s", opacity: 0 }}
            >
              <span className="text-white/50 text-xs uppercase tracking-widest font-medium mr-1">Top Destinations:</span>
              <CountryBadge code="RU" name="Russia"      delay={0.6} />
              <CountryBadge code="KZ" name="Kazakhstan"  delay={0.7} />
              <CountryBadge code="CN" name="China"       delay={0.8} />
              <CountryBadge code="PH" name="Philippines" delay={0.9} />
              <CountryBadge code="GE" name="Georgia"     delay={1.0} />
              <CountryBadge code="UZ" name="Uzbekistan"  delay={1.1} />
            </div>

            {/* Stat Cards */}
            <div
              className="flex flex-wrap items-stretch gap-4"
              style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.7s", opacity: 0 }}
            >
              <StatCard icon={Building2}   iconColor="rgba(14,143,91,0.55)"   value={450} suffix="+"  label="Partner Universities" delay={0.8} />
              <StatCard icon={BadgeCheck}  iconColor="rgba(74,222,128,0.45)" value={98}  suffix="%"  label="NMC Approved"         delay={0.9} />
              <StatCard icon={Users}       iconColor="rgba(216,178,110,0.5)"   value={10}  suffix="K+" label="Students Placed"      delay={1.0} />
              <StatCard icon={IndianRupee} iconColor="rgba(251,191,36,0.5)"  value={3}   suffix="L+" label="Starting Fee/Yr"      delay={1.1} />
            </div>
          </div>

          {/* ── RIGHT VISUAL ──────────────────────────────── */}
          <div
            className="relative flex items-center justify-center w-[48%] h-full pr-16"
            style={{ animation: "fadeSlideLeft 0.8s ease forwards", animationDelay: "0.3s", opacity: 0 }}
          >
            {/* Glow orb */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "520px",
                height: "520px",
                borderRadius: "50%",
                background: "radial-gradient(circle,rgba(14,143,91,0.22) 0%,rgba(216,178,110,0.14) 60%,transparent 80%)",
                filter: "blur(42px)",
                transform: `translate(${mouseX * 20}px,${mouseY * 15}px)`,
                transition: "transform 0.3s ease",
              }}
            />

            {/* Globe */}
            <div
              className="relative"
              style={{
                width: "480px",
                height: "480px",
                transform: `translate(${mouseX * -12}px,${mouseY * -8}px)`,
                transition: "transform 0.4s ease",
              }}
            >
              <GlobeSVG />

              {/* Orbiting dots */}
              <div className="absolute" style={{ top: "50%", left: "50%", width: 0, height: 0 }}>
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "10px", height: "10px",
                    background: "#0E8F5B",
                    top: "-5px", left: "-5px",
                    animation: "orbitDot 6s linear infinite",
                    boxShadow: "0 0 8px rgba(14,143,91,0.85)",
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "7px", height: "7px",
                    background: "#0B3B2E",
                    top: "-3.5px", left: "-3.5px",
                    animation: "orbitDot2 8s linear infinite",
                    boxShadow: "0 0 6px rgba(216,178,110,0.85)",
                  }}
                />
              </div>

              {/* Info cards pinned to globe */}
              <InfoCard
                icon={ShieldCheck}
                iconBg="rgba(14,143,91,0.35)"
                label="Recognised by"
                value="NMC / WHO / MCI"
                animDelay="1.1s"
                className="-left-16 top-16"
              />
              <InfoCard
                icon={IndianRupee}
                iconBg="rgba(216,178,110,0.35)"
                label="Fees Starting"
                value="₹3 Lakh / Year"
                animDelay="1.3s"
                className="-right-20 top-1/3"
              />
              <InfoCard
                icon={ClipboardList}
                iconBg="rgba(139,92,246,0.35)"
                label="Eligibility"
                value="NEET Qualified"
                animDelay="1.5s"
                className="-left-12 bottom-20"
              />
              <InfoCard
                icon={CalendarDays}
                iconBg="rgba(249,115,22,0.35)"
                label="Duration"
                value="5+1 Yr Program"
                animDelay="1.7s"
                className="right-[-80px] bottom-28"
              />
            </div>

            {/* Live counsellor widget */}
            <div
              className="absolute bottom-14 left-8 flex items-center gap-3 backdrop-blur-xl border border-white/20 rounded-3xl px-5 py-4 text-white shadow-xl"
              style={{
                background: "rgba(255,255,255,0.12)",
                animation: "badgePop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards",
                animationDelay: "1.9s",
                opacity: 0,
              }}
            >
              <div className="relative">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#0E8F5B,#0A6B44)" }}
                >
                  <UserCheck size={20} color="white" strokeWidth={1.8} />
                </div>
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-brand-emerald border-2 border-white/30"
                  style={{ animation: "onlinePulse 2s ease-in-out infinite" }}
                />
              </div>
              <div>
                <div className="text-xs text-white/60">Expert Counsellor</div>
                <div className="text-sm font-semibold flex items-center gap-1.5">
                  Available Now
                  <span className="inline-block w-2 h-2 rounded-full bg-brand-emerald" style={{ animation: "onlinePulse 2s ease-in-out infinite" }} />
                </div>
              </div>
              <Button variant="brandSolid" className="ml-2 bg-brand-emerald hover:bg-brand-emerald-deep transition-colors text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 h-auto shadow-none">
                <MessageCircle size={13} color="white" strokeWidth={2} />
                Chat
              </Button>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className="absolute left-1/2 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase"
          style={{
            bottom: "18px",
            animation: "scrollBounce 2s ease-in-out infinite, fadeSlideUp 1s ease forwards",
            animationDelay: "0s, 2s",
            opacity: 0,
          }}
        >
          <span>Scroll to explore</span>
          <ChevronDown size={16} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
        </div>
      </section>
    </>
  );
}