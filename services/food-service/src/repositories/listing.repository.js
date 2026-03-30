const listingStore = [];

export function addListing(listing) {
  listingStore.unshift(listing);
  return listing;
}

export function getAllListings() {
  return listingStore;
}

export function getListingById(id) {
  return listingStore.find((item) => item.id === id);
}