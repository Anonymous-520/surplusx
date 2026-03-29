import React from 'react';
import { Card, CardContent, CardActions, Typography, Chip, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns';

const StatusChip = styled(Chip)(({ theme, status }) => ({
  marginRight: theme.spacing(1),
  ...(status === 'AVAILABLE' && {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.contrastText
  }),
  ...(status === 'MATCHED' && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText
  }),
  ...(status === 'PICKED_UP' && {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  }),
  ...(status === 'DELIVERED' && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText
  }),
  ...(status === 'EXPIRED' && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText
  })
}));

const FoodCard = ({ listing }) => {
  const getStatusText = (status) => {
    const statusMap = {
      AVAILABLE: 'Available',
      MATCHED: 'Matched',
      PICKED_UP: 'In Transit',
      DELIVERED: 'Delivered',
      EXPIRED: 'Expired'
    };
    return statusMap[status] || status;
  };

  const getFoodTypeIcon = (type) => {
    const icons = {
      prepared: '🍲',
      raw: '🥦',
      packaged: '📦',
      baked: '🍞'
    };
    return icons[type] || '🍽️';
  };

  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <StatusChip 
            label={getStatusText(listing.status)} 
            status={listing.status}
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(listing.createdAt))} ago
          </Typography>
        </Box>

        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          {getFoodTypeIcon(listing.foodType)} {listing.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {listing.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip 
            label={`${listing.quantity} ${listing.quantityUnit}`}
            variant="outlined"
            size="small"
          />
          <Chip 
            label={listing.foodType}
            variant="outlined"
            size="small"
          />
          <Chip 
            label={`${listing.location.city}, ${listing.location.state}`}
            variant="outlined"
            size="small"
          />
        </Box>

        {listing.matchedNgo && (
          <Box sx={{ p: 1, bgcolor: 'background.default', borderRadius: 1, mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
              🤝 Matched with:
            </Typography>
            <Typography variant="body2">
              {listing.matchedNgo.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {listing.distance ? `${(listing.distance / 1000).toFixed(1)} km away` : ''}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Prepared: {new Date(listing.preparationDate).toLocaleString()}
          </Typography>
          {listing.expiryDate && (
            <Typography variant="body2" color="text.secondary">
              Expires: {new Date(listing.expiryDate).toLocaleString()}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 1.5 }}>
        {listing.status === 'AVAILABLE' && (
          <Button 
            size="small"
            variant="outlined"
            color="primary"
            sx={{ mr: 1 }}
          >
            View Matches
          </Button>
        )}
        
        <Button 
          size="small"
          variant="text"
          color="inherit"
        >
          Details
        </Button>
        
        {listing.status === 'MATCHED' && (
          <Button 
            size="small"
            variant="contained"
            color="success"
          >
            Track Delivery
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default FoodCard;