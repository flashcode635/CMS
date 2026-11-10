"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const countries = [
  { id: 1, name: "MBBS in Russia",      flag: "🇷🇺", image: "/home/mbbs-abroad-russia.jpg",      flagImg: "/home/mbbs-abroad-flag-russia.png" },
  { id: 2, name: "MBBS in Georgia",     flag: "🇬🇪", image: "/home/mbbs-abroad-georgia.jpg",     flagImg: null },
  { id: 3, name: "MBBS in Uzbekistan",  flag: "🇺🇿", image: "/home/mbbs-abroad-uzbekistan.jpg",  flagImg: null },
  { id: 4, name: "MBBS in Kyrgyzstan",  flag: "🇰🇬", image: "/home/mbbs-abroad-kyrgyzstan.jpg",  flagImg: null },
  { id: 5, name: "MBBS in Kazakhstan",  flag: "🇰🇿", image: "/home/mbbs-abroad-kazakhstan.jpg",  flagImg: null },
];

const TABS = ["MBBS Abroad", "Study Abroad"]; // Added missing TABS definition

const getFallbackImage = (id: number) => {
  switch (id) {
    case 1:
      return "https://images.unsplash.com/photo-1513622470522-26c314a85ee8?q=80&w=800&auto=format&fit=crop"; // Russia
    case 2:
      return "https://images.unsplash.com/photo-1565019013063-e3805908f906?q=80&w=800&auto=format&fit=crop"; // Georgia
    case 3:
      return "https://images.unsplash.com/photo-1584985223365-502a90429a99?q=80&w=800&auto=format&fit=crop"; // Uzbekistan
    case 4:
      return "https://images.unsplash.com/photo-1549880816-16f0ce354898?q=80&w=800&auto=format&fit=crop"; // Kyrgyzstan
    case 5:
      return "https://images.unsplash.com/photo-1558588942-930faae5a389?q=80&w=800&auto=format&fit=crop"; // Kazakhstan
    default:
      return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"; // Generic Medical
  }
};

type CountryCardProps = {
  country: {
    id: number;
    name: string;
    flag: string;
    image: string;
    flagImg: string | null;
  };
  visible: boolean;
  index: number;
};

