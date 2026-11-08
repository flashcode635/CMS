# Directory: components/partner-with-us

Primary Purpose: Sections for the B2B Partner With Us page (`/about-us/partner-with-us`): value proposition, benefit cards, partnership scope, photo mosaic, contact/inquiry band, and exclusive university showcase.

Route composition (`app/(site)/about-us/partner-with-us/page.tsx`, page background `#e8f0f9`):
`PageBanner` (title "Partner With Us", background `/home/about-graduation.png`, `overlayOpacity={0.5}`) → `PartnerBenefits` → `PartnershipScope` → `BenefitsGallery` → `PartnerContactSection` → `ExclusiveUniversities` → `FaqSection`.
`WhyPartnerWithUs` is imported and **commented out** (`{/* <WhyPartnerWithUs /> */}`), so it is currently unused at runtime.

## Files

### `PartnerBenefits.tsx`

[PartnerBenefits.tsx]: Four partner-benefit cards, rendered as two separate mobile/desktop layouts.

- **Runtime:** server component (no `"use client"`; imports only `next/image`).
- **Purpose:** Section 3: "Why Partner with Us for MBBS Overseas?" with four advantages (expert guidance, network, support, ethics).
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none.
- **Constants & types:**
  - `BENEFITS` — 4 objects, shape `{ id: number; desktopIcon: string; mobileIcon: string; title: string; desktopBody: string; mobileBody: string }`:
    1. "Expert Guidance" — desktop body mentions "Partnering with My Study Hub means aligning with a trusted advisor for aspiring medical professionals.", mobile body truncates at "…trusted advisor.";
    2. "Vast Network" — desktop includes "…students seeking guidance on studying medicine overseas.", mobile ends "Expand your reach.";
    3. "Comprehensive Support" — desktop ends "…support they need to succeed.", mobile ends "…at every step.";
    4. "Ethical Practices" — desktop mentions "My Study Hub" and "integrity, transparency, and professionalism", mobile ends "…associating your brand with integrity."
  - All eight icon values are `https://www.figma.com/api/mcp/asset/...` URLs (external, expiring Figma exports); there are distinct desktop/mobile icons for each card.
  - `cardBase` — shared class string: `bg-white border border-brand-sky/60 w-full flex flex-col gap-2 rounded-lg rounded-tr-[52px] xl:rounded-tr-[50px] rounded-bl-[52px] xl:rounded-bl-[50px] shadow-[0px_10px_30px_rgba(88,92,95,0.1)] transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0px_20px_40px_rgba(49,99,255,0.15)] hover:border-brand-blue`.
  - No exported types.
