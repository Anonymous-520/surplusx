import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function AdminNavbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
      <Toolbar disableGutters>
        <Typography variant="h5">Admin Console</Typography>
      </Toolbar>
    </AppBar>
  );
}