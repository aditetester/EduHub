import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Standard } from '../../services/api';
import { 
  StyledCard, 
  CardContent, 
  GradeNumber, 
  StandardImage,
  StandardImageContainer,
  CardOverlay,
  StandardDetails
} from './styles';
import { useNavigate } from 'react-router-dom';

interface StandardCardProps {
  standard: Standard;
  delay: number;
}

export const StandardCard: React.FC<StandardCardProps> = ({ standard, delay }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/standards/${standard._id}/subjects`);
  };

 

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      <StyledCard>
        <StandardImageContainer>
          <StandardImage 
            src={standard.imageUrl || '/images/default-standard.png'}
            alt={`Grade ${standard.grade}`}
            onError={() => setImageError(true)}
          />
          <CardOverlay />
        </StandardImageContainer>
        <CardContent>
          <StandardDetails>
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 600,
                color: '#2A2A3C',
                mb: 1,
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              {standard.name}
            </Typography>
            <GradeNumber>
              Grade {standard.grade}
            </GradeNumber>
            <Typography 
              variant="body2" 
              sx={{
                color: '#666',
                lineHeight: 1.6,
                fontFamily: '"Roboto", sans-serif',
                fontSize: '0.95rem'
              }}
            >
              {standard.description}
            </Typography>
          </StandardDetails>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};