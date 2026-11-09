# Directory: components/cms

Primary Purpose: In-app CMS authoring UI for `/admin/dashboard` — form-pane widgets, the editable-page composer and its three preview renderers. Everything is client-side; no DB access (content goes through `/api/admin/content`).

Permissions/Auth: None here — the dashboard page is still an unprotected placeholder (see `app/admin/AGENT_CONTEXT.md`); enforcement lives elsewhere.

## Files

### `sectionOptions.ts`

[sectionOptions.ts]: Registry of section types the editor can compose. `SECTION_OPTIONS` mirrors the live university page layout — same order/names/anchors as `getOptions()` in `components/universities/univNav.tsx` (Overview, Accreditation, FMGE Classes, Why Choose Us, Eligibility, MBBS Duration, Admission Process, Documents, Benefits, Fee Structure, Faculty, Hostel & Facilities, Events, Free Counselling) plus `testimonials`, `faq` and the generic `content` type. Each entry's `fields` maps the editor's Heading/Body inputs onto the real prop of the section component (`heading: "titleGreen"`, `bodyList: true` for `string[]` props, etc.). Exports `getSectionOption(type)` and `blankTypedSection(type)` (empty `data` so component defaults survive).

- **Runtime:** no directive (pure data/helpers).
- **Consumers:** `components/cms/sectionEditor.tsx`, `components/cms/univLayoutPreview.tsx`.
- **Auth:** admin UI.

### `sectionEditor.tsx`

[sectionEditor.tsx]: The dashboard's "Page sections" card — "Add section" popover listing `SECTION_OPTIONS` (filtered to `content` only when `active === "countries"`), per-row reorder (up/down), type badge, label input, visible toggle, delete, and per-type Heading/Body inputs (blank input ⇒ default copy; body is one-paragraph-per-line when `bodyList`). Pure controlled component: takes `sections` + `onChange(next)` + `active` from the dashboard; keeps no entry state.

- **Runtime:** client (`"use client"`; popover outside-click effect).
- **Dependencies:** `lucide-react` (ArrowUp/ArrowDown/ChevronDown/Plus/Trash2), `./smallerComponents` (Card/Field), `./sectionOptions`.
- **Consumers:** `app/admin/dashboard/page.tsx` (replaced the old inline `Page sections` card).
- **Auth:** admin UI.

### `univLayoutPreview.tsx`

[univLayoutPreview.tsx]: FE preview of a university entry composed the way `/universities/[slug]` is — `RussiaBanner` (from entry title/description + optional `data.heroLabel/heroLanguages/heroCurrency`), `UnivNav` built from the entry's chosen sections (passes the new optional `options` prop), then each visible section rendered by its REAL component inside an anchor `<div id={...}>`. Component/defaults wiring now lives in `universitySectionRegistry.tsx` (`UNIVERSITY_SECTIONS`, `buildSectionProps`, `SectionErrorBoundary`); entry `section.data` is spread as prop overrides with the Heading/Body aliasing from `sectionOptions.fields`; components that render their own `id={anchorId}` get `anchorId: ""` to avoid duplicate ids with the wrapper. `testimonials`/`faq`/`free-counselling` render `StudentTestimonials`/`Faq`/`EventContactForm`; `content`/unknown types fall back to a generic heading/paragraph block.

- **Runtime:** client (`"use client"`).
- **Dependencies:** `universitySectionRegistry` (13 section components + boundaries), `universityName.ts` (`withUniversityName`, `slugToUniversityName`), `/countries/mbbs-russia/RussiaBanner`, `/universities/univNav`, `/universities/studentTestimonials`, `ui/Faq`, `images/EventContactForm`, `./sectionOptions`.
- **Consumers:** `app/admin/dashboard/page.tsx` — rendered in the preview pane when no live route is selected and `active === "universities"`; `countries` still render `Template`.
- **Auth:** admin UI.

### `previewSection.tsx`

