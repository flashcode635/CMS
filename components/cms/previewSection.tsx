"use client";

/**
 * Live preview in the CMS dashboard (rightmost pane).
 * Clicking a route under "Live routes" puts it in useCmsStore
 * (selectedCountry or selectedUniversity); this component renders that
 * page inline with ITS OWN content.
 * NOTE: never import the route pages (@/app/(site)/...) here — the country page
 * is a Server Component (generateMetadata) and breaks the client build.
 * Mirror their layout with the client-safe section components instead.
 *
 * Editable sections are wrapped in <SectionHitbox>: clicking one selects it for
 * editing, and store overrides (`useCmsStore.overrides`) are laid over the
 * content from lib/constants.tsx — FE-only, never persisted.
 */
import { type ComponentProps } from "react";
import RussiaBanner from "@/components/countries/mbbs-russia/RussiaBanner";
import CountryIntro from "@/components/countries/mbbs-russia/CountryIntro";
import WhyRussia from "@/components/countries/mbbs-russia/WhyRussia";
import EligibilitySection from "@/components/countries/mbbs-russia/EligibilitySection";
import SSMUDurations from "@/components/countries/mbbs-russia/ssmuDurations";
import StepsSSMU from "@/components/countries/mbbs-russia/stepsSSMU";
import AdmissionProcess from "@/components/countries/mbbs-russia/stepSection";
import EventContactForm from "@/components/images/EventContactForm";
import MBBSAbroadHero from "@/components/homepage/MBBSAbroadHero";
import AboutRussia from "@/components/countries/mbbs-russia/AboutRussia";
import UnivNav from "@/components/universities/univNav";
import StudentTestimonials from "@/components/universities/studentTestimonials";
import Faq from "@/components/ui/Faq";
import {
  COUNTRY_CONTENT,
  DEFAULT_COUNTRY_CONTENT,
  UNIVERSITY_CONTENT,
  getCountryContent,
  getUniversityContent,
} from "@/lib/constants";
import { useCmsStore } from "@/store/cmsStore";
import { SectionErrorBoundary, UNIVERSITY_SECTIONS, buildSectionProps, UNIV_TYPE_BY_ANCHOR } from "./universitySectionRegistry";
import SectionHitbox from "./sectionHitbox";
import { getOptions } from "@/components/universities/univNav";

export type CountryOption = { name: string; code: string; slug: string };

/** Country sections are prop-driven; all copy lives in lib/constants.tsx
 *  (COUNTRY_CONTENT), so any country can render the full page. */
// const RUSSIA_ONLY_SECTIONS = new Set(["russia"]);

/* ---------- country ---------- */
function CountryPreview({ slug }: { slug: string }) {
  const overrides = useCmsStore((s) => s.overrides);
  const pageKey = `c:${slug}`;
  const content = getCountryContent(slug);
  /* Country copy + neutral defaults for sections the country hasn't filled
     yet — the single source is lib/constants.tsx (COUNTRY_CONTENT). */
  const c = { ...DEFAULT_COUNTRY_CONTENT, ...content };
  const ov = (type: string) => overrides[`${pageKey}:${type}`] ?? {};

  return (
    <div className="flex flex-col @container">
      <SectionHitbox pageKey={pageKey} type="hero">
        <RussiaBanner
          title={String(ov("hero").heroTitle ?? content.heroTitle)}
          subtitle={String(ov("hero").heroSubtitle ?? content.heroSubtitle)}
          languages={String(ov("hero").languages ?? content.languages)}
          currency={String(ov("hero").currency ?? content.currency)}
        />
      </SectionHitbox>
      <SectionHitbox pageKey={pageKey} type="intro">
        <CountryIntro
          heading={String(ov("intro").introHeading ?? c.introHeading)}
          paragraphs={c.introParagraphs}
          intro={String(ov("intro").intro ?? c.intro)}
        />
      </SectionHitbox>
      <SectionHitbox pageKey={pageKey} type="why-russia">
        <WhyRussia
          points={(ov("why-russia").whyPoints as string[] | undefined) ?? c.whyPoints}
          heading={String(ov("why-russia").whyHeading ?? c.whyHeading)}
          exams={c.whyExams}
          additionalLabel={c.whyAdditionalLabel}
          benefits={c.whyBenefits}
          outro={c.whyOutro}
        />
      </SectionHitbox>
      <SectionHitbox pageKey={pageKey} type="eligibility" readOnly>
        <EligibilitySection heading={c.eligibilityHeading} cards={c.eligibilityCards} />
      </SectionHitbox>

      <>
          <SectionHitbox pageKey={pageKey} type="ssmu-durations" readOnly>
            <SSMUDurations
              university={c.durations?.university}
              totalYears={c.durations?.totalYears}
              stages={c.durations?.stages}
            />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="steps" readOnly>
            <StepsSSMU
              heading={c.documents?.heading}
              intro={c.documents?.intro}
              documents={c.documents?.items}
            />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="admission" readOnly>
            <AdmissionProcess heading={c.admissionHeading} steps={c.admissionSteps} />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="free-counselling" readOnly>
            <EventContactForm />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="abroad-hero" readOnly>
            <MBBSAbroadHero />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="about" readOnly>
            <AboutRussia
              heading={c.about?.heading}
              subtitle={c.about?.subtitle}
              paragraphs={c.about?.paragraphs}
              facts={c.about?.facts}
            />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="faq" readOnly>
            <Faq />
          </SectionHitbox>
      </>
      <EditorHint />
    </div>
  );
}

