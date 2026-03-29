import React from 'react';
import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';

const FoodCard = ({ listing }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="h6">{listing.title || 'Untitled Listing'}</Typography>
          <Chip label={listing.status || 'created'} size="small" color="primary" variant="outlined" />
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {listing.description || 'No description provided.'}
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Quantity: {listing.quantity || 0} {listing.quantityUnit || 'kg'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {listing.city || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
