import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const summarize = (listings) => {
  return listings.reduce(
    (acc, item) => {
      const normalized = String(item.status || 'AVAILABLE').toUpperCase();
      if (normalized === 'MATCHED') acc.matched += 1;
      else if (normalized === 'PICKED_UP' || normalized === 'IN_TRANSIT') acc.pickedUp += 1;
      else if (normalized === 'DELIVERED' || normalized === 'COMPLETED') acc.delivered += 1;
      else acc.created += 1;
      return acc;
    },
    { created: 0, matched: 0, pickedUp: 0, delivered: 0 }
  );
};

const StatusTracker = ({ listings, sx }) => {
  const counts = summarize(listings || []);

  return (
    <Card elevation={2} sx={sx}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Listing Status Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">Created</Typography>
            <Typography variant="h5">{counts.created}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">Matched</Typography>
            <Typography variant="h5">{counts.matched}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">Picked Up</Typography>
            <Typography variant="h5">{counts.pickedUp}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">Delivered</Typography>
            <Typography variant="h5">{counts.delivered}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatusTracker;
