import type { Section } from "@/types/types";

/**
 * Section "options" for the CMS page editor.
 *
 * The university types mirror the live `/universities/[slug]` layout
 * (`getOptions()` in `components/universities/univNav.tsx` - same order, same
 * anchors), so adding a section in the dashboard composes the real page.
 *
 * `fields` describes which component prop each editor input feeds:
 * - `heading`: the single-line "Heading" input
 * - `body`:     the "Body" textarea (`bodyList` splits it into `string[]`)
 * Leaving them empty in the editor keeps the section component's default copy.
 */
export type SectionTypeKey =
  | "content"
  | "overview"
  | "accreditation"
  | "fmge-classes"
  | "why-choose-us"
  | "eligibility"
  | "mbbs-duration"
  | "admission-process"
  | "documents"
  | "benefits"
  | "fees-structure"
  | "faculty"
  | "hostel-facilities"
  | "events"
  | "free-counselling"
  | "testimonials"
  | "faq";

export type SectionFieldConfig = {
  heading?: string;
  body?: string;
  bodyList?: boolean;
};

export type SectionOption = {
  type: SectionTypeKey;
  /** Label in the "Add section" list and in the sticky sub-nav. */
  name: string;
  /** Anchor id (without "#") the wrapper div gets; "" when not on the nav. */
  anchor: string;
  fields?: SectionFieldConfig;
};

export const SECTION_OPTIONS: SectionOption[] = [
  { type: "content", name: "Text section", anchor: "", fields: { heading: "heading", body: "body" } },
  { type: "overview", name: "Overview", anchor: "overview", fields: { heading: "titleGreen", body: "paragraphs", bodyList: true } },
  { type: "accreditation", name: "Accreditation", anchor: "accreditation", fields: { heading: "heading", body: "paragraphs", bodyList: true } },
  { type: "fmge-classes", name: "FMGE Classes", anchor: "fmge-classes", fields: { heading: "title", body: "intro" } },
  { type: "why-choose-us", name: "Why Choose Us", anchor: "why-choose-us", fields: { heading: "titleGreen", body: "subtitle" } },
  { type: "eligibility", name: "Eligibility", anchor: "eligibility", fields: { heading: "heading", body: "intro" } },
  { type: "mbbs-duration", name: "MBBS Duration", anchor: "mbbs-duration", fields: { heading: "titleGreen", body: "cardIntro" } },
  { type: "admission-process", name: "Admission Process", anchor: "admission-process", fields: { heading: "title", body: "subtitle" } },
  { type: "documents", name: "Documents", anchor: "documents", fields: { heading: "titleGreen", body: "paragraphs", bodyList: true } },
  { type: "benefits", name: "Benefits", anchor: "benefits", fields: { heading: "titleGreen" } },
  { type: "fees-structure", name: "Fee Structure", anchor: "fees-structure", fields: { heading: "titleGreen" } },
  { type: "faculty", name: "Faculty", anchor: "faculty", fields: { heading: "title", body: "intro" } },
  { type: "hostel-facilities", name: "Hostel & Facilities", anchor: "hostel-facilities", fields: { heading: "title", body: "intro" } },
  { type: "events", name: "Events", anchor: "events", fields: { heading: "titleMain", body: "paragraphs", bodyList: true } },
  // free-counselling / testimonials / faq render their fixed components;
  // the editor only drives label, order and visibility for them.
  { type: "free-counselling", name: "Free Counselling", anchor: "free-counselling" },
  { type: "testimonials", name: "Student Testimonials", anchor: "" },
  { type: "faq", name: "FAQ", anchor: "faq" },
];

export function getSectionOption(type: string): SectionOption | undefined {
  return SECTION_OPTIONS.find((option) => option.type === type);
}

/** New empty section for the editor; `data` left empty so defaults survive. */
export function blankTypedSection(type: SectionTypeKey): Section {
  return {
    id: crypto.randomUUID(),
    type,
    label: getSectionOption(type)?.name ?? "New section",
    visible: true,
    data: {},
  };
}
