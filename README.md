# SurplusX - Food Redistribution Platform

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start frontend only (donor dashboard)
npm run dev:frontend

# Start backend only (all services)
npm run dev:backend

# Start frontend + backend together
npm run dev

# Start all frontend apps together
npm run dev:frontend:all

# Build for production
npm run build

# Start production server
npm start
```

## 📂 Architecture

SurplusX uses a **monorepo** structure with clear separation of concerns:

```
surplusx/
├── apps/              # Frontend applications
│   ├── donor-dashboard/  # Restaurant/event donor interface
│   ├── ngo-dashboard/    # NGO management interface
│   └── admin-panel/      # Analytics and monitoring
│
├── services/           # Backend microservices
│   ├── api-gateway/      # Main entry point and routing
│   ├── auth-service/     # Authentication and authorization
│   ├── food-service/     # Food listing management
│   ├── matching-service/ # AI-powered NGO matching
│   ├── delivery-service/ # Logistics and tracking
│   ├── ai-service/       # Food classification and spoilage prediction
│   └── ...
│
├── packages/           # Shared code
│   ├── types/           # TypeScript types
│   ├── utils/           # Common utilities
│   ├── constants/       # Shared constants
│   └── config/          # Configuration
│
└── infrastructure/     # DevOps and deployment
    ├── docker/          # Container configurations
    ├── kubernetes/      # Orchestration (optional)
    └── terraform/       # Cloud infrastructure
```

## 🔧 Key Features

### 1. **Intelligent Matching Algorithm**
- **Distance-based**: Uses Haversine formula for accurate geospatial calculations
- **Priority scoring**: Considers freshness (40%), quantity (20%), distance (30%), and NGO capacity (10%)
- **Real-time**: Matches food listings to NGOs within seconds

### 2. **AI-Powered Food Assessment**
- **Freshness scoring**: Decays exponentially over 24 hours
- **Spoilage prediction**: Considers food type, temperature, and time
- **Edibility classification**: 5-tier system (High Quality → Unsafe)

### 3. **Impact Tracking**
- **Food saved**: Kilograms rescued from waste
- **Meals serviced**: Estimated meals provided
- **CO2 reduction**: Environmental impact metrics

## 🛠 Services Overview

### API Gateway
- **Port**: 3000
- **Tech**: Express.js
- **Role**: Main entry point, request routing, authentication

### Matching Service
- **Port**: 3003
- **Tech**: Node.js
- **Algorithms**:
  - `nearestNgo.js`: Geospatial matching
  - `priorityScore.js`: Multi-factor scoring
  - `matchNgo.js`: Main matching logic

### AI Service
- **Port**: 3007
- **Tech**: Python (Flask)
- **Models**:
  - `freshnessScore.py`: Time-based freshness calculation
  - `spoilage.model.py`: ML-based spoilage prediction
  - `classification.model.py`: Food type classification

## 📊 Database Schema

### Core Collections/Tables

**Users**
```typescript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  role: 'DONOR' | 'NGO' | 'VOLUNTEER' | 'ADMIN',
  passwordHash: string,
  createdAt: Date,
  updatedAt: Date
}
```

**FoodListings**
```typescript
{
  id: string,
  donorId: string,
  title: string,
  description: string,
  foodType: 'prepared' | 'raw' | 'packaged' | 'baked',
  quantity: number,
  quantityUnit: 'kg' | 'g' | 'units' | 'liters',
  preparationDate: Date,
  expiryDate: Date,
  location: { latitude: number, longitude: number, address: string },
  status: 'AVAILABLE' | 'MATCHED' | 'PICKED_UP' | 'DELIVERED' | 'EXPIRED',
  createdAt: Date,
  updatedAt: Date
}
```

**NGOs**
```typescript
{
  id: string,
  name: string,
  location: { latitude: number, longitude: number, address: string },
  maxCapacity: number,
  currentCapacity: number,
  foodPreferences: string[],
  contactPerson: string,
  contactPhone: string,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Docker
```bash
# Build and start all services
docker-compose -f infrastructure/docker-compose.yml up --build

# Start specific services
docker-compose up api-gateway matching-service ai-service
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=surplusx

# Authentication
JWT_SECRET=your_secure_secret_here
JWT_EXPIRES_IN=1d

# Service Ports
API_PORT=3000
AUTH_SERVICE_PORT=3001
FOOD_SERVICE_PORT=3002
MATCHING_SERVICE_PORT=3003
AI_SERVICE_PORT=3007
```

## 🧪 Testing

Run tests for all services:

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e
```

## 📖 API Documentation

### Food Listings

**Create Listing**
```http
POST /api/food/listings
Authorization: Bearer <token>

{
  "title": "Fresh baked goods",
  "description": "Assorted breads and pastries",
  "foodType": "baked",
  "quantity": 25,
  "quantityUnit": "kg",
  "preparationDate": "2024-01-15T10:00:00Z",
  "expiryDate": "2024-01-16T10:00:00Z",
  "location": {
    "address": "123 Bakery St",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94103",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

**Get Matches**
```http
GET /api/food/:id/matches
Authorization: Bearer <token>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [x] Core matching algorithm
- [x] AI-powered freshness assessment
- [x] Real-time delivery tracking
- [ ] Mobile app for volunteers
- [ ] Advanced analytics dashboard
- [ ] Blockchain for donation verification

---

**SurplusX** - Reducing food waste, one meal at a time. 🍽️♻️