/** small tail hint in the preview explaining the click-to-edit flow */
function EditorHint() {
  const activeSection = useCmsStore((s) => s.activeSection);
  if (activeSection) return null; // don't shout over an active selection
  return (
    <p className="border-t border-slate-100 bg-white p-4 text-center text-xs text-slate-400">
      Click any section in this preview to edit its content. Sections without an
      editor yet stay view-only.
    </p>
  );
}

/* ---------- university ---------- */
function UniversityPreview({ name, slug }: { name: string; slug: string }) {
  const overrides = useCmsStore((s) => s.overrides);
  const pageKey = `u:${slug}`;
  const content = getUniversityContent(slug);
  const hasOwnContent = slug in UNIVERSITY_CONTENT;
  const ov = (type: string) => overrides[`${pageKey}:${type}`] ?? {};

  // the live route's sections (in order), via the same components as univNav
  const options = getOptions(name);

  return (
    <div className="flex flex-col @container">
      <SectionHitbox pageKey={pageKey} type="hero">
        {/* spread covers every banner field the hero editor exposes */}
        <RussiaBanner
          {...(ov("hero") as Partial<ComponentProps<typeof RussiaBanner>>)}
          title={String(ov("hero").title ?? name)}
          subtitle={
            String(ov("hero").subtitle ??
              (hasOwnContent
                ? content.heroSubtitle
                : `Enroll at ${name} with expert guidance, ensuring a smooth application process.`))
          }
          rating={String(ov("hero").rating ?? content.rating)}
          ratingLabel={String(
            ov("hero").ratingLabel ?? `Rating: ${ov("hero").rating ?? content.rating} out of 5 stars`
          )}
          languages={String(ov("hero").languages ?? content.languages)}
          currency={String(ov("hero").currency ?? content.currency)}
        />
      </SectionHitbox>

      <UnivNav universityName={name} />

      {options.map((option) => {
        const type = UNIV_TYPE_BY_ANCHOR[option.href.slice(1)] ?? option.href.slice(1);
        const def = UNIVERSITY_SECTIONS[type];
        return (
          <div id={option.href.slice(1)} key={option.id}>
            <SectionErrorBoundary sectionName={option.name}>
              {def ? (
                <SectionHitbox pageKey={pageKey} type={type}>
                  <def.Component {...buildSectionProps(type, name, ov(type) as Record<string, unknown>)} />
                </SectionHitbox>
              ) : (
                <SectionHitbox pageKey={pageKey} type={type} readOnly>
                  <EventContactForm />
                </SectionHitbox>
              )}
            </SectionErrorBoundary>
          </div>
        );
      })}
      <SectionHitbox pageKey={pageKey} type="testimonials">
        <StudentTestimonials
          {...buildSectionProps("testimonials", name, ov("testimonials") as Record<string, unknown>)}
        />
      </SectionHitbox>
      <SectionHitbox pageKey={pageKey} type="faq" readOnly>
        <Faq />
      </SectionHitbox>
      <EditorHint />
    </div>
  );
}

/* ---------- entry ---------- */
export default function PreviewSection() {
  const selectedCountry = useCmsStore((s) => s.selectedCountry);
  const selectedUniversity = useCmsStore((s) => s.selectedUniversity);
  const clearPreview = useCmsStore((s) => s.clearPreview);

  if (!selectedCountry && !selectedUniversity) return null; // dashboard shows <Template /> then

  return (
    <div className="relative">
      <button
        onClick={clearPreview}
        className="absolute left-4 top-4 z-50 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#17233d] shadow-sm ring-1 ring-slate-200 transition hover:bg-white"
      >
        ← Back to editor
      </button>
      {/* key remounts the preview on every selection change */}
      {selectedCountry ? (
        <CountryPreview key={selectedCountry.slug} slug={selectedCountry.slug} />
      ) : selectedUniversity ? (
        <UniversityPreview
          key={selectedUniversity.slug}
          name={selectedUniversity.name}
          slug={selectedUniversity.slug}
        />
      ) : null}
    </div>
  );
}
