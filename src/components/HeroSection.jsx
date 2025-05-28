import React from 'react';

const HeroSection = ({ onStartDemo }) => (
  <section className="flex flex-col items-center justify-center min-h-[40vh] py-12 text-center bg-gradient-to-b from-blue-100/60 via-white/80 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="glass-card p-8 max-w-2xl w-full">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 dark:from-blue-300 dark:via-blue-400 dark:to-blue-600 drop-shadow-lg">
        Interactive Product Tour Builder
      </h1>
      <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
        Build, simulate, and share beautiful product tours with smooth animations and modern UI.
      </p>
      <button
        className="btn-primary text-lg mt-2"
        onClick={onStartDemo}
      >
        Start Demo
      </button>
    </div>
  </section>
);

export default HeroSection; 