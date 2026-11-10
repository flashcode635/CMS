# Directory: components/collections
Primary Purpose: Event sections for the Collections area. `UpcomingEventsGrid` renders the six upcoming seminar cards (with a mobile-only category filter); `PreviousEventsSection` renders past "MBBS Abroad Guidance Seminar" cards grouped by year. Both are used on **two** routes and both own their data as module constants.

> Hand-written reference documentation. `npm run graph` regenerates `graph/` and its own Runtime/Dependencies/Consumers metadata separately.

## Files

### `UpcomingEventsGrid.tsx` (425 lines)
[UpcomingEventsGrid.tsx]: Six-card upcoming-events section with a gradient heading, desktop 3×2 photo/blue-panel cards, mobile stacked cards, and a mobile-only "All Cities / Medical / Guidance" filter.

- **Runtime:** client (`"use client"`) — `useState`, `useRef`, `useEffect` (IntersectionObserver).
- **Purpose:** first content section of `/collections` and of `/collections/upcoming-event`, under `PageBanner`.
- **Props:** **none** — `export default function UpcomingEventsGrid()`; data is the module constant `EVENTS`.
- **State & effects:**
  - `sectionRef = useRef<HTMLDivElement | null>(null)`, `visible` (`false`), `activeFilter` (`"All Cities"`).
  - One-shot `IntersectionObserver` on the `<section>` (`threshold: 0`, `rootMargin: "0px 0px -60px 0px"`), `setVisible(true)` then `disconnect()`; cleanup disconnects. `visible` gates the heading's `.in` class and every card's opacity/transform.
  - No effects tied to `activeFilter`.
- **Handlers / functions:**
  - Filter buttons: `onClick={() => setActiveFilter(f)}` — only state, no scrolling or URL sync.
  - `filtered = activeFilter === "All Cities" ? EVENTS : EVENTS.filter(e => e.category === activeFilter)` — **applied only to the mobile list** (`filtered.map` at line 407). The desktop grid maps `EVENTS` directly (line 395), so the filter has no visible effect on desktop.
  - `DesktopCard({ event, index, visible })`: height `clamp(440px, 39.69vw, 762px)`, entrance delay `0.1 + index*0.08` s, full-bleed photo with `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 53.5%)`, floating blue panel `#0039ea` (`m-4 lg:m-6`, `rounded-[20px]`, `p-5 lg:p-8`) containing date+month, time, city, venue, address.
  - `MobileCard({ event, index, visible })`: fixed `380px` height, `rgba(0,0,0,0.3)` overlay, date pill top-left (`rounded-br-3xl`), bottom info strip at `opacity: 0.97`, animation delay `0.1 + index*0.1` s.
- **Constants & types:**
  - `EVENTS` (6, lines 8–75) — `{ id, date, month, time, city, venue, address, image, category }`:
    1. "16," / May / 12:00 PM ONWARDS / New Delhi / Hotel Hyatt Centric / Janakpuri District Center… 110058 / Medical
    2. "10," / May / 11:00 AM ONWARDS / Gorakhpur / Rangrezza banquet hall / … 273001 / Guidance
    3. "10," / May / 12:00 PM / Patna / Hotel Gargee Grand Patna / … 800001 / Medical
    4. "17," / May / 12:00 PM / Lucknow / Hotel Hind Palace / Indiranagar Amrapali Chauraha / Guidance
    5. "9th," / May / 12:00 PM / Nagpur / The Seven Hotel / … 440015 / Medical
    6. "9th," / May / 12:00 PM / Pune / venue literally `"Pune"` / … 411034 / Guidance
    Images are six Unsplash URLs (`photo-1587474260584…`, `1605537964076…`, `1530099486328…`, `1576091160550…`, `1504439904031…`, `1519452575417…`).
  - `FILTERS = ["All Cities", "Medical", "Guidance"]` — "All Cities" is a misnomer (categories are Medical/Guidance, not city names).
  - Interfaces (local): `EventCardData`, `EventCardProps { event, index, visible }`.
  - Heading: `<h2>` gradient `linear-gradient(170.75deg, #00923F 12.704%, #3163FF 87.17%)` clipped to text, "UPCOMING MBBS " (Poppins 800) + "ADMISSION GATEWAY - 2026" (Poppins 500 italic), `clamp(22px, 2.5vw, 48px)`.
  - Injected `<style>` block: `@keyframes uegFadeUp`, `.ueg-heading(.in)`, `.ueg-card:hover { box-shadow: 0 24px 60px rgba(0,57,234,0.22); transform: translateY(-4px) scale(1.01) !important; }`, `.ueg-filter-btn`, `.ueg-view-btn:hover { background:#3163ff; color:#fff }`.
