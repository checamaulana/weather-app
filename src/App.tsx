import { useEffect, FormEvent } from "react";
import { SuggestionCity } from "./types/weather";

// Custom hooks
import { useWeather } from "./hooks/useWeather";
import { useCitySearch } from "./hooks/useCitySearch";

// Components
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import Footer from "./components/Footer";
import BackgroundDecoration from "./components/BackgroundDecoration";

function App() {
  const defaultCity = "New York";

  // Use custom hooks for state management
  const { weatherData, fetchWeather, fetchWeatherByCoordinates } =
    useWeather(defaultCity);
  const {
    city,
    setCity,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    resetSuggestions,
  } = useCitySearch(defaultCity);

  // Handle search submission
  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      resetSuggestions();
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: SuggestionCity) => {
    setCity(suggestion.name);
    resetSuggestions();

    // If lat/lon are available, use them for more accurate results
    if (suggestion.lat && suggestion.lon) {
      fetchWeatherByCoordinates(suggestion.lat, suggestion.lon);
    } else {
      fetchWeather(suggestion.name);
    }
  };

  // Handle selection of a city from the popular cities section
  const handleCitySelect = (cityName: string) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  // Load default weather on component mount
  useEffect(() => {
    fetchWeather(defaultCity);
  }, [fetchWeather]);

  return (
    <div className="min-h-screen min-w-full bg-blue-50 flex justify-center items-center relative overflow-hidden">
      <BackgroundDecoration />

      <div className="w-full max-w-4xl p-4 md:p-8 z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-4 md:mb-6">
          Weather Forecast
        </h1>

        <SearchBar
          city={city}
          onInputChange={handleInputChange}
          onSearch={handleSearch}
          onSelectSuggestion={handleSelectSuggestion}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />

        <WeatherDisplay
          weatherData={weatherData}
          onCitySelect={handleCitySelect}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
