export const servicesConfig = {
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  food: process.env.FOOD_SERVICE_URL || 'http://localhost:3002',
  matching: process.env.MATCHING_SERVICE_URL || 'http://localhost:3003',
  delivery: process.env.DELIVERY_SERVICE_URL || 'http://localhost:3004',
  ai: process.env.AI_SERVICE_URL || 'http://localhost:3007'
};