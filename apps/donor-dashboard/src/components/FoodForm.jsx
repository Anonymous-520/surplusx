import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Typography, Paper } from '@mui/material';
import { createFoodListing } from '../services/api';

const FoodForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    foodType: '',
    quantity: '',
    quantityUnit: 'kg',
    preparationDate: '',
    expiryDate: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    contactName: '',
    contactPhone: '',
    specialInstructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createFoodListing(formData);
      console.log('Food listing created:', response);
      // Reset form or show success message
    } catch (error) {
      console.error('Error creating food listing:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Food Listing
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />

        <TextField
          fullWidth
          label="Food Type"
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
          margin="normal"
          select
          required
        >
          <MenuItem value="prepared">Prepared Food</MenuItem>
          <MenuItem value="raw">Raw Ingredients</MenuItem>
          <MenuItem value="packaged">Packaged Goods</MenuItem>
          <MenuItem value="baked">Baked Goods</MenuItem>
        </TextField>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Unit"
            name="quantityUnit"
            value={formData.quantityUnit}
            onChange={handleChange}
            margin="normal"
            select
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="g">g</MenuItem>
            <MenuItem value="units">units</MenuItem>
            <MenuItem value="liters">liters</MenuItem>
          </TextField>
        </Box>

        <TextField
          fullWidth
          label="Preparation Date"
          name="preparationDate"
          type="datetime-local"
          value={formData.preparationDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          fullWidth
          label="Expiry Date"
          name="expiryDate"
          type="datetime-local"
          value={formData.expiryDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Pickup Location
        </Typography>

        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>

        <TextField
          fullWidth
          label="Zip Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Contact Information
        </Typography>

        <TextField
          fullWidth
          label="Contact Name"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Contact Phone"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Special Instructions"
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          size="large"
        >
          Submit Food Listing
        </Button>
      </Box>
    </Paper>
  );
};

export default FoodForm;