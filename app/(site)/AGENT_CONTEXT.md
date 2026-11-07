# Directory: app/(site)

Primary Purpose: Public marketing site (route group — `(site)` adds **no** URL segment). All pages are thin server components that compose section components from `components/<feature>/`, almost always starting with `PageBanner`. `layout.tsx` owns the public Navbar/Footer/main shell. All public routes, including `/`, live here.

## Files

### `about-us/page.tsx` (`/about-us`)

[page.tsx]: Thin re-export file: `export { default, metadata } from "@/components/about-us/page"` — the real About page lives in `components/about-us/page.tsx`.

- **Route:** `/about-us`
- **Runtime:** server component (no `"use client"`); no `dynamic`/`revalidate`. The re-exported component is also server and imports several client sections.
- **Metadata:** re-exported from `components/about-us/page.tsx`: title `About Us | My Study Hub`, description `Learn more about My Study Hub and our mission to help students study MBBS abroad.`
- **Renders (from `components/about-us/page.tsx`, `backgroundColor:"#e1f0f9"`):** `PageBanner(title="About Us", subtitle="Learn more about who we are", backgroundImage="/home/about-graduation.png", overlayOpacity={0.5})` → `HeadingOfCard(type="bold", title="Know More About Us", description=<JSX drop-cap paragraphs>)` → `AboutImageSection` → `AboutTextContent` → `MissionCoreValues` → `QuoteBanner` → `MeetOurTeam` → `NationalPresence` → `ExpertCounsellingSection(type="location")` → `FaqSection`.
- **Data / functions:** no params, no fetch, no redirect. Every section hard-codes its own content. `components/about-us/page.tsx` imports `LocationMap` and `ContactSection` but never renders them (dead imports).
- **Auth:** none.
- **Dependencies:** `@/components/about-us/page` only. That file imports `@/components/ui/PageBanner`, `@/components/ui/HeadingOfCard`, `components/about-us/{AboutImageSection,AboutTextContent,MissionCoreValues,QuoteBanner,NationalPresence,LocationMap,ContactSection}`, `../homepage/{MeetOurTeam,ExpertCounsellingSection}`, `./lastsection` — all verified to exist.
- **Consumers / navigation:** Navbar "About Us" dropdown item `Overview` (`components/ui/NavDropdown.tsx:112`).
- **Notes:** the file comment says "Content lives in components/about-us/page.js" but the file is `.tsx`. Section 10 in the component's comments is labelled "Get In Touch / Contact + Form" yet renders `FaqSection` — the contact section (`ContactSection`) is imported but not used, so the About page has no contact form.

### `about-us/career/page.tsx` (`/about-us/career`)

[page.tsx]: Careers page: `PageBanner` + `WelcomeBanner` + `JoinTeamSection` + `RecruitmentGrid` + FAQ, on a white background.

