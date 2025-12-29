import { Droplets } from 'lucide-react';
import type { ViewProps } from '../../types';
import { Header } from '../ui';

export const FuelView = ({ onBack }: ViewProps) => (
  <div className="space-y-6 page-transition">
    <Header title="System Fuel" onBack={onBack} />

    {/* Hydration card */}
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-3xl blur-xl" />
      <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[rgba(5,150,105,0.15)] to-[rgba(6,78,59,0.05)] border border-[rgba(52,211,153,0.2)]">
        <h3 className="font-bold text-xl mb-3 text-emerald-400 flex items-center gap-3">
          <Droplets size={22} strokeWidth={1.5} />
          <span>Hydraulic Fluid</span>
        </h3>
        <p className="text-emerald-100/90 leading-relaxed text-lg">
          Your brain needs blood volume. Water is not enough.
        </p>
        <div className="mt-5 bg-emerald-900/30 p-5 rounded-2xl border border-emerald-800/30">
          <p className="font-bold text-emerald-200 text-lg">
            Drink Electrolytes.
          </p>
          <p className="text-emerald-300/70 mt-2">
            Salty water, Gatorade, LMNT, or Broth.
          </p>
        </div>
      </div>
    </div>

    {/* Protein card */}
    <div className="p-6 rounded-3xl bg-[var(--bg-elevated)] border border-[rgba(255,255,255,0.05)]">
      <h3 className="font-bold text-lg mb-4 text-[var(--text-primary)]">
        Low Effort Protein
      </h3>
      <ul className="space-y-3 text-[var(--text-secondary)]">
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
          <span>Spoonful of peanut butter</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
          <span>String cheese</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
          <span>Protein shake (pre-made)</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
          <span>Handful of almonds</span>
        </li>
      </ul>
    </div>
  </div>
);
