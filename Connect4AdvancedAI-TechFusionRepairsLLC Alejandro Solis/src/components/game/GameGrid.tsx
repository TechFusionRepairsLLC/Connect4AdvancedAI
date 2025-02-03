import React from 'react';
import { Board, GameColors, Theme } from '../../types/game';
import Cell from '../Cell';

interface GameGridProps {
  board: Board;
  colors: GameColors;
  theme: Theme;
  onColumnClick: (col: number) => void;
}

const GameGrid: React.FC<GameGridProps> = ({
  board,
  colors,
  theme,
  onColumnClick
}) => {
  return (
    <div 
      className="p-2 rounded-lg shadow-lg bg-opacity-90 aspect-square"
      style={{ backgroundColor: colors.board }}
    >
      <div className="grid grid-cols-7 gap-1 h-full">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onColumnClick(colIndex)}
              className="aspect-square cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              <Cell 
                value={cell} 
                colors={colors} 
                theme={theme}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameGrid;