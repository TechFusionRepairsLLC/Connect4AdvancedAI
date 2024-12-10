import React from 'react';
import Cell from './Cell';
import { Board as BoardType, GameColors } from '../types/game';

interface BoardProps {
  board: BoardType;
  colors: GameColors;
  onColumnClick: (col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, colors, onColumnClick }) => {
  return (
    <div 
      className="p-4 rounded-lg shadow-lg"
      style={{ backgroundColor: colors.board }}
    >
      <div className="grid grid-cols-7 gap-2 bg-opacity-90">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onColumnClick(colIndex)}
              className="cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              <Cell value={cell} colors={colors} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;