- **Route:** `/about-us/career`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Career at SPH | My Study Hub`, description `Explore the comprehensive Career oppurtunities at My Study Hub.` (typo "oppurtunities" is in source).
- **Renders:** wrapper `div.flex.flex-col` with `backgroundColor:#ffffff` → `PageBanner(title="Career - My Study Hub Pvt Ltd", subtitle="Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!", backgroundImage="/home/about-graduation.png", overlayOpacity={0.5})` → `WelcomeBanner` → `JoinTeamSection` → `RecruitmentGrid` → `FaqSection` (default `slim=true`).
- **Data / functions:** `export default function ServicesPage()` — component name is copy-pasted from the services page; no params/fetch/redirect.
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/career/{WelcomeBanner,JoinTeamSection,RecruitmentGrid}`, `@/components/about-us/lastsection` (default export `FaqSection`, optional `slim` prop).
- **Consumers / navigation:** Navbar About dropdown item `Career` (`NavDropdown.tsx:114`).
- **Notes:** file header comment incorrectly says "/about-us/services — Services page". The banner subtitle is award-nomination copy (copied from another page) and does not describe careers. `FaqSection` renders with `slim=true`, unlike partner-with-us which passes `slim={false}`.

### `about-us/partner-with-us/page.tsx` (`/about-us/partner-with-us`)

[page.tsx]: Partner programme page: banner + five rendered partner sections + exclusive universities + FAQ; `WhyPartnerWithUs` is imported but commented out.

- **Route:** `/about-us/partner-with-us`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Partner With Us | My Study Hub`, description `Partner with My Study Hub to help aspiring medical students achieve their dreams of studying MBBS abroad.`
- **Renders (wrapper `backgroundColor:#e8f0f9`):** `PageBanner(title="Partner With Us", subtitle="Join us in empowering aspiring medical students to achieve their dreams of studying MBBS abroad.", backgroundImage="/home/about-graduation.png", overlayOpacity={0.5})` → `PartnerBenefits` → `PartnershipScope` → `BenefitsGallery` → `PartnerContactSection` → `ExclusiveUniversities` → `FaqSection slim={false}`.
- **Data / functions:** `export default function PartnerWithUsPage()`; no params/fetch.
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/partner-with-us/{WhyPartnerWithUs,PartnerBenefits,PartnershipScope,BenefitsGallery,PartnerContactSection,ExclusiveUniversities}`, `@/components/about-us/lastsection`.
- **Consumers / navigation:** Navbar About dropdown item `Partner With Us` (`NavDropdown.tsx:115`).
- **Notes:** `{/* <WhyPartnerWithUs /> */}` is commented out at line 34, yet the import at line 7 remains (dead import; removing it is safe). `WhyPartnerWithUs.tsx` therefore has zero render sites. Section comments still number it "Section 2".

### `about-us/services/page.tsx` (`/about-us/services`)

[page.tsx]: Services page: banner → gradient `HeadingOfCard` with a drop-cap intro → `ServicesGrid` → `AdmissionProcess` → FAQ.

- **Route:** `/about-us/services`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Our Services | My Study Hub`, description `Explore the comprehensive services My Study Hub offers — from personal counseling and university selection to FMGE coaching and on-arrival support.`
- **Renders (wrapper `backgroundColor:#e8f0f9`):** `PageBanner(title="Our Services", subtitle="Comprehensive guidance for every step of your MBBS abroad journey", backgroundImage="/bg-doctor.jpg", overlayOpacity={0.5})` → `HeadingOfCard(type="bold", title="Services At My Study Hub", description=<JSX>)` → `ServicesGrid` → `AdmissionProcess` → `div` wrapping `FaqSection`.
- **Data / functions:** `export default function ServicesPage()`; the `description` prop is inline JSX using `<div style={{fontFamily:"'Lexend', sans-serif", fontWeight:300}}>` + a floated "A" drop cap and two paragraphs; no params/fetch.
- **Auth:** none.
- **Dependencies:** `@/components/ui/{PageBanner,HeadingOfCard}` (note: `HeadingOfCard` is in `components/ui`, not `components/about-us`), `@/components/services/{ServicesGrid,AdmissionProcess}`, `@/components/about-us/lastsection`.
- **Consumers / navigation:** Navbar About dropdown item `Our Services` (`NavDropdown.tsx:113`).
- **Notes:** the JSX passed to `description` wraps its content in a fragment containing a single `div` — the fragment is redundant. The empty `<div className="">` around `FaqSection` is also redundant. Banner uses the root `/bg-doctor.jpg` while every other page uses `/home/about-graduation.png`.

### `collections/page.tsx` (`/collections`)

[page.tsx]: Collections/events hub: banner + upcoming events grid + previous events, on `#f8fafc` with a `py-12` block.

