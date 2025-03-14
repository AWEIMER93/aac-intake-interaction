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
    
    if (file.status === 'processing') {
      setTimeout(() => {
        simulateProcessing(file);
      }, 4000);
    }
  };
  
  const simulateProcessing = (file: UploadedFile) => {
    const languageScenarios = [
      { hasBilingual: true, language: "Spanish" },
      { hasBilingual: true, language: "French" },
      { hasBilingual: true, language: "Mandarin" },
      { hasBilingual: false, language: null }
    ];
    
    const selectedScenario = languageScenarios[Math.floor(Math.random() * languageScenarios.length)];
    const { hasBilingual, language } = selectedScenario;
    
    const languageNeed = hasBilingual && language ? `Bilingual needs (English & ${language})` : 'English language only';
    
    const formatBilingualPhrases = (phrases: string[], language: string | null) => {
      if (!hasBilingual || !language) {
        return phrases.map(phrase => `- "${phrase}"`);
      }
      
      const translations: Record<string, string[]> = {
        "Spanish": [
          "Tengo hambre",
          "Necesito ir al baño",
          "¡Ayúdame, por favor!",
          "Necesito un descanso",
          "Quiero beber agua",
          "Estoy cansado/a",
          "¡Hola! ¿Cómo estás?",
          "Me siento feliz",
          "¿Podemos ser amigos?",
          "¡Eso es gracioso!",
          "Me gusta hablar contigo",
          "Estoy entusiasmado/a por...",
          "¡Divirtámonos!",
          "¿Cuál es la respuesta?",
          "Necesito ayuda con mi tarea",
          "Leamos juntos",
          "¡Me gustan los experimentos de ciencia!",
          "¿Puedes explicarlo de nuevo?",
          "Tengo una pregunta",
          "Entiendo",
          "¿Qué sigue en mi horario?",
          "Es hora de hacer mis deberes",
          "Necesito cepillarme los dientes",
          "Salgamos afuera",
          "Quiero ver televisión",
          "Hora de mi medicina",
          "Estoy listo/a para ir",
          "Tengo dolor",
          "¡No puedo respirar!",
          "Llama a mi cuidador",
          "Me siento mareado/a",
          "Necesito mi medicina",
          "¡Algo está mal!",
          "¡Ayúdame ahora!"
        ],
        "French": [
          "J'ai faim",
          "J'ai besoin d'aller aux toilettes",
          "Aidez-moi, s'il vous plaît !",
          "J'ai besoin d'une pause",
          "Je veux boire de l'eau",
          "Je suis fatigué(e)",
          "Bonjour ! Comment ça va ?",
          "Je me sens heureux/heureuse",
          "Pouvons-nous être amis ?",
          "C'est drôle !",
          "J'aime parler avec toi",
          "Je suis excité(e) à propos de...",
          "Amusons-nous !",
          "Quelle est la réponse ?",
          "J'ai besoin d'aide avec mes devoirs",
          "Lisons ensemble",
          "J'aime les expériences scientifiques !",
          "Pouvez-vous expliquer encore ?",
          "J'ai une question",
          "Je comprends",
          "Qu'y a-t-il ensuite dans mon emploi du temps ?",
          "C'est l'heure de faire mes tâches",
          "Je dois me brosser les dents",
          "Allons dehors",
          "Je veux regarder la télévision",
          "C'est l'heure de mon médicament",
          "Je suis prêt(e) à partir",
          "J'ai mal",
          "Je ne peux pas respirer !",
          "Appelez mon soignant",
          "Je me sens étourdi(e)",
          "J'ai besoin de mon médicament",
          "Quelque chose ne va pas !",
          "Aidez-moi maintenant !"
        ],
        "Mandarin": [
          "我饿了 (Wǒ è le)",
          "我需要上厕所 (Wǒ xūyào shàng cèsuǒ)",
          "请帮助我！(Qǐng bāngzhù wǒ!)",
          "我需要休息 (Wǒ xūyào xiūxí)",
          "我想喝水 (Wǒ xiǎng hē shuǐ)",
          "我累了 (Wǒ lèi le)",
          "你好！你好吗？(Nǐ hǎo! Nǐ hǎo ma?)",
          "我感到开心 (Wǒ gǎndào kāixīn)",
          "我们可以做朋友吗？(Wǒmen kěyǐ zuò péngyǒu ma?)",
          "那很有趣！(Nà hěn yǒuqù!)",
          "我喜欢和你说话 (Wǒ xǐhuān hé nǐ shuōhuà)",
          "我对...很兴奋 (Wǒ duì... hěn xīngfèn)",
          "让我们一起玩吧！(Ràng wǒmen yīqǐ wán ba!)",
          "答案是什么？(Dá'àn shì shénme?)",
          "我需要作业帮助 (Wǒ xūyào zuòyè bāngzhù)",
          "让我们一起阅读 (Ràng wǒmen yīqǐ yuèdú)",
          "我喜欢科学实验！(Wǒ xǐhuān kēxué shíyàn!)",
          "你能再解释一遍吗？(Nǐ néng zài jiěshì yībiàn ma?)",
          "我有一个问题 (Wǒ yǒu yīgè wèntí)",
          "我明白了 (Wǒ míngbái le)",
          "我的日程表上接下来是什么？(Wǒ de rìchéngbiǎo shàng jiē xiàlái shì shénme?)",
          "该做家务了 (Gāi zuò jiāwù le)",
          "我需要刷牙 (Wǒ xūyào shuāyá)",
          "我们出去吧 (Wǒmen chūqù ba)",
          "我想看电视 (Wǒ xiǎng kàn diànshì)",
          "该吃药了 (Gāi chī yào le)",
          "我准备好了 (Wǒ zhǔnbèi hǎo le)",
          "我疼 (Wǒ téng)",
          "我不能呼吸！(Wǒ bùnéng hūxī!)",
          "给我的看护人打电话 (Gěi wǒ de kànhù rén dǎ diànhuà)",
          "我感到头晕 (Wǒ gǎndào tóuyūn)",
          "我需要我的药 (Wǒ xūyào wǒ de yào)",
          "有事不对劲！(Yǒu shì bù duìjìn!)",
          "立刻帮助我！(Lìkè bāngzhù wǒ!)"
        ]
      };
      
      const languageTranslations = translations[language] || [];
      
      return phrases.map((phrase, index) => {
        const translation = languageTranslations[index] || "";
        return `- "${phrase}" / "${translation}"`;
      });
    };
    
    const basicNeeds = [
      "I am hungry", 
      "I need to use the bathroom", 
      "Help me, please!", 
      "I need a break", 
      "I want to drink water", 
      "I'm tired"
    ];
    
    const socialCommunications = [
      "Hi! How are you?", 
      "I feel happy", 
      "Can we be friends?", 
      "That's funny!", 
      "I like talking to you", 
      "I'm excited about...", 
      "Let's have fun!"
    ];
    
    const academicSupport = [
      "What's the answer?", 
      "I need help with my homework", 
      "Let's read together", 
      "I like science experiments!", 
      "Can you explain that again?", 
      "I have a question", 
      "I understand"
    ];
    
    const dailyActivities = [
      "What's next on my schedule?", 
      "It's time to do my chores", 
      "I need to brush my teeth", 
      "Let's go outside", 
      "I want to watch TV", 
      "Time for my medicine", 
      "I'm ready to go"
    ];
    
    const emergencyCommunication = [
      "I am in pain", 
      "I can't breathe!", 
      "Call my caregiver", 
      "I feel dizzy", 
      "I need my medicine", 
      "Something is wrong!", 
      "Help me now!"
    ];
    
    const mockResult: ProcessedResult = {
      clientName: '[Patient], 14 years old',
      communicationNeeds: [
        'Limited verbal speech, requires tablet-based AAC',
        languageNeed,
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
          details: 'Suggested phrases:\n' + formatBilingualPhrases(basicNeeds, language).join('\n'),
          priority: 'high'
        },
        {
          category: 'Social Communications',
          details: 'Suggested phrases:\n' + formatBilingualPhrases(socialCommunications, language).join('\n'),
          priority: 'medium'
        },
        {
          category: 'Academic Support',
          details: 'Suggested phrases:\n' + formatBilingualPhrases(academicSupport, language).join('\n'),
          priority: 'medium'
        },
        {
          category: 'Daily Activities',
          details: 'Suggested phrases:\n' + formatBilingualPhrases(dailyActivities, language).join('\n'),
          priority: 'high'
        },
        {
          category: 'Emergency Communication',
          details: 'Suggested phrases:\n' + formatBilingualPhrases(emergencyCommunication, language).join('\n'),
          priority: 'high'
        },
        {
          category: 'Interface Modifications',
          details: (hasBilingual ? `Implement bilingual toggle feature (English & ${language}). ` : '') + 'Use large buttons (minimum 2cm×2cm) with 0.5cm spacing. Configure visual themes with high contrast colors. Set up a simplified navigation structure with color-coded categories.',
          priority: 'medium'
        },
        {
          category: 'Additional Features',
          details: 'Voice Preference: Youthful, gender-neutral tone\n' + 
                   (hasBilingual ? `Bilingual Support: Full English-${language} toggle capability\n` : '') + 
                   'Symbol & Text Balance: 80% symbols with 20% supporting text\n' +
                   'Smart Home Integration: Basic commands for lights, TV, and music\n' +
                   'Accessibility Feature: Adjustable touch sensitivity settings',
          priority: 'low'
        }
      ],
      additionalNotes: 'Patient shows high interest in technology and responds well to interactive features. Family has requested specific vocabulary related to sports (especially basketball) and video games. School integration should include academic vocabulary aligned with current curriculum. Consider implementing a customized keyboard layout that minimizes required movement range while maximizing commonly used phrases.',
      processedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    setCurrentFile({
      ...file,
      status: 'complete',
      progress: 100
    });
    
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
