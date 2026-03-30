export function validateListingPayload(payload = {}) {
  if (!payload.title) {
    throw new Error('title is required');
  }

  if (!payload.quantity && payload.quantity !== 0) {
    throw new Error('quantity is required');
  }

  return true;
}