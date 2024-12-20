import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { api, Standard } from '../../services/api';
import { StandardCard } from './StandardCard';

export const StandardsList: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [standards, setStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchStandards = async () => {
    if (!boardId) return;

    try {
      const response = await api.getStandards(boardId);
      setStandards(response.data); // Access the data property
    } catch (error) {
      console.error('Error fetching standards:', error);
    
    } finally {
      setLoading(false);
    }
  };

  fetchStandards();
}, [boardId]);

  if (loading) {
    return <div>Loading...</div>; // Consider using a proper loading component
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {standards.map((standard, index) => (
          <Grid item xs={12} sm={6} md={4} key={standard._id}>
            <StandardCard standard={standard} delay={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 