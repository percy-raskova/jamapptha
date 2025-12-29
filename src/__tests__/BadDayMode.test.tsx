import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('BadDayMode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('shows bad day mode toggle on home screen', () => {
    render(<App />);
    expect(screen.getByLabelText(/bad day mode/i)).toBeInTheDocument();
  });

  it('hides non-essential features when bad day mode is on', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByLabelText(/bad day mode/i));

    // Should still show essential features
    expect(screen.getByText('I am Crashing')).toBeInTheDocument();
    expect(screen.getByText('Rest')).toBeInTheDocument();

    // Should hide non-essential features
    expect(screen.queryByText('Fuzzy Logic')).not.toBeInTheDocument();
    expect(screen.queryByText('Unload Brain')).not.toBeInTheDocument();
  });

  it('persists bad day mode preference', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByLabelText(/bad day mode/i));

    expect(localStorage.setItem).toHaveBeenCalledWith('bad_day_mode', 'true');
  });

  it('restores bad day mode on reload', () => {
    vi.mocked(localStorage.getItem).mockImplementation((key) => {
      if (key === 'bad_day_mode') return 'true';
      return null;
    });

    render(<App />);

    // Should be in simplified mode
    expect(screen.queryByText('Fuzzy Logic')).not.toBeInTheDocument();
  });

  it('can toggle bad day mode off', async () => {
    vi.mocked(localStorage.getItem).mockImplementation((key) => {
      if (key === 'bad_day_mode') return 'true';
      return null;
    });

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByLabelText(/bad day mode/i));

    expect(screen.getByText('Fuzzy Logic')).toBeInTheDocument();
  });
});
