import { useState } from 'react';
import {
  Moon,
  Mic,
  ShieldAlert,
  Droplets,
  Wind,
  Smile,
  Gauge,
  Heart,
  Download,
  Share,
  X,
} from 'lucide-react';
import type { HomeViewProps } from '../../types';
import { Button } from '../ui';

export const HomeView = ({
  onNavigate,
  badDayMode,
  onToggleBadDayMode,
  pwaInstall,
}: HomeViewProps) => {
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const [showDesktopHelp, setShowDesktopHelp] = useState(false);
  const { canInstall, isInstalled, isIOS, install } = pwaInstall;

  // Always show install option when not installed
  const showInstall = !isInstalled;

  return (
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
              <Droplets
                size={36}
                className="text-emerald-400"
                strokeWidth={1.5}
              />
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
                <Gauge
                  size={36}
                  className="text-violet-400"
                  strokeWidth={1.5}
                />
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

        {/* Install App prompt */}
        {showInstall && (
          <button
            onClick={() => {
              if (isIOS) {
                setShowIOSHelp(true);
              } else if (canInstall) {
                install();
              } else {
                setShowDesktopHelp(true);
              }
            }}
            className="mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <Download size={18} />
            <span className="text-sm font-medium">Install App</span>
          </button>
        )}

        {/* iOS Install Instructions Modal */}
        {showIOSHelp && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--bg-surface)] rounded-2xl p-6 max-w-sm w-full relative">
              <button
                onClick={() => setShowIOSHelp(false)}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Install on iPhone/iPad
              </h3>
              <ol className="space-y-3 text-[var(--text-secondary)] text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    Tap the <Share size={16} className="inline mx-1" /> Share
                    button in Safari
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>
                    Scroll down and tap &ldquo;Add to Home Screen&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Tap &ldquo;Add&rdquo; to install</span>
                </li>
              </ol>
              <button
                onClick={() => setShowIOSHelp(false)}
                className="mt-6 w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        {/* Desktop Install Instructions Modal */}
        {showDesktopHelp && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--bg-surface)] rounded-2xl p-6 max-w-sm w-full relative">
              <button
                onClick={() => setShowDesktopHelp(false)}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Install on Desktop
              </h3>
              <ol className="space-y-3 text-[var(--text-secondary)] text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    Look for the install icon{' '}
                    <Download size={14} className="inline mx-1" /> in your
                    browser&apos;s address bar
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>
                    Or use browser menu → &ldquo;Install Brainfog&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Works best in Chrome, Edge, or Brave</span>
                </li>
              </ol>
              <button
                onClick={() => setShowDesktopHelp(false)}
                className="mt-6 w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
