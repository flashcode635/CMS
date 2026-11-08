# Directory: components/ui

Primary Purpose: Shared design-system and site-chrome layer — the single `Button` primitive, the global `Navbar`/`NavDropdown`/`Footer`, page scaffolding (`PageBanner`, `HeadingOfCard`, `carousal`, `threeDCarousel`, `curveCard`, `eligibilityCard`) and reusable inputs (`form`, `searchbar`). Feature folders (`about-us`, `homepage`, `countries`, …) import from here rather than duplicating markup.

## Files

### `Button.tsx`

[Button.tsx]: The project's one button primitive (class-variance-authority variants) plus a `ButtonLink` wrapper for `<Link>`s that should look like buttons.

- **Runtime:** shared / server-by-default (no `"use client"`). Safe in both server and client trees; consumers are mostly client components. Uses the React 19 ref-as-prop pattern (`ref` destructured from props, no `forwardRef`).
- **Purpose:** Centralises every button look on the site so gradient/hover/focus behaviour and disabled/loading states stay consistent. 36 files import it.
- **Props:** `ButtonProps = Omit<React.ComponentProps<"button">, "size"> & Omit<CommonProps, "size"> & (IconOnly | WithText)`.
  - From `VariantProps<typeof buttonVariants>`: `variant`, `size`, `shape`, `fullWidth`.
  - Extra: `isLoading?: boolean` (default `false`), `leftIcon?: React.ReactNode`, `rightIcon?: React.ReactNode`, `active?: boolean`.
  - `type` defaults to `"button"` (destructured default) so buttons inside forms do not submit accidentally; `ref` is forwarded to the `<button>`; remaining native props are spread.
  - Discriminated union: `IconOnly = { size: "icon" | "iconLg"; "aria-label": string }` makes an accessible name **mandatory at the type level** for icon-only buttons; `WithText` forbids `icon`/`iconLg`.
- **Variants (exact values):**
  - `brand` _(default)_: `bg-linear-135 from-brand-green to-brand-blue text-white shadow-md hover:opacity-90 active:scale-[0.98]`
  - `brandSolid`: `bg-brand-green text-white hover:opacity-90 active:scale-[0.98]`
  - `brandOutline`: `border border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue hover:text-white`
  - `brandWide`: `bg-linear-90 from-brand-green via-brand-cyan to-brand-blue text-white shadow-lg hover:scale-105 hover:shadow-cyan-500/30`
  - `brandBorder`: `border-2 border-transparent text-white hover:bg-cyan-500/20` + `[background:linear-gradient(#061833,#061833)_padding-box,linear-gradient(90deg,#00923F,#00b4d8,#3163FF)_border-box]` (gradient border trick)
  - `outline`: `border border-gray-300 bg-white text-gray-700 hover:border-brand-royal hover:text-brand-royal`
  - `tab`: `border border-gray-300 bg-white text-gray-700 hover:bg-gray-50` + `data-[active=true]:border-transparent data-[active=true]:bg-linear-135 data-[active=true]:from-brand-green data-[active=true]:to-brand-blue data-[active=true]:text-white`
  - `glass`: `border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`
  - `dark`: `border border-cyan-700/90 bg-[#051833]/90 text-white/90 hover:border-cyan-400/60 hover:bg-cyan-700/20`
  - `ghost`: `bg-transparent text-inherit hover:bg-black/5`
  - `unstyled`: `font-normal` (layout classes come from `className`; the most-used variant, ~32 occurrences of `variant="unstyled"` in `app/` + `components/`)
  - `nav`: `bg-transparent text-white`
  - `link`: `text-brand-blue underline-offset-4 hover:underline`
  - `destructive`: `bg-red-600 text-white hover:bg-red-700`
  - Base classes: `inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium transition-all duration-200 cursor-pointer` + `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2` + `disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0`.
- **Sizes (exact values):** `bare: ""` (24 usages, mostly layout-controlled buttons), `sm: "h-9 px-4 text-sm"`, `md: "h-11 px-6 text-sm"` _(default)_, `lg: "h-14 px-8 text-base sm:h-16 sm:text-lg"`, `icon: "size-10 p-0"` (19 usages), `iconLg: "size-12 p-0"`.
- **Shapes:** `none: "rounded-none"`, `md: "rounded-md"`, `lg: "rounded-lg"` _(default)_, `xl: "rounded-xl"`, `pill: "rounded-full"`.
- **fullWidth:** `true: "w-full"`, `false: ""` _(default)_.
- **State & effects:** none (no hooks, no timers, no listeners). Purely presentational.
- **Handlers:** none of its own — `onClick`, `onSubmit`, etc. pass through via `...props`. Loading behaviour is declarative: `disabled={disabled || isLoading}`, `aria-busy={isLoading || undefined}`, spinner replaces `leftIcon` while loading and hides `rightIcon`.
- **Internal helpers:** `Spinner()` — inline SVG (`size-[1em] animate-spin`, `aria-hidden`) so it scales with the button font-size.
- **Constants & types:** `buttonVariants` (exported cva instance), `ButtonProps` (exported type), non-exported `CommonProps`, `IconOnly`, `WithText`.
- **Dependencies:** `react`, `next/link`, `class-variance-authority` (`cva`, `VariantProps`), `@/lib/utils` (`cn` = clsx + tailwind-merge). Brand colours come from `@theme` in `app/globals.css` (`--color-brand-green: #00923F`, `--color-brand-blue: #3163FF`, `--color-brand-royal: #0039ea`, `--color-brand-navy: #0028a5`, `--color-brand-sky: #bacbff`, `--color-brand-cyan: #00b4d8`).
- **Consumers (verified by grep):** `components/about-us/{ContactSection,lastsection}`, `components/blog-details/{NewsletterCTA,ShareBar}`, `components/blogs/BlogsGrid`, `components/brochures/BrochuresGrid`, `components/career/{JoinTeamSection,RecruitmentGrid}`, `components/collections/UpcomingEventsGrid`, `components/countries/collegeCards`, `components/homepage/{AboutSection,BigNewsSection,MBBSAbroad,MBBSAbroadHero,MBBSHeroSection,MBBSCountries,FreshersPartyHighlights,HeroBanner,LatestBlogs,SearchSection,TestimonialsSection}`, `components/images/{EventContactForm,EventGalleryGrid,GalleryGrid}`, `components/partner-with-us/{BenefitsGallery,ExclusiveUniversities,PartnerContactSection}`, `components/services/AdmissionProcess`, `components/videos/VideoGrid`, and inside this folder `Footer`, `Faq`, `Navbar`, `carousal`, `form`, `searchbar`. No `app/` file imports it directly.
- **Notes:** `className` goes through `cn`, so callers can override paddings/gradients (several do, e.g. `form.tsx` replaces the gradient with an inline `style`). `active` writes `data-active`, which only the `tab` variant styles — other variants accept `active` silently (used by `brochures/BrochuresGrid`, `collections/UpcomingEventsGrid`). `ButtonLink` spreads `React.ComponentProps<typeof Link>` + variants but **does not** support `leftIcon`/`rightIcon`/`isLoading`/`active`, has no `aria-label` requirement for icon sizes, and is currently **unused** anywhere in the repo. `link` and `destructive` variants are also unused today.

