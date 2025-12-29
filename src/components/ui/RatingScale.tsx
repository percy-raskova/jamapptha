import type { RatingScaleProps } from '../../types';

export const RatingScale = ({
  label,
  value,
  onChange,
  yesterdayValue,
}: RatingScaleProps) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-3">
      <span className="text-[var(--text-primary)] font-bold">{label}</span>
      {yesterdayValue !== undefined && (
        <span className="text-sm text-[var(--text-muted)]">
          Yesterday: {yesterdayValue}/5
        </span>
      )}
    </div>
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-pressed={value === n}
          className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 border ${
            value === n
              ? 'bg-pink-600 border-pink-500 text-white'
              : 'bg-[var(--bg-surface)] border-[rgba(255,255,255,0.06)] text-[var(--text-secondary)] hover:border-pink-500/30'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
    <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2 px-1">
      <span>Minimal</span>
      <span>Severe</span>
    </div>
  </div>
);
