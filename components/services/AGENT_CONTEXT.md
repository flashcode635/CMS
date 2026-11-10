# Directory: components/services

Primary Purpose: Sections of the `/about-us/services` page — the 3×3 services grid with hover animation and the animated "Admission Process" timeline. Both are client components; neither fetches data.

## Files

### `AdmissionProcess.tsx`
[AdmissionProcess.tsx]: Scroll-driven 4-step admission timeline where an SVG path fills as the user scrolls.

- **Runtime:** Client component — `"use client"` (hooks, `window`, scroll listener).
- **Purpose:** Explains the MBBS-abroad admission journey in four alternating cards (1 Research & Apply, 2 Visa & Travel, 3 Start MBBS Program, 4 Post-Admission Steps) connected by a gradient snake path that draws itself in proportion to scroll position.
- **Props:** None.
- **State & effects:**
  - `pathRef` (`useRef<SVGPathElement | null>`) on the animated `<path>`; `containerRef` (`useRef<HTMLDivElement | null>`) on the `height: 1100px` stage.
  - `pathLength` (`useState(0)`) — effect 1 (deps `[]`) calls `pathRef.current.getTotalLength()` once on mount.
  - `fillProgress` (`useState(0)`) — effect 2 (deps `[]`) registers `window.addEventListener("scroll", handleScroll, { passive: true })`, calls `handleScroll()` once immediately, and removes the listener in cleanup. `handleScroll` reads `containerRef.current.getBoundingClientRect()`, uses `start = window.innerHeight * 0.85`, `total = rect.height + start`, `scrolled = start - rect.top`, then `setFillProgress(min(1, max(0, scrolled / total)))`.
  - Derived: `dashOffset = pathLength > 0 ? pathLength * (1 - fillProgress) : pathLength`.
- **Handlers:** `handleScroll` (above) is the only event handler. The "Register Now" `Button` has **no `onClick` and no `href`** — it is inert.
- **Constants & types:**
  - `steps` (4) — `{ number, title, description, side: "left" | "right" }`; descriptions mention eligibility "50% in PCB", a "6-year course (including internship)", optional Russian lessons, FMGE/USMLE prep.
  - `PATH` — one long SVG path in a `0 0 700 1060` viewBox: starts `M 350 20`, cubic curves to x=108 (steps 1/3) and x=592 (steps 2/4) at y=180/380/580/780, ends `L 350 1000` at the arrowhead. The comment block (lines 67–79) documents those coordinates.
  - Inline per-card math: `svgCenters = [180, 380, 580, 780]`, `svgH = 1060`, `containerH = 1100`, `topPx = (svgCenters[i] / svgH) * containerH`.
- **Data flow:** Outer `<div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-blue-50 py-16 px-4">` → `max-w-2xl mx-auto` → header (`h1` "Admission Process", subtitle "A Step-by-Step Guide to How Nominations Are Made") → `relative` stage (`height: 1100px`) containing (a) an absolutely positioned SVG with `<defs>` (`linearGradient id="lineGrad"` green→blue, markers `arrowGhost` `#c7d2fe` / `arrowFilled` `#2563eb`), a ghost path, the animated path (`strokeDasharray={pathLength || 9999}`, `strokeDashoffset={dashOffset}`, `markerEnd` swaps when `fillProgress > 0.97`), and a top dot that turns `#15803d` once `fillProgress > 0.01`; (b) `steps.map` → absolutely positioned card wrappers (`top`, `translateY(-50%)`, `left` 4%/14%, `right` 14%/4%, `width: 82%`) each holding a white/80 blurred card with a gradient number circle (`linear-gradient(135deg, #15803d 0%, #2563eb 100%)`) overlapping the card edge (`marginLeft/-2.5rem`, `marginRight/-2.5rem`) and text aligned with the side → footer "Register Now" `Button variant="brand"` with an inline gradient that overrides the variant colours.
- **Dependencies:** `react` (`useEffect`, `useRef`, `useState`), `@/components/ui/Button`. No images, no network.
- **Consumers:** `app/(site)/about-us/services/page.tsx` (rendered after `ServicesGrid`).
- **Notes:**
  - **Responsive risk (highest):** the stage is a fixed `1100px` tall and cards are absolutely positioned with `width: 82%` plus both `left` and `right`. For an absolutely positioned box all three are honoured only by ignoring `right` (LTR over-constraint), so cards effectively sit at `left: 4%`/`14%` and stay 82% wide — at phone widths the two-column offsets collapse and the number circle can clip off-screen. There are no `sm:`/`md:` variants at all; a real fix needs a breakpoint-based layout (stacked cards on mobile).
  - **Performance:** `setFillProgress` fires on every scroll event with no `requestAnimationFrame`/throttle, re-rendering the whole card list on each tick. If this section feels janky, throttle here first.
  - **Global SVG ids:** `lineGrad`, `arrowGhost`, `arrowFilled` are document-global — rendering `AdmissionProcess` twice on one page would collide.
  - **Dead affordance:** "Register Now" does nothing (no link/handler). The subtitle "A Step-by-Step Guide to How Nominations Are Made" is leftover template copy from a nominations page and does not describe an MBBS admission process.
  - `min-h-screen` on the wrapper adds a full viewport of minimum height plus `py-16`, so the section can leave a large empty band if the stage shrinks.
  - Before `getTotalLength()` runs (first paint), `pathLength` is `0`, so `strokeDashoffset` is `0` and the path flashes fully drawn for one frame.

### `ServicesGrid.tsx`
[ServicesGrid.tsx]: Intersection-triggered grid of 9 service cards with gradient "sweep" hover fill, shine streak and staggered text reveal.

- **Runtime:** Client component — `"use client"` (hooks, `IntersectionObserver`, mouse handlers).
- **Purpose:** Renders the service offering on `/about-us/services`: Personal Guidance & Counseling, Selection of University, 100% Admission Assistance, Pre-Departure Pilotage, FMGE/NEXT Coaching, Continuous Student Support, On-Arrival Benefits., Indian Food & Lifestyle Support., Accommodation Guidance.
- **Props:** None on the default export. `ServiceCard` takes `{ service: ServiceItem; isVisible: boolean; cardDelay: number }`.
- **State & effects:**
  - `ServicesGrid` — `sectionRef` (`useRef<HTMLDivElement | null>`), `sectionVisible` (`useState(false)`), `cardsVisible` (`useState(Array(SERVICES.length).fill(false))`, i.e. 9 `false`s). One `useEffect` (deps `[]`) creates an `IntersectionObserver` (`threshold: 0.05`) on the section; on first intersection it sets `sectionVisible`, then for each service schedules `setTimeout(..., i * 140)` that flips `cardsVisible[i]` via a copied array, and finally calls `observer.disconnect()`. Cleanup only disconnects the observer — **the nine timers are never cleared**.
  - `ServiceCard` — `sweepState` (`useState("idle")`, one of `"idle" | "in" | "out"`), `shining` (`useState(false)`), derived `isHovered = sweepState === "in"`. No effects.
- **Handlers:**
  - `handleMouseEnter` → `setSweepState("in")`, `setShining(false)`, then `requestAnimationFrame(() => setTimeout(() => setShining(true), 180))` so the shine lands mid-sweep. Neither the rAF nor the timeout is cancelled on unmount or on a fast leave.
  - `handleMouseLeave` → `setSweepState("out")`, `setShining(false)`.
  - No click handler / link anywhere.
