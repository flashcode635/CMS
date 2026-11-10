/**
 * Registry wiring the CMS preview to the REAL university section components —
 * the same ones `getOptions()` (components/universities/univNav.tsx) composes
 * on the live `/universities/[slug]` route.
 *
 * `buildSectionProps` produces the props for one section:
 *   DEFAULT_CONTENT -> withUniversityName(name) -> caller overrides
 * (`blankAnchorId` blanks `anchorId` on components that render their own
 * `id={anchorId}` so the anchor wrapper `<div id>` stays the only one).
 */
import type { ComponentType } from "react";
import UniversityOverview, { DEFAULT_CONTENT as OVERVIEW_DEFAULTS } from "@/components/universities/overview";
import AccreditationSection, { DEFAULT_CONTENT as ACCREDITATION_DEFAULTS } from "@/components/universities/accreditation";
import FmgeClassesSection, { DEFAULT_CONTENT as FMGE_DEFAULTS } from "@/components/universities/fmgeClasses";
import WhyChooseUsSection, { DEFAULT_CONTENT as WHY_CHOOSE_US_DEFAULTS } from "@/components/universities/whyChooseUs";
import AdvancedTrainingSection, { DEFAULT_CONTENT as ADVANCED_TRAINING_DEFAULTS } from "@/components/universities/advancedTraining";
import EligibilitySection, { DEFAULT_CONTENT as ELIGIBILITY_DEFAULTS } from "@/components/universities/eligibility";
import DurationSection, { DEFAULT_CONTENT as DURATION_DEFAULTS } from "@/components/universities/duration";
import AdmissionProcessSection, { DEFAULT_CONTENT as ADMISSION_DEFAULTS } from "@/components/universities/admissionProcess";
import DocumentsSection, { DEFAULT_CONTENT as DOCUMENTS_DEFAULTS } from "@/components/universities/documents";
import BenefitsSection, { DEFAULT_CONTENT as BENEFITS_DEFAULTS } from "@/components/universities/benefits";
import FeeStructureSection, { DEFAULT_CONTENT as FEES_DEFAULTS } from "@/components/universities/feesStructure";
import FacultySection, { DEFAULT_CONTENT as FACULTY_DEFAULTS } from "@/components/universities/faculty";
import HostelFacilitiesSection, { DEFAULT_CONTENT as HOSTEL_DEFAULTS } from "@/components/universities/hostelFacilities";
import EventsSection, { DEFAULT_CONTENT as EVENTS_DEFAULTS } from "@/components/universities/events";
import StudentTestimonials, { DEFAULT_CONTENT as TESTIMONIALS_DEFAULTS } from "@/components/universities/studentTestimonials";
import EventContactForm, { EVENT_CONTACT_DEFAULTS } from "@/components/images/EventContactForm";
import Faq, { FAQ_ITEMS } from "@/components/ui/Faq";
import { withUniversityName } from "@/components/universities/universityName";

export type UnivSectionDef = {
  Component: ComponentType<Record<string, unknown>>;
  defaults: Record<string, unknown>;
  blankAnchorId?: boolean;
};

export const UNIVERSITY_SECTIONS: Record<string, UnivSectionDef> = {
  overview: { Component: UniversityOverview, defaults: OVERVIEW_DEFAULTS },
  accreditation: { Component: AccreditationSection, defaults: ACCREDITATION_DEFAULTS, blankAnchorId: true },
  "fmge-classes": { Component: FmgeClassesSection, defaults: FMGE_DEFAULTS, blankAnchorId: true },
  "why-choose-us": { Component: WhyChooseUsSection, defaults: WHY_CHOOSE_US_DEFAULTS, blankAnchorId: true },
  "advanced-training": { Component: AdvancedTrainingSection, defaults: ADVANCED_TRAINING_DEFAULTS, blankAnchorId: true },
  eligibility: { Component: EligibilitySection, defaults: ELIGIBILITY_DEFAULTS, blankAnchorId: true },
  "mbbs-duration": { Component: DurationSection, defaults: DURATION_DEFAULTS, blankAnchorId: true },
  "admission-process": { Component: AdmissionProcessSection, defaults: ADMISSION_DEFAULTS },
  documents: { Component: DocumentsSection, defaults: DOCUMENTS_DEFAULTS },
  benefits: { Component: BenefitsSection, defaults: BENEFITS_DEFAULTS },
  "fees-structure": { Component: FeeStructureSection, defaults: FEES_DEFAULTS },
  faculty: { Component: FacultySection, defaults: FACULTY_DEFAULTS },
  "hostel-facilities": { Component: HostelFacilitiesSection, defaults: HOSTEL_DEFAULTS },
  events: { Component: EventsSection, defaults: EVENTS_DEFAULTS },
  testimonials: { Component: StudentTestimonials, defaults: TESTIMONIALS_DEFAULTS },
  /* in-page blocks, editable through the same registry */
  "free-counselling": { Component: EventContactForm, defaults: EVENT_CONTACT_DEFAULTS },
  faq: {
    Component: Faq,
    defaults: { heading: "Frequently Asked Questions", items: FAQ_ITEMS } as unknown as Record<string, unknown>,
  },
};

/** live-route nav name/anchor (univNav) -> registry type key */
export const UNIV_TYPE_BY_ANCHOR: Record<string, string> = {
  overview: "overview",
  accreditation: "accreditation",
  "fmge-classes": "fmge-classes",
  "why-choose-us": "why-choose-us",
  "advanced-training": "advanced-training",
  eligibility: "eligibility",
  "mbbs-duration": "mbbs-duration",
  "admission-process": "admission-process",
  documents: "documents",
  benefits: "benefits",
  "fees-structure": "fees-structure",
  faculty: "faculty",
  "hostel-facilities": "hostel-facilities",
  events: "events",
  "free-counselling": "free-counselling",
};

/** error boundary pattern copied from components/universities/sections.tsx */
import { Component, type ReactNode } from "react";

export class SectionErrorBoundary extends Component<
  { sectionName: string; children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) return null;
    return this.props.children;
  }
}

/** defaults -> name substitution -> caller overrides (straight prop names) */
export function buildSectionProps(
  type: string,
  name: string,
  overrideProps: Record<string, unknown> = {},
): Record<string, unknown> {
  const def = UNIVERSITY_SECTIONS[type];
  const props: Record<string, unknown> = { ...withUniversityName(def.defaults, name), ...overrideProps };
  if (def.blankAnchorId) props.anchorId = ""; // wrapper div carries the id
  return props;
}
