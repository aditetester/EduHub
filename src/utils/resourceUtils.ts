export const getResourceUrl = (resource: any) => {
  if (!resource?.fileUrl) return null;

  // For PDF files
  if (resource.type === 'PDF') {
    return `http://localhost:3000/uploads/pdf/${resource.fileUrl}`;
  }

  // For video resources
  if (resource.type === 'VIDEO') {
    return resource.videoUrl;
  }

  return resource.fileUrl;
}; 