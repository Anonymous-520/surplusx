import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Grid, 
  Box, 
  Alert, 
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Divider
} from '@mui/material';
import { 
  PersonAdd, 
  Restaurant, 
  VolunteerActivism, 
  AdminPanelSettings,
  CheckCircle
} from '@mui/icons-material';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    contactPerson: '',
    role: 'donor',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    receiveUpdates: true
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.organizationName) {
        throw new Error('Organization name is required');
      }

      if (!formData.email || !/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
        throw new Error('Valid email is required');
      }

      if (!formData.phone || formData.phone.length < 10) {
        throw new Error('Valid phone number is required');
      }

      if (!formData.password || formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.agreeTerms) {
        throw new Error('You must agree to the terms and conditions');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Fake registration
      console.log('Registration data:', {
        ...formData,
        password: '*****' // Don't log real password
      });

      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          organizationName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          contactPerson: '',
          role: 'donor',
          password: '',
          confirmPassword: '',
          agreeTerms: false,
          receiveUpdates: true
        });
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const roleIcons = {
    donor: <Restaurant color="primary" />,
    ngo: <VolunteerActivism color="secondary" />,
    volunteer: <PersonAdd color="success" />,
    admin: <AdminPanelSettings color="error" />
  };

  const roleDescriptions = {
    donor: 'Restaurant, grocery store, or food business that wants to donate surplus food',
    ngo: 'Non-profit organization that receives and distributes food donations',
    volunteer: 'Individual who wants to help with food deliveries and logistics',
    admin: 'System administrator with access to all features'
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonAdd color="primary" /> Join SurplusX
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Create an account to start reducing food waste and feeding communities
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} icon={<CheckCircle />}>
          ✅ Registration successful! Welcome to SurplusX!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          ❌ {error}
        </Alert>
      )}

      <Card elevation={3}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Organization Info */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Organization Information
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Organization Name"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText="Your business or organization name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText="Contact phone number"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Contact Person"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  fullWidth
                  helperText="Primary contact person"
                />
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Organization Address
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Street Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Account Type */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Account Type
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Role"
                    startAdornment={roleIcons[formData.role]}
                  >
                    <MenuItem value="donor">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Restaurant color="primary" /> Donor
                      </Box>
                    </MenuItem>
                    <MenuItem value="ngo">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <VolunteerActivism color="secondary" /> NGO
                      </Box>
                    </MenuItem>
                    <MenuItem value="volunteer">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonAdd color="success" /> Volunteer
                      </Box>
                    </MenuItem>
                    <MenuItem value="admin">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AdminPanelSettings color="error" /> Admin
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {roleIcons[formData.role]} {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {roleDescriptions[formData.role]}
                  </Typography>
                </Box>
              </Grid>

              {/* Account Security */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Account Security
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText="Minimum 6 characters"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={formData.password && formData.password !== formData.confirmPassword}
                  helperText={formData.password && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
                />
              </Grid>

              {/* Preferences */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Preferences
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="receiveUpdates"
                      checked={formData.receiveUpdates}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Receive email updates about SurplusX news and impact reports"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      color="primary"
                      required
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the <a href="#" style={{ color: '#1976D2' }}>Terms of Service</a> and <a href="#" style={{ color: '#1976D2' }}>Privacy Policy</a>
                    </Typography>
                  }
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading || !formData.agreeTerms}
                  startIcon={loading ? <CircularProgress size={20} /> : <PersonAdd />}
                >
                  {loading ? 'Registering...' : 'Create Account'}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account? <a href="/login" style={{ color: '#1976D2' }}>Sign in</a>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card elevation={2} sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🌟 Why Join SurplusX?
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Restaurant color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  For Donors
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reduce waste, get tax benefits, and make a social impact
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <VolunteerActivism color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  For NGOs
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reliable food supply and reduced procurement costs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <PersonAdd color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  For Volunteers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Flexible opportunities to make a difference
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  For Everyone
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Be part of a sustainable food ecosystem
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegistrationForm;