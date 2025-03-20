import { useState } from "react";

function App() {
  const [city, setCity] = useState("");

  // Mock weather data (replace with actual API data later)
  const weatherData = {
    city: "New York",
    temperature: 23,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Tue", temp: 24, icon: "🌤️" },
      { day: "Wed", temp: 22, icon: "☁️" },
      { day: "Thu", temp: 21, icon: "🌧️" },
      { day: "Fri", temp: 25, icon: "☀️" },
      { day: "Sat", temp: 26, icon: "☀️" },
    ],
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex justify-center items-center">
      <div className="w-full max-w-md">
        {/* Search Bar - Neumorphic Style */}
        <div className="mb-8 rounded-xl bg-blue-50 p-2 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)]">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search city..."
              className="w-full bg-transparent px-4 py-2 outline-none text-gray-700"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className="p-2 ml-2 rounded-lg bg-blue-50 shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.8)] transition-all duration-300">
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
        </div>

        {/* Main Weather Card */}
        <div className="rounded-2xl bg-blue-50 p-6 shadow-[10px_10px_20px_rgba(0,0,0,0.1),-10px_-10px_20px_rgba(255,255,255,0.8)]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium text-gray-700">
              {weatherData.city}
            </h2>
            <span className="text-sm text-gray-500">
              Today,{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Current Weather */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="text-6xl font-light text-gray-700">
                {weatherData.temperature}°
              </div>
              <div className="ml-4">
                <div className="text-gray-500">{weatherData.condition}</div>
                <div className="text-sm text-gray-400">
                  Feels like {weatherData.temperature - 2}°
                </div>
              </div>
            </div>
            <div className="text-6xl">
              {weatherData.condition === "Partly Cloudy" ? "⛅" : "☀️"}
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-blue-50 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.5)]">
              <div className="text-sm text-gray-500 mb-1">Humidity</div>
              <div className="flex items-center">
                <span className="mr-2">💧</span>
                <span className="text-xl text-gray-700">
                  {weatherData.humidity}%
                </span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.5)]">
              <div className="text-sm text-gray-500 mb-1">Wind Speed</div>
              <div className="flex items-center">
                <span className="mr-2">💨</span>
                <span className="text-xl text-gray-700">
                  {weatherData.windSpeed} km/h
                </span>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="pt-4 border-t border-blue-100">
            <h3 className="text-sm text-gray-500 mb-4">5-Day Forecast</h3>
            <div className="flex justify-between">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-sm text-gray-500">{day.day}</span>
                  <span className="text-xl my-1">{day.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {day.temp}°
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-3 rounded-xl bg-blue-500 text-white font-medium shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.5)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1)] transition-all duration-300">
            View Detailed Forecast
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
