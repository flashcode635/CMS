"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useMemo, ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";

const BTN_GRAD = "linear-gradient(157.91deg, #0E8F5B 12.704%, #0B3B2E 87.17%)";
const PER_PAGE = 9;

export interface Brochure {
  id: string | number;
  title: string;
  description?: string;
  coverImage: string;
  fileUrl?: string;
  fileName?: string;
  year?: number | string;
}

export interface BrochuresGridProps {
  brochures?: Brochure[];
  isLoading?: boolean;
}

function getYears(brochures: Brochure[]): string[] {
  const yearsSet = new Set<string>();
  brochures.forEach((b) => {
    if (b.year) yearsSet.add(String(b.year));
  });
  const years = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
  return ["All Years", ...years];
}

function DownloadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path
        d="M12 16L7 11l1.4-1.45 2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5zm-6 4q-.825 0-1.412-.587A1.927 1.927 0 0 1 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413A1.927 1.927 0 0 1 18 20H6z"
        fill="white"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <circle cx="11" cy="11" r="7" stroke="#7A857E" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="#7A857E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9L12 15L18 9" stroke="#4A554F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6L18 18" stroke="#7A857E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div
      className="bg-[rgba(160,183,255,0.1)] border border-brand-royal rounded-4xl flex h-full flex-col gap-3.5 p-4 xl:p-5 w-full animate-pulse"
      style={{ borderWidth: "1.167px" }}
    >
      <div className="aspect-[16/10] w-full rounded-2xl bg-[#F1E3C8]" />
      <div className="flex flex-1 flex-col gap-2.5 w-full">
        <div className="h-5 w-3/4 rounded-lg bg-[#F1E3C8]" />
        <div className="h-3.5 w-full rounded bg-[#F1E3C8]" />
        <div className="h-3.5 w-5/6 rounded bg-[#F1E3C8]" />
      </div>
      <div className="h-11 md:h-12 w-full rounded-xl bg-[#F1E3C8]" />
    </div>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
          stroke="#F1E3C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
          stroke="#F1E3C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
      <p
        className="text-[#4A554F] text-lg font-medium text-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {hasFilters
          ? "No brochures match your search. Try a different keyword or filter."
          : "No brochures available yet. Check back soon."}
      </p>
    </div>
  );
}

