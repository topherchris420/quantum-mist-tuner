
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SimulationState } from './QuantumVacuumSimulation';
import { Trophy, Star, Zap, Target, Award, Crown } from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  condition: (state: SimulationState, score: number) => boolean;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievements: Achievement[] = [
  {
    id: 'first-topological',
    name: 'Phase Pioneer',
    description: 'Achieve your first topological phase transition',
    icon: Trophy,
    condition: (state) => state.topologicalPhase,
    points: 50,
    rarity: 'common'
  },
  {
    id: 'high-coherence',
    name: 'Coherence Master',
    description: 'Maintain 90% coherence or higher',
    icon: Star,
    condition: (state) => state.coherence >= 90,
    points: 75,
    rarity: 'rare'
  },
  {
    id: 'energy-efficiency',
    name: 'Energy Wizard',
    description: 'Reach 80+ energy with minimal magnetic field',
    icon: Zap,
    condition: (state) => state.energy >= 80 && state.magneticField <= 0.3,
    points: 100,
    rarity: 'epic'
  },
  {
    id: 'perfect-resonance',
    name: 'Resonance Expert',
    description: 'Achieve perfect cavity resonance conditions',
    icon: Target,
    condition: (state) => Math.abs(state.mirrorSpacing - 100) < 2 && Math.abs(state.mirrorAngle - 45) < 2,
    points: 60,
    rarity: 'rare'
  },
  {
    id: 'score-master',
    name: 'Quantum Virtuoso',
    description: 'Reach a total score of 500 points',
    icon: Award,
    condition: (_, score) => score >= 500,
    points: 150,
    rarity: 'epic'
  },
  {
    id: 'chiral-master',
    name: 'Chirality Champion',
    description: 'Achieve maximum chirality effects',
    icon: Crown,
    condition: (state) => Math.abs(state.chirality) >= 0.8,
    points: 120,
    rarity: 'legendary'
  }
];

interface AchievementSystemProps {
  state: SimulationState;
  score: number;
}

export const AchievementSystem: React.FC<AchievementSystemProps> = ({ state, score }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  useEffect(() => {
    achievements.forEach(achievement => {
      if (!unlockedAchievements.includes(achievement.id) && achievement.condition(state, score)) {
        setUnlockedAchievements(prev => [...prev, achievement.id]);
        toast(`🏆 Achievement Unlocked: ${achievement.name}!`, {
          description: achievement.description,
          duration: 4000,
        });
      }
    });
  }, [state, score, unlockedAchievements]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-800/50 text-gray-200 border-gray-500/50';
      case 'rare': return 'bg-blue-800/50 text-blue-200 border-blue-500/50';
      case 'epic': return 'bg-purple-800/50 text-purple-200 border-purple-500/50';
      case 'legendary': return 'bg-yellow-800/50 text-yellow-200 border-yellow-500/50';
      default: return 'bg-gray-800/50 text-gray-200 border-gray-500/50';
    }
  };

  const totalPoints = achievements
    .filter(a => unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <Card className="p-4 bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Achievements</h3>
        <Badge className="bg-gold-800/50 text-gold-200">
          {totalPoints} pts
        </Badge>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {achievements.map(achievement => {
          const unlocked = unlockedAchievements.includes(achievement.id);
          const IconComponent = achievement.icon;
          
          return (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-all ${
                unlocked 
                  ? getRarityColor(achievement.rarity)
                  : 'border-gray-700/50 opacity-40'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComponent className={`w-5 h-5 ${unlocked ? 'text-current' : 'text-gray-600'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${unlocked ? 'text-current' : 'text-gray-500'}`}>
                      {achievement.name}
                    </span>
                    <span className="text-xs opacity-70">+{achievement.points}</span>
                  </div>
                  <p className={`text-xs ${unlocked ? 'opacity-80' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
