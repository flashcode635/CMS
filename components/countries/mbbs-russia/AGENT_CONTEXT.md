# Directory: components/countries/mbbs-russia

Primary Purpose: Section components for the MBBS-in-Russia landing page — hero, intro copy, why-Russia pitch, eligibility criteria, Samara State Medical University (SSMU) duration breakdown, and the SSMU document checklist.

**Card layout convention (Nov 2026):** all card containers are `flex flex-row overflow-x-auto` on mobile (cards sit side-by-side in a swipe row, `shrink-0`, full-width each) and restore their md+/lg+ layouts (`md:flex-col`, then the original `sm:grid-cols-2` / `lg:grid-cols-2 lg:grid-cols-3` / `lg:flex-row lg:flex-wrap`). Touched: `EligibilitySection` (cards container), `ssmuDurations` (stage cards), `stepsSSMU` (document `<ul>`), `stepSection` (InfoCard scroller — height caps moved to `md:`), `AboutRussia` (facts grid), plus `ui/infoCard.tsx` (new optional `className` prop, default "").

Route composition (`app/(site)/countries/mbbs-in-russia/page.tsx`, rendered top-to-bottom):
`RussiaBanner` → `CountryIntro` → `WhyRussia` → `EligibilitySection` → `SSMUDurations` (imported as `SSMUDurations` from `ssmuDurations.tsx`) → `StepsSSMU` → `AdmissionProcess` (imported from `stepSection.tsx`) → `EventContactForm` (imported from `components/images/EventContactForm`, i.e. a cross-folder reuse) → `Faq` (from `components/ui/Faq`).
`durationSection.tsx` is **not imported anywhere** and renders nothing. The page also exports `metadata` (title "MBBS in Russia For Indian Students 2026-27 | My Study Hub").

## Files

### `RussiaBanner.tsx`

[RussiaBanner.tsx]: Full-bleed hero banner for the Russia page with title, rating stars, CTA, and language/currency meta.

- **Runtime:** client (`"use client"`; uses `onMouseEnter` / `onMouseLeave` handlers).
- **Purpose:** Top-of-page hero: dark-photo background, `<h1>` "MBBS in Russia For Indian Students 2026 - 27", subtitle about Samara State Medical University, 4.0/5 star row, "Book a Free Consultation" CTA to `/contact-us`, plus bottom-left "Languages Spoken" and bottom-right "Currency" blocks.
- **Props:** none.
- **State & effects:** none (hover styling is done by mutating `e.currentTarget.style`).
- **Handlers / functions:** two inline handlers on the CTA `Link` — `onMouseEnter` sets `opacity: 0.9` and `transform: translateY(-2px)`; `onMouseLeave` resets to `1` / `translateY(0)`.
- **Constants & types:**
  - `BG_IMAGE = "https://www.figma.com/api/mcp/asset/a0589cbc-b890-4e4d-8c47-5732c5033016"` — declared but **never used** (dead constant left over from the Figma export).
  - Commented-out `Star`, `StarHalf`, `StarEmpty`, `ArrowIcon` SVG components (dead code kept as reference).
  - No local data arrays; the four exams/labels are inline strings.
