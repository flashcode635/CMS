# My Study Hub — architecture at a glance

This is the visual guide to the My Study Hub website. It explains what runs
where, how content moves through the app, and which parts are intentionally
not persistent yet.

- **Where should I edit something?** See [details.md](details.md).
- **How does a user or editor move through the product?** See [flow.md](flow.md).
- **Why was a design chosen?** See [decisions.md](decisions.md).
- **What does each file do?** Open the nearest `AGENT_CONTEXT.md`.

## 1. Product in one picture

```mermaid
flowchart LR
    Visitor([Visitor]) --> Public["Public website<br/>marketing + discovery"]
    Member([Signed-in user]) --> Auth["/login or /signup<br/>local cookie session"]
    Editor([Content editor]) --> Admin["/admin/login<br/>/admin/dashboard"]

    Public --> Explore["Countries · universities<br/>blogs · brochures · gallery"]
    Public --> Contact["Contact and counselling<br/>forms / CTAs"]
    Auth --> Public
    Admin --> Compose["Section composer<br/>and live preview"]
    Compose --> Preview["Country / university<br/>route preview"]
    Compose -. "in-memory only" .-> Store[("Zustand CMS store")]

    Content[("Typed constants<br/>and section data")] --> Public
    Content --> Compose
```

### The important boundary

The public website is primarily a static presentation layer. The CMS can
change the client-side preview, but those changes are not saved to a database
or published to visitors after a refresh.

| Area | Current responsibility | Persistence |
| --- | --- | --- |
| Public pages | Present marketing, country, university, blog, brochure, event and gallery content | Source files / typed constants |
| Public auth UI | `/login` and `/signup` forms | Current form wiring posts to `/api/admin/login`; public auth handlers are not present in the current tree |
| Admin CMS | Compose sections and edit cards in a live route preview | Zustand state in the browser only |
| Backend | Small auth and admin/university API surfaces where present | No general public content API |

## 2. Runtime layers

```mermaid
flowchart TB
    Browser["Browser"]
    Next["Next.js 16 App Router"]
    Root["app/layout.tsx<br/>document, fonts, global CSS"]
    Site["app/(site)/layout.tsx<br/>public Navbar + Footer"]
    Routes["app/**/page.tsx<br/>thin route composition"]
    UI["components/**<br/>client and server sections"]
    Shared["lib/** + types/**<br/>content, registries, helpers"]
    Assets["public/**<br/>images and SVGs"]
    Auth["Auth UI + lib/auth.ts<br/>(API wiring incomplete)"]
    CMS["store/cmsStore.ts<br/>client CMS overrides"]

    Browser --> Next --> Root
    Root --> Site --> Routes
    Root --> Routes
    Routes --> UI
    Routes --> Shared
    UI --> Shared
    UI --> Assets
    Browser -. "auth requests" .-> Auth
    UI -. "live editor state" .-> CMS
```

### Import rules

```mermaid
flowchart LR
    App["app/**"] --> Components["components/**"]
    App --> Lib["lib/**"]
    App --> Types["types/**"]
    Components --> Lib
    Components --> Types
    Lib --> Types
    Lib -. "must not import" .-> App
    Lib -. "must not import" .-> Components
```

- Routes compose pages; business and presentation logic belongs below them.
- Shared helpers in `lib/` stay framework- and UI-independent.
- Do not add module-level mutable state in `app/`, `components/`, or `lib/`.
- Auth checks belong on every protected page or server action, not only in a
  layout.
- The known `Navbar.tsx` ↔ `NavDropdown.tsx` import cycle is an existing
  exception and should not be expanded.

## 3. Route map

```mermaid
flowchart LR
    Root["/"] --> Home["Homepage<br/>18+ sections"]
    Root --> About["/about-us<br/>career · services · partners"]
    Root --> Collections["/collections<br/>blogs · brochures · events"]
    Root --> Countries["/countries<br/>/countries/mbbs-in-russia"]
    Root --> Universities["/universities/[slug]"]
    Root --> Gallery["/gallery/images<br/>/gallery/videos"]
    Root --> Contact["/contact-us"]
    Root --> Auth["/login · /signup"]
    Root --> Admin["/admin/login<br/>/admin/dashboard"]
```

