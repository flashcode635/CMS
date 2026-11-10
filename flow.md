# My Study Hub — user flows

This document describes the main journeys through the current website. Solid
arrows are implemented navigation or state changes. Dashed arrows indicate a
known placeholder, client-only behavior, or a gap to address later.

## Flow index

| Flow | Primary user | Entry points | Outcome |
| --- | --- | --- | --- |
| [1. Discover and explore](#1-discover-and-explore) | Prospective student | `/`, Navbar, search UI | Finds a country, university or resource |
| [2. Signup and login](#2-signup-and-login) | Returning/new user | `/signup`, `/login` | Completes the currently wired form path |
| [3. Request counselling](#3-request-counselling) | Prospective student | Homepage and contact CTAs | Reaches a contact form or counselling section |
| [4. Read content](#4-read-content) | Any visitor | Collections and gallery | Reads a blog, brochure/event or views media |
| [5. Edit a live route](#5-edit-a-live-route) | Content editor | `/admin/dashboard` | Sees an in-memory CMS preview |
| [6. Build page sections](#6-build-page-sections) | Content editor | Admin section composer | Reorders/toggles sections in a preview |
| [7. Redirect and fallback behavior](#7-redirect-and-fallback-behavior) | Any visitor | Legacy or dynamic URL | Is redirected or shown permissive content |

## 1. Discover and explore

```mermaid
flowchart TD
    Start([Open website]) --> Home["/"]
    Home --> Choose{What does the visitor need?}
    Choose -->|Understand the service| About["/about-us"]
    Choose -->|Compare countries| Country["/countries"]
    Choose -->|Explore Russia| Russia["/countries/mbbs-in-russia"]
    Choose -->|Find a university| University["/universities/[slug]"]
    Choose -->|Read resources| Collections["/collections"]
    Choose -->|Ask for help| Contact["/contact-us"]

    About --> CTA["Continue via CTA"]
    Country --> CTA
    Russia --> CTA
    University --> CTA
    Collections --> CTA
    Contact --> End([Contact/counselling action])
    CTA -. "Some CTAs still have no href/handler" .-> Contact
```

**Notes**

- The homepage is a composition of many client-side sections.
- The site Navbar and Footer are provided by `app/(site)/layout.tsx`.
- Search visuals exist, but search does not currently represent a complete
  cross-site results workflow.

## 2. Signup and login

```mermaid
flowchart TD
    Start([Visitor needs an account]) --> Choice{Has an account?}
    Choice -->|No| Signup["/signup"]
    Choice -->|Yes| Login["/login"]

    Signup --> ValidateSignup{Valid email/password/username?}
    ValidateSignup -->|No| SignupError["Show form error"]
    SignupError --> Signup
    ValidateSignup -->|Yes| Create["Submit using current form wiring"]
    Create --> Session["Expected: create session"]

    Login --> ValidateLogin{Credentials valid?}
    ValidateLogin -->|No| LoginError["Show form error"]
    LoginError --> Login
    ValidateLogin -->|Yes| Authenticate["POST /api/admin/login"]
    Authenticate --> Session
    Session --> Site["Continue to public website"]
```

**Current state:** the forms exist, but their current submit handler posts to
`/api/admin/login`; that route is not present in the current tree. Signup and
public session completion should therefore be treated as an integration gap,
not a completed user flow.

## 3. Request counselling

```mermaid
sequenceDiagram
    actor Student
    participant Page as Homepage / content page
    participant Form as Contact or counselling UI
    participant Server as Backend/API

    Student->>Page: Click counselling/contact CTA
    Page->>Form: Open or scroll to form
    Student->>Form: Enter enquiry details
    Form-->>Student: Validate visible fields
    Form-->>Server: Submit (where a handler exists)
    Server-->>Student: Confirmation or error
    Note over Form,Server: Some CTAs are still visual-only and have no handler
```

When implementing a missing CTA, keep the destination explicit: use a real
`href` for navigation or a clearly surfaced form submission error. Do not
silently treat a placeholder as a successful enquiry.

## 4. Read content

### Blog, brochure and event journey

```mermaid
flowchart LR
    Collections["/collections"] --> BlogIndex["/collections/blog"]
    Collections --> Brochures["/collections/brochures"]
    Collections --> Events["/collections/upcoming-event"]
    BlogIndex --> BlogDetail["/collections/blog/[slug]"]
    Brochures -. "fileUrl is currently #" .-> Download([Download])
    Events --> Contact["Contact/counselling CTA"]
    BlogDetail --> Contact
```

### Gallery journey

```mermaid
flowchart LR
    Gallery["/gallery"] -->|307 redirect| Images["/gallery/images"]
    Images --> ImageDetail["/gallery/images/[slug]"]
    Images --> Videos["/gallery/videos"]
    ImageDetail -. "Slug currently not validated" .-> Images
```

## 5. Edit a live route

```mermaid
flowchart TD
    Start([Editor opens admin]) --> AdminLogin["/admin/login"]
    AdminLogin --> Dashboard["/admin/dashboard"]
    Dashboard --> Select{Select preview type}
    Select -->|University| UniversityRoutes["Load DB routes<br/>or hardcoded fallback list"]
    Select -->|Country| CountryRoutes["Choose country route"]
    UniversityRoutes --> Preview["Compose real page preview"]
    CountryRoutes --> Preview
    Preview --> Hitbox["Click a section hitbox"]
    Hitbox --> Editor["LiveSectionEditor"]
    Editor --> Fields["Edit text, cards, icons,<br/>add/delete/reorder"]
    Fields --> Override["Write override to cmsStore"]
    Override --> Preview
    Override -. "No database save/publish" .-> Refresh([Refresh loses edits])
```

The editor seeds fields from `lib/constants.tsx` for countries and from
`lib/universitySectionData.ts` for universities. The shared card editor keeps
card data serializable so the preview can render the same shape that the
editor changes.

## 6. Build page sections

```mermaid
flowchart TD
    Dashboard["Dashboard form pane"] --> Sections["Page sections"]
    Sections --> Add["Add section"]
    Sections --> Reorder["Move section up/down"]
    Sections --> Toggle["Toggle section"]
    Sections --> Edit["Edit heading/body"]
    Add --> Preview["University layout preview"]
    Reorder --> Preview
    Toggle --> Preview
    Edit --> Preview
    Preview --> Live["Click section for live editor"]
    Live --> CardEditor["Edit section cards"]
    CardEditor --> Preview
```

This is a composition workflow, not a publishing workflow. A future
persistence layer should define authentication, validation, draft state,
publish state and conflict handling before replacing the in-memory store.

## 7. Redirect and fallback behavior

```mermaid
flowchart TD
    Request([Visitor requests a URL]) --> Match{Route matches?}
    Match -->|`/gallery`| Redirect["307 redirect to /gallery/images"]
    Match -->|Known static route| Render["Render page"]
    Match -->|Blog slug| Blog["Render current hard-coded article"]
    Match -->|Gallery image slug| Image["Render current image detail content"]
    Match -->|Missing country/university route| Missing["404 or broken destination"]
    Redirect --> Render
```

The dynamic blog and gallery routes currently accept broad slug values rather
than calling `notFound()`. Treat this as a known product gap when adding links
or analytics around those journeys.

## Flow design checklist

When adding a new journey:

1. Start it at a real route or an explicit button/link.
2. Show loading, validation and failure states where a request can fail.
3. Decide whether the result is static, client-only, or persisted.
4. Add the journey to this file and update the route map in
   [architecture.md](architecture.md).
5. Keep route composition in `app/` and feature behavior in
   `components/`, `lib/`, or `store/`.
