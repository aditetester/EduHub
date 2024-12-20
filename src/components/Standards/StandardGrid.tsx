import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StandardCard } from './StandardCard';
import { api, Standard, Board } from '../../services/api';
import { PageContainer, PageTitle } from './styles';
import { Loader } from '../common/Loader';

export const StandardGrid: React.FC<{ standardId?: string }> = ({ standardId }) => {
  const { boardId } = useParams<{ boardId: string }>();
  const [standards, setStandards] = useState<Standard[]>([]);
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    // Early return if boardId is undefined
    if (!boardId) return;

    try {
      setLoading(true);
      const [boardData, standardsResponse] = await Promise.all([
        api.getBoardDetails(boardId),
        api.getStandards(boardId)
      ]);
        
      setStandards(standardsResponse.data);
      setBoard(boardData.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [boardId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <PageTitle variant="h1">
              {board?.name || 'Standards'}
            </PageTitle>
            <Typography
              variant="h6"
              sx={{
                color: '#666',
                mt: 3,
                fontFamily: '"Roboto", sans-serif',
                fontWeight: 400
              }}
            >
              Choose your grade to explore learning resources
            </Typography>
          </Box>
          <Box sx={{ mt: 6 }}>
            <Grid container spacing={4}>
              {standards.map((standard, index) => (
                <Grid item xs={12} sm={6} md={3} key={standard._id}>
                  <StandardCard standard={standard} delay={index} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

