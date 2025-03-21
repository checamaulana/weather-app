import { ForecastDay, WeatherData, WeatherListItem } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";

// Helper function to get appropriate weather icon
export const getWeatherIcon = (condition: string): string => {
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

// Fetch weather data by city name
export const fetchWeatherByCity = async (
  cityName: string
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch weather data");
    }

    return processWeatherResponse(await response.json());
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Fetch weather data by coordinates
export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch weather data");
    }

    return processWeatherResponse(await response.json());
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Fetch city suggestions
export const fetchCitySuggestions = async (query: string) => {
  if (query.length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch suggestions");
    }

    const data = await response.json();

    // Format and deduplicate suggestions
    const formattedSuggestions = data.map((item: string) => {
      const stateInfo = item.state ? `, ${item.state}` : "";
      return {
        name: item.name,
        country: item.country,
        fullName: `${item.name}${stateInfo}, ${item.country}`,
        lat: item.lat,
        lon: item.lon,
      };
    });

    // Filter out duplicates
    return formattedSuggestions.filter(
      (suggestion: string, index: number, self: string[]) =>
        index === self.findIndex((s) => s.fullName === suggestion.fullName)
    );
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

// Helper function to process weather API response
const processWeatherResponse = (data: string): WeatherData => {
  const currentWeather = data.list[0];

  // Create 5-day forecast (one entry per day)
  const uniqueDays: string[] = [];
  const forecast: ForecastDay[] = data.list
    .filter((item: WeatherListItem) => {
      const day: string = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!uniqueDays.includes(day) && uniqueDays.length < 5) {
        uniqueDays.push(day);
        return true;
      }
      return false;
    })
    .map((item: WeatherListItem) => {
      const day: string = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      });
      return {
        day,
        temp: Math.round(item.main.temp),
        icon: getWeatherIcon(item.weather[0].main),
      };
    });

  return {
    city: data.city.name,
    temperature: Math.round(currentWeather.main.temp),
    condition: currentWeather.weather[0].main,
    humidity: currentWeather.main.humidity,
    windSpeed: Math.round(currentWeather.wind.speed),
    forecast,
    loading: false,
    error: null,
  };
};
