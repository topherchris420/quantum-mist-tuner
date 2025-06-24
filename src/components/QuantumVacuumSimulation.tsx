
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { QuantumField } from './QuantumField';
import { ControlPanel } from './ControlPanel';
import { MaterialSelector } from './MaterialSelector';
import { PhaseIndicator } from './PhaseIndicator';
import { toast } from 'sonner';

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
      {/* Status Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
          Score: {score}
        </Badge>
        <Badge variant="secondary" className="bg-blue-800/50 text-blue-200">
          Energy: {state.energy} μeV
        </Badge>
        <Badge variant="secondary" className="bg-green-800/50 text-green-200">
          Coherence: {state.coherence}%
        </Badge>
        <div className="flex gap-2 ml-auto">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className={`${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {isRunning ? 'Stop' : 'Start'} Simulation
          </Button>
          <Button onClick={resetSimulation} variant="outline">
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Quantum Field Visualization */}
        <div className="lg:col-span-2">
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
          <ControlPanel 
            state={state}
            onParameterChange={handleParameterChange}
          />
          
          <MaterialSelector
            selectedMaterial={state.insertedMaterial}
            unlockedMaterials={unlockedMaterials}
            onMaterialChange={(material) => handleParameterChange('insertedMaterial', material)}
          />
        </div>
      </div>
    </div>
  );
};