- **Data flow:** static markup only. Background is `image` imported from `@/public/bg-doctor.jpg` (bundled by Next), with two stacked overlays.
- **Dependencies:** `@/public/bg-doctor.jpg` (default import `image`), `lucide-react` (`ArrowRight`), `next/image`, `next/link`.
- **Consumers:** `app/(site)/countries/mbbs-in-russia/page.tsx` (line 1, first section).
- **Notes:**
  - Section height: `style={{ height: "clamp(460px, 40.15vw, 771px)" }}` plus `min-h-135 sm:min-h-0`; `aria-label="MBBS in Russia hero banner"`.
  - Background stack: (1) `bg-linear-to-b from-black/80 to-black/20`, (2) `<Image fill priority sizes="100vw" style={{objectFit:"cover", objectPosition:"center 30%"}} alt="">` at `opacity-50`, (3) a hard-coded top-to-bottom gradient `linear-gradient(to bottom, rgba(0,0,0,0) 0.753%, #000 100.75%)`.
  - Stars are plain `<img>` tags (not `next/image`): four `/svg/star-yellow.svg` + one `/svg/star-grey.svg` inside a fixed `120×18` box, each rendered 24×18. The row has `aria-label="Rating: 4.0 out of 5 stars"` and each image `alt="star" aria-hidden`, which is contradictory (decorative but given alt text).
  - CTA gradient is `linear-gradient(152.61deg, #00923F 12.704%, #3163FF 87.17%)` with `borderRadius: 8`; the arrow is `<ArrowRight size={24} />` inside a span transformed `rotate(-45deg) scaleY(-1)` (a diagonal arrow). Span also carries `className="text-white!"` (Tailwind v4 important suffix).
  - Typography: title uses `'Playfair Display', serif` at `clamp(26px, 3.33vw, 64px)`; subtitle `'Lexend', sans-serif` weight 300; rating figure `'Inter'` at `opacity: 0.6`.
  - Bottom meta blocks are absolutely positioned at `left/right: clamp(16px, 5.16vw, 99px)` and `bottom: clamp(16px, 2.73vw, 52.5px)`, max-width 55%/45%; the value text is `#767676`, which is low-contrast against the dark photo. Languages: "English, Russian, Tatar, Bashkir, and Ukrainian". Currency: "Russian Ruble".
  - Both meta blocks sit inside the hero and can overlap the CTA on short/zoomed viewports because all three are absolutely/centrally positioned.
  - The subtitle names Samara State Medical University even though `CountryIntro` lists several universities — copy inconsistency with the rest of the page.

### `CountryIntro.tsx`

[CountryIntro.tsx]: Two-column intro block — Russia photo on the right, overlapping white copy card with a CTA on the left.

- **Runtime:** client (`"use client"`; only because the CTA `Link` uses `onMouseEnter`/`onMouseLeave`).
- **Purpose:** Narrative introduction ("MBBS in Russia for Indian Students 2026-27"): four paragraphs on NMC/WHO recognition, cities, fees, and My Study Hub's role, plus an "Apply Now" link to `/contact-us`.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** inline `onMouseEnter` / `onMouseLeave` on the CTA mutate `opacity` and `transform` (`translateY(-1px)`).
- **Constants & types:** a module-level `const p = { … }` style object (declared *after* the component, used for all four paragraphs): `margin: 0`, `fontFamily: "'DM Sans', sans-serif"`, `fontWeight: 400`, `fontSize: "clamp(14px, 0.938vw, 18px)"`, `lineHeight: "clamp(18px, 1.458vw, 28px)"`, `color: "#485f84"`. No exported types.
- **Data flow:** fully static; the only external reference is `/home/mbbs-abroad-russia.jpg`.
- **Dependencies:** `next/image`, `next/link`.
- **Consumers:** `app/(site)/countries/mbbs-in-russia/page.tsx` (line 2, second section).
- **Notes:**
  - Layout geometry (documented in the file header): outer `<section>` is `bg-[#e8f5ee] px-5 py-12 sm:px-8 sm:py-16 lg:px-[98px] lg:py-[111px]` and wraps a `max-w-[1724px]` frame that becomes `lg:h-[clamp(500px,52.135vw,1001px)]`.
  - Image container: mobile `h-[220px] sm:h-[320px]` full width; from `lg` it becomes `absolute inset-y-0 left-[33.12%] right-0` (right two-thirds) with `sizes="(max-width:1023px) 100vw, 67vw"`, `priority`, `objectPosition: "center top"`, alt "Red Square, Moscow, Russia".
  - Card: normal flow below `lg`; at `lg` `absolute left-0 top-[clamp(40px,5.729vw,110px)] w-[clamp(300px,46.406vw,891px)]`, `z-[2]`, `bg-white p-[clamp(24px,3.333vw,64px)]`, shadow `0px 3px 34.25px 0px rgba(25,33,61,0.08)`.
  - Heading is gradient-clipped (`linear-gradient(149.39deg, #00923F 12.704%, #3163FF 87.17%)`) with a manual `<br />` before "Students 2026-27"; `'Hanken Grotesk'` at `clamp(24px, 2.813vw, 54px)`.
  - Copy quirks: "World Health Organization" is highlighted in `#fc5046`, the bolded phrase in para 3 is `#485f84`; hyphens are typed as plain ASCII ("step-from", "support-ensuring"); "Samara State Medical University" here vs "Samara" elsewhere — and `WhyRussia` names a different set of universities.
  - CTA width/height use `clamp(130px,10.469vw,201px)` / `clamp(42px,3.333vw,64px)` with `padding: "16px 32px"`; the padding exceeds the clamped height at small sizes, so the button relies on `inline-flex` centering to stay visually correct.
  - Because the card is absolutely positioned only at `lg+`, the mobile stacking order is image first, card second — the reverse of the desktop reading order (card left, image right). Keyboard/reading order still follows DOM (image → card).

