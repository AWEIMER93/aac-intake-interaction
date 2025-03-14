
import React, { useState, useRef } from 'react';
import { FileUp, X, File, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadedFile } from '@/lib/types';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileUploaded: (file: UploadedFile) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const file = files[0];
    const fileType = file.type;
    
    // Check for allowed file types
    if (!fileType.includes('pdf') && !fileType.includes('word') && !fileType.includes('officedocument')) {
      toast.error('Please upload PDF or DOCX files only');
      return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }
    
    const newFile: UploadedFile = {
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      size: file.size,
      status: 'uploading',
      progress: 0,
    };
    
    onFileUploaded(newFile);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        
        // Simulate successful upload after 100% progress
        setTimeout(() => {
          const updatedFile = {
            ...newFile,
            status: 'processing' as const,
            progress: 100,
          };
          onFileUploaded(updatedFile);
        }, 500);
      } else {
        const updatedFile = {
          ...newFile,
          progress,
        };
        onFileUploaded(updatedFile);
      }
    }, 200);
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const truncateFileName = (fileName: string, maxLength = 20) => {
    if (fileName.length <= maxLength) return fileName;
    
    const extension = fileName.split('.').pop() || '';
    const name = fileName.substring(0, fileName.length - extension.length - 1);
    
    if (name.length <= maxLength - 3 - extension.length) return fileName;
    
    return `${name.substring(0, maxLength - 3 - extension.length)}...${extension}`;
  };
  
  return (
    <div className="w-full sm:max-w-lg mx-auto appear-animate" style={{ animationDelay: '0.2s' }}>
      <div
        className={`upload-area rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${
          isDragging ? 'drag-active scale-105' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.docx,.doc"
        />
        
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <FileUp className="text-primary h-7 w-7" />
        </div>
        
        <h3 className="text-lg font-medium mb-2">Upload SLP Intake Form</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Drag and drop your PDF or DOCX file here
        </p>
        
        <Button 
          variant="outline" 
          className="relative overflow-hidden group animated-border"
        >
          <span className="relative z-10">Browse Files</span>
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4">
          Maximum file size: 5MB
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
