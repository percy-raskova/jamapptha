import { ChevronLeft } from 'lucide-react';
import type { HeaderProps } from '../../types';

export const Header = ({ title, onBack }: HeaderProps) => (
  <div className="flex items-center mb-8 relative z-10">
    {onBack && (
      <button
        onClick={onBack}
        className="absolute left-0 p-2 -ml-2 rounded-full transition-colors duration-300 text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.03)]"
      >
        <ChevronLeft size={28} strokeWidth={1.5} />
      </button>
    )}
    <h1 className="text-xl font-bold w-full text-center text-[var(--text-primary)] tracking-wide">
      {title}
    </h1>
  </div>
);
