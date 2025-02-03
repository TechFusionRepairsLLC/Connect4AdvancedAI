import React from 'react';
import { Trophy, Monitor, User } from 'lucide-react';
import Confetti from './effects/Confetti';

interface WinnerModalProps {
  winner: string;
  winStreak: number;
  isAI?: boolean;
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ 
  winner, 
  winStreak, 
  isAI = false,
  onPlayAgain, 
  onReturnToMenu 
}) => {
  const Icon = isAI ? Monitor : winner === 'You' ? Trophy : User;
  const confettiIntensity = isAI ? 'low' : 'high';
  const confettiColors = isAI 
    ? ['#FF4136', '#FF851B', '#FFDC00'] // Warm colors for AI
    : ['#FFD700', '#4ECDC4', '#45B7D1']; // Cool colors for player

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Confetti intensity={confettiIntensity} colors={confettiColors} />
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-md w-full mx-4 text-center">
        <Icon className={`w-16 h-16 mx-auto mb-4 ${isAI ? 'text-red-400' : 'text-yellow-400'}`} />
        <h2 className="text-3xl font-bold text-white mb-2">
          {isAI ? 'Computer Wins!' : `${winner} Wins!`}
        </h2>
        {!isAI && (
          <p className="text-xl text-white/80 mb-6">
            Win Streak: {winStreak} 🔥
          </p>
        )}
        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="w-full bg-blue-500 text-white rounded-lg py-3 font-medium 
              hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onReturnToMenu}
            className="w-full bg-white/10 text-white rounded-lg py-3 font-medium 
              hover:bg-white/20 transition-colors"
          >
            Return to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;