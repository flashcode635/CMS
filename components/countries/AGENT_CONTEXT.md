# Directory: components/countries

Primary Purpose: Parent folder for per-country page sections. This level holds the shared "countries overview" pieces (destination carousel, "Top Universities in Russia" heading, Russian partner-university card grid); each specific country lives in its own sub-folder (`mbbs-russia/`).

Route composition: `app/(site)/countries/page.tsx` renders `PageBanner` → `CountryCarousal` → `RussianUni` → `CollegeCards`, in that order. No dynamic country routing exists at this level: `RussianUni` + `CollegeCards` are hard-coded to Russia.

## Files

### `collegeCards.tsx`

[collegeCards.tsx]: Desktop-only, paginated grid of 25 Russian partner universities with a "Load More" button.

- **Runtime:** client (`"use client"` — needs `useState`).
- **Purpose:** Renders `PARTNERS` as tinted, asymmetric-radius cards (4 per row on wide screens) and reveals 5 more per click. Used as the university list under the `RussianUni` heading on `/countries`.
- **Props:** none (no parameters).
- **State & effects:** one state slice — `const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)` (15). No effects. Derived values: `visiblePartners = PARTNERS.slice(0, visibleCount)` and `hasMorePartners = visibleCount < PARTNERS.length`.
- **Handlers / functions:** only inline `onClick` on the Load More `Button`:
  `setVisibleCount(current => Math.min(current + LOAD_MORE_COUNT, PARTNERS.length))`.
  The button is `disabled={!hasMorePartners}`.
- **Constants & types:**
  - `PARTNERS` — **declared inside the component body**, so a new array is allocated on every render. 25 objects, shape `{ id: number; variant: "blue" | "green"; desktopIcon: string; mobileIcon: string; title: string }`. IDs 1–25, titles: Lomonosov Moscow State University, Saint Petersburg State University, Novosibirsk State University, Kazan Federal University, Far Eastern Federal University, Siberian State Medical University, North Ossetian State Medical Academy, Privolzhsky Research Medical University, Russian National Research Medical University, Pirogov Russian National Research Medical University, Volgograd State Medical University, Tver State Medical University, Bashkir State Medical University, Stavropol State Medical University, Omsk State Medical University, Chuvash State University, First Moscow State Medical University, Volga Region State University of Service, Smolensk State Medical University, North Caucasus Federal University, A.I. Evdokimov Moscow State University of Medicine and Dentistry, Yaroslavl State Medical University, Vitebsk State Medical University, Orel State University, Kemerovo State Medical University.
  - `mobileIcon` is present in every record but **never read** — mobile markup does not exist.
  - Variants alternate strictly `blue, green, blue, …` by index.
  - `INITIAL_VISIBLE_COUNT = 15`, `LOAD_MORE_COUNT = 5`.
  - `VARIANT: Record<string, { bg: string; border: string }>` — `blue → bg-[#e9eeff] / border-[rgba(49,99,255,0.5)]`, `green → bg-[#ecffef] / border-[rgba(0,86,37,0.5)]`.
  - No exported types.
- **Data flow:** static array → slice by `visibleCount` → `.map()` → card markup. No API, context, or props.
- **Dependencies:** `next/image` (`Image`, `fill`, `unoptimized`, `sizes="60px"`), `react` (`useState`), `@/components/ui/Button`.
- **Consumers:** `app/(site)/countries/page.tsx` (`import CollegeCards from "@/components/countries/collegeCards"`, rendered `<CollegeCards/>`).
- **Notes:**
  - Both wrappers carry `hidden sm:flex`, so **the whole section renders nothing below the `sm` (640px) breakpoint**. The `mobileIcon` data is dead until a mobile branch is added.
  - Card container: `flex gap-3 p-2 pb-3 px-4 flex-1 min-w-55`, `border`, variant bg/border, `rounded-lg rounded-tr-[55px]`, `shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)]`, `hover:-translate-y-2` + blue hover shadow. `min-w-55` + `flex-1` yields 4 per row in the `p-8` padded flex-wrap.
  - Icon box is `w-12 h-12` while the comment says "Icon 64px" and `sizes="60px"` — three different numbers; the rendered box is 48×48.
  - Broken image paths: `/country/universityselect.svg` is used for IDs 1, 5, 9, 13, 17, 21, 25 but **no `public/country/` directory exists** in the repo, so those cards show a broken/empty icon box. All other `desktopIcon` values are `https://www.figma.com/api/mcp/asset/...` URLs — external, session-scoped Figma export links that will rot.
  - The subtitle `<p>` (reading `p.subtitle`) is commented out in the JSX; there is no `subtitle` field in the data anyway.
  - The final Load More button uses `variant="unstyled" size="bare" shape="pill"` with `bg-brand-blue px-6 py-3 … disabled:bg-[#9baee8]`; there is no padding wrapper around it besides `pb-8`.
  - Because `PARTNERS` lives inside the component, the array identity changes each render; harmless today (no memoized children), but it defeats any future `useMemo`/`React.memo` optimisation. Moving it to module scope would be a safe refactor.