- **Route:** `/collections`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Collections & Events | My Study Hub`, description `Explore our collections, webinars, and upcoming events.`
- **Renders (wrapper `flex flex-col min-h-screen`, `backgroundColor:#f8fafc`):** `PageBanner(title="Events & Collections", subtitle="Stay updated with our latest webinars, educational fairs, and events", backgroundImage="/home/about-graduation.png", overlayOpacity={0.6})` → `<div className="py-12">` → `UpcomingEventsGrid` → `PreviousEventsSection`.
- **Data / functions:** `export default function CollectionsPage()`; no params/fetch. Event data lives inside the two section components.
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/collections/{UpcomingEventsGrid,PreviousEventsSection}`.
- **Consumers / navigation:** Navbar main item `Collections` (`components/ui/Navbar.tsx:287`).
- **Notes:** identical section pair to `/collections/upcoming-event`; only banner copy, overlay (0.6 vs 0.5), background (`#f8fafc` vs `#e8f0f9`) and the extra `py-12` wrapper differ. No link to `/collections/blog`, `/collections/brochures` or `/web-stories` from within the page — those live only in the Navbar dropdown.

### `collections/blog/page.tsx` (`/collections/blog`)

[page.tsx]: Blog listing: banner + `BlogsGrid` (featured card + card grid), on `#f6f7fb`.

- **Route:** `/collections/blog`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Blog | My Study Hub`, description `Read the latest blogs and articles about studying abroad, visa guides, scholarships, student life, and more from My Study Hub.`
- **Renders (wrapper `backgroundColor:#f6f7fb`):** `PageBanner(title="Blog", subtitle="Insights, guides, and stories to help you navigate your journey of studying abroad.", backgroundImage="/home/about-graduation.png", overlayOpacity={0.5})` → `BlogsGrid`.
- **Data / functions:** `export default function BlogPage()`; no params/fetch. Blog data is the shared registry `lib/blogPosts.ts` (imported inside `components/blogs/BlogsGrid.tsx`).
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/blogs/BlogsGrid`.
- **Consumers / navigation:** Navbar Collections dropdown item `Blog` (`NavDropdown.tsx:130`); `components/blog-details/BlogHero.tsx` links back to `/collections/blog`.
- **Notes:** every grid card and the featured card now link to `/collections/blog/{slug}` from the registry (verified — the old `"#"`/`visa-guide` placeholders are gone). The tag pills in the article sidebar still emit `/collections/blog?tag=…`, but this page ignores `searchParams` (no tag filter).

### `collections/blog/[slug]/page.tsx` (`/collections/blog/[slug]`)

[page.tsx]: Blog article page; hero/metadata/tags/related come from the shared registry per slug — the article **body** is still one hard-coded layout (`BlogContent`).

- **Route:** `/collections/blog/[slug]` — dynamic segment with `generateStaticParams` over `BLOG_POSTS` (12 slugs, statically prerendered at build; mode becomes ○ with on-demand fallback semantics gone — unknown slugs hit `notFound()`).
- **Runtime:** server component; `export default async function BlogDetailPage(...)`; `import { notFound } from "next/navigation"` — unknown slug → 404.
- **Metadata:** `generateMetadata` reads the registry post: title `` `${post.title} | My Study Hub Blog` ``, description = `post.subtitle`.
- **Renders:** wrapper `min-h-screen` with inline gradient `linear-gradient(93.86deg, rgba(0,146,63,0.1) 12.7%, rgba(49,99,255,0.1) 87.17%), #ffffff` →
  - `BlogHero(title, category, author, date, readTime, views, coverImage=post.coverImg, slug=post.slug)`.
  - `div.max-w-350.mx-auto.px-4.sm:px-8.lg:px-16.py-14` → flex row:
    - `<main id="main-content">`: mobile-only `TableOfContents items={DEFAULT_TOC_ITEMS}`; `BlogContent` (no props — same canned body on every slug); divider; `ShareBar(totalShares={DEFAULT_TOTAL_SHARES}, views={post.views}, shareUrl={\`https://mystudyhub.com${blogPostHref(post.slug)}\`})`; divider; `AuthorCard(name, designation, bio, variant="full")`; mobile-only `TagsList tags={tagsForPost(post)}`; mobile-only `RelatedBlogs slug={post.slug}`.
    - `<aside aria-label="Blog sidebar">` (hidden below `lg`, `lg:sticky lg:top-8`): `AuthorCard(name, designation, variant="sidebar")`, `TableOfContents`, `TagsList`, `RelatedBlogs slug={post.slug}`.
  - `NewsletterCTA` (no props) at the end.
