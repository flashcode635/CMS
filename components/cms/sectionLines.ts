/**
 * Line-format helpers for the CMS live editor's list fields.
 *
 * The editor only has three field kinds (text / textarea / list-of-lines), so
 * structured country content (stages, documents, steps, facts, cards) travels
 * through `list` fields as "A | B | C" lines. These helpers convert between
 * the structured objects in `lib/constants.tsx` and those editor lines.
 *
 * parse* helpers return `undefined` for anything that isn't a string[] of
 * usable lines, so previewSection can fall back to the constants copy.
 */
import type { ReactNode } from "react";
import type {
  DurationStageItem,
  DocumentItem,
  FactItem,
} from "@/types/interfaces";

/* ---------- shared ---------- */

/** Join parts with " | ", skipping empty ones. */
function line(parts: Array<string | number | undefined | null>): string {
  return parts
    .map((p) => (p == null ? "" : String(p).replace(/\s*\|\s*/g, " ")))
    .filter((p) => p.trim() !== "")
    .join(" | ");
}

/** Split a raw editor value into trimmed non-empty lines; null if unusable. */
function toLines(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const lines = value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter((v) => v !== "");
  return lines.length > 0 ? lines : null;
}

/** "A | B | C" -> ["A", "B", "C"] (splits every "|", trims each part). */
function splitParts(row: string): string[] {
  return row.split("|").map((p) => p.trim());
}

/** Flatten any ReactNode (strings, arrays, <strong>/<Link>-style elements)
 *  to the plain text an editor textarea can hold. */
export function toPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join("");
  if (typeof node === "object" && "props" in node) {
    const element = node as unknown as { props?: { children?: ReactNode } };
    return toPlainText(element.props?.children);
  }
  return "";
}

/* ---------- SSMUDurations stages: "Badge | Title | Description | Years" ---------- */

export function formatStages(stages?: DurationStageItem[]): string[] {
  return (stages ?? []).map((s) =>
    line([s.badge, s.title, s.description, s.years])
  );
}

export function parseStages(value: unknown): DurationStageItem[] | undefined {
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row) => {
    const [badge = "", title = "", description = "", years = ""] = splitParts(row);
    return {
      badge,
      title,
      description,
      years: Number.parseFloat(years) || 0,
    };
  });
}

/* ---------- StepsSSMU documents: "!label" = red tone, "label+" = wide card ---------- */

export function formatDocuments(items?: DocumentItem[]): string[] {
  return (items ?? []).map(({ label, tone, wide }) => {
    let row = label ?? "";
    if (tone === "red") row = `!${row}`;
    if (wide) row = `${row}+`;
    return row;
  });
}

export function parseDocuments(value: unknown): DocumentItem[] | undefined {
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row) => {
    const tone = row.startsWith("!") ? "red" : undefined;
    const wide = row.trimEnd().endsWith("+");
    const label = row
      .replace(/^!/, "")
      .replace(/\+\s*$/, "")
      .trim();
    return { label, tone, wide };
  });
}

/* ---------- AdmissionProcess steps: "01 | Title | Description" ---------- */

export type AdmissionStep = { number: string; title: string; description: string };

export function formatSteps(
  steps?: Array<{ number: string; title: string; description: ReactNode }>
): string[] {
  return (steps ?? []).map((s) => line([s.number, s.title, toPlainText(s.description)]));
}

export function parseSteps(value: unknown): AdmissionStep[] | undefined {
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row) => {
    const parts = row.split("|");
    const number = (parts[0] ?? "").trim();
    const title = (parts[1] ?? "").trim();
    const description = parts.slice(2).join("|").trim();
    return { number, title, description };
  });
}

/* ---------- AboutRussia facts: "Label | Value" ("Value+" = wide card) ---------- */

/** Shape matches types/interfaces FactItem so it passes straight to components. */
export type FactInput = { id: number; label: string; value: string; wide?: boolean };

export function formatFacts(facts?: FactItem[]): string[] {
  return (facts ?? []).map(({ label, value, wide }) =>
    wide ? `${line([label, value])}+` : line([label, value])
  );
}

export function parseFacts(value: unknown): FactInput[] | undefined {
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row, index) => {
    const wide = row.trimEnd().endsWith("+");
    const clean = row.trimEnd().replace(/\+\s*$/, "");
    const parts = splitParts(clean);
    return {
      id: index + 1,
      label: parts[0] ?? "",
      value: parts.slice(1).join(" | "),
      wide,
    };
  });
}

/* ---------- Eligibility cards: "1. | Title | Description" ---------- */

export type EligibilityCardInput = {
  number: string;
  title: string;
  description: string;
};

export function formatEligibilityCards(
  cards?: Array<{ number: string; title: string; description: ReactNode }>
): string[] {
  return (cards ?? []).map(({ number, title, description }) =>
    line([number, title, toPlainText(description)])
  );
}

export function parseEligibilityCards(value: unknown): EligibilityCardInput[] | undefined {
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row) => {
    const parts = row.split("|");
    return {
      number: (parts[0] ?? "").trim(),
      title: (parts[1] ?? "").trim(),
      description: parts.slice(2).join("|").trim(),
    };
  });
}

/* ---------- FAQ: "Question | Answer" ---------- */

export type FaqLine = { question: string; answer: string };

export function formatFaq(items?: FaqLine[]): string[] {
  return (items ?? []).map(({ question, answer }) => line([question, answer]));
}

export function parseFaq(value: unknown): FaqLine[] | undefined {
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row) => {
    const parts = row.split("|");
    return {
      question: (parts[0] ?? "").trim(),
      answer: parts.slice(1).join("|").trim(),
    };
  });
}

/* ---------- MBBSAbroadHero country cards: "Name | /image/path" ---------- */

export type CountryCardLine = { name: string; image: string };

export function formatCountryCards(cards?: CountryCardLine[]): string[] {
  return (cards ?? []).map(({ name, image }) => line([name, image]));
}

export function parseCountryCards(value: unknown): CountryCardLine[] | undefined {
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row) => {
    const [name = "", image = ""] = splitParts(row);
    return { name, image };
  });
}
