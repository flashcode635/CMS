# Directory: components/brochures
Primary Purpose: The `/collections/brochures` page body — an intro/collage block and a client-side, filterable + paginated brochure download grid. Brochure records are injected by the page from a local `DUMMY_BROCHURES` array (no API yet).

> Hand-written reference documentation. `npm run graph` regenerates `graph/` and its own Runtime/Dependencies/Consumers metadata separately.

## Files

### `BrochuresGrid.tsx` (501 lines)
[BrochuresGrid.tsx]: Searchable, year-filterable, paginated (9 per page) brochure card grid with skeleton and empty states; all data arrives via the `brochures` prop.

- **Runtime:** client (`"use client"`) — five hooks (`useRef`, `useState` ×4, `useEffect` ×3, `useMemo` ×3 inside helpers) plus a document-level `mousedown` listener.
- **Purpose:** last section of `/collections/brochures`, directly after `BrochuresIntro`; the page passes `brochures={await getBrochures()}` (currently 15 dummy records, see consumers).
- **Props:** exported interfaces:
  - `Brochure { id: string | number; title: string; description?: string; coverImage: string; fileUrl?: string; fileName?: string; year?: number | string }`
  - `BrochuresGridProps { brochures?: Brochure[]; isLoading?: boolean }` — defaults `brochures = []`, `isLoading = false`. `isLoading` is **never passed by the page**, so the skeleton path is currently unreachable.
- **State & effects:**
  - `sectionRef = useRef<HTMLElement | null>(null)`, `gridRef = useRef<HTMLDivElement | null>(null)`, `visible` (`false`).
  - `search` (`""`), `yearFilter` (`"All Years"`), `currentPage` (`1`).
  - `yearOptions = useMemo(() => getYears(brochures), [brochures])`.
  - `filtered = useMemo(...)` — applies `yearFilter` (`String(b.year) === yearFilter`) then, when `search.trim()`, a case-insensitive `title`/`description` substring match. Deps `[brochures, search, yearFilter]`.
  - `useEffect(() => setCurrentPage(1), [search, yearFilter])` — **removed** (it tripped `react-hooks/set-state-in-effect`); `handleSearchChange`, `handleYearChange` and `handleClearFilters` now reset `currentPage` to `1` directly.
  - One-shot `IntersectionObserver` on the `<section>` (`threshold: 0`, `rootMargin: "0px 0px -60px 0px"`), `setVisible(true)` + `disconnect()`, cleanup disconnects. Drives all entrance animations and the result-count line.
  - `FilterDropdown` owns `open` + `ref`; its effect attaches `document.addEventListener("mousedown", handler)` and removes it on cleanup (closes on outside click).
- **Handlers / functions:**
  - Search input: `onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}` → `setSearch(value)` + `setCurrentPage(1)`.
  - Clear (×) button inside the field (`absolute right-2.5 top-1/2`, does not wrap): `handleClearFilters()` → clears search **and** year filter, resets to page 1.
  - "Clear all" (inline, after the Year dropdown, only when `hasFilters`): same `handleClearFilters()`; no longer absolutely positioned over the page.
  - `FilterDropdown` selection: `onChange(opt); setOpen(false)`; the label is `"Year: <value>"`.
  - `handlePageChange(page)`: `setCurrentPage(page)` then `gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })` — scrolls to the filter bar, not the first card (`gridRef` is attached to the filter row).
  - Helpers: `getYears(list)` → unique `String(year)` for truthy years, sorted **descending numerically**, prefixed with `"All Years"` (NaN years sort unpredictably); `Pagination` builds its page list from `totalPages`/`currentPage` with `"…"` ellipses.
  - Derived: `totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))`, `paginated = filtered.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE)`, `hasFilters = search.trim() !== "" || yearFilter !== "All Years"`.
