
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UploadedFile, ProcessedResult } from '@/lib/types';
import FileUpload from '@/components/FileUpload';
import ProcessingVisual from '@/components/ProcessingVisual';
import ResultsDisplay from '@/components/ResultsDisplay';
import DownloadReport from '@/components/DownloadReport';
import Header from '@/components/Header';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFile, setCurrentFile] = useState<UploadedFile | null>(null);
  const [processedResult, setProcessedResult] = useState<ProcessedResult | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  
  // Check system preference for dark mode
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    
    if (prefersDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  const handleFileUploaded = (file: UploadedFile) => {
    setCurrentFile(file);
    
    // If the file status changes to processing, simulate AI processing after a delay
    if (file.status === 'processing') {
      setTimeout(() => {
        // Simulate AI processing completion
        simulateProcessing(file);
      }, 4000); // Simulate 4 seconds of processing
    }
  };
  
  const simulateProcessing = (file: UploadedFile) => {
    // Mock data for demonstration
    const mockResult: ProcessedResult = {
      clientName: 'Alex Morgan',
      communicationNeeds: [
        'Non-verbal communication with limited motor control',
        'Uses eye gaze and head movements as primary control methods',
        'Requires symbol-based AAC with text-to-speech capability',
        'Vocabulary needs focus on medical, daily activities, and academic concepts'
      ],
      medicalHistory: 'Client has cerebral palsy affecting all limbs with choreoathetoid movements. Cognitive abilities are age-appropriate. Vision and hearing are within normal limits. Previous experience with eye-tracking devices has been positive.',
      recommendations: [
        {
          category: 'Access Method',
          details: 'Recommend eye tracking technology with head tracking as backup. Configure dwelling times between 800-1200ms based on client testing. Calibration should be performed in different lighting conditions.',
          priority: 'high'
        },
        {
          category: 'Vocabulary Organization',
          details: 'Implement core vocabulary with fringe vocabulary categorized by context (school, home, medical). Use Visual Scene Displays for narrative contexts. Include specific medical terminology related to client\'s treatment.',
          priority: 'medium'
        },
        {
          category: 'Symbol System',
          details: 'PCS symbols preferred, with high-contrast option enabled. Symbol size should be minimum 2cm x 2cm with spacing of 0.5cm. Test SymbolStix as alternative if needed.',
          priority: 'medium'
        },
        {
          category: 'Output Options',
          details: 'Configure text-to-speech with age and gender appropriate voice. Include option for different voice outputs based on urgency of message. Enable message banking for frequently used phrases.',
          priority: 'high'
        },
        {
          category: 'Mounting & Positioning',
          details: 'Wheelchair mount with adjustable arm to accommodate various positions throughout the day. Consider alternate mounting for bed use. Ensure positioning does not interfere with eye gaze camera.',
          priority: 'low'
        }
      ],
      additionalNotes: 'Family has expressed strong interest in an integrated system that can control environmental elements (TV, lights) in addition to communication functions. School environment requires compatibility with Smartboard technology. Follow-up training sessions will be needed for family, school staff, and therapy team.',
      processedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    setCurrentFile({
      ...file,
      status: 'complete',
      progress: 100
    });
    
    // Simulate a slight delay before showing results
    setTimeout(() => {
      setProcessedResult(mockResult);
      toast({
        title: "Processing Complete",
        description: "AI analysis and recommendations are ready to view",
      });
    }, 800);
  };
  
  const handleDownload = () => {
    setIsDownloading(true);
  };
  
  const handleBackToResults = () => {
    setIsDownloading(false);
  };
  
  const resetProcess = () => {
    setCurrentFile(null);
    setProcessedResult(null);
    setIsDownloading(false);
  };
  
  const renderContent = () => {
    if (isDownloading && processedResult) {
      return <DownloadReport result={processedResult} onBack={handleBackToResults} />;
    }
    
    if (processedResult) {
      return <ResultsDisplay result={processedResult} onDownload={handleDownload} />;
    }
    
    if (currentFile) {
      return <ProcessingVisual file={currentFile} />;
    }
    
    return <FileUpload onFileUploaded={handleFileUploaded} />;
  };
  
  return (
    <main className="min-h-screen bg-background antialiased relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 max-w-5xl">
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        
        <div className="w-full max-w-3xl mx-auto mt-8 mb-16 text-center appear-animate">
          <h1 className="text-4xl font-semibold tracking-tight mb-3 font-display">
            SLP Intake Form Processing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your client's SLP intake form to generate customized AAC recommendations with AI assistance
          </p>
        </div>
        
        <div className="relative z-10 w-full mb-20">
          {renderContent()}
          
          {processedResult && !isDownloading && (
            <div className="text-center mt-8 appear-animate" style={{ animationDelay: '0.5s' }}>
              <button
                onClick={resetProcess}
                className="text-sm text-primary/80 hover:text-primary underline transition-colors"
              >
                Process another file
              </button>
            </div>
          )}
        </div>
        
        <footer className="w-full border-t border-border py-6 text-center">
          <p className="text-sm text-muted-foreground">
            AAC Customization Specialists &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
