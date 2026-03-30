import React from 'react';
import { Alert, Card, CardContent, Grid, Typography } from '@mui/material';
import { getAdminDashboardData } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getAdminDashboardData();
        setStats(data);
      } catch {
        setError('Failed to load dashboard data');
      }
    })();
  }, []);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const cards = [
    { title: 'Total Users', value: stats?.totalUsers ?? 0 },
    { title: 'Food Donations', value: stats?.totalDonations ?? 0 },
    { title: 'Deliveries', value: stats?.successfulDeliveries ?? 0 },
    { title: 'System Health', value: `${stats?.systemHealth ?? 0}%` }
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>SurplusX Admin Dashboard</Typography>
      <Grid container spacing={2}>
        {cards.map((item) => (
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