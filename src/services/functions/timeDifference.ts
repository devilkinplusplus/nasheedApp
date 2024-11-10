export function timeDifference(startTime: string, currentTime: string): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const start = new Date(now);
  const current = new Date(now);

  // Set the start time
  const [startHours, startMinutes, startSeconds = 0] = startTime.split(":").map(Number);
  start.setHours(startHours, startMinutes, startSeconds, 0);

  // Set the current time
  const [currentHours, currentMinutes, currentSeconds = 0] = currentTime.split(":").map(Number);
  current.setHours(currentHours, currentMinutes, currentSeconds, 0);

  let diffMs = current.getTime() - start.getTime();

  // If the start time is after the current time, adjust for the next day
  if (diffMs < 0) {
    diffMs += 24 * 60 * 60 * 1000;
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs %= 1000 * 60 * 60;
  const minutes = Math.floor(diffMs / (1000 * 60));
  diffMs %= 1000 * 60;
  const seconds = Math.floor(diffMs / 1000);

  return { hours, minutes, seconds };
}
