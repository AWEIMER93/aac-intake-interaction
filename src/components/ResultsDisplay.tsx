
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcessedResult, Recommendation } from '@/lib/types';
import { Check, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ResultsDisplayProps {
  result: ProcessedResult;
  onDownload: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onDownload }) => {
  return (
    <div className="subtle-card p-6 max-w-3xl mx-auto appear-animate" style={{ animationDelay: '0.4s' }}>
      <div className="flex flex-col space-y-6">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{result.clientName}</h2>
              <p className="text-sm text-muted-foreground">
                Processed on {result.processedDate}
              </p>
            </div>
            <Button onClick={onDownload} className="btn-hover">
              Download Report
            </Button>
          </div>
          <Separator className="my-4" />
        </div>
        
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="needs">Communication Needs</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="notes">Additional Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-4">
            {result.recommendations.map((rec, index) => (
              <RecommendationCard key={index} recommendation={rec} />
            ))}
          </TabsContent>
          
          <TabsContent value="needs">
            <div className="glass-panel rounded-lg p-4 text-sm">
              <ul className="list-disc pl-5 space-y-2">
                {result.communicationNeeds.map((need, index) => (
                  <li key={index}>{need}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="medical">
            <div className="glass-panel rounded-lg p-4">
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {result.medicalHistory}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="notes">
            <div className="glass-panel rounded-lg p-4">
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {result.additionalNotes}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const RecommendationCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-500/10';
      case 'medium':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-500/10';
      case 'low':
        return 'text-green-500 bg-green-50 dark:bg-green-500/10';
      default:
        return 'text-blue-500 bg-blue-50 dark:bg-blue-500/10';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Info className="h-4 w-4" />;
      case 'low':
        return <Check className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="glass-panel rounded-lg p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${getPriorityColor(recommendation.priority)}`}>
              {getPriorityIcon(recommendation.priority)}
              {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
            </span>
            <h4 className="text-sm font-medium">{recommendation.category}</h4>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{recommendation.details}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
