# Directory: components/images

Primary Purpose: Gallery and event-media sections: a filterable event gallery index, a per-event photo grid with lightbox, an event description/highlights block, and the lead-capture contact form reused on event and country pages.

Routes:
- `/gallery/images` → `PageBanner` + `GalleryGrid` (`app/(site)/gallery/images/page.tsx`).
- `/gallery/images/[slug]` → `PageBanner` + `EventDescription` + `EventGalleryGrid` + `EventContactForm` (`app/(site)/gallery/images/[slug]/page.tsx`).
- `/countries/mbbs-in-russia` also renders `EventContactForm` as its final section.

## Files

### `EventContactForm.tsx`

[EventContactForm.tsx]: Two-panel "Get Free Counseling" lead form (blue info panel + white form) that fakes submission locally.

- **Runtime:** client (`"use client"`, `useState`).
- **Purpose:** Lead capture card: left panel carries phone/email/office details and a contractor quote, right panel is a counseling request form. Used at the bottom of an event gallery page and of the Russia country page.
- **Props:** none.
- **State & effects:**
  - `form` — `useState({ name: "", phone: "", email: "", course: "MBBS in Russia", message: "" })`.
  - `submitted` — `useState(false)`. No effects, no timers, no cleanup.
- **Handlers / functions:**
  - `set(k)` — curried change handler: `(k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }))`.
  - `handleSubmit(e)` — `e.preventDefault(); setSubmitted(true);` — **no `fetch`, no timeout, no redirect, no persistence**. This is a UI-only fake submission.
  - "Send Another Request" → `setSubmitted(false)` (form values are **not** cleared).
- **Constants & types:**
  - `COURSES` — 6 strings: "MBBS in Russia", "MBBS in Georgia", "MBBS in Uzbekistan", "MBBS in Kazakhstan", "MBBS in Kyrgyzstan", "MBBS in Nepal". Default selection is the first.
  - `inputCls` — shared input classes: `bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-5 py-4 … focus:border-brand-blue focus:ring-2 focus:ring-blue-100 … font-['Inter',sans-serif]`.
  - No interfaces or exported types (the state shape is inferred).
- **Form fields:** Full Name (`text`, `required`, placeholder "e.g. Rahul Sharma"); Phone Number (`tel`, `required`, "+91 98765 43210"); Email Address (`email`, `required`, "rahul@example.com"); Desired Country/Course (`select`, optional, COURSES options, custom `▼` glyph); Your Message (optional `textarea rows={4}`, `resize-none`).
- **Validation & submit behaviour:** only native HTML5 `required` + `type="email"`/`type="tel"`; no length/format validation, no error state. On valid submit the success panel replaces the form: "Application Received!", 24-hour callback copy, and a `Button variant="brandSolid"` labelled "Send Another Request".
- **Data flow:** local state only; nothing leaves the browser.
- **Dependencies:** `react` (`useState`), `lucide-react` (`Phone`, `Mail`, `MapPin`, `Send`, `CheckCircle2`), `@/components/ui/Button`.
- **Consumers:** `app/(site)/gallery/images/[slug]/page.tsx` (section 4) and `app/(site)/countries/mbbs-in-russia/page.tsx` (last section).
- **Notes:**
  - Left panel is a gradient `bg-linear-to-br from-brand-navy via-brand-royal to-brand-blue`, `lg:w-[38%]`, with two decorative blurred circles. Contact data: Call Us `+91-9971944622`; Email Us `info@studypalacehub.com`; Head Office `806, KLJ Tower, Pitampura, Delhi`. Footer quote: "Official University Contractor" / "Turning medical dreams into global reality since 2014."
  - Shell: `max-w-[1640px]`, `rounded-3xl`, `border-[#e2e8f0]`, `flex-col lg:flex-row`, big shadow; `px-5 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-20`.
  - **A11y gaps:** `<label>` elements have no `htmlFor` and inputs have no `id`; the required fields are not marked with `aria-required`; the success panel is not announced (no `role="status"`/`aria-live`).
  - The success button hard-codes `bg-brand-green` on top of `variant="brandSolid"` (already green) and has no `type`, which is harmless only because it is rendered outside the `<form>`.
  - Layout duplication: the whole form is re-rendered inside a ternary; there is no shared field component, so field additions must be made in two places (`form` state and JSX).
  - State is per-mount: nothing is persisted, so a reload or remount returns to the empty form (with the default course selected). There is no `key`/URL state to preserve a draft.

