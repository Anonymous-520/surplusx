import { useMemo } from 'react';

export function useNgoListings(listings = []) {
  return useMemo(
    () => ({
      total: listings.length,
      available: listings.filter((l) => l.status === 'AVAILABLE').length
    }),
    [listings]
  );
}