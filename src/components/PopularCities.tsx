import React from "react";

interface PopularCitiesProps {
  onCitySelect: (city: string) => void;
}

const PopularCities: React.FC<PopularCitiesProps> = ({ onCitySelect }) => {
  const popularCities = ["London", "Tokyo", "Paris", "Sydney", "Dubai"];

  return (
    <div className="mt-6 border-t border-blue-100 pt-4">
      <h3 className="text-xs md:text-sm text-gray-500 mb-2">Popular Cities</h3>
      <div className="flex flex-wrap gap-2">
        {popularCities.map((cityName) => (
          <button
            key={cityName}
            onClick={() => onCitySelect(cityName)}
            className="px-3 py-1 text-xs rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            {cityName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