[previewSection.tsx]: Live-route preview (see its header comment): clicking a "Live routes" item stores it in `useCmsStore` and this component renders that page inline. Fully edit-aware: every content-bearing wrapper is a `SectionHitbox` — clicking selects `<pageKey>:<type>` in the store (`activeSection` + `editRequest` bump) — and `useCmsStore.overrides` values are laid over `lib/constants.tsx` content (countries) / `buildSectionProps` defaults (universities), so in-memory edits render immediately. NO country section is `readOnly` any more: hero/intro/why-russia/eligibility/ssmu-durations/steps/admission/about/free-counselling/abroad-hero/faq all pass override-aware props (structured list fields — stages, documents, steps, facts, cards, faq — are parsed from editor lines via `./sectionLines`). A tail `EditorHint` explains the flow until something is selected.

### `sectionHitbox.tsx`

[sectionHitbox.tsx]: Client wrapper making a previewed section clickable: green inset ring on hover, ring + "Editing" chip when active; writes `activeSection` (and bumps `editRequest`) via `useCmsStore.setActiveSection`. `readonly` prop only affects the aria-label.

### `liveSectionEditor.tsx`

[liveSectionEditor.tsx]: The form-pane editor while a live page preview is active. Parses `activeSection` (`<kind>:<slug>:<type>`), seeds values in `getSectionSeed` — countries from `getCountryContent` merged over `DEFAULT_COUNTRY_CONTENT` (all 11 section types: hero, intro, why-russia, eligibility, ssmu-durations, steps, admission, about, free-counselling, abroad-hero, faq; JSX copy flattened via `toPlainText`), universities from `getUniversityContent` + `RUSSIA_BANNER_DEFAULTS` (hero) or the section's `DEFAULT_CONTENT` through `withUniversityName` — then renders one input per `FieldSpec` (text/textarea/list) from `sectionFieldSchemas`. Edits go to `store.setOverride`; empty/blank values fall back to the seed (see `effectiveOverrides`). "Revert" clears one section's override, "Reset all edits for this page" clears `u:<slug>:*` / `c:<slug>:*`. NO API calls — nothing persisted (deliberate per request).

### `sectionLines.ts`

[sectionLines.ts]: Pure line-format helpers for the live editor's `list` fields (the editor only has text/textarea/list kinds, so structured content travels as "A | B | C" lines). `format*` converts constants objects (stages, documents, steps, facts, eligibility cards, faq, abroad-hero country cards) to editor lines; `parse*` converts override lines back to component props, returning `undefined` for unusable input so callers fall back to constants. Markers: `!` prefix = red document tone, `+` suffix = wide card. Also exports `toPlainText(ReactNode)` used to seed textareas from JSX copy.

### `sectionFieldSchemas.ts`

[sectionFieldSchemas.ts]: Per-section editor field specs + display names. University keys = university section component prop names; country keys = `CountryContent` fields — every country section now has a schema (hero, intro, why-russia, eligibility, ssmu-durations, steps, admission, about, free-counselling, abroad-hero, faq; structured lists use the `sectionLines.ts` line formats documented in their hints). `getSectionSchema(active, type)` returns fields + `readOnly` flag; `getSectionLabel` gives the header title.

### `universitySectionRegistry.tsx`

[universitySectionRegistry.tsx]: Shared wiring of the 13 university section components + their `DEFAULT_CONTENT`s (previously inline in `univLayoutPreview.tsx`): `UNIVERSITY_SECTIONS` registry, `UNIV_TYPE_BY_ANCHOR` (live-route nav anchor → type key), `buildSectionProps(type, name, overrides)` (DEFAULT_CONTENT → `withUniversityName` → caller props, with `blankAnchorId` deduping) and the `SectionErrorBoundary` copied from `components/universities/sections.tsx`.

### `template.tsx`

[template.tsx]: Generic skeleton preview (title hero + label/heading/body blocks). Still the fallback for `active === "countries"`. Unchanged.

### `smallerComponents.tsx`

[smallerComponents.tsx]: `SectionLabel`, `StatusBadge`, `Card`, `Field` primitives used by the dashboard/editor. Unchanged.
