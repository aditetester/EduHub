// src/pages/Resources.tsx
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Box, Container, CircularProgress, Alert, Typography, Tabs, Tab, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import { ResourceDetails } from '../components/Resources/ResourceDetails';
import { api } from '../services/api';
import { Resource } from '../types';
import { ResourceTable } from '../components/Resources/ResourceTable';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    minWidth: 120,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
}));

export const Resources: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [pdfResources, setPdfResources] = useState<Resource[]>([]);
  const [videoResources, setVideoResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchResources();
  }, [subjectId]);

  const fetchResources = async () => {
    try {
      if (!subjectId) return;
      setLoading(true);
      const response = await api.getResourcesBySubject(subjectId);
      
      // Extract data from the response
      const { data } = response;
      
      const processResources = (resources: Resource[] = []) => 
        resources.map((resource, index) => ({
          ...resource,
          isLocked: index >= 2,
          _id: resource._id || `resource-${index}` // Ensure unique key exists
        }));

      setPdfResources(processResources(data.pdfResources));
      setVideoResources(processResources(data.videoResources));
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const handleResourceClick = (resource: Resource) => {
    console.log('Opening resource details:', resource);
    setSelectedResource(resource);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubscribe = async () => {
    try {
      console.log('Initiating subscription flow');
    } catch (error) {
      console.error('Error initiating subscription:', error);
      setError('Failed to initiate subscription');
    }
  };

  return (
    <Container maxWidth="lg">
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2, 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              mt: 4, 
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Resources
          </Typography>
          
          <StyledTabs value={tabValue} onChange={handleTabChange}>
            <Tab label={`PDF Resources (${pdfResources.length})`} />
            <Tab label={`Video Resources (${videoResources.length})`} />
          </StyledTabs>

          <Box sx={{ mt: 3 }}>
            {tabValue === 0 && (
              <ResourceTable 
                resources={pdfResources} 
                onResourceClick={handleResourceClick} 
              />
            )}
            {tabValue === 1 && (
              <ResourceTable 
                resources={videoResources} 
                onResourceClick={handleResourceClick} 
              />
            )}
          </Box>
        </>
      )}

      {selectedResource && (
        <ResourceDetails
          open={!!selectedResource}
          onClose={() => setSelectedResource(null)}
          resource={selectedResource}
          onSubscribe={handleSubscribe}
        />
      )}
    </Container>
  );
};
