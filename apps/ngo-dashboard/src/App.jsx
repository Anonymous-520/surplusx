import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AvailableFood from './pages/AvailableFood';
import ActiveDeliveries from './pages/ActiveDeliveries';
import CompletedDeliveries from './pages/CompletedDeliveries';
import Dashboard from './pages/Dashboard';
import NGONavbar from './components/NGONavbar';
import ImpactReport from './pages/ImpactReport';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#9C27B0',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NGONavbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/available" element={<AvailableFood />} />
          <Route path="/active" element={<ActiveDeliveries />} />
          <Route path="/completed" element={<CompletedDeliveries />} />
          <Route path="/impact" element={<ImpactReport />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;