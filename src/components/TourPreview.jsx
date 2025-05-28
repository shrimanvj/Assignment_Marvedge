import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TourStep from './TourStep';

const variants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

const TourPreview = ({ steps, currentStep, onPrev, onNext }) => (
  <div className="w-full max-w-2xl mx-auto mt-8 flex flex-col items-center">
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute w-full"
        >
          <TourStep step={steps[currentStep]} />
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="flex justify-between items-center w-full mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={onPrev}
        disabled={currentStep === 0}
        aria-label="Previous Step"
      >
        Previous
      </button>
      <div className="flex gap-2">
        {steps.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
            aria-label={`Step ${idx + 1}`}
          />
        ))}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={onNext}
        disabled={currentStep === steps.length - 1}
        aria-label="Next Step"
      >
        Next
      </button>
    </div>
  </div>
);

export default TourPreview; 