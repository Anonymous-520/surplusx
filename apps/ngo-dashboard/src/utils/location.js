export function formatLocation(location = {}) {
  const city = location.city || 'Unknown City';
  const state = location.state || 'Unknown State';
  return `${city}, ${state}`;
}