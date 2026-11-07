# Directory: components/career

Primary Purpose: Sections for the Career page (`/about-us/career`): welcome hero, "Join the team" photo/card block, and the open-positions grid with mouse-tilt cards.

Route composition (`app/(site)/about-us/career/page.tsx`): `PageBanner` (title "Career - Study Palace Hub Pvt Ltd", background `/home/about-graduation.jpg`) → `WelcomeBanner` → `JoinTeamSection` → `RecruitmentGrid` → `FaqSection` (`components/about-us/lastsection`). The page background is `#ffffff`.

## Files

### `WelcomeBanner.tsx`

[WelcomeBanner.tsx]: Full-width career hero with team photo, navy overlay, and welcome copy.

- **Runtime:** client (`"use client"`) although it has no hooks or handlers — could be a server component.
- **Purpose:** Second section of the career page, directly under `PageBanner`: a graduation photo band with "Welcome to Study Palace Hub!" and a mission paragraph.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none.
- **Constants & types:** none (all copy inline).
- **Data flow:** static; only `/about-us/career/welcome.webp` is referenced.
- **Dependencies:** `next/image`.
- **Consumers:** `app/(site)/about-us/career/page.tsx` (line 7 / rendered at line 30).
- **Notes:**
  - Section: `relative w-full overflow-hidden flex flex-col justify-center items-center gap-16 py-12 px-12`, height `clamp(200px, 25.36vw, 487px)`. Fixed `px-12` at every breakpoint leaves only 96px of usable width on a 320px phone.
  - Background: `<Image src="/about-us/career/welcome.webp" alt="Students graduation background" fill priority className="object-cover object-center" />` plus an overlay `bg-[rgba(10,36,114,0.82)]` (≈82% navy) — the photo is barely visible.
  - Heading: `<h1>` "Welcome to Study Palace Hub!" — `text-[clamp(22px,3.33vw,64px)] font-extrabold font-['Inter'] leading-[1.2]`, width `clamp(300px, 55.67vw, 1068.91px)`.
  - Body: `<p>` "At Study Palace Hub Pvt. Ltd., we believe in the power of education to transform lives…" — `text-white/90`, `clamp(13px,1.04vw,20px)`, width `clamp(300px, 58.87vw, 1130.38px)`; apostrophe escaped as `&apos;`.
  - Two competing top-of-page headings exist: `PageBanner` renders the page title and this renders an `<h1>` — SEO/screen-reader duplication.
  - The width clamps use `px` minimums of 300px, which can exceed the available width after `px-12` on very small screens (content will shrink but the fixed min can cause overflow).

### `JoinTeamSection.tsx`

[JoinTeamSection.tsx]: "Join the Study Palace Hub Team" heading with an overlapping office-photo + white "About" card on desktop.

- **Runtime:** server component (no `"use client"`; imports `next/image` and `Button` only).
- **Purpose:** Third section of the career page: recruiting pitch heading, subtitle, office photo, and a white card with company blurb and a "Brochures" button.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:**
  - Local `ArrowRight()` — 16×16 SVG arrow whose `path` stroke is hard-coded `#0028a5`; parent button uses `group-hover:[&_path]:stroke-white` to recolour on hover.
- **Constants & types:** none; inline gradient `linear-gradient(167.98deg, #00923F 12.704%, #3163FF 87.17%)`.
- **Data flow:** static; photo `/home/about-graduation.jpg` used twice (desktop 67vw, mobile 100vw).
- **Dependencies:** `next/image`, `@/components/ui/Button`.
- **Consumers:** `app/(site)/about-us/career/page.tsx` (line 8 / rendered at line 33).
- **Notes:**
  - Header: `<h2>` "Join the Study Palace Hub Team" in `'Poppins'` `clamp(32px,4.17vw,64px)` gradient text; subtitle "We're looking for passionate individuals who are dedicated to making a difference in education." in Inter `clamp(14px,1.11vw,21px)` with `letterSpacing: "-0.4267px"`. Container `max-w-380.25`, `px-4 sm:px-8 lg:px-16 xl:px-20 py-14 lg:py-20`, `gap-12 lg:gap-16`.
  - **Desktop (`hidden lg:block`, fixed `height: 600`)**: photo `absolute left-0 top-0 h-full w-[66.75%] rounded-xl overflow-hidden`; white card `absolute right-0 top-[19.2%] w-[clamp(460px,51.5%,650px)] p-12 rounded-xl border-brand-sky shadow-[0px_3px_34.25px_rgba(25,33,61,0.08)]`. The card overlaps the photo's right edge.
  - Card text is **unfinished placeholder copy**: "Briefly describe Study Palace Hub's mission, values, and impact on student learning in Delhi. Highlight what makes your company unique and the kind of work environment you foster."
  - The "Brochures" `Button` (`variant="brandOutline" size="bare"`) has **no `href`, no `onClick`, no `asChild`** — it is an inert `<button>` that goes nowhere.
  - **Mobile (`flex lg:hidden`)**: renders the photo (`height: 260`) and then an **empty** card `<div>` (the "Card below" comment is followed by nothing). So on `<lg` the About heading, body and Brochures button do not exist at all.
  - Card `<h3>` declares `fontSize: clamp(20px,1.67vw,32px)` but `lineHeight: "18px"`, which clips/overlaps larger sizes.
  - `alt="Study Palace Hub team collaborating in the office"` is used for the graduation photo (same asset) — description mismatch.
  - The page comment above the route says `/about-us/services — Services page`; that stale comment is in `app/`, not here.

