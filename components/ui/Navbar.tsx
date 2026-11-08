"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Stethoscope, ChevronRight, Search, X, Globe } from "lucide-react";
import {
  AboutDropdown,
  CollectionsDropdown,
  GalleryDropdown,
  BaseDropdownProps,
  ABOUT_ITEMS,
  COLLECTIONS_ITEMS,
  GALLERY_ITEMS,
} from "./NavDropdown";
import { Button } from "@/components/ui/Button";

const BASE_FLAG_URL = "https://flagcdn.com/w320";

export interface CountryItem {
  id: number;
  name: string;
  flag: string;
  colleges: string[];
  emoji?: string;
}

const COUNTRIES_DATA: CountryItem[] = [
  { id:1,  name:"MBBS in Russia",   
        flag:`${BASE_FLAG_URL}/ru.png`,  colleges:["Kazan Federal University","Bashkir State Medical University","Kursk State Medical University","Crimea Federal University","Altai State Medical University"] },
  { id:2,  name:"MBBS in India",        flag:`${BASE_FLAG_URL}/in.png`,  colleges:["AIIMS New Delhi","CMC Vellore","JIPMER Puducherry","Maulana Azad Medical College","Grant Medical College"] },
  { id:3,  name:"MBBS in China",        flag:`${BASE_FLAG_URL}/cn.png`,  colleges:["Peking University Health Science Center","Fudan University Shanghai Medical College","Zhejiang University School of Medicine","Sun Yat-sen University","Tongji Medical College"] },
  { id:4,  name:"MBBS in Ukraine",      flag:`${BASE_FLAG_URL}/ua.png`,  colleges:["Bogomolets National Medical University","Kharkiv National Medical University","Danylo Halytsky Lviv National Medical University","Vinnytsya National Medical University","Zaporizhzhia State Medical University"] },
  { id:5,  name:"MBBS in Philippines",  flag:`${BASE_FLAG_URL}/ph.png`,  colleges:["University of Santo Tomas","University of the Philippines Manila","De La Salle Medical and Health Sciences Institute","Our Lady of Fatima University","Davao Medical School Foundation"] },
  { id:6,  name:"MBBS in Bangladesh",   flag:`${BASE_FLAG_URL}/bd.png`,  colleges:["Dhaka Medical College","Sir Salimullah Medical College","Chittagong Medical College","Rajshahi Medical College","Mymensingh Medical College"] },
  { id:7,  name:"MBBS in Kyrgyzstan",   flag:`${BASE_FLAG_URL}/kg.png`,  colleges:["Kyrgyz State Medical Academy","International School of Medicine","Osh State University Faculty of Medicine","Asian Medical Institute","Jalal-Abad State University"] },
  { id:8,  name:"MBBS in Nepal",        flag:`${BASE_FLAG_URL}/np.png`,  colleges:["Tribhuvan University Institute of Medicine","BP Koirala Institute of Health Sciences","Kathmandu University School of Medical Sciences","Manipal College of Medical Sciences","Nobel Medical College"] },
  { id:10, name:"MBBS in Georgia",      flag:`${BASE_FLAG_URL}/ge.png`,  colleges:["Tbilisi State Medical University","David Tvildiani Medical University","Caucasus International University","New Vision University","Geomedi University"] },
  { id:11, name:"MBBS in Armenia",      flag:`${BASE_FLAG_URL}/am.png`,  colleges:["Yerevan State Medical University","Mkhitar Heratsi Medical University","European Regional Academy","Armenian Medical Institute","Haybusak University"] },
  { id:12, name:"MBBS in Uzbekistan",   flag:`${BASE_FLAG_URL}/uz.png`,  colleges:["Tashkent Medical Academy","Samarkand State Medical Institute","Andijan State Medical Institute","Bukhara State Medical Institute","Fergana Medical Institute"] },
  { id:13, name:"MBBS in Kazakhstan",   flag:`${BASE_FLAG_URL}/kz.png`,  colleges:["Kazakh National Medical University","Astana Medical University","Karaganda Medical University","South Kazakhstan Medical Academy","Semey Medical University"] },
  { id:14, name:"MBBS in Tajikistan",   flag:`${BASE_FLAG_URL}/tj.png`,  colleges:["Avicenna Tajik State Medical University","Tajik Medical University","Russian-Tajik Slavonic University Medical Faculty","Institute of Postgraduate Medical Education","Khatlon State Medical University"] },
];

interface FlagIconProps {
  src: string;
  emoji?: string;
  alt: string;
  size?: number;
}

