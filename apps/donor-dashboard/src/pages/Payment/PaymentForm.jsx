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
  Divider, 
  Alert,
  CircularProgress
} from '@mui/material';
import { CreditCard, Payment, Lock } from '@mui/icons-material';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    amount: '50.00',
    donationType: 'one-time'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    }
    // Format expiry date as MM/YY
    else if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/[^0-9]/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substring(0, 5);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    }
    // Limit CVV to 3-4 digits
    else if (name === 'cvv') {
      const formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    }
    // Allow only numbers for amount
    else if (name === 'amount') {
      const formattedValue = value.replace(/[^0-9.]/g, '');
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fake payment processing
      if (formData.cardNumber.replace(/\s+/g, '').length !== 16) {
        throw new Error('Invalid card number');
      }
      
      if (formData.expiryDate.length !== 5 || !/\d{2}\/\d{2}/.test(formData.expiryDate)) {
        throw new Error('Invalid expiry date');
      }
      
      if (formData.cvv.length < 3) {
        throw new Error('Invalid CVV');
      }
      
      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData(prev => ({ ...prev, 
          cardNumber: '',
          cardName: '',
          expiryDate: '',
          cvv: ''
        }));
      }, 3000);
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const donationOptions = [
    { value: 'one-time', label: 'One-Time Donation' },
    { value: 'monthly', label: 'Monthly Subscription' },
    { value: 'quarterly', label: 'Quarterly Donation' }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Payment color="primary" /> Make a Donation
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Support our mission to reduce food waste and feed communities
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          🎉 Payment successful! Thank you for your donation!
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
              {/* Donation Amount */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Donation Amount
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <TextField
                    label="Amount ($)"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    type="text"
                    InputProps={{ startAdornment: '$' }}
                    sx={{ flexGrow: 1 }}
                    required
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  {[25, 50, 100, 250].map(amount => (
                    <Button
                      key={amount}
                      variant={formData.amount === amount.toString() ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                    >
                      ${amount}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Donation Frequency
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {donationOptions.map(option => (
                      <Button
                        key={option.value}
                        variant={formData.donationType === option.value ? 'contained' : 'outlined'}
                        onClick={() => setFormData(prev => ({ ...prev, donationType: option.value }))}
                        size="small"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Payment Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Payment Information
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <CreditCard color="action" sx={{ mr: 1 }} />
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Name on Card"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Expiry Date (MM/YY)"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  fullWidth
                  required
                  type="password"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <Lock color="action" sx={{ mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Your payment information is securely encrypted
                  </Typography>
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Payment />}
                >
                  {loading ? 'Processing...' : `Donate $${formData.amount}`}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card elevation={2} sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💡 Why Donate?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <CreditCard color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Secure Payments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All transactions are encrypted and secure
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Payment color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Tax Deductible
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive tax receipts for donations
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Lock color="error" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Transparent
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  See exactly where your money goes
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <CreditCard color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Flexible
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  One-time or recurring donations
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentForm;