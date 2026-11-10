"use client";

/**
 * Shared input primitives for the CMS live editor.
 *
 * Used by both the flat-field renderer (liveSectionEditor FieldInput) and the
 * repeatable card editor (cardListEditor). Values are plain strings end to end
 * so they stay serializable in `useCmsStore.overrides`:
 *  - TextInput / TextAreaInput  -> string
 *  - SelectInput                -> one of `options` ("" = keep default)
 *  - IconPicker                 -> kebab-case lucide icon NAME ("" = none)
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { getLucideIcon, ICON_CHOICES } from "@/components/ui/iconRegistry";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink sm:text-sm " +
  "placeholder:text-muted outline-none transition " +
  "hover:border-line-strong focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";

export function TextInput({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange: (next: string) => void;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

export function TextAreaInput({
  value,
  placeholder,
  rows = 3,
  onChange,
}: {
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (next: string) => void;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} resize-y`}
    />
  );
}

export function SelectInput({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (next: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    >
      <option value="">{placeholder ?? "Default"}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

/** Searchable lucide icon picker. Value = kebab-case icon NAME ("" = none). */
export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ICON_CHOICES;
    return ICON_CHOICES.filter(({ name }) => name.includes(q));
  }, [query]);

  const CurrentIcon = getLucideIcon(value);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`${inputClass} flex items-center justify-between gap-2 text-left`}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {CurrentIcon ? (
            <CurrentIcon size={18} className="shrink-0 text-brand-emerald-deep" aria-hidden="true" />
          ) : null}
          <span className={value ? "truncate" : "truncate text-muted"}>
            {value || "No icon"}
          </span>
        </span>
        <ChevronDown size={14} className={`shrink-0 text-muted transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-1.5 w-full rounded-xl border border-line bg-white p-2 shadow-lg">
          <div className="flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5">
            <Search size={13} className="shrink-0 text-muted" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search icons…"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
            />
          </div>

          <div className="mt-2 grid max-h-56 grid-cols-6 gap-1 overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              title="No icon"
              className="grid aspect-square place-items-center rounded-lg text-muted transition hover:bg-surface"
            >
              <X size={16} />
            </button>
            {filtered.map(({ name, Icon }) => (
              <button
                key={name}
                type="button"
                title={name}
                aria-label={name}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                className={`grid aspect-square place-items-center rounded-lg transition hover:bg-surface ${
                  name === value ? "bg-brand-green/10 ring-1 ring-brand-green" : ""
                }`}
              >
                <Icon size={17} className="text-body" aria-hidden="true" />
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="px-1 py-2 text-center text-xs text-muted">No icons match “{query}”.</p>
          )}
        </div>
      )}
    </div>
  );
}
