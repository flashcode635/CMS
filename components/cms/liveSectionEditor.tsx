"use client";

/**
 * Form pane shown while a live page preview is active.
 *
 * Flow: click a section in the preview (SectionHitbox) -> its data seeds from
 * `lib/constants.tsx` (countries) or the section component's DEFAULT_CONTENT
 * (universities, via withUniversityName) -> edits write into
 * `useCmsStore.overrides` -> the preview re-renders with the new values.
 *
 * Field kinds: text / textarea / list (liveSectionEditor FieldInput),
 * icon + select (fieldInputs.tsx) and "cards" — the repeatable card editor
 * (cardListEditor.tsx) used for every card list on the frontend.
 *
 * ONLY preview state — nothing here calls the content API, so changes are not
 * stored. "Revert"/"Reset edits" clears the in-memory overrides.
 */
import {
  getCountryContent,
  getUniversityContent,
  DEFAULT_COUNTRY_CONTENT,
  DEFAULT_CONTENT as RUSSIA_BANNER_DEFAULTS,
} from "@/lib/constants";
import { withUniversityName } from "@/components/universities/universityName";
import { FAQ_ITEMS } from "@/components/ui/Faq";
import { EVENT_CONTACT_DEFAULTS } from "@/components/images/EventContactForm";
import { DEFAULT_CONTENT as ABROAD_HERO_DEFAULTS } from "@/components/homepage/MBBSAbroadHero";
import {
  seedCountryCards,
  toPlainText,
} from "./sectionLines";
import {
  seedSchemaValues,
  toEditorLines,
  toEditorText,
} from "./editorValues";
import { MessageSquareWarning, RotateCcw, EyeOff } from "lucide-react";
import { useMemo } from "react";
import { Card, Field } from "./smallerComponents";
import { getSectionSchema, getSectionLabel, type FieldSpec } from "./sectionFieldSchemas";
import { UNIVERSITY_SECTIONS } from "./universitySectionRegistry";
import { useCmsStore } from "@/store/cmsStore";
import type { ContentType } from "@/types/types";
import CardListEditor, { type CardObject } from "./cardListEditor";
import { IconPicker, SelectInput, TextAreaInput, TextInput } from "./fieldInputs";

type LiveSectionEditorProps = { active: ContentType };

