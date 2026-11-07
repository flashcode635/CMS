# Directory: app
Primary Purpose: Next.js 16 App Router root. Holds the root document layout
(fonts + `globals.css`), public site pages/layout, auth pages/API handlers, and
the admin route. Navbar/Footer are scoped to `app/(site)/layout.tsx`.

## Files

### `layout.tsx` (root layout — applies to every route)
[layout.tsx]: Root document layout: loads Geist fonts via `next/font/google`,
imports `globals.css`, and renders route children without site chrome.

- **Route:** layout — applies to `/`, all `(site)` pages, and `/admin/admin` + `/admin/admin/login`.
- **Runtime:** server component (no `"use client"`); no `export const dynamic` / `revalidate` / `runtime`.
- **Metadata:** `export const metadata = { title: "StudyPalace", description: "Learn smarter with StudyPalace" }`. No `metadataBase`, no `title.template`, no `robots`. Any page that does not export its own metadata (e.g. `/`, `/countries`) inherits exactly this title and description — the site's own brand spelling is inconsistent (`StudyPalace` here vs `Study Palace Hub` on child pages).
- **Renders:** `<html lang="en" className={\`${geistSans.variable} ${geistMono.variable} h-full antialiased scrollbar-thin\`}>` → `<body className="min-h-full w-full flex flex-col scrollbar-thin">` → `<Navbar />` → `<main className="flex flex-col flex-1 relative">{children}</main>` → `<Footer />`.
- **Data / functions:** `export default function RootLayout({ children }: any)`. Fonts: `Geist({ variable: "--font-geist-sans", subsets: ["latin"] })` and `Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })`. Both CSS variables are injected on `<html>` but are **not referenced** by `globals.css` (which sets `--font-sans: "Inter", …`), so Geist is downloaded but effectively unused. No data fetching, no redirect, no `notFound()`.
- **Auth:** none at this level. Admin pages are rendered inside this public shell.
- **Dependencies:** `next/font/google`, `./globals.css`, `@/components/ui/Navbar` (client), `@/components/ui/Footer` (client). All paths verified to exist (the previous version of this doc listed `components/common/*`, which is stale — `components/common` does not exist).
- **Consumers / navigation:** wraps every route; not imported by any page.
- **Notes:**
  - The file comment forbids `@import url(...)` inside `<style>` tags, yet `globals.css` line 1 `@import`s nine Google font families — the render-blocking request the comment warns about.
  - `<main className="… relative">` is the positioning context for the homepage's absolutely positioned `SearchBar` (`top-123 left-1/2`).
  - Navbar/Footer are scoped to `app/(site)/layout.tsx`, so auth and admin pages stay free of public site chrome.

### `page.tsx` (`/`)
[page.tsx]: Homepage: a single `"use client"` component that stacks 18 homepage sections plus an absolutely positioned search bar on a `#e8f0f9` background.

- **Route:** `/` (homepage at `app/(site)/page.tsx`; the route group contributes no URL segment).
- **Runtime:** `"use client"` — the whole page (and every imported section) is a client boundary. No `dynamic`/`revalidate` export (not allowed together with client metadata anyway).
- **Metadata:** none in this file → inherits root layout's `StudyPalace` / `Learn smarter with StudyPalace`. SEO for the homepage is therefore the root defaults only.
- **Renders (in DOM order):**
  1. `<HeroBanner />` (no props) — full-viewport hero.
  2. `<SearchBar color="white" className="absolute max-w-224.25 -translate-x-1/2 rounded-xl top-123 left-1/2 z-20" />` — imported as `{ SearchBar }` from `@/components/ui/searchbar`; positioned over the hero using arbitrary spacing values (`max-w-224.25` = 897px, `top-123` = 492px), i.e. magic numbers tuned to the hero height.
  3. `<PartnersMarquee />` (default import from `components/homepage/Marquee.tsx`; the component name differs from the file name).
  4. `<OurStrength />`
  5. `<MBBSAbroadHero />`
  6. `<BigNewsSection />`
  7. `<AmbassadorSection />`
  8. `<TestimonialsSection />`
  9. `<AboutSection />`
  10. `<PersonalisedServices />`
  11. `<GloballyRecognizedUniversities />`
  12. `<SearchSection />` — inline comment `{/*PX TO VW VALUE CHANGE KRNI HAI*/}` (pending px→vw conversion).
  13. `<LatestBlogs />` — same comment.
  14. `<MBBSAbroad />` — same comment.
  15. `<MeetOurTeam />`
  16. `<ExpertCounsellingSection type="flight" />` — the only section receiving a prop; `type` is `"flight" | "location"`.
  17. `<FreshersPartyHighlights />`
  18. `<EnrollNowSection />`
  19. `<MBBSCountries />` — imported 5th but rendered last (world map with pins).
  - Commented-out `<MBBSHeroSection/>` at the top (component not imported, so nothing to restore blindly).
