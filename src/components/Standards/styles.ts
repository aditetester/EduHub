import { styled } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';

export const SubjectImage = styled('img')({
  width: '100%',
  height: 'auto',  // Let the image adjust naturally
  objectFit: 'contain',  // Ensures the image stays fully visible within the container
  borderRadius: '12px',
  marginBottom: '12px',  // Slight reduction in margin
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Lighter shadow
});

// Styled Card for a modern, elevated look
export const StyledCard = styled(Card)(({ theme }) => ({
  height: '150px',  // Reduce the height of the card
  cursor: 'pointer',
  transition: 'all 0.3s ease',  // Faster transition
  background: '#FFFFFF',
  borderRadius: '16px',  // Softer corners
  border: '1px solid rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Lighter shadow for a subtler look

  '&:hover': {
    transform: 'scale(1.02)', // Slight scale effect on hover
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', // Slightly deeper shadow
  },
    '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',  // Thinner gradient line
    background: 'linear-gradient(90deg, #4776E6, #8E54E9)',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
}));

// Card Content: Padding, Flex Layout, and Text Alignment
export const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),  // Reduced padding for a more compact look
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, #ffffff 100%)',
  borderRadius: '12px',

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1),
  },
}));

// Improved Grade Number Styling
export const GradeNumber = styled(Box)(({ theme }) => ({
  fontSize: '1.4rem',  // Slightly smaller font size
  fontWeight: 700,
  color: '#2A2A3C',
  background: 'linear-gradient(45deg, #4776E6, #8E54E9)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1.5),
  fontFamily: '"Poppins", sans-serif',
  position: 'relative',

  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50px',  // Slightly smaller underline
    height: '3px',
    background: 'linear-gradient(90deg, #4776E6, #8E54E9)',
    borderRadius: '2px',
  },
}));


// Page Container: Enhancing the layout
export const PageContainer = styled(Box)(({ theme }) => ({

  minHeight: '100vh',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(8),
}));

// Page Title: Centered with a stylish underline effect
export const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.4rem', 
  fontWeight: 700,
  color: '#2A2A3C',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontFamily: '"Poppins", sans-serif',
  position: 'relative',
  display: 'inline-block',

  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-14px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '4px',
    background: 'linear-gradient(90deg, #4776E6, #8E54E9)',
    borderRadius: '2px',
  },
}));

// Grid Container: Adding responsiveness and spacing
export const GridContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  background: 'linear-gradient(180deg, #f5f7fa 0%, #c3cfe2 100%)',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: theme.spacing(2),  // Reduce gap for more compact display
}));

// Styled Standard Image Container: Rounded top corners
export const StandardImageContainer = styled(Box)(({
  position: 'relative',
  width: '100%',
  height: '100px',  // Reduced height for the image container
  overflow: 'hidden',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover img': {
    transform: 'scale(1.05)',  // Slight zoom effect on hover
  },
}));

// Standard Image: Responsive with smooth transition
export const StandardImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',  // Ensuring the image fills the container
  transition: 'transform 0.3s ease',

  '&:hover': {
    transform: 'scale(1.05)',  // Slight zoom effect
  },
});
// Card Overlay for dark effect on hover
// Card Overlay: A subtle overlay for the hover effect
export const CardOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
  transition: 'opacity 0.3s ease',
  opacity: 0,
  '&:hover': {
    opacity: 1,
  },
});

// Standard Details Box: Positioned on top of the overlay
export const StandardDetails = styled(Box)({
  position: 'relative',
  zIndex: 1,
  color: '#fff',
})