function BrochureCard({ brochure, index, visible }: { brochure: Brochure; index: number; visible: boolean }) {
  const delay = (index % 3) * 80;
  const [coverFailed, setCoverFailed] = useState(false);

  return (
    <div
      className="bg-[rgba(160,183,255,0.1)] border border-brand-royal rounded-4xl flex h-full flex-col gap-3.5 p-4 xl:p-5 w-full"
      style={{
        borderWidth: "1.167px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, box-shadow 0.6s cubic-bezier(0.22,1,0.36,1), translate 0.6s cubic-bezier(0.22,1,0.36,1)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,57,234,0.07)";
        e.currentTarget.style.translate = "0 -3px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.translate = "0 0";
      }}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl bg-[#EFE9DE]">
        {coverFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center text-brand-blue/55">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">
              Brochure
            </span>
          </div>
        ) : (
          <Image
            src={brochure.coverImage}
            alt={brochure.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            onError={() => setCoverFailed(true)}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 w-full">
        <h3
          className="text-[#12211C] text-[17px] md:text-[19px] font-semibold leading-[1.25] tracking-[-0.3px] m-0"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {brochure.title}
        </h3>
        {brochure.description && (
          <p
            className="text-[#4A554F] text-[13px] md:text-[14px] font-normal leading-[1.45] tracking-[-0.2px] m-0"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {brochure.description}
          </p>
        )}
      </div>

      <a
        href={brochure.fileUrl || "#"}
        download={brochure.fileName || true}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 w-full h-11 md:h-12 rounded-xl text-white font-semibold text-[13px] md:text-[14px] tracking-[-0.2px] whitespace-nowrap
                   hover:opacity-90 active:scale-[0.98] transition-opacity duration-200"
        style={{ fontFamily: "'Inter', sans-serif", backgroundImage: BTN_GRAD }}
      >
        Download Brochure {brochure.year || "2025"}
        <DownloadIcon />
      </a>
    </div>
  );
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = value !== options[0];

  return (
    <div ref={ref} className="relative shrink-0">
      <Button onClick={() => setOpen((o) => !o)} variant="outline" 
      size="md" 
        shape="pill" active={isActive}
  className="px-4 data-[active=true]:border-brand-royal
   data-[active=true]:bg-brand-royal/6 data-[active=true]:text-brand-royal">
        {label}: <span className="font-semibold">{value}</span>
        <ChevronIcon open={open} />
      </Button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-999 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-[#E4DDD0] py-1.5 min-w-40 overflow-hidden">
          {options.map((opt) => (
            <Button key={opt} variant="ghost" size="bare" shape="none" active={value === opt}
  onClick={() => { onChange(opt); setOpen(false); }}
  className="w-full justify-start px-4 py-2.5 text-sm text-body data-[active=true]:bg-brand-royal/[0.07] data-[active=true]:text-brand-royal">
              {opt}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = useMemo(() => {
    const result: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) result.push(i);
    } else {
      result.push(1);
      if (currentPage > 3) result.push("…");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) result.push(i);
      if (currentPage < totalPages - 2) result.push("…");
      result.push(totalPages);
    }
    return result;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
<Button size="icon" variant="outline" shape="pill"
  onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
  aria-label="Previous page">
        <ChevronLeftIcon />
      </Button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-[#7A857E] text-sm select-none">
            …
          </span>
        ) : (
          <Button key={p} size="icon" variant="tab" shape="pill" active={p === currentPage}
  onClick={() => onPageChange(Number(p))}
  aria-label={`Page ${p}`}
  aria-current={p === currentPage ? "page" : undefined}
  className="text-sm font-medium">
            {p}
          </Button>
        )
      )}

      <Button size="icon" variant="outline" shape="pill"
  onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
  aria-label="Next page">
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

export default function BrochuresGrid({ brochures = [], isLoading = false }: BrochuresGridProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All Years");
  const [currentPage, setCurrentPage] = useState(1);

  const yearOptions = useMemo(() => getYears(brochures), [brochures]);

  const filtered = useMemo(() => {
    let list = brochures;

    if (yearFilter !== "All Years") {
      list = list.filter((b) => String(b.year) === yearFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [brochures, search, yearFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // Filter changes always restart from the first page.
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleYearChange = (value: string) => {
    setYearFilter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setYearFilter("All Years");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hasFilters = search.trim() !== "" || yearFilter !== "All Years";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-5 md:px-10 lg:px-14 xl:px-20 pt-6 md:pt-10 pb-12 md:pb-16"
      style={{ backgroundColor: "#EFE9DE" }}
    >
      <div
        className="flex flex-col gap-2 items-center text-center mb-6 md:mb-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.05s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s",
        }}
      >
        <h2
          className="text-[24px] md:text-[32px] lg:text-[38px] font-extrabold leading-[1.2] m-0 max-w-[960px] text-balance"
          style={{
            fontFamily: "'Playfair Display', serif",
            backgroundImage: "linear-gradient(156.24deg, #0E8F5B 12.704%, #0B3B2E 87.17%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Explore our premium educational brochures &amp; My Study Hub
        </h2>
        <p
          className="text-[#0b0b0b99] text-[13px] md:text-[15px] font-normal leading-[1.45] tracking-[-0.2px] m-0 max-w-[640px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Together, we strengthen international connections and expand opportunities
          by combining global expertise with local insights.
        </p>
      </div>

      <div
        ref={gridRef}
        className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5 md:mb-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s",
        }}
      >
        <div className="relative flex-1 min-w-0">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
            placeholder="Search by college or university name…"
            className="w-full h-11 pl-10 pr-11 rounded-full border border-[#D6CCBA] bg-white text-sm text-[#2A3A33] placeholder-[#7A857E]
                       focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10
                       transition-all duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          {search && (
            <button
              type="button"
              onClick={handleClearFilters}
              aria-label="Clear search and filters"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#072A21]/5 transition-colors"
            >
              <ClearIcon />
            </button>
          )}
        </div>

        <FilterDropdown
          label="Year"
          options={yearOptions}
          value={yearFilter}
          onChange={handleYearChange}
        />

        {hasFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="shrink-0 self-start sm:self-center px-1 text-sm text-[#4A554F] hover:text-brand-royal transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Clear all
          </button>
        )}
      </div>

      {!isLoading && visible && (
        <p
          className="text-xs md:text-sm text-[#7A857E] mb-3 md:mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {filtered.length === 0
            ? "No results"
            : `Showing ${(currentPage - 1) * PER_PAGE + 1}–${Math.min(currentPage * PER_PAGE, filtered.length)} of ${filtered.length} brochure${filtered.length !== 1 ? "s" : ""}`}
        </p>
      )}

      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:gap-5">
        {isLoading ? (
          Array.from({ length: PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)
        ) : paginated.length === 0 ? (
          <EmptyState hasFilters={hasFilters} />
        ) : (
          paginated.map((brochure, i) => (
            <BrochureCard key={brochure.id} brochure={brochure} index={i} visible={visible} />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        ) : paginated.length === 0 ? (
          <div className="sm:col-span-2 flex flex-col items-center justify-center py-16 gap-3">
            <p
              className="text-[#4A554F] text-base font-medium text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {hasFilters
                ? "No brochures match your search."
                : "No brochures available yet."}
            </p>
          </div>
        ) : (
          paginated.map((brochure, i) => (
            <BrochureCard key={brochure.id} brochure={brochure} index={i} visible={visible} />
          ))
        )}
      </div>

      {!isLoading && filtered.length > PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
