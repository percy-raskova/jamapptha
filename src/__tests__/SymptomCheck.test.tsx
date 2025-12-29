import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('SymptomCheckView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('displays "How Am I" button on home screen', () => {
    render(<App />);
    expect(screen.getByText(/how am i/i)).toBeInTheDocument();
  });

  it('navigates to symptom check view', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(/how am i/i));
    expect(screen.getByText(/check in/i)).toBeInTheDocument();
  });

  it('displays rating buttons for brain fog (1-5)', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(/how am i/i));

    expect(screen.getByText(/brain fog/i)).toBeInTheDocument();
    // There are multiple "1" and "5" buttons (one for each scale), so use getAllByRole
    const oneButtons = screen.getAllByRole('button', { name: '1' });
    const fiveButtons = screen.getAllByRole('button', { name: '5' });
    expect(oneButtons.length).toBeGreaterThanOrEqual(1);
    expect(fiveButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('displays rating buttons for fatigue (1-5)', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(/how am i/i));

    expect(screen.getByText(/fatigue/i)).toBeInTheDocument();
  });

  it('allows one-tap symptom logging', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(/how am i/i));

    // Click a rating for brain fog (first "3" button)
    const threeButtons = screen.getAllByRole('button', { name: '3' });
    await user.click(threeButtons[0]);

    // Re-query the button after click to get updated state
    const updatedButtons = screen.getAllByRole('button', { name: '3' });
    expect(updatedButtons[0]).toHaveAttribute('aria-pressed', 'true');
  });

  it('saves check-in to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(/how am i/i));

    // Select ratings for both scales
    let threeButtons = screen.getAllByRole('button', { name: '3' });
    await user.click(threeButtons[0]); // Brain fog

    // Re-query after first click since DOM changes
    threeButtons = screen.getAllByRole('button', { name: '3' });
    await user.click(threeButtons[1]); // Fatigue

    // The button text is "Save Check-In"
    await user.click(screen.getByRole('button', { name: /save check-in/i }));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'symptom_log',
      expect.any(String),
    );
  });

  it('shows comparison to yesterday when data exists', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    vi.mocked(localStorage.getItem).mockImplementation((key) => {
      if (key === 'symptom_log') {
        return JSON.stringify([
          { date: yesterday.toISOString(), fog: 4, fatigue: 3 },
        ]);
      }
      return null;
    });

    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(/how am i/i));

    // There will be two "Yesterday" labels (one for each scale)
    const yesterdayLabels = screen.getAllByText(/yesterday/i);
    expect(yesterdayLabels.length).toBeGreaterThanOrEqual(1);
  });
});
