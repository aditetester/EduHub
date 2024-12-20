// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { api, Board } from '../../services/api';
import { BoardCard } from './BoardCard';
import { Loader } from '../common/Loader';
import { convertToDisplayBoard } from '../../utils/boardUtils';

export const BoardsList: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBoards = async () => {
    try {
      setLoading(true);
      const response = await api.getBoards();
      // Use response.data which contains the array of boards
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
      
    } finally {
      setLoading(false);
    }
  };

  fetchBoards();
}, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {boards.map((board, index) => (
          <Grid item xs={12} sm={6} md={4} key={board._id}>
            <BoardCard 
              board={{...convertToDisplayBoard(board), id: board._id, description: '', imageUrl: convertToDisplayBoard(board).imageUrl || ''}}
              onClick={() => {}}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 