# Directory: components/universities

Primary Purpose: All 14 sections of the university detail route `/universities/[slug]` (13 content sections + the Free-Counselling form mount) plus the shared sticky sub-nav (`univNav`). Everything is university-name-generic: the page derives the display name from the slug, passes it through `UnivNav` / `UnivSections` / `getOptions()`, and `withUniversityName()` (see `universityName.ts`) swaps the shipped "Samara …" sample copy at render time. No `page.tsx` here — the route page lives in `app/(site)/universities/[slug]/page.tsx` and only composes these components.

Permissions/Auth: Public marketing content. No auth, no server actions, no DB access.

## Files

### `studentTestimonials.tsx`

[studentTestimonials.tsx]: Student testimonial band for `/universities/[slug]` — a responsive four-card carousel styled after the supplied reference: mint-to-periwinkle background, gradient heading, five-star rows, reused `/home/team-*` portraits, slate name panels, and accessible previous/next controls.

- **Runtime:** client (`"use client"`) because the compact mobile/tablet carousel uses local offset state.
- **Purpose:** Rendered after `UnivSections` and before the FAQ in the university detail route.
- **Props:** None; testimonial data is local and typed.
- **State & effects:** `offset` tracks the single horizontal step available below the desktop four-column layout.
- **Dependencies:** `next/image`, React `useState`; static assets under `public/home`.
- **Consumers:** `app/(site)/universities/[slug]/page.tsx`.
- **Auth:** Public.

### `advancedTraining.tsx`

[advancedTraining.tsx]: "Advanced Clinical Training & Labs" section — a single rounded, shadowed card on the same mint→periwinkle gradient as `whyChooseUs`: left half is a dark-navy panel with green+blue two-tone heading, muted intro paragraph and three teal `CircleCheck` bullets; right half is a full-bleed photo.

