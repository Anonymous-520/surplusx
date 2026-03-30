import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export default function Dashboard() {
  const summary = [
    { title: 'Available Food', value: 0 },
    { title: 'Active Deliveries', value: 0 },
    { title: 'Meals Served', value: 0 },
    { title: 'Capacity Usage', value: '0%' }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>NGO Dashboard</Typography>
      <Grid container spacing={2}>
        {summary.map((item) => (
          <Grid item xs={12} md={3} key={item.title}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">{item.title}</Typography>
                <Typography variant="h4">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}