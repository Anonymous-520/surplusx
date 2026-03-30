import { addListing, getAllListings, getListingById } from '../repositories/listing.repository.js';

export function createListing(data) {
  const now = Date.now();
  return addListing({
    id: data.id || `food_${now}`,
    ...data,
    createdAt: now,
    updatedAt: now
  });
}

export { getAllListings, getListingById };