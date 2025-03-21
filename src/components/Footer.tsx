import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="mt-6 text-center text-xs text-gray-400">
      <p>Weather data provided by OpenWeatherMap</p>
      <p className="mt-1">
        © {new Date().getFullYear()} Weather App - Created with React and
        Tailwind
      </p>
    </div>
  );
};

export default Footer;