### `WhyRussia.tsx`

[WhyRussia.tsx]: Dark "Why Russia is a Top Destination for MBBS Abroad?" section with map artwork, exam checklist, and three benefit cards.

- **Runtime:** client (`"use client"` present, but the component has **no state, effects or handlers** — it could be a server component).
- **Purpose:** Persuasion section on the Russia page: illustration on the left, argument + licensing-exam list + three benefit chips on the right.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none (all interactivity is CSS hover on the final inline link).
- **Constants & types:**
  - Exam list inline: `["FMGE (India)", "USMLE (USA)", "PLAB (UK)", "MCI Screening Test"]`.
  - Benefit list inline: three strings — "Low tuition fees compared to Western countries,", "No donation or entrance exams (only NEET required)", "Safe environment & Indian student communities."
  - No exported types or named constants.
- **Data flow:** static; images referenced by public URL.
- **Dependencies:** `next/link` only.
- **Consumers:** `app/(site)/countries/mbbs-in-russia/page.tsx` (line 3, third section).
- **Notes:**
  - `aria-label="Why Russia is a Top Destination for MBBS Abroad"` on the `<section>`; background is `#000B1A` plus `linear-gradient(135deg, rgba(0,146,63,0.05), rgba(49,99,255,0.08))`.
  - Assets: `/countries/russia/ellipse-glow.svg` (right glow, `opacity-30`), `/countries/russia/bg-map.png` (`opacity-20`, offset `-left-6…-left-17`), `/countries/russia/russia-map.svg` (main sticker, `drop-shadow`), `/countries/russia/check-icon.svg` (20/24px checks). All exist under `public/countries/russia/`. `bg-worldmap.png` is present in that folder but **not used here** (the comment calls the sticker "bg-worldmap.png" while the `src` is `russia-map.svg`).
  - The left illustration block is `w-full lg:w-[45%]` with `min-h-72 sm:min-h-105 lg:min-h-140`; the right column is `lg:w-[55%]`. Container is `max-w-384` with `p-[clamp(0.5rem,3.5vw,3rem)]` and `md:px-2` (padding shrinks again at `md`, which is unusual).
  - Heading gradient `136.47deg`; body copy `'DM Sans'` at 13.5/14.5/15.5px across breakpoints; exam rows and the three benefit cards (`bg-white/8`, `border-white/10`, `backdrop-blur-sm`, left 5–6px gradient bar) follow.
  - The closing paragraph links to `/countries/mbbs-in-russia` — **the page it is already on** (self-referential "MBBS abroad" link). Likely intended to point at a different destination.
  - University names are inconsistent with `CountryIntro` ("North Caucasian State Academy" here vs "North Caucasus State Medical Academy" in `collegeCards`).

### `EligibilitySection.tsx`

[EligibilitySection.tsx]: Five numbered eligibility cards for Indian students applying to Russian medical universities.

