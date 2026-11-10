/**
 * BenefitsGallery — Figma nodes 346:5860 (desktop) + 796:1713 (mobile)
 * Partner With Us page — 5th component
 *
 * Desktop: 3-column photo mosaic
 *   Left col:  2 stacked square images (260×260)
 *   Center:    1 tall image (541×542) — spans full height
 *   Right col: 2 stacked square images (260×260)
 *   Each photo: rounded-xl, dark gradient overlay, label at bottom-left
 *
 * Mobile: stacked single-column full-width images (240px tall each)
 *   Gradient heading + subtitle, 4 images, "Become a Partner" button
 */

import Image from "next/image";
import { Button } from "@/components/ui/Button";

// ── Arrow icon ────────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Photo card data ───────────────────────────────────────────────────────────
const PHOTOS = {
  sharedExpertise: {
    src:      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    title:    "Shared Expertise",
    subtitle: "Leverage our knowledge and resources.",
  },
  innovativeSolutions: {
    src:      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    title:    "Innovative Solutions",
    subtitle: "Co-create cutting-edge programs/services.",
  },
  skillExchange: {
    src:      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    title:    "Skill Exchange",
    subtitle: "Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title.",
  },
  expandedReach: {
    src:      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    title:    "Expanded Reach",
    subtitle: "Access new audiences and markets.",
  },
  sustainableImpact: {
    src:      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    title:    "Sustainable Impact",
    subtitle: "Drive meaningful change together.",
  },
};

// ── Mobile images (separate assets) ──────────────────────────────────────────
const MOBILE_PHOTOS = [
  { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80", title: "Shared Expertise" },
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80", title: "Innovative Solutions" },
  { src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80", title: "Skill Exchange" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", title: "Expanded Reach" },
];

interface PhotoItem {
  src: string;
  title: string;
  subtitle?: string;
}

interface PhotoTileProps {
  photo: PhotoItem;
  height?: number;
  width?: number;
}

// ── Reusable photo tile ───────────────────────────────────────────────────────
function PhotoTile({ photo, height = 260, width }: PhotoTileProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl group shrink-0"
      style={{ width: width ?? "100%", height }}
    >
      {/* Image */}
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        unoptimized
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      {/* Dark gradient overlay — bottom heavy */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent rounded-xl" />

      {/* Label */}
      <div className="absolute bottom-3 left-3 flex flex-col gap-1">
        <p
          className="text-white font-bold text-base leading-snug"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {photo.title}
        </p>
        {photo.subtitle && (
          <p
            className="text-muted text-xs leading-normal font-normal"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {photo.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BenefitsGallery() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 py-12 lg:py-20">
      <div className="max-w-276.25 mx-auto flex flex-col items-center gap-14 lg:gap-17.5">

        {/* ── Header (both screens) ── */}
        <div className="flex flex-col items-center gap-6 text-center w-full">
          <h2
            className="font-extrabold bg-clip-text text-transparent w-full"
            style={{
              fontFamily: "var(--font-sub)",
              fontSize: "clamp(28px, 3.33vw, 48px)",
              lineHeight: 1.3,
              backgroundImage:
                "linear-gradient(169.49deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)",
            }}
          >
            Benefits of Partnership
          </h2>
          <p
            className="text-body font-light leading-relaxed max-w-128.5"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "clamp(14px, 1.04vw, 18px)",
              lineHeight: "27px",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
            phasellus mollis sit aliquam sit nullam.
          </p>
        </div>

        {/* ══════════════════════════════════════════
            DESKTOP photo mosaic (hidden below sm)
        ══════════════════════════════════════════ */}
        <div className="hidden sm:flex gap-5.5 w-full items-stretch">

          {/* Left col — 2 stacked squares */}
          <div className="flex flex-col gap-5.5 shrink-0" style={{ width: 260 }}>
            <PhotoTile photo={PHOTOS.sharedExpertise}     width={260} height={260} />
            <PhotoTile photo={PHOTOS.innovativeSolutions} width={260} height={260} />
          </div>

          {/* Center — tall image */}
          <div className="relative overflow-hidden rounded-xl group flex-1" style={{ minHeight: 542 }}>
            <Image
              src={PHOTOS.skillExchange.src}
              alt={PHOTOS.skillExchange.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
              sizes="541px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent rounded-xl" />
            <div className="absolute bottom-11 left-6 right-6 flex flex-col gap-2">
              <p
                className="text-white text-2xl leading-9"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {PHOTOS.skillExchange.title}
              </p>
              <p
                className="text-white/80 text-base leading-snug font-normal line-clamp-3"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {PHOTOS.skillExchange.subtitle}
              </p>
            </div>
          </div>

          {/* Right col — 2 stacked squares */}
          <div className="flex flex-col gap-5.5 shrink-0" style={{ width: 260 }}>
            {[PHOTOS.expandedReach, PHOTOS.sustainableImpact].map((photo) => (
              <div
                key={photo.title}
                className="relative overflow-hidden rounded-xl group shrink-0"
                style={{ width: 260, height: 260 }}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                  sizes="260px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent rounded-xl" />
                <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                  <p className="text-white font-bold text-base leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                    {photo.title}
                  </p>
                  <p className="text-muted text-xs leading-normal" style={{ fontFamily: 'var(--font-body)' }}>
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MOBILE stacked images (hidden on sm+)
        ══════════════════════════════════════════ */}
        <div className="flex sm:hidden flex-col gap-4 w-full">
          {MOBILE_PHOTOS.map((photo) => (
            <div
              key={photo.title}
              className="relative w-full overflow-hidden rounded-xl"
              style={{ height: 240 }}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover object-center"
                unoptimized
                sizes="100vw"
              />
              {/* diagonal gradient from bottom-left */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  backgroundImage:
                    "linear-gradient(53.9deg, color-mix(in srgb, black 87%, transparent) 33.333%, transparent 53.333%)",
                }}
              />
              <div className="absolute bottom-4 left-4">
                <p
                  className="text-white font-bold text-base leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA button ── */}
        {/* Desktop: "Request Quote" / Mobile: "Become a Partner" — both gradient */}
        <Button variant="brand"
          rightIcon={<ArrowRight />}
          className="h-14 sm:h-16 w-full sm:w-auto sm:px-8 rounded-xl text-white font-semibold text-base sm:text-lg transition-opacity hover:opacity-90 
          active:scale-[0.98] shadow-none"
          style={{
            fontFamily: 'var(--font-body)',
            backgroundImage:
              "linear-gradient(142deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)",
          }}
        >
          <span className="hidden sm:inline">Request Quote</span>
          <span className="sm:hidden">Become a Partner</span>
        </Button>

      </div>
    </section>
  );
}