### `countryCarousal.tsx`

[countryCarousal.tsx]: Auto-playing country carousel ("Top Countries for Study/MBBS in Abroad") with six `CurveCard` tiles.

- **Runtime:** server component (no `"use client"`) that composes two client components — `Carousel` (`components/ui/carousal.tsx`, `"use client"`) and `CurveCard` (`components/ui/curveCard.tsx`, `"use client"`). `HeadingOfCard` has no directive.
- **Purpose:** First content section of `/countries`: grey band containing a gradient heading and a 4-up carousel of study destinations.
- **Props:** none.
- **State & effects:** none in this file; carousel timing lives in `Carousel` (`autoPlay`, `autoPlayInterval`).
- **Handlers / functions:** none.
- **Constants & types:**
  - `const Country = [...]` (capitalised local, declared inside the component) — six `{ name, src }` records: Russia → `/about-us/bengaluru.webp`, Canada → `/about-us/chennai.webp`, Australia → `/about-us/gujarat.webp`, Germany → `/about-us/gujarat.webp`, Japan → `/about-us/nagpur.webp`, France → `/about-us/indore.webp`. No exported type.
- **Data flow:** static array → `Country.map()` → `<CurveCard key={`${country.name}-${idx}`} src name animationDelay={idx * 60} />` inside `<Carousel itemsPerSlide={4} autoPlay autoPlayInterval={5000}>`.
- **Dependencies:** `@/components/ui/curveCard` (default `CurveCard`), `../ui/HeadingOfCard` (relative import), `@/components/ui/carousal` (default `Carousel`).
- **Consumers:** `app/(site)/countries/page.tsx` (named import `{ CountryCarousal }`, rendered `<CountryCarousal/>` between PageBanner and RussianUni).
- **Notes:**
  - Exported as a **named** constant arrow component (`export const CountryCarousal = () => {…}`), not a default export — importers must use braces.
  - The image assets are Indian-city photos (`bengaluru`, `chennai`, `gujarat`, `nagpur`, `indore`) mapped onto country names, and `gujarat.webp` is reused for both Australia and Germany. This is placeholder content, not real country imagery.
  - `itemsPerSlide={4}` is hard-coded, so the same 4-per-slide grouping is requested at every viewport (responsiveness, if any, is inside `Carousel`). `autoPlayInterval={5000}` ms.
  - Container: `w-full bg-[#f9f9f9] py-10 lg:py-20`; there is no horizontal padding or `max-w` wrapper here — spacing relies on `HeadingOfCard` and `Carousel` internals.
  - `HeadingOfCard` gets `prefix="Top Countries for "`, `title="Study/MBBS in Abroad"`, `italic={true}`, `type="bold"`.

### `russianUni.tsx`

[russianUni.tsx]: Standalone gradient heading "Top Universities in Russia" — no cards or data.

- **Runtime:** server component (no directive, no imports beyond `HeadingOfCard`).
- **Purpose:** Supplies the section heading that visually introduces the `CollegeCards` grid rendered immediately after it on `/countries`. It renders **only** the heading.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none.
- **Constants & types:** none (no local data, no exported types).
- **Data flow:** none — static markup.
- **Dependencies:** `@/components/ui/HeadingOfCard`.
- **Consumers:** `app/(site)/countries/page.tsx` (named import `{ RussianUni }`).
- **Notes:**
  - Exported as a named arrow component (`export const RussianUni`), not default.
  - Returns a bare fragment containing `<HeadingOfCard prefix="Top Universities in " type="bold" title="Russia" italic={true}/>` — no `<section>`, no background, no vertical padding, so its spacing depends entirely on `HeadingOfCard` and the gap-less sibling flow.
  - The file name says "Uni" but there is no university list here; the actual list is `collegeCards.tsx` (which has no heading of its own). Treat the two as a pair.
