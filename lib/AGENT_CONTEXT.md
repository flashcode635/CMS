# Directory: lib

Shared, framework-free data and utility modules used by the public site.

## Files

- `blogPosts.ts`: the shared blog registry and related lookup helpers.
- `constants.tsx`: shared presentation constants **plus the country content source of truth** — `DEFAULT_COUNTRY_CONTENT` / `getCountryContent(slug)`; the CMS live editor seeds from these and overlays user edits.
- `universitySectionData.ts`: single source of ALL university section copy (15 exports: `OVERVIEW_CONTENT`, `ACCREDITATION_CONTENT`, `FMGE_CONTENT`, `WHY_CHOOSE_US_CONTENT`, `ADVANCED_TRAINING_CONTENT`, `ELIGIBILITY_CONTENT`, `DURATION_CONTENT`, `ADMISSION_CONTENT`, `DOCUMENTS_CONTENT`, `BENEFITS_CONTENT`, `FEES_CONTENT`, `FACULTY_CONTENT`, `HOSTEL_CONTENT`, `EVENTS_CONTENT`, `TESTIMONIALS_CONTENT`). Same pattern as the country content: section components import these as their `DEFAULT_CONTENT`, the CMS reads them for seeds/preview. Serializable by design — plain strings/numbers/arrays of plain objects, icons as kebab-case lucide name strings (resolved via `components/ui/iconRegistry.tsx`), no ReactNode / React elements / `StaticImageData` (see the file's header comment).
- `auth.ts`: JSON-file auth module (signup/login, used by `app/api/auth/*`).
- `cms/`: country CMS content helpers (per-country content overrides).
- `utils.ts`: shared UI utility functions.

There is no database client or model in this directory; auth is file-based
(`auth.ts`), and all page copy lives in the typed constants above.
