import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Subject } from '../../types';

interface SubjectCardProps {
  subject: Subject;
  onClick: (subjectId: string) => void;
}




export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
      onClick={() => onClick(subject._id)}
    >
      <CardMedia
        component="img"
        height="140"
        image={subject.imageUrl || '/placeholder-subject.png'}
        alt={subject.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
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
  );
};

export default SubjectCard; 