- **Internal components & types:** `interface ServiceItem { id: number; title: string; image: string; body: string[] }`; `interface ServiceCardProps { service: ServiceItem; isVisible: boolean; cardDelay: number }`; `ServiceCard` composes the card: sweep layer (`card-sweep-bg` / `card-sweep-bg-out`, gradient `linear-gradient(102.49deg, #00923F 12.704%, #3163FF 87.17%)`), shine layer, photo (`fill`, `unoptimized`, `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`), title (`min-h-[2em]`, turns white when hovered, `text-enter`), body paragraphs (each staggered `cardDelay + 200 + i * 80` ms). Shadows: `hoverShadow` (4-layer lift/glow) vs `idleShadow`.
- **Constants & types:**
  - `ANIMATION_STYLES` — a template string injected with `<style>{ANIMATION_STYLES}</style>`; declares `@keyframes sweepIn`, `sweepOut`, `cardReveal`, `textReveal`, `imgZoomIn`, `imgZoomOut`, the utility classes `.card-sweep-bg`, `.card-sweep-bg-out`, `.card-enter`, `.text-enter`, `.img-zoom-in`, `.img-zoom-out`, `.shine-pass`, and `.services-grid` (3 columns, `gap: 1.67vw`; ≤1024px → 2 columns/`2.5vw`; ≤640px → 1 column/`5vw`) plus mobile radius overrides for `.service-card` / `.service-card-image`.
  - `SERVICES` (9) — each `{ id, title, image, body: [para, para] }`; images are **remote Unsplash URLs** (`https://images.unsplash.com/photo-…?w=800&q=80`), allowed by `images.remotePatterns` in `next.config.ts`. Bodies are two paragraphs each; ids 1, 3, 4, 6, 7, 9 repeat the same generic "Finding a university abroad…" copy and ids 2, 5, 8 repeat the "50+ top medical universities across 20+ countries" copy.
- **Data flow:** `<>` → `<style>` block → `<section ref={sectionRef}>` (fades in: `opacity-0 translate-y-12` → `opacity-100 translate-y-0`, `duration-1000`; padding `clamp(20px,2.5vw,46px) clamp(16px,8.33vw,160px)`) → `max-w-261 mx-auto` column → `<div className="services-grid">` → `SERVICES.map((service, i) => <ServiceCard isVisible={cardsVisible[i]} cardDelay={i * 140} />)`.
- **Dependencies:** `next/image`, `react` (`useState`, `useEffect`, `useRef`); remote images from `images.unsplash.com`.
- **Consumers:** `app/(site)/about-us/services/page.tsx`.
- **Notes:**
  - **Bug — `@keyframes shinePass` is missing** from `ANIMATION_STYLES`. `.shine-pass` and the inline `animation: "shinePass 0.75s …"` therefore reference an undefined animation, so the shine streak element renders but never animates (it stays translated off-card via `transform: translateX(-120%) skewX(-20deg)`). Add the keyframes (`translateX(-120%)` → `translateX(320%)` or similar) to fix.
  - **Hover-only interaction:** the sweep fill, white title and image zoom happen purely on `mouseenter`. Touch devices get the idle card forever, even though a CSS comment promises "Mobile: tap-to-reveal card (no hover on touch)" — no tap handler exists. It also means card text colour changes only on hover (`text-[#00142d]` → `text-white` over the gradient).
  - **Global CSS injection:** `<style>{ANIMATION_STYLES}</style>` is unscoped. Class names (`.services-grid`, `.card-enter`, `.text-enter`, `.shine-pass`, …) are global and will leak if another component reuses them; mounting the component twice duplicates the stylesheet.
  - **Timer leaks:** the `setTimeout` stagger in the section effect and the `setTimeout` inside `handleMouseEnter` are not cleared; React 19 only warns silently for post-unmount updates, but it is still worth cleaning up.
  - `cursor-pointer` on a card with no click destination is a false affordance — either link each card to a service detail route or drop the cursor.
  - Cards use `minHeight: clamp(380px, 32vw, 560px)` and `unoptimized` remote images, so nine large JPEGs load at full size; that is the main performance cost of this section.
  - Text stays legible on the gradient sweep, but there is no focus-visible styling because nothing is focusable — keyboard users cannot trigger the reveal at all.
