
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
    // Mock data using the Gemini AI prompt format
    const mockResult: ProcessedResult = {
      clientName: 'Jordan Smith, 14 years old',
      communicationNeeds: [
        'Limited verbal speech, requires tablet-based AAC',
        'Bilingual needs (English & Spanish)',
        'Prefers visual symbols with minimal text',
        'Color-coding helps with navigation',
        'Requires large button support due to motor control limitations'
      ],
      medicalHistory: 'Patient has cerebral palsy affecting fine motor control, particularly in the upper extremities. Cognitive abilities are age-appropriate. Auditory processing is intact, with normal hearing. Visual acuity is normal with corrective lenses.',
      recommendations: [
        {
          category: 'Picture & Symbol Themes',
          details: 'Friendly, youthful icons with neutral designs. Color-coded categories for intuitive navigation. Large buttons incorporating PCS (Picture Communication Symbols). High contrast visuals for improved visibility.',
          priority: 'high'
        },
        {
          category: 'Basic Needs',
          details: 'Suggested phrases:\n- "I am hungry." / "Tengo hambre."\n- "I need to use the bathroom." / "Necesito ir al baño."\n- "Help me, please!" / "¡Ayúdame, por favor!"\n- "I need a break." / "Necesito un descanso."\n- "I want to drink water." / "Quiero beber agua."\n- "I\'m tired." / "Estoy cansado/a."',
          priority: 'high'
        },
        {
          category: 'Social Communications',
          details: 'Suggested phrases:\n- "Hi! How are you?" / "¡Hola! ¿Cómo estás?"\n- "I feel happy." / "Me siento feliz."\n- "Can we be friends?" / "¿Podemos ser amigos?"\n- "That\'s funny!" / "¡Eso es gracioso!"\n- "I like talking to you." / "Me gusta hablar contigo."\n- "I\'m excited about..." / "Estoy entusiasmado/a por..."\n- "Let\'s have fun!" / "¡Divirtámonos!"',
          priority: 'medium'
        },
        {
          category: 'Academic Support',
          details: 'Suggested phrases:\n- "What\'s the answer?" / "¿Cuál es la respuesta?"\n- "I need help with my homework." / "Necesito ayuda con mi tarea."\n- "Let\'s read together." / "Leamos juntos."\n- "I like science experiments!" / "¡Me gustan los experimentos de ciencia!"\n- "Can you explain that again?" / "¿Puedes explicarlo de nuevo?"\n- "I have a question." / "Tengo una pregunta."\n- "I understand." / "Entiendo."',
          priority: 'medium'
        },
        {
          category: 'Daily Activities',
          details: 'Suggested phrases:\n- "What\'s next on my schedule?" / "¿Qué sigue en mi horario?"\n- "It\'s time to do my chores." / "Es hora de hacer mis deberes."\n- "I need to brush my teeth." / "Necesito cepillarme los dientes."\n- "Let\'s go outside." / "Salgamos afuera."\n- "I want to watch TV." / "Quiero ver televisión."\n- "Time for my medicine." / "Hora de mi medicina."\n- "I\'m ready to go." / "Estoy listo/a para ir."',
          priority: 'high'
        },
        {
          category: 'Emergency Communication',
          details: 'Suggested phrases:\n- "I am in pain." / "Tengo dolor."\n- "I can\'t breathe!" / "¡No puedo respirar!"\n- "Call my caregiver." / "Llama a mi cuidador."\n- "I feel dizzy." / "Me siento mareado/a."\n- "I need my medicine." / "Necesito mi medicina."\n- "Something is wrong!" / "¡Algo está mal!"\n- "Help me now!" / "¡Ayúdame ahora!"',
          priority: 'high'
        },
        {
          category: 'Interface Modifications',
          details: 'Implement bilingual toggle feature (English/Spanish). Use large buttons (minimum 2cm×2cm) with 0.5cm spacing. Configure visual themes with high contrast colors. Set up a simplified navigation structure with color-coded categories.',
          priority: 'medium'
        },
        {
          category: 'Additional Features',
          details: 'Voice Preference: Youthful, gender-neutral tone\nBilingual Support: Full English-Spanish toggle capability\nSymbol & Text Balance: 80% symbols with 20% supporting text\nSmart Home Integration: Basic commands for lights, TV, and music\nAccessibility Feature: Adjustable touch sensitivity settings',
          priority: 'low'
        }
      ],
      additionalNotes: 'Jordan shows high interest in technology and responds well to interactive features. Family has requested specific vocabulary related to sports (especially basketball) and video games. School integration should include academic vocabulary aligned with 8th-grade curriculum. Consider implementing a customized keyboard layout that minimizes required movement range while maximizing commonly used phrases.',
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
        description: "AI analysis and AAC recommendations are ready to view",
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
