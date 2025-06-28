
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SimulationState } from './QuantumVacuumSimulation';
import { Zap, Atom, Layers, Sparkles } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  state: Partial<SimulationState>;
}

const presets: Preset[] = [
  {
    id: 'resonance',
    name: 'Perfect Resonance',
    description: 'Achieve optimal cavity resonance conditions',
    icon: Zap,
    difficulty: 'beginner',
    state: {
      mirrorAngle: 45,
      mirrorSpacing: 100,
      magneticField: 0.5,
      fieldDirection: 0,
      insertedMaterial: 'none'
    }
  },
  {
    id: 'graphene-basic',
    name: 'Graphene Introduction',
    description: 'Basic graphene quantum effects',
    icon: Layers,
    difficulty: 'beginner',
    state: {
      mirrorAngle: 42,
      mirrorSpacing: 95,
      magneticField: 0.6,
      fieldDirection: 30,
      insertedMaterial: 'graphene'
    }
  },
  {
    id: 'topological',
    name: 'Topological Phase',
    description: 'Create topological quantum states',
    icon: Atom,
    difficulty: 'intermediate',
    state: {
      mirrorAngle: 47,
      mirrorSpacing: 105,
      magneticField: 0.8,
      fieldDirection: 45,
      insertedMaterial: 'graphene'
    }
  },
  {
    id: 'advanced-chiral',
    name: 'Advanced Chirality',
    description: 'Maximum chiral quantum effects',
    icon: Sparkles,
    difficulty: 'advanced',
    state: {
      mirrorAngle: 50,
      mirrorSpacing: 110,
      magneticField: 0.9,
      fieldDirection: 90,
      insertedMaterial: 'bismuthene'
    }
  }
];

interface PresetManagerProps {
  onLoadPreset: (state: Partial<SimulationState>) => void;
  unlockedMaterials: string[];
}

export const PresetManager: React.FC<PresetManagerProps> = ({ onLoadPreset, unlockedMaterials }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-800/50 text-green-200';
      case 'intermediate': return 'bg-yellow-800/50 text-yellow-200';
      case 'advanced': return 'bg-red-800/50 text-red-200';
      default: return 'bg-gray-800/50 text-gray-200';
    }
  };

  const isPresetAvailable = (preset: Preset) => {
    if (preset.state.insertedMaterial === 'none') return true;
    return unlockedMaterials.includes(preset.state.insertedMaterial || '');
  };

  return (
    <Card className="p-4 bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white mb-4">Experiment Presets</h3>
      <div className="space-y-3">
        {presets.map((preset) => {
          const available = isPresetAvailable(preset);
          const IconComponent = preset.icon;
          
          return (
            <div
              key={preset.id}
              className={`p-3 rounded-lg border transition-all ${
                available 
                  ? 'border-purple-500/50 hover:border-purple-400/70 hover:bg-purple-900/20' 
                  : 'border-gray-600/50 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-medium">{preset.name}</span>
                </div>
                <Badge className={getDifficultyColor(preset.difficulty)}>
                  {preset.difficulty}
                </Badge>
              </div>
              <p className="text-gray-300 text-sm mb-3">{preset.description}</p>
              <Button
                onClick={() => onLoadPreset(preset.state)}
                disabled={!available}
                size="sm"
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                {available ? 'Load Preset' : 'Material Locked'}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
