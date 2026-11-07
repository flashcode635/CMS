"use client";

/**
 * Form pane shown while a live page preview is active.
 *
 * Flow: click a section in the preview (SectionHitbox) -> its data seeds from
 * `lib/constants.tsx` (countries) or the section component's DEFAULT_CONTENT
 * (universities, via withUniversityName) -> edits write into
 * `useCmsStore.overrides` -> the preview re-renders with the new values.
 *
 * ONLY preview state — nothing here calls the content API, so changes are not
 * stored. "Revert"/"Reset edits" clears the in-memory overrides.
 */
import {
  getCountryContent,
  getUniversityContent,
  DEFAULT_CONTENT as RUSSIA_BANNER_DEFAULTS,
} from "@/lib/constants";
import { withUniversityName } from "@/components/universities/universityName";
import { MessageSquareWarning, RotateCcw, EyeOff } from "lucide-react";
import { useMemo } from "react";
import { Card, Field } from "./smallerComponents";
import { getSectionSchema, getSectionLabel, type FieldSpec } from "./sectionFieldSchemas";
import { UNIVERSITY_SECTIONS } from "./universitySectionRegistry";
import { useCmsStore } from "@/store/cmsStore";
import type { ContentType } from "@/types/types";

type LiveSectionEditorProps = { active: ContentType };

/* ---------- seed: content the section shows before any edit ---------- */
function getSectionSeed(active: ContentType, kind: string, slug: string, type: string): Record<string, unknown> {
  if (active === "countries") {
    const c = getCountryContent(slug);
    const countrySeeds: Record<string, Record<string, unknown>> = {
      hero: {
        heroTitle: c.heroTitle,
        heroSubtitle: c.heroSubtitle,
        languages: c.languages,
        currency: c.currency,
      },
      intro: { intro: c.intro },
      "why-russia": { whyPoints: c.whyPoints as string[] },
      eligibility: { eligibility: c.eligibility },
    };
    return countrySeeds[type] ?? {};
  }

  const name = getUniversityContent(slug).name;
  if (type === "hero") {
    const u = getUniversityContent(slug);
    return {
      // banner defaults first, then the university's own constants
      ...RUSSIA_BANNER_DEFAULTS,
      sectionLabel: `${name} hero banner`,
      title: u.heroTitle,
      subtitle: u.heroSubtitle,
      rating: u.rating,
      ratingLabel: `Rating: ${u.rating} out of 5 stars`,
      languages: u.languages,
      currency: u.currency,
    } as unknown as Record<string, unknown>;
  }

  const def = UNIVERSITY_SECTIONS[type];
  if (!def) return {};
  // DEFAULT_CONTENTs already carry every editor key (schemas mirror the props)
  return { ...withUniversityName(def.defaults, name) } as Record<string, unknown>;
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
  onChange: (next: string | string[]) => void;
}) {
  const stringValue = Array.isArray(value) ? value.join("\n") : value == null ? "" : String(value);
  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-[#1C2B25] sm:text-sm " +
    "placeholder:text-muted outline-none transition " +
    "hover:border-line-strong focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";

  return (
    <Field label={field.label}>
      {field.kind === "text" && (
        <input
          value={stringValue}
          placeholder={field.hint}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
      {field.kind === "textarea" && (
        <textarea
          rows={3}
          value={stringValue}
          placeholder={field.hint}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-y`}
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
      <p className="flex items-start gap-2 rounded-xl bg-[#EDF3EF] px-3 py-2.5 text-xs text-[#0A6B44]">
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
