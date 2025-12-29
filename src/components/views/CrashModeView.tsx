import { Moon } from 'lucide-react';
import type { ViewProps } from '../../types';

export const CrashModeView = ({ onBack }: ViewProps) => (
  <div
    role="button"
    tabIndex={0}
    className="fixed inset-0 bg-black z-50 flex items-center justify-center cursor-pointer"
    onClick={onBack}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        onBack();
      }
    }}
  >
    {/* Subtle ambient glow in crash mode */}
    <div className="absolute inset-0 bg-gradient-radial from-indigo-950/10 via-transparent to-transparent crash-breathing" />
    <div className="text-center crash-breathing">
      <div className="flex justify-center mb-6">
        <Moon size={48} className="text-indigo-900/60" strokeWidth={1} />
      </div>
      <p className="text-indigo-900/50 text-sm font-medium tracking-widest uppercase">
        Tap anywhere to exit
      </p>
    </div>
  </div>
);
