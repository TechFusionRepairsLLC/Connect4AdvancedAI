import React from 'react';
import { GameColors } from '../../types/game';

interface ColorPickerProps {
  colors: GameColors;
  onColorsChange: (colors: Partial<GameColors>) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onColorsChange }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 space-y-6">
      <h3 className="text-xl font-semibold text-white">Game Colors</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Player 1 Color
          </label>
          <input
            type="color"
            value={colors.player1}
            onChange={(e) => onColorsChange({ player1: e.target.value })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Player 2 Color
          </label>
          <input
            type="color"
            value={colors.player2}
            onChange={(e) => onColorsChange({ player2: e.target.value })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Board Color
          </label>
          <input
            type="color"
            value={colors.board}
            onChange={(e) => onColorsChange({ board: e.target.value })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};