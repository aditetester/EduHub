// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Grid, Container, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import { BoardCard } from './BoardCard';
import { BoardType } from '../../types';
import { api, Board as ApiBoard } from '../../services/api';

export const BoardSelection: React.FC = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getBoardIcon = (boardId: string) => {
    switch (boardId.toLowerCase()) {
      case 'cbse':
        return <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />;
      case 'icse':
        return <AccountBalanceIcon sx={{ fontSize: 40, color: 'white' }} />;
      default:
        return <BusinessIcon sx={{ fontSize: 40, color: 'white' }} />;
    }
  };

  const mapApiBoardToDisplayBoard = (apiBoard: ApiBoard): BoardType => ({
    _id: apiBoard._id,
    id: apiBoard._id,
    name: apiBoard.name,
    description: `${apiBoard.standardsCount} Standards Available`,
    imageUrl: apiBoard.imageUrl || '',
    standardsCount: apiBoard.standardsCount
  });

useEffect(() => {
  const fetchBoards = async () => {
    try {
      console.log('Fetching boards...');
      const response = await api.getBoards();
      console.log('API Response:', response);
      
      // Check if response has the expected structure
      if (response?.success && Array.isArray(response.data)) {
        const displayBoards = response.data.map(mapApiBoardToDisplayBoard);
        console.log('Mapped boards:', displayBoards);
        setBoards(displayBoards);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching boards:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch boards');
    } finally {
      setLoading(false);
    }
  };

  fetchBoards();
}, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!boards.length) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography>No boards available</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={4}>
        {boards.map((board) => (
          <Grid item xs={12} md={4} key={board.id}>
            <BoardCard 
              board={board}
              onClick={() => navigate(`/standards/${board.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};