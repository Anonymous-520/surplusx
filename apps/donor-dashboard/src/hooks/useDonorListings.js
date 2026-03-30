import { useMemo } from 'react';

export function useDonorListings(listings = []) {
  return useMemo(
    () => ({
      total: listings.length,
      available: listings.filter((item) => item.status === 'AVAILABLE').length
    }),
    [listings]
  );
}