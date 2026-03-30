import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Stack
} from '@mui/material';
import { getDonationHistory } from '../services/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDonationHistory();
        setHistory(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Donation History
      </Typography>
      {loading ? (
        <Stack direction="row" spacing={2} alignItems="center">
          <CircularProgress size={24} />
          <Typography>Loading history...</Typography>
        </Stack>
      ) : history.length === 0 ? (
        <Typography color="text.secondary">No previous donations yet.</Typography>
      ) : (
        <Stack spacing={2}>
          {history.map((item) => (
            <Card key={item.id}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Chip label={item.status || 'created'} color="primary" variant="outlined" />
                </Stack>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Quantity: {item.quantity} {item.quantityUnit || 'kg'}
                </Typography>
                <Typography color="text.secondary">
                  City: {item.city || item.location?.city || 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default History;
