import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert
} from '@mui/material';
import { api } from '../services/api';
import { Header } from '../components/Header/Header';
import axios from 'axios';

interface Subject {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  standard: {
    _id: string;
    grade: string;
  };
}

export const Subjects: React.FC = () => {
  const navigate = useNavigate();
  const { standardId } = useParams<{ standardId: string }>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      if (!standardId) return;
      
      const response = await axios.get(
        `http://localhost:3000/api/standards/${standardId}/subjects`
      );
      
      console.log('API Response:', response);
      
      const subjectsData = response.data.data || response.data;
      setSubjects(Array.isArray(subjectsData) ? subjectsData : []);
      
    } catch (error: any) {
      console.error('Error fetching subjects:', error);
      setError(error.response?.data?.message || error.message || 'Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('StandardId:', standardId);
    if (standardId) {
      fetchSubjects();
    }
  }, [standardId]);
  
  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subjects/${subjectId}/resources`);
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Subjects
        </Typography>
        <Grid container spacing={3}>
          {subjects.map((subject) => (
            <Grid item xs={12} sm={6} md={4} key={subject._id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}
                onClick={() => handleSubjectClick(subject._id)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={subject.imageUrl || '/placeholder-subject.png'}
                  alt={subject.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {subject.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Grade: {subject.standard.grade}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    ₹{subject.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Subjects;