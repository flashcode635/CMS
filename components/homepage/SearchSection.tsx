"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback, KeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { Clock, X } from "lucide-react";
import { SearchBar } from "@/components/ui/searchbar";
import { Button } from "@/components/ui/Button";

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--color-brand-champagne) 35%, transparent), color-mix(in srgb, var(--color-brand-royal) 35%, transparent))", color: "white", borderRadius: "2px", padding: "0 1px" }}>
        {part}
      </mark>
    ) : part
  );
}

export default function SearchSection() {
  const [searchValue, setSearchValue]         = useState<string>("");
  const [recentSearches, setRecentSearches]   = useState<string[]>([]);
  const [showDropdown, setShowDropdown]       = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [searchFocused, setSearchFocused]     = useState<boolean>(false);

  const searchRef   = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef    = useRef<HTMLInputElement | null>(null);
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sph_recentSearches");
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    if (searchFocused && recentSearches.length > 0) {
      setShowDropdown(true);
      requestAnimationFrame(() => setDropdownVisible(true));
    } else {
      setDropdownVisible(false);
      dropdownTimer.current = setTimeout(() => setShowDropdown(false), 300);
    }
    return () => { if (dropdownTimer.current) clearTimeout(dropdownTimer.current); };
  }, [searchFocused, recentSearches]);

  useEffect(() => {
    function handleClick(e: MouseEvent | Event) {
      if (
        searchRef.current && !searchRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) setSearchFocused(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const saveSearch = useCallback((term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    try { localStorage.setItem("sph_recentSearches", JSON.stringify(updated)); } catch {}
  }, [recentSearches]);

  const removeRecent = (term: string, e: ReactMouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s !== term);
    setRecentSearches(updated);
    try { localStorage.setItem("sph_recentSearches", JSON.stringify(updated)); } catch {}
  };

  const handleSubmit = useCallback(() => {
    if (searchValue.trim()) { saveSearch(searchValue.trim()); setSearchFocused(false); }
  }, [searchValue, saveSearch]);

  const handleSearchBarSubmit = useCallback((term: string) => {
    setSearchValue(term);
    saveSearch(term);
    setSearchFocused(false);
  }, [saveSearch]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") setSearchFocused(false);
  };

  return (
    <>
      <style>{`
        
        
        
        .ss-search-bar { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .ss-search-bar:hover {
          border-color: color-mix(in srgb, var(--color-brand-champagne) 45%, transparent);
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-brand-champagne) 12%, transparent), 0 4px 24px color-mix(in srgb, var(--color-brand-champagne) 12%, transparent);
        }
        .ss-recent-pill { transition: all 0.22s ease; cursor: pointer; }
        .ss-recent-pill:hover {
          border-color: color-mix(in srgb, var(--color-brand-champagne) 50%, transparent);
          color: color-mix(in srgb, var(--color-brand-champagne) 85%, transparent);
          background: color-mix(in srgb, var(--color-brand-champagne) 8%, transparent);
        }
        .ss-pill-in { animation: sp-pill-in 0.25s ease forwards; }
        .ss-input { outline: none !important; box-shadow: none !important; }
      `}</style>

      <div className="relative w-full h-[50vh] flex items-center overflow-hidden bg-brand-forest-deep">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=507&fit=crop&crop=center"
            alt=""
            fill
            className="object-cover object-center"
            sizes="80vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-forest-deep) 88%, transparent) 0%, color-mix(in srgb, var(--color-brand-forest-deep) 82%, transparent) 100%)" }} />
        </div>

        <div className="absolute w-screen h-screen z-200 flex flex-col
         items-center justify-center gap-10 px-4">
          <div className="w-full relative flex justify-center items-center" ref={searchRef}>
            <SearchBar
            className=""
              color="transparent"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={handleKeyDown}
              onSearch={handleSearchBarSubmit}
              inputRef={inputRef}
              darkMode={true}
              showTags={true}
              onClear={() => {
                setSearchValue("");
                inputRef.current?.focus();
              }}
              iconClassName="text-white/50"
              inputClassName="flex-1 text-white font-normal font-['Inter'] leading-8 placeholder:text-white/70 caret-white"
            />

            {recentSearches.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
                <span className="text-white/30 self-center text-xs">Recent:</span>
                {recentSearches.map((term, i) => (
                  <span
                    key={term}
                    className="ss-recent-pill ss-pill-in flex items-center gap-1 px-4 py-2 border border-white/20 text-white/70 text-sm font-normal rounded-sm"
                    style={{ animationDelay: `${i * 40}ms` }}
                    onClick={() => { setSearchValue(term); inputRef.current?.focus(); }}
                  >
                    <Clock size={11} className="opacity-50" />
                    {highlightMatch(term, searchValue)}
                    <Button aria-label="Remove recent search" variant="unstyled" size="icon" onClick={(e) => removeRecent(term, e)} className="text-white/25 hover:text-white/60 transition-colors ml-0.5 size-auto p-0 bg-transparent hover:bg-transparent shadow-none border-0" tabIndex={-1}>
                      <X size={10} />
                    </Button>
                  </span>
                ))}
              </div>
            )}

            {showDropdown && (
              <div
                ref={dropdownRef}
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0, right: 0,
                  zIndex: 50,
                  animation: dropdownVisible ? "sp-dropdown-in 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" : "sp-dropdown-out 0.22s ease forwards",
                  background: "color-mix(in srgb, var(--color-brand-forest-deep) 82%, transparent)",
                  backdropFilter: "blur(24px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                  border: "1px solid color-mix(in srgb, var(--color-brand-champagne) 15%, transparent)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 40px color-mix(in srgb, black 55%, transparent), inset 0 1px 0 color-mix(in srgb, white 5%, transparent)",
                  overflow: "hidden",
                }}
              >
                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-brand-champagne) 50%, transparent), color-mix(in srgb, var(--color-blue-600) 50%, transparent), transparent)" }} />
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <p style={{ fontSize: 11, color: "color-mix(in srgb, white 35%, transparent)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Recent Searches</p>
                    <Button variant="unstyled"
                      onClick={() => { setRecentSearches([]); try { localStorage.removeItem("sph_recentSearches"); } catch {} }}
                      className="shadow-none border-0 p-0 bg-transparent h-auto"
                      style={{ fontSize: 11, color: "color-mix(in srgb, var(--color-brand-champagne) 50%, transparent)", cursor: "pointer", transition: "color 0.18s" }}
                      onMouseEnter={(e: ReactMouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "color-mix(in srgb, var(--color-brand-champagne) 90%, transparent)")}
                      onMouseLeave={(e: ReactMouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "color-mix(in srgb, var(--color-brand-champagne) 50%, transparent)")}
                    >
                      Clear all
                    </Button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {recentSearches.map((term) => (
                      <Button variant="unstyled"
                        key={term}
                        onClick={() => { setSearchValue(term); inputRef.current?.focus(); setSearchFocused(false); }}
                        className="shadow-none h-auto"
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, border: "1px solid color-mix(in srgb, white 12%, transparent)", background: "color-mix(in srgb, white 4%, transparent)", color: "color-mix(in srgb, white 65%, transparent)", fontSize: 13, cursor: "pointer", transition: "all 0.18s ease" }}
                        onMouseEnter={(e: ReactMouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "color-mix(in srgb, var(--color-brand-champagne) 35%, transparent)"; e.currentTarget.style.color = "color-mix(in srgb, var(--color-brand-champagne) 85%, transparent)"; e.currentTarget.style.background = "color-mix(in srgb, var(--color-brand-champagne) 7%, transparent)"; }}
                        onMouseLeave={(e: ReactMouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "color-mix(in srgb, white 12%, transparent)"; e.currentTarget.style.color = "color-mix(in srgb, white 65%, transparent)"; e.currentTarget.style.background = "color-mix(in srgb, white 4%, transparent)"; }}
                      >
                        <Clock size={12} style={{ opacity: 0.4 }} />
                        {highlightMatch(term, searchValue)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div style={{ borderTop: "1px solid color-mix(in srgb, white 5%, transparent)", padding: "10px 20px", display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="brand"
                    onClick={handleSubmit}
                    className="shadow-none h-auto"
                    style={{ fontSize: 11, padding: "4px 12px", borderRadius: 5, background: "linear-gradient(90deg, color-mix(in srgb, var(--color-green-800) 60%, transparent), color-mix(in srgb, var(--color-blue-600) 60%, transparent))", border: "1px solid color-mix(in srgb, white 10%, transparent)", color: "color-mix(in srgb, white 80%, transparent)", cursor: "pointer", transition: "opacity 0.18s" }}
                    onMouseEnter={(e: ReactMouseEvent<HTMLButtonElement>) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e: ReactMouseEvent<HTMLButtonElement>) => (e.currentTarget.style.opacity = "1")}
                  >
                    Search
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
