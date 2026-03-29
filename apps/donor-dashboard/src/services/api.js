import axios from 'axios';

const STORAGE_KEY = 'surplusx_donor_listings';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const readListings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeListings = (listings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
};

const sortByNewest = (listings) => {
  return [...listings].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
};

export const getFoodListings = async () => {
  if (API_BASE_URL) {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/food/listings`);
      return data;
    } catch {
      // Fallback to local demo data when backend is unavailable.
    }
  }

  return sortByNewest(readListings());
};

export const getUserStats = async () => {
  const listings = readListings();
  const totalDonations = listings.length;
  const foodSavedKg = listings.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    return sum + (item.quantityUnit === 'g' ? quantity / 1000 : quantity);
  }, 0);

  return {
    totalDonations,
    foodSavedKg: Number(foodSavedKg.toFixed(2)),
    mealsServiced: Math.round(foodSavedKg * 2)
  };
};

export const createFoodListing = async (payload) => {
  if (API_BASE_URL) {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/food/listings`, payload);
      return data;
    } catch {
      // Fallback to local demo data when backend is unavailable.
    }
  }

  const listing = {
    id: `listing_${Date.now()}`,
    ...payload,
    status: 'created',
    createdAt: Date.now()
  };

  const listings = readListings();
  listings.push(listing);
  writeListings(listings);
  return listing;
};

export const getDonationHistory = async () => {
  return sortByNewest(readListings());
};