| Route group | Shell | Rendering shape | Main source |
| --- | --- | --- | --- |
| Public `(site)` | Navbar, `<main>`, Footer | Server route + mostly client sections | `components/<feature>/` |
| Auth `(auth)` | Root document only | Client auth form + auth API | `components/auth/`, `lib/auth.ts` |
| Admin | Root document only | Client dashboard and CMS preview | `components/cms/`, `store/cmsStore.ts` |

The `(site)` folder is a route group, so it does not add a URL segment.
`/gallery` redirects to `/gallery/images`. Dynamic blog and gallery slugs
currently render permissive placeholder/detail content rather than validated
records.

## 4. Request and content lifecycles

### Public page request

```mermaid
sequenceDiagram
    actor Visitor
    participant Next as Next.js
    participant Layout as Root + site layouts
    participant Page as Route page
    participant Sections as Feature components

    Visitor->>Next: GET /path
    Next->>Layout: Build document and public shell
    Layout->>Page: Render route composition
    Page->>Sections: Pass content and props
    Sections-->>Visitor: HTML + RSC payload
    Visitor->>Sections: Hydrate client interactions
```

### CMS live-edit loop

```mermaid
sequenceDiagram
    actor Editor
    participant Dashboard as /admin/dashboard
    participant Preview as Live route preview
    participant Store as cmsStore
    participant Defaults as constants / section data

    Editor->>Dashboard: Select a country or university route
    Dashboard->>Preview: Compose real page sections
    Preview->>Defaults: Seed editable section fields
    Editor->>Preview: Select section or card
    Preview->>Dashboard: Open LiveSectionEditor
    Editor->>Dashboard: Edit, add, delete, or reorder
    Dashboard->>Store: Save override in browser memory
    Store-->>Preview: Re-render with override
    Note over Store,Preview: Refresh or restart loses the override
```

## 5. Content ownership map

```mermaid
flowchart TB
    Country["Country content"] --> Constants["lib/constants.tsx"]
    University["University content"] --> UniversityData["lib/universitySectionData.ts"]
    Blog["Blogs"] --> BlogData["lib/blogPosts.ts + feature data"]
    CMSData["CMS edits"] --> Override["store/cmsStore.ts overrides"]

    Constants --> CountryPage["Country sections"]
    UniversityData --> UniversityPage["University sections"]
    BlogData --> BlogPages["Blog cards and detail"]
    Override --> CountryPage
    Override --> UniversityPage
    Constants --> CountryEditor["Country live editor"]
    UniversityData --> UniversityEditor["University live editor"]
```

**Card rule:** country and university cards are represented as serializable
records and edited through the shared CMS card editor. New cards use the
section template; legacy pipe-delimited values are still parsed for backwards
compatibility.

## 6. Rendering and styling conventions

- Components are functional, default-exported PascalCase `.tsx` files.
- Feature folders use kebab-case; dynamic routes use `[slug]`.
- `@/*` resolves to the repository root.
- Tailwind CSS v4 utilities are combined with inline Figma-derived values.
- Local media belongs in `public/<feature>/` and is referenced with
  `/feature/file.ext`.
- Most interactive sections are `"use client"`; route files should remain
  thin.

## 7. Known gaps (important when reading the diagrams)

1. The CMS is a client-side editing preview, not a publishing system.
2. Blog cards and brochure links are display-only in several places; brochure
   downloads currently use `#`.
3. Blog and gallery dynamic slugs are not validated with `notFound()`.
4. Several UI CTAs do not yet have a destination or handler.
5. Many country links refer to route patterns that do not exist yet.
6. `tools/graph.mjs` is missing, so `npm run graph` and
   `npm run graph:check` are currently unavailable.
7. Some stale Tailwind utilities and an unused default `PageBanner` asset
   reference are documented in the existing implementation notes.

## 8. Verification commands

| Command | Purpose | Current state |
| --- | --- | --- |
| `npm run dev` | Local development | Supported |
| `npm run build` | Production build and type check | Supported |
| `npm run lint` | ESLint | Supported |
| `npm run find -- <name>` | Case-insensitive filename search | Supported |
| `npm run graph` | Rebuild dependency documentation | Blocked by missing `tools/graph.mjs` |
| `npm run graph:check` | Check dependency documentation freshness | Blocked by missing `tools/graph.mjs` |
