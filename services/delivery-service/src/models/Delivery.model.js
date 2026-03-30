import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  foodListingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['ASSIGNED', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED'],
    default: 'ASSIGNED'
  },
  pickupTime: {
    type: Date
  },
  deliveryTime: {
    type: Date
  },
  estimatedDuration: {
    type: String,
    default: 'TBD'
  },
  distance: {
    type: Number,
    default: 0,
    min: 0
  },
  route: {
    start: {
      latitude: Number,
      longitude: Number
    },
    end: {
      latitude: Number,
      longitude: Number
    },
    waypoints: [{
      latitude: Number,
      longitude: Number
    }]
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
deliverySchema.index({ foodListingId: 1 });
deliverySchema.index({ ngoId: 1 });
deliverySchema.index({ volunteerId: 1 });
deliverySchema.index({ status: 1 });
deliverySchema.index({ createdAt: -1 });

// Update updatedAt before save
deliverySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;