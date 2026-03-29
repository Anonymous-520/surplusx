import { matchNgo, batchMatchNgos } from './services/matching-service/src/services/matchNgo.js';

// Sample data
const foodListings = [
  {
    id: 'food-001',
    title: 'Fresh Baked Goods',
    foodType: 'baked',
    quantity: 25,
    quantityUnit: 'kg',
    preparationDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    location: {
      latitude: 37.7749,
      longitude: -122.4194
    }
  },
  {
    id: 'food-002', 
    title: 'Prepared Meals',
    foodType: 'prepared',
    quantity: 50,
    quantityUnit: 'kg',
    preparationDate: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    location: {
      latitude: 37.7841,
      longitude: -122.4036
    }
  }
];

const ngos = [
  {
    id: 'ngo-001',
    name: 'San Francisco Food Bank',
    location: {
      latitude: 37.7694,
      longitude: -122.3917
    },
    maxCapacity: 100,
    currentCapacity: 40
  },
  {
    id: 'ngo-002',
    name: 'Mission District Shelter',
    location: {
      latitude: 37.7597,
      longitude: -122.4192
    },
    maxCapacity: 75,
    currentCapacity: 20
  },
  {
    id: 'ngo-003',
    name: 'Tenderloin Community Kitchen',
    location: {
      latitude: 37.7850,
      longitude: -122.4120
    },
    maxCapacity: 50,
    currentCapacity: 10
  }
];

console.log('🚀 SurplusX Matching Service Demo');
console.log('================================\n');

// Test individual matching
console.log('🍽️ Testing individual food matching:');
try {
  const match1 = matchNgo(foodListings[0], ngos);
  console.log('\n🔹 Match Result for "Fresh Baked Goods":');
  console.log(`   NGO: ${match1.ngoName}`);
  console.log(`   Distance: ${(match1.distance / 1000).toFixed(2)} km`);
  console.log(`   Priority Score: ${(match1.priorityScore * 100).toFixed(1)}%`);
  console.log(`   Estimated Pickup: ${match1.estimatedPickupTime}`);
  console.log(`   Freshness Factor: ${match1.matchingDetails.freshnessFactor.toFixed(2)}`);
  console.log(`   Quantity Factor: ${match1.matchingDetails.quantityFactor.toFixed(2)}`);
  console.log(`   Distance Factor: ${match1.matchingDetails.distanceFactor.toFixed(2)}`);
  console.log(`   Capacity Factor: ${match1.matchingDetails.capacityFactor.toFixed(2)}`);
} catch (error) {
  console.log(`Error: ${error.message}`);
}

// Test batch matching
console.log('\n📦 Testing batch matching for multiple food listings:');
const batchResults = batchMatchNgos(foodListings, ngos);
batchResults.forEach((result, index) => {
  if (result.error) {
    console.log(`\n❌ ${foodListings[index].title}: ${result.error}`);
  } else {
    console.log(`\n✅ ${foodListings[index].title}:`);
    console.log(`   → Matched with: ${result.ngoName}`);
    console.log(`   → Distance: ${(result.distance / 1000).toFixed(2)} km`);
    console.log(`   → Priority Score: ${(result.priorityScore * 100).toFixed(1)}%`);
    console.log(`   → Estimated Pickup: ${result.estimatedPickupTime}`);
  }
});

console.log('\n🎉 Matching service demo completed!');
console.log('\n📊 Summary:');
console.log(`   - Food listings processed: ${foodListings.length}`);
console.log(`   - NGOs available: ${ngos.length}`);
console.log(`   - Successful matches: ${batchResults.filter(r => !r.error).length}`);
console.log(`   - Failed matches: ${batchResults.filter(r => r.error).length}`);