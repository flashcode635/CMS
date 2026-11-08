"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import ErrorPopup from "@/components/ui/ErrorPopup";
import EventContactForm from "@/components/images/EventContactForm";

import UniversityOverview, { DEFAULT_CONTENT as OVERVIEW_DEFAULTS } from "./overview";
import AccreditationSection, { DEFAULT_CONTENT as ACCREDITATION_DEFAULTS } from "./accreditation";
import EligibilitySection, { DEFAULT_CONTENT as ELIGIBILITY_DEFAULTS } from "./eligibility";
import FmgeClassesSection, { DEFAULT_CONTENT as FMGE_DEFAULTS } from "./fmgeClasses";
import WhyChooseUsSection, { DEFAULT_CONTENT as WHY_CHOOSE_US_DEFAULTS } from "./whyChooseUs";
import DurationSection, { DEFAULT_CONTENT as DURATION_DEFAULTS } from "./duration";
import AdmissionProcessSection, { DEFAULT_CONTENT as ADMISSION_DEFAULTS } from "./admissionProcess";
import DocumentsSection, { DEFAULT_CONTENT as DOCUMENTS_DEFAULTS } from "./documents";
import BenefitsSection, { DEFAULT_CONTENT as BENEFITS_DEFAULTS } from "./benefits";
import FeeStructureSection, { DEFAULT_CONTENT as FEES_DEFAULTS } from "./feesStructure";
import FacultySection, { DEFAULT_CONTENT as FACULTY_DEFAULTS } from "./faculty";
import HostelFacilitiesSection, { DEFAULT_CONTENT as HOSTEL_DEFAULTS } from "./hostelFacilities";
import EventsSection, { DEFAULT_CONTENT as EVENTS_DEFAULTS } from "./events";
import { withUniversityName } from "./universityName";

type UnivOption = {
    id: number;
    name: string;
    href: string;
    component?: ReactNode;
};

export type { UnivOption };

/**
 * Build the sub-nav `options` for a university.
 *
 * `universityName` (when given) replaces the hard-coded "Samara …" copy inside
 * every section's DEFAULT_CONTENT via `withUniversityName` — so the SAME
 * sections render the correct university for `/universities/[slug]`.
 * Call it without an argument to fall back to the default sample content
 * (e.g. when previewing outside the university route).
 */
export function getOptions(universityName?: string): UnivOption[] {
    const overview = withUniversityName(OVERVIEW_DEFAULTS, universityName);
    const accreditation = withUniversityName(ACCREDITATION_DEFAULTS, universityName);
    const eligibility = withUniversityName(ELIGIBILITY_DEFAULTS, universityName);
    const fmge = withUniversityName(FMGE_DEFAULTS, universityName);
    const whyChooseUs = withUniversityName(WHY_CHOOSE_US_DEFAULTS, universityName);
    const duration = withUniversityName(DURATION_DEFAULTS, universityName);
    // anchorId: "" — sections.tsx's wrapper <div id="mbbs-duration"> already
    // provides the anchor; keeping the section's own id would create a duplicate.
    const durationProps = { ...duration, anchorId: "" };
    const admissionProcess = withUniversityName(ADMISSION_DEFAULTS, universityName);
    const documents = withUniversityName(DOCUMENTS_DEFAULTS, universityName);
    const benefits = withUniversityName(BENEFITS_DEFAULTS, universityName);

    // Fee heading: "<Name> Medical University Fee 2026" would read awkwardly for
    // other universities, so compose it explicitly from the name instead.
    const feesBase = withUniversityName(FEES_DEFAULTS, universityName);
    const fees = universityName
        ? { ...feesBase, titleGreen: universityName, titleBlue: "Fee 2026" }
        : feesBase;
    const faculty = withUniversityName(FACULTY_DEFAULTS, universityName);
    const hostel = withUniversityName(HOSTEL_DEFAULTS, universityName);
    const events = withUniversityName(EVENTS_DEFAULTS, universityName);

    return [
        { id: 1, name: "Overview", href: "#overview", component: <UniversityOverview {...overview} /> },
        { id: 2, name: "Accreditation", href: "var(--color-muted)reditation", component: <AccreditationSection {...accreditation} /> },
        { id: 3, name: "FMGE Classes", href: "#fmge-classes", component: <FmgeClassesSection {...fmge} /> },
        { id: 4, name: "Why Choose Us", href: "#why-choose-us", component: <WhyChooseUsSection {...whyChooseUs} /> },
        { id: 5, name: "Eligibility", href: "#eligibility", component: <EligibilitySection {...eligibility} /> },
        { id: 6, name: "MBBS Duration", href: "#mbbs-duration", component: <DurationSection {...durationProps} /> },
        { id: 7, name: "Admission Process", href: "#admission-process", component: <AdmissionProcessSection {...admissionProcess} /> },
        { id: 8, name: "Documents", href: "#documents", component: <DocumentsSection {...documents} /> },
        { id: 9, name: "Benefits", href: "#benefits", component: <BenefitsSection {...benefits} /> },
        { id: 10, name: "Fee Structure", href: "var(--color-red-100)s-structure", component: <FeeStructureSection {...fees} /> },
        { id: 11, name: "Faculty", href: "var(--color-red-100)ulty", component: <FacultySection {...faculty} /> },
        { id: 12, name: "Hostel & Facilities", href: "#hostel-facilities", component: <HostelFacilitiesSection {...hostel} /> },
        { id: 13, name: "Events", href: "#events", component: <EventsSection {...events} /> },
        { id: 14, name: "Free Counselling", href: "#free-counselling", component: <EventContactForm /> },
    ];
}

export default function UnivNav({
  universityName,
  options: givenOptions,
}: {
  universityName?: string;
  /** Optional custom options (e.g. the CMS preview lists only the chosen sections). Falls back to getOptions(). */
  options?: UnivOption[];
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const options = givenOptions ?? getOptions(universityName);

  return (
    <>
      {errorMessage && (
        <ErrorPopup
          key={errorMessage}
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <nav
        className="sticky z-40 w-full bg-brand-forest-deep"
        style={{
          top: "calc(clamp(64px, 5.21vw, 100px) + 0.5rem)",
        }}
      >
        <ul className="flex min-h-11 items-stretch overflow-x-auto overscroll-x-contain
          text-xs font-medium text-white scrollbar-none [&::-webkit-scrollbar]:hidden
          @min-[1024px]:grid @min-[1024px]:min-h-10 @min-[1024px]:grid-flow-col @min-[1024px]:auto-cols-fr 
          @min-[1024px]:items-center @min-[1024px]:overflow-visible @min-[1024px]:text-[8px]">

          {options.map((option, index) => (
            <li
              key={option.id}
              className={`h-auto shrink-0 text-center @min-[1024px]:h-full @min-[1024px]:shrink ${
                index !== 0 ? "border-l-2 border-white/20" : ""
              }`}
            >
              <a
                href={option.href}
                onClick={(event) => {
                  if (!option.component) {
                    event.preventDefault();
                    setErrorMessage(
                      `${option.name} section is not available yet.`,
                    );
                  }
                }}
                className="flex h-full items-center justify-center whitespace-nowrap
                  px-4 py-3 text-center transition-colors hover:text-white
                  @min-[1024px]:whitespace-normal @min-[1024px]:px-1 @min-[1024px]:py-1 @min-[1024px]:wrap-break-words"
              >
                {option.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
