"use client";

/**
 * Page-editor "options" card for the CMS dashboard.
 *
 * Replaces the old static heading/body rows with type-aware sections:
 * - an "Add section" dropdown listing the university page layout options
 *   (same order/anchors as `getOptions()` in `components/universities/univNav.tsx`),
 * - per-row reordering (up/down), visibility toggle, type badge and removal,
 * - heading/body inputs that feed each section component's real props.
 *
 * Universities get the full layout list; countries keep the plain text
 * sections for now (their pages are still Russia-only in the preview).
 */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import { Card, Field } from "./smallerComponents";
import {
  SECTION_OPTIONS,
  blankTypedSection,
  getSectionOption,
} from "./sectionOptions";
import type { ContentType, Section } from "@/types/types";

type SectionEditorProps = {
  sections: Section[];
  onChange: (next: Section[]) => void;
  active: ContentType;
};

const typeBadgeClass =
  "shrink-0 rounded-md bg-surface-alt px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted";

export default function SectionEditor({ sections, onChange, active }: SectionEditorProps) {
  const [addOpen, setAddOpen] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);

  // close the "Add section" popover on outside click
  useEffect(() => {
    if (!addOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (addRef.current && !addRef.current.contains(e.target as Node)) setAddOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [addOpen]);

  // universities -> the university page layout; countries -> plain text only
  const options =
    active === "universities"
      ? SECTION_OPTIONS
      : SECTION_OPTIONS.filter((o) => o.type === "content");

  const patch = (index: number, patchObj: Partial<Section>) =>
    onChange(sections.map((s, i) => (i === index ? { ...s, ...patchObj } : s)));

  const patchData = (index: number, patchObj: Record<string, unknown>) =>
    onChange(
      sections.map((s, i) =>
        i === index ? { ...s, data: { ...s.data, ...patchObj } } : s
      )
    );

  const move = (index: number, direction: -1 | 1) => {
    const next = [...sections];
    const to = index + direction;
    if (to < 0 || to >= next.length) return;
    [next[index], next[to]] = [next[to], next[index]];
    onChange(next);
  };

  const remove = (index: number) =>
    onChange(sections.filter((_, i) => i !== index));

  return (
    <Card
      title="Page sections"
      action={
        <div className="relative" ref={addRef}>
          <button
            onClick={() => setAddOpen((v) => !v)}
            aria-expanded={addOpen}
            className="flex items-center gap-1 rounded-lg bg-surface-alt
            px-3 py-1.5 text-xs font-semibold text-brand-green
            transition hover:bg-brand-sky"
          >
            <Plus size={14} /> Add section
            <ChevronDown size={12} className={`transition ${addOpen ? "rotate-180" : ""}`} />
          </button>

          {addOpen && (
            <div
              className="absolute right-0 z-20 mt-2 max-h-80 w-64 overflow-y-auto rounded-xl border
              border-line bg-white p-1.5 shadow-lg"
              role="listbox"
              aria-label="Add a section"
            >
              {options.map((option) => (
                <button
                  key={option.type}
                  role="option"
                  aria-selected={false}
                  onClick={() => {
                    onChange([...sections, blankTypedSection(option.type)]);
                    setAddOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2
                  text-left transition hover:bg-surface"
                >
                  <span className="text-sm font-medium">{option.name}</span>
                  {option.anchor && (
                    <span className="text-[10px] text-muted">#{option.anchor}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      }
    >
      {sections.map((section, index) => {
        const option = getSectionOption(section.type);
        const fields = option?.fields ?? { heading: "heading", body: "body" };

        return (
          <div
            key={section.id}
            className={`rounded-xl border p-4 transition ${
              section.visible
                ? "border-line bg-white"
                : "border-dashed border-line bg-surface/70"
            }`}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-alt text-xs font-semibold text-muted">
                {index + 1}
              </span>
              <span className={typeBadgeClass}>{option?.name ?? "Text section"}</span>
              <input
                value={section.label}
                onChange={(e) => patch(index, { label: e.target.value })}
                className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent
                px-2 py-1.5 text-base font-semibold outline-none
                hover:border-line focus:border-brand-green sm:text-sm"
              />
              <div className="flex shrink-0 items-center">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  title="Move up"
                  className="rounded-lg p-1.5 text-muted transition hover:bg-surface-alt hover:text-body disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  onClick={() => move(index, 1)}
                  disabled={index === sections.length - 1}
                  title="Move down"
                  className="rounded-lg p-1.5 text-muted transition hover:bg-surface-alt hover:text-body disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowDown size={14} />
                </button>
                <label className="ml-1 flex cursor-pointer items-center gap-1.5 text-xs text-muted">
                  <input
                    type="checkbox"
                    checked={section.visible}
                    onChange={(e) => patch(index, { visible: e.target.checked })}
                    className="accent-brand-green"
                  />
                  Visible
                </label>
                <button
                  onClick={() => remove(index)}
                  className="rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                  title="Remove section"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* per-type fields: blank inputs keep the component's default copy */}
            {fields.heading && (
              <Field label="Heading">
                <input
                  aria-label="Section heading"
                  placeholder="Leave empty to keep the default heading"
                  value={String(section.data.heading ?? "")}
                  onChange={(e) => patchData(index, { heading: e.target.value })}
                  className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5
                  text-base text-ink outline-none transition sm:text-sm
                  placeholder:text-muted hover:border-line-strong
                  focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
                />
              </Field>
            )}
            {fields.body && (
              <Field label="Body">
                <textarea
                  aria-label="Section body"
                  placeholder={
                    fields.bodyList
                      ? "Leave empty to keep the default copy — one paragraph per line"
                      : "Leave empty to keep the default copy"
                  }
                  rows={3}
                  value={String(section.data.body ?? "")}
                  onChange={(e) => patchData(index, { body: e.target.value })}
                  className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5
                  text-base text-ink outline-none transition sm:text-sm
                  placeholder:text-muted hover:border-line-strong
                  focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 resize-y"
                />
              </Field>
            )}
          </div>
        );
      })}

      {sections.length === 0 && (
        <p className="rounded-xl border border-dashed border-line bg-surface p-5
        text-center text-xs text-muted">
          No sections yet — use “Add section” to build the page from the
          {active === "universities" ? " university" : " country"} layout options.
        </p>
      )}
    </Card>
  );
}
