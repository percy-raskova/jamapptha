import { useState, useEffect, useRef } from 'react';
import { Wind, Play, Pause, Volume2, VolumeX, EyeOff } from 'lucide-react';
import type { ViewProps } from '../../types';
import { Header } from '../ui';
import { playGentleChime } from '../../utils/audio';
import { formatTimerDisplay } from '../../utils/dateFormatters';
import { BreathingExercise } from './BreathingExercise';

export const RestView = ({ onBack }: ViewProps) => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(900);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const soundEnabledRef = useRef(soundEnabled);
  const [showBreathing, setShowBreathing] = useState(false);

  // Keep ref in sync with state
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Only restart interval when isActive changes, not on every second tick
  useEffect(() => {
    if (!isActive || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setIsActive(false);
          if (soundEnabledRef.current) playGentleChime();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className="space-y-8 page-transition">
      <Header title="Aggressive Rest" onBack={onBack} />

      {/* Breathing Exercise */}
      {showBreathing ? (
        <BreathingExercise onStop={() => setShowBreathing(false)} />
      ) : (
        <>
          {/* Instructions card with depth */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent rounded-3xl blur-xl" />
            <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[rgba(67,56,202,0.15)] to-[rgba(49,46,129,0.05)] border border-[rgba(99,102,241,0.2)] text-indigo-100 space-y-5">
              <h3 className="font-bold text-lg flex items-center gap-3 text-indigo-300">
                <EyeOff size={20} strokeWidth={1.5} />
                <span>Sensory Deprivation</span>
              </h3>
              <ul className="space-y-4 text-lg leading-relaxed">
                <li className="flex gap-4 items-start">
                  <span className="text-indigo-400/80 font-semibold min-w-[24px]">
                    1.
                  </span>
                  <span className="text-indigo-100/90">
                    Lie down flat. Heart level with head.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-indigo-400/80 font-semibold min-w-[24px]">
                    2.
                  </span>
                  <span className="text-indigo-100/90">
                    Eye mask ON. Room DARK.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-indigo-400/80 font-semibold min-w-[24px]">
                    3.
                  </span>
                  <span className="text-indigo-100/90">
                    Silence. No podcasts.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Guided Breathing Button */}
          <button
            onClick={() => setShowBreathing(true)}
            className="w-full p-4 rounded-2xl bg-gradient-to-b from-[rgba(67,56,202,0.2)] to-[rgba(49,46,129,0.1)] border border-[rgba(99,102,241,0.25)] text-indigo-200 font-semibold flex items-center justify-center gap-3 hover:border-indigo-400/40 transition-all"
          >
            <Wind size={20} />
            <span>Guided Breathing</span>
          </button>

          {/* Timer section */}
          <div className="flex flex-col items-center justify-center py-8">
            <div
              className={`text-6xl font-bold mb-10 text-indigo-200 tabular-nums tracking-tight ${isActive ? 'timer-pulse' : ''}`}
            >
              {formatTimerDisplay(seconds)}
            </div>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`h-20 w-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                  isActive
                    ? 'bg-[var(--bg-elevated)] border-2 border-[rgba(255,255,255,0.1)] text-[var(--text-muted)]'
                    : 'bg-gradient-to-b from-indigo-500 to-indigo-600 border-2 border-indigo-400/50 text-white shadow-indigo-500/20'
                }`}
              >
                {isActive ? (
                  <Pause size={28} fill="currentColor" />
                ) : (
                  <Play size={28} fill="currentColor" className="ml-1" />
                )}
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  soundEnabled
                    ? 'bg-indigo-900/40 border-indigo-500/40 text-indigo-300'
                    : 'bg-[var(--bg-surface)] border-[rgba(255,255,255,0.08)] text-[var(--text-muted)]'
                }`}
              >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>
            <p className="mt-8 text-[var(--text-muted)] text-sm uppercase tracking-[0.2em] font-semibold">
              {isActive ? 'Recharging...' : 'Start 15min Reset'}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