- **Data flow:** static `BENEFITS.map` twice (mobile branch and desktop branch).
- **Dependencies:** `next/image` (`fill`, `unoptimized`).
- **Consumers:** `app/(site)/about-us/partner-with-us/page.tsx` (line 8 / rendered at line 37).
- **Notes:**
  - Section background: `linear-gradient(128.76deg, rgba(0,146,63,0.06) 12.704%, rgba(49,99,255,0.06) 87.17%)`.
  - **Mobile (`flex sm:hidden`)**: `px-5 py-12`, left-aligned heading `text-2xl`, card padding `p-5`, icon `w-11 h-11`, body `text-xs`, title `text-lg`.
  - **Desktop (`hidden sm:flex`)**: `max-w-350 mx-auto px-3 lg:px-6 xl:px-10 py-14 lg:py-16`, centered heading `text-3xl md:text-4xl lg:text-[42px]`, body `max-w-240`, grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4`, cards `p-4 lg:p-5 text-justify`, icon `w-12 h-12 lg:w-14 lg:h-14`, body `text-[13px]`.
  - The typography mismatch between branches (different heading sizes, body strings, icon sizes) is intentional Figma parity but doubles the maintenance surface: a copy edit must be made in both `desktopBody`/`mobileBody` and both JSX blocks.
  - Cards are styled `cursor-pointer` with hover lift but have **no link or click handler**.
  - The mobile and desktop branches both render at once in the DOM (one is `display:none` via breakpoint classes), so duplicated text exists in the accessibility tree only once — acceptable, but `display:none` content is still in the HTML payload.

### `PartnershipScope.tsx`

[PartnershipScope.tsx]: "Who Can Partner With Us?" — four tinted cards (universities, businesses, government/NGOs, tech providers).

- **Runtime:** server component (no directive; `next/image` only).
- **Purpose:** Section 4: enumerates the four partner categories, desktop row vs mobile stack.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none.
- **Constants & types:**
  - `PARTNERS` — 4 objects `{ id: number; variant: "blue" | "green"; desktopIcon: string; mobileIcon: string; title: string; subtitle: string }`:
    1. `blue` / "Universities & Institutes" / "(Student exchanges, research collaborations)";
    2. `green` / "Businesses & Corporates" / "(Sponsorships, training programs)";
    3. `blue` / "Government & NGOs" / "(Community development projects)";
    4. `green` / "Technology & Service Providers" / "(Joint ventures, digital solutions)".
  - `VARIANT: Record<string, { bg: string; border: string }>` — `blue → bg-[#e9eeff] / border-[rgba(49,99,255,0.5)]`; `green → bg-[#ecffef] / border-[rgba(0,86,37,0.5)]`.
  - Icons: card 1 `desktopIcon: "/country/universityselect.svg"` (local, **missing from `public/`**), the rest are Figma asset URLs; every card has a separate `mobileIcon`.
- **Data flow:** static array → desktop `.map` and mobile `.map`.
- **Dependencies:** `next/image`.
- **Consumers:** `app/(site)/about-us/partner-with-us/page.tsx` (line 9 / rendered at line 40).
- **Notes:**
  - Wrapper: `px-4 sm:px-8 lg:px-8 xl:px-10 py-12 lg:py-16`, `max-w-[1784px]`, heading `<h2>` "Who Can Partner With Us?" (Inter extrabold, `text-2xl sm:text-3xl lg:text-4xl`).
  - Desktop card: `flex flex-col gap-3 p-4 pb-3 flex-1 min-w-55 border … rounded-tl-md rounded-tr-[70px] rounded-br-md rounded-bl-md shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)] hover:-translate-y-2`, icon box `w-12 h-12 bg-[#d2ddff]`, title `'DM Serif Display'` 14px, subtitle `'Lexend'` **9px** (`text-[9px]`) — very small.
  - Mobile card: `p-5`, `rounded-tl-xl rounded-tr-[48px] rounded-br-xl rounded-bl-xl`, icon `w-10 h-10`, title 16px semibold, subtitle 12px light.
  - The file header says "Icon: 64px" but the desktop icon box is 48×48 (`w-12 h-12`) and `sizes="60px"` — three inconsistent values, same as `collegeCards`.
  - **Broken asset:** `/country/universityselect.svg` does not exist in this repo (no `public/country/` directory), so the first desktop card shows an empty/alt-text icon. The mobile variant of that card uses a Figma URL and is unaffected.
  - No title→link wiring; cards are presentational.

### `BenefitsGallery.tsx`

[BenefitsGallery.tsx]: Three-column photo mosaic (with a tall centre tile) plus a gradient CTA.

- **Runtime:** server component (no directive).
- **Purpose:** Section 5: "Benefits of Partnership" heading + five captioned photos (four on mobile) + CTA. Purely visual filler between the scope cards and the contact band.
- **Props:** none on the exported component. Internal `PhotoTile` takes `{ photo: PhotoItem; height?: number; width?: number }` with defaults `height = 260`, `width` undefined → `"100%"`.
- **State & effects:** none.
- **Handlers / functions:** local `ArrowRight()` — 16×16 SVG with `stroke="white"` (hard-coded, meant for the gradient button).
- **Constants & types:**
  - `PHOTOS` — object keyed by benefit, each `{ src: string; title: string; subtitle: string }`:
    - `sharedExpertise` — "Shared Expertise" / "Leverage our knowledge and resources."
    - `innovativeSolutions` — "Innovative Solutions" / "Co-create cutting-edge programs/services."
    - `skillExchange` — "Skill Exchange" / long placeholder ("Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title.")
    - `expandedReach` — "Expanded Reach" / "Access new audiences and markets."
    - `sustainableImpact` — "Sustainable Impact" / "Drive meaningful change together."
  - `MOBILE_PHOTOS` — 4 records `{ src, title }` reusing the same Unsplash IDs at `w=600`: Shared Expertise, Innovative Solutions, Skill Exchange, Expanded Reach. `sustainableImpact` is **omitted on mobile**.
  - `interface PhotoItem { src: string; title: string; subtitle?: string }`, `interface PhotoTileProps { photo: PhotoItem; height?: number; width?: number }`.
- **Data flow:** `PHOTOS` object destructured into desktop columns; `MOBILE_PHOTOS.map` for the mobile stack. All images are external Unsplash URLs.
- **Dependencies:** `next/image`, `@/components/ui/Button`.
- **Consumers:** `app/(site)/about-us/partner-with-us/page.tsx` (line 10 / rendered at line 43).
- **Notes:**
  - Section: `px-4 sm:px-8 lg:px-16 xl:px-20 py-12 lg:py-20`, `max-w-276.25`, `gap-14 lg:gap-17.5`.
  - Header: gradient `<h2>` "Benefits of Partnership" (`169.49deg`) + a **Lorem ipsum** subtitle ("Lorem ipsum dolor sit amet consectetur adipiscing elit mattis sit phasellus mollis sit aliquam sit nullam.") — visible placeholder copy.
  - Desktop mosaic (`hidden sm:flex gap-5.5 items-stretch`): left column fixed `width: 260` with two `PhotoTile`s (260×260); centre `flex-1 minHeight: 542` hand-rolled tile for `skillExchange` (label bottom `bottom-11 left-6 right-6`, title `'DM Serif Display'` 24px, subtitle `line-clamp-3`); right column fixed `width: 260` with `expandedReach` + `sustainableImpact` (260×260, label `bottom-3 left-3`).
  - Mobile stack (`flex sm:hidden flex-col gap-4`): each image `height: 240`, `rounded-xl`, a diagonal overlay `linear-gradient(53.9deg, rgba(0,0,0,0.867) 33.333%, rgba(0,0,0,0) 53.333%)`, title only (no subtitle), `bottom-4 left-4`.
  - `PhotoTile` overlays a bottom-heavy `bg-linear-to-t from-black/80 via-black/20 to-transparent` and zooms the image `group-hover:scale-105`.
  - CTA is a single `Button variant="brand"` with `rightIcon={<ArrowRight />}` and two label spans — `"Request Quote"` (`hidden sm:inline`) and `"Become a Partner"` (`sm:hidden`). It has **no `href`/`onClick`** → inert. The source comment claims two buttons; it is one responsive button.
  - The desktop mosaic is hard-coded to `width: 260` columns and will overflow its container on narrow-but-`sm` (640px) viewports: 260 + 260 + gap 22×2 = 564 plus the flexible centre, so the centre tile collapses to near-zero between 640–768px.
  - Every image uses `unoptimized`; the centre tile's `sizes="541px"` is a fixed hint.
  - The section's visual weight relies on stock photos of unrelated people/events (Unsplash), not partner-specific imagery.

### `PartnerContactSection.tsx`

[PartnerContactSection.tsx]: Dark contact band — map, contact cards, social links, and a floating glass inquiry form that fakes submission.

- **Runtime:** client (`"use client"`; the nested `ContactForm` uses `useState`).
- **Purpose:** Section 6: the page's conversion block, with company contact details + social handles + a partnership inquiry form.
- **Props:** none on the exported component. Internal `ContactForm({ dark = false }: { dark?: boolean })`; `ContactCard({ item }: { item: ContactItem })`; `SocialRow({ item, bordered = true }: { item: SocialItem; bordered?: boolean })`.
- **State & effects:**
  - `ContactForm` — `form = useState({ firstName:"", lastName:"", phone:"", email:"", org:"", country:"", city:"", state:"", message:"" })` and `submitted = useState(false)`. `useState` per instance, so the desktop and mobile forms are independent.
  - No effects, timers, or cleanup.
- **Handlers / functions:**
  - `set(k)` — curried change handler for `HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement`.
  - `handleSubmit(e)` — `e.preventDefault(); setSubmitted(true);` — **no `fetch`, endpoint, timeout, or redirect**. Purely local success state.
  - Success screen "Send Another Message" → `setSubmitted(false)` (fields keep their values).
  - Social rows are `<a target="_blank" rel="noopener noreferrer">`.
- **Constants & types:**
  - `CONTACT` — 3 records `{ icon: string; label: string; value: string }`:
    - "Helpline No." → `+91-9971944622, 011-40550609`
    - "Head Office" → `806, KLJ Tower, Pitampura, Delhi - 110034`
    - "Mail for info." → `contact@mystudyhub.com`
      Icons are Figma MCP asset URLs.
  - `SOCIALS` — 4 records `{ icon, handle, href }` for Facebook, Instagram, LinkedIn, and Pinterest. **All hrefs are bare platform homepages, not the actual profiles** — placeholder links.
  - `inputCls` — `w-full bg-white border border-[#d9dbde] rounded-lg px-6 text-[#536782] font-medium text-base placeholder-[#536782] outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 …`.
  - `interface ContactItem { icon: string; label: string; value: string }`, `interface SocialItem { icon: string; handle: string; href: string }`.
  - Local icon components: `ArrowRight({ size = 16 })` (white stroke), `ChevronDown()` (`#536782`), `ExtLink()` (diagonal arrow, white).
- **Form fields (all inside `ContactForm`):** First Name* (`text`), Last Name* (`text`), Phone Number* (`tel`), Email Address* (`email`), Organization Name (`text`), Country (`select` with disabled placeholder option and India/Russia/Georgia/Uzbekistan/Kazakhstan/Nepal), City* (`text`), State* (`text`), Details (`textarea rows={5}`). **No `required` attributes anywhere** despite the asterisks; no `name` attributes either. Submit is a `Button variant="brand" type="submit" fullWidth rightIcon={<ArrowRight />}` labelled `SUBMIT`.
- **Data flow:** local state only; contact/social data static. Map image is a Figma asset URL (desktop and mobile use **different** asset IDs).
- **Dependencies:** `react` (`useState`), `next/image`, `@/components/ui/Button`.
- **Consumers:** `app/(site)/about-us/partner-with-us/page.tsx` (line 11 / rendered at line 46).
- **Notes:**
  - The light header strip above the dark band is **entirely commented out**, including the copy "Get In Touch With us" — the section now starts directly on `#00142d`.
  - Desktop (`hidden lg:flex`): `px-25 py-25.75 gap-16`; left column holds a `h-108` rounded map, then two side-by-side columns each headed "Reach us through" (one for contacts, one for socials — duplicated heading, likely a copy bug), then the form in a fixed `w-176.25` right column.
  - Mobile (`flex lg:hidden`): map → form → contact list → socials, all stacked; map wrapper is `h-[60]` (**unit-less arbitrary value**, almost certainly meant `h-60` = 240px; browsers drop the declaration, so the image collapses/falls back to fill behaviour). Mobile contact cards use `bg-white/5` instead of the desktop gradient.
  - Desktop contact card: `border border-brand-green` with `linear-gradient(145.45deg, rgba(0,146,63,0.16) …, rgba(49,99,255,0.16) …)`; socials use `divide-y divide-brand-green` plus `bordered={false}` (so the per-row border prop is bypassed and the divider is used instead).
  - `dark` only changes card radius/padding (`rounded-4xl p-8` vs `rounded-3xl p-3`) and `labelCls` is `"text-white"` in both branches — the branch is effectively cosmetic.
  - Success panel hard-codes `✓` text and `variant="brandSolid"` with `bg-brand-green` again.
  - A11y: placeholder-only inputs (no `<label>`/`htmlFor`), required fields not marked, no `aria-live` on the success panel, social links have no accessible name beyond the handle text.
  - Content duplication: "Reach us through" appears twice on desktop; the mobile version relabels the social block "Connect with us".
  - The desktop form's glass card (`bg-white/[0.08]`, `shadow-[0px_21px_30px_rgba(0,0,0,0.10)]`) sits on `#00142d`; input text is `#536782` on white inputs, so contrast is fine but the placeholder colour equals the text colour (weak affordance).

### `ExclusiveUniversities.tsx`

[ExclusiveUniversities.tsx]: Filterable grid of six partner universities (desktop image cards + mobile logo cards).

- **Runtime:** client (`"use client"`, `useState`).
- **Purpose:** Section 7: "Our Exclusive Universities" with three country filter pills.
- **Props:** none.
- **State & effects:** `const [active, setActive] = useState("russia")`. No effects.
- **Handlers / functions:** `onClick={() => setActive(f.key)}` on each filter pill. Filtering is pure derivation:
  `const visible = active === "russia" ? UNIVERSITIES : UNIVERSITIES.filter(u => u.filter === active);`
- **Constants & types:**
  - `UNIVERSITIES` — 6 records, shape `{ id: number; name: string; bg: string; logo: string; footerBg: string; mobileBg: string; mobileLogo: string; filter: "russia" | "georgia" | "kyrgyzstan" }`:
    1. Samara State Medical University — footer `#1d6eb7`, mobile bg `#dfe7f1`, `russia`
    2. Novosibirsk State University — `#77c043`, `#e7fcd8`, `russia`
    3. Kabardino-Balkarian State University — `#33588b`, `#d6e1f0`, `russia`
    4. Ural State Medical University — `#864b08`, `#ffedd4`, `russia`
    5. East European University — `#910b0b`, `#ffe1e1`, `georgia`
    6. International Black Sea University — `#2b62a6`, `#d6e1f0`, `kyrgyzstan`
       `bg`, `logo`, `mobileLogo` are all Unsplash photo URLs (i.e. the "logos" are stock photos, not university crests).
  - `FILTERS` — `{ russia, "MBBS In Russia" }`, `{ georgia, "MBBS In Georgia" }`, `{ kyrgyzstan, "MBBS In Kyrgyzstan" }`.
  - No exported types.
- **Data flow:** static array → filter by `active` → desktop grid `.map` and mobile grid `.map`.
- **Dependencies:** `@/components/homepage/univCard` (default `UnivCard`) — **imported but never rendered**; `react` (`useState`), `next/image`, `@/components/ui/Button`.
- **Consumers:** `app/(site)/about-us/partner-with-us/page.tsx` (line 12 / rendered at line 49).
- **Notes:**
  - Wrapper: `px-4 sm:px-6 lg:px-14 xl:px-16 py-14 lg:py-20`, `max-w-[1720px]`, `gap-10 lg:gap-12`.
  - Header: eyebrow "Our Partners" (`text-brand-royal`), `<h2>` "Our Exclusive Universities" (Poppins, `clamp(28px,4.17vw,64px)`), subtitle that is actually **form copy**: "Help us get to know you better. Fill in the details and our team will contact you within the next 24 hours!" — wrong section text. Header alignment switches `items-start` → `sm:items-center`.
  - **Filter bug:** selecting "MBBS In Russia" sets `active="russia"` and the derivation returns **all six** universities, including the Georgia and Kyrgyzstan entries. The other two tabs return just their one matching card. So the "Russia" tab is really "All".
  - Filter pills: `h-12 px-6 rounded-full`; active = gradient background (`140.2deg`) + white label; inactive = `border border-brand-green bg-white` with `bg-clip-text text-transparent` plus a nested gradient `<span>`. The inactive button also sets `text-transparent` on the button itself, so the label only shows through the child span.
  - Desktop (`hidden sm:grid sm:grid-cols-4 xl:grid-cols-6`) renders fixed `180×263` cards (`style={{ width: 180, height: 263 }}`), despite the header comment claiming 253×375 and a flex-wrap row. With six cards at `xl` the 180px fixed widths sit in `xl:grid-cols-6` columns.
  - Desktop card: background `Image fill` with `alt=""` + `aria-hidden`, centred logo `157×157` (`pb-12.5` offset), footer bar `height: 38` coloured by `footerBg` (rendered `mx-3 mb-3 rounded-xl`), name in Inter 12px. Hover lifts `-translate-y-2` + `shadow-xl`.
  - Mobile (`grid sm:hidden grid-cols-2 gap-4`): `height: 240` cards, logo area `flex-1` with `mobileBg`, logo box `w-20 h-20`, footer `h-12` with 11px Lexend text.
  - All images `unoptimized`; `sizes="253px"`, `"157px"`, `"80px"` are fixed hints.
  - `UnivCard` being imported-but-unused is a real dead dependency (and `UnivCard` itself is a client component pulling in `GloballyRecognizedUniversities` types), worth removing if this file is touched.
  - No link/CTA on the cards — the universities are not clickable.

### `WhyPartnerWithUs.tsx`

[WhyPartnerWithUs.tsx]: Centered gradient heading with a drop-cap intro paragraph.

- **Runtime:** server component (no directive, no imports at all).
- **Purpose:** Section 2: short "Why Partner With Us?" value proposition. **Currently not rendered** — the page imports it but has `{/* <WhyPartnerWithUs /> */}` commented out.
- **Props:** none.
- **State & effects:** none.
- **Handlers / functions:** none.
- **Constants & types:** none.
- **Data flow:** static markup; the only inline data is the exam-free prose.
- **Dependencies:** none.
- **Consumers:** imported by `app/(site)/about-us/partner-with-us/page.tsx` (line 7) but **not rendered**; effectively orphaned.
- **Notes:**
  - Section: `px-4 sm:px-8 lg:px-16 xl:px-24 py-12 lg:py-16`, `max-w-300`, centered.
  - Heading "Why Partner With Us?" is gradient-clipped (`165.04deg`) in Inter extrabold `clamp(28px,3.33vw,48px)`.
  - Body uses a **manual drop cap**: a `<span className="float-left mr-0.5 mt-1 leading-none">W</span>` followed by the text "elcome to My Study Hub, …". Assistive tech and copy/paste therefore split the word ("W" + "elcome"), and the float can collide with the first line on narrow widths.
  - Body: Lexend Light `clamp(14px,1.04vw,18px)`, line-height 27px, `maxWidth: 1156px`, colour `#606c83`; the phrase "collaboration and mutual growth" is bolded (Lexend 700) and the sentence ends with a period.
  - No CTA, no image. If re-enabled it would sit between `PageBanner` and `PartnerBenefits`, duplicating the "Why Partner with Us…" heading that `PartnerBenefits` already renders — one of the two should be removed.
