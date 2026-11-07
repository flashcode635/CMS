
"use client";
import { useState, ChangeEvent, KeyboardEvent, RefObject } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const searchTags = ["Courses", "Services", "Nearby Counsellor", "Contact Us"];

type SearchBarProps = {
  color: string;
  onSearch?: (value: string) => void;
  className?: string;
  darkMode?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  showTags?: boolean;
  onClear?: () => void;
  iconClassName?: string;
  inputClassName?: string;
};

export const SearchBar = ({
  color,
  onSearch,
  className = "",
  value,
  darkMode,
  onChange,
  onFocus,
  onKeyDown,
  inputRef,
  showTags = true,
  onClear,
  iconClassName = "text-black",
  inputClassName = "text-black placeholder:text-black",
}: SearchBarProps) => {
    const [internalSearchValue, setInternalSearchValue] = useState<string>("");
    const searchValue = value ?? internalSearchValue;

    const handleSubmit = () => {
      const value = searchValue.trim();
      if (value) onSearch?.(value);
    };

    return(
        <>
             {/* ========================================== */}
      {/* BOTTOM SEARCH BAR & QUICK TAGS */}
      {/* ========================================== */}
     <div className={`${className || ""}
      w-[calc(100%-32px)]
      rounded-4.25 px-5 pt-7.5 pb-4
     shadow-sm sm:px-19.25`}
     style={{ backgroundColor: color }}
     >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          className="flex items-center gap-4 border-b 
        border-[#D6CCBA] pb-5">
          <Search className={`h-5.5 w-5.5 font-thin shrink-0 ${iconClassName}`} />
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(event) => {
              setInternalSearchValue(event.target.value);
              onChange?.(event);
            }}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            placeholder="Search For..."
            className={`w-full bg-transparent text-sm font-thin outline-none ${inputClassName}`}
          />
          {searchValue && onClear && (
            <Button aria-label="Clear search" variant="unstyled"
              size="icon"
              type="button"
              onClick={onClear}
              className="shrink-0 text-white/30 transition-colors hover:text-white/70 bg-transparent hover:bg-transparent shadow-none border-0 size-auto p-0"
              tabIndex={-1}
            >
              <X size={18} />
            </Button>
          )}
        </form>

        {showTags && <div className="mt-7.5 flex flex-wrap items-center justify-center gap-6">
          {searchTags.map((tag) => (
            <Button
              variant="unstyled"
              key={tag}
              type="button"
              onClick={() => onSearch?.(tag)}
              className={`border-2 border-[#9098a580] hover:text-[#12211C] hover:cursor-pointer bg-transparent px-4 
              py-2 text-xs font-normal ${darkMode ? 'text-white!' : 'text-[#2A3A33]'} transition-all
               hover:bg-[#D6CCBA40]
              sm:px-4.25 h-auto shadow-none`}
            >
              {tag}
            </Button>
          ))}
        </div>}
      </div>
        </>
    )
}