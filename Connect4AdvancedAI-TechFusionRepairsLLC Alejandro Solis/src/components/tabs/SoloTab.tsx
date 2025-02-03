import React, { useState } from 'react';
import { GameColors, Theme, Difficulty } from '../../types/game';
import DifficultySelector from './solo/DifficultySelector';
import GameBoard from '../game/GameBoard';
import { useGameState } from '../../hooks/useGameState';
import { Gamepad2 } from 'lucide-react';

interface SoloTabProps {
  onStartGame: (difficulty: Difficulty) => void;
  colors: GameColors;
  theme: Theme;
}

const SoloTab: React.FC<SoloTabProps> = ({ onStartGame, colors, theme }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const { board, currentPlayer, winner, handleMove, resetGame } = useGameState();

  const handleReturnToMenu = () => {
    setGameStarted(false);
    resetGame();
  };

  if (!gameStarted) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Gamepad2 className="w-8 h-8" />
          Single Player
        </h2>
        <DifficultySelector 
          onSelect={(difficulty) => {
            onStartGame(difficulty);
            setGameStarted(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <GameBoard
        board={board}
        colors={colors}
        onColumnClick={handleMove}
        currentPlayer={currentPlayer}
        gameMode="solo"
        playerNames={{ player1: 'You', player2: 'Computer' }}
        winner={winner}
        onPlayAgain={resetGame}
        onReturnToMenu={handleReturnToMenu}
      />
    </div>
  );
};

export default SoloTab;