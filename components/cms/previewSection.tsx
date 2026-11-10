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
import { type ComponentProps, type ReactNode } from "react";
import RussiaBanner from "@/components/countries/mbbs-russia/RussiaBanner";
import CountryIntro from "@/components/countries/mbbs-russia/CountryIntro";
import WhyRussia from "@/components/countries/mbbs-russia/WhyRussia";
import EligibilitySection from "@/components/countries/mbbs-russia/EligibilitySection";
import SSMUDurations from "@/components/countries/mbbs-russia/ssmuDurations";
import StepsSSMU from "@/components/countries/mbbs-russia/stepsSSMU";
import AdmissionProcess from "@/components/countries/mbbs-russia/stepSection";
import EventContactForm, {
  EVENT_CONTACT_DEFAULTS,
} from "@/components/images/EventContactForm";
import MBBSAbroadHero, {
  DEFAULT_CONTENT as ABROAD_HERO_DEFAULTS,
} from "@/components/homepage/MBBSAbroadHero";
import AboutRussia from "@/components/countries/mbbs-russia/AboutRussia";
import UnivNav from "@/components/universities/univNav";
import StudentTestimonials from "@/components/universities/studentTestimonials";
import Faq, { FAQ_ITEMS } from "@/components/ui/Faq";
import {
  DEFAULT_COUNTRY_CONTENT,
  UNIVERSITY_CONTENT,
  getCountryContent,
  getUniversityContent,
} from "@/lib/constants";
import {
  parseBenefits,
  parseCountryCards,
  parseDocuments,
  parseEligibilityCards,
  parseFacts,
  parseFaq,
  parseStages,
  parseSteps,
} from "./sectionLines";
import { useCmsStore } from "@/store/cmsStore";
import { SectionErrorBoundary, UNIVERSITY_SECTIONS, buildSectionProps, UNIV_TYPE_BY_ANCHOR } from "./universitySectionRegistry";
import SectionHitbox from "./sectionHitbox";
import { getOptions } from "@/components/universities/univNav";

export type CountryOption = { name: string; code: string; slug: string };

/* Override-aware value helpers.
   s(): first non-nullish wins (overrides never carry empty strings — the
   editor filters them out — so an empty edit means "keep the default"). */