### `ErrorPopup.tsx`

[ErrorPopup.tsx]: Fixed, accessible error alert shown above the page content.

- **Runtime:** shared / server-by-default (no directive); it has no hooks or browser APIs.
- **Purpose:** Displays a supplied error message at the top-center of the viewport whenever it is rendered.
- **Props:** `ErrorPopupProps = { message: string }`.
- **State & effects:** none.
- **Handlers:** none.
- **Dependencies:** none.
- **Consumers:** available to any feature that needs to render an error message; no current consumers.
- **Notes:** Uses `role="alert"` and `aria-live="assertive"`; the fixed high-z-index placement keeps it above other components on desktop and mobile.

### `Faq.tsx`

[Faq.tsx]: Hard-coded three-question accordion; generic FAQ block, rendered only at the end of the Russia country page.

- **Runtime:** client (`"use client"`).
- **Purpose:** Simple accordion FAQ section (heading + bordered item cards + chevron). Generic block; the About/Services pages render the richer FAQ implementation in `components/about-us/lastsection.tsx` (exported as `FaqSection`) instead, and this one is used only once.
- **Props:** none (default export `Faq`).
- **State & effects:** `openIndex: number | null` (initially `null` — all collapsed). No effects/timers/listeners.
- **Handlers:** `toggle(index)` — sets `openIndex` to `index`, or back to `null` when the same item is clicked (single-open accordion; clicking the open row closes it).
- **Constants & types:** `export interface FaqItem { question: string; answer: string }`; module constant `FAQ_ITEMS: FaqItem[]` with 3 MBBS-abroad questions (eligibility criteria, NEET requirement, degree recognition). Answers are plain strings.
- **Dependencies:** `react` (`useState`), `lucide-react` (`ChevronDown`), `@/components/ui/Button`.
- **Consumers:** `app/(site)/countries/mbbs-in-russia/page.tsx` (only importer, rendered as `<Faq />` after `EventContactForm`).
- **Notes:** Renders the question row as `<Button variant="unstyled" size="bare" shape="none">` with `w-full justify-between p-4 text-left`. Accessibility gaps: no `aria-expanded`, no `aria-controls`, no `id`/`role="region"` pairing; keyboard access works only because the trigger is a real `<button>`. The answer panel is conditionally mounted (no height animation; only the chevron rotates). Duplicate FAQ data also exists in `components/about-us/lastsection.tsx`, which is what the About/Services pages use.
- **Change (Nov 2026, mobile):** trigger Button gains `whitespace-normal` (tw-merge drops the base CTA `whitespace-nowrap`) — long questions like "What are the basic eligibility criteria for studying MBBS abroad?" were ~492-512px single-line and stuck out of narrow containers (CMS preview canvas clipped them at 390px); verified fixed.

### `Footer.tsx`

[Footer.tsx]: Global dark footer — search strip, five-column link grid, contact cards, socials and legal bar.

- **Runtime:** client (`"use client"`) — only because of the search input's local state.
- **Purpose:** Site-wide footer, rendered once in `app/layout.tsx` below `<main>`. Purely presentational; no data fetching.
- **Props:** none (default export `Footer`).
- **State & effects:** `searchValue: string` (`useState`), typed via `ChangeEvent<HTMLInputElement>` in the handler. No effects, timers, listeners or cleanup. `searchValue` is never submitted or read anywhere — the search strip is decorative for now.
- **Handlers:** only `onChange` on the search input. The four quick-tag `Button`s (`Courses`, `Services`, `Nearby Counsellor`, `Contact Us`) have **no `onClick`**; `READ MORE` has no handler and no `href`; every `Link` in Countries / Useful Links / socials / legal bar points to `"#"`.
- **Constants & types:** `countries: string[]` (8: Russia, Abroad, Uzbekistan, Kyrgyzstan, Georgia, India, Kazakhstan, Bangladesh); `usefulLinks: string[]` (Overview, Upcoming Event, Services, Admin Login); `searchTags: string[]` (same 4 tags as `searchbar.tsx`); `socials` array of `{ label, icon, href }` for Facebook / Instagram / Twitter / YouTube using `/home/footer-*.svg` with `href: "#"`. No local types.
- **Layout:** `lg:grid-cols-12` with column spans `3 / 2 / 2 / 3 / 2`. Three decorative background gradient layers behind a `max-w-350` content wrapper. Contact values are hard-coded: helpline `+91-9971944622, 011-40550609`, head office `806, KLJ Tower, Pitampura, Delhi - 110034`, mail `contact@mystudyhub.com`, plus an "International Office - Russia" address block.
- **Dependencies:** `react` (`useState`, `ChangeEvent` type), `next/link`, `next/image`, `lucide-react` (`Search`, `Phone`, `MapPin`, `Mail`, `ArrowRight`), `@/components/ui/Button`.
- **Consumers:** `app/layout.tsx` only.
- **Notes:** Uses `next/image` with explicit `width/height` for the four social SVGs (all assets verified present in `public/home/`). Fonts are set per-element with inline `fontFamily` (`'Frank Ruhl Libre', serif` for headings, `'Inter', sans-serif` for the search input) — both families are loaded in `app/globals.css`. Accessibility: `<footer>` landmark; the search input has a placeholder but no `<form>`, no `aria-label` and no submit path; icon-only phone/map/mail icons are decorative (no `aria-hidden`, but the adjacent text carries meaning). No legal pages exist for the footer links.

### `HeadingOfCard.tsx`

[HeadingOfCard.tsx]: Gradient section heading with optional normal-weight prefix and arbitrary JSX description.

- **Runtime:** shared / server-by-default (no directive). Imported by server pages and by the client-rendered `countries/countryCarousal` tree via children/import — it has no hooks, so it stays server-renderable.
- **Purpose:** Standard section title used across About, Services and Countries pages; renders a `<section>` wrapper with the brand gradient (`linear-gradient(169deg, #00923F 12.704%, #3163FF 87.17%)`) clipped to text.
- **Props:** `HeadingOfCardProps = { title: string; italic?: boolean; description?: JSX.Element; prefix?: string; type: "bold" | "normal" }`.
  - `type` is **required by the type** even though the destructuring supplies `type = "bold"` — callers must pass it.
  - `prefix` renders a normal-weight span before the title (e.g. `"Top Countries for "`); both prefix and title share the same gradient, since the gradient/`bg-clip-text` is on the `<h2>`.
  - `italic` toggles `italic`/`not-italic` only on the title span.
  - `description` is rendered raw after the `<h2>` (no wrapper element) and is typed `JSX.Element`, not `ReactNode` — a string or `null` will not type-check.
