"use client";
import PreviewSection from "@/components/cms/previewSection";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {SectionLabel, StatusBadge, Card, Field} from "@/components/cms/smallerComponents";
import {
  LayoutDashboard, LogOut, Search, Globe2, Settings, Eye, Save,
  Trash2, ChevronRight, Menu, GraduationCap, ExternalLink,
  CheckCircle2, AlertCircle, X, Pencil,
} from "lucide-react";
import Template from "@/components/cms/template";
import SectionEditor from "@/components/cms/sectionEditor";
import UnivLayoutPreview from "@/components/cms/univLayoutPreview";
import LiveSectionEditor from "@/components/cms/liveSectionEditor";
import { useCmsStore } from "@/store/cmsStore";
import type { ContentType, Entry, Section, Toast, Pane } from "@/types/types";
/* ---------- constants ---------- */
const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "universities", label: "Universities", icon: GraduationCap },
  { id: "countries", label: "Countries", icon: Globe2 },
] as const;

type LiveRoute = { title: string; slug: string; href: string; code?: string };

const ROUTES: Record<ContentType, LiveRoute[]> = {
  universities: [
    { title: "Samara State Medical University", slug: "/universities/samara-state-medical-university", href: "/universities/samara-state-medical-university" },
    { title: "Kazan Federal University", slug: "/universities/kazan-federal-university", href: "/universities/kazan-federal-university" },
    // ...one entry per university
  ],
  countries: [
    { title: "MBBS in Russia", code: "RU", slug: "russia", href: "/countries/russia" },
    { title: "MBBS in Kyrgyzstan", code: "KG", slug: "kyrgyzstan", href: "/countries/kyrgyzstan" },
    // ...one entry per country
  ],
};

const blankEntry = (type: ContentType): Entry => ({
  id: "new", type, slug: "", title: "", status: "draft",
  data: { description: "", heroImage: "", sections: [] },
});

/* ---------- shared styles ---------- */
const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink sm:text-sm " +
  "placeholder:text-muted outline-none transition " +
  "hover:border-line-strong focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";

/* ---------- page ---------- */
export default function DashboardPage() {
  const [active, setActive] = useState<ContentType>("universities");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedId, setSelectedId] = useState("new");
  const [selected, setSelected] = useState<Entry>(blankEntry("universities"));
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [mobilePane, setMobilePane] = useState<Pane>("list");
  const [railOpen, setRailOpen] = useState(false);
  // university live routes straight from the DB (hardcoded ROUTES as fallback)
  const [dbRoutes, setDbRoutes] = useState<LiveRoute[]>([]);

  // live-preview selection lives in the store (see components/cms/previewSection.tsx)
  const selectedCountry = useCmsStore((s) => s.selectedCountry);
  const selectedUniversity = useCmsStore((s) => s.selectedUniversity);
  const setSelectedCountry = useCmsStore((s) => s.setSelectedCountry);
  const setSelectedUniversity = useCmsStore((s) => s.setSelectedUniversity);
  const setActiveSection = useCmsStore((s) => s.setActiveSection);
  const clearPreview = useCmsStore((s) => s.clearPreview);
  const activePreview = active === "countries" ? selectedCountry : selectedUniversity;
  // when a section is clicked in the preview, jump to the edit pane (mobile)
  const editRequest = useCmsStore((s) => s.editRequest);
  const activeSection = useCmsStore((s) => s.activeSection);
  useEffect(() => {
    if (editRequest > 0 && activeSection) setMobilePane("form");
  }, [editRequest, activeSection]);

  // ref so loadEntries doesn't refetch on every entry click
  const selectedIdRef = useRef(selectedId);
  useEffect(() => { selectedIdRef.current = selectedId; }, [selectedId]);

  const notify = (text: string, kind: "success" | "error" = "success") => setToast({ text, kind });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const loadEntries = useCallback(async (type: ContentType) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content?type=${type}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Unable to load CMS content");
      const payload = await res.json();
      const items: Entry[] = payload.data ?? [];
      setEntries(items);
      if (selectedIdRef.current !== "new") {
        const current = items.find((i) => i.id === selectedIdRef.current);
        if (current) setSelected(current);
        else { setSelectedId("new"); setSelected(blankEntry(type)); }
      }
    } catch (e) {
      notify(e instanceof Error ? e.message : "Unable to load content", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadEntries(active); }, [active, loadEntries]);

  // load the university live routes from the DB; on failure keep ROUTES
  useEffect(() => {
    fetch("/api/admin/universities", { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error("Unable to load universities");
        const payload = await r.json();
        const rows: Array<{ name?: string; slug?: string }> = payload.data ?? [];
        const routes: LiveRoute[] = rows
          .filter((u) => u.slug)
          .map((u) => ({
            title: u.name ?? (u.slug as string),
            slug: `/universities/${u.slug}`,
            href: `/universities/${u.slug}`,
          }));
        if (routes.length > 0) setDbRoutes(routes);
      })
      .catch(() => { /* fallback: hardcoded ROUTES stay in use */ });
  }, []);

  const q = query.toLowerCase();
  const filtered = useMemo(
    () => entries.filter((i) => `${i.title} ${i.slug}`.toLowerCase().includes(q)),
    [entries, q]
  );
  const routesForActive = active === "universities" && dbRoutes.length > 0 ? dbRoutes : ROUTES[active];
  const filteredRoutes = useMemo(
    () => routesForActive.filter((r) => `${r.title} ${r.slug}`.toLowerCase().includes(q)),
    [routesForActive, q]
  );

  /* ---------- actions ---------- */
  function chooseType(type: ContentType) {
    setActive(type); setSelectedId("new"); setSelected(blankEntry(type));
    clearPreview();
    setQuery(""); setMobilePane("list"); setRailOpen(false);
  }

  /** Live route click -> store update -> inline preview in the rightmost pane. */
  function previewRoute(route: LiveRoute) {
    setActiveSection(null); // previous page's selection must not leak into this page
    if (active === "countries") {
      setSelectedCountry({
        name: route.title.replace(/^MBBS in /i, ""),
        code: route.code ?? route.slug.slice(0, 2).toUpperCase(),
        slug: route.slug,
      });
    } else {
      setSelectedUniversity({
        name: route.title,
        slug: route.href.split("/").filter(Boolean).pop() ?? route.slug,
      });
    }
    setMobilePane("preview");
  }
  function chooseEntry(entry: Entry) {
    clearPreview();
    setSelectedId(entry.id); setSelected(structuredClone(entry)); setMobilePane("form");
  }
  const updateField = (field: keyof Entry, value: unknown) =>
    setSelected((c) => ({ ...c, [field]: value }));
  const updateData = (field: string, value: unknown) =>
    setSelected((c) => ({ ...c, data: { ...c.data, [field]: value } }));

  const sections: Section[] = Array.isArray(selected.data.sections)
    ? (selected.data.sections as Section[])
    : [];
  const setSections = (next: Section[]) => updateData("sections", next);

  async function saveEntry() {
    setSaving(true);
    try {
      const isNew = selected.id === "new";
      const res = await fetch(isNew ? "/api/admin/content" : `/api/admin/content/${selected.id}`, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selected, type: active }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload?.error?.message ?? "Save failed");
      const saved: Entry = payload.data;
      setSelected(saved); setSelectedId(saved.id);
      await loadEntries(active);
      notify("Changes saved");
    } catch (e) {
      notify(e instanceof Error ? e.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEntry() {
    if (selected.id === "new" || !window.confirm(`Delete "${selected.title}"?`)) return;
    const res = await fetch(`/api/admin/content/${selected.id}`, { method: "DELETE" });
    if (!res.ok) return notify("Delete failed", "error");
    setSelected(blankEntry(active)); setSelectedId("new");
    await loadEntries(active);
    notify("Entry deleted");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const title = active === "universities" ? "Universities" : "Countries";
  const isNew = selected.id === "new";
  const canSave = !saving && selected.title.trim() && selected.slug.trim();

  return (
    <div className="flex h-dvh overflow-hidden bg-surface-alt text-ink">
      {/* ---------- toast ---------- */}
      {toast && (
        <div
          role="status"
          className={`fixed inset-x-4 top-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ring-1 sm:inset-x-auto sm:right-5 sm:top-5 sm:max-w-sm ${
            toast.kind === "success"
              ? "bg-white text-brand-royal ring-brand-royal/20"
              : "bg-white text-red-600 ring-red-200"
          }`}
        >
          {toast.kind === "success" ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
          {toast.text}
          <button onClick={() => setToast(null)} className="ml-2 text-muted hover:text-body">
            <X size={14} />
          </button>
        </div>
      )}

      {/* ---------- icon rail ---------- */}
      <aside
        className={`${railOpen ? "fixed inset-y-0 left-0 z-40 flex" : "hidden"} w-17 shrink-0 flex-col items-center bg-linear-to-b from-brand-forest-deep to-brand-forest-deep py-5 text-white
         shadow-xl md:flex`}
      >
        <div className="mb-8 grid h-10 w-10 place-items-center rounded-xl bg-brand-green text-sm font-bold shadow-md shadow-black/20">
          SP
        </div>
        <nav className="flex flex-col gap-2">
          {NAV.map(({ id, label, icon: Icon }) => {
            const on = active === id;
            return (
              <button
                key={id}
                title={label}
                onClick={() => id !== "overview" && chooseType(id)}
                className={`group relative grid h-11 w-11 place-items-center rounded-xl transition ${
                  on ? "bg-brand-green text-white shadow-md shadow-black/20" : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {on && <span className="absolute -left-3 h-5 w-1 rounded-r-full bg-white" />}
                <Icon size={20} />
              </button>
            );
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <button title="Settings" className="grid h-11 w-11 place-items-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white">
            <Settings size={19} />
          </button>
          <button title="Logout" onClick={logout} className="grid h-11 w-11 place-items-center rounded-xl text-white/60 transition hover:bg-red-500/20 hover:text-red-200">
            <LogOut size={19} />
          </button>
        </div>
      </aside>
      {railOpen && (
        <button aria-label="Close navigation" onClick={() => setRailOpen(false)} className="fixed inset-0 z-30 bg-brand-forest-deep/45 backdrop-blur-sm md:hidden" />
      )}

      {/* ---------- list pane ---------- */}
      <section
        className={`${mobilePane === "list" ? "flex" : "hidden"} w-full shrink-0 flex-col border-r border-line bg-white md:flex md:w-72`}
      >
        <header className="border-b border-line px-5 pb-4 pt-5">
          <div className="flex items-center gap-3">
            <button className="grid h-10 w-10 place-items-center rounded-lg hover:bg-surface-alt md:hidden" onClick={() => setRailOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-green">My Study Hub</p>
              <h1 className="mt-0.5 text-lg font-bold tracking-tight">{title}</h1>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 transition focus-within:border-brand-green focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-green/10">
            <Search size={15} className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full bg-transparent text-base outline-none placeholder:text-muted sm:text-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted hover:text-body">
                <X size={14} />
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {loading && (
            <div className="space-y-2 px-1 py-4">
              {[0, 1, 2].map((i) => <div key={i} className="h-12 animate-pulse rounded-xl bg-surface-alt" />)}
            </div>
          )}

          {filteredRoutes.length > 0 && (
            <div className="mb-3">
              <SectionLabel>Live routes</SectionLabel>
              {filteredRoutes.map((route) => {
                const previewing =
                  active === "countries"
                    ? selectedCountry?.slug === route.slug
                    : selectedUniversity?.slug === route.href.split("/").filter(Boolean).pop();
                return (
                  <div
                    key={route.href}
                    className={`grid grid-cols-4 mb-1 rounded-xl transition ${
                      previewing ? "bg-surface-alt ring-1 ring-brand-royal/10" : "hover:bg-surface"
                    }`}
                  >
                    <button onClick={() => previewRoute(route)} className="min-w-0 col-span-3 px-3 py-2.5 text-left">
                      <span className="block truncate text-sm font-medium">{route.title}</span>
                      <span className="block truncate text-xs text-muted">{route.slug}</span>
                    </button>
                    <a
                      href={route.href}
                      target="_blank"
                      rel="noreferrer"
                      title="Open live page"
                      className="group col-span-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 transition"
                    >
                      <ExternalLink size={14} className="shrink-0 text-muted transition group-hover:text-brand-green" />
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {filtered.length > 0 && <SectionLabel>CMS entries</SectionLabel>}
          {filtered.map((entry) => {
            const on = selectedId === entry.id;
            return (
              <button
                key={entry.id}
                onClick={() => chooseEntry(entry)}
                className={`mb-1 flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                  on ? "bg-surface-alt text-brand-royal ring-1 ring-brand-royal/10" : "hover:bg-surface"
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{entry.title || "Untitled"}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted">/{entry.slug}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <StatusBadge status={entry.status} />
                  <ChevronRight size={15} className="opacity-40" />
                </span>
              </button>
            );
          })}

          {!loading && filtered.length === 0 && (
            <div className="px-3 py-10 text-center">
              <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-surface-alt text-muted">
                <Pencil size={18} />
              </div>
              <p className="text-sm font-medium text-body">No entries yet</p>
              <p className="mt-1 text-xs text-muted">Fill the form to create your first one.</p>
            </div>
          )}
        </div>
      </section>

      {/* ---------- form pane ---------- */}
      <main className={`${mobilePane === "form" ? "flex" : "hidden"} min-w-0 flex-1 flex-col bg-white md:flex`}>
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-xs text-muted">
              CMS <ChevronRight size={11} /> {title}
            </p>
            <h2 className="mt-1 truncate text-base font-semibold">
              {activePreview
                ? "Live page editor"
                : isNew ? `New ${active}` : selected.title || "Edit entry"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {!activePreview && !isNew && <StatusBadge status={selected.status} />}
            <button onClick={() => setMobilePane("preview")} className="rounded-lg border border-line p-2 text-body hover:bg-surface md:hidden">
              <Eye size={16} />
            </button>
          </div>
        </header>

        <div className="flex-1 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded-lg
        space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activePreview ? (
            /* live page mode: edit the content fetched from lib/constants — FE-only, never stored */
            <LiveSectionEditor active={active} />
          ) : (
            /* CMS entry mode */
            <>
              <Card title="Details">
            <Field label="Title">
              <input value={selected.title} onChange={(e) => updateField("title", e.target.value)} className={inputClass} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="URL slug">
                <input
                  value={selected.slug}
                  onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                  placeholder="e.g. samara-state-medical-university"
                  className={inputClass}
                />
              </Field>
              <Field label="Status">
                <select value={selected.status} onChange={(e) => updateField("status", e.target.value)} className={inputClass}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </Field>
            </div>
          </Card>

          <Card title="Basic content">
            <Field label="Short description">
              <textarea
                value={String(selected.data.description ?? "")}
                onChange={(e) => updateData("description", e.target.value)}
                rows={4}
                className={`${inputClass} resize-y`}
              />
            </Field>
            <Field label="Hero image path / URL">
              <input
                value={String(selected.data.heroImage ?? "")}
                onChange={(e) => updateData("heroImage", e.target.value)}
                placeholder="/countries/russia/hero.webp"
                className={inputClass}
              />
            </Field>
          </Card>

          <SectionEditor sections={sections} onChange={setSections} active={active} />
            </>
          )}
        </div>

        {!activePreview && (
        <footer className="flex items-center justify-between gap-2 border-t border-line bg-white/90 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:px-6 sm:py-4">
          <button
            onClick={deleteEntry}
            disabled={isNew}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:pointer-events-none disabled:opacity-30"
          >
            <Trash2 size={15} /> Delete
          </button>
          <div className="flex gap-2">
            <button onClick={() => setMobilePane("list")} className="rounded-xl border border-line px-4 py-2 text-sm font-medium hover:bg-surface md:hidden">
              List
            </button>
            <button
              onClick={saveEntry}
              disabled={!canSave}
              className="flex items-center gap-2 rounded-xl bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-green/30 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              <Save size={15} />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </footer>
        )}
      </main>

      {/* ---------- preview pane ---------- */}
      <aside className={`${mobilePane === "preview" ? "flex" : "hidden"} min-w-0 flex-1 flex-col bg-surface-alt md:flex`}>
        <header className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" /> Live preview
            </p>
            <h2 className="mt-1 text-sm font-semibold">Page canvas</h2>
          </div>
          <div className="flex gap-2 md:hidden">
            <button onClick={() => setMobilePane("list")} className="rounded-lg border border-line px-3 py-2 text-xs font-medium hover:bg-surface">
              List
            </button>
            <button onClick={() => setMobilePane("form")} className="rounded-lg border border-line px-3 py-2 text-xs font-medium hover:bg-surface">
              Edit
            </button>
          </div>
        </header>
        <div className="flex-1 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded-lg overflow-y-auto py-4 px-1 md:p-7">
          <div className="@container mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line">
            {activePreview ? <PreviewSection /> : active === "universities" ? (
              <UnivLayoutPreview selected={selected} sections={sections} />
            ) : (
              <Template sections={sections} selected={selected} active={active} />
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
