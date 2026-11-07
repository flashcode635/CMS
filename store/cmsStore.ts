import { create } from "zustand";

export type SelectedCountry = {
  name: string;
  code: string;
  slug: string;
};

export type SelectedUniversity = {
  name: string;
  slug: string; // last URL segment, e.g. "samara-state-medical-university"
};

/**
 * Page key for preview-scoped state: "u:<slug>" (universities) or "c:<slug>"
 * (countries). Lets overrides/active-section never leak between pages.
 */
export type PageKey = string;

/** `${pageKey}:${sectionType}` — where an override lives. */
export type OverrideKey = string;
export type SectionOverride = Record<string, unknown>;

type CmsStore = {
  selectedCountry: SelectedCountry | null;
  selectedUniversity: SelectedUniversity | null;
  /** section currently being edited, e.g. "u:samara-...:fees-structure" — set by clicking it in the preview */
  activeSection: OverrideKey | null;
  /** FE-only content edits (see previewSection.tsx); never persisted */
  overrides: Record<OverrideKey, SectionOverride>;
  /** bumped on every preview-section click so the dashboard can switch panes */
  editRequest: number;

  setSelectedCountry: (selectedCountry: SelectedCountry | null) => void;
  setSelectedUniversity: (selectedUniversity: SelectedUniversity | null) => void;
  clearPreview: () => void;
  /** click a section in the preview to edit it; pass null to deselect */
  setActiveSection: (key: string | null) => void;
  /** merge fields into one section's override */
  setOverride: (key: OverrideKey, patch: SectionOverride) => void;
  /** drop the override for a single section */
  clearOverride: (key: OverrideKey) => void;
  /** drop every override previously made for a page (pageKey like "u:samara-...") */
  resetPageOverrides: (pageKey: PageKey) => void;
};

export const useCmsStore = create<CmsStore>((set, get) => ({
  selectedCountry: null,
  selectedUniversity: null,
  activeSection: null,
  overrides: {},
  editRequest: 0,
  // selecting one clears the other so only one preview is ever active
  setSelectedCountry: (selectedCountry) => set({ selectedCountry, selectedUniversity: null }),
  setSelectedUniversity: (selectedUniversity) => set({ selectedUniversity, selectedCountry: null }),
  clearPreview: () => set({ selectedCountry: null, selectedUniversity: null, activeSection: null }),
  setActiveSection: (activeSection) =>
    set((s) => ({ activeSection, editRequest: s.editRequest + 1 })),
  setOverride: (key, patch) =>
    set((s) => ({
      overrides: { ...s.overrides, [key]: { ...(s.overrides[key] ?? {}), ...patch } },
    })),
  clearOverride: (key) =>
    set((s) => {
      const next = { ...s.overrides };
      delete next[key];
      return { overrides: next };
    }),
  resetPageOverrides: (pageKey) =>
    set((s) => {
      const next = Object.fromEntries(
        Object.entries(s.overrides).filter(([k]) => !k.startsWith(`${pageKey}:`))
      );
      return { overrides: next };
    }),
}));

/** helper: read one override object ({} when absent) */
export function getOverride(key: OverrideKey): SectionOverride {
  return useCmsStore.getState().overrides[key] ?? {};
}
