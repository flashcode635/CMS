"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type Key,
  type ReactNode,
  type TouchEvent,
} from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export interface ThreeDCarouselItemState {
  index: number;
  isActive: boolean;
  total: number;
}

export interface ThreeDCarouselProps<T> {
  items: readonly T[];
  renderItem: (item: T, state: ThreeDCarouselItemState) => ReactNode;
  getItemKey?: (item: T, index: number) => Key;
  defaultIndex?: number;
  onIndexChange?: (index: number, item: T) => void;
  loop?: boolean;
  clickToFocus?: boolean;
  keyboardNavigation?: boolean;
  swipeNavigation?: boolean;
  swipeThreshold?: number;
  cardWidth?: number;
  cardHeight?: number;
  sceneHeight?: number;
  radius?: number;
  minRadius?: number;
  radiusPadding?: number;
  perspective?: number;
  transitionDuration?: number;
  easing?: string;
  inactiveOpacity?: number;
  inactiveScale?: number;
  activeScale?: number;
  cardRadius?: number;
  showDecorations?: boolean;
  showControls?: boolean;
  showDots?: boolean;
  controlsPosition?: "bottom" | "sides";
  previousLabel?: string;
  nextLabel?: string;
  regionLabel?: string;
  dotsLabel?: string;
  getDotLabel?: (index: number, total: number) => string;
  getSlideLabel?: (item: T, index: number, total: number) => string;
  announceSlide?: boolean;
  className?: string;
  sceneClassName?: string;
  rotatorClassName?: string;
  itemClassName?: string;
  cardClassName?: string;
  controlsClassName?: string;
  dotsClassName?: string;
  sceneStyle?: CSSProperties;
  rotatorStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  cardStyle?: CSSProperties;
  emptyState?: ReactNode;
}

/**
 * Generic flat 2D carousel.
 *
 * The public API keeps the original name for compatibility, but cards now sit
 * in a simple horizontal track with one focused card visible at a time.
 */
