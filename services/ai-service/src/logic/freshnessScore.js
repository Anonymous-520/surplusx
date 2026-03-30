export const calculateFreshnessScore = (preparationTime, currentTime = new Date()) => {
  const prepDate = new Date(preparationTime);
  const now = new Date(currentTime);
  const hoursSincePrep = (now - prepDate) / (1000 * 60 * 60);
  return Math.max(0, 1 - hoursSincePrep / 24);
};

export const calculateSpoilageRisk = (foodType, temperature, timeSincePrepHours) => {
  const spoilageRates = {
    prepared: 0.08,
    raw: 0.06,
    packaged: 0.02,
    baked: 0.05
  };

  const baseRate = spoilageRates[foodType] ?? 0.05;

  let tempFactor = 1;
  if (temperature < 0) {
    tempFactor = 0.5;
  } else if (temperature <= 4) {
    tempFactor = 1;
  } else if (temperature <= 20) {
    tempFactor = 1.5;
  } else {
    tempFactor = 2;
  }

  return Math.min(1, timeSincePrepHours * baseRate * tempFactor);
};

export const calculateEdibilityScore = (freshnessScore, spoilageRisk, foodType) => {
  const edibilityScore = Math.max(0, Math.min(1, freshnessScore * 0.6 - spoilageRisk * 0.4));

  if (edibilityScore >= 0.8) {
    return {
      edibility_score: edibilityScore,
      recommendation: 'HIGH_QUALITY',
      description: 'Excellent condition, safe to consume',
      freshness_score: freshnessScore,
      spoilage_risk: spoilageRisk,
      food_type: foodType
    };
  }

  if (edibilityScore >= 0.6) {
    return {
      edibility_score: edibilityScore,
      recommendation: 'GOOD',
      description: 'Good condition, safe to consume',
      freshness_score: freshnessScore,
      spoilage_risk: spoilageRisk,
      food_type: foodType
    };
  }

  if (edibilityScore >= 0.4) {
    return {
      edibility_score: edibilityScore,
      recommendation: 'FAIR',
      description: 'Acceptable condition, consume soon',
      freshness_score: freshnessScore,
      spoilage_risk: spoilageRisk,
      food_type: foodType
    };
  }

  if (edibilityScore >= 0.2) {
    return {
      edibility_score: edibilityScore,
      recommendation: 'POOR',
      description: 'Poor condition, use for cooking only',
      freshness_score: freshnessScore,
      spoilage_risk: spoilageRisk,
      food_type: foodType
    };
  }

  return {
    edibility_score: edibilityScore,
    recommendation: 'UNSAFE',
    description: 'Not recommended for consumption',
    freshness_score: freshnessScore,
    spoilage_risk: spoilageRisk,
    food_type: foodType
  };
};
