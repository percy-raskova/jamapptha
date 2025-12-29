import type { ViewProps } from '../../types';
import { Header } from '../ui';

export const PacingView = ({ onBack }: ViewProps) => (
  <div className="space-y-6 page-transition">
    <Header title="The 50% Rule" onBack={onBack} />

    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent rounded-3xl blur-xl" />
      <div className="relative p-7 rounded-3xl bg-gradient-to-b from-[rgba(180,83,9,0.15)] to-[rgba(120,53,15,0.05)] border border-[rgba(245,158,11,0.2)] text-amber-100">
        <h3 className="text-3xl font-extrabold mb-5 text-amber-400 text-center tracking-tight">
          STOP.
        </h3>
        <p className="text-xl leading-relaxed mb-8 text-center text-amber-100/90">
          Whatever you think you can do right now...
          <br />
          <span className="font-bold text-amber-200">Do half.</span>
        </p>

        <div className="space-y-4">
          <div className="bg-amber-900/20 p-5 rounded-2xl border border-amber-800/30">
            <p className="font-bold text-amber-300 text-lg">Washing dishes?</p>
            <p className="text-amber-100/70 mt-1">Wash 2. Leave the rest.</p>
          </div>
          <div className="bg-amber-900/20 p-5 rounded-2xl border border-amber-800/30">
            <p className="font-bold text-amber-300 text-lg">Shower?</p>
            <p className="text-amber-100/70 mt-1">Sit down. Use cool water.</p>
          </div>
          <div className="bg-amber-900/20 p-5 rounded-2xl border border-amber-800/30">
            <p className="font-bold text-amber-300 text-lg">Brain Fog?</p>
            <p className="text-amber-100/70 mt-1">Lie down. No phone.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
