import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { ViewProps } from '../../types';
import { Header } from '../ui';
import { ANIMAL_FACTS } from '../../constants/animalFacts';

export const AnimalCheerView = ({ onBack }: ViewProps) => {
  const [currentFact, setCurrentFact] = useState(ANIMAL_FACTS[0]);
  const nextFact = () =>
    setCurrentFact(
      ANIMAL_FACTS[Math.floor(Math.random() * ANIMAL_FACTS.length)],
    );

  return (
    <div className="space-y-8 page-transition">
      <Header title="Fuzzy Logic" onBack={onBack} />
      <div className="flex flex-col items-center justify-center min-h-[320px]">
        {/* Fact card with floating effect */}
        <div className="relative w-full fact-float">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-b from-[rgba(194,65,12,0.15)] to-[rgba(124,45,18,0.05)] border border-[rgba(249,115,22,0.2)] p-7 rounded-3xl w-full text-center">
            {/* Type badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="inline-block bg-gradient-to-r from-orange-800 to-orange-900 text-orange-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {currentFact.type}
              </span>
            </div>
            <p className="text-orange-100/90 text-lg leading-relaxed mt-4">
              {currentFact.text}
            </p>
          </div>
        </div>

        {/* Next fact button */}
        <button
          onClick={nextFact}
          className="mt-10 flex items-center gap-3 bg-gradient-to-b from-orange-700 to-orange-800 hover:from-orange-600 hover:to-orange-700 text-orange-100 px-7 py-3.5 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-orange-900/20"
        >
          <RefreshCw size={20} strokeWidth={2} />
          <span>Tell me another</span>
        </button>
      </div>
    </div>
  );
};
