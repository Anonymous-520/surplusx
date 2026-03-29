import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { getFoodListings, getUserStats } from '../services/api';
import FoodCard from '../components/FoodCard';
import StatusTracker from '../components/StatusTracker';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [listingsData, statsData] = await Promise.all([
          getFoodListings(),
          getUserStats()
        ]);
        setListings(listingsData);
        setStats(statsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading your dashboard...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to SurplusX Donor Dashboard
      </Typography>

      {stats && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Total Donations
                </Typography>
                <Typography variant="h3" component="div">
                  {stats.totalDonations}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Food Saved (kg)
                </Typography>
                <Typography variant="h3" component="div">
                  {stats.foodSavedKg}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Meals Serviced
                </Typography>
                <Typography variant="h3" component="div">
                  {stats.mealsServiced}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Your Food Listings
      </Typography>

      <Button
        variant="contained"
        color="primary"
        href="/create"
        sx={{ mb: 3 }}
      >
        + Create New Listing
      </Button>

      {listings.length === 0 ? (
        <Card elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No food listings yet
          </Typography>
          <Typography variant="body1">
            Create your first food listing to help reduce food waste and feed those in need.
          </Typography>
          <Button variant="outlined" href="/create" sx={{ mt: 2 }}>
            Create Listing
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid item xs={12} md={6} lg={4} key={listing.id}>
              <FoodCard listing={listing} />
            </Grid>
          ))}
        </Grid>
      )}

      <StatusTracker listings={listings} sx={{ mt: 6 }} />
    </Container>
  );
};

export default Dashboard;