function FlagIcon({ src, emoji, alt, size = 26 }: FlagIconProps) {
  const [err, setErr] = useState<boolean>(false);
  if (err) {
    return (
      <span style={{ display:"flex", alignItems:"center", justifyContent:"center", width:size, height:size, borderRadius:5, background:"var(--color-brand-champagne-soft-bg)", fontSize:size*0.52, flexShrink:0, userSelect:"none" }} aria-label={alt}>
        {emoji || "🏳️"}
      </span>
    );
  }
  return (
    <div style={{ position:"relative", width:size, height:size, borderRadius:5, background:"var(--color-brand-champagne-soft-bg)", flexShrink:0, overflow:"hidden" }}>
      <Image src={src} alt={alt} fill style={{ objectFit:"cover" }} onError={() => setErr(true)} sizes={`${size}px`} />
    </div>
  );
}
export const bgColor= "bg-brand-forest-deep/96";

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function CountriesPanel({ onClose, onEnter, onLeave }: BaseDropdownProps) {
  
  const [searchQuery,    setSearchQuery]    = useState<string>("");
  const [searchFocused,  setSearchFocused]  = useState<boolean>(false);
  const [hoveredCountry, setHoveredCountry] = useState<CountryItem | null>(null);
  const searchWrapRef                       = useRef<HTMLDivElement | null>(null);
  const clearTimer                          = useRef<NodeJS.Timeout | null>(null);

  const filtered = searchQuery.trim()
    ? COUNTRIES_DATA.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : COUNTRIES_DATA;

  useEffect(() => {
    const h = (e: MouseEvent | Event) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) setSearchFocused(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    if (hoveredCountry && !filtered.find(c => c.id === hoveredCountry.id)) setHoveredCountry(null);
  }, [filtered, hoveredCountry]);

  const scheduleHide = () => { clearTimer.current = setTimeout(() => setHoveredCountry(null), 120); };
  const cancelHide   = () => { if (clearTimer.current) clearTimeout(clearTimer.current); };
  const setCountry   = (c: CountryItem) => { cancelHide(); setHoveredCountry(c); };
  useEffect(() => () => { if (clearTimer.current) clearTimeout(clearTimer.current); }, []);

  const searchExpanded = searchFocused || searchQuery.length > 0;
  return (
    <div
    className={`d-panel ${bgColor}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      role="dialog"
      aria-label="Countries mega-menu"
      style={{
        position:             "absolute",
        top:                  "calc(100% + 10px)",
        left:                 "50%",
        transform:            "translateX(-50%)",
        zIndex:               9999,
        width:                780,
        maxWidth:             "calc(100vw - 24px)",
        backdropFilter:       "blur(24px) saturate(1.5)",
        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        borderRadius:         18,
        border:               "1px solid color-mix(in srgb, var(--color-brand-champagne-soft) 13%, transparent)",
        boxShadow:            "0 20px 50px -8px color-mix(in srgb, var(--color-brand-forest-deep) 70%, transparent)",
        padding:              16,
        animation:            "sp-center-in 0.17s ease forwards",
        fontFamily:           "'Inter','Inter',sans-serif",
        pointerEvents:        "auto",
      }}
    >
      <div style={{ display:"flex", gap:12, alignItems:"stretch" }}>

        <div style={{ display:"flex", flexDirection:"column", gap:8, width:185, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, height:44, padding:"0 11px", borderRadius:11, background:"color-mix(in srgb, white 7%, transparent)", border:"1px solid color-mix(in srgb, white 12%, transparent)", cursor:"pointer", position:"relative", overflow:"hidden" }}>
            <span style={{ width:28, height:28, borderRadius:6, background:"color-mix(in srgb, white 15%, transparent)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"white" }}>
              <GraduationCap size={15} strokeWidth={1.8} />
            </span>
            <span style={{ fontSize:13, fontWeight:500, color:"white", whiteSpace:"nowrap" }}>Study Abroad</span>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:10, height:44, padding:"0 11px", borderRadius:11, backgroundImage:"linear-gradient(147.53deg,var(--color-brand-forest) 12.704%,var(--color-brand-forest-deep) 87.17%)", cursor:"pointer" }}>
            <span style={{ width:28, height:28, borderRadius:6, background:"color-mix(in srgb, white 20%, transparent)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"white" }}>
              <Stethoscope size={15} strokeWidth={1.8} />
            </span>
            <span style={{ fontSize:13, fontWeight:500, color:"white", whiteSpace:"nowrap" }}>MBBS Abroad</span>
          </div>

          <div style={{ flex:1, borderRadius:"10px 10px 0 0", overflow:"hidden", background:"var(--color-brand-champagne-soft-bg)", minHeight:160 }}>
            <Image src="/home/about-graduation.png" alt="Study abroad" width={185} height={220} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:8, width:235, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div
              ref={searchWrapRef}
              onClick={() => { setSearchFocused(true); searchWrapRef.current?.querySelector("input")?.focus(); }}
              style={{
                display:"flex", alignItems:"center", height:36, borderRadius:9, overflow:"hidden",
                width: searchExpanded ? "100%" : 130,
                background: searchExpanded ? "color-mix(in srgb, var(--color-brand-forest) 8%, transparent)" : "color-mix(in srgb, white 7%, transparent)",
                border: searchExpanded ? "1px solid color-mix(in srgb, var(--color-brand-champagne-soft) 50%, transparent)" : "1px solid color-mix(in srgb, var(--color-brand-champagne-soft) 20%, transparent)",
                padding: searchExpanded ? "0 10px" : "0 9px",
                boxShadow: searchExpanded ? "0 0 0 3px color-mix(in srgb, var(--color-brand-forest) 8%, transparent)" : "none",
                cursor:"text",
                transition:"width .22s cubic-bezier(.4,0,.2,1), background .16s, box-shadow .16s",
              }}
            >
              <Search size={12} strokeWidth={1.8} color="white" style={{ flexShrink:0, marginRight:6, opacity: searchExpanded ? 0.6 : 0.38 }} />
              <input
                type="text"
                placeholder={searchExpanded ? "Search countries…" : "Search"}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                aria-label="Search countries"
                style={{ background:"transparent", border:"none", outline:"none",
                   color:"white", fontSize:"12.5px", fontFamily:'var(--font-body)', flex:1, minWidth:0 }}
              />
              {searchQuery && (
                // line 167
                <Button variant="unstyled" size="bare" onClick={e => { e.stopPropagation(); setSearchQuery(""); }}
  className="ml-0.75 shrink-0 leading-none text-white/40" aria-label="Clear">
                  <X size={12} strokeWidth={2} />
                </Button>
              )}
            </div>
            {!searchExpanded && <span style={{ fontSize:10.5, color:"color-mix(in srgb, white 20%, transparent)", fontFamily:'var(--font-body)' }}>{COUNTRIES_DATA.length}</span>}
          </div>

          <div style={{ overflowY:"auto", maxHeight:320, borderRadius:10, background:"color-mix(in srgb, white 3%, transparent)" }}
            className="cd-scroll">
            <div style={{ display:"flex", flexDirection:"column", gap:2, padding:5 }}>

              <Link href="/countries" onClick={onClose}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", height:38, borderRadius:7, flexShrink:0, backgroundImage:"linear-gradient(156deg,var(--color-brand-forest) 12.7%,var(--color-brand-forest-deep) 87.2%)", fontSize:13, fontWeight:500, color:"white", textDecoration:"none", fontFamily:'var(--font-body)', transition:"opacity .14s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                See All Countries
              </Link>

              {filtered.length === 0 && (
                <p style={{ fontSize:12, color:"color-mix(in srgb, white 28%, transparent)", textAlign:"center", padding:"14px 0", fontFamily:'var(--font-body)' }}>
                  No results for &ldquo;{searchQuery}&rdquo;
                </p>
              )}

              {filtered.map(country => {
                const active = hoveredCountry?.id === country.id;
                const countrySlug = slugify(country.name);
                return (
                  <Link className="bg-white/5"
                    key={country.id}
                    href={`/countries/${countrySlug}`}
                    onClick={onClose}
                    onMouseEnter={() => setCountry(country)}
                    onMouseLeave={scheduleHide}
                    style={{ display:"flex", alignItems:"center", gap:10, height:42, padding:"0 10px", borderRadius:8, width:"100%", cursor:"pointer", border:"solid 1px color-mix(in srgb, var(--color-brand-champagne-soft) 9%, transparent)", outline:"none", position:"relative", overflow:"hidden", 
                      // backgroundColor:"var(--color-surface)", 

                      flexShrink:0, textAlign:"left", textDecoration:"none" }}
                  >
                    <span aria-hidden style={{ position:"absolute", inset:0, borderRadius:"inherit", pointerEvents:"none", backgroundImage:"linear-gradient(156deg,var(--color-brand-forest) 12.7%,var(--color-brand-forest-deep) 87.2%)", opacity: active ? 1 : 0, transition:"opacity .18s ease" }} />
                    <span style={{ position:"relative", zIndex:1, display:"flex", flexShrink:0 }}>
                      <FlagIcon src={country.flag} emoji={country.emoji} alt={country.name} />
                    </span>
                    <span style={{ position:"relative", zIndex:1, fontSize:13, fontWeight:500, fontFamily:'var(--font-body)', whiteSpace:"nowrap", color: active ? "white" : "var(--color-surface)", transition:"color .18s ease" }}>
                      {country.name}
                    </span>
                    <ChevronRight size={12} strokeWidth={1.8} color="white" style={{ marginLeft:"auto", position:"relative", zIndex:1, flexShrink:0, opacity: active ? 1 : 0, transition:"opacity .16s ease" }} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
          style={{ flex:1, minWidth:0, borderRadius:12, background: hoveredCountry ? "color-mix(in srgb, white 5%, transparent)" : "color-mix(in srgb, white 2%, transparent)", border:"1px solid color-mix(in srgb, var(--color-brand-champagne-soft) 9%, transparent)", display:"flex", flexDirection:"column", overflow:"hidden" }}
        >
          {hoveredCountry ? (
            <div key={hoveredCountry.id} style={{ display:"flex", flexDirection:"column", height:"100%", padding:"14px 13px 11px", animation:"sp-col-in .13s ease forwards" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <FlagIcon src={hoveredCountry.flag} emoji={hoveredCountry.emoji} alt={hoveredCountry.name} size={22} />
                <span style={{ fontSize:13, fontWeight:600, color:"white", fontFamily:'var(--font-body)', whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                  {hoveredCountry.name}
                </span>
              </div>
              <div style={{ height:1, background:"color-mix(in srgb, var(--color-brand-champagne-soft) 10%, transparent)", marginBottom:8 }} />
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:1, flex:1 }}>
                {hoveredCountry.colleges.map(college => (
                  <li key={college}>
                    <Link href={`/universities/${slugify(college)}`} onClick={onClose}
                      style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 8px", borderRadius:7, fontSize:"12.5px", color:"color-mix(in srgb, white 72%, transparent)", textDecoration:"none", fontFamily:'var(--font-body)', transition:"background .14s,color .14s" }}
                      onMouseEnter={e => { e.currentTarget.style.background="color-mix(in srgb, var(--color-brand-forest) 13%, transparent)"; e.currentTarget.style.color="white"; }}
                      onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="color-mix(in srgb, white 72%, transparent)"; }}
                    >
                      <span style={{ width:4, height:4, borderRadius:"50%", background:"linear-gradient(135deg,var(--color-brand-forest),var(--color-brand-forest-deep))", flexShrink:0 }} />
                      {college}
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ paddingTop:8, borderTop:"1px solid color-mix(in srgb, var(--color-brand-champagne-soft) 8%, transparent)", marginTop:"auto" }}>
                <Link href={`/countries/${slugify(hoveredCountry.name)}`} onClick={onClose}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", fontSize:"11.5px", color:"color-mix(in srgb, white 32%, transparent)", textDecoration:"none", fontFamily:'var(--font-body)', transition:"color .14s" }}
                  onMouseEnter={e => { e.currentTarget.style.color="color-mix(in srgb, white 70%, transparent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color="color-mix(in srgb, white 32%, transparent)"; }}
                >
                  <span>Explore all colleges</span>
                  <ChevronRight size={12} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:8, padding:20 }}>
              <Globe size={28} strokeWidth={1.2} color="white" opacity={0.2} />
              <span style={{ fontSize:"11.5px", color:"color-mix(in srgb, white 22%, transparent)", fontFamily:'var(--font-body)', textAlign:"center", lineHeight:1.6 }}>
                Hover a country<br/>to see colleges
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export interface NavLinkItem {
  label: string;
  href: string;
  dropKey: string | null;
}

const NAV_LINKS: NavLinkItem[] = [
  { label:"Home",       href:"/",  dropKey: null         },
  { label:"About Us",   href:"/about-us",   dropKey: "about"      },
  { label:"Collections",href:"/collections",dropKey: "collections"},
  { label:"Countries",  href:"/countries",  dropKey: "countries"  },
  { label:"Gallery",    href:"/gallery",    dropKey: "gallery"    },
  { label:"Contact Us", href:"/contact-us", dropKey: null         },
];

// Same destinations the desktop dropdowns use, flattened for the mobile drawer.
const MOBILE_SUBMENUS: Record<string, { label: string; href: string }[]> = {
  about:       ABOUT_ITEMS.map(({ label, href }) => ({ label, href })),
  collections: [
    { label: "Collections Overview", href: "/collections" },
    ...COLLECTIONS_ITEMS.map(({ label, href }) => ({ label, href })),
  ],
  gallery: [
    { label: "Gallery Overview", href: "/gallery" },
    ...GALLERY_ITEMS.map(({ label, href }) => ({ label, href })),
  ],
  countries: [
    { label: "All Countries", href: "/countries" },
    ...COUNTRIES_DATA.map(c => ({ label: c.name, href: `/countries/${slugify(c.name)}` })),
  ],
};

function ChevronDownIcon({ size = 20, color = "white", className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden className={className} style={{ flexShrink:0 }}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [countryQuery, setCountryQuery] = useState<string>("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const dropTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const openDrop = (name: string) => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setActiveDropdown(name);
  };
  const closeDrop = () => {
    dropTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };
  const keepDrop = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
    setCountryQuery("");
  };

  // Section matching the current route, auto-expanded when the drawer opens.
  const sectionForPath = NAV_LINKS.find(
    ({ href, dropKey }) => dropKey && (pathname === href || pathname.startsWith(`${href}/`)),
  )?.dropKey ?? null;

  const toggleMobile = () => {
    if (mobileOpen) {
      closeMobile();
    } else {
      setMobileOpen(true);
      setMobileSection(sectionForPath);
    }
  };

  useEffect(() => () => { if (dropTimer.current) clearTimeout(dropTimer.current); }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileSection(null);
    setCountryQuery("");
  }, [pathname]);

  // Mobile drawer: lock page scroll, close on Escape and when the viewport grows past `lg`.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      setMobileSection(null);
      setCountryQuery("");
    };
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const onBreakpointChange = () => {
      if (!desktopQuery.matches) return;
      setMobileOpen(false);
      setMobileSection(null);
      setCountryQuery("");
    };

    window.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onBreakpointChange);
    };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        .nb-link { position:relative; transition:color 0.2s ease; }
        .nb-link::after {
          content:''; position:absolute; bottom:2px; left:50%;
          transform:translateX(-50%) scaleX(0);
          width:60%; height:1.5px;
          background:linear-gradient(90deg,var(--color-brand-forest),var(--color-brand-champagne));
          border-radius:2px; transition:transform 0.25s ease; transform-origin:center;
        }
        .nb-link:hover::after { transform:translateX(-50%) scaleX(1); }

        
        

        /* Countries list — same behaviour as the page scrollbar:
           thin on desktop, thinner on smaller screens, hidden on mobile. */
        .cd-scroll {
          scrollbar-width: thin;
          scrollbar-color: color-mix(in srgb, var(--color-brand-forest) 22%, transparent) transparent;
        }
        .cd-scroll::-webkit-scrollbar       { width:3px; height:3px; }
        .cd-scroll::-webkit-scrollbar-track { background:transparent; }
        .cd-scroll::-webkit-scrollbar-thumb { background:color-mix(in srgb, var(--color-brand-forest) 22%, transparent); border-radius:99px; }
        @media (max-width: 1280px) {
          .cd-scroll::-webkit-scrollbar { width:2px; height:2px; }
        }
        @media (max-width: 767px) {
          .cd-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .cd-scroll::-webkit-scrollbar { width:0; height:0; display:none; }
        }

        .nd-item:hover .nd-grad { opacity:1 !important; }
        .nd-item:hover { border-color:transparent !important; }

        .nb-login { transition:background-color 0.2s ease,box-shadow 0.2s ease; }
        .nb-login:hover { background-color:color-mix(in srgb, var(--color-brand-champagne) 16%, transparent); border-color:color-mix(in srgb, var(--color-brand-champagne) 90%, transparent); box-shadow:0 0 0 1px color-mix(in srgb, var(--color-brand-champagne) 25%, transparent); }
        .nb-login:active { transform:scale(0.97); }

        .nb-contact { transition:opacity 0.2s ease,transform 0.15s ease,box-shadow 0.2s ease; }
        .nb-contact:hover { opacity:0.88; transform:translateY(-1px); box-shadow:0 6px 20px color-mix(in srgb, var(--color-brand-forest) 40%, transparent); }
        .nb-contact:active { transform:scale(0.97); }

        
        .nb-mobile-menu { animation:sp-dropdown-in 0.22s cubic-bezier(0.22,1,0.36,1) forwards; }
        /* Mobile drawer + mobile country list: scrollbar hidden (still scrolls) */
        .nb-mobile-menu,
        .nb-submenu-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .nb-mobile-menu::-webkit-scrollbar,
        .nb-submenu-scroll::-webkit-scrollbar { width:0; height:0; display:none; }

        .nb-bar {
          position:absolute; left:0;
          width:24px; height:2px;
          border-radius:2px;
          background:white;
          transform-origin:center;
          transition:transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease;
        }

        
        .nb-submenu { animation:sp-dropdown-in 0.18s ease forwards; }
        .nb-submenu-scroll {
          max-height: 264px;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        @media (max-height: 760px) {
          .nb-submenu-scroll { max-height: 170px; }
        }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-5"
        style={{ fontFamily:'var(--font-body)', overflow:"visible" }}
      >
        <nav
          ref={navRef}
          className="relative z-10 flex items-center justify-between w-full mt-2 gap-2"
          style={{
            height:          "clamp(64px,5.21vw,100px)",
            borderRadius:    "clamp(40px,5.73vw,110px)",
            backgroundColor: "color-mix(in srgb, var(--color-brand-forest-deep) 46%, transparent)",
            borderBottom:    "1px solid color-mix(in srgb, var(--color-brand-champagne-soft) 40%, transparent)",
            backdropFilter:  "blur(40px) saturate(2.4)",
            WebkitBackdropFilter: "blur(20px) saturate(1.4)",
            boxShadow:       "none",
            padding:         "0 clamp(20px,1.82vw,35px)",
            overflow:        "visible",
          }}
        >
          <Link href="/" className="flex items-center shrink-0 min-w-0" aria-label="My Study Hub home">
            <Image src="/logo_crm-removebg.png" alt="My Study Hub" width={221} height={46}
              style={{ height:"clamp(30px,2.4vw,46px)", width:"auto", maxWidth:"100%", objectFit:"contain" }} priority />
          </Link>

          <ul className="hidden lg:flex items-center" style={{ gap:"clamp(4px,0.42vw,8px)", overflow:"visible" }} role="navigation">
            {NAV_LINKS.map(({ label, href, dropKey }) => {
              const isOpen = activeDropdown === dropKey;
              return (
                <li key={label} className="relative" style={{ overflow:"visible" }}
                  onMouseEnter={dropKey ? () => openDrop(dropKey) : undefined}
                  onMouseLeave={dropKey ? closeDrop : undefined}
                >
                  {dropKey ? (
                    <>
                      <Button
                        onClick={() => { if (dropTimer.current) clearTimeout(dropTimer.current);
                          setActiveDropdown(isOpen ? null : dropKey); }}
                          variant="nav"
                        style={{
                          fontSize: "clamp(13px,0.83vw,16px)",
                          lineHeight: "20px",
                          padding: "8px clamp(8px,0.63vw,12px)",
                          gap: 4,
                          whiteSpace: "nowrap",
                          fontFamily: 'var(--font-body)',
                          color: isOpen ? "var(--color-brand-champagne-soft-bg)" : "white",
                        }}
                        aria-haspopup="true" aria-expanded={isOpen}
                        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.color = "var(--color-brand-champagne-soft-bg)"; }}
                        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.color = "white"; }}
                      >
                        {label}
                        <ChevronDownIcon size={20} color={isOpen ? "var(--color-brand-champagne-soft-bg)" : "white"} />
                      </Button>

                      {isOpen && dropKey === "about" && (
                        <AboutDropdown onClose={() => setActiveDropdown(null)} onEnter={keepDrop} onLeave={closeDrop} />
                      )}
                      {isOpen && dropKey === "collections" && (
                        <CollectionsDropdown onClose={() => setActiveDropdown(null)} onEnter={keepDrop} onLeave={closeDrop} />
                      )}
                      {isOpen && dropKey === "countries" && (
                        <CountriesPanel onClose={() => setActiveDropdown(null)} onEnter={keepDrop} onLeave={closeDrop} />
                      )}
                      {isOpen && dropKey === "gallery" && (
                        <GalleryDropdown onClose={() => setActiveDropdown(null)} onEnter={keepDrop} onLeave={closeDrop} />
                      )}
                    </>
                  ) : (
                    <Link href={href} className="nb-link flex items-center font-medium"
                      style={{
                        fontSize: "clamp(13px,0.83vw,16px)",
                        lineHeight: "20px",
                        padding: "8px clamp(8px,0.63vw,12px)",
                        gap: 4,
                        whiteSpace: "nowrap",
                        color: "white",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--color-brand-champagne-soft-bg)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "white"; }}>
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center" style={{ gap:12, flexShrink:0 }}>
            <Link href="/admin/login" className="nb-login flex items-center justify-center gap-1 font-semibold border"
              style={{
                height: "clamp(36px,2.19vw,42px)",
                width: "clamp(100px,6.25vw,120px)",
                borderRadius: "60px",
                fontSize: "clamp(12px,0.73vw,14px)",
                background: "transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                textDecoration: "none",
                color: "white",
                borderColor: "white",
              }}
            >
              Login <ChevronDownIcon size={18} color="white" />
            </Link>
            <Link href="/contact-us" className="nb-contact text-brand-sky flex items-center justify-center font-semibold transition-opacity hover:opacity-90"
              style={{ height:"clamp(36px,2.19vw,42px)", width:"clamp(100px,6.25vw,120px)", borderRadius:"60px", fontSize:"clamp(12px,0.73vw,14px)", backgroundImage:"linear-gradient(134deg,var(--color-brand-champagne-rich) 12.7%,var(--color-brand-champagne-deep) 87.2%)", border:"none", cursor:"pointer", whiteSpace:"nowrap", textDecoration:"none" }}>
              Contact Us
            </Link>
          </div>

          <Button
            variant="unstyled"
            size="bare"
            className="relative z-10 -mr-1 flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10 active:bg-white/15 lg:hidden"
            onClick={toggleMobile}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? "mobile-nav-menu" : undefined}
          >
            <span aria-hidden className="relative block" style={{ width:24, height:16 }}>
              <span className="nb-bar" style={{ top:0,  transform: mobileOpen ? "translateY(7px) rotate(45deg)"  : "none" }} />
              <span className="nb-bar" style={{ top:7,  opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "scaleX(0.2)" : "none" }} />
              <span className="nb-bar" style={{ top:14, transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </span>
          </Button>
        </nav>

        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 -z-10 bg-brand-forest-deep/60 lg:hidden"
              onClick={closeMobile}
              aria-hidden
            />

            <div
              id="mobile-nav-menu"
              className="nb-mobile-menu relative z-10 mt-2 flex flex-col overflow-y-auto lg:hidden"
              style={{
                maxHeight:            "calc(100dvh - 88px)",
                overscrollBehavior:   "contain",
                borderRadius:         20,
                padding:              "8px 12px 14px",
                backgroundColor:      "color-mix(in srgb, var(--color-brand-forest-deep) 97%, transparent)",
                backdropFilter:       "blur(24px) saturate(1.4)",
                WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                border:               "1px solid color-mix(in srgb, var(--color-brand-champagne-soft) 20%, transparent)",
                boxShadow:            "0 16px 40px color-mix(in srgb, var(--color-brand-forest-deep) 55%, transparent)",
                fontFamily:           'var(--font-body)',
              }}
            >
              <ul className="flex flex-col" role="navigation" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, href, dropKey }) => {
                  const submenu     = dropKey ? MOBILE_SUBMENUS[dropKey] : undefined;
                  const sectionOpen = !!dropKey && mobileSection === dropKey;
                  const active      = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

                  // Countries get an inline search (same idea as the desktop mega-menu).
                  const isCountries = dropKey === "countries";
                  const countryTerm = isCountries ? countryQuery.trim().toLowerCase() : "";
                  const countryMatches = isCountries
                    ? (submenu ?? []).filter(item => item.href !== "/countries" && item.label.toLowerCase().includes(countryTerm))
                    : [];
                  const visibleItems = isCountries
                    ? (submenu ?? []).filter(item => item.href === "/countries").concat(countryMatches)
                    : submenu;

                  return (
                    <li key={label} className="border-b border-white/8 last:border-b-0">
                      {submenu ? (
                        <Button
                          variant="unstyled"
                          size="bare"
                          className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3 text-left text-[15px] font-medium transition-colors hover:bg-white/10 ${
                            sectionOpen ? "text-white" : "text-white/85 hover:text-white"
                          }`}
                          onClick={() => {
                            setMobileSection(section => (section === dropKey ? null : dropKey));
                            if (dropKey !== "countries" || mobileSection === "countries") setCountryQuery("");
                          }}
                          aria-expanded={sectionOpen}
                          aria-controls={`mobile-section-${dropKey}`}
                        >
                          <span className="flex min-w-0 items-center gap-2.5">
                            {(active || sectionOpen) && (
                              <span aria-hidden className="size-1.5 shrink-0 rounded-full"
                                style={{ backgroundImage:"linear-gradient(135deg,var(--color-brand-forest),var(--color-brand-forest-deep))" }} />
                            )}
                            {label}
                          </span>
                          <span className="inline-flex shrink-0 text-white/60 transition-transform duration-300"
                            style={{ transform: sectionOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                            <ChevronDownIcon size={18} />
                          </span>
                        </Button>
                      ) : (
                        <Link
                          href={href}
                          onClick={closeMobile}
                          aria-current={active ? "page" : undefined}
                          className={`flex min-w-0 items-center gap-2.5 rounded-lg px-3 py-3 text-[15px] font-medium transition-colors hover:bg-white/10 ${
                            active ? "text-white" : "text-white/85 hover:text-white"
                          }`}
                        >
                          {active && (
                            <span aria-hidden className="size-1.5 shrink-0 rounded-full"
                              style={{ backgroundImage:"linear-gradient(135deg,var(--color-brand-forest),var(--color-brand-forest-deep))" }} />
                          )}
                          {label}
                        </Link>
                      )}

                      {submenu && sectionOpen && (
                        <>
                          {dropKey === "countries" && (
                            <div className="pb-2">
                              <div className="flex h-11 items-center gap-2 rounded-[10px] border border-white/15 bg-white/7 px-3 transition-colors focus-within:border-brand-sky/50 focus-within:bg-white/10">
                                <Search size={15} strokeWidth={1.8} color="white" className="shrink-0 opacity-55" />
                                <input
                                  type="text"
                                  value={countryQuery}
                                  onChange={e => setCountryQuery(e.target.value)}
                                  placeholder="Search countries…"
                                  aria-label="Search countries"
                                  autoComplete="off"
                                  spellCheck={false}
                                  className="min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/35"
                                />
                                {countryQuery && (
                                  <Button
                                    variant="unstyled"
                                    size="bare"
                                    onClick={() => setCountryQuery("")}
                                    aria-label="Clear country search"
                                    className="flex size-7 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                                  >
                                    <X size={13} strokeWidth={2} />
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}

                          <ul
                            id={`mobile-section-${dropKey}`}
                            className="nb-submenu nb-submenu-scroll mb-2 flex flex-col"
                          >
                            {visibleItems && visibleItems.length > 0 ? (
                              <>
                                {visibleItems.map(item => (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      onClick={closeMobile}
                                      aria-current={pathname === item.href ? "page" : undefined}
                                      className={`flex items-center gap-2.5 rounded-lg py-2.5 pl-7 pr-3 text-[13.5px] transition-colors hover:bg-white/8 hover:text-white ${
                                        pathname === item.href ? "text-white" : "text-white/65"
                                      }`}
                                    >
                                      <span aria-hidden className="size-1 shrink-0 rounded-full"
                                        style={{ backgroundImage:"linear-gradient(135deg,var(--color-brand-forest),var(--color-brand-forest-deep))" }} />
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                                {isCountries && countryTerm && countryMatches.length === 0 && (
                                  <li className="px-3 py-3 text-center text-[12.5px] text-white/35">
                                    No results for &ldquo;{countryQuery.trim()}&rdquo;
                                  </li>
                                )}
                              </>
                            ) : (
                              <li className="px-3 py-4 text-center text-[12.5px] text-white/35">
                                No results for &ldquo;{countryQuery.trim()}&rdquo;
                              </li>
                            )}
                          </ul>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 flex gap-3 pt-3" style={{ borderTop:"1px solid color-mix(in srgb, white 10%, transparent)" }}>
                <Link href="/admin/login" onClick={closeMobile}
                  className="flex h-10 flex-1 items-center justify-center gap-1 rounded-full border border-white text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  style={{ fontFamily:'var(--font-body)', textDecoration:"none" }}>
                  Login <ChevronDownIcon size={16} />
                </Link>
                <Link href="/contact-us" onClick={closeMobile}
                  className="flex h-10 flex-1 items-center justify-center rounded-full text-sm font-semibold text-brand-sky transition-opacity hover:opacity-90"
                  style={{ backgroundImage:"linear-gradient(134deg,var(--color-brand-champagne-rich) 12.7%,var(--color-brand-champagne-deep) 87.2%)", fontFamily:'var(--font-body)', textDecoration:"none" }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
