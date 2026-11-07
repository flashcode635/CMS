import { ReactNode } from "react";
import type { ContentType, Entry, Section, Toast, Pane, Status } from "@/types/types";

/* ---------- small components ---------- */
export const SectionLabel = ({ children }: { children: ReactNode }) => {
  return (
    <p className="px-3 pb-1.5 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
      {children}
    </p>
  );
}

export const StatusBadge = ({ status }: { status: Status }) => {
  const published = status === "published";
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        published ? "bg-[#EDF3EF] text-[#0A6B44]" : "bg-amber-50 text-amber-600"
      }`}
    >
      {published ? "Live" : "Draft"}
    </span>
  );
}

export const Card = ({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) => {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export const Field = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <label className="block text-xs font-semibold text-body">
      {label}
      <div className="mt-1.5 font-normal">{children}</div>
    </label>
  );
}