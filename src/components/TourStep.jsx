import React from 'react';

const TourStep = ({ step }) => (
  <div className="flex flex-col items-center p-4 md:p-6 glass-card soft-shadow">
    <img
      src={step.imageUrl}
      alt={step.title}
      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl mb-4 border-4 border-blue-200 dark:border-blue-400 shadow-md"
    />
    <h3 className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-300 mb-2 text-center">
      {step.title}
    </h3>
    <p className="text-gray-700 dark:text-gray-200 text-center text-base md:text-lg">
      {step.description}
    </p>
  </div>
);

export default TourStep; 