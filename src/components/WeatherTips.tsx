import React from "react";

interface WeatherTipsProps {
  temperature: number;
}

const WeatherTips: React.FC<WeatherTipsProps> = ({ temperature }) => {
  return (
    <div className="mt-6 border-t border-blue-100 pt-4">
      <h3 className="text-xs md:text-sm text-gray-500 mb-3">Weather Tips</h3>
      <div className="bg-blue-50 rounded-xl p-3 md:p-4 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.5)]">
        {temperature > 25 ? (
          <p className="text-sm">
            It's hot outside! Remember to stay hydrated and use sunscreen.
          </p>
        ) : temperature < 10 ? (
          <p className="text-sm">
            It's cold today. Don't forget to bundle up before heading out!
          </p>
        ) : (
          <p className="text-sm">Pleasant weather today. Enjoy your day!</p>
        )}
      </div>
    </div>
  );
};

export default WeatherTips;
