import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('SpoonBudgetView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('displays "Energy Budget" button on home screen', () => {
    render(<App />);
    expect(screen.getByText('Energy Budget')).toBeInTheDocument();
  });

  it('navigates to spoon budget view', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));
    expect(screen.getByText(/spoons remaining/i)).toBeInTheDocument();
  });

  it('shows remaining spoons out of daily total', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));
    expect(screen.getByText(/\/\s*12/)).toBeInTheDocument(); // "X / 12" format
  });

  it('allows spending spoons on preset activities', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));

    // Should have activity buttons with spoon costs
    expect(screen.getByText(/shower/i)).toBeInTheDocument();
  });

  it('decreases spoon count when activity is logged', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));

    const initialSpoons = screen.getByTestId('remaining-spoons').textContent;
    await user.click(screen.getByRole('button', { name: /shower/i }));
    const newSpoons = screen.getByTestId('remaining-spoons').textContent;

    expect(Number(newSpoons)).toBeLessThan(Number(initialSpoons));
  });

  it('persists spoon budget to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));
    await user.click(screen.getByRole('button', { name: /shower/i }));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'spoon_budget',
      expect.any(String),
    );
  });

  it('allows manual reset of daily budget', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));

    // Spend some spoons first
    await user.click(screen.getByRole('button', { name: /shower/i }));

    // Reset
    await user.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByTestId('remaining-spoons')).toHaveTextContent('12');
  });

  it('warns when spoons are low (3 or fewer)', async () => {
    const today = new Date().toDateString();
    vi.mocked(localStorage.getItem).mockImplementation((key) => {
      if (key === 'spoon_budget') {
        return JSON.stringify({ remaining: 2, total: 12, date: today });
      }
      return null;
    });

    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Energy Budget'));

    expect(screen.getByText(/running low/i)).toBeInTheDocument();
  });
});
