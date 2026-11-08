# Decisions Log

This file records meaningful technical and product decisions for this project.
Newest entries go on top. Never delete old entries; mark them Superseded instead.
Agents must read this file before starting any task.

## Project guidelines (edit this section yourself)

- Stack: Next.js 16 (Turbopack), React 19, Tailwind CSS v4, TypeScript 5, Lucide React
- Code style rules: Functional React components, strict TypeScript typing (avoid `any`), App Router structure
- Things the agent must never do: Use `any` as a permanent fix, delete files without permission, run destructive commands
- Things the agent must always do: Verify build after modifications, log decisions in decisions.md
- Testing expectations: `npm run build` (Next.js production build with TypeScript checks)

## Noticed but not touched

### Zip #2 reconciliation — 2026-10-29

- The current tree already contains `app/(site)/layout.tsx` and `app/(site)/page.tsx`; do not repeat CMSplan B2’s homepage move.
- The current tree has public auth routes under `app/api/auth/*`, a JSON-file auth module at `lib/auth.ts`, and no tracked MongoDB integration.
- The current tree has `app/admin/login/page.tsx` but no tracked dashboard page; this slice creates `/admin/dashboard` and an admin-only layout.
- Drizzle/Postgres, CMS APIs, and admin authentication enforcement remain out of scope for this slice.

## Decisions

### D-022 | 2026-11-08 | Remove vertical padding from active 3D carousel card

- Task: Make the active card in the shared 3D carousel use `py-0`.
- Decision: Apply `py-0` only to the active item wrapper and retain `py-6` for inactive items.
- Why: The active card should visually fill the carousel height while preserving the existing spacing and scale treatment for neighboring cards.
- Impact: `components/ui/threeDCarousel.tsx`, `components/ui/AGENT_CONTEXT.md`.
- Status: Active

### D-021 | 2026-11-02 | Enable live editing for events and testimonials

- Task: Make the university Events and Student Testimonials sections editable from the live CMS preview.
- Decision: Keep the existing field schemas and wire both sections through the shared `SectionHitbox` → `LiveSectionEditor` → `buildSectionProps` override path. Add the Events image URL and alt text to the same schema.
- Why: Both components already expose optional, defaulted props, so the existing editor architecture can support them without duplicating state or changing public-page behavior.
- Impact: `components/cms/previewSection.tsx`, `components/cms/sectionFieldSchemas.ts`, `components/cms/AGENT_CONTEXT.md`.
- Status: Active

### D-020 | 2026-10-30 | Recreate web stories carousel reference

- Task: Match the supplied web-stories carousel reference image.
- Decision: Use a wide 1168px card with a 28px radius, top segmented autoplay indicators, vertical edge-tab arrows, a compact landscape height, and a stronger bottom readability gradient.
- Why: These proportions and controls reproduce the reference composition while preserving the existing story data, autoplay, accessible buttons, and shared `WEB_STORIES` export.
- Impact: `components/web-stories/WebStoriesCarousel.tsx`, `components/web-stories/AGENT_CONTEXT.md`.
- Status: Active

### D-019 | 2026-10-29 | Add student testimonials to university pages

- Task: Add the supplied student testimonial design inside the university detail page.
- Decision: Create a university-scoped responsive testimonial component with local data and reuse existing `/home/team-*` portraits rather than adding new assets or changing the homepage carousel.
- Why: The visual is specific to university detail pages, while local typed content and existing assets keep the section self-contained and maintainable.
- Impact: `components/universities/studentTestimonials.tsx`, `app/(site)/universities/[slug]/page.tsx`.
- Status: Active

### D-017 | 2026-10-29 | Add basic local auth flow

- Task: Add basic email/password/username signup and login.
- Decision: Use Node `crypto` for salted scrypt password hashes, signed
  HTTP-only session cookies, and a Git-ignored `.data/users.json` store. Add
  `/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`, and
  `/api/auth/me`, with a shared SVG-led auth form for `/login` and `/signup`.
- Why: The prior MongoDB scaffold was intentionally removed, but the auth
  screens still needed a working local backend without adding a database
  dependency.
- Impact: `lib/auth.ts`, `app/api/auth/**`, `components/auth/AuthForm.tsx`,
  `app/(auth)/**`, `.env.example`.
- Status: Active

### D-018 | 2026-10-29 | Keep admin and public auth forms separate

- Task: Restore the admin-specific login form while keeping the new public auth
  form for user login and signup.
