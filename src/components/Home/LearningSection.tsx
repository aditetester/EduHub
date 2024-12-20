import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const LearningSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img src={`${process.env.REACT_APP_PUBLIC_URL || ''}/images/undraw_learning_sketching_nd4f.svg`} alt="Learning" style={{ maxWidth: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom sx={{color : '#4ECDC4'}}>
            Every Child Deserves the Chance to Learn
          </Typography>
          <Typography variant="body1" paragraph>
            We believe in providing equal educational opportunities to all students.
            Our platform offers comprehensive learning materials across various subjects
            and standards, making quality education accessible to everyone.
          </Typography>
          <Button 
            variant="contained" 
            size="large" sx={ {backgroundColor :'#1A237E'}}
            onClick={() => navigate('/login')}
          >
            Start Learning Today
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}; 