- **Runtime:** client (`"use client"`, no hooks — matches sibling sections).
- **Purpose:** Rendered directly in `app/(site)/universities/[slug]/page.tsx` (no wrapper div — this one was requested without a page-side anchor, so the section's own `id="advanced-training"` is the only anchor), below `WhyChooseUsSection`.
- **Props:** all optional, defaults from `DEFAULT_CONTENT`: `anchorId?`, `sectionLabel?`, `titleGreen?`, `titleBlue?`, `intro?`, `highlights?: string[]`, `imageSrc?: StaticImageData | string`, `imageAlt?`.
- **State & effects:** None.
- **Handlers / functions:** None.
- **Constants & types:** `AdvancedTrainingProps`; `DEFAULT_CONTENT: Required<AdvancedTrainingProps>` exported (SamSMU copy; three highlights as plain strings — the `CircleCheck` icon is fixed in the JSX, unlike `fmgeClasses`/`accreditation` where icons ride along in the data).
- **Data flow:** props/`DEFAULT_CONTENT` → pure JSX. No API, context, or state.
- **Dependencies:** `next/image` (poster via static import of `@/public/home/univ-campus.jpg`, `placeholder="blur"`), `lucide-react` (`CircleCheck`).
- **Consumers:** `app/(site)/universities/[slug]/page.tsx` (`<AdvancedTrainingSection />`, no props).
- **Notes:** The default photo is a campus image borrowed from `homepage/GloballyRecognizedUniversities.tsx` (which references it as URL string `/home/univ-campus.jpg`); the design shows a laboratory photo — swap via `imageSrc` when a real lab asset lands in `public/`. Dark panel `bg-[#142a44]`, heading `text-green-400`/`text-blue-400` (lighter shades than the section headings on white — intentional for contrast on navy). On mobile the image drops below the text with `min-h-64`.

### `admissionProcess.tsx`

[admissionProcess.tsx]: "University Admission Process" section — full-width dark photo band (content-sized height): gradient green→sky heading, muted subtitle, horizontal dotted timeline rail with one dot per card (desktop `@min-[1024px]:` only), a 1/2-col responsive grid of translucent step cards (icon + auto-numbered "Step N" + green title + description) and a centered green→blue gradient CTA button with arrow.

- **Runtime:** client (`"use client"`, no hooks — matches sibling sections).
- **Purpose:** Rendered through the sticky `UnivNav` `options` list (id 7, `#admission-process`) into `components/universities/sections.tsx`, which supplies the anchor wrapper `<div id="admission-process">` — the section deliberately does NOT set its own id (avoids the duplicate-id caveat the other siblings carry).
- **Props:** all optional, defaults from `DEFAULT_CONTENT`: `sectionLabel?`, `title?`, `subtitle?`, `steps?: { title, description, icon? (kebab-case icon NAME), stepLabel? }[]`, `ctaLabel?`, `ctaHref?`, `backgroundImageSrc?: StaticImageData | string`, `imageAlt?`. Step numbers derive from array order; icons resolve from a module-level `ICONS` lucide registry by string name (JSON/CMS-friendly, unknown names fall back to `FileText`).
- **State & effects:** None.
- **Handlers / functions:** None.
- **Constants & types:** `AdmissionStep`, `AdmissionProcessProps` (module-local); `DEFAULT_CONTENT: Required<AdmissionProcessProps>` exported with SamSMU copy (5 steps matching the design: Application Submission / Admission Letter / Invitation Letter / Visa Application / Travel and Enrolment; `ctaHref: "#free-counselling"` — the EventContactForm section in the same nav).
- **Data flow:** props/`DEFAULT_CONTENT` → pure JSX. No API, context, or state.
- **Dependencies:** `next/image` (background photo via `fill` — default static import `@/public/home/univ-campus.jpg`, borrowable like `advancedTraining`; overlay `bg-[#0a1828]/80`), `next/link` (CTA), `lucide-react` (`ArrowRight`, `BadgeCheck`, `FileText`, `Mail`, `MailOpen`, `Plane`).
- **Consumers:** `components/universities/univNav.tsx` (id-7 option `component`), rendered by `components/universities/sections.tsx`.
- **Auth:** Public.
- **Notes:** Dots/rail `hidden @min-[640px]:block` (only the desktop 5-col row is aligned on one line; below 640px the cards stack without dots). Foreground colors on cards: `text-emerald-400` step number, `text-emerald-300` title, `text-gray-300` description — eyeballed from the design screenshot. Background photo is a temporary borrowed asset — swap `backgroundImageSrc` (or via CMS override) when a real admission/campus photo lands in `public/`.

### `documents.tsx`

[documents.tsx]: "Documents Required For <University>" section — mint→periwinkle gradient band: left = capsule-clipped photo (rectangle, `rounded-t-full rounded-b-full` — top & bottom fully rounded, NOT an ellipse) with an offset thin matching ring, right = green-bar heading (green part + blue part), two intro paragraphs and a 2-col grid of 8 white document cards (tinted icon chip + plain-text label); right column carries extra `@min-[1024px]:pr-10`.

- **Runtime:** client (`"use client"`, no hooks — matches sibling sections).
- **Purpose:** Rendered through the sticky `UnivNav` `options` list (id 8, `#documents`) into `components/universities/sections.tsx`, which supplies the anchor wrapper — the section deliberately does NOT set its own id (same duplicate-id avoidance as `admissionProcess.tsx`).
- **Props:** all optional, defaults from `DEFAULT_CONTENT`: `sectionLabel?`, `titleGreen?`, `titleBlue?`, `paragraphs?: string[]`, `items?: { title, icon? (kebab-case icon NAME), tone? ("blue"|"red"|"green") }[]`, `imageSrc?: StaticImageData | string`, `imageAlt?`. Icons resolve from module-level `ICONS` lucide registry, chip colours from `TONES` registry — both by string name (JSON/CMS-friendly, unknown names fall back to `file-text`/`blue`).
- **State & effects:** None.
- **Handlers / functions:** None.
- **Constants & types:** `DocumentItem`, `DocumentsProps` (module-local); `DEFAULT_CONTENT: Required<DocumentsProps>` exported with the 8 SamSMU documents from the design (NEET Result / Admit Card is the one `tone: "red"` card, matching the design).
- **Data flow:** props/`DEFAULT_CONTENT` → pure JSX. No API, context, or state.
- **Dependencies:** `next/image` (oval photo via `fill` — default static import `@/public/bg-doctor.jpg`, `sizes` tuned to the oval widths), `lucide-react` (`Camera`, `Copy`, `FileBadge`, `FileText`, `HeartPulse`, `Landmark`, `Mail`).
- **Consumers:** `components/universities/univNav.tsx` (id-8 option `component`), rendered by `components/universities/sections.tsx`.
- **Auth:** Public.
- **Notes:** Band gradient and green card-bar styling reuse `whyChooseUs`'s hard-coded values (`bg-[linear-gradient(120deg,#e6f3ec…#edf0fa)]`, green bar `bg-green-600`). Photo is a capsule (`rounded-t-full rounded-b-full`) with a matching `-inset-3` ring `border-[#9db8d8]/50` — eyeballed from the design. The default photo (`bg-doctor.jpg`) is a doctor-in-coat image that visually matches the design — swap via `imageSrc`/CMS override if a dedicated asset lands in `public/`.

### `whyChooseUs.tsx`

[whyChooseUs.tsx]: "Why Choose Samara State Medical University?" section — soft mint→periwinkle gradient band: centered green+blue two-tone heading, centered subtitle, then a 3×2 grid of white reason cards, each with a green vertical strip on the left edge, auto-numbered title ("1. Globally Recognized Degree") and small grey description.

- **Runtime:** client (`"use client"`, no hooks — matches sibling sections).
- **Purpose:** Section of `app/(site)/universities/[slug]/page.tsx`, rendered inside the page's `<div id="#why-choose-us">` wrapper after FMGE Classes; also sets its own `id` (default `"why-choose-us"`).
- **Props:** all optional, defaults from `DEFAULT_CONTENT`: `anchorId?`, `sectionLabel?`, `titleGreen?`, `titleBlue?`, `subtitle?`, `reasons?: { title, description }[]`.
- **State & effects:** None.
- **Handlers / functions:** None.
- **Constants & types:** `WhyChooseReason`, `WhyChooseUsProps`; `DEFAULT_CONTENT: Required<WhyChooseUsProps>` exported with the six SamSMU reasons from the design.
- **Data flow:** props/`DEFAULT_CONTENT` → pure JSX. No API, icons, or state (the only section in the folder with no external icon dependency).
- **Dependencies:** none beyond React (no next/image, no lucide).
- **Consumers:** `app/(site)/universities/[slug]/page.tsx` (`<WhyChooseUsSection />`, no props).
- **Notes:** Card numbering comes from array order (`index + 1`), NOT from the data — reordering the `reasons` array renumbers automatically. Wired into `univNav` at id 4 (`#why-choose-us`) with university-name overrides. Background gradient, green strip and `text-[#16224a]` titles are hard-coded, eyeballed from the screenshot.
- **Change (Nov 2026, mobile):** the two-tone `<h2>` lost its unconditional `whitespace-nowrap` → now `md:whitespace-nowrap` (heading wraps below `md`). Long titles like "Why Choose Samara State Medical University?" were measurable ~453px and stuck out of any narrow container (CMS preview canvas, phones); verified fixed at 390px.

### `fmgeClasses.tsx`

[fmgeClasses.tsx]: "FMGE Classes at Samara State Medical University" section — white band: left column with green-bar blue heading, small intro, three tinted feature bars (syllabus / mock tests / revision strategy) and a green-bar italic quote in a light-blue box; right column with a 16:9 video card (YouTube iframe or placeholder thumbnail with red play pill + caption footer); full-width "Global Career Pathways" text block with a teal "International standards" brand line at the bottom.

- **Runtime:** client (`"use client"`, no hooks — matches sibling sections).
- **Purpose:** Third section of `app/(site)/universities/[slug]/page.tsx`, rendered inside the page's `<div id="#fmge-classes">` wrapper; also sets its own `id` (default `"fmge-classes"`) via `anchorId`.
- **Props:** all optional, defaults from `DEFAULT_CONTENT`: `anchorId?`, `sectionLabel?`, `title?`, `intro?`, `features?: { label, icon: ReactNode }[]`, `quote?`, `videoUrl?`, `videoTitle?`, `videoCaption?`, `videoPoster?: StaticImageData | string`, `pathwaysTitle?`, `pathwaysParagraphs?: string[]`, `standardsLabel?`, `standardsIcon?: ReactNode`.
- **State & effects:** None.
- **Handlers / functions:** module-level `featureIcon(Icon)` helper returning a lucide icon node.
- **Constants & types:** `FmgeFeature`, `FmgeClassesProps`; `DEFAULT_CONTENT: Required<FmgeClassesProps>` exported (SamSMU sample copy; `videoUrl: ""` with a TODO comment — real YouTube URL still missing, per user decision).
- **Data flow:** props/`DEFAULT_CONTENT` → pure JSX. No API, context, or state.
- **Dependencies:** `next/image` (poster via static import of `@/public/bg-doctor.jpg`, `placeholder="blur"`), `lucide-react` (`BookOpen`, `CalendarCheck`, `Globe`, `Play`, `Target`).
- **Consumers:** `app/(site)/universities/[slug]/page.tsx` (`<FmgeClassesSection />`, no props).
- **Notes:**
  - When `videoUrl` is set, `watch?v=` URLs are rewritten to `embed/` (a simple string replace — playlist/`youtu.be` short links are NOT handled); empty → placeholder thumbnail with TODO (also noted inline in the file).
  - The iframe renders only for a truthy `videoUrl`; the placeholder is intentionally non-functional (no link).
  - Feature bars `bg-[#eef0f7]`, quote box `bg-[#eaf1fd]`, caption/link text `text-blue-600`, pathways paragraphs `text-slate-500` — hard-coded, eyeballed from the screenshot.
  - Section carries `id="fmge-classes"` while the page ALSO wraps it in `<div id="#fmge-classes">` — same duplicate-id caveat as `accreditation.tsx` (page wrappers use a leading `#`, which anchor links can't jump to).

### `accreditation.tsx`

[accreditation.tsx]: "Recognition & Accreditation" section — dark-blue radial-gradient band: left column with teal "Global Standards" eyebrow, white heading, muted intro paragraph, bold quote, and a teal-check checklist; right column with two stacked white accent-bar cards (WFME Accredited, IAAR/NAAR Recognized); full-width white "Global Career Pathway (USA & Canada)" card at the bottom.

- **Runtime:** client (`"use client"`, no hooks — matches sibling sections).
- **Purpose:** Second section of `app/(site)/universities/[slug]/page.tsx`, rendered inside the page's `<div id="#accreditation">` wrapper. The section itself also sets `id` (default `"accreditation"`) via the `anchorId` prop — call with `anchorId={undefined}` and no wrapper id if you later dedupe.
- **Props:** all optional, defaults destructured from `DEFAULT_CONTENT`: `anchorId?`, `sectionLabel?`, `eyebrow?`, `heading?`, `paragraphs?: string[]`, `quote?`, `checklistLabel?`, `checklist?: string[]`, `cards?: { title, description, icon: ReactNode }[]`, `highlightTitle?`, `highlightText?`, `highlightIcon?: ReactNode`.
- **State & effects:** None.
- **Handlers / functions:** None.
- **Constants & types:** `AccreditationCard`, `AccreditationProps` (module-local types); `DEFAULT_CONTENT: Required<AccreditationProps>` exported with SamSMU sample copy; module-level `WFME_ICON` / `IAAR_ICON` JSX icon spans (teal/sky tinted lucide `BadgeCheck` / `Building2`) referenced inside `DEFAULT_CONTENT.cards`.
- **Data flow:** props/`DEFAULT_CONTENT` → pure JSX. No API, context, or state.
- **Dependencies:** `lucide-react` (`BadgeCheck`, `Building2`, `Check`, `GraduationCap`).
- **Consumers:** `app/(site)/universities/[slug]/page.tsx` (`<AccreditationSection />`, no props).
- **Notes:**
  - Background is an eyeballed radial gradient `bg-[radial-gradient(120%_140%_at_88%_35%,#2b4fd8_0%,#17307f_45%,#0a1740_100%)]` — adjust together with the neighbouring section colors if a Figma value becomes known.
  - Paragraphs keyed by `paragraph.slice(0, 24)`; cards keyed by `card.title`; checklist by `item` — keep keys unique.
  - `highlightText` is `text-blue-600/80`, `cards` descriptions `text-slate-500` on `text-[#0f1e46]` titles — hard-coded hex/navy, no brand tokens.
  - Section carries a real `id="accreditation"` while the page ALSO wraps it in `<div id="#accreditation">` — the page's ids use a leading `#` (broken for anchor links; `univNav` points to `#accreditation`). If the wrapper ids are fixed to `id="accreditation"` there will be a duplicate id with this section — either drop the wrapper or stop the section from setting its own `id`.

### `eligibility.tsx`

[eligibility.tsx]: "Eligibility Criteria" section — a dark navy-to-royal-blue gradient band with a heading, green divider, supporting copy, responsive criteria cards, and a footer note.

- **Runtime:** client (`"use client"`, no hooks).
- **Purpose:** Fifth section of `app/(site)/universities/[slug]/page.tsx`, rendered by the university navigation/section composition.
- **Props:** all optional, with defaults from `DEFAULT_CONTENT`: `anchorId?`, `sectionLabel?`, `heading?`, `intro?`, `criteria?: { title, description }[]`, `footer?: ReactNode`.
- **State & effects:** None.
- **Handlers / functions:** None.
- **Constants & types:** `EligibilityCriterion`, `EligibilityProps`, and exported `DEFAULT_CONTENT`; the default SamSMU criteria copy is defined above the component.
- **Data flow:** props/`DEFAULT_CONTENT` → pure JSX. No API, context, or state.
- **Dependencies:** React `ReactNode` type only.
- **Consumers:** `components/universities/univNav.tsx` (`<EligibilitySection />`), then `components/universities/sections.tsx`.
- **Notes:** The criteria grid is one column on mobile, two columns at `sm`, and four columns at `lg` to match the supplied reference composition. The section owns `id="eligibility"` while the wrapper currently also uses a normalized `eligibility` id.

### `overview.tsx`

[overview.tsx]: "University Overview & Introduction" split section — heading with green vertical bar and green/blue two-tone title, grey intro paragraphs, gradient "Read More About Us" CTA, and a rounded photo on the right with an overlapping dark-navy badge ("14+ Years / Academic Excellence & Heritage").

- **Runtime:** client (`"use client"` — only for hover styling consistency with sibling sections; no hooks actually used).
- **Purpose:** Generic, prop-driven overview section for any university page (wired into `univNav` at id 1, `#overview`). Markdown not used; headings/paragraphs/badge all plain JSX.
- **Props:** `sectionLabel?`, `titleGreen?`, `titleBlue?`, `paragraphs?: string[]`, `ctaHref?`, `ctaLabel?`, `imageSrc?: StaticImageData | string`, `imageAlt?`, `badgeCount?`, `badgeText?` — every prop optional with defaults destructured from `DEFAULT_CONTENT`.
- **State & effects:** None.
- **Handlers / functions:** None.
- **Constants & types:** `OverviewProps` (exported shape only implicitly — the type itself is module-local); `DEFAULT_CONTENT` typed `Required<OverviewProps>` and **exported** so callers can spread/override it in the page file (Samara State Medical University sample text, `ctaHref: "/contact-us"`, badge `14+ Years`). Default image is a static import of `@/public/countries/russia/chhattisgarh.webp` (user-selected placeholder).
- **Data flow:** All values from props/`DEFAULT_CONTENT` → pure JSX. No API, context, or state.
- **Dependencies:** `next/image` (`Image`, static import, `placeholder="blur"` — requires the default image to remain a static import), `next/link`, `lucide-react` (`ArrowRight`).
- **Consumers:** `components/universities/univNav.tsx` (id-1 option `component`), rendered by `components/universities/sections.tsx`.
- **Notes:**
  - `DEFAULT_CONTENT.paragraphs` is keyed by `paragraph.slice(0, 24)` in the JSX map — unique first 24 chars are assumed; change the key if paragraphs get shuffled.
  - Badge is absolutely positioned: inside the image on mobile (`bottom-4 left-4`), overhanging the image's bottom-left corner on desktop (`@min-[1024px]:-bottom-4 @min-[1024px]:-left-10`). The left overhang relies on the section's `px` padding; don't reduce container padding below ~40px on desktop.
  - Colors are hard-coded (`bg-[#f3f8f6]` section, green-600/blue-600 accents, `bg-[#0e1b2a]` badge) — no brand tokens; adjust all three together if the palette changes.
  - Section background `#f3f8f6` was eyeballed from a Figma screenshot; check the seam with neighbouring sections when the page is assembled.

### `univNav.tsx`

[univNav.tsx]: Sticky anchor sub-nav bar linking to university-page sections and showing an error popup when an option has no implemented component.

- **Runtime:** client component (`"use client"`) because unavailable-section clicks use local state.
- **Purpose:** Section jump-nav for university detail pages.
- **Props:** none — the 8 `options` (module-level array) are the whole content.
- **State & effects:** `errorMessage` stores the current unavailable-section message.
- **Handlers / functions:** Undefined options prevent the anchor navigation and set `errorMessage`; the popup close handler clears it.
- **Constants & types:** module-level `options` array `{ id, name, href }`.
- **Data flow:** static options → `.map()` → anchor or unavailable-section popup. No scroll-spy/active state.
- **Dependencies:** React `useState`; `ErrorPopup`; university section components used by `options`.
- **Consumers:** `app/(site)/universities/[slug]/page.tsx`.
- **Notes:** Defined options retain normal anchor navigation. Undefined options show `"<section> section is not available yet."` and do not change the URL. The bar uses a dark sticky background positioned below the fixed global Navbar (`clamp(64px, 5.21vw, 100px) + 0.5rem`) so the two navigation bars do not overlap.
- **Change (CMS):** `UnivNav` now also accepts an optional `options?: UnivOption[]` prop — when given, it is rendered verbatim instead of `getOptions()`. Backward compatible; consumed by `components/cms/univLayoutPreview.tsx` so the CMS preview lists only the entry's chosen sections.

### `sections.tsx`

[sections.tsx]: Renders each university navigation option inside an error boundary and exposes normalized anchor IDs.

- **Runtime:** client component (`"use client"`) because it contains a React class error boundary.
- **Purpose:** Compose university sections and display `ErrorPopup` when a section render fails.
- **Props:** none.
- **State & effects:** Each `SectionErrorBoundary` stores its caught `Error | null`.
- **Handlers / functions:** `getDerivedStateFromError` captures render errors and renders a section-specific popup.
- **Constants & types:** `SectionErrorBoundaryProps` and `SectionErrorBoundaryState`.
- **Data flow:** `options` → normalized `href.slice(1)` wrapper ID → boundary → optional component.
- **Dependencies:** React `Component`/`ReactNode`, `ErrorPopup`, `DurationSection`, and `options` from `univNav`.
- **Consumers:** `app/(site)/universities/[slug]/page.tsx`.
- **Notes:** The MBBS duration option (`id: 6`) is explicitly rendered here through `DurationSection`; this keeps the page section composition visible in one place while the navigation option still exposes the component for availability checks.
