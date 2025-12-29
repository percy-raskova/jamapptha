import { useState } from 'react';
import './App.css';
import type { ViewType } from './types';
import {
  CrashModeView,
  RestView,
  AnimalCheerView,
  NotesView,
  FuelView,
  PacingView,
  SpoonBudgetView,
  SymptomCheckView,
  HomeView,
} from './components/views';

// View routing helper
const renderView = (
  view: ViewType,
  goHome: () => void,
  badDayMode: boolean,
  toggleBadDayMode: () => void,
  setView: (v: ViewType) => void,
) => {
  const views: Record<ViewType, React.ReactNode> = {
    home: (
      <HomeView
        onNavigate={setView}
        badDayMode={badDayMode}
        onToggleBadDayMode={toggleBadDayMode}
      />
    ),
    crash: <CrashModeView onBack={goHome} />,
    rest: <RestView onBack={goHome} />,
    fuel: <FuelView onBack={goHome} />,
    animals: <AnimalCheerView onBack={goHome} />,
    pacing: <PacingView onBack={goHome} />,
    notes: <NotesView onBack={goHome} />,
    spoons: <SpoonBudgetView onBack={goHome} />,
    symptoms: <SymptomCheckView onBack={goHome} />,
  };
  return views[view];
};

function App() {
  const [view, setView] = useState<ViewType>('home');
  const [badDayMode, setBadDayMode] = useState(() => {
    return localStorage.getItem('bad_day_mode') === 'true';
  });

  const toggleBadDayMode = () => {
    const newValue = !badDayMode;
    setBadDayMode(newValue);
    localStorage.setItem('bad_day_mode', String(newValue));
  };

  const goHome = () => setView('home');

  // Crash mode renders full-screen without container
  if (view === 'crash') {
    return <CrashModeView onBack={goHome} />;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen min-h-[100dvh] p-6 relative flex flex-col">
      {renderView(view, goHome, badDayMode, toggleBadDayMode, setView)}
    </div>
  );
}

export default App;
