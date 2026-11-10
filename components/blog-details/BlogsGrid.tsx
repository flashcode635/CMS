"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  DEFAULT_BLOG_CARDS,
  DEFAULT_FEATURED_BLOG,
} from "@/lib/blogPosts";

// ── Blog data ─────────────────────────────────────────────────────────────────
// Post data lives in @/lib/blogPosts so the listing cards and the article page
// stay in sync. Pass <BlogsGrid blogs={…} featuredBlog={…} /> together with
// custom heading/headingAccent/description to override the defaults for one
// instance.
const DEFAULT_CONTENT_BlogsGrid = {
  blogs: DEFAULT_BLOG_CARDS,
  featuredBlog: DEFAULT_FEATURED_BLOG,
  heading: "Our Latest",
  headingAccent: "Blogs",
  description:
    "Together, we strengthen international connections and expand opportunities by combining global expertise with local insights.",
  desktopInitialCount: 8,
  mobileInitialCount: 4,
};

// ── Easing tokens ─────────────────────────────────────────────────────────────
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)"; // slight overshoot → premium feel
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";  // smooth deceleration

interface BlogCardItem {
  id: number;
  category: string;
  title: string;
  author: string;
  authorImg: string;
  date: string;
  coverImg: string;
  href: string;
}

interface BlogCardProps {
  blog: BlogCardItem;
  index: number;
  visible: boolean;
}

// ── BlogCard (grid) ───────────────────────────────────────────────────────────
function BlogCard({ blog, index, visible }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);
  const enterDelay = (index % 4) * 60;

  // All transforms live in one place — no CSS/inline conflict
  const cardTransform = !visible
    ? "translateY(24px)"
    : hovered
    ? "translateY(-8px)"
    : "translateY(0px)";

  const cardTransition = !visible
    ? `opacity 0.55s ease ${enterDelay}ms, transform 0.55s ${EASE_OUT} ${enterDelay}ms`
    : hovered
    ? `transform 0.45s ${SPRING}, box-shadow 0.45s ${EASE_OUT}, border-color 0.3s ease`
    : `transform 0.5s ${EASE_OUT}, box-shadow 0.5s ${EASE_OUT}, border-color 0.3s ease`;

  return (
    <a
      href={blog.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    
      className="bg-white rounded-xl p-3 flex flex-col gap-0 
      overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: cardTransform,
        transition: cardTransition,
        willChange: "transform, box-shadow",
        border: hovered ? "1.5px solid color-mix(in srgb, var(--color-brand-champagne) 20%, transparent)" : "1.5px solid var(--color-line)",
        boxShadow: hovered
          ? "0 24px 56px -8px color-mix(in srgb, var(--color-brand-champagne) 20%, transparent), 0 8px 24px -4px color-mix(in srgb, black 7%, transparent)"
          : "0 1px 4px color-mix(in srgb, black 4%, transparent)",
      }}
    >
      {/* Cover image wrapper — zooms on hover */}
      <div className="relative w-full h-40 rounded-sm overflow-hidden shrink-0">
        <Image
          src={blog.coverImg}
          alt={blog.title}
          fill
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: `transform 0.65s ${EASE_OUT}`,
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          unoptimized
        />
        {/* Blue gradient sp-shimmer on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, color-mix(in srgb, var(--color-brand-champagne) 14%, transparent), transparent)",
            opacity: hovered ? 1 : 0,
            transition: `opacity 0.4s ${EASE_OUT}`,
            borderRadius: "11px 11px 0 0",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-2.5">
        {/* Heading block */}
        <div className="flex flex-col gap-2">
          {/* Badge */}
          <span
            className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-md w-fit"
            style={{
              backgroundColor: hovered ? "color-mix(in srgb, var(--color-brand-champagne) 10%, transparent)" : "color-mix(in srgb, var(--color-brand-champagne) 5%, transparent)",
              transition: `background-color 0.3s ease`,
            }}
          >
            <span
              className="text-brand-royal text-[11px] font-medium leading-3 whitespace-nowrap"
            >
              {blog.category}
            </span>
          </span>

          {/* Title */}
          <h3
            className="text-[15px] font-semibold leading-tight m-0"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: "-0.3px",
              color: hovered ? "var(--color-brand-royal)" : "black",
              transition: `color 0.3s ease`,
            }}
          >
            {blog.title}
          </h3>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: hovered ? "color-mix(in srgb, var(--color-brand-champagne) 15%, transparent)" : "var(--color-surface-alt)",
            transition: `background-color 0.3s ease`,
          }}
        />

        {/* Short Info */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <div
              className="relative w-5 h-5 rounded-full overflow-hidden shrink-0"
              style={{
                outline: hovered ? "2px solid color-mix(in srgb, var(--color-brand-champagne) 25%, transparent)" : "2px solid transparent",
                outlineOffset: "1px",
                transition: `outline-color 0.3s ease`,
              }}
            >
              <Image src={blog.authorImg} alt={blog.author} fill className="object-cover" unoptimized />
            </div>
            <span
              className="text-muted text-[9px] font-medium leading-3 truncate"
            >
              {blog.author}
            </span>
          </div>
          <span
            className="text-muted text-[8px] font-normal leading-3 whitespace-nowrap shrink-0"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {blog.date}
          </span>
        </div>
      </div>
    </a>
  );
}

