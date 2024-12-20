export interface Resource {
  _id: string;
  name: string;
  type: 'PDF' | 'VIDEO';
  videoUrl?: string;
  title: string;
  subject: string;
  standardId: string;
  standards: string[];
 
  fileUrl?: string;
  url?: string;
  isPremium: boolean;
  isLocked: boolean;
  size: number;
  duration: number | string;
  subjectId: string;
  description?: string;
  thumbnailUrl?: string;
  subjectPrice?: number;
  standardPrice?: number;
}


export type SubscriptionType = 'monthly' | 'yearly';