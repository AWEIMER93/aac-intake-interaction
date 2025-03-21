
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Check, AlertTriangle, Info, User, MessageCircle, Book, Calendar, Utensils, Bath, HelpCircle, Droplet, Bed, Smile, Users, HandMetal, Calculator, Lightbulb, Tv, Gamepad, Music, Phone, AlertOctagon } from 'lucide-react';
import { ProcessedResult } from '@/lib/types';

interface DownloadReportProps {
  result: ProcessedResult;
  onBack: () => void;
}

const DownloadReport: React.FC<DownloadReportProps> = ({ result, onBack }) => {
  // Detect bilingual needs and specific language from communication needs
  const detectLanguageNeeds = () => {
    const communicationNeeds = result.communicationNeeds.map(need => need.toLowerCase());
    
    // Check if bilingual support is explicitly mentioned
    const needsBilingual = communicationNeeds.some(need => 
      need.includes('bilingual') || 
      need.includes('dual language')
    );
    
    // Detect specific languages mentioned
    const languages = {
      spanish: communicationNeeds.some(need => need.includes('spanish')),
      french: communicationNeeds.some(need => need.includes('french')),
      mandarin: communicationNeeds.some(need => need.includes('mandarin') || need.includes('chinese')),
      vietnamese: communicationNeeds.some(need => need.includes('vietnamese')),
      arabic: communicationNeeds.some(need => need.includes('arabic')),
      asl: communicationNeeds.some(need => need.includes('asl') || need.includes('american sign language')),
    };
    
    return {
      needsBilingual,
      languages
    };
  };
  
  const { needsBilingual, languages } = detectLanguageNeeds();
  
  // Helper to get the language name for the report
  const getSecondaryLanguage = () => {
    if (languages.spanish) return "Spanish";
    if (languages.french) return "French";
    if (languages.mandarin) return "Mandarin";
    if (languages.vietnamese) return "Vietnamese";
    if (languages.arabic) return "Arabic";
    if (languages.asl) return "ASL";
    return ""; // Default to empty if no specific language is detected
  };
  
  // Extract first name only for HIPAA compliance
  const getRedactedName = (fullName: string) => {
    // Get just the first name
    const firstName = fullName.split(',')[0].trim().split(' ')[0];
    // Return "[Patient]" with optional age if available
    const ageMatch = fullName.match(/(\d+)\s*years?\s*old/i);
    return ageMatch ? `[Patient], ${ageMatch[1]} years old` : '[Patient]';
  };
  
  const redactedName = getRedactedName(result.clientName);
  
  const handleDownload = () => {
    // Get the detected secondary language
    const secondaryLanguage = getSecondaryLanguage();
    
    // Create a formatted report text based on the Gemini AI prompt structure
    const reportContent = `
AAC CUSTOMIZATION RECOMMENDATIONS - GENERATED REPORT
Client: ${redactedName}
Date: ${result.processedDate}

COMMUNICATION NEEDS:
${result.communicationNeeds.map(need => `- ${need}`).join('\n')}

MEDICAL HISTORY:
${result.medicalHistory}

CUSTOMIZATION RECOMMENDATIONS:

${result.recommendations.map(rec => {
  // Format the phrase recommendations based on whether bilingual support is needed
  if (rec.category === 'Basic Needs' || 
      rec.category === 'Social Communications' || 
      rec.category === 'Academic Support' || 
      rec.category === 'Daily Activities' || 
      rec.category === 'Emergency Communication') {
    
    // Extract and format phrases (with or without translations)
    const phrases = rec.details.split('\n').filter(line => line.trim().startsWith('-'));
    const formattedPhrases = phrases.map(phrase => {
      if (needsBilingual) {
        return phrase; // Keep as is (with translations)
      } else {
        // Remove translations if not needed
        return phrase.split('/')[0].trim();
      }
    }).join('\n');
    
    // Reconstruct details with appropriate phrases
    const updatedDetails = `${rec.details.split('\n')[0]}\n${formattedPhrases}`;
    
    return `[${rec.priority.toUpperCase()} PRIORITY] ${rec.category}\n${updatedDetails}\n`;
  } else {
    return `[${rec.priority.toUpperCase()} PRIORITY] ${rec.category}\n${rec.details}\n`;
  }
}).join('\n')}

ADDITIONAL NOTES:
${result.additionalNotes}

SUGGESTED ICONS FOR IMPLEMENTATION:
- Basic Needs: Utensils (Food), Bath (Bathroom), HelpCircle (Help), Droplet (Water), Bed (Rest)
- Social: Smile (Feelings), Users (Friends), MessageCircle (Chat), HandMetal (Greetings)
- Academics: Book (Reading), Calculator (Math), Lightbulb (Ideas/Understanding)
- Daily Activities: Calendar (Schedule), Tv (Watch TV), Gamepad (Play), Music (Listen)
- Emergency: AlertTriangle (Warning), Phone (Call Help), AlertOctagon (Emergency)

${needsBilingual && secondaryLanguage ? `LANGUAGE SUPPORT: English & ${secondaryLanguage}` : ''}

---
Generated by AAC Customization Specialists AI
    `;
    
    // Create a Blob from the text
    const blob = new Blob([reportContent], { type: 'text/plain' });
    
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `AAC_Recommendations_${redactedName.replace(/[\[\],\s]+/g, '_')}.txt`;
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  
  // Get the secondary language name for display
  const secondaryLanguage = getSecondaryLanguage();
  
  return (
    <div className="subtle-card p-8 max-w-md mx-auto text-center appear-animate" style={{ animationDelay: '0.5s' }}>
      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <FileText className="h-8 w-8 text-primary" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">Report Ready</h2>
      <p className="text-muted-foreground mb-6">
        Your customized AAC recommendations for {redactedName.split(',')[0]} are ready to download.
      </p>
      
      {needsBilingual && secondaryLanguage && (
        <div className="bg-muted p-3 rounded-lg mb-6 flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <p className="text-sm">
            Bilingual support (English & {secondaryLanguage}) included in recommendations
          </p>
        </div>
      )}
      
      <div className="flex flex-col space-y-3">
        <Button 
          onClick={handleDownload}
          size="lg"
          className="w-full flex items-center justify-center gap-2 btn-hover"
        >
          <Download className="h-4 w-4" />
          Download Recommendations
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onBack}
          className="w-full"
        >
          Back to Results
        </Button>
      </div>
      
      <div className="mt-6 mb-3 text-xs text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          <Check className="h-3 w-3" />
          HIPAA compliant processing
        </p>
      </div>
      
      <div className="p-4 border border-border rounded-lg bg-muted/30">
        <h3 className="text-sm font-medium mb-2">Icon Suggestions</h3>
        <div className="grid grid-cols-5 gap-2">
          <IconSuggestion icon={<Utensils className="h-5 w-5" />} label="Food" />
          <IconSuggestion icon={<Bath className="h-5 w-5" />} label="Bathroom" />
          <IconSuggestion icon={<Smile className="h-5 w-5" />} label="Feelings" />
          <IconSuggestion icon={<Book className="h-5 w-5" />} label="Reading" />
          <IconSuggestion icon={<AlertTriangle className="h-5 w-5" />} label="Alert" />
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying icon suggestions
const IconSuggestion: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 bg-background rounded-full">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

export default DownloadReport;
