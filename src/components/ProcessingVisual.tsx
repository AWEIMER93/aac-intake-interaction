
import React, { useEffect, useRef, useState } from 'react';
import { UploadedFile } from '@/lib/types';

interface ProcessingVisualProps {
  file: UploadedFile;
}

const ProcessingVisual: React.FC<ProcessingVisualProps> = ({ file }) => {
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (file.status === 'processing') {
      let currentProgress = 0;
      
      timeoutRef.current = setInterval(() => {
        currentProgress += Math.random() * 2;
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          if (timeoutRef.current) clearInterval(timeoutRef.current);
        }
        
        setProgress(currentProgress);
      }, 300);
    }
    
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [file.status]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const getFileIcon = () => {
    if (file.type.includes('pdf')) {
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5 2H8.5C7.4 2 6.5 2.9 6.5 4V28C6.5 29.1 7.4 30 8.5 30H24.5C25.6 30 26.5 29.1 26.5 28V9L19.5 2Z" fill="#F44336"/>
          <path d="M19.5 2V9H26.5L19.5 2Z" fill="#FF8A80"/>
          <path d="M12.5 23.5C12.5 22.95 12.95 22.5 13.5 22.5H19.5C20.05 22.5 20.5 22.95 20.5 23.5C20.5 24.05 20.05 24.5 19.5 24.5H13.5C12.95 24.5 12.5 24.05 12.5 23.5ZM13.5 20.5H19.5C20.05 20.5 20.5 20.05 20.5 19.5C20.5 18.95 20.05 18.5 19.5 18.5H13.5C12.95 18.5 12.5 18.95 12.5 19.5C12.5 20.05 12.95 20.5 13.5 20.5ZM13.5 16.5H19.5C20.05 16.5 20.5 16.05 20.5 15.5C20.5 14.95 20.05 14.5 19.5 14.5H13.5C12.95 14.5 12.5 14.95 12.5 15.5C12.5 16.05 12.95 16.5 13.5 16.5Z" fill="white"/>
        </svg>
      );
    } else {
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5 2H8.5C7.4 2 6.5 2.9 6.5 4V28C6.5 29.1 7.4 30 8.5 30H24.5C25.6 30 26.5 29.1 26.5 28V9L19.5 2Z" fill="#2196F3"/>
          <path d="M19.5 2V9H26.5L19.5 2Z" fill="#90CAF9"/>
          <path d="M12.5 23.5C12.5 22.95 12.95 22.5 13.5 22.5H19.5C20.05 22.5 20.5 22.95 20.5 23.5C20.5 24.05 20.05 24.5 19.5 24.5H13.5C12.95 24.5 12.5 24.05 12.5 23.5ZM13.5 20.5H19.5C20.05 20.5 20.5 20.05 20.5 19.5C20.5 18.95 20.05 18.5 19.5 18.5H13.5C12.95 18.5 12.5 18.95 12.5 19.5C12.5 20.05 12.95 20.5 13.5 20.5ZM13.5 16.5H19.5C20.05 16.5 20.5 16.05 20.5 15.5C20.5 14.95 20.05 14.5 19.5 14.5H13.5C12.95 14.5 12.5 14.95 12.5 15.5C12.5 16.05 12.95 16.5 13.5 16.5Z" fill="white"/>
        </svg>
      );
    }
  };

  return (
    <div className="subtle-card p-6 max-w-lg mx-auto appear-animate" style={{ animationDelay: '0.3s' }}>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeOpacity="0.1"
              className="text-primary"
            />
            <circle
              className="progress-ring"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="text-primary"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {getFileIcon()}
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-1">{file.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {file.status === 'processing' ? 'Processing with AI...' : 'Uploading...'}
        </p>
        
        <div className="flex items-center gap-1 mb-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary processing-dot"
              style={{ '--dot-index': i } as React.CSSProperties}
            />
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {file.status === 'processing'
            ? "Analyzing document contents and generating recommendations..."
            : "Uploading file to secure server..."
          }
        </div>
      </div>
    </div>
  );
};

export default ProcessingVisual;
