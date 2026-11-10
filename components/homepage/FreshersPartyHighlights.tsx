"use client";

import Image from "next/image";
import { useEffect, useRef, useState, CSSProperties } from "react";

const ROW_1 = [
  "/home/partyone.webp",
  "/home/partytwo.webp",
  "/home/partyThree.webp",
  "/home/partyFour.webp",
  "/home/partyFive.webp",
  "/home/partySix.webp",
  "/home/partySeven.webp",
  "/home/partyEight.webp",
];
const ROW_2 = [
  "/home/partyNine.webp",
  "/home/partyTen.webp",
  "/home/partyEleven.webp",
  "/home/partyTwelve.webp",
  "/home/partyThirteen.webp",
  "/home/partyFourteen.webp",
  "/home/partyFifteen.webp",
  "/home/partySixteen.webp",
];

export interface PartyVideo {
  thumb: string;
  title: string;
  channel: string;
}

const VIDEOS: PartyVideo[] = [
  {
    thumb: "/home/party-video1.jpg",
    title: "Impulse NCSA",
    channel: "My Study Hub",
  },
  {
    thumb: "/home/party-video2.jpg",
    title: "Fresher's Party Highlights",
    channel: "Rhythm 3.0 Samara",
  },
];

export interface MarqueeRowProps {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
}

function MarqueeRow({ images, direction = "left", speed = 38 }: MarqueeRowProps) {
  const doubled = [...images, ...images, ...images];
  const customStyle = {
    display: "flex",
    gap: "clamp(10px, 1.15vw, 22px)",
    width: "max-content",
    "--speed": `${speed}s`,
  } as CSSProperties;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "clamp(120px, 14.58vw, 280px)" }}>
      <div
        className={direction === "left" ? "fph-row-left" : "fph-row-right"}
        style={customStyle}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative shrink-0 overflow-hidden"
            style={{
              width: "clamp(150px, 17.71vw, 340px)",
              height: "clamp(120px, 14.58vw, 280px)",
              borderRadius: "clamp(10px, 1.25vw, 24px)",
              backgroundColor: "var(--color-surface-alt)",
            }}
          >
            <Image
              src={src}
              alt={`Party highlight ${(i % images.length) + 1}`}
              fill
              className="object-cover"
              sizes="340px"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export interface VideoCardProps {
  video: PartyVideo;
  visible: boolean;
  index: number;
}

function VideoCard({ video, visible, index }: VideoCardProps) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: "clamp(280px, 42.08vw, 808px)",
        height: "clamp(161px, 24.22vw, 465px)",
        borderRadius: "clamp(14px, 1.67vw, 32px)",
        backgroundColor: "var(--color-brand-forest-deep)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: `opacity 0.7s ease ${0.1 + index * 0.15}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.15}s`,
      }}
    >
          <Image
            src={video.thumb}
            alt={video.title}
            fill
            className="object-cover"
            style={{ opacity: 0.5 }}
            sizes="(max-width:768px) 90vw, 808px"
            priority={index === 0}
          />

          <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, black 15%, transparent)" }} />

          <div
            // size="icon"
            className="absolute shadow-none bg-transparent hover:bg-transparent border-0"
            style={{
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: "clamp(50px, 4.74vw, 91px)",
              height: "clamp(35px, 3.33vw, 64px)",
              padding: 0,
              zIndex: 3,
            }}
          >
            <svg viewBox="0 0 68 48" width="100%" height="100%">
              <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="var(--color-red-600)" />
              <path d="M 45,24 27,14 27,34" fill="white" />
            </svg>
          </div>

          <div
            className="absolute flex items-center gap-2.5"
            style={{
              top: "clamp(8px,0.94vw,18px)",
              left: "clamp(12px,1.2vw,23px)",
              zIndex: 4,
            }}
          >
            <div
              className="relative shrink-0 overflow-hidden"
              style={{ width: "clamp(28px,1.875vw,36px)", height: "clamp(28px,1.875vw,36px)", borderRadius: "50%" }}
            >
              <Image
                src="/home/party-channel-thumb.jpg"
                alt="My Study Hub"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: "clamp(11px,1.04vw,20px)",
                color: "white",
                margin: 0,
                lineHeight: "28px",
                whiteSpace: "nowrap",
              }}>
                {video.title}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: "clamp(9px,0.63vw,12px)",
                color: "white",
                margin: 0,
                lineHeight: "13.2px",
                opacity: 0.85,
              }}>
                {video.channel}
              </p>
            </div>
          </div>

          <div
            className="absolute flex items-center gap-2.5"
            style={{
              bottom: "clamp(12px,1.25vw,24px)",
              right: "clamp(12px,1.27vw,24.3px)",
              backgroundColor: "color-mix(in srgb, black 30%, transparent)",
              borderRadius: "clamp(14px,1.25vw,24px)",
              padding: "0 clamp(10px,1.25vw,24px)",
              height: "clamp(30px,2.5vw,48px)",
              zIndex: 4,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: "clamp(10px,0.94vw,18px)",
              color: "white",
              whiteSpace: "nowrap",
            }}>
              Event highlight
            </span>
            <div style={{ position: "relative", width: "clamp(50px,4.69vw,90px)", height: "clamp(11px,1.04vw,20px)" }}>
              <Image
                src="/home/party-yt-wordmark.svg"
                alt="Video platform"
                fill
                className="object-contain"
                sizes="90px"
              />
            </div>
          </div>

    </div>
  );
}

