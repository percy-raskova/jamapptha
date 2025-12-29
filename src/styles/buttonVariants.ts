import type { ButtonVariant } from '../types';

export const BUTTON_BASE_STYLE =
  'w-full p-6 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-500 ease-out card-glow relative overflow-hidden';

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[rgba(255,255,255,0.05)]',
  crash:
    'bg-gradient-to-b from-[rgba(127,29,29,0.25)] to-[rgba(127,29,29,0.1)] text-red-200 border-2 border-[rgba(220,38,38,0.3)] crash-button-glow',
  rest: 'bg-gradient-to-b from-[rgba(67,56,202,0.2)] to-[rgba(49,46,129,0.1)] text-indigo-200 border border-[rgba(99,102,241,0.25)]',
  fuel: 'bg-gradient-to-b from-[rgba(5,150,105,0.2)] to-[rgba(6,78,59,0.1)] text-emerald-200 border border-[rgba(52,211,153,0.2)]',
  pacing:
    'bg-gradient-to-b from-[rgba(180,83,9,0.2)] to-[rgba(120,53,15,0.1)] text-amber-200 border border-[rgba(245,158,11,0.2)]',
  animals:
    'bg-gradient-to-b from-[rgba(194,65,12,0.2)] to-[rgba(124,45,18,0.1)] text-orange-200 border border-[rgba(249,115,22,0.2)]',
  notes:
    'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[rgba(255,255,255,0.05)]',
  spoons:
    'bg-gradient-to-b from-[rgba(124,58,237,0.2)] to-[rgba(91,33,182,0.1)] text-violet-200 border border-[rgba(139,92,246,0.25)]',
  symptoms:
    'bg-gradient-to-b from-[rgba(236,72,153,0.2)] to-[rgba(190,24,93,0.1)] text-pink-200 border border-[rgba(244,114,182,0.25)]',
};