- Decision: `AuthForm` owns `/login` and `/signup`; `LoginForm` owns
  `/admin/login` and posts to the reserved `/api/admin/login` endpoint.
- Why: Admin authentication will have a separate backend and must not be mixed
  with normal user sessions.
- Impact: `components/admin/LoginForm.tsx`, `components/auth/AuthForm.tsx`,
  `app/admin/login/page.tsx`.
- Status: Active

### D-016 | 2026-10-29 | Remove accidental MongoDB scaffold

- Task: Remove the accidentally added MongoDB integration.
- Decision: Remove Mongoose, the in-memory MongoDB dependency, bcrypt, the
  database connection/model/auth files, database scripts, and MongoDB-related
  environment variables. Keep the unrelated public-site code unchanged.
- Why: The database scaffold was unused by the public site and introduced
  unnecessary runtime and install dependencies.
- Impact: `package.json`, `.env.example`, `lib/`, `scripts_ts/`,
  `components/admin/AuthSuccess.tsx`.
- Status: Active

### D-015 | 2026-10-29 | Register duration in university section composer

- Task: Add the MBBS duration section to the university page.
- Decision: Register `DurationSection` in `sections.tsx` for the MBBS duration option while retaining its navigation component reference for the unavailable-section guard.
- Why: The section composer is the clearest source of rendered university sections, and the navigation still needs to know that the section is implemented.
- Impact: `components/universities/duration.tsx`, `components/universities/sections.tsx`, `components/universities/univNav.tsx`.
- Status: Active

### D-013 | 2026-10-29 | Show errors for unavailable university sections

- Task: Notify users when a university navigation item points to a section that is not implemented yet.
- Decision: Make `UnivNav` a client component with local error state; prevent navigation for options without a component and render the shared `ErrorPopup` with the section name. Normalize section wrapper IDs by removing the leading `#` from href values.
- Why: Undefined navigation entries previously changed the URL without showing feedback, and wrapper IDs beginning with `#` did not match anchor targets.
- Impact: `components/universities/univNav.tsx`, `components/universities/sections.tsx`.
- Status: Active

### D-014 | 2026-10-29 | Add reusable university eligibility section

- Task: Add the eligibility section shown in the university page reference image.
- Decision: Create a prop-driven `EligibilitySection` with exported default content, a navy-to-royal-blue gradient, responsive criteria cards, and a configurable footer node. Register it in the university navigation so the existing section composer renders it at `#eligibility`.
- Why: Keeping the content above the component matches the existing university-section pattern and allows other university pages to reuse the same structure with different criteria.
- Impact: `components/universities/eligibility.tsx`, `components/universities/univNav.tsx`, `components/universities/AGENT_CONTEXT.md`.
- Status: Active

### D-012 | 2026-10-27 | Reduce blog share-bar control scale

- Task: Make the blog article share controls slightly smaller without changing the shared button primitive.
- Decision: Reduce the ShareBar's outer/control gaps, horizontal and vertical padding, text sizes, and icon sizes by one small step. Keep the existing responsive wrapping, destinations, labels, counts, copy interaction, and accessible names unchanged.
- Why: The share row was visually larger than necessary and could consume more horizontal space than needed on the article page.
- Impact: `components/blog-details/ShareBar.tsx`
- Status: Active

### D-011 | 2026-10-26 | Flush video card layout for testimonials

- Task: Remove the padding around the testimonial video, shrink the card height, widen it slightly and make the text easier to read.
- Decision: `TestimonialsSection` now passes `cardWidth={400}`, `cardHeight={420}` to `ThreeDCarousel` (scene `440`, desktop ring radius `450`). The video wrapper sits at `top: 0` with `height: 55%`, `padding: 0` and `borderRadius: 0`, so it is flush with the card's top/left/right edges and the bottom edge is straight. The text area occupies the bottom `45%` with `padding: 11px 20px 15px` and `justify-between`, giving quote → divider → avatar/name/role their own bands; the quote is `text-sm` with `leading-[22px]`. The video keeps a soft `0 8px 24px rgba(0,0,0,0.22)` shadow.
- Why: The previous `12px` side padding + `16px` top gap made the iframe look inset and wasted vertical space; the 360×450 card left the quote cramped. 400×420 plus a flat, full-bleed video gives the text more width and a clear reading order without changing the shared carousel defaults.
- Alternatives considered: Shrinking the card globally in `threeDCarousel` (rejected: the generic defaults must stay reusable); keeping rounded video corners (rejected: the curve visually cut the video and worked against the flush look); reducing `line-clamp` to fit more text (rejected: quotes would be truncated).
- Impact: `components/homepage/TestimonialsSection.tsx`, `components/homepage/AGENT_CONTEXT.md`, `components/ui/AGENT_CONTEXT.md`, `decisions.md`. Testimonial data, YouTube autoplay/pointer behaviour, gradient, dots and arrows are unchanged.
- Status: Active
- Reversal: Drop the two geometry props back to the defaults, restore the video wrapper to `top: 16px`, `height: 52%`, `padding: 0 12px`, `borderRadius: 20px`, and the text area to `height: 42%`, `padding: 12px 20px 18px`.

