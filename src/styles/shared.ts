import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

export const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(8),
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

export const GradientBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  color: theme.palette.common.white,
})); 