/* ---------- seed: content the section shows before any edit ---------- */
function getSectionSeed(active: ContentType, kind: string, slug: string, type: string): Record<string, unknown> {
  if (active === "countries") {
    /* Same merge the preview renders, so the editor opens with exactly the
       copy on screen. seedSchemaValues flattens every value (JSX, image
       objects, {label,value} rows) into editor-safe text — no [object Object]. */
    const c = { ...DEFAULT_COUNTRY_CONTENT, ...getCountryContent(slug) };
    const schema = getSectionSchema(active, type);
    const countrySeeds: Record<string, Record<string, unknown>> = {
      hero: {
        heroTitle: c.heroTitle,
        heroSubtitle: c.heroSubtitle,
        languages: c.languages,
        currency: c.currency,
      },
      intro: { introHeading: c.introHeading, intro: c.intro, introParagraphs: c.introParagraphs },
      "why-russia": {
        whyHeading: c.whyHeading,
        whyPoints: (c.whyPoints ?? []).map((p) => toPlainText(p)),
        whyExams: c.whyExams ?? [],
        whyAdditionalLabel: c.whyAdditionalLabel,
        whyBenefits: c.whyBenefits ?? [],
        whyOutro: toPlainText(c.whyOutro),
      },
      eligibility: {
        eligibilityHeading: c.eligibilityHeading,
        eligibilityCards: c.eligibilityCards ?? [],
      },
      "ssmu-durations": {
        university: c.durations?.university,
        totalYears: String(c.durations?.totalYears ?? ""),
        stages: c.durations?.stages ?? [],
      },
      steps: {
        heading: c.documents?.heading,
        intro: c.documents?.intro ?? [],
        documents: c.documents?.items ?? [],
      },
      admission: {
        heading: c.admissionHeading,
        steps: c.admissionSteps ?? [],
      },
      about: {
        heading: c.about?.heading,
        subtitle: c.about?.subtitle,
        paragraphs: (c.about?.paragraphs ?? []).map((p) => toPlainText(p)),
        facts: c.about?.facts ?? [],
      },
      "free-counselling": { ...EVENT_CONTACT_DEFAULTS },
      "abroad-hero": {
        subtitle: ABROAD_HERO_DEFAULTS.subtitle,
        titlePrefix: ABROAD_HERO_DEFAULTS.titlePrefix,
        titleAccent: ABROAD_HERO_DEFAULTS.titleAccent,
        description: ABROAD_HERO_DEFAULTS.description,
        descriptionEmphasis: ABROAD_HERO_DEFAULTS.descriptionEmphasis,
        countriesDescription: ABROAD_HERO_DEFAULTS.countriesDescription,
        descriptionSuffix: ABROAD_HERO_DEFAULTS.descriptionSuffix,
        ctaLabel: ABROAD_HERO_DEFAULTS.ctaLabel,
        countries: seedCountryCards(ABROAD_HERO_DEFAULTS.countries),
      },
      faq: {
        heading: "Frequently Asked Questions",
        items: FAQ_ITEMS,
      },
    };
    const source = countrySeeds[type] ?? {};
    // normalize through the schema so card lists / lists / text are editor-safe
    return seedSchemaValues(schema.fields, source);
  }

  const name = getUniversityContent(slug).name;
  if (type === "hero") {
    const u = getUniversityContent(slug);
    const heroSource: Record<string, unknown> = {
      // banner defaults first, then the university's own constants
      ...RUSSIA_BANNER_DEFAULTS,
      sectionLabel: `${name} hero banner`,
      title: u.heroTitle,
      subtitle: u.heroSubtitle,
      rating: u.rating,
      ratingLabel: `Rating: ${u.rating} out of 5 stars`,
      languages: u.languages,
      currency: u.currency,
    };
    const schema = getSectionSchema(active, type);
    return seedSchemaValues(schema.fields, heroSource);
  }

  const def = UNIVERSITY_SECTIONS[type];
  if (!def) return {};
  const schema = getSectionSchema(active, type);
  const source = withUniversityName(def.defaults, name) as Record<string, unknown>;
  // DEFAULT_CONTENTs already carry every editor key (schemas mirror the props)
  return seedSchemaValues(schema.fields, source);
}

/** empty editor values mean "keep the default copy" — filter them out */
function effectiveOverrides(edited: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(edited).filter(
      ([, v]) => v !== "" && !(Array.isArray(v) && v.length === 0)
    )
  );
}

/* ---------- one field ---------- */
function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldSpec;
  value: unknown;
  onChange: (next: string | string[] | CardObject[]) => void;
}) {
  // editor-safe text: ReactNode -> text, image objects -> URL, arrays -> lines
  const stringValue =
    field.kind === "list"
      ? toEditorLines(value).join("\n")
      : toEditorText(value);
  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink sm:text-sm " +
    "placeholder:text-muted outline-none transition " +
    "hover:border-line-strong focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";

  /* repeatable card list -> CardListEditor */
  if (field.kind === "cards") {
    const cardObjects: CardObject[] = Array.isArray(value)
      ? (value.filter(
          (v): v is CardObject => !!v && typeof v === "object" && !Array.isArray(v)
        ) as CardObject[])
      : [];
    return (
      <CardListEditor
        value={cardObjects}
        fields={field.fields ?? []}
        itemLabel={field.itemLabel ?? "Card"}
        template={field.template}
        onChange={(next) => onChange(next)}
      />
    );
  }

  return (
    <Field label={field.label}>
      {field.kind === "text" && (
        <TextInput value={stringValue} placeholder={field.hint} onChange={onChange} />
      )}
      {field.kind === "textarea" && (
        <TextAreaInput value={stringValue} placeholder={field.hint} onChange={onChange} />
      )}
      {field.kind === "icon" && <IconPicker value={stringValue} onChange={onChange} />}
      {field.kind === "select" && (
        <SelectInput
          value={stringValue}
          options={field.options ?? []}
          placeholder={field.hint}
          onChange={onChange}
        />
      )}
      {field.kind === "list" && (
        <textarea
          rows={4}
          value={stringValue}
          placeholder={field.hint}
          onChange={(e) =>
            onChange(e.target.value.split("\n").filter((line) => line.trim() !== ""))
          }
          className={`${inputClass} resize-y`}
        />
      )}
    </Field>
  );
}

