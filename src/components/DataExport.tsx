
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SimulationState } from './QuantumVacuumSimulation';
import { Download, FileText, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

interface DataExportProps {
  state: SimulationState;
  score: number;
  sessionData?: {
    startTime: Date;
    experimentsRun: number;
    maxEnergy: number;
    maxCoherence: number;
  };
}

export const DataExport: React.FC<DataExportProps> = ({ state, score, sessionData }) => {
  const exportAsJSON = () => {
    const data = {
      timestamp: new Date().toISOString(),
      simulationState: state,
      score,
      sessionData,
      metadata: {
        version: '1.0.0',
        exportType: 'quantum-vacuum-simulation'
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantum-simulation-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  const exportAsCSV = () => {
    const csvData = [
      ['Parameter', 'Value'],
      ['Mirror Angle', state.mirrorAngle.toString()],
      ['Mirror Spacing', state.mirrorSpacing.toString()],
      ['Magnetic Field', state.magneticField.toString()],
      ['Field Direction', state.fieldDirection.toString()],
      ['Chirality', state.chirality.toString()],
      ['Inserted Material', state.insertedMaterial],
      ['Energy', state.energy.toString()],
      ['Coherence', state.coherence.toString()],
      ['Topological Phase', state.topologicalPhase.toString()],
      ['Score', score.toString()]
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantum-data-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('CSV data exported successfully!');
  };

  const generateReport = () => {
    const report = `
# Quantum Vacuum Simulation Report

**Generated:** ${new Date().toLocaleString()}
**Total Score:** ${score} points

## Current Configuration
- **Mirror Angle:** ${state.mirrorAngle}°
- **Mirror Spacing:** ${state.mirrorSpacing} nm
- **Magnetic Field:** ${state.magneticField} T
- **Field Direction:** ${state.fieldDirection}°
- **Inserted Material:** ${state.insertedMaterial}

## Results
- **Energy Level:** ${state.energy} μeV
- **Coherence:** ${state.coherence}%
- **Chirality:** ${state.chirality}
- **Topological Phase:** ${state.topologicalPhase ? 'Active' : 'Inactive'}

## Analysis
${state.topologicalPhase ? 
  '✅ **Topological Phase Achieved** - The system has successfully entered a topological quantum state, indicating strong material-field coupling.' :
  '❌ **No Topological Phase** - Consider adjusting magnetic field strength or material selection to achieve phase transition.'
}

${state.coherence > 80 ? 
  '✅ **High Coherence** - Excellent quantum coherence maintained.' :
  '⚠️ **Low Coherence** - System coherence could be improved through better cavity optimization.'
}

${Math.abs(state.chirality) > 0.5 ? 
  '✅ **Strong Chiral Effects** - Significant chirality observed, indicating successful manipulation of quantum vacuum properties.' :
  '⚠️ **Weak Chiral Effects** - Consider adjusting field direction and mirror configuration for stronger chiral coupling.'
}
    `.trim();

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantum-report-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Report generated successfully!');
  };

  return (
    <Card className="p-4 bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white mb-4">Export Data</h3>
      <div className="space-y-3">
        <Button
          onClick={exportAsJSON}
          className="w-full justify-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Export JSON
        </Button>
        
        <Button
          onClick={exportAsCSV}
          className="w-full justify-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <BarChart3 className="w-4 h-4" />
          Export CSV
        </Button>
        
        <Button
          onClick={generateReport}
          className="w-full justify-center gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <FileText className="w-4 h-4" />
          Generate Report
        </Button>
      </div>
    </Card>
  );
};
