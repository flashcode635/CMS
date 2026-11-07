"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import image1 from "@/public/svg/card-image.png";
import image2 from "@/public/svg/card-image2.png";
import image3 from "@/public/svg/card-image3.png";
import image4 from "@/public/svg/card-image4.png";


export default function CollegeCards() {

 const UNIVERSITIES = [
  {
    id: 1,
    variant: "blue",
    desktopIcon: image1,
    mobileIcon: image1,
  },
  {
    id: 2,
    variant: "green",
    desktopIcon: image2,
    mobileIcon: image2,
  },
  {
    id: 3,
    variant: "blue",
    desktopIcon:image3,
    mobileIcon: image3,
    title: "Novosibirsk State University",
  },
  {
    id: 4,
    variant: "green",
    desktopIcon: image4,
    mobileIcon: image4,
    title: "Kazan Federal University",
  },
  {
    id: 5,
    variant: "blue",
    desktopIcon: image1,
    mobileIcon: image1,
    title: "Far Eastern Federal University",
  },
  {
    id: 6,
    variant: "green",
    desktopIcon: image2,
    mobileIcon: image2,
    title: "Siberian State Medical University",
  },
  {
    id: 7,
    variant: "blue",
    desktopIcon: image3,
    mobileIcon: image3,
    title: "North Ossetian State Medical Academy",
  },
  {
    id: 8,
    variant: "green",
    desktopIcon: image4,
    mobileIcon: image4,
    title: "Privolzhsky Research Medical University",
  },
  {
    id: 9,
    variant: "blue",
    desktopIcon: image1,
    mobileIcon: image1,
    title: "Russian National Research Medical University",
  },
  {
    id: 10,
    variant: "green",
    desktopIcon: image2,
    mobileIcon: image2,
    title: "Pirogov Russian National Research Medical University",
  },
  {
    id: 11,
    variant: "blue",
    desktopIcon: image3,
    mobileIcon: image3,
    title: "Volgograd State Medical University",
  },
  {
    id: 12,
    variant: "green",
    desktopIcon: image4,
    mobileIcon: image4,
    title: "Tver State Medical University",
  },
  {
    id: 13,
    variant: "blue",
    desktopIcon: image1,
    mobileIcon: image1,
    title: "Bashkir State Medical University",
  },
  {
    id: 14,
    variant: "green",
    desktopIcon: image2,
    mobileIcon: image2,
    title: "Stavropol State Medical University",
  },
  {
    id: 15,
    variant: "blue",
    desktopIcon: image3,
    mobileIcon: image3,
    title: "Omsk State Medical University",
  },
  {
    id: 16,
    variant: "green",
    desktopIcon: image4,
    mobileIcon: image4,
    title: "Chuvash State University",
  },
  {
    id: 17,
    variant: "blue",
    desktopIcon: image1,
    mobileIcon: image1,
    title: "First Moscow State Medical University",
  },
  {
    id: 18,
    variant: "green",
    desktopIcon: image2,
    mobileIcon: image2,
    title: "Volga Region State University of Service",
  },
  {
    id: 19,
    variant: "blue",
    desktopIcon: image3,
    mobileIcon: image3,
    title: "Smolensk State Medical University",
  },
  {
    id: 20,
    variant: "green",
    desktopIcon: image4,
    mobileIcon: image4,
    title: "North Caucasus Federal University",
  },
  {
    id: 21,
    variant: "blue",
    desktopIcon: image1,
    mobileIcon: image1,
    title: "A.I. Evdokimov Moscow State University of Medicine and Dentistry",
  },
  {
    id: 22,
    variant: "green",
    desktopIcon: image2,
    mobileIcon: image2,
    title: "Yaroslavl State Medical University",
  },
  {
    id: 23,
    variant: "blue",
    desktopIcon: image3,
    mobileIcon: image3,
    title: "Vitebsk State Medical University",
  },
  {
    id: 24,
    variant: "green",
    desktopIcon: image4,
    mobileIcon: image4,
    title: "Orel State University",
  },
  {
    id: 25,
    variant: "blue",
    desktopIcon: image1,
    mobileIcon: image1,
    title: "Kemerovo State Medical University",
  },
  
];
const INITIAL_VISIBLE_COUNT = 15;
const LOAD_MORE_COUNT = 5;

// colour tokens per variant
const VARIANT: Record<string, { bg: string; border: string }> = {
  blue:  { bg: "bg-[#F1E3C8]", border: "border-[rgba(216,178,110,0.5)]"  },
  green: { bg: "bg-[#EDF3EF]", border: "border-[rgba(10,107,68,0.5)]"    },
};

    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
    const visiblePartners = UNIVERSITIES.slice(0, visibleCount);
    const hasMorePartners = visibleCount < UNIVERSITIES.length;

    return(
        <>
            
                 {/* ══════════════════════════════════════════
                            DESKTOP cards — flex-wrap 4 col (hidden on mobile)
                        ══════════════════════════════════════════ */}
                        <div className="hidden sm:flex flex-wrap gap-4 mb-4 p-8 items-stretch">
                   {visiblePartners.map((p) => (
                            <div
                              key={p.id}
                              className={[
                                "flex gap-3 p-2 pb-3 px-4 flex-1 min-w-55",
                                "border",
                                VARIANT[p.variant].bg,
                                VARIANT[p.variant].border,
                                /* asymmetric radius: tl normal, tr large pill */
                                "rounded-lg rounded-tr-[55px] ",
                                "shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)]",
                                "transition-all duration-300",
                                "hover:-translate-y-2 hover:shadow-[0px_24px_48px_rgba(216,178,110,0.15)]",
                              ].join(" ")}
                            >
                              {/* Icon 64px */}
                              <div className="relative w-12 h-12 rounded-lg bg-[#F1E3C8] overflow-hidden shrink-0">
                                <Image
                                  src={p.desktopIcon}
                                  alt={p.title??"picture"}
                                  fill
                                  className="object-cover object-center"
                                  unoptimized
                                  sizes="60px"
                                />
                              </div>
                
                              {/* Title + subtitle */}
                              <div className="flex flex-col items-center  h-full 
                              justify-center gap-1">
                                <p
                                  className="text-[#12211C] text-xs leading-4"
                                  style={{ fontFamily: "sans-serif" }}
                                >
                                  {p.title}
                                </p>
                                {/* <p
                                  className="text-[#66716A] text-[9px] leading-4
                                   font-normal"
                                  style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                  {p.subtitle??""}
                                </p> */}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="hidden sm:flex justify-center pb-8">
                          <Button
                            variant="unstyled"
                            size="bare"
                            shape="pill"
                            type="button"
                            onClick={() =>
                              setVisibleCount((currentCount) =>
                                Math.min(
                                  currentCount + LOAD_MORE_COUNT,
                                  UNIVERSITIES.length,
                                ),
                              )
                            }
                            disabled={!hasMorePartners}
                            className="bg-brand-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0B3B2E] disabled:cursor-not-allowed disabled:bg-[#D8B26E]"
                          >
                            Load More
                          </Button>
                        </div>
            
        </>
    )
}