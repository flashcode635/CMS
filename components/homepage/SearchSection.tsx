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
      <mark key={i} style={{ background: "linear-gradient(90deg, rgba(0,200,200,0.35), rgba(30,80,200,0.35))", color: "#7df9ff", borderRadius: "2px", padding: "0 1px" }}>
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
        @keyframes dropdownIn {
          0%   { opacity: 0; transform: translateY(-10px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes dropdownOut {
          0%   { opacity: 1; transform: translateY(0)     scale(1);    }
          100% { opacity: 0; transform: translateY(-10px) scale(0.98); }
        }
        @keyframes pillIn {
          0%   { opacity: 0; transform: translateY(6px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .ss-search-bar { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .ss-search-bar:hover {
          border-color: rgba(0,220,220,0.45);
          box-shadow: 0 0 0 1px rgba(0,200,200,0.12), 0 4px 24px rgba(0,180,200,0.12);
        }
        .ss-recent-pill { transition: all 0.22s ease; cursor: pointer; }
        .ss-recent-pill:hover {
          border-color: rgba(0,200,200,0.5);
          color: rgba(0,220,220,0.85);
          background: rgba(0,180,200,0.08);
        }
        .ss-pill-in { animation: pillIn 0.25s ease forwards; }
        .ss-input { outline: none !important; box-shadow: none !important; }
      `}</style>

      <div className="relative w-full h-[50vh] flex items-center overflow-hidden bg-[#0b1629]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=507&fit=crop&crop=center"
            alt=""
            fill
            className="object-cover object-center"
            sizes="80vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,10,30,0.88) 0%, rgba(5,15,50,0.82) 100%)" }} />
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
                  animation: dropdownVisible ? "dropdownIn 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" : "dropdownOut 0.22s ease forwards",
                  background: "rgba(8, 16, 40, 0.82)",
                  backdropFilter: "blur(24px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                  border: "1px solid rgba(0,200,200,0.15)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
                  overflow: "hidden",
                }}
              >
                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,200,200,0.5), rgba(37,99,235,0.5), transparent)" }} />
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Recent Searches</p>
                    <Button variant="unstyled"
                      onClick={() => { setRecentSearches([]); try { localStorage.removeItem("sph_recentSearches"); } catch {} }}
                      className="shadow-none border-0 p-0 bg-transparent h-auto"
                      style={{ fontSize: 11, color: "rgba(0,200,200,0.5)", cursor: "pointer", transition: "color 0.18s" }}
                      onMouseEnter={(e: ReactMouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "rgba(0,200,200,0.9)")}
                      onMouseLeave={(e: ReactMouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "rgba(0,200,200,0.5)")}
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
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.65)", fontSize: 13, cursor: "pointer", transition: "all 0.18s ease" }}
                        onMouseEnter={(e: ReactMouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "rgba(0,200,200,0.35)"; e.currentTarget.style.color = "rgba(0,220,220,0.85)"; e.currentTarget.style.background = "rgba(0,180,200,0.07)"; }}
                        onMouseLeave={(e: ReactMouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                      >
                        <Clock size={12} style={{ opacity: 0.4 }} />
                        {highlightMatch(term, searchValue)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "10px 20px", display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="brand"
                    onClick={handleSubmit}
                    className="shadow-none h-auto"
                    style={{ fontSize: 11, padding: "4px 12px", borderRadius: 5, background: "linear-gradient(90deg, rgba(22,101,52,0.6), rgba(37,99,235,0.6))", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", cursor: "pointer", transition: "opacity 0.18s" }}
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
