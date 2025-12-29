import {
  Moon,
  Mic,
  ShieldAlert,
  Battery,
  Wind,
  Smile,
  Gauge,
  Heart,
} from 'lucide-react';
import type { HomeViewProps } from '../../types';
import { Button } from '../ui';

export const HomeView = ({
  onNavigate,
  badDayMode,
  onToggleBadDayMode,
}: HomeViewProps) => (
  <div className="page-transition flex-1 flex flex-col">
    {/* Header section */}
    <div className="mb-8 pt-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Recovery Mode
          </h1>
          <p className="text-[var(--text-muted)] text-sm mt-2 tracking-wide">
            Brain fog protocol active.
          </p>
          <p className="text-[var(--text-muted)] text-xs mt-1 opacity-60">
            100% private. All data stays on your device.
          </p>
        </div>
        {/* Bad Day Mode Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            Bad Day
          </span>
          <input
            type="checkbox"
            checked={badDayMode}
            onChange={onToggleBadDayMode}
            aria-label="Bad Day Mode"
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[var(--bg-surface)] rounded-full peer peer-checked:bg-amber-600 transition-colors relative">
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                badDayMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </div>
        </label>
      </div>
    </div>

    {/* Navigation grid */}
    <div className="flex-1 grid grid-cols-1 gap-4 content-start">
      {/* Emergency crash button - most prominent (always shown) */}
      <Button
        onClick={() => onNavigate('crash')}
        variant="crash"
        className="py-7"
      >
        <ShieldAlert size={44} className="text-red-400" strokeWidth={1.5} />
        <span className="text-2xl font-extrabold text-red-200 tracking-tight">
          I am Crashing
        </span>
        <span className="text-xs uppercase tracking-[0.15em] text-red-300/50 font-semibold">
          Blackout Screen
        </span>
      </Button>

      {/* Rest and Fuel row (Rest always shown, Fuel hidden in bad day mode) */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => onNavigate('rest')}
          variant="rest"
          className="h-full py-7"
        >
          <Moon size={36} className="text-indigo-400" strokeWidth={1.5} />
          <span className="text-lg font-bold">Rest</span>
        </Button>
        {!badDayMode && (
          <Button
            onClick={() => onNavigate('fuel')}
            variant="fuel"
            className="h-full py-7"
          >
            <Battery size={36} className="text-emerald-400" strokeWidth={1.5} />
            <span className="text-lg font-bold">Fuel</span>
          </Button>
        )}
      </div>

      {/* Non-essential features - hidden in bad day mode */}
      {!badDayMode && (
        <>
          {/* Energy Budget and How Am I row */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => onNavigate('spoons')}
              variant="spoons"
              className="h-full py-6"
            >
              <Gauge size={36} className="text-violet-400" strokeWidth={1.5} />
              <span className="text-lg font-bold">Energy Budget</span>
            </Button>
            <Button
              onClick={() => onNavigate('symptoms')}
              variant="symptoms"
              className="h-full py-6"
            >
              <Heart size={36} className="text-pink-400" strokeWidth={1.5} />
              <span className="text-lg font-bold">How Am I</span>
            </Button>
          </div>

          {/* Fuzzy Logic */}
          <Button
            onClick={() => onNavigate('animals')}
            variant="animals"
            className="py-6"
          >
            <Smile size={36} className="text-orange-400" strokeWidth={1.5} />
            <span className="text-lg font-bold">Fuzzy Logic</span>
            <span className="text-xs uppercase tracking-[0.15em] text-orange-300/50 font-semibold">
              Ken Allen & Friends
            </span>
          </Button>

          {/* Pacing */}
          <Button
            onClick={() => onNavigate('pacing')}
            variant="pacing"
            className="py-6"
          >
            <Wind size={36} className="text-amber-400" strokeWidth={1.5} />
            <span className="text-lg font-bold">Pacing Check</span>
          </Button>

          {/* Notes */}
          <Button
            onClick={() => onNavigate('notes')}
            variant="notes"
            className="py-6"
          >
            <Mic
              size={36}
              className="text-[var(--text-muted)]"
              strokeWidth={1.5}
            />
            <span className="text-lg font-bold text-[var(--text-secondary)]">
              Unload Brain
            </span>
          </Button>
        </>
      )}
    </div>
  </div>
);
