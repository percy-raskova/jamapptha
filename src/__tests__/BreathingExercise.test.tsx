import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('BreathingExercise', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('displays breathing exercise option in RestView', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Rest'));

    expect(screen.getByText(/guided breathing/i)).toBeInTheDocument();
  });

  it('shows breathing animation when activated', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Rest'));
    await user.click(screen.getByText(/guided breathing/i));

    expect(screen.getByTestId('breathing-circle')).toBeInTheDocument();
  });

  it('displays inhale/hold/exhale instructions', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Rest'));
    await user.click(screen.getByText(/guided breathing/i));

    // Should start with inhale
    expect(screen.getByText(/inhale/i)).toBeInTheDocument();
  });

  it('cycles through breathing phases', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Rest'));
    await user.click(screen.getByText(/guided breathing/i));

    // Should start with inhale
    expect(screen.getByText(/inhale/i)).toBeInTheDocument();

    // Wait for hold phase (after 4+ seconds)
    await waitFor(
      () => {
        expect(screen.getByText(/hold/i)).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Wait for exhale phase (after 4+7 = 11+ seconds)
    await waitFor(
      () => {
        expect(screen.getByText(/exhale/i)).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
  }, 15000); // 15 second timeout for this test

  it('can be stopped mid-exercise', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Rest'));
    await user.click(screen.getByText(/guided breathing/i));

    // Verify breathing is active
    expect(screen.getByTestId('breathing-circle')).toBeInTheDocument();

    // Stop it
    await user.click(screen.getByText(/stop breathing/i));

    // Verify it's gone
    expect(screen.queryByTestId('breathing-circle')).not.toBeInTheDocument();
  });
});