- **State & effects:** none.
- **Handlers:** none.
- **Internal helpers:** local `gradientStyle` object (Poppins family + gradient) and local `size = "text-3xl lg:text-[40px]"`.
- **Constants & types:** `HeadingOfCardProps` (exported).
- **Dependencies:** `react/jsx-runtime` (imports the `JSX` namespace only) — no `next/*`, no icon libs.
- **Consumers:** `components/about-us/page.tsx`, `app/(site)/about-us/services/page.tsx`, `components/countries/russianUni.tsx`, and `components/countries/countryCarousal.tsx` (relative `../ui/HeadingOfCard`). Usage is documented (not imported) in `components/about-us/HeadingOfCard.md` with prefix/italic/normal examples.
- **Notes:** Layout wrapper: `w-full px-6 sm:px-10 lg:px-20 xl:px-32 py-4 lg:py-10` + `max-w-300 mx-auto flex flex-col gap-2`. `type="normal"` swaps to `font-normal text-4xl lg:text-[50px]` while `type="bold"` uses `font-bold` + `size`. The `JSX` import from `react/jsx-runtime` is unconventional (prefer `React.ReactNode`/`ReactElement`) and couples the file to the automatic JSX runtime. No `id`/`aria-labelledby` hook, so it cannot be referenced by `aria-labelledby` on sections.

### `NavDropdown.tsx`

[NavDropdown.tsx]: Dropdown panel primitives and the three image+list menus used by the desktop navbar (About, Collections, Gallery).

- **Runtime:** client (`"use client"`) — required because the panels are conditionally rendered from `Navbar` state and receive hover callbacks.
- **Purpose:** Supplies `DropdownPanel` (positioned, blurred glass container) and `DropdownLayout` (image column + item list), then three ready-made menus built from them.
- **Exports:** `AboutDropdown`, `CollectionsDropdown`, `GalleryDropdown` (named components), plus types `DropdownPanelProps`, `DropdownLayoutProps`, `BaseDropdownProps`. `DropdownPanel` / `DropdownLayout` are internal (not exported).
- **Props:** all three dropdowns take `BaseDropdownProps = { onClose?: () => void; onEnter?: () => void; onLeave?: () => void }`.
  - `DropdownPanelProps` = `{ onEnter?, onLeave?, children: ReactNode }` — wires `onMouseEnter` / `onMouseLeave` on the panel `div`.
  - `DropdownLayoutProps` = `{ imageSrc: string; imageAlt: string; items: DropdownItemData[]; onClose?: () => void }`.
- **Menu contents (exact):**
  - About: Overview → `/about-us` (`Building2`), Our Services → `/about-us/services` (`ConciergeBell`), Career → `/about-us/career` (`BriefcaseBusiness`), Partner With Us → `/about-us/partner-with-us` (`Handshake`).
  - Collections: Blog → `/collections/blog` (`Newspaper`), Upcoming Events → `/collections/upcoming-event` (`CalendarDays`), Brochures → `/collections/brochures` (`BookOpen`), Web Stories → `/web-stories` (`Film`).
  - Gallery: Images → `/gallery/images` (`ImageIcon`), Videos → `/gallery/videos` (`Video`).
  - Every menu reuses the same image: `/home/about-graduation.png`.
- **State & effects:** none in this file (state lives in `Navbar`). No timers/listeners.
- **Handlers:** only the panel's `onMouseEnter`/`onMouseLeave` pass-through and each item's `onClick={onClose}` (closes the menu after navigation).
- **Constants & types:** item arrays are inline literals (not module constants); `DropdownItemData` is imported from `./dditems`.
- **Dependencies:** `next/image`, `next/link` (imported but **unused** — no `<Link>` in this file), `react` (`ReactNode`, `ComponentType`), `lucide-react` (10 icons + `LucideProps` type, which is also unused), `./dditems` (default `DropdownItem`), `./Navbar` (`bgColor`).
- **Consumers:** `components/ui/Navbar.tsx` only, imported as `./NavDropdown`.
- **Notes:** **Circular import:** `Navbar.tsx` imports `./NavDropdown`, and `NavDropdown.tsx` imports `bgColor` from `./Navbar` — the only cycle in `components/ui`; keep `bgColor` local if you ever split these files. Panel styling is almost entirely inline (`position:absolute`, `top:calc(100% + 10px)`, `left:50%`, `width:440`, `maxWidth:calc(100vw - 32px)`, `zIndex:9999`, `blur(24px) saturate(1.5)`, `borderRadius:18`), with `className="d-panel ${bgColor}"` where `bgColor = "bg-neutral-950/96"`. The entry animation `animation: "np-in 0.16s ease forwards"` and the `.d-panel`/`.nd-item` hover rules are defined by the `<style>` block injected in `Navbar.tsx` (this file re-injects the `.nd-item` rules, duplicated). The image column is `160px` wide with `minHeight: 220` for >2 items, otherwise `140`. Accessibility: the panel has `role="dialog"` but no `aria-modal`, no label, no Escape handling and no focus management — it is a hover/click menu only; items are real `Link`s so keyboard tabbing works once open.

### `Navbar.tsx`

[Navbar.tsx]: Fixed glass navbar with hover/click dropdowns (About, Collections, Countries mega-menu, Gallery), scroll-reactive background and a mobile drawer.

- **Runtime:** client (`"use client"`).
- **Purpose:** Global site header, mounted once in `app/layout.tsx`. Holds the logo, desktop link list, admin login + contact CTAs, the countries mega-menu with live search and college preview, and the mobile hamburger menu.
- **Props:** none (default export `Navbar`).
- **State & effects:**
  - `mobileOpen: boolean` — mobile drawer visibility; hamburger morphs into an X via inline `rotate(45deg)/rotate(-45deg)`.
  - `scrolled: boolean` — set by a `window` `scroll` listener (`window.scrollY > 20`), registered with `{ passive: true }` and removed on cleanup.
  - `activeDropdown: string | null` — which nav item's panel is open (`"about" | "collections" | "countries" | "gallery"`).
  - `navRef` — attached to `<nav>` but never read (reserved/no-op).
  - `dropTimer` (`useRef<NodeJS.Timeout | null>`) — the 150 ms hover-close delay; cleared by `openDrop`/`keepDrop` and on unmount.
  - Effect: on `pathname` change (`usePathname`) closes the dropdown and the mobile drawer (navigation resets the menu).
  - Child component `CountriesPanel` adds its own state: `searchQuery`, `searchFocused`, `hoveredCountry`, `searchWrapRef`, `clearTimer`; a `document` `mousedown` listener for outside-click (cleanup removes it), an effect that clears `hoveredCountry` when it no longer matches the filtered list, and an unmount cleanup for `clearTimer`. Hovering a country sets a 120 ms hide timer (`scheduleHide`), cancelled by `cancelHide` / `setCountry`.
  - Child component `FlagIcon` keeps `err: boolean` and falls back to an emoji tile when `next/image` fails.
