/**
 * Editor field schemas per section type (+ display names).
 *
 * Keys are the section components' real prop names (DEFAULT_CONTENT) for
 * universities, and `CountryContent` field names for countries (see
 * `lib/constants.tsx`). The editor seeds values from those sources and writes
 * changed values into `useCmsStore.overrides` (FE-only, never persisted).
 *
 * Field kinds:
 *  - "text"     single-line string
 *  - "textarea" multi-line string
 *  - "list"     textarea of lines -> string[] (simple bullet-style copy)
 *  - "icon"     searchable lucide picker -> kebab-case icon NAME ("" = none)
 *  - "select"   dropdown -> one of `options` ("" = keep the default)
 *  - "cards"    REPEATABLE CARD LIST -> Array<Record<string, string>>, one
 *               object per card, edited with add/delete/reorder in
 *               cardListEditor.tsx; `fields` declares the per-card sub-fields,
 *               `template` pre-fills newly added cards. Components receive the
 *               array directly, so any number of cards renders.
 */
import { SECTION_OPTIONS } from "./sectionOptions";

type FieldKind = "text" | "textarea" | "list" | "icon" | "select" | "cards";

export type FieldSpec = {
  key: string;
  label: string;
  kind: FieldKind;
  hint?: string;
  /** "cards": singular row label, e.g. "Card" / "Stage" (rendered as "Cards (n)"). */
  itemLabel?: string;
  /** "cards": sub-fields of one card ("icon"/"select" allowed as sub-fields too). */
  fields?: FieldSpec[];
  /** "cards": values for a newly added card. */
  template?: Record<string, string>;
  /** "select": choices ("" = default is always offered first). */
  options?: string[];
};

export type SectionSchema = {
  fields: FieldSpec[];
  /** true when the section's component doesn't accept content props yet */
  readOnly?: boolean;
};

const text = (key: string, label: string, hint?: string): FieldSpec => ({ key, label, kind: "text", hint });
const area = (key: string, label: string, hint?: string): FieldSpec => ({ key, label, kind: "textarea", hint });
const list = (key: string, label: string, hint?: string): FieldSpec => ({ key, label, kind: "list", hint });
const icon = (key: string, label: string, hint?: string): FieldSpec => ({ key, label, kind: "icon", hint });
const select = (key: string, label: string, options: string[], hint?: string): FieldSpec => ({
  key, label, kind: "select", options, hint,
});

/** cards(...) — a repeatable card list with per-card sub-fields. */
const cards = (
  key: string,
  label: string,
  itemLabel: string,
  fields: FieldSpec[],
  template?: Record<string, string>,
  hint?: string
): FieldSpec => ({ key, label, kind: "cards", itemLabel, fields, template, hint });

/* icon sub-field helper (shorter inside card field lists) */
const subIcon = (key = "icon", label = "Icon (lucide)"): FieldSpec => icon(key, label, "Leave empty for no icon");

