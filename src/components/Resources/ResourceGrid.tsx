// src/components/Resources/ResourcesGrid.tsx
import React from 'react';
import { Grid } from '@mui/material';
import { ResourceCard } from './ResourceCard';
import { Resource } from '../../services/api';

interface ResourcesGridProps {
  resources: Resource[];
  onResourceClick: (resource: Resource) => void;
}

export const ResourcesGrid: React.FC<ResourcesGridProps> = ({ resources, onResourceClick }) => {
  return (
    <Grid container spacing={2}>
      {resources.map((resource, index) => (
        <Grid item xs={12} sm={6} md={4} key={resource._id}>
          <ResourceCard 
            resource={{
              ...resource,
              isLocked: index >= 2
            }}
            onClick={onResourceClick} 
            isLocked={index >= 2} 
          />
        </Grid>
      ))}
    </Grid>
  );
};