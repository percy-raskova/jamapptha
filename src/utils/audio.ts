/**
 * Play a gentle chime sound using Web Audio API
 * Used for timer completion notifications
 */
export const playGentleChime = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(330, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 4);
  } catch {
    console.log('Audio failed');
  }
};
