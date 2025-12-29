// --- View Types ---
export type ViewType =
  | 'home'
  | 'crash'
  | 'rest'
  | 'fuel'
  | 'animals'
  | 'pacing'
  | 'notes'
  | 'spoons'
  | 'symptoms';

// --- Data Types ---
export interface SpoonBudget {
  remaining: number;
  total: number;
  date: string;
}

export interface Activity {
  activity: string;
  spoons: number;
  timestamp: string;
}

export interface SymptomEntry {
  date: string;
  fog: number;
  fatigue: number;
}

export interface Note {
  id: number;
  text: string;
}

// --- Component Props ---
export type ButtonVariant =
  | 'primary'
  | 'crash'
  | 'rest'
  | 'fuel'
  | 'pacing'
  | 'animals'
  | 'notes'
  | 'spoons'
  | 'symptoms';

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

export interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export interface ViewProps {
  onBack: () => void;
}

export interface RatingScaleProps {
  label: string;
  value: number | null;
  onChange: (v: number) => void;
  yesterdayValue?: number;
}

export interface HomeViewProps {
  onNavigate: (view: ViewType) => void;
  badDayMode: boolean;
  onToggleBadDayMode: () => void;
  pwaInstall: {
    canInstall: boolean;
    isInstalled: boolean;
    isIOS: boolean;
    install: () => Promise<void>;
  };
}
