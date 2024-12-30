export function currentTimestamp() {
  const date = new Date(); // Current date and time

  // Extract year, day, and hour
  const year = date.getFullYear(); // Year (e.g., 2024)
  const day = String(date.getDate()).padStart(2, "0"); // Day (e.g., 24, zero-padded)
  const hour = String(date.getHours()).padStart(2, "0"); // Hour (e.g., 15 for 3 PM, zero-padded)

  // Combine into a single string
  return `${year}-${day}-${hour}`;
}
