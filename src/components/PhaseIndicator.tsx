
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SimulationState } from './QuantumVacuumSimulation';

interface PhaseIndicatorProps {
  state: SimulationState;
}

export const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({ state }) => {
  const getPhaseDescription = () => {
    if (state.topologicalPhase) {
      return {
        name: 'Topological Insulator Phase',
        description: 'Material exhibits protected edge states with spin-momentum locking',
        color: 'text-green-400',
        bgColor: 'bg-green-900/30',
        borderColor: 'border-green-500/50',
      };
    } else if (state.energy > 70 && state.coherence > 50) {
      return {
        name: 'High Energy Coherent State',
        description: 'Strong vacuum fluctuations with maintained coherence',
        color: 'text-blue-400',
        bgColor: 'bg-blue-900/30',
        borderColor: 'border-blue-500/50',
      };
    } else if (state.insertedMaterial !== 'none' && state.magneticField > 0.3) {
      return {
        name: 'Symmetry Broken Phase',
        description: 'Magnetic field breaks time-reversal symmetry',
        color: 'text-purple-400',
        bgColor: 'bg-purple-900/30',
        borderColor: 'border-purple-500/50',
      };
    } else {
      return {
        name: 'Trivial Phase',
        description: 'Standard material properties, no exotic states',
        color: 'text-gray-400',
        bgColor: 'bg-gray-900/30',
        borderColor: 'border-gray-500/50',
      };
    }
  };

  const phase = getPhaseDescription();

  return (
    <Card className={`p-4 ${phase.bgColor} ${phase.borderColor} backdrop-blur-sm`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className={`font-semibold ${phase.color}`}>Material Phase</h4>
          {state.topologicalPhase && (
            <Badge className="bg-green-600 text-white">
              🏆 Topological!
            </Badge>
          )}
        </div>
        
        <div>
          <h5 className={`text-sm font-medium ${phase.color} mb-1`}>
            {phase.name}
          </h5>
          <p className="text-xs text-gray-300">
            {phase.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Energy Level</label>
            <Progress value={state.energy} className="h-2" />
            <span className="text-xs text-gray-400">{state.energy}%</span>
          </div>
          
          <div>
            <label className="text-xs text-gray-400 block mb-1">Coherence</label>
            <Progress value={state.coherence} className="h-2" />
            <span className="text-xs text-gray-400">{state.coherence}%</span>
          </div>
        </div>

        {Math.abs(state.chirality) > 0.1 && (
          <div className="p-2 bg-yellow-900/30 rounded border border-yellow-500/30">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-xs">⚡</span>
              <span className="text-yellow-300 text-xs font-medium">
                Chiral Vacuum State Detected
              </span>
            </div>
            <p className="text-xs text-yellow-200 mt-1">
              Circularly polarized fluctuations are {state.chirality > 0 ? 'right' : 'left'}-handed
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
