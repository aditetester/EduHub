import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { StandardGrid } from '../components/Standards/StandardGrid';
import { api } from '../services/api';
import { Loader } from '../components/common/Loader';

interface Standard {
  // Define the structure of your standard data here
}

export const Standards: React.FC = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [standards, setStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandards = async () => {
      try {
        setLoading(true);
        if (!boardId) {
          throw new Error('Board ID is required');
        }
        const data = await api.getStandards(boardId);
        setStandards(data.data); // Access the data property of ApiResponse
      } catch (err) {
        console.error('Error fetching standards:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch standards');
        navigate('/boards'); // Redirect to boards on error
      } finally {
        setLoading(false);
      }
    };

    fetchStandards();
  }, [boardId, navigate]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <StandardGrid standardId={boardId} />
      </Container>
    </Box>
  );
};