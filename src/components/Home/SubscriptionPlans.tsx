import React from 'react';
import { Container, Grid, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();
  
  const plans = [
    {
      title: 'Subject Plan',
      price: '₹299/per subject',
      features: [
        'Everything in Subject Plan',
        'Get all study materials',
        'Get Only the subject you want',
        'Excel in the subject you want',
        'Priority support'
      ],
      recommended: false,
    },
    {
      title: 'Standard Plan',
      price: '₹499/subject',
      features: [
        'Access to all  subjects',
        'Get all resources ',
        'Progress tracking',
        'Basic study materials',
        'Email support'
      ],
      recommended: true,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{
            color: '#4ECDC4',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Choose Your Plan
        </Typography>
      </motion.div>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': plan.recommended ? {
                    content: '"RECOMMENDED"',
                    position: 'absolute',
                    top: '12px',
                    right: '-30px',
                    transform: 'rotate(45deg)',
                    backgroundColor: '#4ECDC4',
                    padding: '8px 40px',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  } : {},
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 3 
                    }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      color: '#4ECDC4',
                      fontWeight: 'bold',
                      mb: 4 
                    }}
                  >
                    {plan.price}
                  </Typography>
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Typography 
                        paragraph 
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 2
                        }}
                      >
                        <span style={{ color: '#4ECDC4', fontSize: '1.2rem' }}>•</span>
                        {feature}
                      </Typography>
                    </motion.div>
                  ))}
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{
                      backgroundColor: '#1A237E',
                      mt: 3,
                      py: 1.5,
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#2A337E',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(26,35,126,0.4)',
                      }
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Start Subscription
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 