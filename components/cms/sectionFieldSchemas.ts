/**
 * Editor field schemas per section type (+ display names).
 *
 * Keys are the section components' real prop names (DEFAULT_CONTENT) for
 * universities, and `CountryContent` field names for countries (see
 * `lib/constants.tsx`). The editor seeds values from those sources and writes
 * changed values into `useCmsStore.overrides` (FE-only, never persisted).
 */
import { SECTION_OPTIONS } from "./sectionOptions";

type FieldKind = "text" | "textarea" | "list";

export type FieldSpec = {
  key: string;
  label: string;
  kind: FieldKind;
  hint?: string;
};

export type SectionSchema = {
  fields: FieldSpec[];
  /** true when the section's component doesn't accept content props yet */
  readOnly?: boolean;
};

const text = (key: string, label: string, hint?: string): FieldSpec => ({ key, label, kind: "text", hint });
const area = (key: string, label: string, hint?: string): FieldSpec => ({ key, label, kind: "textarea", hint });
const list = (key: string, label: string, hint?: string): FieldSpec => ({ key, label, kind: "list", hint });

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
      text("highlightTitle", "Highlight title"),
      text("highlightText", "Highlight text"),
    ],
  },
  "fmge-classes": {
    fields: [
      text("sectionLabel", "Section label"),
      text("title", "Title"),
      area("intro", "Intro"),
      text("videoTitle", "Video title"),
      text("videoCaption", "Video caption"),
    ],
  },
  "why-choose-us": {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      area("subtitle", "Intro text"),
    ],
  },
  eligibility: {
    fields: [
      text("sectionLabel", "Section label"),
      text("heading", "Heading"),
      area("intro", "Intro"),
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
    ],
  },
  "admission-process": {
    fields: [
      text("sectionLabel", "Section label"),
      text("title", "Title"),
      area("subtitle", "Subtitle"),
      text("ctaLabel", "Button label"),
      text("ctaHref", "Button link"),
    ],
  },
  documents: {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      list("paragraphs", "Intro paragraphs", "One paragraph per line"),
    ],
  },
  benefits: {
    fields: [
      text("sectionLabel", "Section label"),
      text("eyebrow", "Eyebrow"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
    ],
  },
  "fees-structure": {
    fields: [
      text("sectionLabel", "Section label"),
      text("titleGreen", "Title (green part)"),
      text("titleBlue", "Title (blue part)"),
      text("approxLabel", "Approx. label"),
      text("approxTotal", "Approx. total"),
      area("messChargeNote", "Mess charge note"),
    ],
  },
  faculty: {
    fields: [text("sectionLabel", "Section label"), text("title", "Title"), area("intro", "Intro")],
  },
  "hostel-facilities": {
    fields: [
      text("sectionLabel", "Section label"),
      text("eyebrow", "Eyebrow"),
      text("title", "Title"),
      area("intro", "Intro"),
      text("featuresHeading", "Features heading"),
      area("closingNote", "Closing note"),
      text("messEyebrow", "Mess eyebrow"),
      text("messTitle", "Mess title"),
      area("messIntro", "Mess intro"),
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
      text("card1Name", "Card 1 name"),
      text("card1Role", "Card 1 role"),
      area("card1Quote", "Card 1 quote"),
      text("card1Image", "Card 1 image URL"),
      text("card2Name", "Card 2 name"),
      text("card2Role", "Card 2 role"),
      area("card2Quote", "Card 2 quote"),
      text("card2Image", "Card 2 image URL"),
      text("card3Name", "Card 3 name"),
      text("card3Role", "Card 3 role"),
      area("card3Quote", "Card 3 quote"),
      text("card3Image", "Card 3 image URL"),
      text("card4Name", "Card 4 name"),
      text("card4Role", "Card 4 role"),
      area("card4Quote", "Card 4 quote"),
      text("card4Image", "Card 4 image URL"),
    ],
  },
  "free-counselling": { fields: [], readOnly: true },
  faq: { fields: [], readOnly: true },
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
  intro: { fields: [area("intro", "Intro", "Intro paragraph under the hero")] },
  "why-russia": { fields: [list("whyPoints", "Why points", "One point per line")] },
  eligibility: { fields: [list("eligibility", "Eligibility criteria", "One criterion per line")] },
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
  };
  if (active === "countries") return countryNames[type] ?? type;
  const univNames: Record<string, string> = {
    hero: "Hero banner",
    testimonials: "Student Testimonials",
    faq: "FAQ",
  };
  return univNames[type] ?? SECTION_OPTIONS.find((o) => o.type === type)?.name ?? type;
}