### `RecruitmentGrid.tsx`

[RecruitmentGrid.tsx]: Nine job cards with hover-to-blue + pointer-driven 3D tilt, and a mobile "View All Recruitment" reveal.

- **Runtime:** client (`"use client"`; `useRef`, `useState`).
- **Purpose:** Section 4 of the career page: "Our Recruitment" header plus `JOBS` cards with an "Apply Now" button.
- **Props:** none on the exported component. Internal `JobCard` takes `{ job: JobItem }`.
- **State & effects:**
  - `showAll` (`useState(false)`) in `RecruitmentGrid`.
  - `cardRef = useRef<HTMLDivElement>(null)` inside each `JobCard`; **no effects** and no cleanup needed because the transform is written directly to the DOM node.
- **Handlers / functions:**
  - `onMove(e: React.PointerEvent<HTMLDivElement>)` — ignores non-mouse pointers (`e.pointerType !== "mouse"`, so touch is excluded), computes `px = (clientX - rect.left)/rect.width - 0.5`, `py` likewise, then sets `card.style.transform = rotateX(${-py * 10}deg) rotateY(${px * 10}deg)` (max ±5°).
  - `onLeave()` — clears `card.style.transform = ""`.
  - Handlers live on the **non-rotating outer wrapper** so the hit area does not move under the cursor (documented in the source).
  - `setShowAll(true)` on "View All Recruitment".
- **Constants & types:**
  - `JOBS` — 9 objects `{ id: number; title: string; body: string; subRole: string | null }`:
    1. Accountant
    2. Human Resource
    3. Open Marketing Vacancies
    4. Data Entry
    5. Social Media
    6. Open Counselor Vacancies (`subRole: "Receptionist cum Academic Counsellor"` — the only non-null)
    7. Graphic Designer
    8. Video Creator
    9. Video Editor
  - `BRAND_GRADIENT = "linear-gradient(136.5deg, #00923F 12.704%, #3163FF 87.17%)"`.
  - `interface JobItem { id: number; title: string; body: string; subRole: string | null }`.
  - Local `ArrowRight()` with `stroke="currentColor"` so it inherits the button colour (contrast with the version in `JoinTeamSection`).
- **Data flow:** static `JOBS` → `.map((job, idx))` → `hiddenOnMobile = idx >= 3 && !showAll` → wrapper `className={hiddenOnMobile ? "hidden sm:block" : "block"}` → `JobCard`.
- **Dependencies:** `react` (`useRef`, `useState`), `@/components/ui/Button`.
- **Consumers:** `app/(site)/about-us/career/page.tsx` (line 9 / rendered at line 36).
- **Notes:**
  - Header: gradient `<h2>` "Our Recruitment" (`157.64deg`, Poppins `clamp(32px,4.17vw,64px)`) + "Explore our current openings and start your journey with us today!"; container `max-w-420`, `px-4 sm:px-8 lg:px-16 xl:px-20 py-16 lg:py-24`.
  - Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch`. Only the **first three** cards are hidden on phones before expanding; `sm+` always shows all nine.
  - The reveal button is both `sm:hidden` **and** rendered only `{!showAll && …}`, so it disappears permanently after one click (no collapse).
  - Card chrome: `p-8 rounded-4xl border border-brand-sky min-h-80`, default `bg-brand-blue/1` with a 3px bottom "solid" shadow (`0_3px_0_#bacbff`); on `group-hover` becomes solid `bg-brand-blue` with `0_4px_0_#0028a5`. Text colours flip to white/sky. 3D classes `perspective-midrange`, `transform-3d`, `translate-z-10` (text) / `translate-z-16` (button) are Tailwind v4.
  - Button: `variant="unstyled" size="md" shape="xl"` with `bg-white`, gradient overlay `<span aria-hidden className="absolute inset-0 text-white -z-10 … group-hover:opacity-0" style={{ background: BRAND_GRADIENT }}>` and `group-hover:text-brand-navy`; the label is `text-white` initially over the gradient and flips to navy as the gradient fades.
  - **No link/click action on "Apply Now"** — it is a plain `Button` with no `href`/`onClick`, so the job cards are non-functional beyond hover/tilt.
  - Content mismatches: several `body` texts describe a different role than the title ("Accountant" → Financial Analyst; "Data Entry" → Admission Counselor; "Video Creator" → Content Writer; "Human Resource" → Recruitment Manager). `subRole` is `null` for 8 of 9.
  - Tilt writes inline styles but Tailwind's `transition-[transform,background-color,box-shadow]` applies, so the reset animates; the transform is set imperatively, so React re-renders cannot clobber it mid-gesture.
  - No `prefers-reduced-motion` guard for the tilt or the hover translations.
  - Job data is not typed as `readonly` and `JOBS` is module-level (read-only in practice).
