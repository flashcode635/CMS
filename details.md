# details.md - folder structure of the repo

Read this first to know **where things live**. For *how the pieces fit together* read [architecture.md](architecture.md). For per-file detail (purpose, imports, importers, auth) open the `AGENT_CONTEXT.md` inside the folder you are about to touch.

Project: **My Study Hub** - marketing site for an MBBS-abroad admissions consultancy (Next.js 16 App Router, React 19, Tailwind v4, TypeScript 5).

## Tree

```
studypalacehub-website/
├── AGENTS.md              Agent rules + the graph command (READ FIRST). CLAUDE.md just @-includes it.
├── architecture.md        How the project is built (layers, rendering, auth, conventions, gaps)
├── details.md             This file
├── decisions.md           Decision log (D-001..). Agents must read it and log new decisions there
├── README.md              Stock create-next-app readme (not project specific)
├── package.json           Scripts: dev, build, start, lint, find, graph, graph:check
├── next.config.ts         Remote image hosts allow-list (unsplash, flagcdn, figma); devIndicators off
├── tsconfig.json          strict TS, alias  @/*  ->  repo root
├── eslint.config.mjs      eslint-config-next (core-web-vitals + typescript)
├── postcss.config.mjs     Tailwind v4 postcss plugin
├── .env.example         No environment variables are currently required
│
├── app/                   Next.js App Router (routes only; keep pages thin)
│   ├── layout.tsx         Root layout: fonts + document shell only
│   ├── globals.css        Tailwind import, Google-font @import, body background
│   ├── (site)/            Route group (not in URL): public pages + Navbar/Footer layout
│   │   ├── layout.tsx           Public site shell
│   │   ├── page.tsx             Homepage "/"
│   │   ├── about-us/            /about-us (+ career, partner-with-us, services)
│   │   ├── collections/         /collections (+ blog, blog/[slug], brochures, upcoming-event)
│   │   ├── contact-us/          /contact-us
│   │   ├── countries/mbbs-in-russia/   /countries/mbbs-in-russia
│   │   ├── gallery/             /gallery -> redirects to /gallery/images (+ images, images/[slug], videos)
│   │   ├── universities/[slug]/ /universities/[slug] (live route rendered by the CMS preview too)
│   │   └── web-stories/         /web-stories (placeholder)
│   ├── (auth)/            /login, /signup (public auth forms)
│   └── admin/             /admin/login + /admin/dashboard — the in-app CMS (client-side,
│                          sections composer + live-route editor; edits stay in memory, no DB)
│
├── components/            All UI. One folder per page/feature; flat files inside
│   ├── common/            Navbar, NavDropdown, Footer, PageBanner (used by 12 pages), Faq (unused)
│   ├── homepage/          19 sections of "/" (all client components); also reused by other pages
│   ├── about-us/          About page sections; ALSO page.tsx here = the real /about-us page (re-exported by app)
│   ├── career/ services/ partner-with-us/ collections/ brochures/ contact-us/ blogs/ blog-details/
│   ├── images/ videos/    Gallery pages
│   ├── countries/mbbs-russia/   Russia country page sections
│   ├── universities/      University page sections (whyChooseUs, eligibility, documents,
│   │                      admissionProcess, accreditation, feesStructure, faculty, hostel,
│   │                      fmgeClasses, duration, studentTestimonials, univNav, ...)
│   ├── cms/               In-app CMS UI: sectionEditor, liveSectionEditor, previewSection,
│   │                      cardListEditor (+ fieldInputs with IconPicker), sectionFieldSchemas,
│   │                      sectionLines, universitySectionRegistry — see its AGENT_CONTEXT.md
│   ├── admin/             Admin LoginForm
│   └── auth/              Shared login/signup AuthForm
│
├── store/                 cmsStore.ts — zustand store holding CMS sections + live overrides
│
├── lib/                   Shared registries, constants and content sources
│   ├── constants.tsx      Country content (DEFAULT_COUNTRY_CONTENT / getCountryContent) + shared constants
│   ├── universitySectionData.ts  Single source of ALL university section copy (CMS reads it; serializable)
│   ├── cms/               Country CMS content helpers (cmsContent)
│   ├── auth.ts            JSON-file auth module
│   ├── blogPosts.ts       Shared blog registry
│   └── utils.ts           Shared UI utilities
│
├── types/index.ts         Shared TS interfaces (BlogPost, University, EventItem, ... - mostly unused so far)
├── tools/                 search.sh (npm run find). graph.mjs is MISSING - npm run graph/graph:check fail
└── public/                196 static assets (images/SVG). public/AGENT_CONTEXT.md = per-image blueprint
    ├── (root)             logo (study_ph_logo.png), bg-doctor.jpg, contact illustration, default next/vercel svgs
    ├── home/              homepage + footer + nav assets; home/partner/ = university logos/card backgrounds
    ├── about-us/          city office photos (+ career/welcome.webp)
    ├── contact-us/  countries/russia/  svg/
```

## Where do I change X?

| Task | Go to |
|---|---|
| Edit a public page's content | `components/<feature>/...` (page file in `app/(site)/...` only composes) |
| Add a new public route | new folder with `page.tsx` under `app/(site)/`; add menu link in `components/ui/Navbar.tsx` (and Footer) |
| Site-wide header/footer | `components/ui/Navbar.tsx`, `Footer.tsx`; mounted in `app/layout.tsx` |
| Shared page hero | `components/ui/PageBanner.tsx` (blast radius: 12 importers) |
| Blog / brochure / event data | typed constants (`lib/blogPosts.ts`, page-level data files) |
| Country page copy (all sections) | `lib/constants.tsx` (`DEFAULT_COUNTRY_CONTENT` + `getCountryContent`) — CMS edits overlay it |
| University page copy (all sections/cards) | `lib/universitySectionData.ts` — single source, same pattern as countries |
| Edit cards/sections from the admin UI | `/admin/dashboard` → live route → pick a section in the preview; cards get edit/delete/move + Plus "Add card" (`components/cms/cardListEditor.tsx`) |
| New image | put it in `public/<feature>/`, reference as `"/feature/file.ext"`, then `npm run graph` |
| Shared types | `types/index.ts` |

## Per-folder docs

Each folder that contains source has an `AGENT_CONTEXT.md` with: purpose, and for every file its runtime, props, state/effects, handlers, functions, constants/types, data flow, dependencies, consumers and auth requirement. They were last expanded by hand because `npm run graph` currently points at a missing `tools/graph.mjs` - keep them in sync manually when adding or moving files.

`app/`, `app/(site)/`, `app/admin/`, `components/` (+ each subfolder), `lib/`, `lib/models/`, `types/`, `scripts_ts/`, `tools/`, `public/`.

## Naming conventions

- Components: PascalCase `.tsx`, default export, one per file; folders kebab-case.
- Routes: folder name = URL segment; `[slug]` = dynamic; `(group)` = no URL segment.
- Import alias `@/` = repo root (e.g. `@/components/ui/Navbar`).
- Fonts are loaded in `app/layout.tsx` (next/font) - do not add `@import url(...)` inside components.
