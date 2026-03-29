import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { getNGODashboardData, getAvailableFood } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [availableFood, setAvailableFood] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, foodData] = await Promise.all([
          getNGODashboardData(),
          getAvailableFood()
        ]);
        setStats(statsData);
        setAvailableFood(foodData.length);
      } catch (err) {
        setError('Failed to fetch dashboard data');
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
        <Typography variant="h6" sx={{ mt: 2 }}>Loading dashboard...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <button onClick={() => window.location.reload()}>Retry</button>
      </Container>
    );
  }

  // Sample data for charts (replace with real API data)
  const foodTypeData = [
    { label: 'Prepared', value: 45 },
    { label: 'Raw', value: 30 },
    { label: 'Packaged', value: 15 },
    { label: 'Baked', value: 10 }
  ];

  const weeklyData = [
    { day: 'Mon', received: 12, distributed: 10 },
    { day: 'Tue', received: 15, distributed: 14 },
    { day: 'Wed', received: 18, distributed: 16 },
    { day: 'Thu', received: 20, distributed: 19 },
    { day: 'Fri', received: 25, distributed: 24 },
    { day: 'Sat', received: 30, distributed: 28 },
    { day: 'Sun', received: 10, distributed: 10 }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        NGO Dashboard - Welcome, SF Food Bank
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Overview of your food redistribution impact
      </Typography>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Available Food
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {availableFood}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                listings ready for acceptance
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Active Deliveries
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.activeDeliveries || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                currently in transit
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Meals Served
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.mealsServiced || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Capacity Usage
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.capacityUsage || 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                of max capacity
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Food Flow
              </Typography>
              <BarChart
                series={[
                  { data: weeklyData.map(d => d.received), label: 'Received', color: '#4CAF50' },
                  { data: weeklyData.map(d => d.distributed), label: 'Distributed', color: '#2196F3' }
                ]}
                xAxis={[{ data: weeklyData.map(d => d.day), scaleType: 'band' }]}
                height={300}
                margin={{ left: 80, right: 20, top: 20, bottom: 60 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Food Types
              </Typography>
              <PieChart
                series={[
                  {
                    data: foodTypeData.map(item => ({
                      id: item.label,
                      value: item.value,
                      label: item.label
                    })),
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    cx: 150,
                    cy: 120
                  }
                ]}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <button style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                📋 View Available Food
              </button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <button style={{ width: '100%', padding: '12px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                🚚 Track Deliveries
              </button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <button style={{ width: '100%', padding: '12px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                📊 Generate Report
              </button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <button style={{ width: '100%', padding: '12px', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                ⚙️ Manage Profile
              </button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {stats?.recentActivity?.map((activity, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '8px 0', 
                borderBottom: index < stats.recentActivity.length - 1 ? '1px solid #eee' : 'none'
              }}>
                <div>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {activity.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </div>
                <Typography variant="body2" color={activity.status === 'completed' ? 'success.main' : 'primary.main'}>
                  {activity.status}
                </Typography>
              </div>
            )) || (
              <Typography variant="body2" color="text.secondary">
                No recent activity
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;