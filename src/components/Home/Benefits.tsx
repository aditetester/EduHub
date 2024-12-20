import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DevicesIcon from '@mui/icons-material/Devices';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { styled } from '@mui/material/styles';

const BenefitCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <AccessTimeIcon sx={{ fontSize: 50, color: '#1A237E' }} />,
      title: 'Flexible Learning',
      description: 'Study at your own pace with 24/7 access to all learning materials',
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 50, color: '#1A237E' }} />,
      title: 'Multi-Platform Access',
      description: 'Access your courses on any device - desktop, tablet, or mobile',
    },
    {
      icon: <EmojiObjectsIcon sx={{ fontSize: 50, color: '#1A237E' }} />,
      title: 'Expert Content',
      description: 'Learn from carefully curated content designed by education experts',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{color : '#4ECDC4'}}>
        EduHub Benefits
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} md={4} key={index}>
            <BenefitCard>
              {benefit.icon}
              <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                {benefit.title}
              </Typography>
              <Typography color="text.secondary">
                {benefit.description}
              </Typography>
            </BenefitCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 