/** ---------- universities (keys = university section component props) ---------- */
const UNIVERSITY_SCHEMAS: Record<string, SectionSchema> = {
  hero: {
    fields: [
      text("sectionLabel", "Banner aria-label"),
      text("title", "Hero title"),
      area("subtitle", "Hero subtitle"),
      text("rating", "Rating (e.g. 4.0)"),
      text("ratingLabel", "Rating label"),
      text("consultationLabel", "CTA label"),
      text("consultationHref", "CTA link"),
      text("languagesLabel", "Languages label"),
      text("languages", "Languages spoken"),
      text("currencyLabel", "Currency label"),
      text("currency", "Currency"),
    ],
  },
  overview: {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      list("paragraphs", "Paragraphs", "One paragraph per line"),
      text("ctaLabel", "Button label"),
      text("ctaHref", "Button link"),
      text("imageSrc", "Photo URL", "e.g. /home/univ-campus.jpg"),
      text("imageAlt", "Photo alt text"),
      text("badgeCount", "Badge number", "e.g. 14+ Years"),
      text("badgeText", "Badge caption"),
    ],
  },
  accreditation: {
    fields: [
      text("sectionLabel", "Section label"),
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading"),
      list("paragraphs", "Paragraphs", "One paragraph per line"),
      area("quote", "Quote"),
      text("checklistLabel", "Checklist heading"),
      list("checklist", "Checklist items", "One item per line"),
      cards(
        "cards",
        "Accreditation cards",
        "Card",
        [
          text("title", "Title"),
          area("description", "Description"),
          subIcon(),
          select("iconTone", "Icon chip colour", ["emerald", "champagne"], "Default (emerald)"),
        ],
        { title: "", description: "", icon: "", iconTone: "" }
      ),
      text("highlightTitle", "Highlight title"),
      area("highlightText", "Highlight text"),
      icon("highlightIcon", "Highlight icon (lucide)"),
    ],
  },
  "fmge-classes": {
    fields: [
      text("sectionLabel", "Section label"),
      text("title", "Title"),
      area("intro", "Intro"),
      cards(
        "features",
        "Feature rows",
        "Feature",
        [text("label", "Label"), subIcon()],
        { label: "", icon: "" }
      ),
      area("quote", "Quote"),
      text("videoUrl", "Video URL", "YouTube embed URL — empty shows the poster"),
      text("videoPoster", "Poster image URL", "Shown when no video URL is set"),
      text("videoTitle", "Video title"),
      text("videoCaption", "Video caption"),
      text("pathwaysTitle", "Pathways heading"),
      list("pathwaysParagraphs", "Pathways paragraphs", "One paragraph per line"),
      text("standardsLabel", "Standards label"),
      icon("standardsIcon", "Standards icon (lucide)"),
    ],
  },
  "why-choose-us": {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      area("subtitle", "Intro text"),
      cards(
        "reasons",
        "Reason cards",
        "Reason",
        [text("title", "Title"), area("description", "Description"), subIcon()],
        { title: "", description: "", icon: "" }
      ),
    ],
  },
  "advanced-training": {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      area("intro", "Intro"),
      list("highlights", "Highlight bullets", "One bullet per line"),
      text("imageSrc", "Photo URL", "e.g. /home/univ-campus.jpg"),
      text("imageAlt", "Photo alt text"),
    ],
  },
  eligibility: {
    fields: [
      text("sectionLabel", "Section label"),
      text("heading", "Heading"),
      area("intro", "Intro"),
      cards(
        "criteria",
        "Eligibility cards",
        "Criterion",
        [text("title", "Title"), area("description", "Description")],
        { title: "", description: "" }
      ),
      area("footer", "Footer note"),
    ],
  },
  "mbbs-duration": {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      text("totalLabel", "Total label"),
      text("totalDuration", "Total duration"),
      text("totalUnit", "Total unit"),
      text("cardTitle", "Card title"),
      area("cardIntro", "Card intro"),
      cards(
        "stages",
        "Stage cards",
        "Stage",
        [
          text("duration", "Badge (e.g. 5 YEARS)"),
          text("title", "Title"),
          text("label", "Short label"),
          text("description", "Description"),
          text("color", "Bar colour", "CSS colour, e.g. var(--color-brand-forest-deep)"),
        ],
        { duration: "", title: "", label: "", description: "", color: "" }
      ),
    ],
  },
  "admission-process": {
    fields: [
      text("sectionLabel", "Section label"),
      text("title", "Title"),
      area("subtitle", "Subtitle"),
      cards(
        "steps",
        "Step cards",
        "Step",
        [text("title", "Title"), area("description", "Description"), subIcon(), text("stepLabel", "Step label", "e.g. Step 1 — empty auto-numbers")],
        { title: "", description: "", icon: "", stepLabel: "" }
      ),
      text("ctaLabel", "Button label"),
      text("ctaHref", "Button link"),
      text("backgroundImageSrc", "Band background image URL", "e.g. /home/univ-campus.jpg"),
      text("imageAlt", "Background image alt text"),
    ],
  },
  documents: {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      list("paragraphs", "Intro paragraphs", "One paragraph per line"),
      cards(
        "items",
        "Document cards",
        "Document",
        [
          text("title", "Label"),
          subIcon(),
          select("tone", "Icon chip colour", ["blue", "red", "green"], "Default (blue)"),
        ],
        { title: "", icon: "", tone: "" }
      ),
      text("imageSrc", "Photo URL", "e.g. /bg-doctor.jpg"),
      text("imageAlt", "Photo alt text"),
    ],
  },
  benefits: {
    fields: [
      text("sectionLabel", "Section label"),
      text("eyebrow", "Eyebrow"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      cards(
        "benefits",
        "Benefit cards",
        "Benefit",
        [text("title", "Title"), area("description", "Description")],
        { title: "", description: "" }
      ),
      text("videoUrl", "Video URL", "YouTube embed URL — empty shows the poster"),
      text("videoTitle", "Video title"),
      text("videoBadge", "Video badge", "Channel/brand name on the overlay"),
      text("watchLabel", "Watch label"),
      text("videoPoster", "Poster image URL", "Shown when no video URL is set"),
    ],
  },
  "fees-structure": {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      cards(
        "cards",
        "Fee cards (per year)",
        "Fee card",
        [
          text("year", "Year (e.g. 1st Year)"),
          text("tag", "Tag (optional)"),
          list("rows", "Fee rows", "One per line: Label | Value (e.g. Tuition Fee | 4,50,000 RUB)"),
          text("total", "Total line"),
          select("highlight", "Highlight card", ["true"], "Normal"),
        ],
        { year: "", tag: "", rows: "", total: "", highlight: "" }
      ),
      text("approxLabel", "Approx. label"),
      text("approxTotal", "Approx. total"),
      area("messChargeNote", "Mess charge note"),
    ],
  },
  faculty: {
    fields: [
      text("sectionLabel", "Section label"),
      text("title", "Title"),
      area("intro", "Intro"),
      cards(
        "items",
        "Faculty cards",
        "Faculty",
        [text("label", "Name"), text("href", "Link (optional)")],
        { label: "", href: "" }
      ),
    ],
  },
  "hostel-facilities": {
    fields: [
      text("sectionLabel", "Section label"),
      text("eyebrow", "Eyebrow"),
      text("title", "Title"),
      area("intro", "Intro"),
      text("featuresHeading", "Features heading"),
      cards(
        "features",
        "Feature cards",
        "Feature",
        [
          text("title", "Title"),
          area("description", "Description"),
          text("imageSrc", "Image URL", "e.g. /home/univ-campus.jpg"),
          text("imageAlt", "Image alt text"),
        ],
        { title: "", description: "", imageSrc: "", imageAlt: "" }
      ),
      area("closingNote", "Closing note"),
      text("messEyebrow", "Mess eyebrow"),
      text("messTitle", "Mess title"),
      area("messIntro", "Mess intro"),
      list("messPoints", "Mess bullet points", "One point per line"),
      text("messImageSrc", "Mess photo URL", "e.g. /home/mbbs-abroad-kazakhstan.jpg"),
      text("messImageAlt", "Mess photo alt text"),
    ],
  },
  events: {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleMain", "Title (main)"),
      text("titleAccent", "Title (accent)"),
      list("paragraphs", "Paragraphs", "One paragraph per line"),
      text("eventImageSrc", "Event image URL"),
      text("imageAlt", "Event image alt text"),
    ],
  },
  testimonials: {
    fields: [
      text("sectionLabel", "Section label"),
      text("heading", "Heading"),
      area("subtitle", "Subtitle"),
      cards(
        "cards",
        "Testimonial cards",
        "Testimonial",
        [text("name", "Name"), text("role", "Role"), area("quote", "Quote"), text("image", "Image URL")],
        { name: "", role: "", quote: "", image: "" }
      ),
    ],
  },
  "free-counselling": {
    fields: [
      text("eyebrow", "Panel eyebrow"),
      text("heading", "Panel heading"),
      area("subtitle", "Panel subtitle"),
      text("phone", "Phone number"),
      text("email", "Email address"),
      text("address", "Head office address"),
      text("quoteLabel", "Quote label"),
      area("quote", "Quote"),
      text("formHeading", "Form heading"),
      area("formIntro", "Form intro"),
      list("courses", "Course options", "One course per line"),
    ],
  },
  faq: {
    fields: [
      text("heading", "FAQ heading"),
      cards(
        "items",
        "Questions",
        "Question",
        [text("question", "Question"), area("answer", "Answer")],
        { question: "", answer: "" }
      ),
    ],
  },
  content: {
    fields: [
      text("heading", "Heading"),
      area("body", "Body"),
    ],
  },
};