- **Runtime:** client (`"use client"`) although it uses no hooks or browser APIs — server-capable as written.
- **Purpose:** Explains qualification, marks, age, NEET and no-entrance-exam requirements on the Russia page.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none.
- **Constants & types:**
  - `eligibilityCards` — array of 5 objects `{ number: string; title: string; description: string | JSX.Element }`:
    1. `"1."` / `" Educational Qualification"` (note the **leading space** in the title) / JSX with `<strong>10+2 (Higher Secondary)</strong>` and `<strong>Physics, Chemistry, and Biology (PCB)</strong>`;
    2. `"2."` / `" Minimum Marks"` / 50% PCB general, 40% SC/ST/OBC;
    3. `"3."` / `" Age Requirement"` / at least 17 by December 31 of the admission year;
    4. `"4."` / `" NEET Qualification"` / must qualify NEET;
    5. `"5."` / `" No Entrance Exam"` / most universities need no additional entrance exam.
  - Every `description` **starts with `": "`** because the number is rendered in a separate `<span>`; the colon is not part of the title.
  - No exported types.
- **Data flow:** static array → `.map((card, i))` keyed by index.
- **Dependencies:** `@/lib/constants` (`CARD_GRADIENTS = "linear-gradient(149.746deg, rgb(0, 146, 63) 12.704%, rgb(49, 99, 255) 87.17%)"`).
- **Consumers:** `app/(site)/countries/mbbs-in-russia/page.tsx` (line 4, fourth section).
- **Notes:**
  - Section: `bg-[#E8F0FA]`, `py-16 px-5 lg:px-24.75`, inner `maxWidth: 1322`, `gap: 32`.
  - Header: gradient `<h2>` (`172.684deg`, green→blue) at `clamp(32px,2.5vw,48px)` + a 2px `#a3d487` rounded divider.
  - Cards: `flex flex-col lg:flex-row lg:flex-wrap` with `gap: 24`; each card is `w-full lg:w-[calc(50%-12px)]`, 16px radius, `1px solid #e6eef8`, minimal shadow. Because there are 5 cards, the last one is half-width and left-aligned.
  - The title `<p>` uses `fontSize: 0; lineHeight: 0` purely so the gradient is painted once across both spans (number span 28/36/48px, title span 15/19/24px, both `CARD_GRADIENTS`). `whiteSpace: "nowrap"` means long titles ("Educational Qualification") cannot wrap and can overflow the card on narrow widths.
  - The leading space in each title is load-bearing: it is the gap between the number span and the title span (there is no flex gap in that `<p>`).
  - Card 1's `<strong>` inherits the `#485f84` body colour, so emphasis is weight-only.
  - These five cards duplicate the visual language of `components/ui/eligibilityCard.tsx` (used by `StepsSSMU`) but do not share code.

### `ssmuDurations.tsx`

[ssmuDurations.tsx]: Dark "Duration Of MBBS At Samara State Medical University" section — giant total-years number, heading, and per-stage cards with progress bars.

- **Runtime:** server component (no `"use client"`, no hooks). Default export `SSMUDurations`.
- **Purpose:** Breaks the 6-year course into academic study (5 years) and compulsory internship (1 year), showing each stage's share of the total as a progress bar.
- **Props:** `SSMUDurationsProps` — all optional with defaults:
  - `university?: string` → default `"Samara State Medical University"`;
  - `totalYears?: number` → default `6`;
  - `stages?: DurationStage[]` → default `DEFAULT_STAGES`.
  The Russia page renders `<SSMUDurations />` with no props, so every default is in effect.
- **State & effects:** none.
- **Handlers / functions:**
  - `percent = Math.min(100, Math.round((stage.years / totalYears) * 100))` computed per stage inside `.map`;
  - `crossOutlinePath(halfArm, halfThickness)` — builds an SVG path string for a plus/cross outline from 12 points;
  - `CrossCluster({ className })` — decorative SVG (two thin outlined crosses, four rotated `<rect>` arms, an 8×4 dot grid) marked `aria-hidden`.
