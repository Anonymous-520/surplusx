export function toAssessmentResult(input = {}) {
  return {
    edibility_score: Number(input.edibility_score || 0),
    recommendation: input.recommendation || 'UNKNOWN',
    description: input.description || ''
  };
}