### `EventDescription.tsx`

[EventDescription.tsx]: Event intro card + four highlight cards + a "Looking Forward" conclusion banner.

- **Runtime:** client (`"use client"`) though it is stateless — could be a server component.
- **Purpose:** Describes a Study Palace Hub pre-departure seminar and its four themes on the event detail page.
- **Props:** `EventDescriptionProps { title?: string }`; default `title = "Samara State Medical University – Pre-Departure Seminar 2025"`. The page renders `<EventDescription />` with no props, so the default title is always used (the slug-derived title only appears in `PageBanner`/metadata).
- **State & effects:** none.
- **Handlers / functions:** none.
- **Constants & types:**
  - `interface EventDescriptionProps { title?: string }` (not exported).
  - `HIGHLIGHTS` — 4 objects `{ icon: LucideIcon; title: string; text: string; gradient: string }`:
    1. `GraduationCap` / "Academic Orientation" / curriculum, calendar, grading for 2025–2026 / `from-brand-green to-[#22c55e]`;
    2. `Compass` / "Cultural Integration" / Russian language, customs, campus life, safety / `from-brand-blue to-brand-royal`;
    3. `PlaneTakeoff` / "Logistics & Travel Guidance" / visa docs, flights, forex, hostel / `from-brand-green to-brand-blue`;
    4. `Users` / "Alumni Mentorship" / insights from seniors and alumni / `from-brand-blue to-[#1e3a8a]`.
- **Data flow:** static array; `const Icon = item.icon` then `<Icon size={26} strokeWidth={2} />`.
- **Dependencies:** `lucide-react` (`GraduationCap`, `Compass`, `PlaneTakeoff`, `Users`, `Sparkles`).
- **Consumers:** `app/(site)/gallery/images/[slug]/page.tsx` (section 2, no props).
- **Notes:**
  - Header card: white `rounded-3xl`, 2px top accent bar `from-brand-green via-[#22c55e] to-brand-blue`, a `Sparkles` pill "Seminar Highlights & Overview", gradient-free `<h1>` (Poppins extrabold) with the `title` prop, and a Lexend paragraph highlighting "2025 Pre-Departure Seminar" and "Samara State Medical University, Russia".
  - Highlights grid: `grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8`; icons in 14×14 gradient tiles that scale on `group-hover`; cards lift `-translate-y-1.5` and gain a blue shadow.
  - Conclusion banner: `bg-linear-to-r from-[#002e78] via-brand-royal to-brand-blue`, eyebrow "Looking Forward", copy about a networking lunch and group photo.
  - Content is hard-coded to one specific event (Samara 2025), so every `/gallery/images/<slug>` page shows the same seminar story regardless of slug. The `title` prop is the only per-page input.
  - Semantic oddity: the heading is `<h1>` inside a page that already has a `PageBanner` title — two competing page headings.

### `EventGalleryGrid.tsx`

[EventGalleryGrid.tsx]: 12-photo responsive grid with a click-to-open lightbox (prev/next/close).

- **Runtime:** client (`"use client"`, `useState`).
- **Purpose:** Photo collection for a single event, with an overlay viewer. Section 3 of the event detail page.
- **Props:** `EventGalleryGridProps { sectionTitle?: string }`; default `"Seminar Gallery Highlights"`. Page passes none.
- **State & effects:** `const [selectedIndex, setSelectedIndex] = useState<number | null>(null)` — `null` = closed, otherwise the index of the open photo. No effects, no key listeners, no body-scroll lock.
- **Handlers / functions:**
  - `openLightbox(index)` → `setSelectedIndex(index)`;
  - `closeLightbox()` → `setSelectedIndex(null)`;
  - `prevImage()` → `(selectedIndex - 1 + PHOTOS.length) % PHOTOS.length` (wraps);
  - `nextImage()` → `(selectedIndex + 1) % PHOTOS.length` (wraps).
