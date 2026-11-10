# Directory: components

Primary Purpose: All React UI for the site, grouped one folder per feature/route plus `ui/` for shared primitives. Route files under `app/` are thin: they set metadata, compose section components from here, and (in one case) re-export a page component.

## Structure

The folder has **no code files of its own** — only this document — and 17 sub-folders holding **88 `.tsx` files** (16 top-level folders, plus the nested `countries/mbbs-russia`). Each sub-folder has its own `AGENT_CONTEXT.md`; read the one for the folder you will touch before editing.

```
components/
├── about-us/          10 files
├── admin/              1
├── auth/               1
├── blog-details/       9
├── blogs/              1
├── brochures/          2
├── career/             3
├── cms/                6  (+ AGENT_CONTEXT)
├── collections/        2
├── contact-us/         1
├── countries/          3  (+ mbbs-russia/ 7)
├── homepage/          20
├── images/             4
├── partner-with-us/    6
├── services/           2
├── ui/                13
├── videos/             1
└── web-stories/        2
```

## Sub-folder responsibilities

- **`about-us/`** — everything on `/about-us`: banner, intro text/image, mission/core values, quote banner, national presence (city cards), location map, contact section, FAQ (`lastsection.tsx`, exported as `FaqSection`). **Exception to the route convention:** it also contains `page.tsx`, a full page component (`AboutUsPage` + `metadata`) that `app/(site)/about-us/page.tsx` simply re-exports (`export { default, metadata } from "@/components/about-us/page"`). Also contains `HeadingOfCard.md`, a design/usage note for the shared heading (not code, not imported). 3 of 10 files are client components.
- **`admin/`** — admin-only `LoginForm.tsx`, consumed by `/admin/login`.
- **`auth/`** — shared public login/signup UI: `AuthForm.tsx`, consumed by `/login` and `/signup`.
- **`blog-details/`** — the article page composition for `/collections/blog/[slug]`: `BlogHero`, `BlogContent`, `TableOfContents`, `AuthorCard`, `TagsList`, `ShareBar`, `RelatedBlogs`, `NewsletterCTA`, plus a reusable `BlogCard`. 4/9 client.
- **`blogs/`** — blog listing: `BlogsGrid.tsx` only (client).
- **`brochures/`** — brochure listing: `BrochuresIntro.tsx` and `BrochuresGrid.tsx` (filtering, pagination, download tiles). 2/2 client.
- **`career/`** — career page: `WelcomeBanner`, `RecruitmentGrid`, `JoinTeamSection`. 2/3 client.
- **`cms/`** — in-app CMS authoring UI for `/admin/dashboard` (has its own `AGENT_CONTEXT.md`): `sectionOptions.ts` (type registry mirroring the university page layout), `sectionEditor.tsx` (the "Page sections" card: add/reorder/toggle typed sections), `univLayoutPreview.tsx` (FE preview composing the real university section components), `previewSection.tsx` (live-route preview), `template.tsx`/`smallerComponents.tsx`. All client or pure data — no DB access.
- **`collections/`** — the events/collections index: `PreviousEventsSection`, `UpcomingEventsGrid`. 2/2 client.
- **`contact-us/`** — only `ContactHeroBanner.tsx` (no client directive). The actual contact form section lives in `about-us/ContactSection.tsx` and is reused by the contact page; if you are editing "the contact page form", edit **`components/about-us/ContactSection.tsx`**.
- **`countries/`** — country index and Russia page: `countryCarousal.tsx` (wraps `ui/carousal` + `ui/curveCard`), `russianUni.tsx` (heading only), `collegeCards.tsx`, and the nested **`countries/mbbs-russia/`** folder: `RussiaBanner`, `CountryIntro`, `WhyRussia`, `EligibilitySection`, `ssmuDurations`, `durationSection`, `stepsSSMU`. Only 1 of the 3 top-level files is client; 4/7 in `mbbs-russia`. Russia is the only country with a dedicated sub-folder so far — follow that layout when adding another country page.
- **`homepage/`** — the largest folder (20 files) and the only one that feeds the root route: `app/page.tsx` composes `HeroBanner`, `Marquee` (as `PartnersMarquee`), `OurStrength`, `MBBSAbroadHero`, `BigNewsSection`, `AmbassadorSection`, `TestimonialsSection`, `AboutSection`, `PersonalisedServices`, `GloballyRecognizedUniversities`, `SearchSection`, `LatestBlogs`, `MBBSAbroad`, `MeetOurTeam`, `ExpertCounsellingSection` (with `type="flight"`), `FreshersPartyHighlights`, `EnrollNowSection`, `MBBSCountries`, and renders `ui/searchbar` directly between the hero and `OurStrength`. Also holds `univCard.tsx` and `MBBSHeroSection.tsx`, which is imported by `app/page.tsx` but only referenced in a commented-out line. 19/20 client — the most interactive folder.
- **`images/`** — event/gallery UI: `GalleryGrid`, `EventGalleryGrid`, `EventDescription`, and `EventContactForm` (a reusable enquiry form that is also mounted on non-gallery pages). 4/4 client.
- **`partner-with-us/`** — B2B partner page: `WhyPartnerWithUs`, `PartnershipScope`, `PartnerBenefits`, `BenefitsGallery`, `ExclusiveUniversities`, `PartnerContactSection`. 2/6 client.
- **`services/`** — `/about-us/services`: `ServicesGrid` + `AdmissionProcess`. 2/2 client.
- **`ui/`** — the shared layer: `Button` (+ `ButtonLink`), `Navbar`, `NavDropdown`, `dditems`, `Footer`, `PageBanner`, `HeadingOfCard`, `carousal`, `curveCard`, `eligibilityCard`, `form`, `searchbar`, `Faq`. 8/13 client. See `components/ui/AGENT_CONTEXT.md` for per-file detail.
- **`videos/`** — `VideoGrid.tsx` for `/gallery/videos` (client).
- **`web-stories/`** — `WebStoriesViewer.tsx` (dark tray+viewer: story list + autoplay full-bleed story with progress bars) and `WebStoriesCarousel.tsx` (single-card slider) for `/web-stories`. Both client, both render the same `WEB_STORIES` array (exported from the carousel file). 2/2 client.

