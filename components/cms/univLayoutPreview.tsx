"use client";

/**
 * University-page FE preview for the CMS dashboard (right pane fallback when a
 * live route is not selected). Composes the REAL section components — the same
 * ones `getOptions()` (components/universities/univNav.tsx) wires on the live
 * route — in the order defined by the entry's sections, so editor changes
 * (add/remove/reorder/label/visible/heading/body) show up on the preview.
 *
 * Per-section edits overlay the components' DEFAULT_CONTENT through
 * `withUniversityName`; empty inputs keep the default copy.
 */
import RussiaBanner from "@/components/countries/mbbs-russia/RussiaBanner";
import UnivNav, { type UnivOption } from "@/components/universities/univNav";
import StudentTestimonials from "@/components/universities/studentTestimonials";
import Faq from "@/components/ui/Faq";
import EventContactForm from "@/components/images/EventContactForm";
import { slugToUniversityName } from "@/components/universities/universityName";
import { getSectionOption } from "./sectionOptions";
import type { Entry, Section } from "@/types/types";
import { type ReactNode } from "react";
import {
  UNIVERSITY_SECTIONS,
  SectionErrorBoundary,
  buildSectionProps,
} from "./universitySectionRegistry";

type UnivLayoutPreviewProps = {
  selected: Entry;
  sections: Section[];
};

/* ---------- one section ---------- */
function UniversitySection({ section, name }: { section: Section; name: string }) {
  const option = getSectionOption(section.type);
  const anchor = option?.anchor ?? "";
  const def = UNIVERSITY_SECTIONS[section.type];
  const fields = option?.fields;

  /** build props: registry defaults -> heading/body alias -> entry's raw data */
  function propsFor(type: string): Record<string, unknown> {
    const overrideProps: Record<string, unknown> = { ...section.data };
    if (fields?.heading && section.data.heading) overrideProps[fields.heading] = section.data.heading;
    if (fields?.body && section.data.body) {
      overrideProps[fields.body] = fields.bodyList
        ? String(section.data.body).split("\n").filter(Boolean)
        : section.data.body;
    }
    // heading/body are editor aliases, not component props
    delete overrideProps.heading;
    delete overrideProps.body;
    return buildSectionProps(type, name, overrideProps);
  }

  let content: ReactNode = null;
  if (def) {
    content = <def.Component {...propsFor(section.type)} />;
  } else if (section.type === "testimonials") {
    content = <StudentTestimonials />;
  } else if (section.type === "faq") {
    content = <Faq />;
  } else if (section.type === "free-counselling") {
    content = <EventContactForm />;
  } else {
    // "content" / unknown -> generic text block
    content = (
      <section className="border-b border-slate-100 bg-white px-4 py-10 sm:px-8 lg:px-25">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
          {section.label}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-[#14213d] lg:text-2xl">
          {String(section.data.heading || "Section heading")}
        </h2>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-500">
          {String(section.data.body || "Section content preview.")}
        </p>
      </section>
    );
  }

  return (
    <div id={anchor || undefined} key={section.id}>
      <SectionErrorBoundary sectionName={section.label}>{content}</SectionErrorBoundary>
    </div>
  );
}

/* ---------- whole page ---------- */
export default function UnivLayoutPreview({ selected, sections }: UnivLayoutPreviewProps) {
  const name = selected.title || slugToUniversityName(selected.slug);
  const visible = sections.filter((s) => s.visible);

  // sticky sub-nav mirrors the live page but only lists the chosen sections
  const navOptions: UnivOption[] = visible.map((section, i) => ({
    id: i + 1,
    name: section.label,
    href: `#${getSectionOption(section.type)?.anchor || section.type}`,
  }));

  return (
    <div className="flex flex-col @container">
      {/* hero — driven by the entry's Details + Basic content fields */}
      <RussiaBanner
        sectionLabel={String(selected.data.heroLabel ?? `${name} hero banner`)}
        title={name}
        subtitle={
          String(selected.data.description || "") ||
          `Enroll at ${name} with expert guidance, ensuring a smooth application process.`
        }
        languages={String(selected.data.heroLanguages ?? "") || undefined}
        currency={String(selected.data.heroCurrency ?? "") || undefined}
      />
      <UnivNav options={navOptions} universityName={name} />

      {visible.map((section) => (
        <UniversitySection key={section.id} section={section} name={name} />
      ))}

      {visible.length === 0 && (
        <p className="border-t border-slate-100 bg-white p-8 text-center text-sm text-slate-400">
          Add sections in the editor to preview the page layout.
        </p>
      )}
    </div>
  );
}