- **Data / functions:** all per-slug data from `@/lib/blogPosts` (`getBlogPost`, `tagsForPost`, `blogPostHref`); module-level `DEFAULT_TOC_ITEMS`, `DEFAULT_DESIGNATION`, `DEFAULT_AUTHOR_BIO`, `DEFAULT_TOTAL_SHARES` re-exported defaults. `SITE_URL = "https://mystudyhub.com"` (hard-coded production host, no env). `export interface BlogPageProps { params: Promise<{ slug: string }> }`. No fetch/no DB.
- **Auth:** none.
- **Dependencies:** `next/navigation` (`notFound`), `@/lib/blogPosts`, `@/components/blog-details/{BlogHero,BlogContent,TableOfContents,AuthorCard,TagsList,ShareBar,RelatedBlogs,NewsletterCTA}`.
- **Consumers / navigation:** reachable from every card of `/collections/blog` (grid + featured) and from `RelatedBlogs` cards on other blog slugs.
- **Notes:** per-post coverage: hero (title/category/author/date/read-time/views/cover), tags, share link, related list, metadata — but `BlogContent` ignores the post, so the body text of every slug is the same MBBS/study-abroad article and `DEFAULT_TOC_ITEMS` labels don't all match the rendered headings (pre-existing mismatch). Swapping `BlogContent` for per-post content is the remaining work.

### `collections/brochures/page.tsx` (`/collections/brochures`)

[page.tsx]: Brochure downloads page with 15 hard-coded records fed to `BrochuresGrid`; the "real API" fetch is present only as a comment.

- **Route:** `/collections/brochures`
- **Runtime:** server component, `export default async function BrochuresPage()`; no `dynamic`/`revalidate`. The only `await` is on a local function that resolves immediately, so the route is effectively static.
- **Metadata:** title `Brochures | My Study Hub`, description `Download official brochures, prospectuses, and admission guides for studying MBBS abroad with My Study Hub.`
- **Renders (wrapper `backgroundColor:#e8f2f4` — a light teal, unlike the site-wide `#e8f0f9`):** `PageBanner(title="Brochures", subtitle="Download all official My Study Hub brochures and get complete information about studying MBBS abroad.", backgroundImage="/home/about-graduation.png", overlayOpacity={0.5})` → `BrochuresIntro` → `BrochuresGrid brochures={brochures}`.
- **Data / functions:** `const DUMMY_BROCHURES` (module scope, 15 objects with `{id,title,description,coverImage,fileUrl,fileName,year}`): "My Study Hub Pvt Ltd", Samara, Northern State, Kazan Federal, Bashkir State, Kursk State, Orenburg State, Volgograd State, Crimea Federal, Rostov State, Altai State, Ural State, Perm (2024), Tver (2024), Ivanovo (2024); the rest are 2025. `async function getBrochures() { return DUMMY_BROCHURES; }` — no network. Above it, a commented block shows the intended implementation: `fetch(\`${process.env.NEXT_PUBLIC_API_URL}/api/brochures\`, { next: { revalidate: 300 } })`; `NEXT_PUBLIC_API_URL`is **not** defined in`.env.example`.
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/brochures/{BrochuresIntro,BrochuresGrid}`.
- **Consumers / navigation:** Navbar Collections dropdown item `Brochures` (`NavDropdown.tsx:132`).
- **Notes:** every `fileUrl` is `"#"` and every `coverImage` is a `https://www.figma.com/api/mcp/asset/…` URL (temporary Figma CDN assets; three distinct images recycled across 15 cards). Until a route handler exists, all download buttons are dead. Comment at line 11 documents the exact object shape to preserve when swapping in the API.

### `collections/upcoming-event/page.tsx` (`/collections/upcoming-event`)

