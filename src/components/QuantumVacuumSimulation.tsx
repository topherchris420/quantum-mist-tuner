
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuantumField } from './QuantumField';
import { EnhancedControlPanel } from './EnhancedControlPanel';
import { MaterialSelector } from './MaterialSelector';
import { PhaseIndicator } from './PhaseIndicator';
import { PresetManager } from './PresetManager';
import { AchievementSystem } from './AchievementSystem';
import { DataExport } from './DataExport';
import { TutorialSystem } from './TutorialSystem';
import { toast } from 'sonner';
import { HelpCircle, Play, Square, RotateCcw } from 'lucide-react';

export interface SimulationState {
  mirrorAngle: number;
  mirrorSpacing: number;
  magneticField: number;
  fieldDirection: number;
  chirality: number;
  insertedMaterial: string;
  energy: number;
  coherence: number;
  topologicalPhase: boolean;
}

export const QuantumVacuumSimulation = () => {
  const [state, setState] = useState<SimulationState>({
    mirrorAngle: 45,
    mirrorSpacing: 100,
    magneticField: 0.5,
    fieldDirection: 0,
    chirality: 0,
    insertedMaterial: 'none',
    energy: 0,
    coherence: 0,
    topologicalPhase: false,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [unlockedMaterials, setUnlockedMaterials] = useState(['graphene']);
  const [showTutorial, setShowTutorial] = useState(false);
  const [sessionData] = useState({
    startTime: new Date(),
    experimentsRun: 0,
    maxEnergy: 0,
    maxCoherence: 0
  });
  
  const animationRef = useRef<number>();

  // Calculate derived properties based on current state
  useEffect(() => {
    const calculateProperties = () => {
      const { mirrorAngle, mirrorSpacing, magneticField, insertedMaterial } = state;
      
      // Calculate energy based on cavity configuration
      const resonanceCondition = Math.abs(mirrorSpacing - 100) < 10;
      const optimalAngle = Math.abs(mirrorAngle - 45) < 5;
      
      let energy = magneticField * 100;
      if (resonanceCondition) energy *= 1.5;
      if (optimalAngle) energy *= 1.3;
      
      // Calculate coherence
      let coherence = Math.min(100, energy * 0.8);
      
      // Check for topological phase transition
      const topologicalPhase = 
        insertedMaterial === 'graphene' && 
        magneticField > 0.7 && 
        coherence > 60;
      
      // Calculate chirality based on field direction and mirror angle
      const chirality = Math.sin((state.fieldDirection + mirrorAngle) * Math.PI / 180) * magneticField;
      
      const previousTopologicalPhase = state.topologicalPhase;
      
      setState(prev => ({
        ...prev,
        energy: Math.round(energy),
        coherence: Math.round(coherence),
        topologicalPhase,
        chirality: Math.round(chirality * 100) / 100,
      }));

      // Update score and unlock materials
      if (topologicalPhase && !previousTopologicalPhase) {
        setScore(prev => prev + 100);
        toast("🎉 Topological phase achieved! Material properties enhanced!");
        
        if (!unlockedMaterials.includes('bismuthene')) {
          setUnlockedMaterials(prev => [...prev, 'bismuthene']);
          toast("🔓 New material unlocked: Bismuthene!");
        }
      }
    };

    calculateProperties();
  }, [state.mirrorAngle, state.mirrorSpacing, state.magneticField, state.fieldDirection, state.insertedMaterial, state.topologicalPhase, unlockedMaterials]);

  // Animation loop for quantum field effects
  useEffect(() => {
    if (isRunning) {
      const animate = () => {
        // This will be used by the QuantumField component for animations
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning]);

  const handleParameterChange = (parameter: keyof SimulationState, value: number | string) => {
    setState(prev => ({
      ...prev,
      [parameter]: value,
    }));
    
    // Add sound feedback for parameter changes
    if (typeof value === 'number' && Math.abs(value - (state[parameter] as number)) > 0.1) {
      // Simple audio feedback could be added here
    }
  };

  const handlePresetLoad = (presetState: Partial<SimulationState>) => {
    setState(prev => ({
      ...prev,
      ...presetState,
    }));
    toast.success('Preset configuration loaded!');
  };

  const resetSimulation = () => {
    setState({
      mirrorAngle: 45,
      mirrorSpacing: 100,
      magneticField: 0.5,
      fieldDirection: 0,
      chirality: 0,
      insertedMaterial: 'none',
      energy: 0,
      coherence: 0,
      topologicalPhase: false,
    });
    setIsRunning(false);
    toast("Simulation reset to initial conditions");
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Status Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
          Score: {score}
        </Badge>
        <Badge variant="secondary" className="bg-blue-800/50 text-blue-200" data-tutorial="energy">
          Energy: {state.energy} μeV
        </Badge>
        <Badge variant="secondary" className="bg-green-800/50 text-green-200" data-tutorial="coherence">
          Coherence: {state.coherence}%
        </Badge>
        {state.topologicalPhase && (
          <Badge className="bg-gold-800/50 text-gold-200 animate-pulse" data-tutorial="topological-phase">
            🎯 Topological Phase Active
          </Badge>
        )}
        
        <div className="flex gap-2 ml-auto">
          <Button
            onClick={() => setShowTutorial(true)}
            variant="outline"
            size="sm"
          >
            <HelpCircle className="w-4 h-4 mr-1" />
            Tutorial
          </Button>
          
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className={`${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            data-tutorial="start-button"
          >
            {isRunning ? (
              <>
                <Square className="w-4 h-4 mr-1" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Start
              </>
            )}
          </Button>
          
          <Button onClick={resetSimulation} variant="outline">
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Quantum Field Visualization */}
        <div className="xl:col-span-2">
          <Card className="p-6 bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Quantum Field Visualization</h2>
              
              <QuantumField 
                state={state}
                isRunning={isRunning}
                className="w-full h-96 rounded-lg border border-purple-500/30"
              />
              
              <PhaseIndicator state={state} />
            </div>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          <EnhancedControlPanel 
            state={state}
            onParameterChange={handleParameterChange}
          />
          
          <div data-tutorial="material-selector">
            <MaterialSelector
              selectedMaterial={state.insertedMaterial}
              unlockedMaterials={unlockedMaterials}
              onMaterialChange={(material) => handleParameterChange('insertedMaterial', material)}
            />
          </div>
        </div>

        {/* Advanced Features Panel */}
        <div className="space-y-6">
          <PresetManager
            onLoadPreset={handlePresetLoad}
            unlockedMaterials={unlockedMaterials}
          />
          
          <AchievementSystem
            state={state}
            score={score}
          />
          
          <DataExport
            state={state}
            score={score}
            sessionData={sessionData}
          />
        </div>
      </div>

      {/* Tutorial System */}
      <TutorialSystem
        onStateChange={(newState) => setState(prev => ({ ...prev, ...newState }))}
        isVisible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
};
