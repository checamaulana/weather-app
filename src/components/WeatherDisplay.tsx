import React from "react";
import { WeatherData } from "../types/weather";
import { getWeatherIcon } from "../services/weatherService";
import WeatherCard from "./WeatherCard";
import WeatherForecast from "./WeatherForecast";
import WeatherTips from "./WeatherTips";
import PopularCities from "./PopularCities";

interface WeatherDisplayProps {
  weatherData: WeatherData;
  onCitySelect: (city: string) => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  onCitySelect,
}) => {
  if (weatherData.loading) {
    return (
      <div className="text-center p-8 rounded-2xl bg-blue-50 shadow-[10px_10px_20px_rgba(0,0,0,0.1),-10px_-10px_20px_rgba(255,255,255,0.8)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-blue-200 rounded mb-4"></div>
          <div className="h-12 w-24 bg-blue-200 rounded mb-4"></div>
          <div className="h-6 w-32 bg-blue-200 rounded mb-8"></div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="h-20 bg-blue-200 rounded"></div>
            <div className="h-20 bg-blue-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (weatherData.error) {
    return (
      <div className="text-red-500 p-8 text-center rounded-2xl bg-blue-50 shadow-[10px_10px_20px_rgba(0,0,0,0.1),-10px_-10px_20px_rgba(255,255,255,0.8)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-red-500 mb-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <p>{weatherData.error}</p>
        <button
          onClick={() => onCitySelect("New York")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try a default city
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-blue-50 p-4 md:p-6 shadow-[10px_10px_20px_rgba(0,0,0,0.1),-10px_-10px_20px_rgba(255,255,255,0.8)]">
      <WeatherCard weatherData={weatherData} />
      <WeatherForecast forecast={weatherData.forecast} />
      <WeatherTips temperature={weatherData.temperature} />
      <PopularCities onCitySelect={onCitySelect} />
    </div>
  );
};

export default WeatherDisplay;