[page.tsx]: Upcoming-events page: events-focused banner + the same `UpcomingEventsGrid` and `PreviousEventsSection` used by `/collections`.

- **Route:** `/collections/upcoming-event`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Upcoming Events | My Study Hub`, description `Explore upcoming MBBS Admission Gateway events hosted by My Study Hub across India.`
- **Renders (wrapper `backgroundColor:#e8f0f9`):** `PageBanner(title="Upcoming Events", subtitle="Join us at an MBBS Admission Gateway seminar near you. Meet our counsellors, explore top universities, and take the first step towards your medical career abroad.", backgroundImage="/home/about-graduation.png", overlayOpacity={0.5})` → `UpcomingEventsGrid` → `PreviousEventsSection`.
- **Data / functions:** `export default function UpcomingEventPage()`; no params/fetch; data inside the section components.
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/collections/{UpcomingEventsGrid,PreviousEventsSection}`.
- **Consumers / navigation:** Navbar Collections dropdown item `Upcoming Events` (`NavDropdown.tsx:131`).
- **Notes:** near-duplicate of `/collections` (see that entry). Leading blank line before the first import (cosmetic).

### `contact-us/page.tsx` (`/contact-us`)

[page.tsx]: Contact page: `ContactHeroBanner` + `ContactSection`; no `PageBanner`, no page-level background color.

- **Route:** `/contact-us`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Contact Us | My Study Hub`, description `Get in touch with My Study Hub counselors for guidance on studying MBBS abroad. Reach us through phone, email, or visit our offices in India and Russia.`
- **Renders:** `<div className="flex flex-col min-h-screen">` → `ContactHeroBanner` → `ContactSection`. Both take no props. No wrapper background, so the body's `#e8f0f9` shows through.
- **Data / functions:** `export default function ContactUsPage()`; no params/fetch. `ContactSection` is a client component that renders phone/email/address blocks and social links (external), not a form — there is no `<form>` and no POST anywhere on this route. Its "Book Your FREE Counselling Session" CTA links to `/contact-us`; when already on that path the click is `preventDefault`ed and the page scrolls to top.
- **Auth:** none.
- **Dependencies:** `@/components/contact-us/ContactHeroBanner`, `@/components/about-us/ContactSection` (note the shared section lives under `about-us`, not `contact-us`).
- **Consumers / navigation:** Navbar main item `Contact Us` and the Navbar CTA button (desktop + mobile, `Navbar.tsx:447,479`); `EnrollNowSection` CTA; `ContactSection`'s own CTA; `RussiaBanner`/`CountryIntro` on the Russia page.
- **Notes:** the only public page that does not start with `PageBanner`. Despite the "Contact Us" name and the metadata promising "phone, email, or visit our offices", there is **no enquiry form** — lead capture lives in `PartnerContactSection`/`EventContactForm` on other pages. `components/about-us/page.tsx` imports `ContactSection` but never renders it. No `metadata` robots directive.

### `countries/page.tsx` (`/countries`)

[page.tsx]: Countries landing page: banner + country carousel + Russia universities heading + college cards. No metadata export.

