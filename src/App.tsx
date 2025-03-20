import { useState, useEffect, FormEvent } from "react";

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

function App() {
  const [city, setCity] = useState<string>("New York");
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

  // Handle search submit
  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  // Load default weather on component mount
  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex justify-center items-center">
      <div className="w-full max-w-md">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mb-8 rounded-xl bg-blue-50 p-2 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search city..."
              className="w-full bg-transparent px-4 py-2 outline-none text-gray-700"
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