// ── BlogCardMobile (stacked, full-width) ──────────────────────────────────────
function BlogCardMobile({ blog, index, visible }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);
  const enterDelay = index * 60;

  const cardTransform = !visible
    ? "translateY(24px)"
    : hovered
    ? "translateY(-5px)"
    : "translateY(0px)";

  const cardTransition = !visible
    ? `opacity 0.55s ease ${enterDelay}ms, transform 0.55s ${EASE_OUT} ${enterDelay}ms`
    : hovered
    ? `transform 0.45s ${SPRING}, box-shadow 0.45s ${EASE_OUT}`
    : `transform 0.5s ${EASE_OUT}, box-shadow 0.5s ${EASE_OUT}`;

  return (
    <a
      href={blog.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl flex flex-col gap-0 overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: cardTransform,
        transition: cardTransition,
        willChange: "transform, box-shadow",
        backgroundColor: "white",
        boxShadow: hovered
          ? "0 16px 44px -8px color-mix(in srgb, var(--color-brand-champagne) 18%, transparent), 0 4px 16px -4px color-mix(in srgb, black 6%, transparent)"
          : "0 1px 4px color-mix(in srgb, black 4%, transparent)",
      }}
    >
      {/* Cover image */}
      <div className="relative w-full h-45 overflow-hidden shrink-0" style={{ borderRadius: "11px 11px 0 0" }}>
        <Image
          src={blog.coverImg}
          alt={blog.title}
          fill
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: `transform 0.65s ${EASE_OUT}`,
          }}
          sizes="100vw"
          unoptimized
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, color-mix(in srgb, var(--color-brand-champagne) 12%, transparent), transparent)",
            opacity: hovered ? 1 : 0,
            transition: `opacity 0.4s ${EASE_OUT}`,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        <span
          className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-md w-fit"
          style={{
            backgroundColor: hovered ? "color-mix(in srgb, var(--color-brand-champagne) 10%, transparent)" : "color-mix(in srgb, var(--color-brand-champagne) 5%, transparent)",
            transition: `background-color 0.3s ease`,
          }}
        >
          <span
            className="text-brand-royal text-[9px] font-medium leading-3 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {blog.category}
          </span>
        </span>

        <h3
          className="text-[20px] font-semibold leading-7 m-0"
          style={{
            fontFamily: 'var(--font-body)',
            color: hovered ? "var(--color-brand-royal)" : "var(--color-ink)",
            transition: `color 0.3s ease`,
          }}
        >
          {blog.title}
        </h3>

        <div
          style={{
            height: "1px",
            backgroundColor: hovered ? "color-mix(in srgb, var(--color-brand-champagne) 15%, transparent)" : "var(--color-surface-alt)",
            transition: `background-color 0.3s ease`,
          }}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="relative w-9 h-9 rounded-full overflow-hidden shrink-0"
              style={{
                outline: hovered ? "2px solid color-mix(in srgb, var(--color-brand-champagne) 25%, transparent)" : "2px solid transparent",
                outlineOffset: "1px",
                transition: `outline-color 0.3s ease`,
              }}
            >
              <Image src={blog.authorImg} alt={blog.author} fill className="object-cover" unoptimized />
            </div>
            <span
              className="text-muted text-[14px] font-medium leading-6 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {blog.author}
            </span>
          </div>
          <span
            className="text-muted text-[12px] font-medium leading-4 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {blog.date}
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
interface BlogsGridProps {
  blogs?: BlogCardItem[];
  featuredBlog?: Omit<BlogCardItem, "id">;
  heading?: string;
  headingAccent?: string;
  description?: string;
}

