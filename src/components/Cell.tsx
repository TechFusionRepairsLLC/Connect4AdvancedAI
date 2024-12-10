import React from 'react';
import { CellValue, GameColors } from '../types/game';

interface CellProps {
  value: CellValue;
  colors: GameColors;
}

const Cell: React.FC<CellProps> = ({ value, colors }) => {
  const getCellStyle = () => {
    if (!value) {
      return {
        backgroundColor: '#ffffff',
        border: '2px solid rgba(0, 0, 0, 0.1)',
      };
    }
    return {
      backgroundColor: value === 1 ? colors.player1 : colors.player2,
      border: '2px solid rgba(0, 0, 0, 0.1)',
    };
  };

  return (
    <div className="w-14 h-14 p-1">
      <div
        className="w-full h-full rounded-full transition-colors duration-300 shadow-md transform hover:scale-105"
        style={getCellStyle()}
      />
    </div>
  );
};

export default Cell;