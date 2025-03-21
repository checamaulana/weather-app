import React, { useRef, useEffect } from "react";
import { SuggestionCity } from "../types/weather";

interface SearchBarProps {
  city: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onSelectSuggestion: (suggestion: SuggestionCity) => void;
  suggestions: SuggestionCity[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  city,
  onInputChange,
  onSearch,
  onSelectSuggestion,
  suggestions,
  showSuggestions,
  setShowSuggestions,
}) => {
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSuggestions]);

  return (
    <form
      onSubmit={onSearch}
      className="mb-6 md:mb-8 rounded-xl bg-blue-50 p-2 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)]"
    >
      <div className="flex items-center relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city..."
          className="w-full bg-transparent px-3 md:px-4 py-2 outline-none text-gray-700 text-sm md:text-base"
          value={city}
          onChange={onInputChange}
          onFocus={() => city.length >= 2 && setShowSuggestions(true)}
        />
        <button
          type="submit"
          className="p-2 ml-2 rounded-lg bg-blue-50 shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.8)] transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-blue-50 shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)] z-10 max-h-64 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 md:px-4 py-2 md:py-3 cursor-pointer hover:bg-blue-100 first:rounded-t-xl last:rounded-b-xl transition-colors border-b border-blue-100 last:border-0"
                onClick={() => onSelectSuggestion(suggestion)}
              >
                <div className="text-gray-700 font-medium text-sm md:text-base">
                  {suggestion.name}
                </div>
                <div className="text-xs text-gray-500">
                  {suggestion.fullName ||
                    `${suggestion.name}, ${suggestion.country}`}
                </div>
              </div>
            ))}
            {suggestions.length === 0 && city.length >= 2 && (
              <div className="px-3 md:px-4 py-2 md:py-3 text-gray-500 text-sm">
                No cities found. Try a different search.
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
