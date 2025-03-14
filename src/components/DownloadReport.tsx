
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Check } from 'lucide-react';
import { ProcessedResult } from '@/lib/types';

interface DownloadReportProps {
  result: ProcessedResult;
  onBack: () => void;
}

const DownloadReport: React.FC<DownloadReportProps> = ({ result, onBack }) => {
  const handleDownload = () => {
    // In a real application, this would generate a PDF and download it
    // For now, we'll just create a text representation
    const reportContent = `
AAC CUSTOMIZATION RECOMMENDATION REPORT
Client: ${result.clientName}
Date: ${result.processedDate}

COMMUNICATION NEEDS:
${result.communicationNeeds.map(need => `- ${need}`).join('\n')}

MEDICAL HISTORY:
${result.medicalHistory}

RECOMMENDATIONS:
${result.recommendations.map(rec => 
  `[${rec.priority.toUpperCase()} PRIORITY] ${rec.category}
   ${rec.details}`
).join('\n\n')}

ADDITIONAL NOTES:
${result.additionalNotes}
    `;
    
    // Create a Blob from the text
    const blob = new Blob([reportContent], { type: 'text/plain' });
    
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `AAC_Recommendations_${result.clientName.replace(/\s+/g, '_')}.txt`;
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  
  return (
    <div className="subtle-card p-8 max-w-md mx-auto text-center appear-animate" style={{ animationDelay: '0.5s' }}>
      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <FileText className="h-8 w-8 text-primary" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">Report Ready</h2>
      <p className="text-muted-foreground mb-6">
        Your customized AAC recommendations for {result.clientName} are ready to download.
      </p>
      
      <div className="flex flex-col space-y-3">
        <Button 
          onClick={handleDownload}
          size="lg"
          className="w-full flex items-center justify-center gap-2 btn-hover"
        >
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onBack}
          className="w-full"
        >
          Back to Results
        </Button>
      </div>
      
      <div className="mt-6 text-xs text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          <Check className="h-3 w-3" />
          Secure and confidential processing
        </p>
      </div>
    </div>
  );
};

export default DownloadReport;
