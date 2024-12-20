import React from 'react';
import { Grid } from '@mui/material';
import { Subject } from '../../types';
import SubjectCard from './SubjectCard';

interface SubjectsGridProps {
  subjects: Subject[];
  onSubjectClick: (subjectId: string) => void;
}

export const SubjectsGrid: React.FC<SubjectsGridProps> = ({ 
  subjects, 
  onSubjectClick 
}) => {
  return (
    <Grid container spacing={3}>
      {subjects.map((subject) => (
        <Grid item xs={12} sm={6} md={4} key={subject._id}>
          <SubjectCard 
            subject={subject}
            onClick={onSubjectClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SubjectsGrid;