- **Route:** `/countries`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** **none** — inherits root `My Study Hub` / `Learn smarter with My Study Hub`. This is the only fully built public page with no page-specific metadata.
- **Renders:** fragment → `PageBanner(title="Top Countries for studies in Abroad", subtitle="Explore the best countries for studying abroad, offering diverse cultures, world-class education, and unique experiences.", overlayOpacity={0.9}, backgroundImage="/bg-doctor.jpg")` → `CountryCarousal` (named export from `countryCarousal.tsx`) → `RussianUni` (named export) → `CollegeCards` (default export).
- **Data / functions:** `export default function Countries()`; no params/fetch. `CountryCarousal` hard-codes 6 countries (Russia, Canada, Australia, Germany, Japan, France) but pairs them with **Indian city photos** (`/about-us/bengaluru.webp`, `chennai.webp`, …). `RussianUni` renders only a `HeadingOfCard(prefix="Top Universities in ", title="Russia", type="bold", italic)` — a heading with no list beneath it on this page.
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/countries/countryCarousal` (`{ CountryCarousal }`), `@/components/countries/russianUni` (`{ RussianUni }`), `@/components/countries/collegeCards` (default). Import spelling/casing matches the files exactly (case-sensitive on Linux).
- **Consumers / navigation:** Navbar main item `Countries` and the Countries dropdown "See All Countries" button (`Navbar.tsx:181`).
- **Notes:** no wrapper `div`/background — the three sections supply their own. Neither the carousel, the college cards nor the homepage map pins link to a country page, so `/countries/mbbs-in-russia` is reachable only through the Navbar Countries dropdown (plus `WhyRussia`'s self-link on that page). Adding `export const metadata` here would be the cheapest SEO win.

### `countries/mbbs-in-russia/page.tsx` (`/countries/mbbs-in-russia`)

[page.tsx]: The only country-detail page: Russia/Samara landing page composed of six country-specific sections plus the lead-gen `EventContactForm` at the end.

- **Route:** `/countries/mbbs-in-russia` (a leaf segment — there is no `[country]` route; other countries would 404).
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `MBBS in Russia For Indian Students 2026-27 | My Study Hub`, description `Enroll at Samara State Medical University with expert guidance, ensuring a smooth application process.` (title says Russia, description is Samara-specific).
- **Renders (wrapper `div.flex.flex-col`, no background style):** `RussiaBanner` → `CountryIntro` → `WhyRussia` → `EligibilitySection` → `SSMUDurations` → `StepsSSMU` → `EventContactForm`. All take no props.
- **Data / functions:** `export default function MBBSInRussiaPage()`; no params/fetch/redirect. University list is inside `RussiaBanner`/sections, not this file.
- **Auth:** none.
- **Dependencies:** `@/components/countries/mbbs-russia/{RussiaBanner,CountryIntro,WhyRussia,EligibilitySection,ssmuDurations,stepsSSMU}` and `@/components/images/EventContactForm` (reused from the gallery feature). The previous version of this doc listed `components/homepage/GloballyRecognizedUniversities` and `components/common/PageBanner` — both stale.
- **Consumers / navigation:** Navbar Countries dropdown — country names are slugified as `name.toLowerCase().replace(/[^a-z0-9]+/g,"-")`, and the entry `"MBBS in Russia"` produces exactly `/countries/mbbs-in-russia`, so this link resolves. The same dropdown produces `/countries/mbbs-in-india`, `/countries/mbbs-in-china`, … (12 more of the 13 listed countries) with no matching routes → 404s. `WhyRussia` self-links to this path; `RussiaBanner`/`CountryIntro` link to `/contact-us`.
- **Notes:** no `PageBanner` — the page relies on `RussiaBanner`'s own hero, so the transition from `/countries` is visually different. No `min-h-screen`, no background color (body `#e8f0f9`). The final `EventContactForm` is the gallery contact form, so copy may be event-oriented.

### `gallery/page.tsx` (`/gallery`)

[page.tsx]: Pure redirect: `/gallery` → `/gallery/images`; renders nothing.

- **Route:** `/gallery` (responds with a `redirect()` — Next throws `NEXT_REDIRECT`, so the function body never returns).
- **Runtime:** server component; `export default function GalleryPage() { redirect("/gallery/images"); }` — no return value. No `dynamic`/`revalidate` (redirect happens at render/prerender).
- **Metadata:** none (never rendered; not inherited).
- **Renders:** nothing.
- **Data / functions:** `redirect` from `next/navigation`. No status code passed → Next's default temporary redirect (307 for a rendered server component); not a permanent 308.
- **Auth:** none.
- **Dependencies:** `next/navigation` only.
- **Consumers / navigation:** Navbar main item `Gallery` (`Navbar.tsx:289`); logo/nav paths that point at `/gallery`.
- **Notes:** redirect target exists (`gallery/images/page.tsx`). If SEO permanence matters, use `permanentRedirect()` or `redirect("/gallery/images", RedirectType.replace)`.