export default function FreshersPartyHighlights() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

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
        
        

        .fph-row-left {
          animation: sp-marquee-third var(--speed, 38s) linear infinite;
        }
        .fph-row-left:hover { animation-play-state: paused; }

        .fph-row-right {
          animation: sp-marquee-third-rev var(--speed, 42s) linear infinite;
        }
        .fph-row-right:hover { animation-play-state: paused; }

        
        .fph-heading { opacity: 0; }
        .fph-heading.in { animation: sp-fade-up 0.8s 0.05s forwards cubic-bezier(0.22,1,0.36,1); }
        .fph-sub     { opacity: 0; }
        .fph-sub.in     { animation: sp-fade-up 0.7s 0.18s forwards cubic-bezier(0.22,1,0.36,1); }
        .fph-marquee { opacity: 0; }
        .fph-marquee.in { animation: sp-fade-up 0.8s 0.28s forwards cubic-bezier(0.22,1,0.36,1); }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          backgroundColor: "var(--color-surface-alt)",
          padding: "clamp(32px,3.33vw,64px) 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(24px,2.5vw,48px)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(4px,0.42vw,8px)",
            padding: "0 clamp(20px,4.17vw,80px)",
          }}
        >
          <p
            className={`fph-sub${visible ? " in" : ""} text-center font-normal`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "clamp(12px,0.83vw,16px)",
              lineHeight: "24px",
              color: "var(--color-indigo-500)",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            NCSA &amp; SAMSu
          </p>

          <h2
            className={`fph-heading${visible ? " in" : ""} font-bold text-center`}
            style={{
              fontFamily: 'var(--font-sub)',
              fontSize: "clamp(28px,3.33vw,64px)",
              lineHeight: 1.15,
              backgroundImage: "linear-gradient(135deg, var(--color-brand-forest) 0%, var(--color-brand-forest-deep) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            Fresher&apos;s Party Highlights
          </h2>
        </div>

        <div
          className={`fph-marquee${visible ? " in" : ""} w-full`}
          style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.15vw,22px)" }}
        >
          <MarqueeRow images={ROW_1} direction="left" speed={38} />
          <MarqueeRow images={ROW_2} direction="right" speed={42} />
        </div>

        <div
          style={{
            display: "flex",
            gap: "clamp(16px,2.5vw,48px)",
            padding: "0 clamp(20px,4.17vw,80px)",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {VIDEOS.map((video, i) => (
            <VideoCard key={video.thumb} video={video} visible={visible} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
