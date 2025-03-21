import { useState, useCallback } from "react";
import { WeatherData } from "../types/weather";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from "../services/weatherService";

const initialWeatherState: WeatherData = {
  city: "",
  temperature: 0,
  condition: "",
  humidity: 0,
  windSpeed: 0,
  forecast: [],
  loading: true,
  error: null,
};

export const useWeather = (defaultCity: string = "New York") => {
  const [weatherData, setWeatherData] =
    useState<WeatherData>(initialWeatherState);

  // Fetch weather by city name
  const fetchWeather = useCallback(async (cityName: string) => {
    setWeatherData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetchWeatherByCity(cityName);
      setWeatherData(data);
    } catch (error) {
      setWeatherData((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load weather data. Please try again.",
      }));
    }
  }, []);

  // Fetch weather by coordinates
  const fetchWeatherByCoordinates = useCallback(
    async (lat: number, lon: number) => {
      setWeatherData((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await fetchWeatherByCoords(lat, lon);
        setWeatherData(data);
      } catch (error) {
        setWeatherData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load weather data. Please try again.",
        }));
      }
    },
    []
  );

  return {
    weatherData,
    fetchWeather,
    fetchWeatherByCoordinates,
  };
};
