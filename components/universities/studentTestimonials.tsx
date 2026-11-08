"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    /** Full card-list replacement (defaults shipped below; per-card editor
     *  overrides win over these). */
    cards?: TestimonialCard[];
    /**
     * Per-card overrides for the CMS editor (flat keys, one set per card):
     * card1Name/card1Role/card1Quote/card1Image … card4Name/card4Role/…
     */
    card1Name?: string;
    card1Role?: string;
    card1Quote?: string;
    card1Image?: string;
    card2Name?: string;
    card2Role?: string;
    card2Quote?: string;
    card2Image?: string;
    card3Name?: string;
    card3Role?: string;
    card3Quote?: string;
    card3Image?: string;
    card4Name?: string;
    card4Role?: string;
    card4Quote?: string;
    card4Image?: string;
};

const DEFAULT_CARDS: TestimonialCard[] = [
    {
        name: "Dr. Nadia Owen",
        role: "Legal Counsel",
        quote:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/home/team-nadia.jpg",
    },
    {
        name: "Mr. Thomas Reed",
        role: "Software Engineer",
        quote:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/home/team-ethan.jpg",
    },
    {
        name: "Ms. Clara Bennett",
        role: "Product Manager",
        quote:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "/home/team-chloe.jpg",
    },
    {
        name: "Dr. Emily Carter",
        role: "Data Scientist",
        quote:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/home/team-sam.jpg",
    },
];

export const DEFAULT_CONTENT: Required<StudentTestimonialsProps> = {
    sectionLabel: "Student testimonials",
    heading: "What Our Students Say",
    subtitle:
        "Hear from our happy students! See how we've helped them achieve their goals and create lasting impact.",
    cards: DEFAULT_CARDS,
    /* flat mirrors of `cards` — the editor seeds and overrides these */
    card1Name: DEFAULT_CARDS[0].name,
    card1Role: DEFAULT_CARDS[0].role,
    card1Quote: DEFAULT_CARDS[0].quote,
    card1Image: DEFAULT_CARDS[0].image,
    card2Name: DEFAULT_CARDS[1].name,
    card2Role: DEFAULT_CARDS[1].role,
    card2Quote: DEFAULT_CARDS[1].quote,
    card2Image: DEFAULT_CARDS[1].image,
    card3Name: DEFAULT_CARDS[2].name,
    card3Role: DEFAULT_CARDS[2].role,
    card3Quote: DEFAULT_CARDS[2].quote,
    card3Image: DEFAULT_CARDS[2].image,
    card4Name: DEFAULT_CARDS[3].name,
    card4Role: DEFAULT_CARDS[3].role,
    card4Quote: DEFAULT_CARDS[3].quote,
    card4Image: DEFAULT_CARDS[3].image,
};

const stars = Array.from({ length: 5 });

export default function StudentTestimonials({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    heading = DEFAULT_CONTENT.heading,
    subtitle = DEFAULT_CONTENT.subtitle,
    cards = DEFAULT_CONTENT.cards,
    card1Name = DEFAULT_CONTENT.card1Name,
    card1Role = DEFAULT_CONTENT.card1Role,
    card1Quote = DEFAULT_CONTENT.card1Quote,
    card1Image = DEFAULT_CONTENT.card1Image,
    card2Name = DEFAULT_CONTENT.card2Name,
    card2Role = DEFAULT_CONTENT.card2Role,
    card2Quote = DEFAULT_CONTENT.card2Quote,
    card2Image = DEFAULT_CONTENT.card2Image,
    card3Name = DEFAULT_CONTENT.card3Name,
    card3Role = DEFAULT_CONTENT.card3Role,
    card3Quote = DEFAULT_CONTENT.card3Quote,
    card3Image = DEFAULT_CONTENT.card3Image,
    card4Name = DEFAULT_CONTENT.card4Name,
    card4Role = DEFAULT_CONTENT.card4Role,
    card4Quote = DEFAULT_CONTENT.card4Quote,
    card4Image = DEFAULT_CONTENT.card4Image,
}: StudentTestimonialsProps) {
    /* per-card overrides win over the shipped card list */
    const testimonials: TestimonialCard[] = [
        { name: card1Name, role: card1Role, quote: card1Quote, image: card1Image },
        { name: card2Name, role: card2Role, quote: card2Quote, image: card2Image },
        { name: card3Name, role: card3Role, quote: card3Quote, image: card3Image },
        { name: card4Name, role: card4Role, quote: card4Quote, image: card4Image },
    ];
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