- **Handlers:** `openDrop(name)` (clear timer + open), `closeDrop()` (150 ms delayed close), `keepDrop()` (cancel pending close, called from panel `onEnter`); desktop triggers toggle on click and open/close on item hover; hamburger toggles `mobileOpen`; mobile links and CTAs call `setMobileOpen(false)`; country rows open the right-hand preview on hover; search input has `onChange` plus an X button that clears the query (with `e.stopPropagation()` so the wrapper's focus handler does not refire).
- **Constants & types:**
  - `export const bgColor = "bg-neutral-950/96"` (imported by `NavDropdown`).
  - `export interface CountryItem { id, name, flag, colleges: string[], emoji? }` and `export interface NavLinkItem { label, href, dropKey: string | null }`.
  - `BASE_FLAG_URL = "https://flagcdn.com/w320"` — remote flags rendered through `next/image`; `flagcdn.com` is already allow-listed in `next.config.ts` (`images.remotePatterns`, `pathname: "/**"`).
  - `COUNTRIES_DATA: CountryItem[]` — 13 countries (Russia, India, China, Ukraine, Philippines, Bangladesh, Kyrgyzstan, Nepal, Georgia, Armenia, Uzbekistan, Kazakhstan, Tajikistan) each with 5 college names. `id` values run 1–8 then **10–14** (9 is missing), so `id` is a label, not an array index.
  - `NAV_LINKS` — Home `/`, About Us `/about-us` (`about`), Collections `/collections` (`collections`), Countries `/countries` (`countries`), Gallery `/gallery` (`gallery`), Contact Us `/contact-us` (`null`).
  - Local `ChevronDownIcon({ size = 20, color = "white" })` (inline SVG, `aria-hidden`); internal `CountriesPanel`, `FlagIcon`.
- **Dependencies:** `react` (`useState`, `useEffect`, `useRef`, plus a `MouseEvent` **type** import that shadows the DOM `MouseEvent` used in the outside-click listener — currently type-safe only because it is used in a union with `Event`), `next/navigation` (`usePathname`), `next/image`, `next/link`, `lucide-react` (`GraduationCap`, `Stethoscope`, `ChevronRight`, `Search`, `X`, `Globe`), `./NavDropdown`, `@/components/ui/Button`.
- **Consumers:** `app/layout.tsx` (site-wide) and `components/ui/NavDropdown.tsx` (imports `bgColor`).
- **Notes:**
  - Own styles are injected as a `<style>` tag inside the component: `.nb-link` underline animation, `@keyframes np-in` (dropdown entry), `@keyframes cd-col` (country preview entry), `.cd-scroll` scrollbar, `.nd-item` hover rules, `.nb-login`, `.nb-contact`, and `@keyframes nbMobileIn` (`.nb-mobile-menu`). Because these are global, the dropdown panels in `NavDropdown.tsx` depend on this file being mounted.
  - Layout: `header` is `fixed top-0 left-0 right-0 z-50 px-4 sm:px-5`; the `<nav>` pill uses `clamp()` sizing (`height: clamp(64px,5.21vw,100px)`, `borderRadius: clamp(40px,5.73vw,110px)`) and switches translucent background `rgba(0,0,0,0.2)` → `rgba(0,0,0,0.1)` when scrolled, plus `backdropFilter: blur(40px) saturate(2.4)`. Desktop links appear at `lg` (`hidden lg:flex`); the hamburger is `lg:hidden`.
  - Desktop CTAs: `Login → /admin/login` and `Contact Us → /contact-us`. **Route check:** the only admin routes in the repo are `app/admin/admin/login/page.tsx` and `app/admin/admin/(protected)/page.tsx`, so `/admin/login` has no matching page (dead link) — verify before wiring login flows.
  - Country links are generated as `/countries/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` → e.g. `/countries/mbbs-in-russia`, which **does** exist; the other 12 (`/countries/mbbs-in-india`, `/countries/mbbs-in-china`, …) have no route file. College links point at `/colleges/<slug>` and there is no `colleges` route or folder at all. Expect 404s until those routes are added.
  - Accessibility: nav links are real `<Link>`s; dropdown triggers are `Button variant="nav"` with `aria-haspopup="true"` and `aria-expanded={isOpen}`, but there is **no `aria-controls`**, no Escape-to-close, no click-outside close (only hover-leave/route change), no focus trap and no body scroll lock while the mobile drawer is open. The hamburger has `aria-label` and `aria-expanded`. Panels use `role="dialog"`; `CountriesPanel` adds `aria-label="Countries mega-menu"`, the search input has `aria-label="Search countries"`.
  - `CountriesPanel` preview: "See All Countries" → `/countries`; hovering a country lists its 5 `colleges` and an "Explore all colleges" deep link; empty state says `No results for “…”`. Hover-only previews are unreachable by keyboard.
  - `next/image` priority is set on the logo (`/study_ph_logo.png`, 221×46, display height `clamp(30px,2.4vw,46px)`).

### `PageBanner.tsx`

[PageBanner.tsx]: Full-height (`90vh`) hero banner with background image, dark gradient and centered title/subtitle.

- **Runtime:** client (`"use client"`) — although it has no state, hooks or handlers; the directive is unnecessary and could be dropped to render it on the server.
- **Purpose:** Uniform inner-page hero used by 12 route pages plus the About page component.
- **Props:** `PageBannerProps = { title: string; subtitle?: string; backgroundImage?: string; overlayOpacity?: number }` with defaults `backgroundImage = "/bd-doctor.jpg"`, `overlayOpacity = 0.5`.
  - The default image path **does not exist** in `public/` (only `public/bg-doctor.jpg` is present). Every current call site passes `backgroundImage` explicitly, so the broken default is latent; if you omit the prop you get a 404 image.
  - Observed call-site values: `/home/about-graduation.png` (`overlayOpacity` 0.5–0.6) and `/bg-doctor.jpg` (`0.5` and `0.9` on the countries index).
- **State & effects:** none. No scroll listeners, no parallax.
- **Handlers:** none.
- **Constants & types:** `PageBannerProps` (exported interface). Inline styles only.
- **Dependencies:** `next/image` only.
- **Consumers (verified):** `app/(site)/about-us/career/page.tsx`, `app/(site)/about-us/partner-with-us/page.tsx`, `app/(site)/about-us/services/page.tsx`, `app/(site)/collections/page.tsx`, `app/(site)/collections/blog/page.tsx`, `app/(site)/collections/brochures/page.tsx`, `app/(site)/collections/upcoming-event/page.tsx`, `app/(site)/countries/page.tsx`, `app/(site)/gallery/images/page.tsx`, `app/(site)/gallery/images/[slug]/page.tsx`, `app/(site)/gallery/videos/page.tsx`, `app/(site)/web-stories/page.tsx`, and `components/about-us/page.tsx` (re-exported by `app/(site)/about-us/page.tsx`).
- **Notes:** Structure: black base layer → image layer with `style={{ opacity: overlayOpacity }}` (`fill`, `object-cover object-center`, `priority`, `sizes="100vw"`, `alt=""` so it is decorative) → bottom-only gradient `linear-gradient(to bottom, transparent, black)` marked `aria-hidden` → centered content `z-10`. Title uses `clamp(30px, 3.9vw, 54px)` at `w-3/4` with a text shadow; subtitle uses `clamp(13px, 1.1vw, 18px)` capped at `680px`. `aria-label={`${title} banner`}` on the `<section>`. **No breadcrumbs** are implemented despite older docs claiming they are; there is also no `<h1>` duplication guard — pages must not render another `<h1>`.

### `carousal.tsx`

[carousal.tsx]: Generic sliding carousel that groups arbitrary children into slides and adds arrow/dot navigation.

- **Runtime:** client (`"use client"`).
- **Purpose:** Wraps a list of card children into `itemsPerSlide`-sized slides with a translateX track, prev/next buttons, dot indicators and optional autoplay. Used for the countries carousel on `/countries`.
- **Props:** local (non-exported) `interface CarouselProps { children: React.ReactNode[]; itemsPerSlide?: number; autoPlay?: boolean; autoPlayInterval?: number }`, defaults `itemsPerSlide = 1`, `autoPlay = false`, `autoPlayInterval = 4000`. `children` must be an **array** (`ReactNode[]`) — a single child or fragment will not type-check.
- **State & effects:** `currentIndex: number`, `isTransitioning: boolean`. `totalSlides = Math.ceil(children.length / itemsPerSlide)` computed on every render. `useEffect` starts `setInterval(goToNext, autoPlayInterval)` when `autoPlay` and clears it on cleanup; the effect re-runs whenever `goToNext` changes (i.e. after every transition toggle), resetting the interval.
- **Handlers:** `goToNext` / `goToPrev` are `useCallback`s gated by `isTransitioning`; they set the flag, advance with modulo wrap, then release it after a 500 ms `setTimeout` — **that timeout is never cleared on unmount**. Dot buttons set `currentIndex` directly under the same guard. Arrow buttons are disabled while transitioning.
- **Internal helpers / constants:** `left = "left-0 sm:left-2 top-1/2 "`, `right = "right-2 top-1/2 "` class-string constants; inline SVG chevrons inside `Button size="icon" variant="brand" shape="pill"`.
- **Dependencies:** `react` (`useState`, `useEffect`, `useCallback`), `@/components/ui/Button`, `@/lib/utils` (`cn`).
- **Consumers:** `components/countries/countryCarousal.tsx` only (`itemsPerSlide={4}`, `autoPlay`, `autoPlayInterval={5000}`, 6 country cards → 2 slides).
- **Notes:** The inner grid is hard-coded `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` and ignores `itemsPerSlide` — with `itemsPerSlide={4}` it lines up, but any other count produces a mismatched layout (a partial last slide also left-aligns). No swipe/drag, no keyboard arrow handling, no `aria-live`, no `role="region"`/`aria-roledescription="carousel"`; arrows have `aria-label="Previous"/"Next"` and dots `aria-label={`Go to slide ${idx+1}`}`. The 500 ms transition lock matches the 500 ms CSS transition, so a click at the exact boundary (or a re-render mid-transition) can overlap animations. Arrows/dots stay visible with a single slide.

### `curveCard.tsx`

[curveCard.tsx]: Image card with a floating pill label ("city card") that fades/slides in when scrolled into view.

- **Runtime:** client (`"use client"`).
- **Purpose:** Presentational location/country card used in the about-us national-presence grid and the countries carousel. Reveal-on-scroll via `IntersectionObserver`.
- **Props:** local `interface CurveCardProps { src: string; name: string; animationDelay?: number }` (default `0`).
- **Exports:** default `CurveCard`, and named `PinIcon` (inline SVG map pin, `16×20`, `fill="#0a0a0a"`, `aria-hidden`, `className="shrink-0"`).
- **State & effects:** `visible: boolean`; `ref = useRef<HTMLDivElement | null>(null)`. One effect creates an `IntersectionObserver` with `{ threshold: 0.15 }`, sets `visible` and **disconnects itself** on first intersection; cleanup also disconnects. The observer is never re-created (the effect has `[]` deps).
- **Handlers:** none in JS (hover styling is CSS-only).
- **Constants & types:** `animationDelay` is applied as an inline `transitionDelay` (`${animationDelay}ms`) so grids can stagger.
- **Dependencies:** `react` (`useEffect`, `useRef`, `useState`), `next/image`.
- **Consumers:** `components/about-us/NationalPresence.tsx` and `components/countries/countryCarousal.tsx`.
- **Notes:** Hidden state is `opacity-0 translate-y-7`, revealed is `opacity-100 translate-y-0` (classes are joined from an array, not `cn`), with `transition-[opacity,transform] duration-550`. Sizing uses Tailwind v4 fractional spacing: card `h-38`, image `h-33.75`, pill `top-29.5 h-8.5`, so sizes shift if the spacing scale changes. The image is `fill` + `unoptimized` with `sizes="(max-width:640px) 50vw, (max-width:1280px) 25vw, 320px"` and `alt={name}`. Hover effects (image `scale(1.03)`, pill background/shadow) come from a component-scoped `<style>` block with global `.city-card` selectors — **duplicate `.city-card` rules will collide if two versions of this card ever ship**. Font is inline `'Lexend', sans-serif` (loaded globally). `PinIcon` is not imported anywhere outside this file (`images/GalleryGrid.tsx` defines its own private `PinIcon`).

### `dditems.tsx`

[dditems.tsx]: One row of a nav dropdown — icon tile + label link with a gradient hover fill.

- **Runtime:** shared / server-by-default (no directive); consumed by the client `NavDropdown`.
- **Purpose:** Single presentational `Link` row used by every dropdown menu. Styling is almost entirely inline styles because the design was ported from Figma.
- **Props:** `DropdownItemData` = `{ href: string; icon: ComponentType<LucideProps>; label: string }`; `DropdownItemProps extends DropdownItemData` adds `onClose?: () => void`. Default export `DropdownItem({ href, icon: Icon, label, onClose })` renders `<Icon size={16} strokeWidth={1.8} />`.
- **State & effects:** none. No listeners.
- **Handlers:** `onClick={onClose}` on the `Link` (closes the parent menu after navigation).
- **Constants & types:** `DropdownItemData` and `DropdownItemProps` (both exported).
- **Dependencies:** `next/link`, `react` (`ComponentType`; `ReactNode` is imported but **unused**), `lucide-react` (`LucideProps` type; a default import of `LucideIcon` that is unused — `lucide-react` exposes `LucideIcon` as a named type, so use `import type { LucideIcon, LucideProps }` and drop the default).
- **Consumers:** `components/ui/NavDropdown.tsx` only (relative `./dditems`) — a grep for `components/ui/dditems` finds nothing.
- **Notes:** Fixed row geometry via inline styles: `height: 46`, `padding: "0 12px"`, `borderRadius: 11`, `gap: 12`, `fontSize: 14`, `background: rgba(255,255,255,0.07)`, `border: 1px solid rgba(255,255,255,0.1)`. The hover gradient is an absolutely-positioned `span.nd-grad` (`linear-gradient(147.53deg,#00923F 12.704%,#3163FF 87.17%)`, `opacity: 0`) revealed by CSS injected elsewhere (`Navbar.tsx` and `NavDropdown.tsx` both define `.nd-item:hover .nd-grad { opacity: 1 }`) — this file alone will not animate. Classes `nd-item group` are the only Tailwind hooks. Icons are decorative; the label provides the accessible name. Hard-coded `fontFamily: "'Inter',sans-serif"` despite the panel declaring Plus Jakarta Sans — visual inconsistency, not a bug.

### `eligibilityCard.tsx`

[eligibilityCard.tsx]: Small white pill card with a gradient-clipped icon + requirement text, used on the Russia steps section.

- **Runtime:** shared / server-by-default (no directive).
- **Purpose:** Renders one eligibility/step requirement row. Called as a **plain function** (`EligibilityCards(card)`) rather than JSX by its consumer.
- **Props:** `EligibilityCardProps = { key: number; img: LucideIcon; title: string }` — note `key` is used as a _normal prop_ here (shadowing React's reserved `key`); the consumer also uses `card.key` for its own `div` key.
- **State & effects:** none. No hooks at all — it is a pure function returning JSX.
- **Handlers:** none.
- **Constants & types:** `EligibilityCardProps` (exported); local `size = "6"` string used in `className={`h-${size} w-${size} ...`}`.
- **Dependencies:** `lucide-react` (`LucideIcon` type), `@/lib/constants` (`CARD_GRADIENTS`, a `linear-gradient(149.746deg, rgb(0,146,63) 12.704%, rgb(49,99,255) 87.17%)` string).
- **Consumers:** `components/countries/mbbs-russia/stepsSSMU.tsx` only (6 cards, icons `FileText`, `Camera`, `ClipboardCheck`; all six titles are the same placeholder string `"12th certificate with 50% marks in PCB"`).
- **Notes:** The dynamic classes `h-${size} w-${size}` cannot be statically detected by Tailwind, so the icon likely renders at its default size — replace with literal `h-6 w-6` when touching this file. Returns an unnecessary fragment wrapper; the outer `div` carries `key` which is meaningless outside a `.map`. Visuals: `backgroundColor:#ffffff`, `border:1px solid #e6eef8`, `borderRadius:16`, `gap:8`, `boxShadow: 0 1.5px 1.5px rgba(0,0,0,0.05)`, gradient text via `bg-clip-text`/`CARD_GRADIENTS`, icon tile `bg-brand-sky/20 p-2 rounded-xl ring-1`. `span` wrappers carry the gradient; text is `text-xs sm:text-sm`. No interactive elements, so no a11y surface beyond reading order.

### `form.tsx`

[form.tsx]: Static "Book Free Counselling" lead form card (visual only, no submission logic).

- **Runtime:** no directive → server-by-default, but it is rendered inside the client `components/homepage/ExpertCounsellingSection.tsx`, so it executes on the client there.
- **Purpose:** White rounded card with name/contact/location inputs, two labelled fields (Nearest Branch, Details/Message) and a gradient submit button. Purely presentational today.
- **Props:** `{ visible: boolean }` (inline type, no exported props type) — toggles the `visible` class used by the reveal animation.
- **State & effects:** none. All inputs are **uncontrolled**, with no `useState`, no `name`, no `id`, no `value`/`onChange`.
- **Handlers:** `onSubmit={(e) => e.preventDefault()}` on the `<form>` — the submit button (`type="submit"`, `variant="brand"`, `fullWidth`, `rightIcon` arrow) therefore does nothing. No validation, no fetch, no server action.
- **Internal functions/helpers:** none.
- **Constants & types:** none at module level; all field classes are repeated inline strings (a single local class string would remove ~8 duplicates).
- **Dependencies:** `@/components/ui/Button` only.
- **Consumers:** `components/homepage/ExpertCounsellingSection.tsx` (relative `../ui/form`), which imports it **twice** — `import Form from "../ui/form"` (never rendered) and `import FormCard from "../ui/form"` (rendered as `<FormCard visible={visible} />`). The stray `Form` import is dead.
- **Notes:** The reveal animation depends on CSS injected by the consumer: `.anim-form { opacity: 0 }` and `.anim-form.visible { animation: slideInBottom 1.4s … }` live in `ExpertCounsellingSection.tsx`'s `<style>`; rendering this card elsewhere leaves it at `opacity: 0`. Fields: First Name*, Last Name*, Phone Number* (`type="tel"`), Email Address* (`type="email"`), City*, State*, Nearest Branch (`<label>` **not** associated via `htmlFor`, input has only a placeholder), Details/Message (`<textarea rows={2}>`). Accessibility: required fields are marked with `*` only (no `required`, no `aria-required`), the first six inputs have no programmatic labels, and the two `<label>`s are not linked. The submit button's gradient is forced through inline `background` (`linear-gradient(90deg,#00923F 0%,#1e50d8 100%)`), overriding the `brand` variant. Responsive: two-column input grid from `sm`, card padding `p-5 sm:p-7 xl:p-8`.

### `infoCard.tsx`

[infoCard.tsx]: White numbered card (`01` + title, then body copy) with the number/title painted in the brand gradient.

- **Runtime:** shared / server-by-default (no directive, no hooks) — also rendered inside the client `EligibilitySection`.
- **Purpose:** Two-line info card used by the Russia page's eligibility grid and by the step scroller.
- **Props:** `InfoCardProps` (**exported**) = `{ lgw?: boolean; card: { number: string; title: string; description: React.ReactNode } }`. `lgw` defaults to `true`, which appends `lg:w-[calc(50%-12px)]` (a two-per-row card inside a `lg:flex-row lg:flex-wrap` parent); `lgw={false}` keeps it `w-full` (step scroller).
- **State & effects:** none.
- **Handlers:** none — no interactive elements.
- **Constants & types:** `InfoCardProps`; `CARD_GRADIENTS` from `@/lib/constants`. `React.ReactNode` is used without importing `React` (relies on the global `@types/react` namespace).
- **Dependencies:** `@/lib/constants` (`CARD_GRADIENTS` = `linear-gradient(149.746deg, rgb(0,146,63) 12.704%, rgb(49,99,255) 87.17%)`).
- **Consumers:** `components/countries/mbbs-russia/EligibilitySection.tsx` (default `lgw`) and `components/countries/mbbs-russia/stepSection.tsx` (`lgw={false}`). No others.
- **Notes:** Title `<p>` uses `fontSize: 0; lineHeight: 0` purely so `CARD_GRADIENTS` paints once across both spans (number 28/36/48px, title 15/19/24px, both `lineHeight: "normal"`); `background-clip: text` with transparent fill. `whiteSpace` was `nowrap`, which clipped long titles ("Post-Admission Support") once the step panel was narrowed to 560px — it is now `normal` so titles wrap; only restore `nowrap` if every caller guarantees ~280px+ of card width. Body copy is `#485f84`, 16px/24px DM Sans. Card box: `w-full`, `px-4 py-4 sm:px-6 lg:px-8`, `gap: 8`, white background, `1px solid #e6eef8`, radius 16, `0 1.5px 1.5px rgba(0,0,0,0.05)` shadow. Returns an unnecessary fragment wrapper. The leading space in callers' `title` strings is the only gap between the number and the title (there is no flex gap).

### `searchbar.tsx`

[searchbar.tsx]: Controlled/uncontrolled search field with quick-tag buttons and an optional clear affordance.

- **Runtime:** client (`"use client"`).
- **Purpose:** Reusable search input used by the homepage search section (with tags) and directly by `app/page.tsx`. Renders a form (Enter submits), a leading `Search` icon, optional clear button, and a row of quick tags.
- **Props:** `SearchBarProps` (local, **not exported**):
  - `color: string` (required) — applied as inline `backgroundColor` of the outer panel.
  - `onSearch?: (value: string) => void`; `className?: string` (default `""`, prepended raw to the wrapper class list, no `cn` merge).
  - `darkMode?: boolean` — tags become `text-white!`, else `text-[#222b3c]`.
  - `value?: string`; `onChange?: (event: ChangeEvent<HTMLInputElement>) => void` — parent-controlled mode.
  - `onFocus?: () => void`; `onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void`; `inputRef?: RefObject<HTMLInputElement | null>`.
  - `showTags?: boolean` (default `true`); `onClear?: () => void`; `iconClassName?: string` (default `"text-black"`); `inputClassName?: string` (default `"text-black placeholder:text-black"`).
- **State & effects:** `internalSearchValue: string`; effective value `value ?? internalSearchValue` (hybrid controlled/uncontrolled — when `value` is passed, the internal copy still updates on typing but is ignored). No effects, timers or listeners.
- **Handlers:** `handleSubmit()` trims and calls `onSearch` **only if non-empty**; form `onSubmit` prevents default then calls it (so Enter works). `onChange` sets internal state then forwards the event. Clear button renders only when `searchValue` is truthy **and** `onClear` is provided, is `type="button"`, `tabIndex={-1}`, `aria-label="Clear search"`, and does **not** clear the internal state itself — the parent must reset `value`/state. Tag buttons call `onSearch?.(tag)` directly (they do not go through `handleSubmit`).
- **Constants & types:** `searchTags = ["Courses", "Services", "Nearby Counsellor", "Contact Us"]` (module constant, duplicated in `Footer.tsx` and `app/page.tsx`).
- **Dependencies:** `react` (`useState`, types `ChangeEvent`, `KeyboardEvent`, `RefObject`), `lucide-react` (`Search`, `X`), `@/components/ui/Button`.
- **Consumers:** `app/page.tsx` (only `color="white"` + `className` — its local `searchValue`/`searchTags` are unused) and `components/homepage/SearchSection.tsx` (passes `value`, `onChange`, `onFocus`, `onKeyDown`, `onSearch`, `inputRef`, `darkMode`, `showTags`, `onClear`, `iconClassName`, `inputClassName` and `color="transparent"`).
- **Notes:** Wrapper classes: `w-[calc(100%-32px)] rounded-4.25 px-5 pt-7.5 pb-4 shadow-sm sm:px-19.25` — fractional utilities rely on Tailwind v4's dynamic spacing; `className` is concatenated before them so a caller cannot override those values with twMerge (plain string join, not `cn`). Submit is implicit (no visible submit button) — the form has no `role="search"` and the input has only a placeholder (`"Search For..."`), no `aria-label`. Tags are `Button variant="unstyled"` with `type="button"`. `darkMode` uses a `!` important suffix, which is Tailwind v4 syntax.

### `threeDCarousel.tsx`

[threeDCarousel.tsx]: Generic flat carousel — the reusable extraction of the homepage testimonials carousel's transform maths, card shell and controls, with a render-prop body.

- **Runtime:** client (`"use client"`). Exports default `ThreeDCarousel` and a named `ThreeDCarousel`; types `ThreeDCarouselProps<T>` and `ThreeDCarouselItemState` are exported.
- **Purpose:** Reusable carousel for any card content. It owns the perspective scene, the preserve-3d rotator, active/inactive card styling, arrows, dots, keyboard and swipe handling; the caller only renders card contents through `renderItem(item, { index, isActive, total })`.
- **Props:** `ThreeDCarouselProps<T>`:
  - Required: `items: readonly T[]`, `renderItem`.
  - Indexing: `getItemKey?: (item, index) => Key` (falls back to the array index), `defaultIndex = 0`, `onIndexChange?: (normalizedIndex, item) => void`.
  - Behaviour: `loop = true`, `clickToFocus = true`, `keyboardNavigation = true`, `swipeNavigation = true`, `swipeThreshold = 40`.
  - Geometry: `cardWidth = 360`, `cardHeight = 450`, `sceneHeight = cardHeight + 20`, `radius?` (explicit px override), `minRadius = 340`, `radiusPadding = 50`, `perspective = 1400`.
  - Motion/style: `transitionDuration = 800`, `easing = "cubic-bezier(0.25, 1, 0.5, 1)"`, `inactiveOpacity = 0.35`, `inactiveScale = 0.82`, `activeScale = 1`, `cardRadius = 28`, `showDecorations = true`.
  - Controls: `showControls = true`, `showDots = true`, `previousLabel = "Previous"`, `nextLabel = "Next"`, `regionLabel = "Carousel"`, `dotsLabel = "Choose slide"`, `getDotLabel`, `getSlideLabel`, `announceSlide = true`.
  - Styling escapes: `className`, `sceneClassName`, `rotatorClassName`, `itemClassName`, `cardClassName`, `controlsClassName`, `dotsClassName`, plus `sceneStyle`, `rotatorStyle`, `itemStyle`, `cardStyle` (inline overrides win over defaults), and `emptyState`.
- **State & effects:** `rawIndex` is an **unbounded** signed counter (never wrapped) so repeatedly pressing next/prev keeps rotating in the same direction; `activeIndex = ((rawIndex % total) + total) % total`. `measuredWidth` is the rotator's `clientWidth` tracked by a `ResizeObserver` effect (re-created on `total` change); `clientWidth` is used deliberately because `getBoundingClientRect()` would include the 3D rotation. Reduced motion comes from `useSyncExternalStore` over `matchMedia("(prefers-reduced-motion: reduce)")` (server snapshot `false`); when true all transitions become `none`. A `touchStart` ref stores the initial touch point. No timers, no autoplay, no window scroll listeners.
- **Handlers / navigation:** `goNext`/`goPrev` add ±1 to `rawIndex` (blocked at the ends when `loop=false`); `goTo(index)` uses the shortest signed delta for looping carousels (so dot/card clicks can rotate several cards in one 800 ms turn) and clamps when `loop=false`; clicking a non-active card calls `goTo(index)`; dot clicks call `goTo(i)`. Arrow keys Left/Right and Home/End are handled on the carousel region (skipped for inputs, textareas, selects, textboxes and contenteditable targets); a horizontal touch swipe over 40 px with `|dx| > |dy|` advances/rewinds. `onIndexChange` fires with the normalised index and the target item.
- **Transform maths (matches `TestimonialsSection.tsx`):** `angle = 360 / total`; `radius = max(minRadius, round(cardWidth / 2 / sin(PI / max(total, 3))) + radiusPadding)`; rotator `transform: translateZ(-radius) rotateY(rawIndex * -angle)`; each card `rotateY(index * angle) translateZ(radius)`. Scene: `perspective: 1400px`, `height: 470px`; rotator: `width: min(cardWidth px, 85vw, 100%)`, `height: 450px`, `transform-style: preserve-3d`, `transition: transform 800ms cubic-bezier(0.25, 1, 0.5, 1)`. Items: absolute top/left, `preserve-3d`, `transition: all 800ms` same easing, active opacity `1` / inactive `0.35`. Card: radius `28`, gradient `linear-gradient(135deg, #00923F 0%, #1a6fd4 55%, #3163FF 100%)`, active shadow `0 40px 100px rgba(0,146,63,0.3), 0 20px 60px rgba(49,99,255,0.3), 0 0 0 1px rgba(255,255,255,0.12)` vs inactive `0 10px 30px rgba(0,0,0,0.1)`, active `scale(1)` vs inactive `scale(0.82)` with `transform 800ms ease, box-shadow 800ms ease`.
- **Controls:** dots are `Button variant="unstyled" size="icon"` (active `28×8` `#00923F`, inactive `8×8` `rgba(0,146,63,0.3)`, 300 ms, `shrink-0`, horizontally scrollable container); arrows are 48 px `Button variant="brand" size="icon"` with the `linear-gradient(135deg, #00923F, #3163FF)` background, green/blue glow shadows and `hover:scale-110 active:scale-95`; arrows are disabled at the ends when `loop=false` and for a single item.
- **Accessibility:** outer `role="region"`, `aria-roledescription="carousel"`, `aria-label={regionLabel}`, focusable when keyboard navigation is on; each card is `role="group"` + `aria-roledescription="slide"` + `aria-label={getSlideLabel(...)}` and the active one gets `aria-current="true"`; an `sr-only` `aria-live="polite"` line announces `Slide X of N`; every icon-only control passes an `aria-label`; `prefers-reduced-motion` disables transitions. Unlike the original testimonials code it also supports keyboard + swipe.
- **Dependencies:** `react` (`useEffect`, `useRef`, `useState`, `useSyncExternalStore`, types `CSSProperties`, `KeyboardEvent`, `Key`, `ReactNode`, `TouchEvent`), `@/components/ui/Button`, `@/lib/utils` (`cn`).
- **Consumers:** `components/homepage/TestimonialsSection.tsx` (items = 6 testimonials, `getItemKey`, `renderItem` with `TestimonialCard`, `regionLabel="Student testimonials"` and a custom `getSlideLabel`). That page overrides the geometry to `cardWidth={400}`, `cardHeight={420}` (scene `440`, ring radius `450` at desktop); the component defaults stay `360×450` / scene `470`.
- **Notes:** Deliberate differences from the original inline implementation: cards use a flat horizontal track, active cards have no vertical item padding while inactive cards retain `py-6`, and `loop`, control visibility, labels, geometry and card chrome are configurable; keyboard, swipe, live-region and reduced-motion support are new. The card shell (gradient and radius/shadows) is applied by default; pass `cardStyle`/`cardClassName` for a different look. `renderItem` should fill the card. Because inline styles beat utility classes, visual overrides must go through the `*Style` props. No autoplay.

## Cross-file notes

- **Brand tokens:** most gradients in this folder hard-code `#00923F`/`#3163FF` (and `#00b4d8`, `#061833`) rather than using the `--color-brand-*` tokens from `app/globals.css`. `Button` is the main consumer of the `brand-*` utilities; only a few other spots use them (e.g. `eligibilityCard`'s `bg-brand-sky/20 text-brand-navy`).
- **Import graph inside the folder:** `Navbar → NavDropdown → (dditems, Navbar.bgColor)`; `Faq`, `Footer`, `form`, `searchbar`, `carousal`, `threeDCarousel` → `Button`; `threeDCarousel` also imports `cn`. `curveCard` and `eligibilityCard` are leaves. The only cycle is `Navbar ↔ NavDropdown`.
- **Styling split:** `Button`, `Faq`, `carousal` are Tailwind-first; `Navbar`, `NavDropdown`, `dditems`, `HeadingOfCard`, `eligibilityCard`, `curveCard`, `PageBanner`, `threeDCarousel` mix Tailwind with large inline `style` objects; several files inject global CSS through `<style>` (`Navbar`, `NavDropdown`, `curveCard`). Inline styles win over utility classes, so `className` overrides will silently fail on those elements.
- **"use client" audit:** 8 of 15 files here have the directive (`Faq`, `Footer`, `Navbar`, `NavDropdown`, `PageBanner`, `carousal`, `curveCard`, `threeDCarousel`); `form` is client-by-inheritance via its only consumer. `Button`, `HeadingOfCard`, `dditems`, `eligibilityCard` and `infoCard` are shared. `PageBanner` is marked client but uses no hooks — it can be converted to a server component safely.
- **Dead or unused today:** `ButtonLink` (no importers), `Button` variants `link`/`destructive`, `Navbar.navRef`, `NavDropdown`'s `next/link`, `ComponentType` and `LucideProps` imports, `dditems`' `ReactNode` + default `LucideIcon` imports, `form`'s duplicate `Form` import in `ExpertCounsellingSection`, and `PageBanner`'s default `"/bd-doctor.jpg"` (asset missing).

## Maintenance notes

- This file is hand-maintained as a per-file reference. The repository's `npm run graph` / `npm run graph:check` scripts point at `tools/graph.mjs`, which is **not present** in the checkout, so those scripts cannot currently regenerate the `[File]: … / Runtime / Dependencies / Consumers` blocks that older versions of this file contained. Update this document by hand when adding or removing a file in `components/ui`.
- Older revisions of this file referenced `components/common/...` paths. That folder no longer exists — everything moved to `components/ui/`. Any `components/common/*` path in other `AGENT_CONTEXT.md` files (e.g. `app/(site)/AGENT_CONTEXT.md`) is stale.