- **Data / functions:** `export default function Home()`. Local state `const [searchValue, setSearchValue] = useState<string>("")` is declared but **never read or passed** — `SearchBar` keeps its own internal state. `searchTags` (line 24) is unused, and `ChangeEvent` is imported but unused. No fetch, no redirect, no route params.
- **Auth:** none.
- **Dependencies:** 18 components under `@/components/homepage/*` (`HeroBanner`, `Marquee`, `MBBSCountries`, `MBBSAbroadHero`, `OurStrength`, `BigNewsSection`, `AmbassadorSection`, `TestimonialsSection`, `AboutSection`, `PersonalisedServices`, `GloballyRecognizedUniversities`, `SearchSection`, `LatestBlogs`, `MBBSAbroad`, `MeetOurTeam`, `ExpertCounsellingSection`, `FreshersPartyHighlights`, `EnrollNowSection`), `@/components/ui/searchbar`, `react`. All homepage sections are `"use client"`; most images are local `/home/*` assets, with a few `images.unsplash.com` URLs (`MBBSAbroad`, `SearchSection`) — both hosts are allow-listed in `next.config.ts`.
- **Consumers / navigation:** linked from the Navbar ("Home") and the site logo. Not imported anywhere.
- **Notes:**
  - Page background is set twice: `style={{ backgroundColor: "#e8f0f9" }}` on the wrapper and `body { background-color:#e8f0f9 }` in `globals.css`.
  - Client-rendering the entire homepage means the metadata story and bundle size are the main constraints here; adding `metadata` to this file will fail the build unless the page is split into a server wrapper + client child.
  - `MBBSCountries` at the very bottom duplicates the map/countries content already shown by `MBBSAbroadHero`/`MBBSAbroad`.

### `globals.css`
[globals.css]: Global stylesheet: Tailwind v4 entry (`@import "tailwindcss"`), brand color/font design tokens via `@theme`, a Google Fonts `@import`, the body background, and custom scrollbar rules.

- **Route:** globals (no URL); imported only by `app/layout.tsx` (`import "./globals.css"`). Loaded on every route, admin included.
- **Runtime:** plain CSS processed by `@tailwindcss/postcss` (`postcss.config.mjs`); no client/server semantics.
- **Metadata:** n/a.
- **Defines:**
  - Line 1: `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display…&family=Inter:wght@400;500;600;700;800…&display=swap')` — 9 families: DM Serif Display, DM Sans, Frank Ruhl Libre, Inter, Lexend, Plus Jakarta Sans, Playfair Display, Poppins, Roboto.
  - `@theme`: `--color-brand-green:#00923F`, `--color-brand-blue:#3163FF`, `--color-brand-royal:#0039ea`, `--color-brand-navy:#0028a5`, `--color-brand-sky:#bacbff`, `--color-brand-cyan:#00b4d8`, `--font-sans:"Inter", ui-sans-serif, system-ui, sans-serif`. These generate the site's brand color utilities.
  - `body { background-color:#e8f0f9 }` — the site-wide pale blue behind every page that does not set its own background.
  - `html { scrollbar-width: thin; scrollbar-color:#000 #fff }`, `html::-webkit-scrollbar{width:6px}`, track `#fff`, thumb `#000` with `border-radius:9999px`.
