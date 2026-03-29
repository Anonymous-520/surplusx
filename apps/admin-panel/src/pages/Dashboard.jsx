import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Alert, Paper } from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import { getAdminDashboardData, getRecentActivity } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, donationsData] = await Promise.all([
          getAdminDashboardData(),
          getRecentActivity()
        ]);
        setStats(statsData);
        setRecentDonations(donationsData);
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
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading dashboard...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
    );
  }

  // Sample data for charts (replace with real API data)
  const systemGrowthData = [
    { month: 'Jan', users: 120, donations: 450 },
    { month: 'Feb', users: 180, donations: 620 },
    { month: 'Mar', users: 240, donations: 890 },
    { month: 'Apr', users: 300, donations: 1200 },
    { month: 'May', users: 360, donations: 1550 },
    { month: 'Jun', users: 420, donations: 1900 }
  ];

  const impactData = [
    { label: 'Food Saved', value: 65 },
    { label: 'Meals Served', value: 20 },
    { label: 'CO2 Reduced', value: 15 }
  ];

  const userTypeData = [
    { type: 'Donors', count: 180 },
    { type: 'NGOs', count: 45 },
    { type: 'Volunteers', count: 75 },
    { type: 'Admins', count: 8 }
  ];

  // Data Grid columns for recent donations
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'donor', headerName: 'Donor', width: 200 },
    { field: 'foodType', headerName: 'Food Type', width: 120 },
    { field: 'quantity', headerName: 'Quantity (kg)', width: 120 },
    { field: 'ngo', headerName: 'NGO', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'date', headerName: 'Date', width: 150 },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        SurplusX Admin Dashboard
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" paragraph>
        System-wide overview and analytics
      </Typography>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.totalUsers || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ✅ {stats?.activeUsers || 0} active this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Food Donations
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.totalDonations || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🍽️ {stats?.foodSavedKg || 0} kg saved
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Successful Deliveries
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.successfulDeliveries || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🚚 {stats?.deliverySuccessRate || 0}% success rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                System Health
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {stats?.systemHealth || 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ✅ All services operational
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
                System Growth (Last 6 Months)
              </Typography>
              <LineChart
                series={[
                  {
                    data: systemGrowthData.map(d => d.users),
                    label: 'Active Users',
                    color: '#3f51b5'
                  },
                  {
                    data: systemGrowthData.map(d => d.donations),
                    label: 'Food Donations',
                    color: '#4CAF50'
                  }
                ]}
                xAxis={[{ 
                  data: systemGrowthData.map(d => d.month), 
                  scaleType: 'point' 
                }]}
                height={350}
                margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
                grid={{ vertical: true, horizontal: true }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Environmental Impact
              </Typography>
              <PieChart
                series={[
                  {
                    data: impactData.map(item => ({
                      id: item.label,
                      value: item.value,
                      label: item.label
                    })),
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    cx: 150,
                    cy: 130
                  }
                ]}
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Types and System Status */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <BarChart
                series={[
                  {
                    data: userTypeData.map(d => d.count),
                    color: '#7986CB'
                  }
                ]}
                xAxis={[{ 
                  data: userTypeData.map(d => d.type), 
                  scaleType: 'band' 
                }]}
                height={300}
                margin={{ left: 50, right: 20, top: 20, bottom: 40 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Service Status
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {[
                  { name: 'API Gateway', status: 'Operational', health: 100 },
                  { name: 'Auth Service', status: 'Operational', health: 100 },
                  { name: 'Food Service', status: 'Operational', health: 100 },
                  { name: 'Matching Service', status: 'Operational', health: 100 },
                  { name: 'Delivery Service', status: 'Operational', health: 100 },
                  { name: 'Database', status: 'Operational', health: 100 }
                ].map((service, index) => (
                  <Paper key={index} elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.status}
                      </Typography>
                    </div>
                    <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
                      {service.health}%
                    </Typography>
                  </Paper>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Donations Table */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Food Donations
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={recentDonations.map((donation, index) => ({ 
                id: index + 1, 
                ...donation 
              }))}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              disableSelectionOnClick
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Avg Matching Time
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.avgMatchingTime || '0.45'}s
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ⚡ Fast and efficient
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Matching Accuracy
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.matchingAccuracy || '95'}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🎯 Optimal matches
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                CO2 Reduction
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.co2Reduction || '4,500'} kg
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🌱 Environmental impact
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Community Reach
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats?.communityReach || '18'} NGOs
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🤝 Partners supported
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;