const CountryCard = ({ country }: CountryCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [flagError, setFlagError] = useState(false);

  return (
    <div className="group relative w-full sm:75 md:w-92 h-80 rounded-[36px] overflow-hidden shadow-2xl bg-brand-forest-deep shrink-0 snap-center cursor-pointer">
      
      {/* Background Image with Fallback */}
      <img 
        src={imgError ? getFallbackImage(country.id) : country.image}
        onError={() => setImgError(true)}
        alt={country.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Top Gradient to ensure Country Name legibility at the top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black/80 via-black/30 to-transparent pointer-events-none z-0" />

      {/* Light gradient from bottom to ensure legibility if glass panel fails */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Country Name (Moved to Top Left) */}
      <div className="absolute top-8 left-6 z-10 pointer-events-none pr-6">
        <h3 className="text-white text-3xl font-bold tracking-tight drop-shadow-lg shadow-black/40">
          {country.name}
        </h3>
         {/* Flag Handling (Image vs Emoji) */}
          <div className="drop-shadow-lg">
            {country.flagImg && !flagError ? (
              <img 
                src={country.flagImg} 
                onError={() => setFlagError(true)}
                alt={`${country.name} flag`}
                className="w-12 h-auto rounded-sm object-cover shadow-sm mb-1"
              />
            ) : (
              <span className="text-5xl block leading-none mb-1">{country.flag}</span>
            )}
          </div>
      </div>

      {/* Apple-style Whiteish Translucent Glassmorphism Bottom Panel */}
      <div className="absolute bottom-4 left-4 right-4 rounded-full bg-white/0 backdrop-blur-none border border-white/0 p-0 flex flex-col items-center shadow-lg shadow-black/15 overflow-hidden transition-all duration-300 group-hover:bg-white/0 z-10">
        
        {/* Content Container */}
        <div className="flex flex-col items-center text-center gap-3 w-full transform transition-transform duration-500 group-hover:-translate-y-1">
          
        
          {/* Apply Now Button */}
          <Button
            variant="unstyled"   // default primary ka bg-slate-900 / dark:bg-surface hataane ke liye
            size="lg"             // px-6 aur [&_svg]:size-5 (w-5 h-5 se match) already milta hai
            fullWidth
            aria-label={`Apply for ${country.name}`}
            className="
              group/btn relative overflow-hidden
              h-auto! rounded-full! text-[17px]!
              bg-brand-forest-deep/40! backdrop-blur-md border border-white/20
              text-white font-semibold p-4
              transition-all duration-300 ease-out
              hover:bg-brand-champagne-rich! hover:border-brand-champagne-rich hover:text-white
              hover:shadow-lg shadow-cyan-500/90
              active:scale-95
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm">
              Apply Now
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export default function MBBSAbroad() {
  const sectionRef = useRef<HTMLElement | null>(null); // Added TS typing for useRef
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0); 

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

  return (
    <>
      <style>{`
        
        .ma-title { opacity: 0; }
        .ma-title.in { animation: sp-fade-up 0.8s 0.05s forwards cubic-bezier(0.22,1,0.36,1); }
        .ma-sub { opacity: 0; }
        .ma-sub.in { animation: sp-fade-up 0.7s 0.18s forwards cubic-bezier(0.22,1,0.36,1); }
        .ma-tabs { opacity: 0; }
        .ma-tabs.in { animation: sp-fade-up 0.7s 0.28s forwards cubic-bezier(0.22,1,0.36,1); }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          backgroundColor: "var(--color-surface-alt)",
          padding: "clamp(32px,3.33vw,64px) clamp(20px,4.17vw,80px)",
        }}
      >
        <div style={{ maxWidth: "1480px", margin: "0 auto", display: "flex", flexDirection: "column",
           gap: "clamp(24px,2.5vw,48px)" }}>

          {/* ── Header ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.25vw,24px)" }}>
            <h2
              className={`ma-title${visible ? " in" : ""} font-bold`}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: "clamp(28px,3.33vw,64px)",
                lineHeight: "clamp(32px,2.71vw,52px)",
                backgroundImage: "linear-gradient(167deg, var(--color-brand-forest) 12.7%, var(--color-brand-forest-deep) 87.2%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
              }}
            >
              Study MBBS Abroad
            </h2>

            <p
              className={`ma-sub${visible ? " in" : ""} font-normal`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: "clamp(12px,0.83vw,16px)",
                lineHeight: "24px",
                color: "var(--color-body)",
                margin: 0,
              }}
            >
              Building trust through years of experience, expert guidance, and proven results to help students 
              achieve their dreams.
            </p>
          </div>

          {/* ── Tab toggles ── */}
          <div
            className={`ma-tabs${visible ? " in" : ""}`}
            style={{ display: "flex", gap: "clamp(10px,1.11vw,21.333px)", alignItems: "center" }}
          >
            {TABS.map((tab, i) => {
              const isActive = activeTab === i;
              return (
                <Button variant="unstyled"
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className="shadow-none border-0"
                  style={{
                    height: "clamp(36px,3.33vw,64px)",
                    padding: "0 clamp(12px,0.69vw,13.333px)",
                    minWidth: "clamp(100px,10.16vw,195px)",
                    borderRadius: "200px",
                    border: isActive ? "none" : "1.333px solid var(--color-brand-forest)",
                    cursor: "pointer",
                    backgroundImage: isActive
                      ? "linear-gradient(136deg, var(--color-brand-forest) 12.7%, var(--color-brand-forest-deep) 87.2%)"
                      : "none",
                    backgroundColor: isActive ? "transparent" : "transparent",
                    transition: "all 0.25s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    className="font-semibold"
                    style={
                      isActive
                        ? {
                            fontFamily: 'var(--font-body)',
                            fontSize: "clamp(12px,1.11vw,21.333px)",
                            lineHeight: "clamp(18px,1.53vw,29.333px)",
                            color: "white",
                            whiteSpace: "nowrap",
                          }
                        : {
                            fontFamily: 'var(--font-body)',
                            fontSize: "clamp(12px,1.11vw,21.333px)",
                            lineHeight: "clamp(18px,1.53vw,29.333px)",
                            backgroundImage: "linear-gradient(162deg, var(--color-brand-forest) 12.7%, var(--color-brand-forest-deep) 87.2%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            whiteSpace: "nowrap",
                          }
                    }
                  >
                    {tab}
                  </span>
                </Button>
              );
            })}
          </div>

          {/* ── Country cards grid ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
            style={{
              rowGap: "clamp(16px, 1.8vw, 32px)",
              columnGap: "clamp(12px, 1vw, 16px)",
            }}
          >
            {countries.map((country, i) => (
              <CountryCard
                key={country.id}
                country={country}
                visible={visible}
                index={i}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