/** ---------- countries (keys = CountryContent fields from lib/constants.tsx) ---------- */
const COUNTRY_SCHEMAS: Record<string, SectionSchema> = {
  hero: {
    fields: [
      text("heroTitle", "Hero title"),
      area("heroSubtitle", "Hero subtitle"),
      text("languages", "Languages spoken"),
      text("currency", "Currency"),
    ],
  },
  intro: {
    fields: [
      text("introHeading", "Intro heading"),
      area("intro", "Intro highlight paragraph", "Paragraph shown in the intro highlight box"),
      list("introParagraphs", "Intro paragraphs", "One paragraph per line"),
    ],
  },
  "why-russia": {
    fields: [
      text("whyHeading", "Why heading"),
      list("whyPoints", "Why points", "One point per line"),
      list("whyExams", "Licensing exams chips", "One exam per line"),
      text("whyAdditionalLabel", "Additional label"),
      cards(
        "whyBenefits",
        "Benefit cards",
        "Benefit",
        [text("text", "Text"), subIcon()],
        { text: "", icon: "" }
      ),
      area("whyOutro", "Closing paragraph"),
    ],
  },
  eligibility: {
    fields: [
      text("eligibilityHeading", "Eligibility heading"),
      cards(
        "eligibilityCards",
        "Eligibility cards",
        "Card",
        [
          text("number", "Number", "Leave empty to auto-number (1., 2., …)"),
          text("title", "Title"),
          area("description", "Description"),
        ],
        { number: "", title: "", description: "" }
      ),
    ],
  },
  "ssmu-durations": {
    fields: [
      text("university", "University name"),
      text("totalYears", "Total years (number)"),
      cards(
        "stages",
        "Study stages",
        "Stage",
        [
          text("badge", "Badge (e.g. 5 YEARS)"),
          text("title", "Title"),
          area("description", "Description"),
          text("years", "Years (number)"),
        ],
        { badge: "", title: "", description: "", years: "" }
      ),
    ],
  },
  steps: {
    fields: [
      text("heading", "Documents heading"),
      list("intro", "Intro paragraphs", "One paragraph per line"),
      cards(
        "documents",
        "Document cards",
        "Document",
        [
          text("label", "Label"),
          subIcon(),
          select("tone", "Accent tone", ["red"], "Default (blue)"),
          select("wide", "Card width", ["wide"], "Normal"),
        ],
        { label: "", icon: "", tone: "", wide: "" }
      ),
    ],
  },
  admission: {
    fields: [
      text("heading", "Admission heading"),
      cards(
        "steps",
        "Step cards",
        "Step",
        [
          text("number", "Number", "Leave empty to auto-number (01, 02, …)"),
          text("title", "Title"),
          area("description", "Description"),
        ],
        { number: "", title: "", description: "" }
      ),
    ],
  },
  about: {
    fields: [
      text("heading", "About heading"),
      area("subtitle", "Banner subtitle"),
      list("paragraphs", "About paragraphs", "One paragraph per line"),
      cards(
        "facts",
        "Fact cards",
        "Fact",
        [
          text("label", "Label"),
          text("value", "Value"),
          subIcon(),
          select("wide", "Card width", ["wide"], "Normal"),
        ],
        { label: "", value: "", icon: "", wide: "" }
      ),
    ],
  },
  "free-counselling": {
    fields: [
      text("eyebrow", "Panel eyebrow"),
      text("heading", "Panel heading"),
      area("subtitle", "Panel subtitle"),
      text("phone", "Phone number"),
      text("email", "Email address"),
      text("address", "Head office address"),
      text("quoteLabel", "Quote label"),
      area("quote", "Quote"),
      text("formHeading", "Form heading"),
      area("formIntro", "Form intro"),
      list("courses", "Course options", "One course per line"),
    ],
  },
  "abroad-hero": {
    fields: [
      text("subtitle", "Eyebrow"),
      text("titlePrefix", "Title (first part)"),
      text("titleAccent", "Title (accent part)"),
      area("description", "Description"),
      text("descriptionEmphasis", "Description emphasis"),
      text("countriesDescription", "Countries sentence"),
      text("descriptionSuffix", "Description suffix"),
      text("ctaLabel", "Button label"),
      cards(
        "countries",
        "Country cards",
        "Country",
        [text("name", "Country name"), text("image", "Image URL", "e.g. /home/mbbs-abroad-russia.jpg")],
        { name: "", image: "" }
      ),
    ],
  },
  faq: {
    fields: [
      text("heading", "FAQ heading"),
      cards(
        "items",
        "Questions",
        "Question",
        [text("question", "Question"), area("answer", "Answer")],
        { question: "", answer: "" }
      ),
    ],
  },
};

export function getSectionSchema(active: "universities" | "countries", type: string): SectionSchema {
  return (active === "countries" ? COUNTRY_SCHEMAS[type] : UNIVERSITY_SCHEMAS[type]) ?? {
    fields: [],
    readOnly: true,
  };
}

export function getSectionLabel(active: "universities" | "countries", type: string): string {
  const countryNames: Record<string, string> = {
    hero: "Hero banner",
    intro: "Country intro",
    "why-russia": "Why this country",
    eligibility: "Eligibility",
    "ssmu-durations": "MBBS duration",
    steps: "Documents required",
    admission: "Admission process",
    about: "About the country",
    "free-counselling": "Free counselling block",
    "abroad-hero": "Top countries banner",
    faq: "FAQ",
  };
  if (active === "countries") return countryNames[type] ?? type;
  const univNames: Record<string, string> = {
    hero: "Hero banner",
    testimonials: "Student Testimonials",
    faq: "FAQ",
  };
  return univNames[type] ?? SECTION_OPTIONS.find((o) => o.type === type)?.name ?? type;
}
