import { useState, useEffect } from 'react';
import { RotateCcw, Plus, X } from 'lucide-react';
import type { ViewProps, SpoonBudget, Activity } from '../../types';
import { Header } from '../ui';
import { PRESET_ACTIVITIES } from '../../constants/presetActivities';
import { formatActivityTime } from '../../utils/dateFormatters';

export const SpoonBudgetView = ({ onBack }: ViewProps) => {
  const today = new Date().toDateString();

  const [budget, setBudget] = useState<SpoonBudget>(() => {
    const stored = localStorage.getItem('spoon_budget');
    if (stored) {
      const parsed = JSON.parse(stored) as SpoonBudget;
      // Reset if it's a new day
      if (parsed.date !== today) {
        return { remaining: 12, total: 12, date: today };
      }
      return parsed;
    }
    return { remaining: 12, total: 12, date: today };
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const stored = localStorage.getItem('activity_log');
    if (stored) {
      const parsed = JSON.parse(stored) as Activity[];
      // Filter to today's activities only
      return parsed.filter(
        (a) => new Date(a.timestamp).toDateString() === today,
      );
    }
    return [];
  });

  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCost, setCustomCost] = useState(1);

  // Persist budget
  useEffect(() => {
    localStorage.setItem('spoon_budget', JSON.stringify(budget));
  }, [budget]);

  // Persist activities
  useEffect(() => {
    localStorage.setItem('activity_log', JSON.stringify(activities));
  }, [activities]);

  const spendSpoons = (activityName: string, cost: number) => {
    if (budget.remaining < cost) return;

    setBudget((prev) => ({ ...prev, remaining: prev.remaining - cost }));
    setActivities((prev) => [
      {
        activity: activityName,
        spoons: cost,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const resetBudget = () => {
    setBudget({ remaining: 12, total: 12, date: today });
    setActivities([]);
  };

  const handleCustomSubmit = () => {
    if (!customName.trim()) return;
    spendSpoons(customName, customCost);
    setCustomName('');
    setCustomCost(1);
    setShowCustom(false);
  };

  const isLow = budget.remaining <= 3;

  return (
    <div className="space-y-6 page-transition">
      <Header title="Energy Budget" onBack={onBack} />

      {/* Spoon Display */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent rounded-3xl blur-xl" />
        <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[rgba(124,58,237,0.15)] to-[rgba(91,33,182,0.05)] border border-[rgba(139,92,246,0.2)] text-center">
          <p className="text-violet-300/70 text-sm uppercase tracking-wider mb-2">
            Spoons Remaining
          </p>
          <p className="text-5xl font-extrabold text-violet-200">
            <span data-testid="remaining-spoons">{budget.remaining}</span>
            <span className="text-violet-400/50 text-3xl">
              {' '}
              / {budget.total}
            </span>
          </p>
          {isLow && (
            <p className="mt-4 text-amber-400 font-semibold">
              Running low — consider resting
            </p>
          )}
          <button
            onClick={resetBudget}
            className="mt-4 flex items-center gap-2 mx-auto text-violet-300/70 hover:text-violet-200 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Reset Day</span>
          </button>
        </div>
      </div>

      {/* Activity Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {PRESET_ACTIVITIES.map((activity) => (
          <button
            key={activity.name}
            onClick={() => spendSpoons(activity.name, activity.cost)}
            disabled={budget.remaining < activity.cost}
            className={`p-4 rounded-2xl text-center transition-all duration-300 border ${
              budget.remaining >= activity.cost
                ? 'bg-[var(--bg-elevated)] border-[rgba(255,255,255,0.06)] text-[var(--text-primary)] hover:border-violet-500/30'
                : 'bg-[var(--bg-surface)] border-transparent text-[var(--text-muted)] opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="block font-bold">{activity.name}</span>
            <span className="text-xs text-[var(--text-muted)]">
              -{activity.cost} spoon{activity.cost > 1 ? 's' : ''}
            </span>
          </button>
        ))}
      </div>

      {/* Custom Activity Button */}
      <button
        onClick={() => setShowCustom(true)}
        className="w-full p-4 rounded-2xl bg-[var(--bg-surface)] border border-[rgba(255,255,255,0.06)] text-[var(--text-secondary)] flex items-center justify-center gap-2 hover:border-violet-500/30 transition-all"
      >
        <Plus size={20} />
        <span>Custom Activity</span>
      </button>

      {/* Custom Activity Modal */}
      {showCustom && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="bg-[var(--bg-elevated)] rounded-3xl p-6 w-full max-w-sm border border-[rgba(255,255,255,0.1)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Custom Activity
              </h3>
              <button
                onClick={() => setShowCustom(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X size={24} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Activity name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[var(--bg-surface)] border border-[rgba(255,255,255,0.06)] text-[var(--text-primary)] placeholder-[var(--text-muted)] mb-4"
            />
            <div className="mb-6">
              <label
                htmlFor="spoon-cost"
                className="block text-sm text-[var(--text-muted)] mb-2"
              >
                Spoons
              </label>
              <input
                id="spoon-cost"
                type="number"
                min={1}
                max={budget.remaining}
                value={customCost}
                onChange={(e) => setCustomCost(Number(e.target.value))}
                className="w-full p-4 rounded-2xl bg-[var(--bg-surface)] border border-[rgba(255,255,255,0.06)] text-[var(--text-primary)]"
              />
            </div>
            <button
              onClick={handleCustomSubmit}
              disabled={!customName.trim() || customCost > budget.remaining}
              className="w-full py-4 rounded-2xl bg-gradient-to-b from-violet-500 to-violet-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Log Activity
            </button>
          </div>
        </div>
      )}

      {/* Today's Activities */}
      <div>
        <h3 className="text-sm uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Today&apos;s Activities
        </h3>
        {activities.length === 0 ? (
          <p className="text-[var(--text-muted)] text-center py-4">
            No activities logged yet
          </p>
        ) : (
          <div className="space-y-2">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 rounded-2xl bg-[var(--bg-surface)] border border-[rgba(255,255,255,0.04)]"
              >
                <span className="text-[var(--text-primary)]">
                  {activity.activity}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-violet-400">-{activity.spoons}</span>
                  <span className="text-[var(--text-muted)] text-sm">
                    {formatActivityTime(activity.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
