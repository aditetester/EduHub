import React from 'react';
import { Alert, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Box p={2}>
    <Alert severity="error">{message}</Alert>
  </Box>
); 