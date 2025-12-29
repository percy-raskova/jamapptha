import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { ViewProps, SymptomEntry } from '../../types';
import { Header, RatingScale } from '../ui';

export const SymptomCheckView = ({ onBack }: ViewProps) => {
  const [fog, setFog] = useState<number | null>(null);
  const [fatigue, setFatigue] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const [history, setHistory] = useState<SymptomEntry[]>(() => {
    const stored = localStorage.getItem('symptom_log');
    return stored ? JSON.parse(stored) : [];
  });

  // Find yesterday's entry
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  const yesterdayEntry = history.find(
    (e) => new Date(e.date).toDateString() === yesterdayStr,
  );

  const handleSave = () => {
    if (fog === null || fatigue === null) return;

    const entry: SymptomEntry = {
      date: new Date().toISOString(),
      fog,
      fatigue,
    };

    const newHistory = [entry, ...history];
    setHistory(newHistory);
    localStorage.setItem('symptom_log', JSON.stringify(newHistory));
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="space-y-6 page-transition">
        <Header title="Check In" onBack={onBack} />
        <div className="flex flex-col items-center justify-center py-12">
          <Heart size={64} className="text-pink-400 mb-6" />
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Logged
          </h2>
          <p className="text-[var(--text-muted)]">
            Take care of yourself today
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 page-transition">
      <Header title="Check In" onBack={onBack} />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent rounded-3xl blur-xl" />
        <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[rgba(236,72,153,0.15)] to-[rgba(190,24,93,0.05)] border border-[rgba(244,114,182,0.2)]">
          <p className="text-pink-200/90 text-center mb-6">
            How are you feeling right now?
          </p>

          <RatingScale
            label="Brain Fog"
            value={fog}
            onChange={setFog}
            yesterdayValue={yesterdayEntry?.fog}
          />

          <RatingScale
            label="Fatigue"
            value={fatigue}
            onChange={setFatigue}
            yesterdayValue={yesterdayEntry?.fatigue}
          />

          <button
            onClick={handleSave}
            disabled={fog === null || fatigue === null}
            className="w-full py-4 rounded-2xl bg-gradient-to-b from-pink-500 to-pink-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Save Check-In
          </button>
        </div>
      </div>
    </div>
  );
};