### `gallery/images/page.tsx` (`/gallery/images`)

[page.tsx]: Photo-gallery index: banner + filterable `GalleryGrid`; each card links to `/gallery/images/<slug>`.

- **Route:** `/gallery/images`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Gallery — Images | My Study Hub` (em dash), description `Explore our gallery of events, seminars, academic fests, and Events at My Study Hub.`
- **Renders (wrapper `backgroundColor:#e8f0f9`):** `PageBanner(title="Seminars, Academic Fests & Events at My Study Hub in pictures", subtitle="Explore our memorable moments from events, seminars, and academic fests. Celebrate inspiration, learning of students. Look at community workshops and events through our gallery. ", backgroundImage="/home/about-graduation.png", overlayOpacity={0.5})` → `GalleryGrid`.
- **Data / functions:** `export default function GalleryImagesPage()`; no params/fetch. Events (incl. `slug: "event-2025"`) are hard-coded in `components/images/GalleryGrid.tsx`; card hrefs fall back to the event year when `slug` is absent (`/gallery/images/<year>`).
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/images/GalleryGrid` (client, owns filter state).
- **Consumers / navigation:** Navbar Gallery dropdown item `Images` (`NavDropdown.tsx:148`); `/gallery` redirect; `GalleryGrid` links to the `[slug]` page.
- **Notes:** the subtitle has a trailing space and a duplicated "events … Events" phrase. Because `GalleryGrid` supplies hrefs, the set of valid slugs is only whatever data it hard-codes — but `[slug]` accepts anything.

### `gallery/images/[slug]/page.tsx` (`/gallery/images/[slug]`)

[page.tsx]: Per-event gallery: derives a display title from the slug and renders description, photo grid and contact form. No validation, so every slug yields a page.

- **Route:** `/gallery/images/[slug]` — dynamic; no `generateStaticParams`; any string (including unknown events) is served.
- **Runtime:** server component; `export default async function EventGalleryPage({ params }: { params: Promise<{ slug: string }> })`; no `dynamic`/`revalidate`.
- **Metadata:** `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> })` — `const { slug } = await params` (Next 16 async params), then `formatTitle(slug)` and returns `{ title: \`${title} Gallery | My Study Hub\`, description: \`Explore the moments and highlights from the ${title} organized by My Study Hub.\` }`. Title/description are derived from the URL, not from real event data.
- **Renders (wrapper `backgroundColor:#e8f0f9`):** `PageBanner(title={displayTitle}, subtitle="Explore the moments and highlights from this event", backgroundImage="/home/about-graduation.png", overlayOpacity={0.5})` → `EventDescription` → `EventGalleryGrid` → `EventContactForm` (all no props — they do **not** receive the slug, so every event shows the same photos/description).
- **Data / functions:** helper `function formatTitle(slug: string)` — `slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())`, e.g. `event-2025` → `Event 2025`. Page awaits `params`, computes `displayTitle`. No `notFound()`, no fetch, no search-param handling.
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/images/{EventDescription,EventGalleryGrid,EventContactForm}`.
- **Consumers / navigation:** linked from `components/images/GalleryGrid.tsx` — href `` `/gallery/images/${event.slug || event.year.toLowerCase().replace(/\s+/g, "-")}` `` (slug when present, else the lowercased year). `EventContactForm` is also reused by `/countries/mbbs-in-russia`.
- **Notes:** unknown slugs render a valid-looking page with a 200 status (soft 404s, unbounded URL space). To make it real: validate the slug against the event list (or DB) and call `notFound()`; pass the event into the three sections. The slug is a `Promise` and is awaited in both metadata and the page (correct for Next 16).

### `gallery/videos/page.tsx` (`/gallery/videos`)

[page.tsx]: Video gallery: banner + `VideoGrid` (featured video + grid).

- **Route:** `/gallery/videos`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Gallery — Videos | My Study Hub`, description `Watch our video highlights from events, seminars, fresher's parties, and academic fests at My Study Hub.`
- **Renders (wrapper `backgroundColor:#e8f0f9`):** `PageBanner(title="Gallery", subtitle="Watch our memorable moments from events, seminars, and academic fests", backgroundImage="/home/about-graduation.png", overlayOpacity={0.5})` → `VideoGrid`.
- **Data / functions:** `export default function GalleryVideosPage()`; no params/fetch; video data hard-coded inside `VideoGrid`.
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/videos/VideoGrid`.
- **Consumers / navigation:** Navbar Gallery dropdown item `Videos` (`NavDropdown.tsx:149`).
- **Notes:** banner title is just "Gallery" (not "Videos"), so the two gallery pages are indistinguishable in their hero. `VideoGrid` is client (modal/player state).

### `web-stories/page.tsx` (`/web-stories`)

[page.tsx]: Banner + `WebStoriesCarousel` story slider + the homepage MBBS-abroad hero section.

- **Route:** `/web-stories`
- **Runtime:** server component; no `dynamic`/`revalidate`.
- **Metadata:** title `Web Stories | My Study Hub`, description `Visual web stories about MBBS abroad, university reviews, and student experiences.`
- **Renders (wrapper `flex flex-col min-h-screen`, `backgroundColor:#f8fafc`):** `PageBanner(title="Web Stories", subtitle="Explore quick visual stories and updates about medical education abroad", backgroundImage="/home/about-graduation.png", overlayOpacity={0.6})` → `<div className="max-w-7xl mx-auto px-4 py-16 w-full bg-brand-sky">` → `WebStoriesViewer` (dark tray+viewer block) → `WebStoriesCarousel` → `<MBBSAbroadHero/>`.
- **Data / functions:** `export default function WebStoriesPage()`; no params/fetch. Story data is hard-coded inside `components/web-stories/WebStoriesCarousel.tsx`.
- **Auth:** none.
- **Dependencies:** `@/components/ui/PageBanner`, `@/components/web-stories/{WebStoriesViewer,WebStoriesCarousel}`, `@/components/homepage/MBBSAbroadHero`.
- **Consumers / navigation:** Navbar Collections dropdown item `Web Stories` (`NavDropdown.tsx:133`).
- **Notes:** `WebStoriesViewer` sits above `WebStoriesCarousel`; both render the same `WEB_STORIES` array (exported from the carousel file). The carousel also auto-advances every 6 s while the viewer runs a 7 s per-story progress timer — two competing autoplay loops on one page; consider keeping only one happy path (either drop the carousel or pause it while the viewer is in view). The `bg-brand-sky` background comes from the user's manual edit of the page wrapper. Currently no `/web-stories/[slug]` story-detail route and stories have no hrefs (deliberate — avoids dead links).

## Navigation map for this group

- Navbar (`components/ui/Navbar.tsx`, client) main items: Home `/`, About Us `/about-us` (`about` dropdown), Collections `/collections` (`collections`), Countries `/countries` (`countries` panel), Gallery `/gallery` (`gallery`), Contact Us `/contact-us`; plus a Login link to `/admin/login` (broken — see `app/admin/AGENT_CONTEXT.md`).
- About dropdown (`components/ui/NavDropdown.tsx`): Overview `/about-us`, Our Services `/about-us/services`, Career `/about-us/career`, Partner With Us `/about-us/partner-with-us`.
- Collections dropdown: Blog `/collections/blog`, Upcoming Events `/collections/upcoming-event`, Brochures `/collections/brochures`, Web Stories `/web-stories`.
- Gallery dropdown: Images `/gallery/images`, Videos `/gallery/videos`.
- Countries panel: `/countries`, plus `/countries/<slug>` for its 13 `COUNTRIES_DATA` entries (ids 1–8, 10–14 — id 9 is missing), of which only `mbbs-in-russia` exists; college links point at `/colleges/<slug>` and **no `/colleges` route exists** in this repo.
- Footer (`components/ui/Footer.tsx`) contains no internal route links (all `href="#"` / social placeholders) — verified.
