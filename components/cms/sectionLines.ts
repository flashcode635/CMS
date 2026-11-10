/**
 * Card/line-format helpers between the CMS live editor and the section
 * components.
 *
 * Card fields (`kind: "cards"`) travel as ARRAY<OBJECT> — one plain object per
 * card (e.g. { title, description, icon }) — which previewSection passes
 * straight to the section components as props. Every parse* helper below
 * accepts BOTH shapes:
 *   1. structured objects   (the cards editor writes these)
 *   2. legacy "A | B | C" string lines (the old list textareas + constants)
 * and returns `undefined` for unusable input so the preview can fall back to
 * the constants copy.
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

/**
 * Normalize a card-field override into Array<Record<string, string>>.
 * Accepts the objects the cards editor writes; returns undefined for legacy
 * string arrays (callers parse those with their own format rules) and for
 * anything unusable.
 */
function toCardObjects(value: unknown): Array<Record<string, string>> | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  if (!value.every((v) => v && typeof v === "object" && !Array.isArray(v))) return undefined;
  return (value as Array<Record<string, unknown>>).map((obj) => {
    const out: Record<string, string> = {};
    for (const [key, v] of Object.entries(obj)) {
      if (v == null) continue;
      out[key] = typeof v === "string" ? v : String(v);
    }
    return out;
  });
}

/** truthy("wide" | "true" | true) for select-style width/highlight values. */
function flag(v: unknown): boolean {
  return v === true || v === "wide" || v === "true" || v === "yes";
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

/* ---------- SSMUDurations stages ---------- */

type StageInput = {
  badge: string;
  title: string;
  description: string;
  years: number;
};

export function parseStages(value: unknown): StageInput[] | undefined {
  const objs = toCardObjects(value);
  if (objs) {
    return objs.map(({ badge = "", title = "", description = "", years = "" }) => ({
      badge,
      title,
      description,
      years: Number.parseFloat(years) || 0,
    }));
  }
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row) => {
    const [badge = "", title = "", description = "", years = ""] = splitParts(row);
    return { badge, title, description, years: Number.parseFloat(years) || 0 };
  });
}

/** editor seed: constants stages -> card objects */
export function seedStages(stages?: DurationStageItem[]): Array<Record<string, string>> {
  return (stages ?? []).map((s) => ({
    badge: s.badge ?? "",
    title: s.title ?? "",
    description: toPlainText(s.description ?? ""),
    years: String(s.years ?? ""),
  }));
}

/* ---------- StepsSSMU documents ---------- */

export function parseDocuments(value: unknown): DocumentItem[] | undefined {
  const objs = toCardObjects(value);
  if (objs) {
    return objs.map(({ label = "", icon = "", tone = "", wide = "" }) => ({
      label,
      icon: icon || undefined,
      tone: tone === "red" ? "red" : undefined,
      wide: flag(wide) || undefined,
    }));
  }
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row) => {
    const tone = row.startsWith("!") ? ("red" as const) : undefined;
    const wide = row.trimEnd().endsWith("+");
    const label = row
      .replace(/^!/, "")
      .replace(/\+\s*$/, "")
      .trim();
    return { label, tone, wide };
  });
}

/** editor seed: constants documents -> card objects */
export function seedDocuments(items?: DocumentItem[]): Array<Record<string, string>> {
  return (items ?? []).map(({ label, tone, wide, icon }) => ({
    label: label ?? "",
    icon: icon ?? "",
    tone: tone === "red" ? "red" : "",
    wide: wide ? "wide" : "",
  }));
}

/* ---------- Admission steps (country): "01 | Title | Description" ---------- */

export type AdmissionStep = { number: string; title: string; description: string };

export function parseSteps(
  value: unknown,
  autoNumber: "padded" | "dotted" = "padded"
): AdmissionStep[] | undefined {
  const fill = (index: number) =>
    autoNumber === "padded"
      ? String(index + 1).padStart(2, "0")
      : `${index + 1}.`;

  const objs = toCardObjects(value);
  if (objs) {
    return objs.map(({ number = "", title = "", description = "" }, i) => ({
      number: number || fill(i),
      title,
      description,
    }));
  }
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row, i) => {
    const parts = row.split("|");
    const number = (parts[0] ?? "").trim();
    const title = (parts[1] ?? "").trim();
    const description = parts.slice(2).join("|").trim();
    return { number: number || fill(i), title, description };
  });
}

