// src/components/Resources/ResourceCard.tsx
// @ts-nocheck
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { ResourceDetails } from './ResourceDetails'; // Import ResourceDetails
import { api, Resource } from '../../services/api';
import { SubscriptionType } from '../../types';

interface ResourceCardProps {
  resource: Resource;
  onClick?: (resource: Resource) => void;
  isLocked?: boolean;
}

const getThumbnailUrl = (thumbnailUrl: string) => {
  if (!thumbnailUrl) return '';
  
  // Remove any leading slash
  const cleanPath = thumbnailUrl.startsWith('/') ? thumbnailUrl.slice(1) : thumbnailUrl;
  return cleanPath;
};

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick, isLocked }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    if (!onClick) return;
    
    if (isLocked) {
      setShowDetails(true);
    } else {
      onClick(resource);
    }
  };

  if (isLocked) {
    return (
      <>
        <Card sx={{ maxWidth: 345, m: 2 }}>
          <Box sx={{ 
            height: 140, 
            bgcolor: 'rgba(0, 0, 0, 0.08)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <LockIcon sx={{ fontSize: 40, color: 'grey.500' }} />
          </Box>
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              {resource.name}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={handleClick}
            >
              Unlock with Subscription
            </Button>
          </CardContent>
        </Card>

        {/* Resource Details Dialog */}
        <ResourceDetails
          open={showDetails}
          onClose={() => setShowDetails(false)}
          resource={resource}
          onSubscribe={async (type: SubscriptionType) => {
            try {
              const response = await api.createCheckoutSession({
                subjectId: resource.subjectId,
                resourceId: resource._id,
                type: type
              });
              if (response.url) {
                window.location.href = response.url;
              }
            } catch (error) {
              console.error('Error creating checkout session:', error);
            }
          }}
        />
      </>
    );
  }

  return (
    <Card sx={{ maxWidth: 345, m: 2 }} onClick={() => onClick(resource)}>
      <CardMedia
        component="img"
        height="140"
          src={getThumbnailUrl(resource.thumbnailUrl || '')} 
        alt={resource.name}
      />
      <CardContent>
        <Typography variant="h6">{resource.name}</Typography>
        {resource.description && (
          <Typography variant="body2" color="textSecondary">
            {resource.description}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary">
          {resource.type === 'PDF' ? `Size: ${resource.size}` : `Duration: ${resource.duration}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