- **Dependencies:** `next/image`, `react` (`useEffect`, `useRef`, `useState`), `@/components/ui/Button`.
- **Consumers:** `app/(site)/collections/page.tsx` and `app/(site)/collections/upcoming-event/page.tsx` (both render it directly under their `PageBanner`).
- **Notes:**
  - **Dead control:** the mobile "View All" `Button` (`fullWidth variant="brandOutline"`) has no `onClick` and no destination — it does nothing.
  - **`!important` in `.ueg-card:hover` overrides the inline `transform`**, including the not-yet-visible `translateY(32px) scale(0.98)` state, so hovering a card before the reveal animation can pop it into place. Also, `transition` is declared both inline and in `.ueg-card`, last-writer wins per property.
  - Data quality: `date` strings carry a trailing comma and mix styles (`"16,"`, `"10,"`, `"9th,"`) → renders "16, May"; the month is separate; no year field despite the "2026" heading.
  - Responsive: filter tabs `md:hidden`; desktop grid `hidden md:grid` with `gridTemplateColumns: repeat(3, minmax(0,1fr))`; mobile stack `flex flex-col gap-6 md:hidden`. Section padding `clamp(48px,5vw,96px) clamp(20px,7.29vw,140px)`.
  - Accessibility: cards are `div`s with all text visible (no focus target, no links); the photo wrapper is `aria-hidden` but contains `<Image alt={event.city}>`; filter buttons rely on `data-[active=true]` styling plus `active` prop (no `aria-pressed`).
  - Images here are **optimized** (no `unoptimized`) and `images.unsplash.com` is whitelisted in `next.config.ts`.
  - The `<style>` selectors `ueg-*` are global; rendering the component twice on one page would duplicate the CSS.

### `PreviousEventsSection.tsx` (358 lines)
[PreviousEventsSection.tsx]: "Successfully Conducted" past-seminar gallery — 12 events for 2025 and 8 for 2024, grouped under year headings with photo cards and date badges.

- **Runtime:** client (`"use client"`) — `useRef`, `useState`, `useEffect` per year group.
- **Purpose:** second content section on `/collections` and `/collections/upcoming-event`.
- **Props:** **none** — `export default function PreviousEventsSection()`; no props are accepted from either page.
- **State & effects:**
  - `YearGroup({ year, events }: YearGroupProps)` owns `sectionRef` (`useRef<HTMLDivElement | null>`) and `visible` (`false`); one-shot `IntersectionObserver` (`threshold: 0`, `rootMargin: "0px 0px -60px 0px"`) with `disconnect()` on trigger and cleanup. Each year group therefore animates independently when it scrolls in.
  - `EventCard` is stateless; stagger delay comes from the parent: `0.05 + (index % 4) * 0.08` s.
- **Handlers / functions:** none (no filters, no pagination, no modal — all 20 cards render). `YearGroup` renders an `<h2>` built from four spans: "MBBS Abroad Guidance Seminar " (700), `{year}` (green `#00923f`, italic), " — " (italic), "Successfully Conducted" (green, italic).
- **Constants & types:**
  - `EVENTS_2025` — 12 items `{ id, date, city, venue, address, image }`: 17 JUNE Karnal (Deventure Hotel Karnal), 8th JUNE Jaipur (Lords Plaza), 8th JUNE Varanasi (Hotel Plaza Inn), 1st JUNE Bhubaneswar (Hotel Pushpak), 17 JUNE Bengaluru (JCCA Club), 8th JUNE Hyderabad (Amrutha Castle), 8th JUNE New Delhi (Statesman House), 1st JUNE Chennai (The Vijay Park), then ids 9–12 repeat Bengaluru/Hyderabad/New Delhi/Chennai.
  - `EVENTS_2024` — 8 items: Mumbai (Hotel Grand Hyatt), Kolkata (ITC Sonar), Pune (The Westin Pune), Ahmedabad (Hyatt Regency), Chandigarh (Hotel Mountview), Indore (Hotel Sayaji), Lucknow (Taj Mahal Hotel), Nagpur (Hotel Centre Point).
  - Images: eight Unsplash URLs reused across both arrays (`photo-1587474260584…`, `1519452575417…`, `1605537964076…`, `1530099486328…`, `1576091160550…`, `1504439904031…`, `1559839734…`, `1517486808906…`, `1427504494785…`, `1546410531…`, `1488521787991…`).
  - Interfaces: `EventCardData` (no `category`/`time`, unlike `UpcomingEventsGrid`), `EventCardProps`, `YearGroupProps`.
  - Card styling: `rounded-[16px]`, height `clamp(360px, 30vw, 498px)`, gradient `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 53.515%)`, date badge `#0039ea` with `rounded-br-[28px]`, city/venue truncated, address `line-clamp-2`.
  - Injected `<style>`: `.pes-card:hover { box-shadow: 0 20px 56px rgba(0,57,234,0.20); transform: translateY(-4px) scale(1.01) !important; }`.
- **Dependencies:** `next/image`, `react` (`useEffect`, `useRef`, `useState`).
- **Consumers:** `app/(site)/collections/page.tsx` and `app/(site)/collections/upcoming-event/page.tsx` (both).
- **Notes:**
  - **Copy-paste data bugs:** several addresses are duplicated across different cities — Bengaluru (id 5) reuses Karnal's `NH1, Namaste Chowk Flyover…` address, Hyderabad (6) and New Delhi (7) reuse Jaipur's/Varanasi's, Chennai (8) reuses Bhubaneswar's. 2025 also repeats four cities (ids 9–12). The comment above `EVENTS_2024` says it is "same structure, reused as placeholder", but its values are distinct placeholder venues.
  - `date` mixes "17 JUNE" (no ordinal) with "8th JUNE"/"1st JUNE" → inconsistent typography.
  - Responsive: heading `text-[28px] md:text-[36px]`; grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (4 per row, 3 rows for 2025); section `px-5 md:px-10 lg:px-[140px] py-12 md:py-20`, white background.
  - Images are optimized (`Image` without `unoptimized`) and have `sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"`; the photo layer is `aria-hidden` while the `<Image>` still carries `alt={event.city}`.
  - Cards are non-interactive `div`s (no link, no focus), so the hover shadow is decoration only.
  - No `dangerouslySetInnerHTML`; no API; no auth.