/** editor seed: constants admission steps -> card objects */
export function seedSteps(
  steps?: Array<{ number: string; title: string; description: ReactNode }>
): Array<Record<string, string>> {
  return (steps ?? []).map((s) => ({
    number: s.number ?? "",
    title: s.title ?? "",
    description: toPlainText(s.description ?? ""),
  }));
}

/* ---------- AboutRussia facts ---------- */

/** Shape matches types/interfaces FactItem so it passes straight to components. */
export type FactInput = { id: number; label: string; value: string; icon?: string; wide?: boolean };

export function parseFacts(value: unknown): FactInput[] | undefined {
  const objs = toCardObjects(value);
  if (objs) {
    return objs.map(({ label = "", value = "", icon = "", wide = "" }, i) => ({
      id: i + 1,
      label,
      value,
      icon: icon || undefined,
      wide: flag(wide) || undefined,
    }));
  }
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

/** editor seed: constants facts -> card objects */
export function seedFacts(facts?: FactItem[]): Array<Record<string, string>> {
  return (facts ?? []).map(({ label, value, wide, icon }) => ({
    label: label ?? "",
    value: value ?? "",
    icon: icon ?? "",
    wide: wide ? "wide" : "",
  }));
}

/* ---------- Eligibility cards ---------- */

export type EligibilityCardInput = {
  number: string;
  title: string;
  description: string;
};

export function parseEligibilityCards(value: unknown): EligibilityCardInput[] | undefined {
  const objs = toCardObjects(value);
  if (objs) {
    return objs.map(({ number = "", title = "", description = "" }, i) => ({
      number: number || `${i + 1}.`,
      title,
      description,
    }));
  }
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row, i) => {
    const parts = row.split("|");
    const number = (parts[0] ?? "").trim();
    return {
      number: number || `${i + 1}.`,
      title: (parts[1] ?? "").trim(),
      description: parts.slice(2).join("|").trim(),
    };
  });
}

/** editor seed: constants eligibility cards -> card objects */
export function seedEligibilityCards(
  cards?: Array<{ number: string; title: string; description: ReactNode }>
): Array<Record<string, string>> {
  return (cards ?? []).map(({ number, title, description }) => ({
    number: number ?? "",
    title: title ?? "",
    description: toPlainText(description ?? ""),
  }));
}

/* ---------- WhyRussia benefit cards: { text, icon? } ---------- */

export type BenefitCard = { text: string; icon?: string };

export function parseBenefits(value: unknown): BenefitCard[] | undefined {
  const objs = toCardObjects(value);
  if (objs) {
    return objs.map(({ text = "", icon = "" }) => ({
      text,
      icon: icon || undefined,
    }));
  }
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((text) => ({ text }));
}

/** editor seed: constants benefits (string[]) -> card objects */
export function seedBenefits(benefits?: string[]): Array<Record<string, string>> {
  return (benefits ?? []).map((text) => ({ text, icon: "" }));
}

/* ---------- FAQ ---------- */

export type FaqLine = { question: string; answer: string };

export function parseFaq(value: unknown): FaqLine[] | undefined {
  const objs = toCardObjects(value);
  if (objs) {
    return objs.map(({ question = "", answer = "" }) => ({ question, answer }));
  }
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

/** editor seed: FAQ items -> card objects */
export function seedFaq(items?: FaqLine[]): Array<Record<string, string>> {
  return (items ?? []).map(({ question, answer }) => ({ question, answer }));
}

/* ---------- MBBSAbroadHero country cards ---------- */

export type CountryCardLine = { name: string; image: string };

export function parseCountryCards(value: unknown): CountryCardLine[] | undefined {
  const objs = toCardObjects(value);
  if (objs) {
    return objs.map(({ name = "", image = "" }) => ({ name, image }));
  }
  const lines = toLines(value);
  if (!lines) return undefined;
  return lines.map((row) => {
    const [name = "", image = ""] = splitParts(row);
    return { name, image };
  });
}

/** editor seed: country cards -> card objects */
export function seedCountryCards(cards?: CountryCardLine[]): Array<Record<string, string>> {
  return (cards ?? []).map(({ name, image }) => ({ name, image }));
}
