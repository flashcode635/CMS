# Directory: components/blog-details
Primary Purpose: Building blocks for the blog article page (`/collections/blog/[slug]`): hero, hard-coded article body, sidebar widgets (TOC, tags, author, share bar, related posts) and the newsletter CTA. Everything is presentational — data comes from props or module-level constants; nothing in this folder fetches from an API or a CMS.

> Hand-written reference documentation. `npm run graph` regenerates `graph/` and its own Runtime/Dependencies/Consumers metadata separately.

## Files

### `BlogHero.tsx`
[BlogHero.tsx]: Full-bleed hero for one blog post — cover photo, breadcrumb, brand line, title, author/read-time/view meta, category badge and date.

- **Runtime:** client (`"use client"`, line 1) although there are no hooks, browser APIs or handlers — it could be a server component; the directive is redundant.
- **Purpose:** top of the article page. Cover container is `h-120 sm:h-140 lg:h-180` (480/560/720px at the default 0.25rem spacing scale).
- **Props:** `interface BlogHeroProps` — every field optional:
  - `title = "5 Efficient Rules How to Organize Your Working Place"`, `category = "Visa Guide"`, `author = "Joanna Wellick"`, `date = "June 1, 2023"`, `readTime = 2`, `views = 1600`
  - `coverImage = "https://www.figma.com/api/mcp/asset/b8c55f3f-9c3a-49b1-b9c6-dba8bb467385"` — Figma MCP asset, identical URL to `NewsletterCTA`'s `bgImg`
  - `slug = "blog-post"` — destructured but **never referenced** (dead prop; the page passes a real slug).
- **State & effects:** none.
- **Handlers / functions:** `formatViews(n: number)` → `n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n)`; 1600 renders `1.6K`, 999 renders `999`.
- **Constants & types:** `BlogHeroProps` (local). Inline styles: bottom fade `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)`, category badge `bg-[#4b6bfb]/80`, title `clamp(28px, 4.5vw, 72px)` in Playfair Display, meta in Inter, date in Work Sans, Back button in Lexend.
- **Dependencies:** `next/image`, `next/link`, `lucide-react` (`Clock`, `Eye`, `ChevronRight`).
- **Consumers:** `app/(site)/collections/blog/[slug]/page.tsx` (only).
- **Notes:**
  - Image: `fill`, `priority`, `sizes="100vw"`, `unoptimized`, `object-cover opacity-50` over a black base, plus a `bg-black/20` overlay and the bottom gradient.
  - Breadcrumb `nav aria-label="Breadcrumb"`: Home (`/`) → Blog (`/collections/blog`) → title truncated with `max-w-50`; the floating "Back" link also targets `/collections/blog`.
  - `<time dateTime={date}>` gets a display string ("June 1, 2023"), not an ISO date — invalid `datetime`; should be `dateTime="2023-06-01"`.
  - Hard-coded brand copy: "My Study Hub" and "Grow Together in Excellence".
  - No `dangerouslySetInnerHTML`, no images from `public/`, no responsive logic beyond Tailwind classes.

### `BlogContent.tsx`
[BlogContent.tsx]: Article body. Renders `children` when supplied, otherwise a fully hard-coded 362-line MBBS/study-abroad article with 4 `<section id>` anchors and a 10-image Figma gallery.

- **Runtime:** server component (no directive, no hooks, no browser APIs) → safe to render on the server.
- **Purpose:** main column of `/collections/blog/[slug]`; the page renders `<BlogContent />` with no children, so **every slug shows the same canned article** (title/slug only change the hero + metadata).
- **Props:** `export interface BlogContentProps { children?: ReactNode }` — optional; when truthy, returns `<article className="w-full max-w-[225]">` wrapping only the children (the `max-w-[225]` arbitrary value has no unit → invalid CSS, effectively no max-width).
- **State & effects:** none.
- **Handlers / functions:** none.
- **Constants & types:** `BlogContentProps` (exported) and 10 module-level image constants: `imgSection1A`–`imgSection1F`, `imgBig`, `imgPortrait1`–`imgPortrait3` (all `https://www.figma.com/api/mcp/asset/<uuid>`, see lines 5–24).
  Sections and headings (default body):
  1. `id="visa-requirements"` → "Visa Requirements and Application Tips" (checklist callout, 5 paragraphs)
  2. `id="top-destinations"` → "Accommodation Options for Students Abroad" (6-image mosaic, 5-item `ul aria-label="Key takeaways"`)
  3. `id="why-study-abroad"` → "Budgeting and Financial Planning for International Studies" (single `<figure>` + `<figcaption>` "Embrace Diversity and Build Connections")
  4. `id="application-process"` → "Health and Safety Tips for Students Abroad" (3 portrait images + 3 paragraphs)
