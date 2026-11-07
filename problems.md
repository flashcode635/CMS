# problems.md - known problems (found 2026-10-14 while scanning the repo)

Nothing here has been fixed yet. Mark an item `FIXED` (with date) when resolved; do not delete it. Related: [architecture.md](architecture.md) §5 and §8, [decisions.md](decisions.md).

Severity: **High** = feature broken / security, **Medium** = wrong behaviour or risk, **Low** = cleanup.

## High

### P-001 | Admin login API does not exist
- Where: `components/admin/LoginForm.tsx` POSTs to `/api/admin/login`; there is no `app/api/` folder.
- Effect: admin login always fails, so the admin area cannot be used.
- Fix: add `app/api/admin/login/route.ts` that checks email and password (bcrypt), applies lockout (`failedAttempts`, `lockUntil`), and sets the `admin_session` cookie (httpOnly, secure, sameSite).
- `npm run graph` flags this under "Runtime links invisible to imports".

### P-002 | Session cookie is unsigned
- Where: `lib/dal.ts` trusts the cookie `admin_session = adminId:sessionVersion`. `SESSION_SECRET` is in `.env.example` but no code reads it.
- Effect: anyone who knows an admin's id and current `sessionVersion` can forge the cookie.
- Fix: sign or encrypt the cookie with `SESSION_SECRET` (HMAC or a JWT-style token) and verify it in `verifyAdmin()`.

### P-003 | Protected admin layout does not block anyone
- Where: `app/admin/admin/(protected)/layout.tsx` calls `verifyAdmin()` and ignores the result. `(protected)/page.tsx` also does not redirect when it returns `null`.
- Effect: an unauthenticated visitor sees the protected page (with "N/A" values). Any future protected page that forgets its own check is open.
- Fix: `redirect("/admin/admin/login")` when `verifyAdmin()` returns `null`, in the layout and in every protected page and server action.

## Medium

### P-004 | npm scripts `db:dev` and `admin:create` are missing
- Where: referenced in `.env.example` and in comments in `scripts_ts/dev-db.ts` and `scripts_ts/create-admin.ts`; not defined in `package.json`.
- Effect: there is no documented way to start the local DB or create the first admin. The scripts also read `.env.local`, but nothing loads it outside Next.
- Fix: add scripts, for example `"db:dev": "tsx scripts_ts/dev-db.ts"` and `"admin:create": "tsx --env-file=.env.local scripts_ts/create-admin.ts"`. This needs `tsx` as a devDependency (not installed).

### P-005 | Admin URL is `/admin/admin`
- Where: folder `app/admin/admin/...`. `LoginForm` and the login page redirect to `/admin` and `/admin/admin` inconsistently (`login/page.tsx` redirects to `/admin`, which has no page).
- Effect: an already logged-in admin visiting the login page is sent to a 404.
- Fix: flatten to `app/admin/...` (or `app/(admin)/admin/...`) and make all redirects point to one path.

### P-006 | Site Navbar and Footer wrap the admin pages
- Where: `app/layout.tsx` is the only root layout, so `/admin/admin/*` also gets the public Navbar and Footer. The comment in the admin layout ("no Navbar / Footer") is not true.
- Fix: use route-group root layouts (`app/(site)/layout.tsx` with Navbar/Footer, `app/(admin)/layout.tsx` without), each with its own `<html>`/`<body>`, or move Navbar and Footer into `(site)`.

### P-007 | Client component imports a server-only module
- Where: `components/admin/AuthSuccess.tsx` does `import { VerifiedAdmin } from "@/lib/dal"`; `lib/dal.ts` uses `next/headers`.
- Effect: currently erased because it is only a type, but a small change could pull server code into the browser bundle.
- Fix: use `import type { VerifiedAdmin }`, or move the interface to `types/index.ts`.

### P-008 | Lockout fields and role are never used
- Where: `Admin.failedAttempts` and `lockUntil` (model) are not read anywhere; `role` ("admin" | "superadmin") is not checked. `scripts_ts/create-admin.ts` always creates role `admin`.
- Fix: implement together with P-001. Use atomic updates (`findOneAndUpdate` with `$inc`) for the counter to avoid races.

### P-009 | Page file is a component file
- Where: `components/about-us/page.tsx` is the real `/about-us` page (exports `metadata`); `app/(site)/about-us/page.tsx` only re-exports it.
- Effect: confusing, and it breaks the "pages only in `app/`" rule. It is also the only `page.tsx` outside `app/`.
- Fix: move the content into `app/(site)/about-us/page.tsx` and rename the component (for example `AboutPage.tsx`).

## Low

### P-010 | Unused images in `public/`
- About 47 of 192 files have no reference in the code (full list: `public/AGENT_CONTEXT.md` → "Unused assets"). Examples: `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `enroll-section-bg.png` (1.7 MB), `home/counselling-screenshot.png`, `home/partner/card-bg-*.png`, `about-us/delhi.webp`, `about-us/chhattisgarh.webp`, `about-us/uttarakhand.webp`.
- The check only sees exact path strings, so verify manually before deleting (do not delete without asking).

### P-011 | Very large images
- `public/` totals 59.4 MB. Several files are over 500 KB, and an SVG (`home/onetoone.svg`) is about 1 MB. See "Large files" in `public/AGENT_CONTEXT.md`. Fix by compressing, resizing, or converting to webp.

### P-012 | Unused component
- `components/ui/Faq.tsx` is imported by nothing (graph "Orphans"). Either use it on a page or remove it.

### P-013 | Weak typing in the root layout
- `app/layout.tsx` types `children` as `any`; `decisions.md` rules say avoid `any`. Use `ReactNode`. The metadata is also generic ("My Study Hub").

### P-014 | Fonts are loaded two ways
- `app/layout.tsx` loads Geist via `next/font`, while `app/globals.css` also `@import`s many Google fonts (Poppins, Lexend, Inter, ...) from a CSS URL. The layout comment says to avoid `@import url(...)`. The CSS import blocks rendering and the fonts are not self-hosted. Move them to `next/font`.

### P-015 | Content and types not connected
- Blogs, brochures, events, team members and universities are hard-coded in page/component files. The interfaces in `types/index.ts` are used by only 2 files. Plan: put data in typed modules or the DB.

### P-016 | Docs out of date
- `decisions.md` D-001 says `strict: false`, but `tsconfig.json` now has `strict: true`. It also lists `.js` files that are now `.tsx`.
- `README.md` is the unmodified create-next-app text.
- `web-stories` page is only a banner placeholder. The package name in `package.json` is still `my-app`.
