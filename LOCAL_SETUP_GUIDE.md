# 🏡 SurplusX Local Setup Guide - Step by Step

## 🎯 Quick Start (5 Minute Setup)

### 1. Install Node.js
**Download and install Node.js 18.x or higher:**
👉 [https://nodejs.org/](https://nodejs.org/)

**Verify installation:**
```bash
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
```

### 2. Download SurplusX

The project is already in your folder:
```
C:\Users\Saksham Rastogi\surplusx
```

### 3. Open in VS Code (Recommended)

```bash
code surplusx
```

### 4. Install Dependencies

Open a terminal in VS Code and run:

```bash
cd surplusx
npm install
```

This installs the root dependencies.

### 5. Run the Matching Demo

```bash
node test-matching.js
```

**You should see:**
```
🚀 SurplusX Matching Service Demo
================================

🍽️ Testing individual food matching:

🔹 Match Result for "Fresh Baked Goods":
   NGO: Tenderloin Community Kitchen
   Distance: 1.30 km
   Priority Score: 74.8%
   Estimated Pickup: 3 minutes
   ...
```

🎉 **Congratulations! The core matching algorithm is working!**

## 🚀 Full System Setup

### 1. Install Service Dependencies

```bash
# Install API Gateway dependencies
cd services/api-gateway
npm install

# Install Matching Service dependencies  
cd ../matching-service
npm install

# Install Food Service dependencies
cd ../food-service
npm install

# Go back to root
cd ../..
```

### 2. Start the API Gateway

```bash
cd services/api-gateway
npm run dev
```

**Keep this terminal open** - the API Gateway is now running on `http://localhost:3000`

### 3. Start the Matching Service

Open a **new terminal** and run:

```bash
cd services/matching-service
npm run dev
```

**Keep this terminal open** - the Matching Service is now running on `http://localhost:3003`

### 4. Test the API

Open a **third terminal** and test the health endpoints:

```bash
# Test API Gateway
curl http://localhost:3000/health

# Test Matching Service
curl http://localhost:3003/health
```

Both should return:
```json
{"status":"healthy","service":"api-gateway"}
```

## 📱 Run the Frontend

### 1. Install Frontend Dependencies

```bash
cd apps/donor-dashboard
npm install
```

### 2. Start the Donor Dashboard

```bash
npm run dev
```

**Keep this terminal open** - the frontend is now running on `http://localhost:5173`

### 3. Open in Browser

Open your browser and go to:
👉 [http://localhost:5173](http://localhost:5173)

You should see the SurplusX Donor Dashboard!

## 🎯 What You Can Do Now

### 1. Create a Food Listing
- Click "Create New Listing"
- Fill out the form with food details
- Submit the listing

### 2. View the Matching Algorithm in Action
- The system will automatically match your food with the best NGO
- See the priority score and estimated pickup time

### 3. Explore the Dashboard
- View your food listings
- See impact statistics
- Track delivery status

## 🔧 Troubleshooting

### "node not found" or "npm not found"
**Solution:** Install Node.js from [https://nodejs.org/](https://nodejs.org/)

### "Port already in use"
**Solution:**
```bash
# Find which process is using the port
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 PID
```

### "npm install fails"
**Solution:**
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### "Dependencies not found"
**Solution:** Make sure you're in the correct directory and run `npm install`

## 📚 Understanding the System

### Key Files You're Running

```
surplusx/
├── services/
│   ├── api-gateway/      # 🌐 Main API (port 3000)
│   │   └── src/server.js  # Express server
│   └── matching-service/ # 🤖 Matching AI (port 3003)
│       └── src/services/matchNgo.js  # Core algorithm
├── apps/
│   └── donor-dashboard/ # 📱 Frontend (port 5173)
│       └── src/App.jsx    # React app
└── test-matching.js      # 🧪 Demo script
```

### How the Matching Works

1. **You create a food listing** with details (type, quantity, location)
2. **Matching Service** calculates:
   - Distance to nearby NGOs (Haversine formula)
   - Priority score (freshness × quantity × distance × capacity)
3. **Best match is selected** and delivery is arranged
4. **Real-time updates** keep everyone informed

### The Algorithm

```javascript
// Priority Score Calculation
priorityScore = (
  freshnessFactor * 0.4 +    // How fresh is the food?
  quantityFactor * 0.2 +      // How much food?
  distanceFactor * 0.3 +      // How far is the NGO?
  capacityFactor * 0.1        // Can the NGO accept more?
)
```

## 🚀 Next Steps

### 1. Explore the Code
- Look at `services/matching-service/src/services/matchNgo.js`
- Check out `services/api-gateway/src/server.js`
- Browse the frontend components in `apps/donor-dashboard/src/`

### 2. Add More Services
```bash
# Install and start additional services
cd services/food-service
npm install
npm run dev  # Food Service on port 3002

cd ../auth-service  
npm install
npm run dev  # Auth Service on port 3001
```

### 3. Customize for Your Needs
- Modify the matching algorithm weights
- Add your organization's branding
- Integrate with your database

### 4. Deploy to Production
```bash
# Build Docker containers
docker-compose -f infrastructure/docker-compose.yml build

# Start all services
docker-compose -f infrastructure/docker-compose.yml up -d
```

## 💡 Pro Tips

### 1. Use VS Code Extensions
```
ESLint - For JavaScript linting
Prettier - For code formatting
Docker - For container management
REST Client - For API testing
```

### 2. API Testing
Use **Postman** or **Insomnia** to test endpoints:
```http
POST http://localhost:3000/api/food
Content-Type: application/json

{
  "title": "Test Food Listing",
  "foodType": "prepared",
  "quantity": 10,
  "quantityUnit": "kg",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

### 3. Monitor Performance
```bash
# Check memory usage
top

# Check CPU usage
htop

# Check open ports
netstat -tuln
```

## 🎉 You're Now Running SurplusX!

**What you've accomplished:**
- ✅ Set up the core matching algorithm
- ✅ Started the API Gateway
- ✅ Launched the Matching Service
- ✅ Running the Donor Dashboard
- ✅ Ready to make real impact!

**What's working:**
- 🤖 Intelligent food matching
- 🌐 API Gateway with routing
- 📱 Donor Dashboard interface
- 🔍 Real-time matching results

**Next milestones:**
- Add Auth Service for user accounts
- Implement Food Service for database storage
- Set up Delivery Service for real-time tracking
- Deploy to production!

## 📞 Need Help?

### Common Issues & Fixes

**Issue:** Services won't start
**Fix:** Check Node.js is installed and run `npm install` in each service directory

**Issue:** Port conflicts
**Fix:** Change ports in `.env` file or kill conflicting processes

**Issue:** Dependencies missing
**Fix:** Run `npm install` in the project root and each service

**Issue:** Frontend not loading
**Fix:** Make sure the API Gateway is running and CORS is configured

## 🌟 Success Stories

### Your First Match
When you create a food listing and see it matched with an NGO:
```
✅ Food Listing: "Restaurant Surplus - 25kg"
🔹 Matched with: SF Food Bank
📍 Distance: 1.3 km
⏱️ ETA: 4 minutes
🍽️ Impact: 100 meals served
🌱 CO2 Saved: 75 kg
```

### System Impact
After running for a month:
```
🍽️ 500 kg food saved
🍲 1,250 meals served
🌱 1,500 kg CO2 reduced
🤝 5 NGOs supported
🏢 10 restaurants participating
```

## 💚 Join the Movement

You're now part of the solution to:
- ❌ End food waste
- ✅ Feed communities
- 🌱 Protect the environment
- 💚 Create sustainable systems

**Every listing you create makes a difference!**

---

*"Small actions, big impact."*
**Welcome to SurplusX!** 🚀

**Next:** Try creating your first food listing at [http://localhost:5173](http://localhost:5173) 🍽️