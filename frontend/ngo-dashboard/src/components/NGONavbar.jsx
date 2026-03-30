import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function NGONavbar() {
  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar>
        <Typography variant="h6">NGO Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
}