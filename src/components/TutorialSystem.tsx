
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, RotateCcw } from 'lucide-react';
import { SimulationState } from './QuantumVacuumSimulation';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  action: string;
  targetState?: Partial<SimulationState>;
  highlight: string[];
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: 'Welcome to Quantum Vacuum Manipulation',
    description: 'This simulation lets you explore the fascinating world of quantum vacuum effects using cavity optomechanics.',
    action: 'Click Next to begin your journey',
    highlight: []
  },
  {
    id: 2,
    title: 'Mirror Configuration',
    description: 'Adjust the mirror angle and spacing to create optical cavities. The spacing determines resonance conditions.',
    action: 'Try adjusting the Mirror Spacing to 100nm',
    targetState: { mirrorSpacing: 100 },
    highlight: ['mirror-spacing']
  },
  {
    id: 3,
    title: 'Mirror Angle Effects',
    description: 'The mirror angle affects how light bounces within the cavity. 45° often provides optimal conditions.',
    action: 'Set the Mirror Angle to 45°',
    targetState: { mirrorAngle: 45 },
    highlight: ['mirror-angle']
  },
  {
    id: 4,
    title: 'Magnetic Field Control',
    description: 'Apply magnetic fields to influence quantum states. Higher fields can induce topological phases.',
    action: 'Increase the Magnetic Field to 0.7T',
    targetState: { magneticField: 0.7 },
    highlight: ['magnetic-field']
  },
  {
    id: 5,
    title: 'Field Direction',
    description: 'The direction of the magnetic field affects chirality - the handedness of quantum states.',
    action: 'Adjust Field Direction to 45°',
    targetState: { fieldDirection: 45 },
    highlight: ['field-direction']
  },
  {
    id: 6,
    title: 'Material Insertion',
    description: 'Insert materials like graphene to enhance quantum effects. Different materials have unique properties.',
    action: 'Select Graphene as the inserted material',
    targetState: { insertedMaterial: 'graphene' },
    highlight: ['material-selector']
  },
  {
    id: 7,
    title: 'Start the Simulation',
    description: 'Now start the simulation to see quantum field dynamics in real-time!',
    action: 'Click the Start Simulation button',
    highlight: ['start-button']
  },
  {
    id: 8,
    title: 'Observe the Results',
    description: 'Watch the energy, coherence, and topological phase indicators. Try to achieve a topological phase transition!',
    action: 'Experiment with different parameters',
    highlight: ['energy', 'coherence', 'topological-phase']
  }
];

interface TutorialSystemProps {
  onStateChange: (state: Partial<SimulationState>) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const TutorialSystem: React.FC<TutorialSystemProps> = ({ 
  onStateChange, 
  isVisible, 
  onClose 
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isVisible) return null;

  const step = tutorialSteps[currentStep];

  const handleNext = () => {
    if (step.targetState) {
      onStateChange(step.targetState);
    }
    
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const handleRestart = () => {
    setCurrentStep(0);
    onStateChange({
      mirrorAngle: 45,
      mirrorSpacing: 100,
      magneticField: 0.5,
      fieldDirection: 0,
      insertedMaterial: 'none'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-6 bg-gray-900 border-purple-500/50">
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-purple-800/50 text-purple-200">
            Step {currentStep + 1} of {tutorialSteps.length}
          </Badge>
          <Button onClick={handleSkip} variant="ghost" size="sm">
            Skip Tutorial
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
          <p className="text-gray-300">{step.description}</p>
          
          <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3">
            <p className="text-blue-200 font-medium">Action Required:</p>
            <p className="text-blue-100 text-sm">{step.action}</p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-2">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                size="sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              <Button
                onClick={handleRestart}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Restart
              </Button>
            </div>

            <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
              {currentStep === tutorialSteps.length - 1 ? (
                <>Complete</>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
