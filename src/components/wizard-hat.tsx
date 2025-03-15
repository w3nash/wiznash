"use client";

import { useState, useEffect } from "react";
import { SparklesIcon } from "lucide-react";

export default function WizardHat() {
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add a new sparkle at a random position
      setSparkles((prev) => {
        const newSparkle = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
        };

        return [...prev, newSparkle].slice(-5); // Keep only the last 5 sparkles
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-24 h-24 mx-auto -mb-4 float`}>
      {/* Wizard Hat */}
      <div className='absolute inset-0'>
        <svg viewBox='0 0 100 100' className='w-full h-full'>
          {/* Hat brim */}
          <ellipse cx='50' cy='75' rx='35' ry='10' className='fill-blue-700' />

          {/* Hat cone */}
          <path
            d='M30,75 Q50,20 70,75'
            className='fill-blue-600 stroke-blue-700'
            strokeWidth='2'
          />

          {/* Hat band */}
          <path
            d='M28,70 Q50,65 72,70'
            className='stroke-yellow-500'
            strokeWidth='3'
            fill='none'
          />

          {/* Stars on hat */}
          <circle cx='40' cy='50' r='2' className='fill-amber-200' />
          <circle cx='60' cy='55' r='2' className='fill-amber-200' />
          <circle cx='50' cy='40' r='2' className='fill-amber-200' />
        </svg>
      </div>

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <SparklesIcon
          key={sparkle.id}
          className='absolute w-5 h-5 text-amber-300 sparkle'
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}