export function ThreeDCarousel<T>({
  items,
  renderItem,
  getItemKey,
  defaultIndex = 0,
  onIndexChange,
  loop = true,
  clickToFocus = true,
  keyboardNavigation = true,
  swipeNavigation = true,
  swipeThreshold = 40,
  cardWidth = 360,
  cardHeight = 450,
  sceneHeight,
  transitionDuration = 450,
  easing = "cubic-bezier(0.25, 1, 0.5, 1)",
  cardRadius = 20,
  showControls = true,
  showDots = true,
  controlsPosition = "bottom",
  previousLabel = "Previous",
  nextLabel = "Next",
  regionLabel = "Carousel",
  dotsLabel = "Choose slide",
  getDotLabel = (index) => `Go to slide ${index + 1}`,
  getSlideLabel = (_item, index, total) => `Slide ${index + 1} of ${total}`,
  announceSlide = true,
  className,
  sceneClassName,
  rotatorClassName,
  itemClassName,
  cardClassName,
  controlsClassName,
  dotsClassName,
  sceneStyle,
  rotatorStyle,
  itemStyle,
  cardStyle,
  emptyState = null,
}: ThreeDCarouselProps<T>) {
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(() =>
    clamp(defaultIndex, 0, Math.max(total - 1, 0)),
  );
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (total === 0) {
    return emptyState ? <div className={className}>{emptyState}</div> : null;
  }

  const goTo = (index: number) => {
    if (total <= 1) return;

    const nextIndex = loop
      ? (index + total) % total
      : clamp(index, 0, total - 1);
    if (nextIndex === activeIndex) return;

    setActiveIndex(nextIndex);
    onIndexChange?.(nextIndex, items[nextIndex]);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!keyboardNavigation) return;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        goPrev();
        break;
      case "ArrowRight":
        event.preventDefault();
        goNext();
        break;
      case "Home":
        event.preventDefault();
        goTo(0);
        break;
      case "End":
        event.preventDefault();
        goTo(total - 1);
        break;
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (!swipeNavigation) return;
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!swipeNavigation || !touchStart.current) return;

    const start = touchStart.current;
    touchStart.current = null;
    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (
      Math.abs(deltaX) < swipeThreshold ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) goNext();
    else goPrev();
  };

  const canPrev = loop || activeIndex > 0;
  const canNext = loop || activeIndex < total - 1;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center overflow-hidden",
        className,
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      tabIndex={keyboardNavigation ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div
        className={cn(
          "relative flex w-full justify-center overflow-hidden",
          sceneClassName,
        )}
        style={{
          height: sceneHeight ?? cardHeight + 24,
          ...sceneStyle,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn(
            "absolute inset-x-0 top-3",
            rotatorClassName,
          )}
          style={{
            width: "100%",
            height: cardHeight,
            "--carousel-card-width": `min(${cardWidth}px, 78vw)`,
            ...rotatorStyle,
          } as CSSProperties}
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={getItemKey ? getItemKey(item, index) : index}
                role="group"
                aria-roledescription="slide"
                aria-label={getSlideLabel(item, index, total)}
                aria-current={isActive ? "true" : undefined}
                data-active={isActive}
                className={cn(
                  "absolute top-0 left-1/2 h-full px-2",
                  clickToFocus && !isActive && "cursor-pointer",
                  itemClassName,
                )}
                style={{
                  width: "var(--carousel-card-width)",
                  opacity: isActive ? 1 : 0.52,
                  transform: `translateX(calc(-50% + ${(index - activeIndex) * 100}%)) translateY(${isActive ? -10 : 0}px) scale(${isActive ? 1 : 0.91})`,
                  transition: reducedMotion
                    ? "none"
                    : `transform ${transitionDuration}ms ${easing}, opacity ${transitionDuration}ms ease`,
                  zIndex: isActive ? 2 : 1,
                  ...itemStyle,
                }}
                onClick={() => {
                  if (clickToFocus && !isActive) goTo(index);
                }}
              >
                <div
                  className={cn(
                    "relative h-full w-full overflow-hidden",
                    cardClassName,
                  )}
                  style={{
                    borderRadius: cardRadius,
                    background:
                      "linear-gradient(135deg, #0E8F5B 0%, #0A6B44 55%, #0B3B2E 100%)",
                    boxShadow: isActive
                      ? "0 22px 48px rgba(20, 52, 105, 0.3), 0 0 0 1px rgba(255,255,255,0.24)"
                      : "0 10px 24px rgba(20, 52, 105, 0.14)",
                    transition: reducedMotion
                      ? "none"
                      : `box-shadow ${transitionDuration}ms ease`,
                    ...cardStyle,
                  }}
                >
                  {renderItem(item, { index, isActive, total })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {announceSlide && (
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {`Slide ${activeIndex + 1} of ${total}`}
        </p>
      )}

      {(showDots || showControls) && (
        <div
          className={cn(
            "z-10 mt-6 flex flex-col items-center gap-4",
            controlsPosition === "sides" && "mt-0",
            controlsClassName,
          )}
        >
          {showDots && (
            <div
              className={cn("flex items-center gap-2", dotsClassName)}
              role="group"
              aria-label={dotsLabel}
            >
              {items.map((item, index) => (
                <Button
                  key={getItemKey ? getItemKey(item, index) : index}
                  variant="unstyled"
                  size="icon"
                  onClick={() => goTo(index)}
                  className="shrink-0 rounded-full border-0 p-0 transition-all duration-200"
                  style={{
                    width: activeIndex === index ? 24 : 8,
                    height: 8,
                    background:
                      activeIndex === index
                        ? "linear-gradient(90deg, #0E8F5B, #0B3B2E)"
                        : "rgba(216,178,110,0.25)",
                  }}
                  aria-label={getDotLabel(index, total)}
                  aria-current={activeIndex === index ? "true" : undefined}
                />
              ))}
            </div>
          )}

          {showControls && (
            <div
              className={cn(
                "flex items-center gap-4",
                controlsPosition === "sides" &&
                  "pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-3",
              )}
            >
              <Button
                variant="brand"
                size="icon"
                onClick={goPrev}
                disabled={!canPrev}
                className="pointer-events-auto flex size-10 items-center justify-center rounded-full border-0 transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #0E8F5B, #0B3B2E)",
                  boxShadow: "0 8px 18px rgba(25,75,170,0.22)",
                }}
                aria-label={previousLabel}
              >
                <span aria-hidden="true" className="text-2xl leading-none">
                  ‹
                </span>
              </Button>
              <Button
                variant="brand"
                size="icon"
                onClick={goNext}
                disabled={!canNext}
                className="pointer-events-auto flex size-10 items-center justify-center rounded-full border-0 transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #0E8F5B, #0B3B2E)",
                  boxShadow: "0 8px 18px rgba(25,75,170,0.22)",
                }}
                aria-label={nextLabel}
              >
                <span aria-hidden="true" className="text-2xl leading-none">
                  ›
                </span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ThreeDCarousel;
