# app/admin

`app/admin/layout.tsx` is the admin-only route-group shell. It renders a
no-index gray wrapper and does not render the public Navbar or Footer.

`app/admin/login/page.tsx` renders `components/admin/LoginForm`. The form
currently posts to `/api/admin/login`; that endpoint is not part of this slice.

`app/admin/dashboard/page.tsx` is the CMS dashboard (still unprotected placeholder
for auth — see `decisions.md`). Layout: icon rail → list pane (live routes +
CMS entries) → edit form pane → live preview pane.

The "Page sections" card in the form pane is now the shared `SectionEditor`
(`components/cms/sectionEditor.tsx`): sections are typed against the university
page layout registry (`components/cms/sectionOptions.ts`) and can be added,
reordered, toggled and given per-type Heading/Body copy. When no live route is
selected in the preview pane and `active === "universities"`, we render
`UnivLayoutPreview` (`components/cms/univLayoutPreview.tsx`), which composes the
real university section components from the entry's sections, so edits show on
the FE preview; countries still render `components/cms/template.tsx`.

University "Live routes" come from `GET /api/admin/universities` (DB rows,
name+slug) and fall back to the hardcoded `ROUTES` list if the request fails.

**Live page mode:** while a live route is previewed (`useCmsStore` selection),
the form pane swaps to `LiveSectionEditor` — click any section in the preview
(`SectionHitbox`) and its content, seeded from `lib/constants.tsx` (countries)
or the section component's `DEFAULT_CONTENT` (universities), loads into the
editor. Edits only touch `useCmsStore.overrides` (in-memory) and re-render the
preview; the DB save/delete footer stays hidden, so changes are never stored.
Per-section editor fields come from `components/cms/sectionFieldSchemas.ts`.
