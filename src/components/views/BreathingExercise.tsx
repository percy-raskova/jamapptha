import { useState, useEffect } from 'react';

interface BreathingExerciseProps {
  onStop: () => void;
}

// 4-7-8 breathing pattern constants
const INHALE_DURATION = 4;
const HOLD_DURATION = 7;
const EXHALE_DURATION = 8;

export const BreathingExercise = ({ onStop }: BreathingExerciseProps) => {
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>(
    'inhale',
  );
  const [breathTimer, setBreathTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathTimer((t) => {
        const newTime = t + 0.1;

        // Determine phase based on time
        if (newTime < INHALE_DURATION) {
          setBreathPhase('inhale');
        } else if (newTime < INHALE_DURATION + HOLD_DURATION) {
          setBreathPhase('hold');
        } else if (
          newTime <
          INHALE_DURATION + HOLD_DURATION + EXHALE_DURATION
        ) {
          setBreathPhase('exhale');
        } else {
          // Reset cycle
          return 0;
        }
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Calculate breathing circle scale based on phase
  const getBreathingScale = () => {
    if (breathPhase === 'inhale') {
      return 1 + (breathTimer / INHALE_DURATION) * 0.5;
    }
    if (breathPhase === 'hold') {
      return 1.5;
    }
    const exhaleProgress =
      (breathTimer - INHALE_DURATION - HOLD_DURATION) / EXHALE_DURATION;
    return 1.5 - exhaleProgress * 0.5;
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        data-testid="breathing-circle"
        className="w-32 h-32 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 transition-transform duration-100 ease-linear"
        style={{ transform: `scale(${getBreathingScale()})` }}
      />
      <p className="mt-8 text-2xl font-bold text-indigo-200 capitalize">
        {breathPhase === 'inhale' && 'Inhale...'}
        {breathPhase === 'hold' && 'Hold...'}
        {breathPhase === 'exhale' && 'Exhale...'}
      </p>
      <p className="mt-2 text-[var(--text-muted)] text-sm">4-7-8 Breathing</p>
      <button
        onClick={onStop}
        className="mt-8 px-6 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[rgba(255,255,255,0.1)] text-[var(--text-secondary)] font-semibold"
      >
        Stop Breathing
      </button>
    </div>
  );
};
