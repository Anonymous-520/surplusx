import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, CircularProgress } from '@mui/material';
import Navbar from './components/Navbar';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateListing = lazy(() => import('./pages/CreateListing'));
const History = lazy(() => import('./pages/History'));
const PaymentForm = lazy(() => import('./pages/Payment/PaymentForm'));
const RegistrationForm = lazy(() => import('./pages/Registration/RegistrationForm'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FF9800',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Suspense
          fallback={
            <Container maxWidth="lg" sx={{ mt: 6, textAlign: 'center' }}>
              <CircularProgress size={40} />
            </Container>
          }
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateListing />} />
            <Route path="/history" element={<History />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;