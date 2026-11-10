"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS_CONTENT } from "@/lib/universitySectionData";

export type TestimonialCard = {
    name: string;
    role: string;
    quote: string;
    image: string;
};

export type StudentTestimonialsProps = {
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Gradient heading ("What Our Students Say"). */
    heading?: string;
    /** Small copy under the heading. */
    subtitle?: string;
    /** Testimonial cards — CMS-editable: add/delete/reorder any number. */
    cards?: TestimonialCard[];
};

export const DEFAULT_CONTENT: Required<StudentTestimonialsProps> = TESTIMONIALS_CONTENT;

const stars = Array.from({ length: 5 });

export default function StudentTestimonials({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    heading = DEFAULT_CONTENT.heading,
    subtitle = DEFAULT_CONTENT.subtitle,
    cards = DEFAULT_CONTENT.cards,
}: StudentTestimonialsProps) {
    /* The card LIST is the data source (any count, any order) — exactly what
       the CMS card editor writes into the `cards` override. */
    const testimonials: TestimonialCard[] = cards;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updatePageCount = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setPageCount(Math.max(1, Math.ceil(maxScroll / track.clientWidth) + 1));
      setActivePage(Math.round(track.scrollLeft / track.clientWidth));
    };

    updatePageCount();
    const observer = new ResizeObserver(updatePageCount);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const nextPage = Math.max(
      0,
      Math.min(activePage + direction, pageCount - 1),
    );
    track.scrollTo({
      left: nextPage * track.clientWidth,
      behavior: "smooth",
    });
    setActivePage(nextPage);
  };

  const goToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollTo({
      left: page * track.clientWidth,
      behavior: "smooth",
    });
    setActivePage(page);
  };

  return (
    <section
      aria-labelledby="student-testimonials-title"
      className="relative overflow-hidden px-6 py-14 @min-[640px]:px-8 @min-[1024px]:px-10 @min-[1024px]:py-16"
      style={{
        background:
          "linear-gradient(112deg, var(--color-surface-alt) 0%, var(--color-surface) 51%, var(--color-brand-champagne-soft-bg) 100%)",
      }}
    >
      <div className="mx-auto max-w-350">
        <div className="mb-10 text-center @min-[640px]:mb-12">
          <h2
            id="student-testimonials-title"
            className="bg-linear-to-r from-brand-green to-brand-blue bg-clip-text text-3xl font-bold text-transparent @min-[640px]:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-1 text-[9px] text-muted @min-[640px]:text-[10px]">
            {subtitle}
          </p>
        </div>

        <div
          ref={trackRef}
          className="student-testimonials-track flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth @min-[640px]:gap-5"
          style={{ scrollbarWidth: "none" }}
          tabIndex={0}
          aria-label="Student testimonials carousel"
          onScroll={(event) => {
            const track = event.currentTarget;
            setActivePage(Math.round(track.scrollLeft / track.clientWidth));
          }}
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="w-[calc(100%-2px)] min-w-[calc(100%-2px)] snap-start overflow-hidden rounded-[9px] bg-white shadow-sm @min-[640px]:w-[calc(50%-10px)] @min-[640px]:min-w-[calc(50%-10px)] @min-[1024px]:w-[calc(25%-15px)] @min-[1024px]:min-w-[calc(25%-15px)]"
            >
                <div className="px-4 pb-4 pt-4 text-center @min-[640px]:px-5">
                  <div
                    className="mb-2 flex justify-center gap-0.5 text-[10px] tracking-wide"
                    aria-label="5 out of 5 stars"
                  >
                    {stars.map((_, index) => (
                      <span key={index} aria-hidden="true" className="text-brand-champagne">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="mx-auto min-h-16 max-w-58.75 text-[10px] leading-[1.55] text-muted @min-[640px]:text-[11px]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                <div className="relative mx-3 h-32 overflow-hidden rounded-[3px] @min-[640px]:h-36">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name}, ${testimonial.role}`}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                    className="object-cover object-center"
                  />
                </div>

                <div className="-mt-px bg-body px-3 py-3 text-center text-white">
                  <p className="text-[10px] font-semibold @min-[640px]:text-[11px]">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-[8px] text-white/85">
                    {testimonial.role}
                  </p>
                </div>
            </article>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2">
          <button
            type="button"
            aria-label="Previous student testimonials"
            onClick={() => move(-1)}
            disabled={activePage === 0}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-lg leading-none text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next student testimonials"
            onClick={() => move(1)}
            disabled={activePage === 1}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-brand-green to-brand-blue text-lg leading-none text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ›
          </button>
        </div>
        <div className="mt-3 flex justify-center gap-1.5" aria-label="Choose testimonial page">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              key={page}
              type="button"
              aria-label={`Go to testimonial page ${page + 1}`}
              aria-current={activePage === page ? "true" : undefined}
              onClick={() => goToPage(page)}
              className={`h-1.5 rounded-full transition-all ${
                activePage === page ? "w-5 bg-brand-blue" : "w-1.5 bg-brand-champagne/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