- **Constants & types:**
  - `BRAND_GREEN = "#00923F"`, `BRAND_BLUE = "#3163FF"`, `INTERNSHIP_ORANGE = "#FF7A1A"`.
  - `type DurationStage = { badge: string; title: string; description: string; years: number; color: string }`.
  - `DEFAULT_STAGES: DurationStage[]` = `{ "5 YEARS", "Academic study", "Theoretical + practical medical training", 5, BRAND_BLUE }` and `{ "1 YEAR", "Compulsory internship", "Clinical practice", 1, INTERNSHIP_ORANGE }`.
  - `const CROSS_OUTLINE = crossOutlinePath(38, 19)`.
  - `type SSMUDurationsProps = { university?: string; totalYears?: number; stages?: DurationStage[] }`.
- **Data flow:** props → derived percent → inline width style. No fetching.
- **Dependencies:** none (no imports; all styling via Tailwind + inline styles).
- **Consumers:** `app/(site)/countries/mbbs-in-russia/page.tsx` (line 5, fifth section).
- **Notes:**
  - `aria-label={`Duration of MBBS at ${university}`}`; section `bg-[#000B1A]` with `py-14 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-32 xl:px-40`, inner `maxWidth: 960`.
  - Left block: "Total Duration" label, gradient number `clamp(110px,12vw,168px)` using `linear-gradient(158deg, #00923F 8%, #0F7F9B 46%, #3163FF 92%)`, then "Years". Heading gradient `100deg`; body copy `#B7C2D2`; body sentence interpolates both `university` and `totalYears`.
  - Cards: `grid-cols-1 lg:grid-cols-2`, `rounded-2xl`, `rgba(255,255,255,0.035)` on `rgba(255,255,255,0.09)`. Badge pill uses `stage.color`; card title right-aligned; description `#9BA7B8`; progress track `rgba(255,255,255,0.1)`.
  - Progress bar is correctly exposed: `role="progressbar"`, `aria-valuenow={stage.years}`, `aria-valuemin={0}`, `aria-valuemax={totalYears}`, plus a descriptive `aria-label` — note `aria-valuenow` is **years, not percent**, which matches `aria-valuemax` (also years) but differs from the visual width.
  - `key={stage.badge}` means two stages with the same badge text would collide; `badge` is a display string, not an id.
  - Decorations (`hidden lg:block`) are mirrored top-left / bottom-right with `rotate-180`.
  - `stages` is assumed non-empty; no guard for `totalYears === 0` (would yield `NaN%` width).

### `stepsSSMU.tsx`

[stepsSSMU.tsx]: Two-image + six-card SSMU document checklist block (currently placeholder copy).

- **Runtime:** server component (no `"use client"`, no hooks).
- **Purpose:** Post-duration section on the Russia page listing the documents/qualifications needed for SSMU, alongside two stacked photos. Currently mid-edit: copy and layout are placeholders.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none; it calls the imported `EligibilityCards` as a **plain function** (`{EligibilityCards(card)}`) rather than rendering `<EligibilityCards {...card} />`.
- **Constants & types:**
  - `const eligibilityCardsData: EligibilityCardProps[]` — six records `{ key: number; img: LucideIcon; title: string }`:
    - 1 → `FileText`, 2 → `FileText`, 3 → `Camera`, 4 → `ClipboardCheck`, 5 → `ClipboardCheck`, 6 → `ClipboardCheck`.
    - **All six titles are the identical placeholder** `"12th certificate with 50% marks in PCB"`.
  - `EligibilityCardProps` is imported from `components/ui/eligibilityCard.tsx` (`{ key: number; img: LucideIcon; title: string }`).
  - `const cardStyle = "h-auto rounded-r-full"`.
