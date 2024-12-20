import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
}));

export const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color : '#1A237E'
}));

export const BoardImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 200,
  objectFit: 'cover',
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

export const StandardsCount = styled(Typography)(({ theme }) => ({
  color: '#757575',
  fontSize: '0.875rem',

}));

export const SubjectCount = styled(Typography)(({ theme }) => ({
  color: '#4ECDC4',
  fontSize: '0.875rem',
  marginTop: theme.spacing(0.5),
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 'auto',
}));