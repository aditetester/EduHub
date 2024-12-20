import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export const LoadingSpinner: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Box>
); 