- **Data flow:** static array → `.map` → `<div key={card.key}>` wrapper → `EligibilityCards(card)` return value. Two local images imported as modules and rendered via `<img src={img1.src}>`.
- **Dependencies:** `@/components/ui/eligibilityCard` (`EligibilityCards`, `EligibilityCardProps`), `lucide-react` (`Mail`, `FileText`, `LucideIcon`, `Camera`, `ClipboardCheck`, `Copy`), `@/public/countries/russia/chhattisgarh.webp` (`img1`), `@/public/countries/russia/delhi.webp` (`img2`).
- **Consumers:** `app/(site)/countries/mbbs-in-russia/page.tsx` (line 8, sixth section).
- **Notes:**
  - Only `FileText`, `Camera` and `ClipboardCheck` are used from `lucide-react`; **`Mail`, `Copy` and `LucideIcon` are unused imports** (the `LucideIcon` type is used only inside the imported `EligibilityCardProps`, not in this file).
  - Layout: `flex flex-col md:flex-row gap-2 p-4 md:p-8 pl-0!` (Tailwind v4 important `pl-0!`), images column `flex flex-col gap-4`, first image `w-3/4`, second `w-10/11` (both with `cardStyle` → `h-auto rounded-r-full`). Cards grid: `grid grid-cols-1 md:grid-cols-2 gap-4` inside a `<section>` with no padding/heading.
  - Images are raw `<img>` (no `next/image`), so no optimisation/lazy sizing; alts are the generic `"Image 1"` / `"Image 2"`.
  - Calling `EligibilityCards(card)` directly is technically a hook-order hazard if the component ever gains hooks (React would attribute them to `StepsSSMU`). It works today because `EligibilityCards` is hook-free.
  - There is no section heading; the block begins abruptly after `SSMUDurations`. All six cards are duplicated content — a clear TODO for the concurrent editor.
  - `public/countries/russia/chhattisgarh.webp` and `public/countries/russia/delhi.webp` both exist on disk.

### `stepSection.tsx`

[stepSection.tsx]: Dark "Documents Required For Samara State Medical University" band with a round logo badge and a **scrollable** column of four admission-process `InfoCard`s.

- **Runtime:** server component (no `"use client"`, no hooks). Default export is named `AdmissionProcess` (not `StepSection`).
- **Purpose:** Seventh section of the Russia page — restates the SSMU document checklist heading and walks through the 4 admission steps (01 research/apply → 04 post-admission support) in a fixed-height scroller.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none; `dumyData.map((card, i) => …)` keyed by index.
- **Constants & types:**
  - `const dumyData: InfoCardProps["card"][]` — four `{ number, title, description }` records: `"01" Research & Apply`, `"02" Visa & Travel`, `"03" Start MBBS Program`, `"04" Post-Admission Support`.
  - `InfoCardProps` is imported as a type from `components/ui/infoCard.tsx`.