- **Constants & types:**
  - `interface EventGalleryGridProps { sectionTitle?: string }` (not exported).
  - `PHOTOS` — 12 Unsplash URLs (`images.unsplash.com/photo-…?w=800&q=80`), plain strings, no captions/dates/alt data.
- **Data flow:** static array → grid; `PHOTOS[selectedIndex]` → lightbox image.
- **Dependencies:** `react` (`useState`), `next/image`, `lucide-react` (`Maximize2`, `X`, `ChevronLeft`, `ChevronRight`, `Camera`), `@/components/ui/Button`.
- **Consumers:** `app/(site)/gallery/images/[slug]/page.tsx` (section 3, no props).
- **Notes:**
  - Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`; tiles are `h-65 sm:h-70`, `rounded-3xl`, `overflow-hidden`, hover lift + zoom (`group-hover:scale-110`, 700ms); overlay shows "Photo #N" and a `Maximize2` badge.
  - Lightbox: `fixed inset-0 z-50 bg-black/90 backdrop-blur-md`; backdrop click closes; the image wrapper `stopPropagation`s; prev/next buttons also `stopPropagation`; close button is top-right. All three controls are `Button variant="glass" size="icon"` with `aria-label`s (satisfies the Button type requirement).
  - **A11y gaps:** no `role="dialog"`/`aria-modal`, no focus trap, no `Escape` handler, no arrow-key navigation, and the grid tiles are `<div onClick>` without `role="button"`, `tabIndex` or keyboard handling — the lightbox is mouse/touch-only. There is also no `body` scroll lock while open.
  - All images use `unoptimized` (external Unsplash); grid `sizes` is `(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw` which overstates the mobile width slightly at `sm` (2 columns).
  - `alt` text is positional only ("Seminar moment N", "Photo N") — no real descriptions.
  - `PHOTOS` is module-level, so it is shared across renders (safe, read-only). Identical to several photo IDs used in `GalleryGrid`/`BenefitsGallery` — same stock imagery reused across the site.
  - The section wrapper (`max-w-[1640px]`, `flex flex-col gap-10`) also holds the header pill "Event Photo Collection" and a 28px-wide gradient underline.

### `GalleryGrid.tsx`

[GalleryGrid.tsx]: Main gallery index — category tabs, sort dropdown, scroll-reveal cards, separate desktop/mobile layouts.

- **Runtime:** client (`"use client"`; multiple hooks).
- **Purpose:** Section 2 of `/gallery/images`: filter events by category, sort them, and link each card to its event gallery at `/gallery/images/<slug>`.
- **Props:** none (default export `GalleryGrid`).
- **State & effects:**
  - `activeTab` (`"All Images"`), `showAll` (`false`), `sortBy` (`"newest"`).
  - `SortDropdown` has local `open` + `useRef`; `useEffect` registers a `mousedown` listener on `document` and **removes it in cleanup**.
  - `useFadeUp()` (custom hook, used by `DesktopCard` and `MobileCard`) — `ref` + `visible`; `IntersectionObserver` with `threshold: 0.1`, `rootMargin: "0px 0px -40px 0px"`; on first intersection sets `visible` and `observer.disconnect()`; cleanup also disconnects. No SSR guard (`IntersectionObserver` is referenced inside `useEffect`, so it is client-only at runtime).
- **Handlers / functions:**
  - `handleTabChange(tab)` → sets tab and resets `showAll`;
  - `handleSortChange(val)` → sets sort and resets `showAll`;
  - `SortDropdown.onChange` closes the menu after selection;
  - `Prev/next`-style logic is absent here (no lightbox); navigation is via `next/link`.
- **Constants & types:**
  - `EVENTS` — 12 objects, shape `{ id: number; year: string; category: "Medical Seminars" | "Academic Fests" | "Workshops"; image: string; body: string; slug?: string }`. Years: Event 2025 (id 1, **only record with `slug: "event-2025"`**), 2026, 2024, 2022, 2021, 2019, 2020, 2016, 2023, 2015, 2017, 2018. `body` is **the same nomination boilerplate on all 12** ("Celebrate individuals who have made a meaningful difference…"). Images are Unsplash URLs; three IDs are reused across records.
  - `TABS = ["All Images", "Medical Seminars", "Academic Fests", "Workshops"]`.
  - `LOCATION = "A-456, C Block, Sector 12, Greater Noida, Uttar Pradesh 201310"` (hard-coded for every card, and different from the Delhi head office used in the contact forms).
  - `BTN_GRAD = "linear-gradient(140.84deg, #00923F 12.704%, #3163FF 87.17%)"`.
  - `SORT_OPTIONS` — `{ newest, "Newest First" }`, `{ oldest, "Oldest First" }`, `{ az, "A → Z" }`, `{ za, "Z → A" }`.
  - Types: `interface SortDropdownProps { value: string; onChange: (val: string) => void }`, `interface EventCardItem { id; year; category; image; body; slug? }`, `interface EventCardProps { event: EventCardItem; delay?: number }`.
  - Helpers: `SortDropdown`, `PinIcon({ size = 20 })` (inline SVG, `fill="#79859b"`), `FilterIcon` (three grey bars), `useFadeUp`, `DesktopCard`, `MobileCard`.
- **Derived data:** `filtered` = `EVENTS` when `activeTab === "All Images"`, else `EVENTS.filter(e => e.category === activeTab)`; `sorted = [...filtered].sort(...)` with `parseInt(year.replace(/\D/g,""))` for `newest`/`oldest` and `localeCompare` for `az`/`za`; `mobileVisible = showAll ? sorted : sorted.slice(0, 3)`.
- **Dependencies:** `react` (`useState`, `useEffect`, `useRef`), `next/image`, `next/link`, `@/components/ui/Button`.
- **Consumers:** `app/(site)/gallery/images/page.tsx` (section 2, no props).
- **Notes:**
  - **Desktop (`hidden sm:block`):** filter bar `className=" top-0 z-20 bg-white/10"` — note the leading space and the **missing `sticky` class**, so despite the comment ("Sticky filter bar") it does not stick. Row is `h-18 px-20 flex items-center justify-between` with pill tabs (active = gradient, `scale-105`) and `SortDropdown`. Grid is `px-18 py-12 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-12`; empty state is a `col-span-3` message "No events found for this category."
  - **Mobile (`flex sm:hidden`):** real `sticky top-0` bar with horizontally scrollable tabs (`overflow-x-auto scrollbar-hide`), abbreviated labels ("Medical", "Academic" for the two long tabs), and a native `<select>` for sorting. Cards are single-column and only the first 3 show until "View All (N more)" (`variant="brandOutline"`, `fullWidth`). There is **no collapse-back control** even though the source comment says "View All / Collapse".
  - Card keys include `activeTab` and `sortBy` (`key={`${activeTab}-${sortBy}-${event.id}`}`) so a tab/sort change remounts cards and replays the fade-up animation; `delay={idx * 80}` staggers them.
  - Fade-up is inline `style` on the wrapper: `opacity`/`translateY(40px)` → `0/0` with `transition: opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms, box-shadow .4s ease…`.
  - All 12 cards link to `/gallery/images/${event.slug || event.year.toLowerCase().replace(/\s+/g, "-")}` → `event-2025`, `event-2026`, … Since the `[slug]` page ignores the slug for content, every target renders identical copy and photos; `slug` on record 1 is redundant with that formula.
  - Sorting semantics: `az`/`za` compare the full `"Event YYYY"` strings, so they are effectively identical to `newest`/`oldest`; only `newest`/`oldest` are meaningfully different. `parseInt` yields the year for all records.
  - `showAll` is never reset anywhere except tab/sort changes, and is only read by the mobile branch.
  - External images are all `unoptimized`; desktop `sizes="33vw"`, mobile `sizes="100vw"`.
  - Buttons in the Tab / SortDropdown overflow menu use `variant="unstyled"` with manual styles; the sort menu is absolutely positioned `right-0 top-[calc(100%+8px)] z-50`.
