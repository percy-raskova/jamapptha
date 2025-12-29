/**
 * Format seconds into MM:SS display format
 * Used for timer displays
 */
export const formatTimerDisplay = (totalSeconds: number): string => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

/**
 * Format ISO timestamp to localized time string
 * Used for activity log timestamps
 */
export const formatActivityTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};
