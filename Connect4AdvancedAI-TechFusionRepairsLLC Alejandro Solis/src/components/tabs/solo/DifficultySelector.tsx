import React from 'react';
import { Difficulty } from '../../../types/game';
import { Brain, Zap, Trophy } from 'lucide-react';

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect }) => {
  const difficulties = [
    {
      level: 'easy' as Difficulty,
      icon: <Brain className="w-12 h-12 text-green-500" />,
      title: 'Easy',
      description: 'Perfect for beginners or casual play',
      textColor: 'text-green-500'
    },
    {
      level: 'medium' as Difficulty,
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: 'Medium',
      description: 'A balanced challenge for most players',
      textColor: 'text-yellow-500'
    },
    {
      level: 'hard' as Difficulty,
      icon: <Trophy className="w-12 h-12 text-red-500" />,
      title: 'Hard',
      description: 'Test your skills against a tough opponent',
      textColor: 'text-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {difficulties.map(({ level, icon, title, description, textColor }) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 
            transition-all duration-200 transform hover:scale-105"
        >
          <div className="flex flex-col items-center space-y-4">
            {icon}
            <h3 className={`text-xl font-semibold ${textColor}`}>{title}</h3>
            <p className="text-sm text-white/80 text-center">{description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;