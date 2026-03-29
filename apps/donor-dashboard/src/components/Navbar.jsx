import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Create Listing', to: '/create' },
  { label: 'History', to: '/history' }
];

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          SurplusX Donor
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={RouterLink}
              to={item.to}
              color="inherit"
              variant={location.pathname === item.to ? 'outlined' : 'text'}
              sx={{ borderColor: 'rgba(255,255,255,0.6)' }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