function s(value: unknown, fallback: string): string {
  return value == null ? fallback : String(value);
}
/** array overrides pass through only when they are real string arrays */
function strList(value: unknown, fallback: string[]): string[] {
  return Array.isArray(value) ? (value.filter((v) => typeof v === "string") as string[]) : fallback;
}

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
          heading={s(ov("intro").introHeading, c.introHeading ?? "")}
          paragraphs={
            Array.isArray(ov("intro").introParagraphs)
              ? (ov("intro").introParagraphs as string[])
              : c.introParagraphs ?? []
          }
          intro={s(ov("intro").intro, c.intro)}
        />
      </SectionHitbox>
      <SectionHitbox pageKey={pageKey} type="why-russia">
        <WhyRussia
          points={strList(ov("why-russia").whyPoints, c.whyPoints as string[])}
          heading={s(ov("why-russia").whyHeading, c.whyHeading ?? "")}
          exams={strList(ov("why-russia").whyExams, c.whyExams ?? [])}
          additionalLabel={s(ov("why-russia").whyAdditionalLabel, c.whyAdditionalLabel ?? "")}
          benefits={
            parseBenefits(ov("why-russia").whyBenefits) ?? c.whyBenefits ?? []
          }
          outro={(ov("why-russia").whyOutro as ReactNode | undefined) ?? c.whyOutro}
        />
      </SectionHitbox>
      <SectionHitbox pageKey={pageKey} type="eligibility">
        <EligibilitySection
          heading={s(ov("eligibility").eligibilityHeading, c.eligibilityHeading ?? "")}
          cards={
            parseEligibilityCards(ov("eligibility").eligibilityCards) ??
            c.eligibilityCards ??
            []
          }
        />
      </SectionHitbox>

      <>
          <SectionHitbox pageKey={pageKey} type="ssmu-durations">
            <SSMUDurations
              university={s(ov("ssmu-durations").university, c.durations?.university ?? "This University")}
              totalYears={
                Number(ov("ssmu-durations").totalYears ?? c.durations?.totalYears) ||
                c.durations?.totalYears ||
                6
              }
              stages={parseStages(ov("ssmu-durations").stages) ?? c.durations?.stages ?? []}
            />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="steps">
            <StepsSSMU
              heading={s(ov("steps").heading, c.documents?.heading ?? "")}
              intro={strList(ov("steps").intro, c.documents?.intro ?? [])}
              documents={parseDocuments(ov("steps").documents) ?? c.documents?.items ?? []}
            />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="admission">
            <AdmissionProcess
              heading={s(ov("admission").heading, c.admissionHeading ?? "")}
              steps={parseSteps(ov("admission").steps) ?? c.admissionSteps ?? []}
            />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="free-counselling">
            <EventContactForm
              eyebrow={s(ov("free-counselling").eyebrow, EVENT_CONTACT_DEFAULTS.eyebrow)}
              heading={s(ov("free-counselling").heading, EVENT_CONTACT_DEFAULTS.heading)}
              subtitle={s(ov("free-counselling").subtitle, EVENT_CONTACT_DEFAULTS.subtitle)}
              phone={s(ov("free-counselling").phone, EVENT_CONTACT_DEFAULTS.phone)}
              email={s(ov("free-counselling").email, EVENT_CONTACT_DEFAULTS.email)}
              address={s(ov("free-counselling").address, EVENT_CONTACT_DEFAULTS.address)}
              quoteLabel={s(ov("free-counselling").quoteLabel, EVENT_CONTACT_DEFAULTS.quoteLabel)}
              quote={s(ov("free-counselling").quote, EVENT_CONTACT_DEFAULTS.quote)}
              formHeading={s(ov("free-counselling").formHeading, EVENT_CONTACT_DEFAULTS.formHeading)}
              formIntro={s(ov("free-counselling").formIntro, EVENT_CONTACT_DEFAULTS.formIntro)}
              courses={strList(ov("free-counselling").courses, EVENT_CONTACT_DEFAULTS.courses)}
            />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="abroad-hero">
            <MBBSAbroadHero
              subtitle={s(ov("abroad-hero").subtitle, ABROAD_HERO_DEFAULTS.subtitle)}
              titlePrefix={s(ov("abroad-hero").titlePrefix, ABROAD_HERO_DEFAULTS.titlePrefix)}
              titleAccent={s(ov("abroad-hero").titleAccent, ABROAD_HERO_DEFAULTS.titleAccent)}
              description={s(ov("abroad-hero").description, ABROAD_HERO_DEFAULTS.description)}
              descriptionEmphasis={s(ov("abroad-hero").descriptionEmphasis, ABROAD_HERO_DEFAULTS.descriptionEmphasis)}
              countriesDescription={s(ov("abroad-hero").countriesDescription, ABROAD_HERO_DEFAULTS.countriesDescription)}
              descriptionSuffix={s(ov("abroad-hero").descriptionSuffix, ABROAD_HERO_DEFAULTS.descriptionSuffix)}
              ctaLabel={s(ov("abroad-hero").ctaLabel, ABROAD_HERO_DEFAULTS.ctaLabel)}
              countries={parseCountryCards(ov("abroad-hero").countries) ?? ABROAD_HERO_DEFAULTS.countries}
            />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="about">
            <AboutRussia
              heading={s(ov("about").heading, c.about?.heading ?? "")}
              subtitle={s(ov("about").subtitle, c.about?.subtitle ?? "")}
              paragraphs={
                Array.isArray(ov("about").paragraphs)
                  ? (ov("about").paragraphs as string[])
                  : c.about?.paragraphs ?? []
              }
              facts={parseFacts(ov("about").facts) ?? c.about?.facts ?? []}
            />
          </SectionHitbox>
          <SectionHitbox pageKey={pageKey} type="faq">
            <Faq
              heading={s(ov("faq").heading, "Frequently Asked Questions")}
              items={parseFaq(ov("faq").items) ?? FAQ_ITEMS}
            />
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
    <p className="border-t border-line bg-white p-4 text-center text-xs text-muted">
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
      <SectionHitbox pageKey={pageKey} type="faq">
        <Faq
          {...(buildSectionProps("faq", name, ov("faq") as Record<string, unknown>) as
            Partial<ComponentProps<typeof Faq>>)}
        />
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
        className="absolute left-4 top-4 z-50 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm ring-1 ring-line transition hover:bg-white"
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
