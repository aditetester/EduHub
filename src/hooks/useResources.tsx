import { useState, useEffect } from 'react';
import { api, Resource } from '../services/api';

interface UseResourcesReturn {
  pdfResources: Resource[];
  videoResources: Resource[];
  totalPdf: number;
  totalVideo: number;
  subject: any | null;
  loading: boolean;
  error: string | null;
}

export default function useResources(subjectId: string | undefined): UseResourcesReturn {
  const [pdfResources, setPdfResources] = useState<Resource[]>([]);
  const [videoResources, setVideoResources] = useState<Resource[]>([]);
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      if (!subjectId) return;
      
      try {
        setLoading(true);
        const response = await api.getResourcesBySubject(subjectId);
        
        if (response.success) {
          setPdfResources(response.data.pdfResources);
          setVideoResources(response.data.videoResources);
        } else {
          setError('Failed to fetch resources');
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
        setError('Failed to fetch resources');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [subjectId]);

  return {
    pdfResources,
    videoResources,
    totalPdf: pdfResources.length,
    totalVideo: videoResources.length,
    subject,
    loading,
    error
  };
}