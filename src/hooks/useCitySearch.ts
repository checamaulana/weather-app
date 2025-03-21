import { useState, useEffect } from "react";
import { SuggestionCity } from "../types/weather";
import { fetchCitySuggestions } from "../services/weatherService";

export const useCitySearch = (initialCity: string = "") => {
  const [city, setCity] = useState<string>(initialCity);
  const [suggestions, setSuggestions] = useState<SuggestionCity[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  // Set up debounce for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(city);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedQuery) {
        const results = await fetchCitySuggestions(debouncedQuery);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      }
    };

    getSuggestions();
  }, [debouncedQuery]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  // Reset suggestions
  const resetSuggestions = () => {
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return {
    city,
    setCity,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    resetSuggestions,
  };
};