### D-010 | 2026-10-26 | Adopt shared carousel on homepage testimonials

- Task: Replace the inline 3D carousel in `TestimonialsSection.tsx` with the generic `ThreeDCarousel`.
- Decision: The section now holds only the six-testimonial data, the local `TestimonialCard` content, the heading and the `<ThreeDCarousel>` call. The shared component owns the scene, radius/rotation maths, card shell, dots, arrows, keyboard/swipe and reduced-motion behaviour. The old inline `useState`, `navigate`, `normalize`, `Button` controls and decorative/card styling were removed. `isActive` is still passed to the card so the active YouTube iframe keeps `&autoplay=1&mute=1` and pointer events.
- Why: Proves the generic API against the original use case and removes the duplicated transform/control code. The shared defaults (`360×450` card, `470` scene, `1400` perspective, `800ms` easing, brand card shadow/gradient) preserve the old look.
- Alternatives considered: Keeping the inline copy (rejected: two sources of truth); passing pre-rendered children instead of `renderItem` (rejected: card content needs `isActive` for autoplay/pointer events).
- Impact: `components/homepage/TestimonialsSection.tsx`, `components/homepage/AGENT_CONTEXT.md`, `components/ui/AGENT_CONTEXT.md`, `decisions.md`. No data or heading copy changed. This completes the deferred integration mentioned in D-009.
- Status: Active
- Reversal: Restore the inline carousel from git history before D-010 and remove the `threeDCarousel` import.

### D-009 | 2026-10-26 | Extract reusable 3D ring carousel

- Task: Turn the homepage testimonials 3D carousel into a generic, reusable UI component.
- Decision: Added `components/ui/threeDCarousel.tsx` with a generic `renderItem` API, the existing ring maths (`translateZ(-radius) rotateY(-active * angle)`, per-card `rotateY(index * angle) translateZ(radius)`), the brand card shell/controls, and new optional keyboard, swipe, reduced-motion, live-region and loop/configuration support. Kept `TestimonialsSection.tsx` unchanged so the homepage visual is not regressed during extraction.
- Why: The testimonials carousel is useful for other card types (blogs, services, team, events) but its content, video autoplay and page heading were hard-wired. A generic component avoids copy-pasting the transform/animation code and lets consumers render any card body via `renderItem`.
- Alternatives considered: Extracting only the transform helper (rejected: leaves controls, a11y and card chrome duplicated); immediately refactoring `TestimonialsSection` to consume the component (deferred until the generic API is reviewed and the homepage can be visually checked).
- Impact: `components/ui/threeDCarousel.tsx` (new), `components/ui/AGENT_CONTEXT.md` (hand-updated because the graph generator is missing), `decisions.md`. No existing component signatures changed; no consumers yet.
- Status: Active
- Reversal: Delete `threeDCarousel.tsx`, remove its `AGENT_CONTEXT.md` entry and this decision.

### D-008 | 2026-10-23 | Align SSMU document shaders with card content

- Task: Correct the decorative shader panels in the SSMU documents section.
- Decision: Anchor the shader layers to the left edge of the right-hand document-card area at responsive breakpoints, use inset-based vertical sizing, and place the content layer above the shaders.
- Why: The previous layers started too far left, duplicated broad positioning rules, and included malformed sizing classes, causing the shaders to appear detached from the cards.
- Impact: `components/countries/mbbs-russia/stepsSSMU.tsx`
- Status: Active

### D-007 | 2026-10-23 | Standardize shared button controls

