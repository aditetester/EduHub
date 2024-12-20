import { styled } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';

export const SubjectImage = styled('img')({
  width: '100%',
  height: '120px',
  borderRadius: '12px',
  marginBottom: '16px',
  objectFit: 'cover',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  }
});

export const StyledCard = styled(Card)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, #ffffff 100%)',
  borderRadius: '12px',

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export const SubjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.6rem',
  fontWeight: 700,
  color: '#2A2A3C',
  background: 'linear-gradient(45deg, #4776E6, #8E54E9)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(2),
  fontFamily: '"Poppins", sans-serif',
  position: 'relative',

  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #4776E6, #8E54E9)',
    borderRadius: '2px',
  },
}));

export const SubjectDescription = styled(Typography)({
  color: '#666',
  lineHeight: 1.6,
  fontFamily: '"Roboto", sans-serif',
  fontSize: '0.95rem',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  marginTop: '16px'
});

export const SubjectImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '120px',
  overflow: 'hidden',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  '&:hover img': {
    transform: 'scale(1.05)',
  },
});

export const CardOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
  transition: 'opacity 0.4s ease',
  opacity: 0,
  '&:hover': {
    opacity: 1,
  },
}); 