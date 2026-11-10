/**
 * University-name plumbing for the `components/universities/*` sections.
 *
 * The section files ship sample copy ("Samara State Medical University …") in
 * their exported `DEFAULT_CONTENT`. To reuse them for ANY university, the
 * `/universities/[slug]` page derives the display name from the slug and wires
 * it down; `withUniversityName` deep-clones a defaults object and substitutes
 * the hard-coded name tokens in every string — so sections stay generic and
 * CMS-compatible (a CMS can still override any prop explicitly).
 */

/** Sample university used in the shipped defaults. */
export const DEFAULT_UNIVERSITY_NAME = "Samara State Medical University";

/** Turn "samara-state-medical-university" into "Samara State Medical University". */
export function slugToUniversityName(
    slug?: string | string[],
): string {
    if (!slug) return DEFAULT_UNIVERSITY_NAME;
    const raw = Array.isArray(slug) ? slug[0] : slug;
    if (!raw) return DEFAULT_UNIVERSITY_NAME;
    return raw.replace(
        /(^|-)([a-z])/g,
        (_, sep: string, char: string) => (sep ? " " : "") + char.toUpperCase(),
    );
}

/**
 * Replace the hard-coded university tokens in a piece of copy.
 * Ordered longest-first so the shorter tokens only catch leftovers.
 * Phrases that refer to the CITY of Samara ("city of Samara",
 * "Samara is considered a safe city…") intentionally do NOT match and survive.
 */
function replaceTokens(text: string, universityName: string): string {
    return text
        .split("Samara State Medical University (SamSMU)")
        .join(universityName)
        .split("Samara State Medical University")
        .join(universityName)
        .split("Samara State University")
        .join(universityName)
        .split("Samara State")
        .join(universityName);
}

/**
 * Deep-clone `defaults`, swapping the hard-coded name tokens inside every
 * string. Non-string leaves are preserved by reference:
 *  - React elements (icons etc.) are spared (detected via `$$typeof`) —
 *    cloning them would corrupt the element tree.
 *  - Static image imports, numbers, booleans, functions are untouched.
 */
export function withUniversityName<T>(defaults: T, universityName?: string): T {
    const name = universityName?.trim();
    if (!name || name === DEFAULT_UNIVERSITY_NAME) return defaults;

    const walk = (value: unknown): unknown => {
        if (typeof value === "string") return replaceTokens(value, name);
        if (Array.isArray(value)) return value.map((item) => walk(item));
        if (
            value &&
            typeof value === "object" &&
            (value as { $$typeof?: unknown }).$$typeof === undefined
        ) {
            const source = value as Record<string, unknown>;
            const output: Record<string, unknown> = {};
            for (const key of Object.keys(source)) {
                output[key] = walk(source[key]);
            }
            return output;
        }
        return value;
    };

    return walk(defaults) as T;
}