/* ---------- editor ---------- */
export default function LiveSectionEditor({ active }: LiveSectionEditorProps) {
  const activeSection = useCmsStore((s) => s.activeSection);
  const overrides = useCmsStore((s) => s.overrides);
  const setOverride = useCmsStore((s) => s.setOverride);
  const clearOverride = useCmsStore((s) => s.clearOverride);
  const resetPageOverrides = useCmsStore((s) => s.resetPageOverrides);
  const setActiveSection = useCmsStore((s) => s.setActiveSection);
  const selectedUniversity = useCmsStore((s) => s.selectedUniversity);
  const selectedCountry = useCmsStore((s) => s.selectedCountry);

  // activeSection is "<kind>:<slug>:<type>"
  const parsed = useMemo(() => {
    if (!activeSection) return null;
    const first = activeSection.indexOf(":");
    const second = activeSection.indexOf(":", first + 1);
    if (first < 1 || second < 0) return null;
    const kind = activeSection.slice(0, first);
    const slug = activeSection.slice(first + 1, second);
    const type = activeSection.slice(second + 1);
    if (!slug || !type) return null;
    return { kind, slug, type, key: activeSection };
  }, [activeSection]);

  if (!parsed) {
    return (
      <Card title="Edit section">
        <p className="rounded-xl border border-dashed border-line bg-surface p-5 text-center
        text-sm text-muted">
          Select a university or country route, then <strong>click a section in the
          preview</strong> to load its content here for editing.
        </p>
      </Card>
    );
  }

  const { kind, slug, type, key } = parsed;
  const previewingUniversity = kind === "u";
  const schema = getSectionSchema(active, type);
  const seed = getSectionSeed(active, kind, slug, type);
  const edited = effectiveOverrides(overrides[key] ?? {});
  const values: Record<string, unknown> = { ...seed, ...edited };

  return (
    <Card
      title={`Edit: ${getSectionLabel(active, type)}`}
      action={
        <div className="flex items-center gap-2">
          {overrides[key] && (
            <button
              onClick={() => clearOverride(key)}
              className="flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5
              text-xs font-medium text-body transition hover:bg-surface"
            >
              <RotateCcw size={12} /> Revert
            </button>
          )}
          <button
            onClick={() => setActiveSection(null)}
            className="rounded-lg p-1.5 text-muted transition hover:bg-surface-alt
            hover:text-body"
            title="Deselect section"
          >
            <EyeOff size={14} />
          </button>
        </div>
      }
    >
      <p className="flex items-start gap-2 rounded-xl bg-surface-alt px-3 py-2.5 text-xs text-brand-royal">
        <MessageSquareWarning size={14} className="mt-0.5 shrink-0" />
        <span>
          Editing <strong>{previewingUniversity ? selectedUniversity?.name : selectedCountry?.name}</strong>{" "}
          — changes show in the preview only and are <strong>not saved</strong>.
        </span>
      </p>

      {schema.readOnly || schema.fields.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line bg-surface p-5 text-center
        text-xs text-muted">
          This section uses fixed components (its copy isn't prop-driven yet), so it stays view-only
          for now.
        </p>
      ) : (
        schema.fields.map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={(value) =>
              setOverride(key, { [field.key]: value })
            }
          />
        ))
      )}

      <div className="pt-1">
        <button
          onClick={() => {
            resetPageOverrides(`${kind}:${slug}`);
            setActiveSection(null);
          }}
          className="w-full rounded-xl border border-line px-4 py-2 text-sm font-medium
          text-body transition hover:bg-surface"
        >
          Reset all edits for this page
        </button>
      </div>
    </Card>
  );
}
