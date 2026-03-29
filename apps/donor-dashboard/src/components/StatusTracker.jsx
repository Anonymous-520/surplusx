import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const summarize = (listings) => {
  return listings.reduce(
    (acc, item) => {
      const status = (item.status || 'created').toLowerCase();
      if (status === 'matched') acc.matched += 1;
      else if (status === 'picked_up') acc.pickedUp += 1;
      else if (status === 'delivered') acc.delivered += 1;
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
