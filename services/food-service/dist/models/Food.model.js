import mongoose from 'mongoose';
const foodSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    enum: ['prepared', 'raw', 'packaged', 'baked'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.1
  },
  quantityUnit: {
    type: String,
    enum: ['kg', 'g', 'units', 'liters'],
    required: true
  },
  preparationDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  contactName: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  specialInstructions: {
    type: String
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'MATCHED', 'PICKED_UP', 'DELIVERED', 'EXPIRED'],
    default: 'AVAILABLE'
  },
  matchedNgoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO'
  },
  deliveryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delivery'
  }
}, {
  timestamps: true
});
const Food = mongoose.model('Food', foodSchema);
export default Food;