- Task: Replace inconsistent button styling and raw button elements with a shared typed primitive.
- Decision: Use CVA variants with `tailwind-merge`, shared brand tokens, accessible icon-only sizing, and migrate button call sites plus carousel and college-card controls.
- Why: Centralizes interaction styling, preserves type safety, and makes button behavior consistent across the site.
- Impact: `components/ui/Button.tsx`, `lib/utils.ts`, `app/globals.css`, `package.json`, and button-consuming components.
- Status: Active

### D-006 | 2026-10-23 | Fix blog grid article expansion

- Task: Make the desktop blog grid's "More Articles" control reveal the remaining cards.
- Decision: Share the existing `showAll` state across responsive layouts, showing 8 desktop cards and 4 mobile cards initially, and toggle the label to "Show Less" after expansion.
- Why: The desktop control had no click handler and all cards were rendered before interaction, so the button appeared non-functional.
- Impact: `components/blogs/BlogsGrid.tsx`
- Status: Active

### D-005 | 2026-10-22 | Paginate country college cards

- Task: Prevent the country college card section from displaying all cards at once.
- Decision: Show 16 cards initially, append up to 8 cards per Load More click, and disable the control when every card is visible.
- Why: Keeps the initial section compact while allowing visitors to progressively reveal the remaining colleges.
- Alternatives considered: Showing all cards immediately (rejected because it creates an unnecessarily long initial section).
- Impact: `components/countries/collegeCards.tsx`
- Status: Active

### D-004 | 2026-10-14 | Agent-readable repo docs and dependency graph generator

- Task: Make the repo understandable to agents (folder docs, architecture, image blueprint, dependency graph)
- Decision: Added `tools/graph.mjs` (`npm run graph`, `graph:check`) that generates `graph/` and refreshes every `AGENT_CONTEXT.md` plus a `public/` image blueprint; added `architecture.md`, `details.md` and a graph section in `AGENTS.md`
- Why: Lets agents see importers/blast radius and shared-state hazards before editing, and keeps folder docs from going stale
- Alternatives considered: Hand-written docs only (rejected: they drift); madge/dependency-cruiser (rejected: extra dependency)
- Impact: new files `tools/graph.mjs`, `graph/*`, `architecture.md`, `details.md`, `public/AGENT_CONTEXT.md`, new `AGENT_CONTEXT.md` in app, app/admin, lib, lib/models, scripts_ts, tools and several components folders; `package.json` scripts
- Status: Active
- Reversal: Delete those files and the two npm scripts

### D-003 | 2025-05-20 | Define global data interfaces in `types/index.ts`

- Task: Type frontend systematically following Phase 3 step 1
- Decision: Created `types/index.ts` containing global data models for UserProfile, NavItem, BlogPost, TeamMember, University, EventItem, Testimonial, ContactFormData, JobOpening, BrochureItem, and CountryInfo.
- Why: Provides single source of truth for component prop interfaces and API data types across the application without duplicating shapes.
- Alternatives considered: Defining types locally inside each component (rejected to preserve single source of truth).
- Impact: Created `types/index.ts`.
- Status: Active
- Reversal: Delete or update `types/index.ts`.

### D-002 | 2025-05-20 | Install `lucide-react` dependency

- Task: Type frontend and fix Next.js build errors
- Decision: Installed `lucide-react` package
- Why: Multiple components (`Navbar`, `NavDropdown`, `HeroBanner`, `MBBSHeroSection`, `SearchSection`, blog components) imported icons from `lucide-react` which was missing from `package.json`
- Alternatives considered: Replacing with inline SVGs (rejected due to large number of icons used)
- Impact: Added `lucide-react` to `dependencies` in `package.json`
- Status: Active
- Reversal: Run `npm uninstall lucide-react`

### D-001 | 2025-05-20 | TS baseline stabilization and empty routes fix

- Task: Type frontend systematically following Phase 1-4 instructions
- Decision: Temporarily set `strict: false` and `noImplicitAny: false` in `tsconfig.json`, and populate empty route/component files with minimal valid React components
- Why: Fix build blockers (prerendering empty route exports and module errors) to enable incremental migration to TypeScript
- Alternatives considered: Direct strict mode conversion in one pass (rejected as it causes unmanageable cascading build failure)
- Impact: `tsconfig.json`, `app/collections/page.js`, `app/contact-us/page.js`, `app/web-stories/page.js`, `components/common/Faq.jsx`
- Status: Active
- Reversal: Revert changes in `tsconfig.json` and empty files
