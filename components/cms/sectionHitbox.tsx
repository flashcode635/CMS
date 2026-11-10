"use client";

/**
 * Click target around a previewed page section. Clicking selects the section
 * for editing (useCmsStore.activeSection) — values in the editor seed from
 * lib/constants + section DEFAULT_CONTENT, edits live in the store only.
 */
import type { ReactNode } from "react";
import { Pencil } from "lucide-react";
import { useCmsStore } from "@/store/cmsStore";

type SectionHitboxProps = {
  /** full override key: "<pageKey>:<type>", e.g. "u:samara-...:fees-structure" */
  pageKey: string;
  type: string;
  children: ReactNode;
  /** true when the section has no editable fields (editor will show a note) */
  readOnly?: boolean;
};

export default function SectionHitbox({ pageKey, type, children, readOnly }: SectionHitboxProps) {
  const activeSection = useCmsStore((s) => s.activeSection);
  const setActiveSection = useCmsStore((s) => s.setActiveSection);
  const key = `${pageKey}:${type}`;
  const active = activeSection === key;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={readOnly ? `${key} (view only)` : `Edit ${key}`}
      onClick={() => setActiveSection(key)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActiveSection(key);
        }
      }}
      className={`group/hit relative cursor-pointer transition outline-none
        ${active ? "z-10" : ""}`}
    >
      {/* selection ring — only visible when active, hover shows a subtle hint */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-sm transition
          ${active
            ? "ring-2 ring-inset ring-brand-green"
            : "opacity-0 group-hover/hit:opacity-100 ring-2 ring-inset ring-brand-green/25"}`}
      />
      {active && (
        <span className="pointer-events-none absolute right-2 top-2 z-20 flex items-center gap-1
        rounded-full bg-brand-green px-2.5 py-1 text-[10px] font-semibold text-white shadow-md"
        >
          <Pencil size={10} /> Editing
        </span>
      )}
      {children}
    </div>
  );
}
