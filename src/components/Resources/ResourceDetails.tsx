// src/components/Resources/ResourceDetails.tsx
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, RadioGroup, FormControlLabel, Radio, Alert, Box } from '@mui/material';
import { Resource, SubscriptionType } from '../../types';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const AnimatedDialogContent = motion(DialogContent as any);
const AnimatedDialogActions = motion(DialogActions as any);
const AnimatedBox = motion(Box as any);

interface ResourceDetailsProps {
    open: boolean;
  onClose: () => void;
  resource: Resource;
  onSubscribe: () => void;
}

export const ResourceDetails: React.FC<ResourceDetailsProps> = ({
  open,
  onClose,
  resource,
}) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>('SUBJECT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      // Debug log
      console.log('Authentication state:', { 
        hasToken: !!token, 
        hasUser: !!userData 
      });

      if (!token || !userData) {
        navigate('/login', { 
          state: { from: window.location.pathname }
        });
        return;
      }

      if (!resource._id) {
        setError('Subject ID is missing');
        return;
      }

      const response = await api.createCheckoutSession({
        subjectId: resource._id,
        type: subscriptionType
      });

      if (response.success && response.url) {
        window.location.href = response.url;
      } else {
        setError('Failed to create checkout session');
      }
    } catch (err: any) {
      console.error('Subscription Error:', err);
      
      if (err.message === 'Please log in again') {
        navigate('/login', { 
          state: { from: window.location.pathname }
        });
      } else {
        setError(err.message || 'Failed to create subscription');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      TransitionProps={{
        timeout: 400
      }}
      PaperProps={{
        sx: {
          borderRadius: '24px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
        color: 'white',
        py: 3,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {resource.title}
        </motion.div>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
          }}
        />
      </DialogTitle>

      <AnimatedDialogContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
              {process.env.NODE_ENV === 'development' && (
                <Typography variant="caption" display="block">
                  Please check the console for more details.
                </Typography>
              )}
            </Alert>
          </motion.div>
        )}

        <RadioGroup
          value={subscriptionType}
          onChange={(e) => setSubscriptionType(e.target.value as SubscriptionType)}
        >
          {['SUBJECT', 'STANDARD'].map((type) => (
            <AnimatedBox
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: type === 'SUBJECT' ? 0.2 : 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FormControlLabel 
                value={type} 
                control={<Radio />} 
                label={
                  <Box sx={{
                    p: 3,
                    borderRadius: '16px',
                    border: '2px solid',
                    borderColor: subscriptionType === type ? 'primary.main' : 'divider',
                    transition: 'all 0.3s ease',
                    background: subscriptionType === type ? 'rgba(107, 115, 255, 0.05)' : 'transparent',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(107, 115, 255, 0.15)'
                    }
                  }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {type === 'SUBJECT' ? 'Subject Only' : 'Full Standard'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {type === 'SUBJECT' 
                        ? 'Access to all resources in this subject'
                        : 'Access to all subjects in this standard'}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      color="primary" 
                      sx={{ 
                        mt: 2,
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      ₹{type === 'SUBJECT' ? resource.subjectPrice || 499 : resource.standardPrice || 999}
                    </Typography>
                  </Box>
                }
                sx={{ mb: type === 'SUBJECT' ? 2 : 0, width: '100%' }}
              />
            </AnimatedBox>
          ))}
        </RadioGroup>
      </AnimatedDialogContent>

      <AnimatedDialogActions
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        sx={{ p: 3, gap: 2 }}
      >
        <Button 
          onClick={onClose} 
          disabled={loading}
          sx={{ 
            borderRadius: '12px',
            textTransform: 'none',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubscribe} 
          variant="contained"
          disabled={loading}
          sx={{ 
            borderRadius: '12px',
            textTransform: 'none',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
            transition: 'all 0.2s',
            '&:hover': {
              background: 'linear-gradient(135deg, #5A61FF 0%, #000BFF 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(107, 115, 255, 0.3)'
            }
          }}
        >
          <motion.span
            animate={loading ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
            transition={loading ? { repeat: Infinity, duration: 1 } : {}}
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </motion.span>
        </Button>
      </AnimatedDialogActions>
    </Dialog>
  );
};
