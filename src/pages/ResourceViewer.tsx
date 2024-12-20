import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Container, Typography, Paper } from '@mui/material';
import { Resource } from '../components/Resources/types';

export const ResourceViewer: React.FC = () => {
  const location = useLocation();
  const { resourceId } = useParams();
  const resource = location.state?.resource as Resource;

  if (!resource) {
    return <div>Resource not found</div>;
  }

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          {resource.name}
        </Typography>
        
        {resource.type === 'PDF' ? (
          <Box sx={{ height: '80vh', width: '100%' }}>
            <iframe
              src={resource.fileUrl}
              width="100%"
              height="100%"
              title={resource.name}
            />
          </Box>
        ) : (
          <Box sx={{ width: '100%' }}>
            <video
              controls
              style={{ maxHeight: '80vh' }}
            >
              <source src={resource.videoUrl || resource.fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        )}

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Details</Typography>
          <Typography>{resource.description}</Typography>
          <Typography>
            {resource.type === 'PDF' 
              ? `Size: ${resource.size}` 
              : `Duration: ${resource.duration}`
            }
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}; 