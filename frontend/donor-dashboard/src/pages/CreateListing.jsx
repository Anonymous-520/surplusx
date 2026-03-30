import React from 'react';
import { Container, Typography } from '@mui/material';
import FoodForm from '../components/FoodForm';

const CreateListing = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Food Listing
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Share available surplus food with NGOs and delivery partners.
      </Typography>
      <FoodForm />
    </Container>
  );
};

export default CreateListing;
