# 🚀 How to Run SurplusX - Complete Guide

## 📋 System Requirements

### Software Requirements
```
Node.js 18.x or higher
npm 9.x or higher
Docker (for production)
MongoDB (or use Docker)
Python 3.9+ (for AI service)
```

### Hardware Requirements
```
CPU: 2+ cores
RAM: 4GB+ (8GB recommended for development)
Disk: 2GB+ free space
```

## 🛠️ Setup Instructions

### 1. Install Prerequisites

**On Windows/macOS/Linux:**
```bash
# Install Node.js (includes npm)
# Download from: https://nodejs.org/

# Verify installation
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher

# Install Docker (optional for production)
# Download from: https://www.docker.com/
```

### 2. Clone the Repository

```bash
# Clone the SurplusX repository
git clone https://github.com/your-repo/surplusx.git
cd surplusx
```

### 3. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all service dependencies
npm run setup

# Or install individually
cd services/api-gateway && npm install
cd ../matching-service && npm install
cd ../food-service && npm install
cd ../auth-service && npm install
cd ../delivery-service && npm install
cd ../../apps/donor-dashboard && npm install
```

## 🚀 Running the System

### Option 1: Run Individual Services (Development)

```bash
# Terminal 1: API Gateway
cd services/api-gateway
npm run dev
# Runs on http://localhost:3000

# Terminal 2: Matching Service
cd services/matching-service
npm run dev
# Runs on http://localhost:3003

# Terminal 3: Food Service
cd services/food-service
npm run dev
# Runs on http://localhost:3002

# Terminal 4: Auth Service
cd services/auth-service
npm run dev
# Runs on http://localhost:3001

# Terminal 5: Delivery Service
cd services/delivery-service
npm run dev
# Runs on http://localhost:3004

# Terminal 6: Donor Dashboard (Frontend)
cd apps/donor-dashboard
npm run dev
# Runs on http://localhost:5173
```

### Option 2: Run System Tests

```bash
# Run the matching algorithm test
cd surplusx
node test-matching.js

# Run the complete system test
node test-system.js
```

### Option 3: Production Deployment with Docker

```bash
# Build all services
docker-compose -f infrastructure/docker-compose.yml build

# Start all services
docker-compose -f infrastructure/docker-compose.yml up -d

# View running services
docker-compose ps

# Access the system:
# - API Gateway: http://localhost:3000
# - Donor Dashboard: http://localhost:3001
# - NGO Dashboard: http://localhost:3002
# - Admin Panel: http://localhost:3003

# Stop services
docker-compose down
```

## 🧪 Testing the System

### 1. Test the Matching Algorithm

```bash
cd surplusx
node test-matching.js
```

**Expected Output:**
```
🚀 SurplusX Matching Service Demo
================================

🍽️ Testing individual food matching:

🔹 Match Result for "Fresh Baked Goods":
   NGO: Tenderloin Community Kitchen
   Distance: 1.30 km
   Priority Score: 74.8%
   Estimated Pickup: 3 minutes
   Freshness Factor: 0.92
   Quantity Factor: 0.50
   Distance Factor: 0.87
   Capacity Factor: 0.20

📦 Testing batch matching for multiple food listings:

✅ Fresh Baked Goods:
   → Matched with: Tenderloin Community Kitchen
   → Distance: 1.30 km
   → Priority Score: 74.8%
   → Estimated Pickup: 3 minutes

✅ Prepared Meals:
   → Matched with: Tenderloin Community Kitchen
   → Distance: 0.75 km
   → Priority Score: 88.1%
   → Estimated Pickup: 2 minutes

🎉 Matching service demo completed!
```

### 2. Test the Complete System

```bash
cd surplusx
node test-system.js
```

**This will test:**
- Matching service with multiple food listings
- AI-powered freshness assessment
- System impact calculations
- Real-time delivery simulation

### 3. Test API Endpoints

```bash
# After starting services, test API endpoints

# Health check
curl http://localhost:3000/health