- **Dependencies:** `next/image`, `lucide-react` (`CheckSquare`), `react` (`ReactNode`, imported as a value rather than `import type`).
- **Consumers:** `app/(site)/collections/blog/[slug]/page.tsx` (only).
- **Notes:**
  - **Section-id/label mismatch (real bug):** only `visa-requirements` matches its heading; `top-destinations`, `why-study-abroad` and `application-process` point at accommodation/budgeting/health headings, so the sidebar TOC links scroll to headings that don't match their labels.
  - Images all use `fill` + `unoptimized` + explicit `sizes`; the `sizes` values are partly invalid (`"(max-width: 225) 100vw, 225"` has no units).
  - Layout breakpoints: image grids go `grid-cols-1 sm:grid-cols-2` / `sm:grid-cols-[3fr_1.5fr]` / `sm:grid-cols-[1.5fr_3fr]`; the portrait row is `sm:grid-cols-3`.
  - Typography relies on non-standard utilities (`text-4.5`, `leading-[8.25]`, `text-[8.25]`) that are not defined in `app/globals.css`; `leading-[8.25]` is a unitless 8.25 line-height multiplier and will look far too loose if it compiles. Verify visually before trusting spacing.
  - Repeated lorem-ish copy ("Learn about the local culture…", "Research universities and programs…") appears in several paragraphs, and the `ul` labelled "Key takeaways" holds generic body copy, not takeaways.
  - No `dangerouslySetInnerHTML` anywhere — content is static JSX, so no XSS surface.

### `leftbar.tsx`
[leftbar.tsx]: Desktop blog sidebar wrapper that composes the author card, tag list and related blog posts.

- **Runtime:** server component.
- **Purpose:** keeps the desktop sidebar markup out of the blog detail route and passes the current post context to each widget.
- **Props:** `LeftSidebarProps` — required `author`, `slug`, and `tags`; optional `designation`.
- **State & effects:** none.
- **Dependencies:** `AuthorCard`, `TagsList`, `RelatedBlogs`.
- **Consumers:** `app/(site)/collections/blog/[slug]/page.tsx` (desktop sidebar).
- **Notes:** hidden below the `lg` breakpoint; the route keeps separate mobile widgets inside the article main column.

### `AuthorCard.tsx`
[AuthorCard.tsx]: Author bio widget with two layouts (`sidebar` gradient card, `full` avatar + bio row) and four social links.

- **Runtime:** server component (no directive, no hooks).
- **Purpose:** sidebar author block and the wide author footer of the article page.
- **Props:** `export interface AuthorCardProps`:
  - `name = "Luci Avetisyan"`, `designation = "Senior Content Writer"`, `bio = "Sed cras nec a nulla sapien adipiscing ut etiam. …"` (placeholder lorem)
  - `avatar?: string | StaticImageData = "/countries/russia/bg-map.png"` — the default is a **country map PNG used as an avatar** (see `public/AGENT_CONTEXT.md` before changing it)
  - `socials?: AuthorSocials = {}` — `{ linkedin?, github?, website?, email? }`
  - `variant?: "sidebar" | "full" = "sidebar"`
- **State & effects:** none.
- **Handlers / functions:** no handlers. `socialLinks` is rebuilt on every render as `SocialLinkItem[]` (`label`, `href`, `Icon`, `bg`):
  - LinkedIn → `Link2`, `#0039ea`, `href = socials.linkedin ?? "#"`
  - GitHub → `Share2`, `#1b1f23`, `href = socials.github ?? "#"`
  - Website → `Globe`, `#6d767e`, `href = socials.website ?? "#"`
  - Email → `AtSign`, `#000`, `href = socials.email ? "mailto:"+email : "#"`
