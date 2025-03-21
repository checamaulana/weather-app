import React from "react";
import { ForecastDay } from "../types/weather";

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  return (
    <div className="border-t border-blue-100 pt-4">
      <h3 className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-5 gap-1 md:flex md:justify-between">
        {forecast.map((day, idx) => (
          <div
            key={idx}
            className="text-center p-2 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="text-xs md:text-sm text-gray-500">{day.day}</div>
            <div className="text-xl md:text-2xl my-1">{day.icon}</div>
            <div className="text-xs md:text-sm font-medium">{day.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
