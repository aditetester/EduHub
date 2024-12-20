// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { PDFViewer } from '../components/Resources/PDFViewer';
// import { api } from '../services/api';
// import { Loader } from '../components/common/Loader';
// import { ErrorMessage } from '../components/common/ErrorMessage';
// import axios from 'axios';

// export const PDFViewerPage: React.FC = () => {
//   const { resourceId } = useParams<{ resourceId: string }>();
//   const [resource, setResource] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResource = async () => {
//       try {
//         if (!resourceId) return;
        
//         const response = await axios.get(`http://localhost:3000/api/resources/${resourceId}`);
//         console.log('Resource data:', response.data); // Debug log
        
//         if (response.data.success) {
//           const resourceData = response.data.data;
          
//           // Ensure we have the correct URL format
//           const pdfUrl = resourceData.fileUrl.startsWith('http') 
//             ? resourceData.fileUrl 
//             : `http://localhost:3000/uploads/pdf/${resourceData.fileUrl}`;
            
//           console.log('Constructed PDF URL:', pdfUrl); // Debug log
          
//           setResource({
//             ...resourceData,
//             fileUrl: pdfUrl
//           });
//         } else {
//           setError('Failed to load PDF');
//         }
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//         setError('Failed to load PDF');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResource();
//   }, [resourceId]);

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage message={error} />;
//   if (!resource) return <ErrorMessage message="PDF not found" />;

//   // Additional URL validation
//   if (!resource.fileUrl) {
//     return <ErrorMessage message="PDF URL is missing" />;
//   }

//   return (
//     <PDFViewer 
//       url={resource.fileUrl}
//       title={resource.name || 'PDF Document'}
//     />
//   );
// }; 

export {};