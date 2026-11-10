"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode[];
  itemsPerSlide?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Carousel({
  children,
  itemsPerSlide = 1,
  autoPlay = false,
  autoPlayInterval = 4000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = Math.ceil(children.length / itemsPerSlide);

const left= "left-0 sm:left-2 top-1/2 "
const right= "right-2 top-1/2 "
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalSlides]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalSlides]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {/* Navigation Buttons */}
         {/* ── Navigation Buttons (Andar shift kiye hain) ── */}
        <Button
          size="icon"
          variant="brand"
          shape="pill"
          onClick={goToPrev}
          disabled={isTransitioning}
          className={cn("absolute z-20 -translate-y-1/2 text-white hover:scale-110 sm:size-12", left)}
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>

        <Button
          size="icon"
          variant="brand"
          shape="pill"
          onClick={goToNext}
          disabled={isTransitioning}
          className={cn("absolute z-20 -translate-y-1/2 text-white hover:scale-110 sm:size-12", right)}
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>

      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIdx) => (
            <div key={slideIdx} className="w-full shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                {children
                  .slice(slideIdx * itemsPerSlide, (slideIdx + 1) * itemsPerSlide)
                  .map((child, childIdx) => (
                    <div key={childIdx} className="w-full">
                      {child}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <Button
            variant="unstyled"
            size="bare"
            shape="pill"
            aria-label={`Go to slide ${idx + 1}`}
            key={idx}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(idx);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            className={cn(
              "h-2 rounded-full duration-300",
              idx === currentIndex
                ? "w-8 bg-brand-green"
                : "w-2 bg-line-strong hover:bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}