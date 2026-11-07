"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, ComponentType } from "react";
import {
  Building2,
  BriefcaseBusiness,
  Handshake,
  ConciergeBell,
  Newspaper,
  CalendarDays,
  BookOpen,
  Film,
  Image as ImageIcon,
  Video,
  LucideProps,
} from "lucide-react";
import DropdownItem, { DropdownItemData } from "./dditems";
import { bgColor } from "./Navbar";

export interface DropdownPanelProps {
  onEnter?: () => void;
  onLeave?: () => void;
  children: ReactNode;
}

function DropdownPanel({ onEnter, onLeave, children }: DropdownPanelProps) {
  return (
    <div className={`d-panel ${bgColor}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      role="dialog"
      style={{
        position:             "absolute",
        top:                  "calc(100% + 10px)",
        left:                 "50%",
        transform:            "translateX(-50%)",
        zIndex:               9999,
        width:                440,
        maxWidth:             "calc(100vw - 32px)",
    
        backdropFilter:       "blur(24px) saturate(1.5)",
        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        borderRadius:         18,
        border:               "1px solid rgba(186,203,255,0.14)",
        boxShadow:            "0 20px 50px -8px rgba(0,0,0,0.7)",
        padding:              16,
        animation:            "np-in 0.16s ease forwards",
        fontFamily:           "'Inter','Inter',sans-serif",
        pointerEvents:        "auto",
      }}
    >
      {children}
    </div>
  );
}



export interface DropdownLayoutProps {
  imageSrc: string;
  imageAlt: string;
  items: DropdownItemData[];
  onClose?: () => void;
}

function DropdownLayout({ imageSrc, imageAlt, items, onClose }: DropdownLayoutProps) {
  return (
    <>
      <style>{`
        .nd-item:hover .nd-grad { opacity: 1 !important; }
        .nd-item:hover { border-color: transparent !important; }
      `}</style>

      <div className={`d-layout ${bgColor}`} style={{ display:"flex", gap:14, alignItems:"stretch" }}>
        <div style={{
          width:      160,
          flexShrink: 0,
          borderRadius: 12,
          overflow:   "hidden",
          backgroundColor: "#F1E3C8",
          position:   "relative",
          minHeight:  items.length > 2 ? 220 : 140,
        }}>
          <Image src={imageSrc} alt={imageAlt} fill style={{ objectFit:"cover" }} sizes="160px" />
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:8, justifyContent:"center", flex:1, minWidth:0 }}>
          {items.map(item => (
            <DropdownItem key={item.label} href={item.href} icon={item.icon} label={item.label} onClose={onClose} />
          ))}
        </div>
      </div>
    </>
  );
}

export interface BaseDropdownProps {
  onClose?: () => void;
  onEnter?: () => void;
  onLeave?: () => void;
}

// Exported so the mobile drawer in Navbar can render the same destinations.
export const ABOUT_ITEMS: DropdownItemData[] = [
  { label:"Overview",        href:"/about-us",          icon: Building2        },
  { label:"Our Services",    href:"/about-us/services", icon: ConciergeBell    },
  { label:"Career",          href:"/about-us/career",   icon: BriefcaseBusiness},
  { label:"Partner With Us", href:"/about-us/partner-with-us",  icon: Handshake        },
];

export const COLLECTIONS_ITEMS: DropdownItemData[] = [
  { label:"Blog",            href:"/collections/blog",            icon: Newspaper   },
  { label:"Upcoming Events", href:"/collections/upcoming-event", icon: CalendarDays },
  { label:"Brochures",       href:"/collections/brochures",       icon: BookOpen     },
  { label:"Web Stories",     href:"/web-stories",                 icon: Film         },
];

export const GALLERY_ITEMS: DropdownItemData[] = [
  { label:"Images", href:"/gallery/images", icon: ImageIcon },
  { label:"Videos", href:"/gallery/videos", icon: Video     },
];

export function AboutDropdown({ onClose, onEnter, onLeave }: BaseDropdownProps) {
  return (
    <DropdownPanel onEnter={onEnter} onLeave={onLeave}>
      <DropdownLayout
        imageSrc="/home/about-graduation.png"
        imageAlt="About My Study Hub"
        items={ABOUT_ITEMS}
        onClose={onClose}
      />
    </DropdownPanel>
  );
}

export function CollectionsDropdown({ onClose, onEnter, onLeave }: BaseDropdownProps) {
  return (
    <DropdownPanel onEnter={onEnter} onLeave={onLeave}>
      <DropdownLayout
        imageSrc="/home/about-graduation.png"
        imageAlt="Collections"
        items={COLLECTIONS_ITEMS}
        onClose={onClose}
      />
    </DropdownPanel>
  );
}

export function GalleryDropdown({ onClose, onEnter, onLeave }: BaseDropdownProps) {
  return (
    <DropdownPanel onEnter={onEnter} onLeave={onLeave}>
      <DropdownLayout
        imageSrc="/home/about-graduation.png"
        imageAlt="Gallery"
        items={GALLERY_ITEMS}
        onClose={onClose}
      />
    </DropdownPanel>
  );
}
