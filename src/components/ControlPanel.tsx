
import React from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { SimulationState } from './QuantumVacuumSimulation';

interface ControlPanelProps {
  state: SimulationState;
  onParameterChange: (parameter: keyof SimulationState, value: number | string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ state, onParameterChange }) => {
  return (
    <Card className="p-6 bg-black/30 border-blue-500/30 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white mb-4">Cavity Configuration</h3>
      
      <div className="space-y-6">
        {/* Mirror Angle */}
        <div className="space-y-2">
          <Label className="text-blue-200">
            Mirror Angle: {state.mirrorAngle}°
          </Label>
          <Slider
            value={[state.mirrorAngle]}
            onValueChange={(value) => onParameterChange('mirrorAngle', value[0])}
            min={0}
            max={90}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-gray-400">
            Adjust the angle between cavity mirrors
          </p>
        </div>

        {/* Mirror Spacing */}
        <div className="space-y-2">
          <Label className="text-blue-200">
            Mirror Spacing: {state.mirrorSpacing}%
          </Label>
          <Slider
            value={[state.mirrorSpacing]}
            onValueChange={(value) => onParameterChange('mirrorSpacing', value[0])}
            min={50}
            max={200}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-gray-400">
            Control the distance between mirrors
          </p>
        </div>

        {/* Magnetic Field Strength */}
        <div className="space-y-2">
          <Label className="text-purple-200">
            Magnetic Field: {state.magneticField.toFixed(2)} T
          </Label>
          <Slider
            value={[state.magneticField]}
            onValueChange={(value) => onParameterChange('magneticField', value[0])}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
          <p className="text-xs text-gray-400">
            Weak magnetic field for symmetry breaking
          </p>
        </div>

        {/* Field Direction */}
        <div className="space-y-2">
          <Label className="text-purple-200">
            Field Direction: {state.fieldDirection}°
          </Label>
          <Slider
            value={[state.fieldDirection]}
            onValueChange={(value) => onParameterChange('fieldDirection', value[0])}
            min={0}
            max={360}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-gray-400">
            Rotate the magnetic field vector
          </p>
        </div>

        {/* Chirality Display */}
        <div className="p-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg">
          <Label className="text-yellow-200 block mb-1">
            Chirality Index
          </Label>
          <div className="text-2xl font-bold text-yellow-300">
            {state.chirality.toFixed(2)}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {state.chirality > 0 ? 'Right-handed' : state.chirality < 0 ? 'Left-handed' : 'Linear'} polarization
          </p>
        </div>
      </div>
    </Card>
  );
};