- **Data / functions:** none.
- **Auth:** n/a.
- **Dependencies:** `tailwindcss` v4; third-party `fonts.googleapis.com` at runtime.
- **Consumers:** `app/layout.tsx` only.
- **Notes:**
  - There is **no** `.admin-root` rule here even though `app/admin/admin/layout.tsx` puts `className="admin-root"` on its wrapper — that class currently does nothing.
  - `--font-sans` is Inter, while `layout.tsx` loads Geist; the Geist variables (`--font-geist-sans`/`--font-geist-mono`) are unused, and no component references `font-geist`.
  - Components frequently set fonts inline (`fontFamily: "'Lexend', sans-serif"`, `"'Poppins'"`, `"'Inter'"`, etc.), so the `@import` list must stay in sync with those names.

## Route inventory (20 routes, 3 layouts, 1 stylesheet)
| URL | File | Runtime |
| --- | --- | --- |
| `/` | `app/(site)/page.tsx` | client |
| `/about-us` | `app/(site)/about-us/page.tsx` (re-export) | server |
| `/about-us/career` | `app/(site)/about-us/career/page.tsx` | server |
| `/about-us/partner-with-us` | `app/(site)/about-us/partner-with-us/page.tsx` | server |
| `/about-us/services` | `app/(site)/about-us/services/page.tsx` | server |
| `/collections` | `app/(site)/collections/page.tsx` | server |
| `/collections/blog` | `app/(site)/collections/blog/page.tsx` | server |
| `/collections/blog/[slug]` | `app/(site)/collections/blog/[slug]/page.tsx` | server |
| `/collections/brochures` | `app/(site)/collections/brochures/page.tsx` | server (async) |
| `/collections/upcoming-event` | `app/(site)/collections/upcoming-event/page.tsx` | server |
| `/contact-us` | `app/(site)/contact-us/page.tsx` | server |
| `/countries` | `app/(site)/countries/page.tsx` | server |
| `/countries/mbbs-in-russia` | `app/(site)/countries/mbbs-in-russia/page.tsx` | server |
| `/gallery` | `app/(site)/gallery/page.tsx` | server (redirect) |
| `/gallery/images` | `app/(site)/gallery/images/page.tsx` | server |
| `/gallery/images/[slug]` | `app/(site)/gallery/images/[slug]/page.tsx` | server (async) |
| `/gallery/videos` | `app/(site)/gallery/videos/page.tsx` | server |
| `/web-stories` | `app/(site)/web-stories/page.tsx` | server |
| `/admin/admin` | `app/admin/admin/(protected)/page.tsx` | server, `force-dynamic` |
| `/admin/admin/login` | `app/admin/admin/login/page.tsx` | server, `force-dynamic` |

## Cross-cutting gaps (verified in source)
- Auth route handlers live under `app/api/auth/`; the shared client form is `components/auth/AuthForm.tsx`.
- **`/admin` is not a route.** Only `app/admin/admin/**` exists; `app/admin/` has no `page.tsx`. `app/admin/admin/login/page.tsx` redirects an already-logged-in admin to `/admin` → 404. The Navbar links to `/admin/login` (also 404); the real login URL is `/admin/admin/login`.
- **No route-level safety net.** No `app/not-found.tsx`, `app/error.tsx`, `app/loading.tsx`, `app/global-error.tsx`, `robots.ts` or `sitemap.ts`.
- **`notFound()` is never called** anywhere under `app/`; dynamic segments render for any slug.
- **Admin is isolated** from the public chrome: Navbar/Footer live in `app/(site)/layout.tsx`.
- Only three files export `dynamic`: the two admin pages and the protected layout (`force-dynamic`). No `revalidate` or `runtime` exports exist.
