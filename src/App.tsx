import { useState, useEffect, FormEvent, useRef } from "react";

// Define TypeScript interfaces
interface ForecastDay {
  day: string;
  temp: number;
  icon: string;
}

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: ForecastDay[];
  loading: boolean;
  error: string | null;
}

interface WeatherListItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
  }>;
  wind: {
    speed: number;
  };
}

interface SuggestionCity {
  name: string;
  country: string;
  fullName?: string; // Added for display
  lat?: number; // Added for precise location
  lon?: number; // Added for precise location
}

function App() {
  const [city, setCity] = useState<string>("New York");
  const [suggestions, setSuggestions] = useState<SuggestionCity[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    city: "",
    temperature: 0,
    condition: "",
    humidity: 0,
    windSpeed: 0,
    forecast: [],
    loading: true,
    error: null,
  });

  // Fix the environment variable access
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";

  // Fetch weather data
  const fetchWeather = async (cityName: string): Promise<void> => {
    setWeatherData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Example using OpenWeatherMap
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch weather data");
      }

      const data = await response.json();

      // Extract current weather and forecast
      const currentWeather = data.list[0];

      // Create 5-day forecast (one entry per day)
      const uniqueDays: string[] = [];
      const forecast: ForecastDay[] = data.list
        .filter((item: WeatherListItem) => {
          const day: string = new Date(item.dt * 1000).toLocaleDateString(
            "en-US",
            { weekday: "short" }
          );
          if (!uniqueDays.includes(day) && uniqueDays.length < 5) {
            uniqueDays.push(day);
            return true;
          }
          return false;
        })
        .map((item: WeatherListItem) => {
          const day: string = new Date(item.dt * 1000).toLocaleDateString(
            "en-US",
            { weekday: "short" }
          );
          return {
            day: day,
            temp: Math.round(item.main.temp),
            icon: getWeatherIcon(item.weather[0].main),
          };
        });

      setWeatherData({
        city: data.city.name,
        temperature: Math.round(currentWeather.main.temp),
        condition: currentWeather.weather[0].main,
        humidity: currentWeather.main.humidity,
        windSpeed: Math.round(currentWeather.wind.speed),
        forecast: forecast,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load weather data. Please try again.",
      }));
    }
  };

  // Get appropriate weather icon
  const getWeatherIcon = (condition: string): string => {
    switch (condition) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Drizzle":
        return "🌦️";
      case "Thunderstorm":
        return "⛈️";
      case "Snow":
        return "❄️";
      case "Mist":
      case "Fog":
        return "🌫️";
      default:
        return "🌤️";
    }
  };

  // New function to fetch city suggestions with improved handling
  const fetchCitySuggestions = async (query: string) => {
    if (query.length < 2) {
      // Reduced minimum characters to 2 for better UX
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();

      // Better formatting with additional context
      const formattedSuggestions = data.map((item: any) => {
        // Add state/province when available for better disambiguation
        const stateInfo = item.state ? `, ${item.state}` : "";
        return {
          name: item.name,
          country: item.country,
          fullName: `${item.name}${stateInfo}, ${item.country}`,
          lat: item.lat,
          lon: item.lon,
        };
      });

      // Filter out duplicates (some APIs return the same city multiple times)
      const uniqueSuggestions = formattedSuggestions.filter(
        (suggestion, index, self) =>
          index === self.findIndex((s) => s.fullName === suggestion.fullName)
      );

      setSuggestions(uniqueSuggestions);
      setShowSuggestions(uniqueSuggestions.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Add debounce to prevent too many API calls
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(city);
    }, 300); // Wait 300ms after user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchCitySuggestions(debouncedQuery);
    }
  }, [debouncedQuery]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    // No direct API call here, it's handled by the debounce effect
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: SuggestionCity) => {
    setCity(suggestion.name);
    setShowSuggestions(false);
    // If lat/lon are available, use them for more accurate results
    if (suggestion.lat && suggestion.lon) {
      fetchWeatherByCoords(suggestion.lat, suggestion.lon);
    } else {
      fetchWeather(suggestion.name);
    }
  };

  // Handle search submit
  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

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
  }, []);

  // Load default weather on component mount
  useEffect(() => {
    fetchWeather(city);
  }, []);

  // Add a new function to fetch weather by coordinates for more precision
  const fetchWeatherByCoords = async (
    lat: number,
    lon: number
  ): Promise<void> => {
    setWeatherData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch weather data");
      }

      // Rest of the function is the same as fetchWeather...
      const data = await response.json();
      // Process data as in your existing fetchWeather function

      // Update UI
      const currentWeather = data.list[0];
      // Rest of the weather data processing...

      // ...existing code to update weatherData
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load weather data. Please try again.",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex justify-center items-center">
      <div className="w-full max-w-md">
        {/* Search Bar with Suggestions */}
        <form
          onSubmit={handleSearch}
          className="mb-8 rounded-xl bg-blue-50 p-2 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search city..."
              className="w-full bg-transparent px-4 py-2 outline-none text-gray-700"
              value={city}
              onChange={handleInputChange}
              onFocus={() => city.length >= 3 && setShowSuggestions(true)}
            />
            <button
              type="submit"
              className="p-2 ml-2 rounded-lg bg-blue-50 shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.8)] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
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
                    className="px-4 py-3 cursor-pointer hover:bg-blue-100 first:rounded-t-xl last:rounded-b-xl transition-colors border-b border-blue-100 last:border-0"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <div className="text-gray-700 font-medium">
                      {suggestion.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {suggestion.fullName ||
                        `${suggestion.name}, ${suggestion.country}`}
                    </div>
                  </div>
                ))}
                {suggestions.length === 0 && city.length >= 2 && (
                  <div className="px-4 py-3 text-gray-500">
                    No cities found. Try a different search.
                  </div>
                )}
              </div>
            )}
          </div>
        </form>

        {/* Weather Display */}
        {weatherData.loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : weatherData.error ? (
          <div className="text-red-500 p-4">{weatherData.error}</div>
        ) : (
          <div className="rounded-2xl bg-blue-50 p-6 shadow-[10px_10px_20px_rgba(0,0,0,0.1),-10px_-10px_20px_rgba(255,255,255,0.8)]">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">
              {weatherData.city}
            </h2>
            <div className="text-6xl font-light text-gray-700 mb-2">
              {weatherData.temperature}°C
            </div>
            <div className="text-gray-500 mb-6">{weatherData.condition}</div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.5)]">
                <div className="text-sm text-gray-500">Humidity</div>
                <div className="text-lg">{weatherData.humidity}%</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.5)]">
                <div className="text-sm text-gray-500">Wind</div>
                <div className="text-lg">{weatherData.windSpeed} km/h</div>
              </div>
            </div>

            <div className="border-t border-blue-100 pt-4">
              <h3 className="text-sm text-gray-500 mb-4">Forecast</h3>
              <div className="flex justify-between">
                {weatherData.forecast.map((day, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-sm text-gray-500">{day.day}</div>
                    <div className="text-2xl my-1">{day.icon}</div>
                    <div className="text-sm font-medium">{day.temp}°</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