export default function BlogsGrid({
  blogs = DEFAULT_CONTENT_BlogsGrid.blogs,
  featuredBlog = DEFAULT_CONTENT_BlogsGrid.featuredBlog,
  heading = DEFAULT_CONTENT_BlogsGrid.heading,
  headingAccent = DEFAULT_CONTENT_BlogsGrid.headingAccent,
  description = DEFAULT_CONTENT_BlogsGrid.description,
}: BlogsGridProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Scroll-in observer
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

  // Keep the initial grid compact, then reveal the remaining cards on demand.
  const desktopLimitedBlogs = showAll ? blogs : blogs.slice(0, DEFAULT_CONTENT_BlogsGrid.desktopInitialCount);
  const mobileLimitedBlogs = showAll ? blogs : blogs.slice(0, DEFAULT_CONTENT_BlogsGrid.mobileInitialCount);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-brand-sky/20 px-5 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20"
    >
      {/* ── Section heading ──────────────────────────────────────────── */}
      <div
        className="flex flex-col gap-2 mb-8 md:mb-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 0.05s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s",
        }}
      >
        <h2
          className="text-4xl  md:text-[48px] font-extrabold leading-none m-0 not-italic"
          style={{ fontFamily: 'var(--font-heading)', color: "var(--color-ink)" }}
        >
          {heading}{" "}
          <span style={{ color: "var(--color-brand-forest)" }}>{headingAccent}</span>
        </h2>
        <p
          className="text-[14px] md:text-[16px] font-normal leading-normal m-0"
          style={{
            fontFamily: 'var(--font-body)',
            color: "color-mix(in srgb, black 60%, transparent)",
            letterSpacing: "-0.2px",
          }}
        >
          {description}
        </p>
      </div>

      {/* ── DESKTOP layout (md+) ──────────────────────────────────────── */}
      <div className="hidden md:flex flex-col gap-11">
        {/* Featured hero card */}
        <a
          href= {featuredBlog.href}
          className="group relative w-full h-143.5 rounded-xl overflow-hidden flex
           flex-col justify-end p-10 cursor-pointer
                     hover:-translate-y-1 hover:shadow-md shadow-black/35"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ease 0.1s,
                         transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s,
                         box-shadow 0.4s cubic-bezier(0.22,1,0.36,1)`,
            willChange: "transform, box-shadow",
          }}
        >
          {/* Background image — zooms on hover */}
          <Image
            src={featuredBlog.coverImg}
            alt={featuredBlog.title}
            fill
            className="object-cover transition-transform duration-700 
            ease-[cubic-bezier(0.22,1,0.36,1)]
                       group-hover:scale-[1.04]"
            sizes="100vw"
            unoptimized
            priority
          />
          {/* Base overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-xl
                         group-hover:bg-black/50 transition-colors 
                         duration-500" />
          {/* Bottom gradient — always present, deepens on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/75
           via-transparent to-transparent
            opacity-80 group-hover:opacity-100 transition-opacity
            duration-500 rounded-xl" />

          {/* Content */}
          <div className="relative flex flex-col gap-6 w-full">
            {/* Heading block */}
            <div className="flex flex-col gap-4">
              {/* Badge */}
              <span className="inline-flex items-center justify-center px-2.5 py-1
               rounded-md bg-brand-royal w-fit">
                <span
                  className="text-white text-[14px] font-medium leading-5 whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {featuredBlog.category}
                </span>
              </span>

              {/* Title */}
              <h2
                className="text-white text-[36px] font-semibold leading-10 m-0 
                max-w-180"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {featuredBlog.title}
              </h2>
            </div>

            {/* Short info */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={featuredBlog.authorImg}
                    alt={featuredBlog.author}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <span
                  className="text-white text-[16px] font-medium leading-6 whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {featuredBlog.author}
                </span>
              </div>
              <span
                className="text-white text-[16px] font-normal leading-6 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {featuredBlog.date}
              </span>
            </div>
          </div>
        </a>

        {/* Blog card rows — 4 per row */}
        <div className="flex flex-col gap-5">
          {/* Row 1: blogs 0–3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {desktopLimitedBlogs.slice(0, 4).map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} visible={visible} />
            ))}
          </div>

          {/* Row 2: blogs 4–7 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {desktopLimitedBlogs.slice(4, 8).map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} visible={visible} />
            ))}
          </div>

          {/* Row 3: blogs 8–10 (3 cards, last column empty) */}
          {desktopLimitedBlogs.length > 8 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {desktopLimitedBlogs.slice(8, 11).map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} visible={visible} />
              ))}
            </div>
          )}
        </div>

        {/* More Articles button */}
        {blogs.length > 8 && (
          <div
            className="flex justify-center"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.5s",
            }}
          >
            <Button
              onClick={() => setShowAll((value) => !value)}
              variant="outline"
              size="bare"
              shape="lg"
              className="gap-3 border border-black/30 px-6 py-3 text-base leading-6
                text-body hover:border-brand-royal hover:bg-brand-champagne/4
                hover:text-brand-royal hover:shadow-lg shadow-brand-champagne/10
                active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {showAll ? "Show Less" : "More Articles"}
            </Button>
          </div>
        )}
      </div>

      {/* ── MOBILE layout (< md) ──────────────────────────────────────── */}
      <div className="flex flex-col gap-6 md:hidden">
        {/* Mobile featured card */}
        <a
          href={featuredBlog.href}
          className="group relative w-full h-100 rounded-2xl 
          overflow-hidden flex flex-col justify-end p-5 cursor-pointer
         active:scale-[0.99] hover:shadow-md shadow-black/30"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ease 0.1s,
                         transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s,
                         box-shadow 0.4s cubic-bezier(0.22,1,0.36,1)`,
            willChange: "transform, box-shadow",
          }}
        >
          {/* Background image — zooms on hover */}
          <Image
            src={featuredBlog.coverImg}
            alt={featuredBlog.title}
            fill
            className="object-cover transition-transform duration-700
             ease-[cubic-bezier(0.22,1,0.36,1)]
                       group-hover:scale-[1.04]"
            sizes="100vw"
            unoptimized
            priority
          />
          {/* Base overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-2xl
                         group-hover:bg-black/50 transition-colors duration-500" />
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent
                         opacity-80 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

          {/* Content */}
          <div className="relative flex flex-col gap-3">
            {/* Badge */}
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md
             bg-brand-royal w-fit">
              <span
                className="text-white text-[14px] font-medium leading-5 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {featuredBlog.category}
              </span>
            </span>

            {/* Title */}
            <h2
              className="text-white text-[28px] font-semibold leading-[1.15] m-0"
              style={{ fontFamily: 'var(--font-sub)' }}
            >
              {featuredBlog.title}
            </h2>

            {/* Short info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={featuredBlog.authorImg}
                    alt={featuredBlog.author}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <span
                  className="text-white text-[14px] font-medium leading-6 whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {featuredBlog.author}
                </span>
              </div>
              <span
                className="text-white text-[12px] font-medium leading-4 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {featuredBlog.date}
              </span>
            </div>
          </div>
        </a>

        {/* Mobile blog card list */}
        {mobileLimitedBlogs.map((blog, i) => (
          <BlogCardMobile key={blog.id} blog={blog} index={i} visible={visible} />
        ))}

        {/* More Articles button */}
        {blogs.length > 4 && (
          <div className="flex justify-center mt-2">
            <Button
              onClick={() => setShowAll((value) => !value)}
              variant="outline"
              size="bare"
              shape="lg"
              className="gap-3 border border-black/30 px-6 py-3 text-base leading-6
                text-body hover:border-brand-royal hover:bg-brand-champagne/4
                hover:text-brand-royal hover:shadow-lg shadow-brand-champagne/10
                active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {showAll ? "Show Less" : "More Articles"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
