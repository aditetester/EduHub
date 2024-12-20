import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { api } from '../services/api';

export const SubscriptionSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        const subjectIdFromUrl = searchParams.get('subject_id');
        console.log('Session ID:', sessionId);
        console.log('Subject ID:', subjectIdFromUrl);
        
        if (!sessionId) {
          setError('No session ID found');
          setLoading(false);
          return;
        }

        const response = await api.verifyPayment(sessionId);
        console.log('Verification response:', response);
        
        if (response.success) {
          // Store the subject ID from the response or URL
          setSubjectId(response.subjectId || subjectIdFromUrl);
          setLoading(false);
        } else {
          setError(response.message || 'Verification failed');
          setLoading(false);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setError('Failed to verify payment');
        setLoading(false);
      }
    };

    verifySession();
  }, [searchParams]);

  const handleContinueStudying = () => {
    if (subjectId) {
      // Redirect to the specific subject's resources
      navigate(`/subjects/${subjectId}/resources`);
    } else {
      // Fallback to general resources page
      navigate('/resources');
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        gap={2}
        sx={{ background: '#f5f5f5' }}
      >
        <CircularProgress />
        <Typography variant="body1" color="textSecondary">
          Verifying your payment...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        gap={2}
        sx={{ background: '#f5f5f5' }}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        background: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Box 
            sx={{ 
              mb: 4,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              src='../images/undraw_reading_time_re_phf7.svg'
              alt="Payment Success"
              style={{
                width: '200px',
                height: 'auto',
                marginBottom: '1rem'
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/fallback-success.png';
              }}
            />
          </Box>

          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: '#2E7D32'
            }}
          >
            Payment Successful!
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              color: '#666',
              fontSize: '1.1rem'
            }}
          >
            Your subscription has been activated successfully. 
            You now have full access to {subjectId ? 'this subject\'s' : 'all'} resources.
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#6c63ff',
                '&:hover': {
                  bgcolor: '#5b52cc'
                },
                py: 1.5,
                fontSize: '1.1rem'
              }}
              onClick={handleContinueStudying}
            >
              Continue Studying
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                color: '#6c63ff',
                borderColor: '#6c63ff',
                '&:hover': {
                  borderColor: '#5b52cc',
                  bgcolor: 'rgba(108, 99, 255, 0.04)'
                }
              }}
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};