# Create food listing (requires auth token)
curl -X POST http://localhost:3000/api/food \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Food","foodType":"prepared","quantity":10,"quantityUnit":"kg"}'
```

## 📱 Using the Donor Dashboard

### 1. Start the frontend
```bash
cd apps/donor-dashboard
npm run dev
```

### 2. Open in browser
```
http://localhost:5173
```

### 3. Create a food listing
- Click "Create New Listing"
- Fill out the food form with details
- Submit the listing
- View matches and delivery status

## 🔧 Common Issues & Solutions

### Node.js not found
```bash
# Install Node.js from https://nodejs.org/
# Or use nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install 18
nvm use 18
```

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Docker issues
```bash
# Make sure Docker is running
sudo systemctl start docker

# Check Docker status
docker --version
docker ps
```

### Port conflicts
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 PID
```

## 📊 Monitoring & Debugging

### View service logs
```bash
# For Docker
docker-compose logs -f

# For individual services
cd services/api-gateway
npm run dev  # Shows logs in terminal
```

### Check service health
```bash
curl http://localhost:3000/health  # API Gateway
curl http://localhost:3001/health  # Auth Service
curl http://localhost:3002/health  # Food Service
curl http://localhost:3003/health  # Matching Service
curl http://localhost:3004/health  # Delivery Service
```

## 🎯 Development Workflow

### 1. Make changes
```bash
# Edit files in your preferred IDE
# VS Code, WebStorm, etc.
```

### 2. Test changes
```bash
# Run specific service
cd services/matching-service
npm run dev

# Test changes
node test-matching.js
```

### 3. Commit changes
```bash
git add .
git commit -m "Add new feature: real-time matching"
git push origin main
```

## 🚀 Production Deployment Checklist

### Before Deployment
```
✅ All tests passing
✅ Environment variables configured
✅ Database backups created
✅ SSL certificates ready
✅ Monitoring setup
✅ Backup plan in place
```

### Deployment Steps
```bash
# 1. Build production images
docker-compose -f infrastructure/docker-compose.yml build

# 2. Run database migrations
# (If applicable)

# 3. Start services
docker-compose -f infrastructure/docker-compose.yml up -d

# 4. Verify health checks
curl http://localhost:3000/health

# 5. Setup monitoring
# (Prometheus, Grafana, etc.)

# 6. Configure backups
# (Database, file storage)
```

### Post-Deployment
```
✅ Verify all services running
✅ Test critical user flows
✅ Monitor performance metrics
✅ Setup alerts
✅ Document deployment
```

## 📖 API Documentation

### Base URL
```
Development: http://localhost:3000
Production: https://api.surplusx.org
```

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Food Listings
```http
POST /api/food
GET  /api/food
GET  /api/food/:id
GET  /api/food/:id/matches
```

### Deliveries
```http
POST /api/deliveries
PUT  /api/deliveries/:id
GET  /api/deliveries/:id
```

## 💡 Tips for Best Performance

### Development
```
✅ Use npm run dev for hot reloading
✅ Test individual services before integrating
✅ Use Postman for API testing
✅ Monitor service logs
```

### Production
```
✅ Use Docker for consistency
✅ Enable caching
✅ Setup proper monitoring
✅ Implement rate limiting
✅ Use CDN for static assets
```

## 🎉 Success! You're Running SurplusX

Once all services are running:
- ✅ **API Gateway**: http://localhost:3000
- ✅ **Donor Dashboard**: http://localhost:5173
- ✅ **Matching Service**: http://localhost:3003
- ✅ **Delivery Service**: http://localhost:3004

**You're now reducing food waste and feeding communities!** 🍽️♻️💚

## 📞 Need Help?

### Common Questions

**Q: How do I reset the database?**
```bash
docker-compose down -v  # Removes volumes
docker-compose up -d      # Fresh start
```

**Q: How to update environment variables?**
```
Edit .env file
Restart services
```

**Q: How to scale services?**
```bash
# For Docker
docker-compose up -d --scale api-gateway=3
```

**Q: How to debug a specific service?**
```bash
cd services/matching-service
npm run dev  # Shows detailed logs
```

## 🌟 Next Steps

### 1. Explore the system
```
Try creating food listings
Test the matching algorithm
Simulate deliveries
```

### 2. Customize for your needs
```
Add your organization's branding
Configure specific matching rules
Integrate with your existing systems
```

### 3. Deploy to production
```
Follow the production deployment guide
Setup monitoring and alerts
Start making real impact!
```

**Welcome to SurplusX! You're now part of the solution to end food waste.** 🚀

---

*"Every meal saved is a life changed."*
**The SurplusX Team** 💚