## Naming and export conventions

- **Files are PascalCase** (`ContactSection.tsx`, `BlogsGrid.tsx`, `PageBanner.tsx`). Exceptions that predate the convention — do not copy them for new files: `lastsection.tsx`, `page.tsx`, `carousal.tsx` (spelled with an "a"), `curveCard.tsx`, `dditems.tsx`, `eligibilityCard.tsx`, `form.tsx`, `searchbar.tsx`, `collegeCards.tsx`, `countryCarousal.tsx`, `russianUni.tsx`, `univCard.tsx`, `stepsSSMU.tsx`, `ssmuDurations.tsx`, `durationSection.tsx`.
- **One exported section component per file, default export** in almost all cases (`export default function X`). Named exports are used when a file shares a type or helper with another file (`SearchBar`, `EligibilityCards`, `CountryCarousal`, `RussianUni`, `PinIcon`, `bgColor`, `buttonVariants`, `Peck`, `UnivCardProps`).
- **Route-shaped placement:** `app/(site)/<route>/page.tsx` imports `components/<feature>/...`; the rare page component kept inside `components/` (`about-us/page.tsx`) is exported unchanged by the route file so metadata lives with the page.
- **Import style:** `@/components/<folder>/<File>` (the `@/*` alias maps to the repo root in `tsconfig.json`). A handful of legacy relative imports remain (`../homepage/MeetOurTeam`, `../ui/form`, `./NavDropdown`, `../about-us/LocationMap`) — prefer the alias for new code.
- **Types live next to their component** and are exported only when another file needs them (`FaqItem`, `PageBannerProps`, `CurveCardProps` is *not* exported, `UnivCardProps`/`Peck` are).

## Runtime conventions

- `"use client"` is added only where hooks, event handlers or browser APIs are used: **59 of 88 files** are client components. Per folder: homepage 19/20, admin 2/2, brochures 2/2, collections 2/2, services 2/2, images 4/4, blogs 1/1, videos 1/1, web-stories 2/2, ui 8/13, blog-details 4/9, mbbs-russia 4/7, about-us 3/10, career 2/3, partner-with-us 2/6, countries 1/3, contact-us 0/1.
- Directives are occasionally unnecessary rather than missing (`ui/PageBanner.tsx` has no hooks yet is marked client; `ui/form.tsx` has no directive and relies on its client parent).
- No module-level mutable state anywhere in `components/` (per `AGENTS.md` §3) except string constants and data arrays.
- Several components inject global CSS through `<style>` tags (`ui/Navbar`, `ui/NavDropdown`, `ui/curveCard`, `homepage/ExpertCounsellingSection`). These rules are process-global once mounted — scope selectors with a unique class prefix when adding one.

## Shared and cross-feature components (verified with grep)

`components/ui/*` is the one folder imported by **every** feature folder: **36 files** import `Button`; `PageBanner` is imported directly by 12 route pages and by `about-us/page.tsx` (so 13 routes render it — `contact-us` and `mbbs-in-russia` use their own heroes); `HeadingOfCard`, `searchbar`, `carousal`, `curveCard`, `form`, `eligibilityCard` each have 1–4 consumers. Feature folders otherwise stay self-contained, with these verified exceptions:

| Import | From | Why |
| --- | --- | --- |
| `components/about-us/ContactSection` | `app/(site)/contact-us/page.tsx`, `components/about-us/page.tsx` | one contact form shared by About and Contact |
| `components/about-us/LocationMap` | `components/homepage/ExpertCounsellingSection.tsx` | map reused inside the homepage counselling block |
| `components/about-us/lastsection` (`FaqSection`) | `app/(site)/about-us/page.tsx`, `app/(site)/about-us/services/page.tsx` | shared FAQ — `components/ui/Faq.tsx` is a separate, simpler accordion used only on the Russia page |
| `components/homepage/ExpertCounsellingSection`, `components/homepage/MeetOurTeam` | `components/about-us/page.tsx` | homepage sections reused on About |
| `components/homepage/univCard` | `components/partner-with-us/ExclusiveUniversities.tsx` | university tile reused on Partner With Us |
| `components/homepage/GloballyRecognizedUniversities` (types `Peck`, `UnivCardProps`) | `components/homepage/univCard.tsx` | type/helper sharing inside the folder |
| `components/images/EventContactForm` | `app/(site)/countries/mbbs-in-russia/page.tsx` | enquiry form reused on the Russia page |
| `components/cms/univLayoutPreview` (+ `sectionEditor`) | `components/cms/*` → `components/universities/*` (full `getOptions` component set), `countries/mbbs-russia/RussiaBanner`, `ui/Faq`, `images/EventContactForm`, `universities/univNav` (+ optional `options` prop) | CMS preview composes the university page from the real section components |
| `components/universities/univNav` (`UnivNav`, optional `options` prop) | `components/cms/univLayoutPreview` | CMS preview lists only the entry's chosen sections in the sub-nav |
| `components/countries/countryCarousal`, `components/countries/russianUni`, `components/countries/collegeCards` | `app/(site)/countries/page.tsx` | country index composition |

**Correction to older docs:** `app/(site)/AGENT_CONTEXT.md` and `components/homepage/AGENT_CONTEXT.md` claim the Russia page (`app/(site)/countries/mbbs-in-russia/page.tsx`) uses `components/homepage/GloballyRecognizedUniversities`. The source imports `RussiaBanner`, `CountryIntro`, `WhyRussia`, `EligibilitySection`, `ssmuDurations`, `stepsSSMU` and `images/EventContactForm` — **not** `GloballyRecognizedUniversities`, which is only used by `app/page.tsx`. Similarly, older files mention `components/common/...`; that folder no longer exists (everything moved to `components/ui/`).

## Rules for adding components

1. **Put it in the folder that owns the route.** New page sections go in `components/<feature>/`; only truly site-wide, feature-agnostic pieces belong in `components/ui/`. If two features need the same section, move it to `ui/` rather than duplicating (the current cross-feature table is the debt list to avoid growing).
2. **Name it `<Thing>Section` / `<Thing>Grid` / `<Thing>Banner` in PascalCase, one section per file, default export.** Export types only when a sibling file needs them.
3. **Add `"use client"` only when you use state, effects, refs, handlers or browser APIs.** A server component can import a client one; the reverse is not true.
4. **Reuse the primitives instead of re-styling:** `ui/Button` for every clickable (never a raw styled `<button>`; use `ButtonLink` for navigation), `ui/PageBanner` for page heroes, `ui/HeadingOfCard` for section titles, `ui/carousal` + `ui/curveCard` for card carousels. Pass `className` knowing that inline `style` in those components wins.
5. **Never add module-level mutable state, timers, or singletons** in `components/` (shared server process + hot reload). Keep timers in refs and clear them in effect cleanups.
6. **Do not create import cycles.** The one existing cycle is `ui/Navbar ↔ ui/NavDropdown` (shared `bgColor` constant); extract shared constants into `lib/` for new code instead.
7. **Keep images in `public/`** and check `public/AGENT_CONTEXT.md` for the intended asset before adding a new one. Note the latent broken default `"/bd-doctor.jpg"` in `ui/PageBanner` (only `public/bg-doctor.jpg` exists) — always pass `backgroundImage`.
8. **Document it:** add the file to the owning folder's `AGENT_CONTEXT.md` (description + consumers) and, if it creates a cross-feature import, add a row to the table above. `npm run graph` / `npm run graph:check` are referenced by `AGENTS.md` but `tools/graph.mjs` is **not present** in this checkout, so these docs are currently maintained by hand.

## Known inconsistencies worth knowing

- `components/about-us/page.tsx` is a page in a component folder; route code should not normally live here, but About already does it (and metadata is co-located with it).
- `components/contact-us/` contains only the hero, so the folder name is misleading — the contact form is in `about-us/`.
- Legacy/unused files: the duplicate `Form` alias import of `ui/form` in `components/homepage/ExpertCounsellingSection.tsx`, `components/homepage/MBBSHeroSection.tsx` (imported but commented out in `app/page.tsx`; `MBBSCountries.tsx` *is* rendered), `components/about-us/HeadingOfCard.md` (design note).
- Naming drift: `carousal.tsx` (misspelled), `lastsection.tsx`, `dditems.tsx`, `form.tsx`, `searchbar.tsx` — import them by their exact lowercase paths on case-sensitive filesystems.
- Stale documentation elsewhere references `components/common/*` and a Russia-page import that does not exist; trust the source over those lines.
