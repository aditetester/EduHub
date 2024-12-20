import { ReactNode } from 'react';

export interface Resource {
  _id: string;
  name: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  fileUrl: string;
  type: 'PDF' | 'VIDEO';
  subjectId: string;
  standardId: string;
  subject: string;
  standards: string[];
  isPremium: boolean;
  subjectPrice: number;
  standardPrice: number;
  isLocked?: boolean;
  size?: string;
  duration?: string;
}

export interface Subject {
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  standard: {
    grade: string;
  };
}

export interface Board {
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
  standardsCount?: number;
}

export type BoardType = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  standardsCount?: number;
  icon?: React.ReactNode;
};

export type SubscriptionType = 'SUBJECT' | 'STANDARD';