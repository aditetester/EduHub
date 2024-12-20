import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Header } from '../components/Header/Header';
import { BoardSelection } from '../components/Boards/BoardSelection';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

export const Boards: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{color : '#1A237E'}}>
          Educational Boards
        </Typography>
        <BoardSelection />
      </Container>
    </Box>
  );
}; 