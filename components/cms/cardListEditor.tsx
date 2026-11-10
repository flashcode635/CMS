"use client";

/**
 * Repeatable card editor for the CMS live editor (`cards` field kind).
 *
 * Thumb rule: every card rendered on the frontend must be editable here —
 * edit its fields, add a new card, delete a card, reorder with one click.
 * The value is an ARRAY OF PLAIN OBJECTS (one per card), so it stays
 * serializable in `useCmsStore.overrides` and is passed straight to the
 * section components as props by previewSection.tsx.
 *
 * Each card is a collapsible block: the header shows its position + a summary
 * built from the first filled text field; the body renders the sub-fields
 * declared in the field spec (`text` / `textarea` / `icon` / `select`).
 */

import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import type { FieldSpec } from "./sectionFieldSchemas";
import { Field } from "./smallerComponents";
import { toEditorLines, toEditorText } from "./editorValues";
import { IconPicker, SelectInput, TextAreaInput, TextInput } from "./fieldInputs";

export type CardObject = Record<string, unknown>;

type CardListEditorProps = {
  /** Editor value: array of card objects (legacy string lines are normalized by the caller). */
  value: CardObject[];
  /** Sub-field specs of ONE card. */
  fields: FieldSpec[];
  /** Singular label for the row header, e.g. "Card" / "Stage" / "Question". */
  itemLabel?: string;
  /** Field values used when adding a new card. */
  template?: Record<string, string>;
  onChange: (next: CardObject[]) => void;
};

/** one sub-field inside a card */
function CardSubField({
  field,
  card,
  onPatch,
}: {
  field: FieldSpec;
  card: CardObject;
  onPatch: (key: string, value: string | string[]) => void;
}) {
  const raw = card[field.key];

  let control: ReactNode;
  switch (field.kind) {
    case "list":
      // multi-line rows (e.g. fee rows "Label | Value")
      control = (
        <textarea
          rows={4}
          value={toEditorLines(raw).join("\n")}
          placeholder={field.hint}
          onChange={(e) =>
            onPatch(
              field.key,
              e.target.value.split("\n").filter((line) => line.trim() !== "")
            )
          }
          className="w-full resize-y rounded-xl border border-line bg-white px-3.5 py-2.5
          text-base text-ink sm:text-sm placeholder:text-muted outline-none transition
          hover:border-line-strong focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
        />
      );
      break;
    case "textarea":
      control = (
        <TextAreaInput
          value={toEditorText(raw)}
          placeholder={field.hint}
          onChange={(next) => onPatch(field.key, next)}
        />
      );
      break;
    case "icon":
      control = <IconPicker value={toEditorText(raw)} onChange={(next) => onPatch(field.key, next)} />;
      break;
    case "select":
      control = (
        <SelectInput
          value={toEditorText(raw)}
          options={field.options ?? []}
          placeholder={field.hint}
          onChange={(next) => onPatch(field.key, next)}
        />
      );
      break;
    default:
      // text — toEditorText flattens ReactNode / image objects instead of
      // printing "[object Object]"
      control = (
        <TextInput
          value={toEditorText(raw)}
          placeholder={field.hint}
          onChange={(next) => onPatch(field.key, next)}
        />
      );
  }

  return <Field label={field.label}>{control}</Field>;
}

export default function CardListEditor({
  value,
  fields,
  itemLabel = "Card",
  template,
  onChange,
}: CardListEditorProps) {
  const cards = Array.isArray(value) ? value : [];
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  const setCard = (index: number, key: string, next: string | string[]) => {
    onChange(
      cards.map((card, i) => (i === index ? { ...card, [key]: next } : card))
    );
  };

  const move = (index: number, direction: -1 | 1) => {
    const next = [...cards];
    const to = index + direction;
    if (to < 0 || to >= next.length) return;
    [next[index], next[to]] = [next[to], next[index]];
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(cards.filter((_, i) => i !== index));
  };

  const add = () => {
    const blank: CardObject = Object.fromEntries(
      fields.map((f) => [f.key, template?.[f.key] ?? ""])
    );
    onChange([...cards, blank]);
    setCollapsed((prev) => ({ ...prev, [cards.length]: false })); // expand the new card
  };

  /** summary for the collapsed header: first filled declared text field */
  const summaryOf = (card: CardObject, index: number) => {
    for (const field of fields) {
      if (field.kind !== "text") continue;
      const text = toEditorText(card[field.key]).trim();
      if (text) return text;
    }
    for (const field of fields) {
      if (field.kind !== "textarea") continue;
      const text = toEditorText(card[field.key]).trim();
      if (text) return text.length > 60 ? `${text.slice(0, 60)}…` : text;
    }
    return `${itemLabel} ${index + 1}`;
  };

  return (
    <Field label={`${itemLabel}s (${cards.length})`}>
      <div className="space-y-2.5">
        {cards.map((card, index) => {
          const isCollapsed = collapsed[index] ?? false;
          return (
            <div
              key={index}
              className="rounded-xl border border-line bg-white transition hover:border-line-strong"
            >
              {/* header */}
              <div className="flex items-center gap-2 px-2.5 py-2">
                <button
                  type="button"
                  onClick={() => setCollapsed((prev) => ({ ...prev, [index]: !isCollapsed }))}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  title={isCollapsed ? "Expand" : "Collapse"}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-surface-alt text-[10px] font-semibold text-muted">
                    {index + 1}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate text-xs font-semibold ${
                      isCollapsed ? "text-body" : "text-muted"
                    }`}
                  >
                    {summaryOf(card, index)}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-muted transition ${isCollapsed ? "" : "rotate-180"}`}
                  />
                </button>
                <div className="flex shrink-0 items-center">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    title="Move up"
                    className="rounded-lg p-1.5 text-muted transition hover:bg-surface-alt hover:text-body disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === cards.length - 1}
                    title="Move down"
                    className="rounded-lg p-1.5 text-muted transition hover:bg-surface-alt hover:text-body disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ArrowDown size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    title="Delete card"
                    className="rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* body */}
              {!isCollapsed && (
                <div className="space-y-3 border-t border-line px-2.5 py-3">
                  {fields.map((field) => (
                    <CardSubField
                      key={field.key}
                      field={field}
                      card={card}
                      onPatch={(key, next) => setCard(index, key, next)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={add}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed
          border-line-strong px-3 py-2.5 text-xs font-semibold text-brand-green transition
          hover:border-brand-green hover:bg-brand-green/5"
        >
          <Plus size={14} /> Add {itemLabel.toLowerCase()}
        </button>
      </div>
    </Field>
  );
}
