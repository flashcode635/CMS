/**
 * Editor-value normalization for the CMS live editor.
 *
 * The editor renders every value as a PLAIN STRING (or an array of plain
 * strings for "list" fields, or an array of plain objects for "cards"
 * fields). Section constants, however, legitimately contain ReactNode copy
 * (`<strong>`, `<Link>`) and static image imports — stringifying those
 * directly is what produced the infamous "[object Object]" inputs.
 *
 * The helpers below flatten ANY value into its editor form:
 *  - strings / numbers          -> as-is
 *  - ReactNode                  -> visible text (toPlainText)
 *  - StaticImageData / {src}    -> its public URL string
 *  - arrays                     -> line form ("Label | Value" for {label,value})
 *  - anything else              -> "" (never "[object Object]")
 */
import type { ReactNode } from "react";
import { toPlainText } from "./sectionLines";
import type { FieldSpec } from "./sectionFieldSchemas";

/** One editor-safe text value. */
export function toEditorText(value: unknown): string {
  if (value == null || typeof value === "boolean") return value === true ? "true" : "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  // ReactNode (element or nested array) -> visible text
  if (typeof value === "object" && "props" in (value as Record<string, unknown>)) {
    return toPlainText(value as ReactNode);
  }
  // StaticImageData and friends -> public URL
  const src = (value as { src?: unknown }).src;
  if (typeof src === "string") return src;
  return "";
}

/** One "list" field: array of plain strings, one per line. */
export function toEditorLines(value: unknown): string[] {
  if (value == null) return [];
  const arr = Array.isArray(value) ? value : [value];
  return arr
    .map((item) => {
      if (item == null) return "";
      if (typeof item === "string") return item.trim();
      if (typeof item === "number") return String(item);
      // ReactNode list item -> text
      if (typeof item === "object" && "props" in (item as Record<string, unknown>)) {
        return toPlainText(item as ReactNode).trim();
      }
      const obj = item as Record<string, unknown>;
      // {label, value} rows -> "Label | Value" (fee rows etc.)
      if (typeof obj.label === "string" || typeof obj.value === "string") {
        const label = typeof obj.label === "string" ? obj.label : toEditorText(obj.label);
        const rowValue = typeof obj.value === "string" ? obj.value : toEditorText(obj.value);
        return [label, rowValue].filter((p) => p.trim() !== "").join(" | ");
      }
      return toEditorText(item);
    })
    .filter((line) => line.trim() !== "");
}

/**
 * Seed values for the live editor: take a section schema and the section's
 * content constants, and return EVERY field in its editor shape. Values the
 * schema doesn't declare are dropped (they stay unedited in the preview).
 */
export function seedSchemaValues(
  fields: FieldSpec[],
  source: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of fields) {
    const raw = source[field.key];
    switch (field.kind) {
      case "list":
        out[field.key] = toEditorLines(raw);
        break;
      case "cards": {
        const cards = Array.isArray(raw) ? raw : [];
        const declared = field.fields ?? [];
        // first text sub-field receives bare-string card items (e.g. country
        // whyBenefits are plain strings) so they become editable card objects
        const firstTextKey =
          declared.find((f) => f.kind === "text")?.key ?? "text";
        out[field.key] = cards
          .map((item): Record<string, unknown> | null => {
            if (typeof item === "string" || typeof item === "number") {
              return { [firstTextKey]: String(item) };
            }
            if (!item || typeof item !== "object" || Array.isArray(item)) return null;
            return item as Record<string, unknown>;
          })
          .filter((c): c is Record<string, unknown> => !!c)
          .map((card) => {
            const normalized: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(card)) {
              const spec = declared.find((f) => f.key === key);
              if (spec?.kind === "list") normalized[key] = toEditorLines(value);
              else if (spec) normalized[key] = toEditorText(value);
              else normalized[key] = toEditorText(value); // undeclared key -> text
            }
            // make sure every declared sub-field exists (the editor binds to it)
            for (const spec of declared) {
              if (!(spec.key in normalized)) {
                normalized[spec.key] = spec.kind === "list" ? [] : "";
              }
            }
            return normalized;
          });
        break;
      }
      default:
        // text / textarea / icon / select
        out[field.key] = toEditorText(raw);
    }
  }
  return out;
}
