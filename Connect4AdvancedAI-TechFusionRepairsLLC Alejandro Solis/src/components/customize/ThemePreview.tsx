import React from 'react';
import { GameColors } from '../../types/game';
import GameBoard from '../game/GameBoard';

interface ThemePreviewProps {
  colors: GameColors;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ colors }) => {
  const previewBoard = [
    [null, 1, null, 2, null, 1, null],
    [null, 2, null, 1, null, 2, null],
    [null, 1, null, 2, null, 1, null],
    [null, 2, null, 1, null, 2, null],
    [null, 1, null, 2, null, 1, null],
    [null, 2, null, 1, null, 2, null],
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
      <div className="aspect-square">
        <GameBoard
          board={previewBoard}
          colors={colors}
          onColumnClick={() => {}}
          currentPlayer={1}
          gameMode="solo"
          playerNames={{ player1: 'Preview 1', player2: 'Preview 2' }}
        />
      </div>
    </div>
  );
};