# Directory: components/contact-us

Primary Purpose: Hero banner for the `/contact-us` route. The rest of that page's body is `components/about-us/ContactSection.tsx`, so this folder holds only the top banner.

## Files

### `ContactHeroBanner.tsx`
[ContactHeroBanner.tsx]: Black, photo-backed hero banner with the "Contact Us" title for the contact page.

- **Runtime:** Server component (no `"use client"`, no hooks, no interactivity).
- **Purpose:** First block of `app/(site)/contact-us/page.tsx`, immediately followed by `ContactSection`. Matches a Figma design: black background, stethoscope photo at 45% opacity, "STUDY PALACE HUB" eyebrow, large "Contact Us" title, "Grow Together in Excellence" subtitle.
- **Props:** None.
- **State & effects:** None.
- **Handlers:** None.
- **Constants & types:** None. All values are inline: section `height: clamp(280px, 28vw, 420px)`, `background: "#000"`; image wrapper `opacity: 0.45`; bottom fade `height: "35%"` with `linear-gradient(to bottom, transparent, #000)`; eyebrow `fontSize: clamp(10px, 0.95vw, 15px)`, `letterSpacing: "3.4px"`; title `fontSize: clamp(36px, 5.5vw, 88px)`, `lineHeight: 1.05`, `textShadow: "0 2px 16px rgba(0,0,0,0.5)"`; subtitle `fontSize: clamp(13px, 1vw, 18px)`.
- **Data flow:** `<section className="relative w-full overflow-hidden flex items-center justify-center" aria-label="Contact Us banner">` → decorative image layer (`<Image src="/bg-doctor.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />` inside an `aria-hidden` div) → bottom fade div (`pointer-events-none`, `aria-hidden`) → content column (`relative z-10 flex flex-col items-center gap-3 text-center px-6`) with `<p>` eyebrow "Study Palace Hub" (uppercase via Tailwind, `tracking-[0.22em]`), `<h1>` "Contact Us" in `'Playfair Display', 'DM Serif Display', Georgia, serif` at weight 400, and `<p>` subtitle "Grow Together in Excellence" (`text-white/75`).
- **Dependencies:** `next/image` only. Public asset: `/bg-doctor.jpg` (repo root of `public/`, shared with `PageBanner` default and the Services page banner).
- **Consumers:** `app/(site)/contact-us/page.tsx`.
- **Notes:** Accessibility is sound for a decorative hero — the photo wrapper is `aria-hidden` with `alt=""`, text remains real DOM, and this is the page's only `<h1>` (the global `PageBanner` uses `h1` too, so do **not** add `PageBanner` above this component or the page will have two `h1`s). The header comment says the title is "large serif italic" but the code sets `fontStyle: "normal"` — the comment is stale. The image is `priority` and full-viewport-width, so it is the page's LCP element; keep `sizes="100vw"` if you swap it. Colours use `#000` rather than a brand token, and the bottom fade is tuned to blend into the mint/blue gradient at the top of `ContactSection` — changing either background will expose a visible seam.
