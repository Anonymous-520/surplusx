import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Users', path: '/users' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'Reports', path: '/reports' },
  { label: 'Settings', path: '/settings' }
];

export default function AdminSidebar({ drawerWidth = 240 }) {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.path} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}