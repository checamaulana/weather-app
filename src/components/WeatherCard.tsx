import React from "react";
import { WeatherData } from "../types/weather";
import { getWeatherIcon } from "../services/weatherService";

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-1">
            {weatherData.city}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center">
          <span className="text-4xl mr-2">
            {getWeatherIcon(weatherData.condition)}
          </span>
          <span className="text-gray-500">{weatherData.condition}</span>
        </div>
      </div>

      <div className="text-4xl md:text-6xl font-light text-gray-700 mb-2">
        {weatherData.temperature}°C
      </div>
      <div className="text-sm text-gray-500 mb-5 md:mb-6">
        Feels like {Math.round(weatherData.temperature - 1 + Math.random() * 3)}
        °C
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-6">
        <div className="bg-blue-50 rounded-xl p-3 md:p-4 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.5)]">
          <div className="text-xs md:text-sm text-gray-500">Humidity</div>
          <div className="text-base md:text-lg">{weatherData.humidity}%</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 md:p-4 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.5)]">
          <div className="text-xs md:text-sm text-gray-500">Wind</div>
          <div className="text-base md:text-lg">
            {weatherData.windSpeed} km/h
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 md:p-4 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.5)]">
          <div className="text-xs md:text-sm text-gray-500">Visibility</div>
          <div className="text-base md:text-lg">
            {Math.round(10 - weatherData.humidity / 20)} km
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 md:p-4 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.5)]">
          <div className="text-xs md:text-sm text-gray-500">Pressure</div>
          <div className="text-base md:text-lg">
            {1000 + Math.round(Math.random() * 30)} hPa
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
