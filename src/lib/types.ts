
export type FileStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: FileStatus;
  progress: number;
  url?: string;
  error?: string;
}

export interface ProcessedResult {
  clientName: string;
  communicationNeeds: string[];
  medicalHistory: string;
  recommendations: Recommendation[];
  additionalNotes: string;
  processedDate: string;
}

export interface Recommendation {
  category: string;
  details: string;
  priority: 'high' | 'medium' | 'low';
}