- **Constants & types:** `AuthorSocials`, `AuthorCardProps` (both exported), `SocialLinkItem` (local), `defaultAvatar`. Sidebar card background `linear-gradient(122.63deg, rgba(0,146,63,0.22) 12.7%, rgba(49,99,255,0.22) 87.17%)`, `rounded-3xl p-10`.
- **Dependencies:** `next/image` (`Image`, `StaticImageData` type), `lucide-react` (`Link2`, `Globe`, `AtSign`, `Share2`, `LucideIcon`).
- **Consumers:** `app/(site)/collections/blog/[slug]/page.tsx` — rendered twice: `variant="full"` in `<main>` and `variant="sidebar"` in the sticky `<aside>`.
- **Notes:**
  - `variant="full"` **ignores `designation`** and the sidebar variant **ignores `bio`** — passing both does not show both.
  - Icons are generic Lucide glyphs, not brand logos (LinkedIn uses `Link2`, GitHub uses `Share2`); each sits in a 24×24 colored circle (`w-6 h-6`) with `target="_blank" rel="noopener noreferrer"` and `aria-label={`${name} on ${label}`}`. With no `socials` supplied all four links render `href="#"`, so clicking opens a new tab on the same page.
  - Avatar uses `fill` + `unoptimized`, `sizes="110px"`; sizes `w-22.5 h-22.5 sm:w-27.5 sm:h-27.5` (90→110px).
  - Accessibility: containers expose `aria-label={`Author: ${name}`}` / `About the author: ${name}`; headings are `<p>` not `<h2>`, so the widget is not in the document outline.
  - Duplicated on the page (same name shown in hero, full card and sidebar card).

### `BlogCard.tsx`
[BlogCard.tsx]: Compact vertical post card used inside the article sidebar's "You May Also Like" list (deliberately narrower than the listing-page cards).

- **Runtime:** server component.
- **Purpose:** one related-post tile; the whole card is a single `<Link>` (cover, category pill, title, divider, author + date).
- **Props:** `interface BlogCardProps` (local, not exported):
  - required `title: string`, `category: string`, `author: string`, `date: string`, `coverImg: string`
  - optional `authorImg?: string` (avatar block is skipped entirely when absent), `href = "#"`
- **State & effects:** none (hover is pure CSS: `hover:shadow-[0_8px_32px_-4px_rgba(75,107,251,0.18)]` on the link, `hover:scale-105` on the cover, `focus-visible:outline-[#4b6bfb]`).
- **Handlers / functions:** none.
- **Constants & types:** inline colors `#e8e8ea` border, `#4b6bfb` accent + `rgba(75,107,251,0.05)` badge, `#181a2a` title (Work Sans), `#97989f` meta (Inter/Work Sans). Cover `h-50 sm:h-[60]` (the `sm:h-[60]` arbitrary value has no unit → no-op).
- **Dependencies:** `next/image`, `next/link`.
- **Consumers:** `components/blog-details/RelatedBlogs.tsx` (only). Not used by the listing page — that grid has its own internal card.
- **Notes:**
  - `<time dateTime={date}>` uses the formatted display date (e.g. "June 1, 2023"), not ISO.
  - Author name is `truncate`; date is `whitespace-nowrap shrink-0`, so long titles/names degrade gracefully.
  - Cover image is `fill`, `unoptimized`, `sizes="(max-width: 640px) 100vw, 392px"`; avatar `alt={author}`.
  - No `dangerouslySetInnerHTML`; no analytics/click tracking.

### `NewsletterCTA.tsx`
[NewsletterCTA.tsx]: Full-width "Unlock Global Opportunities" newsletter banner with email field, consent checkbox and a local-only success state.

- **Runtime:** client (`"use client"`; `useState`).
- **Purpose:** closing CTA section of the article page.
- **Props:** untyped destructuring with defaults → inferred `{ heading?: string; subtext?: string }`:
  - `heading = "Unlock Global Opportunities"`, `subtext = "Stay informed about studying abroad, visas, and scholarships."`
