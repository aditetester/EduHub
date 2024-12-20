// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { VideoViewer } from '../components/Resources/VideoViewer';
// import { api } from '../services/api';
// import { Loader } from '../components/common/Loader';
// import { ErrorMessage } from '../components/common/ErrorMessage';

// export const VideoViewerPage: React.FC = () => {
//   const { resourceId } = useParams<{ resourceId: string }>();
//   const [resource, setResource] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResource = async () => {
//       try {
//         if (!resourceId) return;
        
//         setLoading(true);
//         const response = await api.getResourceById(resourceId);
        
//         if (response.success) {
//           setResource(response.data);
//         } else {
//           setError('Failed to load video');
//         }
//       } catch (error) {
//         console.error('Error fetching video:', error);
//         setError('Failed to load video');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResource();
//   }, [resourceId]);

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage message={error} />;
//   if (!resource) return <ErrorMessage message="Video not found" />;

//   return (
//     <VideoViewer 
//       videoUrl={resource.videoUrl}
//       title={resource.name}
//     />
//   );
// }; 

export {};