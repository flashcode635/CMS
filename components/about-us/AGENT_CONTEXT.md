# Directory: components/about-us

Primary Purpose: Content sections for the `/about-us` page (banner, intro copy, photo collage, mission/vision/goals, quote, team, national presence, map, FAQ) plus the contact form block that the `/contact-us` page reuses. `page.tsx` here is the actual route implementation; `app/(site)/about-us/page.tsx` only re-exports it.

## Files

### `page.tsx`

[page.tsx]: Route body for `/about-us` — exports `metadata` and the default `AboutUsPage` component that composes every About section.

- **Runtime:** Server component (no `"use client"`); composed of client children (`PageBanner`, `NationalPresence`, `lastsection`, `ExpertCounsellingSection`).
- **Purpose:** Owns the `/about-us` layout, page metadata and section order. `app/(site)/about-us/page.tsx` contains only `export { default, metadata } from "@/components/about-us/page"`, so this file is the single source of truth for the route.
- **Props:** None.
- **State & effects:** None. Pure render tree.
- **Handlers:** None.
- **Constants & types:** `export const metadata = { title: "About Us | My Study Hub", description: "Learn more about My Study Hub and our mission to help students study MBBS abroad." }` (untyped object, inferred by Next). Root wrapper is `<div className="flex flex-col" style={{ backgroundColor: "#e1f0f9", width: "100%" }}>`.
- **Data flow / section order (all inside the wrapper):**
  1. `<PageBanner title="About Us" subtitle="Learn more about who we are" backgroundImage="/home/about-graduation.png" overlayOpacity={0.5} />`
  2. `<HeadingOfCard type="bold" title="Know More About Us" description={JSX} />` — copy inside a `<div className="flex flex-col text-[#606c83]">` with `fontFamily: "'Lexend', sans-serif"`, `fontWeight: 300` and a drop-cap `<span>` "W" (`float-left text-[2rem] sm:text-[2.3rem]`, `fontFamily: Inter`).
  3. `<AboutImageSection />`
  4. `<AboutTextContent />`
  5. `<MissionCoreValues />`
  6. `<QuoteBanner />`
  7. `<MeetOurTeam />` (from `../homepage/MeetOurTeam`)
  8. `<NationalPresence />`
  9. `<ExpertCounsellingSection type="location" />` (from `../homepage/ExpertCounsellingSection`; in `location` mode it renders `LocationMap` beside the counselling `FormCard`)
  10. `<FaqSection />` (imported as `FaqSection` from `./lastsection`; `slim` defaults to `true`)
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/ui/HeadingOfCard`, `./AboutImageSection`, `./AboutTextContent`, `./MissionCoreValues`, `./QuoteBanner`, `./NationalPresence`, `./LocationMap`, `./ContactSection`, `./lastsection`, `../homepage/MeetOurTeam`, `../homepage/ExpertCounsellingSection`.
- **Consumers:** `app/(site)/about-us/page.tsx` (re-export of `default` + `metadata`). No other importer.
- **Notes:** Two dead imports — `ContactSection` is imported (line 9) but never rendered, and `LocationMap` is imported as `LocationPin` (line 12) and also never rendered. The JSX comments are stale as a result: "Office locations map" now renders `ExpertCounsellingSection`, and "Get In Touch / Contact + Form" renders `FaqSection`. `ContactSection` reaches this page only indirectly (it is not used here at all). No `HeadingOfCard.tsx` exists in this folder; the component lives at `components/ui/HeadingOfCard.tsx`. Auth: none — fully public.

### `AboutImageSection.tsx`

[AboutImageSection.tsx]: Thin wrapper that renders the `ImageComboBanner` photo collage for section 3 of the About page.

- **Runtime:** Server component (no `"use client"`, no hooks).
- **Purpose:** Provides the vertical rhythm/padding around `ImageComboBanner`. Carries a Figma reference comment (`node 7:413`) describing an asymmetric-radius photo block with floating info cards.
- **Props:** None.
- **State & effects:** None.
- **Handlers:** None.
- **Internal functions:** `CircleTick({ dark = false })` — 38×38 inline SVG check inside a circle; the `dark` flag is accepted but both branches of the `stroke` ternary return `"white"`, so it has no effect. `InfoCard({ dark = false })` — glass card with a gradient icon square (`linear-gradient(108.93deg, #00923F 12.704%, #3163FF 87.17%)`), title "Elite Colleges", subtitle "Top Ranked Universities"; `dark` switches background (`rgba(10,14,34,0.75)` vs `rgba(255,255,255,0.18)`), border, shadow and text colours. Both helpers are defined but **never used** (dead code left from the Figma layout).
- **Data flow:** `AboutImageSection` → `<section className="w-full py-6 lg:py-10">` → `<div className="max-w-full">` → `<ImageComboBanner />` with default props.
- **Dependencies:** `next/image` (imported, only used by the unused helpers), `./ImageComboBanner`.
- **Consumers:** `components/about-us/page.tsx`.
- **Notes:** Component is effectively a 3-line wrapper; the floating-card markup promised by the header comment no longer exists. Spacing only changes at `lg`. No images of its own.

### `AboutTextContent.tsx`

[AboutTextContent.tsx]: Two stacked marketing text blocks ("How Can We Help You Achieve Your MBBS Goal?" and "What Makes Us the Ideal Partner for MBBS in Russia?").

- **Runtime:** Server component (no `"use client"`, no hooks).
- **Purpose:** Section 4 of the About page — narrative copy about counselling and Russia MBBS partnerships.
- **Props:** None.
- **State & effects:** None.
- **Handlers:** None.
- **Constants & types:** None. Copy is hard-coded JSX; each block is `<h2>` + a `<div>` holding two `<p>` elements.
- **Data flow:** `<section className="w-full px-6 sm:px-10 lg:px-20 xl:px-32 py-16 lg:py-24">` → inner `max-w-300 mx-auto flex flex-col gap-12` → two `flex flex-col gap-6` blocks. Headings use inline `fontFamily: "Inter, sans-serif"`, `fontWeight: 800`, `fontSize: clamp(22px, 2.5vw, 32px)`, `lineHeight: 1.5`, `text-[#00142d]`. Body uses `'Lexend', sans-serif` weight 300, `clamp(15px, 1.1vw, 18px)` / `1.65`, `text-[#606c83]`.
- **Dependencies:** None (no imports at all).
- **Consumers:** `components/about-us/page.tsx`.
- **Notes:** Fully static; no ids/anchors so it cannot be deep-linked. Responsive only via the four padding breakpoints (`sm`, `lg`, `xl`) plus viewport clamps. Body text is long-form and unbroken by subheadings — an SEO/readability consideration, not a bug.

### `ContactSection.tsx`

[ContactSection.tsx]: Client-side contact block (inquiry form + India/Russia office cards + social links + CTA strip) reused by the `/contact-us` page; the form does **not** post anywhere.

- **Runtime:** Client component — `"use client"` at line 1 (`useState`, `window` access in a click handler).
- **Purpose:** The entire `/contact-us` body below the hero, and originally intended as the About page's "Get In Touch" section. Three sub-sections: (1) form + 3D hand illustration, (2) office cards / "Reach us through" / "Social Networks", (3) navy CTA "Book Your FREE Counselling Session Today!" with a chairs photo.
- **Props:** None (takes no arguments).
- **State & effects:**
  - `form` — `useState(EMPTY_FORM)`, shape `{ firstName, lastName, phone, email, city, state, branch, message }` (all `""`).
  - `submitted` — `useState(false)`; switches the form for the "Message Sent!" panel.
  - `loading` — `useState(false)`; drives `Button isLoading` (spinner + disabled).
  - No `useEffect`, no timers kept across renders, no cleanup needed (the fake delay is an awaited `setTimeout` inside the handler).
- **Handlers:**
  - `onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)` → `setForm(p => ({ ...p, [e.target.name]: e.target.value }))` (single handler for all fields, keyed by `name`).
  - `handleSubmit(e: React.FormEvent)` — `e.preventDefault()`, `setLoading(true)`, `await new Promise(r => setTimeout(r, 1200))` with the in-code comment `// TODO: replace with real API call`, then `setLoading(false)`, `setSubmitted(true)`. **No `fetch`, no server action, no mailto — submitted data is discarded.**
  - `reset()` — `setSubmitted(false)` + `setForm(EMPTY_FORM)`; wired to a `Button` labelled "Submit" in the success panel (mislabel: it resets, it does not submit).
  - Inline `Link` onClick for the CTA: if `window.location.pathname === "/contact-us"` it calls `e.preventDefault()` and `window.scrollTo({ top: 0, behavior: "smooth" })` (otherwise navigates to `/contact-us`).
- **Internal components:** `Label({ children })` — uppercase eyebrow `<p>`; `Arrow({ className = "size-4.5" })` — inline arrow SVG, `aria-hidden`; `Flag({ colors, chakra, label })` — stacked colour bars (white bands get `border border-gray-200`), draws a navy `size-2` chakra circle on the middle band when `chakra` is true, wrapper carries `aria-label={label}` but is not `role="img"`.
- **Constants & types:**
  - `BRANCHES` (10 strings): Delhi (Head Office), Bangalore, Mumbai, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, Jaipur, Lucknow.
  - `FIELDS` — 4 rows, `as const`: `[firstName, lastName]`, `[phone (type: "tel")]`, `[email (type: "email")]`, `[city, state]`; each entry `{ k, ph, type? }`.
  - `EMPTY_FORM` — 8 empty-string keys (above).
  - `OFFICES` (2): "Head Office - India" (`flag: ["#FF9933", "#fff", "#138808"]`, `chakra: true`, address "Office No. 806, 8th floor, KLJ Tower North, Netaji Subhash Place, Pitampura, New Delhi - 110034, India") and "International Office - Russia" (`flag: ["#fff", "#0039A6", "#D52B1E"]`, `chakra: false`, address "Office No - 831, Proletarskaya -150/4, Samara, Russia - 443001").
  - `CONTACTS` (2): `tel:+919971944622` (`+91-9971944622`) and `mailto:contact@mystudyhub.com` (`contact@mystudyhub.com`), icons `/home/footer-phone.svg`, `/home/footer-mail.svg`.
  - `SOCIALS` (5): Facebook `mystudyhub0`, Instagram `mystudyhub.official`, LinkedIn `my-study-hub`, Pinterest `Mystudyhub12`, YouTube `@MyStudyHub` — each with `href` and `/home/footer-*.svg` icon.
  - Local class strings: `pad` = `w-full px-5 sm:px-10 lg:px-16 xl:px-20`, `card` = `rounded-3xl border border-white/60 bg-white p-7 shadow-sm`, `gradient` = `bg-linear-to-r from-brand-green to-brand-blue`, `fieldCls`, `inputCls` (adds `h-10 text-[#1a2c4e]`).
- **Data flow:** Root div gradient (`from-[#e8f5f0] via-[#e4eef9] to-[#dce9f7]`) → Section 1 `pb-22 pt-26` (form column `lg:max-w-130`, illustration column hidden below `lg`, `aspect-640/1090`, `priority`), Section 2 `pb-16` (offices `grid-cols-1 md:grid-cols-2`, contacts card, socials card), Section 3 navy `#022e78` CTA with `/home/enroll-bg-pattern.png` (opacity-5) and `chairs.jpg` at `h-[clamp(180px,420px)]`. Form fields render from `FIELDS` (2-per-row `flex gap-4`); branch select renders `BRANCHES`; textarea is free-form `message`.
- **Dependencies:** `next/image`, `next/link`, `react` (`useState`), `@/components/ui/Button`, and a static import of `@/public/contact-us/chairs.jpg`. Public assets used: `/contact-hand-illustration.png`, `/svg/contact-us-route.svg`, `/svg/contact-us-location.svg`, `/home/footer-phone.svg`, `/home/footer-mail.svg`, `/home/footer-{facebook,instagram,linkedin,pinterest,youtube}.svg`, `/home/enroll-bg-pattern.png`, `chairs.jpg`.
- **Consumers:** `app/(site)/contact-us/page.tsx` (rendered after `ContactHeroBanner`); `components/about-us/page.tsx` imports it but never renders it.
- **Notes:**
  - **Risk — no submission backend:** `handleSubmit` only fakes latency; every enquiry is lost. Any "make the contact form work" task must add an API route/server action and real error handling; the `TODO` at line 109 marks the insertion point.
  - **Validation:** only the six text inputs have HTML `required`. The branch `<select>` has a disabled empty option but **no `required`**, and the `message` textarea is optional — the "Nearest Branch" choice is therefore skippable.
  - **Accessibility:** no `<label htmlFor>`/`id` pairs; the visible "Nearest Branch" / "Details" text is a plain `<Label>` `<p>`, so inputs rely on placeholders (which disappear on typing). The success icon is `aria-hidden`, but the panel is not announced (no `role="status"`/`aria-live`), and focus is not moved. Social links are fine (`target="_blank"` + `rel="noopener noreferrer"` + `aria-label`).
  - **Layout:** desktop-only illustration (`hidden … lg:flex`); form rows stay two-up at all widths (`flex gap-4`), which is tight on very small screens. Uses Tailwind v4 arbitrary spacing utilities (`pt-26`, `pb-22`, `max-w-350`, `size-4.5`) plus brand tokens `brand-green`/`brand-blue`/`brand-sky` from `app/globals.css`.
  - Fonts are referenced by name only (`Inter`, `DM Sans`, `Playfair Display`, `DM Serif Display`) — no local font import here, so they must already be loaded globally.

### `ImageComboBanner.tsx`

[ImageComboBanner.tsx]: Full-bleed About-page banner — library photo washed green/blue, with a centred white frame holding the medical-students photo and two frosted "Elite Colleges" badges.

- **Runtime:** Server component (no `"use client"`, no hooks).
- **Purpose:** Section 3 of the About page (rendered through `AboutImageSection`). Reproduces the Figma 7:413 mock: full-bleed background photo, green wash from the left and blue from the right, a white frame whose top-right / bottom-left corners are large curved diagonals (TL/BR stay near-square).
- **Props:** `{ bgImage?: string; frontImage?: string; badgeTitle?: string; badgeSubtitle?: string }` — defaults `bgImage = "/about-us/bg-midsection.jpg"`, `frontImage = "/about-us/front-image.jpg"`, `badgeTitle = "Elite Colleges"`, `badgeSubtitle = "Top Ranked Universities"`. Paths must be public URLs (not static imports).
- **State & effects:** None.
- **Handlers:** None.
- **Internal components:** `GlassBadge({ title, subtitle, style })` — dark frosted panel (`rgba(9,22,42,0.30)`, `blur(16px) saturate(1.4)`, 1px white border, inset highlight) with a gradient check tile (`linear-gradient(108.93deg, #00923F 12.704%, #3163FF 87.17%)`) and two ellipsised text lines; rendered top-left and bottom-right of the frame so it bleeds over the white band. `CircleTick()` — inline 38×38 ring + check used inside the tile.
- **Constants & types:** everything geometric is a tunable at the top of the file.
  - `SCALE: Record<"base" | "md" | "lg", ScaleRow>` — one row per breakpoint (`<768`, `768–1023`, `≥1024`): `height` (whole section), `width` (frame width; the remainder shows the side washes), `frame` (white band thickness), `badgeW`, `tile`, `pad`, `gap`, `radius`, `title`, `subtitle`. **All values are `vw`** and are emitted as CSS custom properties `--icb-*` by `decls()` → `BANNER_CSS` (a `<style>` block with `768px` / `1024px` media queries), because Tailwind cannot build class names from JS values.
  - `CURVE = { x: {topLeft,topRight,bottomRight,bottomLeft}, y: {...}, tile }` — the four frame corner radii as percentages (kept as `%` so the silhouette never flattens: `3% 50% 3% 50% / 6% 94% 6% 94%` at the moment) plus `tile` = gradient-tile radius ÷ tile size. `FRAME_RADIUS` joins `CURVE.x` / `CURVE.y` into the CSS `border-radius` shorthand.
  - `BG_INSET` (`1vh`) — how much shorter the background photo is per side, so the frame overhangs the photo band; `0vh` restores a flush background. Emitted as `--icb-bi`.
  - `SIDE_WASH_LEFT` / `SIDE_WASH_RIGHT` — `linear-gradient` strings (green `#00923F` / blue `#3163FF`) that fade out by 46 % of the section width. No dark scrim beyond `rgba(3,16,34,0.24)`.
- **Data flow:** `<section className="icb relative w-full overflow-hidden" style={{ height: "var(--icb-h)" }}>` → `<style>{BANNER_CSS}</style>` → absolute background layer (`inset: var(--icb-bi) 0`, `<Image fill sizes="100vw object-cover>` + three overlay divs) → centred frame wrapper (`mx-auto h-full`, `width: var(--icb-w)`) → `absolute inset-0 overflow-hidden bg-white` box with `border: var(--icb-f) solid #eef6fb`, `borderRadius: FRAME_RADIUS`, `<Image fill sizes="(max-width:768px) 88vw, (max-width:1024px) 78vw, 72vw">` + two `<GlassBadge>`s.
- **Dependencies:** `next/image` only.
- **Consumers:** `components/about-us/AboutImageSection.tsx`.
- **Notes:** Section height equals the frame height — there is no vertical padding; the background is the only layer inset (`BG_INSET`). The `priority` prop was removed (deprecated in Next 16 in favour of `preload`; this banner is below the fold, so neither is needed). Changing `SCALE.height` alone rescales the whole banner; changing `CURVE.x` / `CURVE.y` alone reshapes the ends. Keep mirrored corners equal for a symmetric leaf, and keep each axis' two radii summing to ~100 % or straight segments appear between the curves. Background image is decorative (`alt=""`); the foreground alt describes the students. The `<style>` block is static (same string for every instance), so it does not add per-request state.

### `LocationMap.tsx`

[LocationMap.tsx]: Stylised, non-interactive India "map" (hand-drawn SVG roads + absolutely positioned city pins); not a real map library.

- **Runtime:** Server component (no `"use client"`, no hooks/state).
- **Purpose:** Renders the office-location graphic. On `/about-us` it appears through `ExpertCounsellingSection type="location"`.
- **Props:** None. The internal pin accepts `{ featured?: boolean }`.
- **State & effects:** None.
- **Handlers:** None.
- **Internal functions:** `LocationPin({ featured })` — circle with `border-4 border-white`; `featured` → `size-12 bg-[#8d55e8]` plus an `animate-ping` ring; otherwise `size-9 bg-brand-blue`; inner white dot `size-2.5`; `aria-hidden="true"`.
- **Constants & types:** module-level `locations` (5): New Delhi (shortName "Delhi", `left: 48%`, `top: 26%`, `featured: true`), Mumbai (24%/66%), Bengaluru (43%/80%), Chennai (62%/78%), Kolkata (78%/50%). `shortName` is never read — dead field.
- **Data flow:** `<section className="w-full px-2 py-8 sm:px-4 lg:px-10 lg:py-12">` → `max-w-300 flex flex-col gap-8` → map canvas `relative isolate min-h-105 sm:min-h-135 lg:min-h-155 rounded-4xl bg-[#edf4f1]` with `aria-label="Illustrated map showing My Study Hub locations across India"`. Inside: a `viewBox="0 0 1200 650"` SVG (`preserveAspectRatio="none"`, `role="img"`, label "Stylized map with roads and waterways") drawn with ~8 paired `<path>` strokes (outer grey + inner white, plus a teal river `#a9dce0`/`#c8f0e7`); three blurred green "park" blobs; `locations.map` → absolutely positioned `-translate-x-1/2 -translate-y-1/2` pin + white/90 label chip (`text-[#7c45d6]` when featured); legend chip bottom-left "My Study Hub offices".
- **Dependencies:** None (no imports).
- **Consumers:** `components/homepage/ExpertCounsellingSection.tsx` (rendered in the `type === "location"` branch, i.e. on `/about-us`), and `components/about-us/page.tsx` (imported as `LocationPin`, unused → dead import).
- **Notes:** The original heading block ("Find us across India" / "Our Locations") is commented out at lines 30–50 — the component now renders map only, so the surrounding page must supply a title. Because the SVG uses `preserveAspectRatio="none"`, pin percentages do not track the drawn roads; positions are purely decorative. All `min-h-*` values are fixed, so the graphic does not shrink on small screens (pins can crowd). `animate-ping` has no `prefers-reduced-motion` guard. No links/markers are clickable and no address data is emitted — an SEO/contact-detail gap if real office info is expected here.

### `MissionCoreValues.tsx`

[MissionCoreValues.tsx]: Alternating mission / vision / goals rows around a central green timeline, built almost entirely with inline styles.

- **Runtime:** Server component (no `"use client"`, no hooks).
- **Purpose:** Section 5 of the About page: gradient "Our Mission & Core Values" header plus three photo+copy rows (Mission, Vision, Goals).
- **Props:** None.
- **State & effects:** None (hover/interaction-free).
- **Handlers:** None.
- **Internal components & types:**
  - `CheckIcon()` — 20×20 double-tick SVG, green `#00923F` + blue `#3163FF`, `aria-hidden`.
  - `interface StackedPhotoProps { alt: string; shadowRight?: boolean }`; `StackedPhoto({ alt, shadowRight = false })` — `clamp(280px,38vw,562px)` × `clamp(210px,29vw,424px)` relative box with a gradient shadow rect offset right (`left 4.5% / right -4.5%`) or left (mirrored), photo always `/home/about-graduation.png`, `fill`, `sizes="(max-width:768px) 90vw, 40vw"`, `borderRadius: 14`.
  - `interface ContentBlockProps { title, grad, quote, subHead, bullets: string[], right?: boolean }`; `ContentBlock({ … right = false })` — two gradient rules (162px/108px wide), gradient `h3` (`clamp(36px,4.17vw,64px)`, clipped text), italic-less quote paragraph, bold sub-heading, bullet `<ul>` where `CheckIcon` is placed after the text for `right` rows and before it for left rows; alignment flips via `alignItems`/`textAlign`.
- **Constants & types:** `GRAD` = `linear-gradient(115.73deg,#00923F 12.704%,#3163FF 87.17%)`, `GRAD2` (165deg), `GRAD3` (153deg), `LINE = "#00923F"`. `ROWS` (3): `mission` (`imgLeft: true`, `grad: GRAD2`), `vision` (`imgLeft: false`, `grad: GRAD3`), `goals` (`imgLeft: true`, `grad: GRAD2`); each has `title`, `quote`, `subHead` ("Guiding Your MBBS Abroad Journey:", "Empowering Future Healthcare Leaders:", "Building Trust, Ensuring Success:") and 7 `bullets`.
- **Data flow:** `<section>` with inline `padding: clamp(48px,6vw,96px) clamp(24px,5vw,120px)` → `maxWidth: 1680` column `gap: 80` → centered header (`h2` "Our Mission & Core Values" with gradient clip; sub-copy "Uncover more additional about us and how we help make your dreams a reality.") → `position: relative` block with a 2px `LINE` bar at `left: 50%` → `ROWS.map` rows: left half always `paddingRight: 48`, right half always `paddingLeft: 48`; `imgLeft` decides which side gets `StackedPhoto`.
- **Dependencies:** `next/image` only.
- **Consumers:** `components/about-us/page.tsx`.
- **Notes:** **No responsive breakpoints at all** — a hard-coded two-column flex row (image ~562px wide) will overflow/cramp below tablet widths; there is no `flex-col` fallback, so mobile needs a media query or a Tailwind rewrite before this section is touched. All three photos are the same `/home/about-graduation.png`, so the rows look repetitive. Vision bullets repeat the idea "To empower aspiring medical students" twice (also present as the quote) — copy cleanup opportunity, not a code defect. Inline styles bypass Tailwind tokens (`#00923F`/`#3163FF` duplicated instead of `brand-green`/`brand-blue`); keep that in mind if the design tokens change.

### `NationalPresence.tsx`

[NationalPresence.tsx]: "Our National Presence" grid of 24 animated city cards, populated from a hard-coded `CITIES` array.

- **Runtime:** Client component — `"use client"` (hooks + `IntersectionObserver`).
- **Purpose:** Section 8 of the About page: a 5-column grid of `CurveCard` city tiles that fade/slide in with a staggered delay.
- **Props:** None. `AnimatedHeader` also takes none; `CurveCard` receives `src`, `name`, `animationDelay`.
- **State & effects:**
  - `AnimatedHeader` — `visible` (`useState(false)`), `ref` (`useRef<HTMLDivElement | null>`), one `useEffect` creating an `IntersectionObserver` with `threshold: 0.3`; on intersection it sets `visible` and calls `observer.disconnect()`; cleanup also disconnects. Class swap: `opacity-0 translate-y-5` → `opacity-100 translate-y-0` with `transition-[opacity,transform] duration-600ms`.
  - `NationalPresence` — no state; each `CurveCard` runs its own observer (`threshold: 0.15`) inside `components/ui/curveCard.tsx`.
- **Handlers:** None.
- **Constants & types:** `Country` — 6 entries (Russia, Canada, Australia, Germany, Japan, France) mapping to `/about-us/{bengaluru,chennai,gujarat,gujarat,nagpur,indore}.webp`. **Never referenced → dead code**; the identical array is live in `components/countries/countryCarousal.tsx`. `CITIES` — 24 entries: Bangalore, Chennai, Ahmedabad, Surat, Nagpur, Indore, Mysore, Mumbai, Bareily, Bhubaneshwar, Varanasi, Latur, Gorakhpur, Ranchi, Sri Nagar, Nashik, Tripura, Patna, Kolhapur, Kota, Gorakhpur (**duplicate**), Kannur, Hyderabad, Kolkata. Image paths: `bengaluru`, `chennai`, `gujarat` (×2), `nagpur`, `indore`, `chennai` (Mysore reuses it), `mumbai`, `bareily`, `bhubaneshwar`, `varanasi`, `latur`, `gorakhpur` (×2), `ranchi`, `srinagar`, `nashik`, `tripura`, `patna`, `kolhapur`, `kota`, `kannur`, `hyderabad`, `kolkata` — all under `/about-us/*.webp` and all present in `public/about-us/`.
- **Data flow:** `<section className="w-full max-w-420.25 mx-auto flex flex-col gap-18 px-7.5 py-8 max-sm:gap-12 max-sm:px-4">` → `<AnimatedHeader />` (`h2` "Our National Presence", `text-green-700`, 46px, `max-sm:text-4xl`; sub-copy "Uncover more additional about us and how we help make your dreams a reality.") → `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-4.5 gap-y-12` → `CITIES.map((city, idx) => <CurveCard src name animationDelay={rowIdx*80 + colIdx*60} />)` with `rowIdx = Math.floor(idx / 5)`, `colIdx = idx % 5`.
- **Dependencies:** `next/image` (imported but only used by `CurveCard`), `react` (`useEffect`, `useRef`, `useState`), `@/components/ui/curveCard`.
- **Consumers:** `components/about-us/page.tsx`.
- **Notes:** The staggered delay math assumes 5 columns, so on the 2-column (`sm`) and 1-column (`lg`-down) layouts the delay is computed from a five-per-row grid — cards reveal out of visual order (cosmetic only). Keys use `` `${city.name}-${idx}` `` which is what keeps the duplicated "Gorakhpur" from colliding. `Country` should either be deleted or wired to a country tab/section. Typo "Bareily" (file `bareily.webp`) is intentional-to-the-asset — renaming the label alone is safe, renaming the file is not. Image `alt` comes from `CurveCard` as the city `name`, which is acceptable but not descriptive of the photo.

### `QuoteBanner.tsx`

[QuoteBanner.tsx]: Large centered pull-quote flanked by oversized decorative quote-mark SVGs.

- **Runtime:** Server component (no `"use client"`, no hooks).
- **Purpose:** Section 6 of the About page — a single inspirational line from the design (`Figma node 7:439`).
- **Props:** None.
- **State & effects:** None.
- **Handlers:** None.
- **Constants & types:** None; the quote string "The biggest adventure you can take is to live the life of your dreams." is inline.
- **Data flow:** `<section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-10 lg:py-14">` → `relative max-w-361 mx-auto` → opening mark `absolute top-0 left-0 z-10` (`/home/open.svg`, 140×125, `unoptimized`, `aria-hidden`, `alt=""`), closing mark `absolute bottom-0 right-0 z-10` (`/home/closed.svg`, 138×126), quote `<p className="relative z-20 text-center px-[clamp(80px,12vw,200px)] py-[clamp(48px,7vw,96px)]">` in `'DM Serif Display', Georgia, serif` at `clamp(22px, 3.33vw, 64px)` / `1.5`.
- **Dependencies:** `next/image`.
- **Consumers:** `components/about-us/page.tsx`.
- **Notes:** Purely decorative images are correctly hidden from AT. The horizontal `padding: clamp(80px,12vw,200px)` keeps text clear of the marks but reserves a lot of width on mobile — at 375px the quote gets ~215px of usable width. `max-w-361` is an unusual Tailwind value; verify against the design before changing. No attribution/author is shown, which reads oddly for a testimonial-style quote — content decision, not a bug.

### `lastsection.tsx`

[lastsection.tsx]: Exports `FaqSection` — an animated single-open FAQ accordion used as the closing section of four About-family pages (despite the file name).

- **Runtime:** Client component — `"use client"` (hooks, `IntersectionObserver`).
- **Purpose:** FAQ block with gradient title "Got Questions? We Got Answers" and eyebrow "FAQs"; default export is `FaqSection({ slim = true })`, **not** `LastSection`. Note the filename casing (`lastsection.tsx`) is inconsistent with every other PascalCase component file in the repo.
- **Props:** `{ slim?: boolean }` (default `true`). Effect: when `slim` is true the inner container gets `px-[clamp(20px,4.17vw,80px)]`; when false there is no horizontal padding at all (full-bleed content inside `max-w-225`).
- **State & effects:**
  - `sectionRef` — `useRef<HTMLElement | null>` attached to `<section>`.
  - `visible` — `useState(false)`; gates staggered entrance of eyebrow/title/items.
  - `openIndex` — `useState<number | null>(0)` → **first FAQ is open on load**.
  - `useEffect` (deps `[]`): `IntersectionObserver` with `threshold: 0` and `rootMargin: "0px 0px -60px 0px"`; on first intersection `setVisible(true)` + `observer.disconnect()`; cleanup returns `observer.disconnect()`.
- **Handlers:** Per item `onToggle={() => setOpenIndex(openIndex === i ? null : i)}` — clicking the open item closes it, clicking another opens only that one (accordion). Closure over `openIndex` is fine because it re-renders each toggle.
- **Internal components & types:** `interface FaqItemProps { question; answer; isOpen; onToggle; visible; index }`; `FaqItem` renders a card (`rounded-2xl bg-white/20 border-b border-b-gray-500`) containing a `Button` (`type="button"`, `variant="unstyled"`, `size="bare"`, `shape="none"`) as the question row, a plus icon that rotates to an X (`rotate-45`, gradient background when open), and the answer in a `grid-rows-[0fr]/[1fr]` + `opacity` wrapper for the expand animation. Entrance uses `translate-y-7 opacity-0` → `translate-y-0 opacity-100` with `style={{ transitionDelay: `${0.05 + index \* 0.08}s` }}`.
- **Constants & types:** `faqs` — 5 hard-coded Q/A pairs: "How do I apply for admission?", "What scholarships and financial aid options are available?", "Do you assist international students with visas?", "Can I visit the campus before applying?", "What programs and courses do you offer?". Copy is generic study-abroad/campus content (mentions 40+ programs, 95% first-attempt visas, weekday campus tours at 11 AM/3 PM) and does not match an MBBS-consultancy offering — flag before publishing.
- **Data flow:** `<section ref={sectionRef} className="bg-[#f9fcfc]">` → `mx-auto max-w-225 flex flex-col` → eyebrow `<p>` → gradient `<h2>` → `faqs.map(<FaqItem … visible={visible} index={i} />)`.
- **Dependencies:** `react` (`useEffect`, `useRef`, `useState`), `@/components/ui/Button`.
- **Consumers:** `components/about-us/page.tsx`, `app/(site)/about-us/services/page.tsx`, `app/(site)/about-us/career/page.tsx`, `app/(site)/about-us/partner-with-us/page.tsx` (the only caller passing `slim={false}`).
- **Notes:** **Accessibility gap** — the question button has no `aria-expanded`, `aria-controls`, or `id`/`role` pairing with the answer panel, and the answer stays in the DOM (grid-collapsed) without `hidden`. Screen readers announce a plain button with no state. Also no `aria-live` for the expanding region. Sizes are all `clamp()` arbitrary values (`text-[clamp(14px,1.25vw,20px)]`, `max-w-225`), so it is fluid rather than breakpoint-driven; check at 320px. The `visible` gate is one-shot (observer disconnects), so items do not re-animate on scroll-back — intended.

### `HeadingOfCard.md`

[HeadingOfCard.md]: Design/usage note for the `HeadingOfCard` component — documentation prose only, **not source code**.

- **Runtime:** N/A (Markdown; not imported by anything and not a route/module).
- **Purpose:** Historical spec for the gradient heading used on the About and Services pages (mixed normal `prefix` + bold-italic gradient `title` + optional `description` JSX).
- **Props table (as documented):** `title` (string, required), `type` (`"bold" | "normal"`, required), `prefix` (string, optional), `italic` (boolean, default `false`), `description` (`JSX.Element`, optional).
- **State & effects:** N/A.
- **Handlers:** N/A.
- **Constants & types:** Documents gradient `linear-gradient(169deg, #00923F 12.704%, #3163FF 87.17%)`, `Poppins` font, and sizes `text-4xl` (mobile) / `text-[50px]` (desktop).
- **Data flow:** Explains that the component renders one `<h2>` with `bg-clip-text`, a `font-normal` prefix span and a `font-bold` (+ optional `italic`) title span so both share the gradient.
- **Dependencies:** None (Markdown).
- **Consumers:** None (human reference only).
- **Notes:** Several claims are **stale** versus the real implementation at `components/ui/HeadingOfCard.tsx`: the documented import `@/components/HeadingOfCard` does not exist (correct path is `@/components/ui/HeadingOfCard`); there is no `HeadingOfCard.tsx` in `components/about-us` (an older `AGENT_CONTEXT.md` listed one — that entry was wrong); the bold size is now `text-3xl lg:text-[40px]` (not `text-4xl`/`[50px]`) while the `type="normal"` branch still uses `text-4xl lg:text-[50px]`; and `type` is required in the type definition even though the destructuring supplies a `"bold"` default. Use the `.tsx` file as the source of truth and treat this note as design intent.
