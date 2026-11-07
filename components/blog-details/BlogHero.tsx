"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, ChevronRight } from "lucide-react";

/**
 * BlogHero — Full-width hero section for a blog detail page.
 *
 * Matches Figma node 358:16159 / 356:14903 area:
 *  - Cover image with dark overlay (opacity 0.2)
 *  - Category badge, blog title, author line with read time & views
 *  - Social share mini icons in the meta row
 *  - Breadcrumb: Home > Blog > Title
 *
 * Props
 * ─────────────────────────────────────────────────────────────
 * @param {string}  title       – Blog post title
 * @param {string}  category    – Category label (e.g. "Visa Guide")
 * @param {string}  author      – Author display name
 * @param {string}  date        – Formatted publish date (e.g. "June 1, 2023")
 * @param {number}  readTime    – Estimated minutes to read
 * @param {number}  views       – View count (e.g. 1600)
 * @param {string}  coverImage  – URL to cover/hero image
 * @param {string}  slug        – URL slug for breadcrumb
 */
interface BlogHeroProps {
  title?: string;
  category?: string;
  author?: string;
  date?: string;
  readTime?: number;
  views?: number;
  coverImage?: string;
  slug?: string;
}

export default function BlogHero({
  title = "5 Efficient Rules How to Organize Your Working Place",
  category = "Visa Guide",
  author = "Joanna Wellick",
  date = "June 1, 2023",
  readTime = 2,
  views = 1600,
  coverImage = "https://www.figma.com/api/mcp/asset/b8c55f3f-9c3a-49b1-b9c6-dba8bb467385",
  slug = "blog-post",
}: BlogHeroProps) {
  const formatViews = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  return (
    <section className="relative w-full" aria-label="Blog post hero">
      {/* ── Cover image container ── */}
      <div className="relative w-full h-120 sm:h-140 lg:h-180 overflow-hidden">
        {/* Base black layer */}
        <div className="absolute inset-0 bg-black" />

        {/* Cover photo */}
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover object-center opacity-50"
          priority
          sizes="100vw"
          unoptimized
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Bottom gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
          }}
          aria-hidden
        />

        {/* Back button */}
        <Link
          href="/collections/blog"
          className="absolute top-10 left-6 sm:left-16 flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 text-white font-bold text-base hover:bg-white/30 transition-colors"
          style={{ fontFamily: "'Lexend', sans-serif" }}
          aria-label="Back to blog listing"
        >
          <ChevronRight className="rotate-180 w-5 h-5" />
          Back
        </Link>

        {/* Text content — centred, pinned to bottom */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center px-4 pb-12 sm:pb-16">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 text-white/70 text-sm mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden />
            <Link
              href="/collections/blog"
              className="hover:text-white transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden />
            <span className="text-white/50 truncate
             max-w-50">{title}</span>
          </nav>

          {/* Brand subtitle */}
          <p
            className="text-white font-semibold tracking-[3px] uppercase text-sm sm:text-base mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Study Palace Hub
          </p>

          {/* Main title */}
          <h1
            className="text-white font-semibold leading-tight mb-4 max-w-5xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4.5vw, 72px)",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          {/* Subtitle / tagline */}
          <p
            className="text-white/80 text-base sm:text-lg mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Grow Together in Excellence
          </p>

          {/* Meta row: author · read time · views */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white text-sm sm:text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span>by {author}</span>

            <span className="w-5 h-px bg-white/60" aria-hidden />

            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden />
              {readTime} minute read
            </span>

            <span className="w-5 h-px bg-white/60" aria-hidden />

            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" aria-hidden />
              {formatViews(views)} views
            </span>

            <span className="w-5 h-px bg-white/60" aria-hidden />

            {/* Category badge */}
            <span
              className="bg-[#4b6bfb]/80 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {category}
            </span>

            {/* Published date */}
            <time
              dateTime={date}
              className="text-white/70 text-xs sm:text-sm"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {date}
            </time>
          </div>
        </div>
      </div>
    </section>
  );
}