- **State & effects:** `email` (`""`), `agreed` (`false`), `submitted` (`false`). No effects, no cleanup.
- **Handlers / functions:**
  - `handleSubmit(e: React.FormEvent)`: `e.preventDefault()`; early-returns when `!agreed || !email`; otherwise `setSubmitted(true)`. **No network request, no storage** — the comment says "Replace with real submission logic".
  - email `<input type="email" onChange={setEmail(e.target.value)}>`; consent toggled by `onClick={() => setAgreed(v => !v)}` on a `Button role="checkbox" aria-checked={agreed}`.
- **Constants & types:** `bgImg = "https://www.figma.com/api/mcp/asset/b8c55f3f-9c3a-49b1-b9c6-dba8bb467385"` (same Figma asset as `BlogHero`'s default cover), 55% black overlay, `max-w-275` content wrapper, `py-20 sm:py-28`.
- **Dependencies:** `react` (`useState`), `next/image`, `lucide-react` (`CheckSquare`), `@/components/ui/Button`.
- **Consumers:** `app/(site)/collections/blog/[slug]/page.tsx` (only).
- **Notes:**
  - **The submit `Button` has no children** (`<Button ... />` self-closing at lines 112–115) → it renders as an empty outlined box with padding and **no accessible name**; add a label such as "Subscribe".
  - Success branch replaces the form with `role="alert"` text "Thanks for subscribing! We'll be in touch soon." and never resets; there is no error state, no loading state, no validation message (`noValidate` on the form).
  - Consent control is duplicated in the DOM: a real `sr-only` checkbox (`id="newsletter-consent"`, controlled, `onChange` updates `agreed`) plus the `role="checkbox"` Button linked via `<label htmlFor>`. Screen readers see two checkboxes for one value — prefer a single styled input.
  - Input ids/labels: `newsletter-email` (+ `sr-only` label), heading id `newsletter-heading` referenced by `aria-labelledby`.
  - Background `<Image alt="" aria-hidden fill sizes="100vw" unoptimized>`; gradient-free flat overlay.

### `RelatedBlogs.tsx`
[RelatedBlogs.tsx]: "You May Also Like" sidebar column that maps a hard-coded 4-post array into `BlogCard`s.

- **Runtime:** server component.
- **Purpose:** right sidebar of the article page (and the mobile stack inside `<main>`).
- **Props:** no interface; defaults inferred:
  - `posts = SAMPLE_POSTS` — array of objects `{ id, category, title, author, authorImg, date, coverImg, href }`
  - `heading = "You May Also Like"`
- **State & effects:** none. Renders `<aside aria-label="Related blog posts">` → `<h2>` (uppercase) → `posts.map(post => <BlogCard key={post.id} {...post} />)`; `id` is spread into `BlogCard` even though it doesn't declare it (harmless).
- **Handlers / functions:** none.
- **Constants & types:** `SAMPLE_POSTS` (lines 57–98) and 7 Figma asset URLs: `imgR1`–`imgR4` (covers), `imgAv1`–`imgAv3` (avatars). Posts:
  1. Visa Guide / "Navigating the Visa Process: A Step-by-Step Guide" / Kenji Tanaka / June 1, 2023
  2. Student Life / "Making the Most of Your Experience as an International Student" / Ingrid Dubois / May 22, 2023
  3. Scholarships / "Unlocking Funding: A Guide to Scholarships and Grants" / Omar Hassan / April 10, 2023
  4. Culture Shock / "Overcoming Culture Shock: Tips for a Smooth Transition" / Lee Wei / March 5, 2023
  Every `href` is `"#"` → the cards are non-navigating placeholders.
- **Dependencies:** `./BlogCard` (only).
- **Consumers:** `app/(site)/collections/blog/[slug]/page.tsx` (only) — rendered twice (mobile + sidebar), so the four `<aside>`s/cards duplicate in the DOM.
- **Notes:**
  - **Duplicate content:** these 4 titles/authors/dates are byte-identical to entries 1–4 of `BLOGS` in `components/blogs/BlogsGrid.tsx`; only the image sources differ (Figma assets here, Unsplash there). Changing post metadata requires editing both files.
  - `imgAv1` is reused for two different authors (Kenji Tanaka and Lee Wei).
  - Type safety is implicit: no `RelatedBlogsProps`/`RelatedPost` interface, so a missing field only fails at `BlogCard` call sites.
  - Headings use `<h2>` inside an `<aside>` — fine for landmarks, but there is no `aria-labelledby` relationship.

### `ShareBar.tsx`
[ShareBar.tsx]: Share-count block plus Facebook/Pinterest/LinkedIn/WhatsApp share links, a views chip and a copy-link button.

- **Runtime:** client (`"use client"`; `useState`).
- **Purpose:** under the article body, between two hairline dividers.
- **Props:** `export interface ShareBarProps`, all optional:
  - `totalShares = 10000`, `facebookCount = 636`, `pinterestCount = 636`, `linkedinCount = 636`, `views = 12000`, `shareUrl?: string`
- **State & effects:** `copied: boolean` (false). No effects. `url` is derived **during render**: `shareUrl ?? (typeof window !== "undefined" ? window.location.href : "")` — on the server it is `""`, on the client it becomes the real URL, so server and client markup can differ (hydration mismatch risk if no `shareUrl` is passed; the page does pass one).
- **Handlers / functions:**
  - `fmt(n)` → `n >= 1000 ? (n/1000).toFixed(0)+"K" : String(n)` (10000 → `10K`, 636 → `636`).
  - `handleCopy()` → `await navigator.clipboard.writeText(url)`; on success `setCopied(true)` then `setTimeout(() => setCopied(false), 2000)`; errors are swallowed by an empty `catch`. The timer is not cleared on unmount (harmless post-unmount state set).
- **Constants & types:** local `SharePlatform { label, count, href, bg, Icon }`; `SHARES` built each render:
  - Facebook `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, `#3b5998`, `ThumbsUp`
  - Pinterest `https://pinterest.com/pin/create/button/?url=…`, `#e60023`, `Share2`
  - LinkedIn `https://www.linkedin.com/shareArticle?mini=true&url=…`, `#007bb6`, `Share2`
  - WhatsApp (separate JSX) `https://wa.me/?text=${encodeURIComponent(url)}`, `#25d366`, `MessageCircle`
  - Views chip `bg-brand-royal` (`#0039ea`).
- **Dependencies:** `react`, `@/components/ui/Button`, `lucide-react` (`Eye`, `Link`, `Check`, `Share2`, `MessageCircle`, `ThumbsUp`, `LucideIcon`).
- **Consumers:** `app/(site)/collections/blog/[slug]/page.tsx` (only). That page passes `shareUrl={"https://mystudyhub.com/collections/blog/"+slug}` (production host hard-coded) and `totalShares={10000}` / `views={1600}`.
- **Notes:**
  - All share links use `target="_blank" rel="noopener noreferrer"` and `aria-label`s (`Share on {label} — {count} shares`, `Share on WhatsApp`, `{n} views`).
  - Pinterest/LinkedIn hrefs omit `media`/`title`/`summary`, so Pinterest opens without an image.
  - WhatsApp shares the raw URL as the message text; no prefilled text.
  - Copy button: `aria-label={copied ? "Link copied!" : "Copy link"}`, swaps `LinkIcon` → `Check` (green) and label "Copy Link" → "Copied!" for 2 s; `navigator.clipboard` requires a secure context (HTTPS/localhost) — otherwise the failure is silent.
  - Counts are static props, not live telemetry; no localStorage.
  - Controls use a deliberately compact scale (`text-xs`/`text-sm`, reduced padding, and 16–20px icons) so the share row takes less space without changing its responsive wrapping.

### `TableOfContents.tsx`
[TableOfContents.tsx]: Anchor-nav sidebar that highlights the heading currently in view with an `IntersectionObserver`.

- **Runtime:** client (`"use client"`; `useState` + `useEffect`).
- **Purpose:** in-article navigation (desktop sticky `<aside>` and a mobile copy above the body).
- **Props:** `items = DEFAULT_ITEMS` (no interface; inferred `Array<{ id: string; label: string; level: number }>`). `level === 1` → numbered circle, otherwise bullet with `ml-[71px]`.
- **State & effects:**
  - `activeId` initialised to `items[0]?.id ?? ""`.
  - `useEffect(..., [items])`: resolves each `id` via `document.getElementById`, drops missing ones, returns early when none exist, creates `new IntersectionObserver(cb, { rootMargin: "0px 0px -60% 0px", threshold: 0 })`, observes every heading, and `observer.disconnect()` in cleanup. The callback takes `entries.find(e => e.isIntersecting)` — *first entry in the batch*, not the topmost heading, so with several visible headings the highlight can jump.
  - Re-creates the observer whenever the `items` array identity changes (the page passes a module-level `POST.tocItems`, so once); it never re-runs when headings mount later.
- **Handlers / functions:** each link `onClick`: `e.preventDefault()`, `document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })`, `setActiveId(item.id)`. No `history.pushState`, so the URL hash never updates and anchors are not shareable; the browser's native hash jump is suppressed.
- **Constants & types:** `DEFAULT_ITEMS` (lines 126–143) — `why-study-abroad` ("Why Study Abroad?", level 1), `top-destinations` ("Top Destinations for International Students", level 1), `application-process` ("Application Process: A Step-by-Step Guide", level 2), `visa-requirements` ("Visa Requirements and Application Tips", level 2). Styling: 30px numbered circle, `bg-brand-royal` when active / `bg-[#e8eeff]` idle, bullets `bg-[#00142d]`, active text `text-brand-royal`, dividers `bg-[#e9ecef]`.
- **Dependencies:** `react` only.
- **Consumers:** `app/(site)/collections/blog/[slug]/page.tsx` (twice — mobile wrapper `lg:hidden` and desktop sidebar; each instance creates its own observer).
- **Notes:**
  - **Numbering is array-index based** (`{idx + 1}`), not per-level counters, so reordering or mixing levels produces wrong numbers for level-1 entries.
  - Only 2 of the 4 default labels match a real `BlogContent` heading (see `BlogContent.tsx` mismatch note) — the TOC scrolls correctly by id but labels lie.
  - No reading-time calculation here; `readTime` is a hard-coded prop on `BlogHero`.
  - Anchor ids must exist in the DOM; missing ids are silently skipped (that item stays clickable but does nothing beyond `setActiveId`).
  - Accessibility: `<nav aria-label="Table of contents">`, `<ol>` semantics, number/bullet spans `aria-hidden`; no `aria-current` on the active link.

### `TagsList.tsx`
[TagsList.tsx]: Pill-style tag widget; each tag links to the blog listing with a `?tag=` slug.

- **Runtime:** server component.
- **Purpose:** sidebar tag cloud (also rendered in the mobile stack).
- **Props:** `tags = DEFAULT_TAGS` (`string[]`, no interface) — labels may include a leading `#`.
- **State & effects:** none.
- **Handlers / functions:** per tag, `label = tag.startsWith("#") ? tag : "#"+tag`; `slug = tag.replace(/^#/,"").toLowerCase().replace(/\s+/g,"-")`; `href = /collections/blog?tag=${slug}`.
- **Constants & types:** `DEFAULT_TAGS` = `"#Global Connections"`, `"#Study Match"`, `"#Academic Passion"`, `"#Finding Your Academic Soulmate"`, `"#Ideal Study Pairing"`, `"#Study Romance"`, `"#Pursue Your Path"`. Pills: `px-3.75 py-2.5`, `border-brand-sky` (`#bacbff`), `rounded-[20px]`, `text-brand-royal` (`#0039ea`), Poppins, hover `bg-[#f0f4ff]`.
- **Dependencies:** `next/link`.
- **Consumers:** `app/(site)/collections/blog/[slug]/page.tsx` (twice).
- **Notes:**
  - **The generated `?tag=` links do nothing:** `/collections/blog` (`app/(site)/collections/blog/page.tsx`) never reads `searchParams` and `BlogsGrid` has no tag filter — the query string is ignored. Wire the param into the grid before advertising tags as filters.
  - Heading uses `<h2>` but `fontFamily: 'Raleway'`, which is **not loaded** anywhere (`app/globals.css` loads DM Sans/DM Serif, Frank Ruhl, Inter, Lexend, Plus Jakarta, Playfair, Poppins, Roboto) → falls back to a system sans.
  - Odd utilities: `sm:text-[8.25]` (unitless arbitrary, invalid), `leading-3xl` (not a Tailwind default) — heading size effectively inherited on `sm+`.
  - Keys use the original `tag` string, so duplicate tags (with/without `#`) would collide.