- **Data flow:** static array → `.map` → wrapper `<div className="flex flex-col justify-center items-center w-full">` → `<InfoCard lgw={false} card={card} />`. `lgw={false}` is what makes each card full-width (`w-full` instead of `lg:w-[calc(50%-12px)]`).
- **Dependencies:** `next/image`, `@/components/ui/infoCard` (default export + `type InfoCardProps`), `@/public/countries/logo.jpg` (`image1`), `@/public/home/blog-graduation.jpg` (`image2`).
- **Consumers:** `app/(site)/countries/mbbs-in-russia/page.tsx` (line 9, `<AdmissionProcess />` rendered between `StepsSSMU` and `EventContactForm`). Only consumer.
- **Notes:**
  - Section: `relative overflow-hidden bg-cover bg-center bg-no-repeat! min-h-[50vh]!` with `backgroundImage: url(image2.src)`; a `bg-linear-to-l from-[#000B1A] via-[#00050cfc] to-[#000b1a61]` overlay sits at `z-0` and all content at `z-10`.
  - Logo badge: `relative z-10 left-5 top-5 h-20 w-20 rounded-full bg-white ring-2 ring-white/30 overflow-y-hidden` rendering `image1` with `object-cover`.
  - Body grid `grid grid-cols-1 md:grid-cols-2 p-10 sm:p-14 sm:pt-10 lg:p-16`; the left column (`className="col-span1 …"` — the typo is harmless, it never had a number) is an empty spacer, the copy lives in the second column.
  - Heading `#ssmu-documents-heading` (`26/30/34/36px`, Hanken Grotesk) with the standard green→blue gradient clipped to text, preceded by a 5px `bg-[#0B8A3D]` bar.
  - **Scroll area (currently line 80) — do not reintroduce centring:** it is `bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 mt-6 md:mt-0 w-full md:max-w-[560px] gap-4 flex flex-col items-stretch justify-start max-h-[46vh] min-h-[280px] sm:max-h-[40vh] lg:max-h-[30vh] lg:min-h-[260px] overflow-y-auto [scrollbar-gutter:stable]`.
    - It previously used `items-center justify-center` + `overflow-y-scroll`, which centred the overflowing column so card 01 rendered ~215px **above** the panel at 1440 (≈325px at 375) and could never be scrolled to; and `md:w-full` made it 656px wide so the four cards nearly fit and the scroll affordance was invisible. `justify-start` + `items-stretch` + the `max-w-[560px]` cap is what makes every card reachable.
    - The section previously carried `max-h-[70vh]!` and `overflow-y-hidden`; those clipped the panel itself on short viewports (< ~700px tall) and have been removed. Keep only `min-h-[50vh]!`.
    - The height cap tracks card height rather than being a flat `30vh`: cards are ~250–300px tall on phones but ~170px on desktop, so the cap is `46vh`/`40vh` below/above `lg` (measured 368 / 320 / 260px at an 800px-tall viewport) with `min-h` 280/280/260. One whole card is always visible; scrollHeight runs 788–1082px, so 3–7 cards' worth of content is reachable.
    - Measured panel (width × height / scrollHeight, 800px-tall viewport): 1440 → 545×260 / 788, 1024 → 433×260 / 936, 768 → 313×320 / 1028, 375 → 295×368 / 856, 320 → 240×368 / 1082. Cards are 481 / 369 / 265 / 263 / 208px wide; setting `scrollTop = scrollHeight` lands the last card fully inside the panel at every width.
  - `md:max-w-[560px]` is the only width control for the panel (`w-full` below `md`, where the grid is a single column). Combined with `p-4 sm:p-6 lg:p-8` the cards get ~200–480px of content width — enough that `InfoCard`'s gradient title now wraps instead of being clipped (it used `whiteSpace: "nowrap"`; see `components/ui/AGENT_CONTEXT.md`).
  - `max-h-[46vh]` means the visible card count still depends on viewport height (≈1.5 cards on phones, ~2.5 at 1440). If more must be visible, raise the cap here (do not switch back to `justify-center`), and keep `max-w` untouched so the scroll stays meaningful.
  - The leading space in every `title` string (`" Research & Apply"`) is load-bearing: `InfoCard` renders number + title inside a single `<p>` with no flex gap.
  - The section is unrelated to `stepsSSMU.tsx` (the two-image checklist) and to `ssmuDurations.tsx`, even though all three mention SSMU documents/course length; the heading here is duplicated verbatim from `stepsSSMU`'s copy area.

### `durationSection.tsx`

[durationSection.tsx]: **Empty stub** — default export `DurationSection` returning an empty fragment.

- **Runtime:** server component (no directive).
- **Purpose:** Placeholder for a duration section. It is **not imported by any file** (verified by grep) and is not part of the Russia page composition (`ssmuDurations.tsx` is used instead).
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none.
- **Constants & types:** none.
- **Data flow:** none — the component body is `return (<> </>)`.
- **Dependencies:** none.
- **Consumers:** none.
- **Notes:** Renders nothing at all (no wrapper, no text). The AGENT_CONTEXT entry previously carried a `TODO:` description; the file is effectively dead code and a candidate for deletion or replacement — do not document it as a working section. Keep the name in mind because `ssmuDurations.tsx` is the real implementation and the two names are easy to confuse.
