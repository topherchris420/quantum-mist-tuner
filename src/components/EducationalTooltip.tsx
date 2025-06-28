
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface EducationalTooltipProps {
  title: string;
  content: string;
  className?: string;
}

export const EducationalTooltip: React.FC<EducationalTooltipProps> = ({ 
  title, 
  content, 
  className = '' 
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className={`w-4 h-4 text-blue-400 hover:text-blue-300 cursor-help ${className}`} />
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs p-3 bg-gray-900 border-gray-700">
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-200">{title}</h4>
            <p className="text-sm text-gray-300">{content}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
