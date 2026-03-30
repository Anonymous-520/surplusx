import {
  calculateEdibilityScore,
  calculateFreshnessScore,
  calculateSpoilageRisk
} from '../logic/freshnessScore.js';

export function assessPayload(payload = {}) {
  const prep = payload.preparationDate || new Date().toISOString();
  const foodType = payload.foodType || 'prepared';
  const temperature = Number(payload.temperature ?? 4);
  const now = new Date();
  const hoursSincePrep = Math.max(0, (now - new Date(prep)) / 36e5);

  const freshness = calculateFreshnessScore(prep, now);
  const risk = calculateSpoilageRisk(foodType, temperature, hoursSincePrep);
  return calculateEdibilityScore(freshness, risk, foodType);
}