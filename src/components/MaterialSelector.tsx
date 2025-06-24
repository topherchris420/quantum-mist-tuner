
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

interface MaterialSelectorProps {
  selectedMaterial: string;
  unlockedMaterials: string[];
  onMaterialChange: (material: string) => void;
}

const MATERIALS = {
  none: {
    name: 'No Material',
    description: 'Empty cavity',
    color: 'bg-gray-600',
    properties: 'Baseline state',
  },
  graphene: {
    name: 'Graphene',
    description: 'Single layer carbon atoms',
    color: 'bg-gray-800',
    properties: 'High conductivity, Dirac fermions',
  },
  bismuthene: {
    name: 'Bismuthene',
    description: 'Topological insulator',
    color: 'bg-purple-600',
    properties: 'Spin-orbit coupling, edge states',
  },
  'twisted-bilayer': {
    name: 'Twisted Bilayer',
    description: 'Magic angle graphene',
    color: 'bg-blue-600',
    properties: 'Superconductivity, flat bands',
  },
  phosphorene: {
    name: 'Phosphorene',
    description: 'Black phosphorus monolayer',
    color: 'bg-orange-600',
    properties: 'Anisotropic transport',
  },
};

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  selectedMaterial,
  unlockedMaterials,
  onMaterialChange,
}) => {
  return (
    <Card className="p-6 bg-black/30 border-green-500/30 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white mb-4">Material Insertion</h3>
      
      <div className="space-y-3">
        {Object.entries(MATERIALS).map(([key, material]) => {
          const isUnlocked = unlockedMaterials.includes(key) || key === 'none';
          const isSelected = selectedMaterial === key;
          
          return (
            <div key={key} className="relative">
              <Button
                onClick={() => isUnlocked && onMaterialChange(key)}
                disabled={!isUnlocked}
                variant={isSelected ? "default" : "outline"}
                className={`w-full p-4 h-auto text-left ${
                  isSelected 
                    ? 'bg-green-600 hover:bg-green-700 border-green-400' 
                    : isUnlocked 
                      ? 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-600' 
                      : 'bg-gray-900/50 border-gray-800 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${material.color}`} />
                      <span className="font-medium text-white">
                        {material.name}
                      </span>
                      {isSelected && (
                        <Badge variant="secondary" className="bg-green-800 text-green-200">
                          Active
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-2">
                      {material.description}
                    </p>
                    
                    <p className="text-xs text-gray-400">
                      {material.properties}
                    </p>
                  </div>
                  
                  {!isUnlocked && (
                    <div className="text-gray-500 text-xs">
                      🔒 Locked
                    </div>
                  )}
                </div>
              </Button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
        <Label className="text-blue-200 text-sm">
          💡 Tip: Achieve topological phases to unlock new materials!
        </Label>
      </div>
    </Card>
  );
};
