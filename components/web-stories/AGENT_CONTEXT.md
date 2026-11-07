# Directory: components/web-stories
Primary Purpose: Two story components for `/web-stories`: `WebStoriesViewer` — a dark tray+viewer block (scrollable story list on the left with the selected story highlighted in the brand gradient; the selected story as a full-bleed image on the right with segmented autoplay progress bars and prev/next arrows) — and `WebStoriesCarousel` — a wide landscape story card with Instagram-style segmented progress bars, edge-tab chevron arrows, a date badge, title and short description on a bottom gradient.

> Hand-written reference documentation. `npm run graph` regenerates `graph/` and its own Runtime/Dependencies/Consumers metadata separately (see `architecture.md` §10 — the generator is currently missing from the tree, so this file is maintained by hand).

## Shared data (`WebStoriesCarousel.tsx`)

- `export interface WebStory { id; title; description; date; image }` and `export const WEB_STORIES` (7 items, newest first: Budget-Friendly Countries, NEET 2025, Russia, Georgia, Kazakhstan, Kyrgyzstan, Uzbekistan) — consumed as a named import by `WebStoriesViewer.tsx`. Both components render the same array, so adding a story there feeds both. The first-story texts were copied from the approved design; the rest are writer-sourced. Images are existing `/home/mbbs-*.jpg|webp` / `/home/blog-graduation.jpg` assets.

## Files

### `WebStoriesViewer.tsx` (~190 lines)
[WebStoriesViewer.tsx]: Tray + viewer block matching the second approved design (dark navy section, white story-list card left, full-bleed story right).

- **Runtime:** client (`"use client"`, line 1) — `useState` (`active`, `progress`, `paused`).
- **Purpose:** rendered **above** `WebStoriesCarousel` inside the `bg-brand-sky` column on `/web-stories`. Nothing else imports it.
- **Props:** **none**; stories come from the shared `WEB_STORIES` named import (`./WebStoriesCarousel` via `@/components/web-stories/WebStoriesCarousel`).
- **Layout:** `section` with `linear-gradient(160deg,#021028,#0a2250)` rounded-[28px] → `grid grid-cols-1 lg:grid-cols-5`; viewer is `order-1 lg:order-2 lg:col-span-3` (first on mobile, right on desktop), tray is `order-2 lg:order-1 lg:col-span-2` (white card, `max-h clamp(340px,46vw,480px)` scrollable `ul.wsv-list`).
- **State & effects (playback loop):**
  - Progress restarts on `active` change (`useEffect` → `setProgress(0)`).
  - `setInterval(TICK_MS=100)` adds `PROGRESS_STEP = TICK/DURATION*100` to `progress` while `!paused` (paused on viewer `mouseenter`, resumes on `mouseleave`).
  - `progress >= 100` → `setActive((active+1) % total)`; the next effect resets progress. `step(±1)` (arrow buttons) wraps via modulo. No keyboard/swipe support.
- **UI details:** 7 segments (one per story: full-width `bg-white` for past, `${progress}%` for active, 0 for future); viewer image `next/image fill object-cover` keyed by `story.id` so it remounts per story; arrows are absolute bottom-right circular `bg-[#0a1c44]/85` buttons (lucide `ChevronLeft`/`ChevronRight`). Tray items are full-width `button`s; the active one gets `linear-gradient(135deg,#00923F,#3163FF)` + white text, inactive ones get blue title `#2056d2` + gray body.
- **Dependencies:** `react`, `next/image`, `lucide-react`, `@/lib/utils` (`cn`), `@/components/web-stories/WebStoriesCarousel` (`WEB_STORIES`, `WebStory` type).
- **Consumers:** `app/(site)/web-stories/page.tsx` only.
- **Permissions/Auth:** none — public static content, no fetch, no API.
- **Notes:**
  - The scoped `<style>` block (class prefix `wsv-`) gives the tray a 3px scrollbar on desktop and hides it ≤767px — same treatment as the page scrollbar in `app/globals.css` and the navbar (`AGENTS.md` note: style-tag CSS is process-global, hence the unique prefix).
  - Story images are cropped to the viewer's portrait-ish frame via `object-cover` (`clamp(380px,52vw,520px)` tall); the source jpegs are landscape.

### `WebStoriesCarousel.tsx` (~230 lines)
[WebStoriesCarousel.tsx]: Full-width story carousel; exactly one story visible at a time, matching the visual reference provided for the `/web-stories` page.

- **Runtime:** client (`"use client"`, line 1) — `useState` (`current`, `paused`) and a `useRef` transition lock.
- **Purpose:** replaces the former "coming soon" placeholder inside `<div className="max-w-7xl mx-auto px-4 py-16">` on `/web-stories`, between `PageBanner` and `MBBSAbroadHero`.
- **Props:** **none** — `export default function WebStoriesCarousel()`. Story data is hard-coded.
- **State & effects:**
  - `current` (slide index), `paused` (autoplay toggle).
  - `lockRef` (module-independence note: it is a component-level ref, **not** module-level mutable state, per `AGENTS.md` §3) debounces rapid arrow clicks during the 700 ms slide transition.
  - `goTo(index)` wraps in both directions via modulo; the lock timer also unlocks after 700 ms.
  - Autoplay `useEffect`: 6000 ms `setInterval` calling `goTo(current + 1)`, cleared on `paused`/`current`/`goTo` change; `paused` becomes `true` on mouseenter of the section wrapper, `false` on mouseleave. No keyboard/touch/visibility-pause handling.
- **UI structure:**
  - `section` (`max-w-[1168px] mx-auto`, `aria-roledescription="carousel"`) holds vertical tab buttons over the card's left/right edges, with rounded inner edges and blue borders.
  - Viewport: `rounded-[28px] overflow-hidden navy bg-[#001838]`, height `clamp(360px, 26.5vw, 362px)`; inner `flex` track with `translateX(-current*100%)`, `duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]`.
  - Each slide: `next/image` `fill` + `object-cover`, a `linear-gradient(to top, rgba(0,10,35,0.95) …)` overlay div, then meta row (24 px round `/study_ph_logo.png` + date), `h2` title (Poppins, `clamp(17px, 2.4vw, 26px)`) and `line-clamp-2` description (Inter).
  - Instagram-style segmented progress bars sit at the card's top edge; completed segments are white, and the active segment fills with autoplay progress.
- **Constants & types:**
  - `export interface WebStory { id; title; description; date; image }`.
  - `export const WEB_STORIES` = 7 items (Budget-Friendly Countries, NEET 2025, Russia, Georgia, Kazakhstan, Kyrgyzstan, Uzbekistan), newest first. See "Shared data" above; the viewer imports the same array.
- **Dependencies:** `react` (`useState`, `useEffect`, `useRef`, `useCallback`), `next/image`, `lucide-react` (`ChevronLeft`, `ChevronRight`).
- **Consumers:** `app/(site)/web-stories/page.tsx` (default import) and `components/web-stories/WebStoriesViewer.tsx` (named `WEB_STORIES` + `WebStory`).
- **Permissions/Auth:** none — public static content, no fetch, no API.
- **Notes:**
  - Stories are display-only: no `href` and no detail route (deliberately, to avoid dead `"#"` links — see the `blogs/BlogsGrid` note in `app/(site)/AGENT_CONTEXT.md`).
  - Adding a dimension to `public/` requires a matching row in `public/AGENT_CONTEXT.md`.
  - Responsive: card height is capped at the reference landscape proportion; text clamps `line-clamp-2`; edge tabs remain attached to the card and shrink slightly on small screens.
