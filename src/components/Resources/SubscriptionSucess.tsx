import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { api } from '../../services/api';

export const SubscriptionSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await api.verifyPayment(sessionId);
      // Wait for 3 seconds to show success message
      setTimeout(() => {
        navigate(`/subjects/${response.subjectId}/resources`);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Your subscription has been activated. You will be redirected to the resources page shortly.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Return to Resources
        </Button>
      </Box>
    </Container>
  );
};