export type UserRole = 'DONOR' | 'NGO' | 'VOLUNTEER' | 'ADMIN';
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export interface FoodListing {
    id: string;
    donorId: string;
    title: string;
    description: string;
    foodType: 'prepared' | 'raw' | 'packaged' | 'baked';
    quantity: number;
    quantityUnit: 'kg' | 'g' | 'units' | 'liters';
    preparationDate: Date;
    expiryDate: Date;
    location: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number;
        longitude: number;
    };
    contactName: string;
    contactPhone: string;
    specialInstructions?: string;
    status: 'AVAILABLE' | 'MATCHED' | 'PICKED_UP' | 'DELIVERED' | 'EXPIRED';
    createdAt: Date;
    updatedAt: Date;
}
export interface NGO {
    id: string;
    name: string;
    description: string;
    contactPerson: string;
    contactPhone: string;
    contactEmail: string;
    location: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number;
        longitude: number;
    };
    maxCapacity: number;
    currentCapacity: number;
    operatingHours: string;
    foodPreferences?: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface Delivery {
    id: string;
    foodListingId: string;
    ngoId: string;
    volunteerId?: string;
    status: 'ASSIGNED' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED';
    pickupTime?: Date;
    deliveryTime?: Date;
    estimatedDuration: string;
    distance: number;
    route?: {
        start: {
            latitude: number;
            longitude: number;
        };
        end: {
            latitude: number;
            longitude: number;
        };
        waypoints?: Array<{
            latitude: number;
            longitude: number;
        }>;
    };
    createdAt: Date;
    updatedAt: Date;
}
export interface MatchingResult {
    foodListingId: string;
    ngoId: string;
    ngoName: string;
    distance: number;
    priorityScore: number;
    estimatedPickupTime: string;
    matchingDetails: {
        freshnessFactor: number;
        quantityFactor: number;
        distanceFactor: number;
        capacityFactor: number;
    };
}
export interface Metrics {
    foodSavedKg: number;
    mealsServiced: number;
    co2ReductionKg: number;
    donationsCount: number;
    activeNgos: number;
    activeDonors: number;
    lastUpdated: Date;
}
export interface APIResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    timestamp: Date;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