- **Constants & types:**
  - `PER_PAGE = 9`, `BTN_GRAD = "linear-gradient(157.91deg, #00923f 12.704%, #3163ff 87.17%)"`.
  - Component-local SVGs (all `aria-hidden`): `DownloadIcon`, `SearchIcon`, `ChevronIcon({ open })` (rotates 180°), `ChevronLeftIcon`, `ChevronRightIcon`, `ClearIcon`.
  - `SkeletonCard` — `animate-pulse` block (`bg-[rgba(160,183,255,0.1)]`, border `brand-royal` at `1.167px`, `rounded-4xl`).
  - `EmptyState({ hasFilters })` — "No brochures match your search. Try a different keyword or filter." vs "No brochures available yet. Check back soon." (`col-span-3` inside the desktop grid).
  - `BrochureCard({ brochure, index, visible })` — compact card: `p-4 xl:p-5`, `gap-3.5`, `h-full` with the CTA pinned by `mt-auto` (buttons align across a row). Cover `aspect-[16/10]` (was `h-[60] md:h-75 lg:h-93.5`, where `h-[60]` was a no-op that collapsed mobile covers); `coverFailed` state swaps a document-icon placeholder for broken covers. Title `text-[17px] md:text-[19px]`, description `text-[13px] md:text-[14px]`, CTA `h-11 md:h-12` with `text-[13px] md:text-[14px]`, label `Download Brochure {year || "2025"}`, gradient background, `href={fileUrl || "#"}`, `download={fileName || true}`, `target="_blank" rel="noopener noreferrer"`. Hover is applied imperatively via `e.currentTarget.style.boxShadow / .translate`.
  - Headline gradient `linear-gradient(156.24deg, #00923f 12.704%, #3163ff 87.17%)` clipped to text; section background `#e8f2f4`; filter bar has an inner search field plus `Year` dropdown (`z-999`, `min-w-40`).
  - `Pagination({ currentPage, totalPages, onPageChange })` — shows all pages when `totalPages <= 7`, otherwise `1 … window … last`; `Button size="icon" variant="outline|tab" shape="pill"` with `aria-label="Previous page" / "Next page" / "Page N"` and `aria-current="page"`.
