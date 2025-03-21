import React from "react";

const BackgroundDecoration: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-300"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-blue-400"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-yellow-200"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full bg-yellow-300"></div>
    </div>
  );
};

export default BackgroundDecoration;
