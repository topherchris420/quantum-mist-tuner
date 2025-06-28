
import React from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { SimulationState } from './QuantumVacuumSimulation';
import { EducationalTooltip } from './EducationalTooltip';

interface EnhancedControlPanelProps {
  state: SimulationState;
  onParameterChange: (parameter: keyof SimulationState, value: number | string) => void;
}

export const EnhancedControlPanel: React.FC<EnhancedControlPanelProps> = ({
  state,
  onParameterChange,
}) => {
  return (
    <Card className="p-6 bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-white">Control Panel</h2>
          <EducationalTooltip
            title="Quantum Control Parameters"
            content="These controls allow you to manipulate the quantum vacuum through cavity optomechanics and external fields."
          />
        </div>

        {/* Mirror Angle */}
        <div className="space-y-2" data-tutorial="mirror-angle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-white">Mirror Angle</Label>
              <EducationalTooltip
                title="Mirror Angle"
                content="Controls the angle of cavity mirrors. Optimal angles (around 45°) create standing wave patterns that enhance quantum field effects."
              />
            </div>
            <span className="text-purple-300 font-mono">{state.mirrorAngle}°</span>
          </div>
          <Slider
            value={[state.mirrorAngle]}
            onValueChange={(value) => onParameterChange('mirrorAngle', value[0])}
            max={90}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        {/* Mirror Spacing */}
        <div className="space-y-2" data-tutorial="mirror-spacing">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-white">Mirror Spacing</Label>
              <EducationalTooltip
                title="Mirror Spacing"
                content="Distance between cavity mirrors in nanometers. Specific spacings create resonance conditions that amplify quantum vacuum fluctuations."
              />
            </div>
            <span className="text-purple-300 font-mono">{state.mirrorSpacing} nm</span>
          </div>
          <Slider
            value={[state.mirrorSpacing]}
            onValueChange={(value) => onParameterChange('mirrorSpacing', value[0])}
            max={200}
            min={50}
            step={1}
            className="w-full"
          />
        </div>

        {/* Magnetic Field */}
        <div className="space-y-2" data-tutorial="magnetic-field">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-white">Magnetic Field</Label>
              <EducationalTooltip
                title="Magnetic Field Strength"
                content="Applied magnetic field in Tesla. Strong fields can induce topological phase transitions in quantum materials, creating exotic quantum states."
              />
            </div>
            <span className="text-purple-300 font-mono">{state.magneticField.toFixed(2)} T</span>
          </div>
          <Slider
            value={[state.magneticField]}
            onValueChange={(value) => onParameterChange('magneticField', value[0])}
            max={1}
            min={0}
            step={0.01}
            className="w-full"
          />
        </div>

        {/* Field Direction */}
        <div className="space-y-2" data-tutorial="field-direction">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-white">Field Direction</Label>
              <EducationalTooltip
                title="Magnetic Field Direction"
                content="Direction of the magnetic field in degrees. Different orientations couple to different quantum modes, affecting chirality and symmetry breaking."
              />
            </div>
            <span className="text-purple-300 font-mono">{state.fieldDirection}°</span>
          </div>
          <Slider
            value={[state.fieldDirection]}
            onValueChange={(value) => onParameterChange('fieldDirection', value[0])}
            max={360}
            min={0}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};
