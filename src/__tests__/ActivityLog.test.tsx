import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('ActivityLog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('shows activity log section in spoon budget view', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));

    expect(screen.getByText(/today's activities/i)).toBeInTheDocument();
  });

  it('timestamps logged activities', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));
    await user.click(screen.getByRole('button', { name: /shower/i }));

    // Should show time of activity (HH:MM format like "9:30" or "10:45")
    const timePattern = /\d{1,2}:\d{2}/;
    const activityList = screen.getByText(/today's activities/i).parentElement;
    expect(activityList?.textContent).toMatch(timePattern);
  });

  it('shows activity history', async () => {
    const today = new Date().toDateString();
    vi.mocked(localStorage.getItem).mockImplementation((key) => {
      if (key === 'activity_log') {
        return JSON.stringify([
          {
            activity: 'Shower',
            spoons: 2,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
      if (key === 'spoon_budget') {
        return JSON.stringify({
          remaining: 10,
          total: 12,
          date: today,
        });
      }
      return null;
    });

    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));

    // The activity log should show "Shower" in the list
    const activitySection =
      screen.getByText(/today's activities/i).parentElement;
    expect(activitySection?.textContent).toContain('Shower');
  });

  it('allows custom activity with custom spoon cost', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));
    await user.click(screen.getByRole('button', { name: /custom/i }));

    expect(screen.getByPlaceholderText(/activity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/spoons/i)).toBeInTheDocument();
  });
});
