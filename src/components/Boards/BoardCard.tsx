// @ts-nocheck
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { BoardType } from '../../types';
import { 
  StyledCard, 
  CardContent, 
  CardTitle, 
  BoardImage,
  StandardsCount,
  SubjectCount,
  CardDescription 
} from './styles';
import { useNavigate } from 'react-router-dom';

interface BoardCardProps {
  board: BoardType;
  onClick: () => void;
  delay?: number;
}

export const BoardCard: React.FC<BoardCardProps> = ({ board, onClick, delay }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const imageUrl = board.imageUrl 
    ? `http://localhost:3000${board.imageUrl}` 
    : '/default-board.png';

  const handleClick = () => {
    navigate(`/boards/${board._id}/standards`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay ? delay * 0.1 : 0 }}
    >
      <StyledCard onClick={handleClick}>
        <CardContent>
          <BoardImage 
            src={imageError ? '/default-board.png' : imageUrl}
            alt={board.name}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              setImageError(true);
            }}
          />
          <Box>
            <CardTitle>
              {board.name}
            </CardTitle>
            <StandardsCount>
              <strong>{board.standardsCount}</strong> Standards Available
            </StandardsCount>
          
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};