- **Dependencies:** `next/image`, `react` (`useEffect`, `useRef`, `useState`, `useMemo`, `ChangeEvent`), `@/components/ui/Button`.
- **Consumers:** `app/(site)/collections/brochures/page.tsx` (only). That page defines `DUMMY_BROCHURES` (15 items, ids `"1"`–`"15"`): 12 × year `"2025"`, 3 × `"2024"`, every `fileUrl: "#"`, `fileName` like `SPH-Brochure-2025.pdf`, covers are 3 repeating Figma MCP asset URLs (`7741d685…`, `22caa2a1…`, `0a5cdfa9…`), titles are Russian medical universities ("Samara State Medical University", "Kazan Federal University", …, "Ivanovo State Medical University").
- **Notes:**
  - **Pagination hook order:** `useMemo` now runs **before** the `totalPages <= 1` early return (previously called conditionally; could throw if the list shrank while mounted).
  - **"Clear all" placement:** now an inline `<button>` after the Year dropdown (previously `absolute right-4 top-1/2` escaped to the page's `<main>` because no ancestor was positioned) and it clears the year filter too.
  - The (×) clear button is now absolutely positioned inside the search field (`right-2.5`), so it overlays the input instead of wrapping below it.
  - Placeholder says "Search by college or university name…" but matching is on brochure `title`/`description`.
  - Filters/pagination are component state only — not reflected in the URL (`?year=`, `?page=`), so filtered views cannot be shared or restored; no localStorage.
  - `download={fileName || true}` + `target="_blank"` is contradictory and, with `fileUrl: "#"`, downloads a copy of the current page.
  - Responsive: desktop `hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:gap-5` (2 cols on tablet, 3 from laptop up), mobile/`<md` `grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden`; section `px-5 md:px-10 lg:px-14 xl:px-20 pt-6 md:pt-10 pb-12 md:pb-16`; pagination hidden when `filtered.length <= 9`.
  - Accessibility: result count is plain text (not `aria-live`), pagination has good labels, cards use `<h3>`; `Image` covers use `fill` + `unoptimized` + `sizes`.
  - No `dangerouslySetInnerHTML`; no auth or API calls.

### `BrochuresIntro.tsx`
[BrochuresIntro.tsx]: Static two-column intro for the brochures page — gradient "brochures" headline + two MBBS-abroad paragraphs on the left, a 3-image collage with outlined decorative boxes on the right.

- **Runtime:** client (`"use client"`) because of the scroll-reveal hook; no data fetching.
- **Purpose:** marketing/intro block between `PageBanner` and `BrochuresGrid`.
- **Props:** none (`export default function BrochuresIntro()`).
- **State & effects:** `sectionRef = useRef(null)` (untyped, unlike the `useRef<HTMLDivElement | null>(null)` pattern elsewhere — no runtime difference) and `visible` (`false`); one-shot `IntersectionObserver` (`threshold: 0`, `rootMargin: "0px 0px -60px 0px"`) with `disconnect()` in both the callback and the effect cleanup.
- **Handlers / functions:** none beyond the observer. Animation is inline: left column fades/rises with `0.8s … 0.05s`, collage with `0.8s … 0.2s` (`cubic-bezier(0.22,1,0.36,1)`).
- **Constants & types:** `imgDoctor = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"`, `imgLaptop = "…photo-1516321318423-f06f85e504b3…"`, `imgMicroscope = "…photo-1576671081837-49000212a370…"`.
  - Headline "brochures" (lowercase text, `capitalize`) in Poppins `32/42/46px`, gradient `linear-gradient(164.48deg, #00923f 12.704%, #3163ff 87.17%)` clipped to text, tracking `-0.9px`.
  - Copy: two paragraphs about official brochures/prospectuses/admission guides for studying MBBS abroad (hard-coded), `clamp(15px, 1.05vw, 18px)` / line-height `1.55`, `gap-4`.
  - Collage canvas: `w-full max-w-[420px] mx-auto` (`lg:mx-0 lg:w-[38%] lg:max-w-[440px]`) with `paddingBottom: "119.3%"` (503×600 ratio preserved). Image boxes (percentages): doctor `left 8% top 3% 57%×41%`, laptop `left 0% top 52% 53%×45%`, microscope `left 46% top 30% 52%×48%`; z-order is DOM order (doctor behind, microscope on top). Five decorative `border-2 border-brand-sky` outlines: large square `right 0 top 0 28%×23%` radius 24px, medium `right 4.5% top 3.5% 17.5%×14.5%`, small `right 8.5% top 10.5% 8.5%×7%`, wide rect `left 0 top 43% 29%×9.5%`, bottom rect `right 0 bottom 0 27%×11%`.
- **Dependencies:** `next/image`, `react` (`useEffect`, `useRef`, `useState`).
- **Consumers:** `app/(site)/collections/brochures/page.tsx` (only).
- **Notes:**
  - Images are **not** `unoptimized` (unlike the Figma-asset components), so they go through `/_next/image`; `images.unsplash.com` is whitelisted in `next.config.ts`.
  - Responsive: `flex-col` until `lg:flex-row`; padding `px-5 md:px-10 lg:px-14 xl:px-20 py-10 md:py-12 lg:py-14`; the text column is capped at `md:max-w-[620px]` / `lg:max-w-[680px]`; the collage is capped at `max-w-[420px]` (centered) below `lg` and takes `lg:w-[38%]` (max 440px) above it, so nothing overflows or dominates the viewport.
  - Duplicate messaging: the same "Together, we strengthen international connections…" / MBBS-brochure pitch also appears in `BrochuresGrid`'s heading and in the page `PageBanner`.
  - Accessibility: decorative outline `div`s are not `aria-hidden` (empty, harmless); images have descriptive alts; the gradient text is real text (selectable).
  - No `dangerouslySetInnerHTML`.
