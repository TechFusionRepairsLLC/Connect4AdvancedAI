import React from 'react';
import { CellValue, GameColors, Theme } from '../types/game';
import { getThemeStyles } from '../utils/themeStyles';

interface CellProps {
  value: CellValue;
  colors: GameColors;
  theme: Theme;
}

const Cell: React.FC<CellProps> = ({ value, colors, theme }) => {
  const themeStyles = getThemeStyles(theme);

  const getCellStyle = () => {
    if (!value) {
      return {
        backgroundColor: themeStyles.emptyCellColor,
        border: themeStyles.cellBorder,
        boxShadow: themeStyles.cellShadow,
      };
    }
    return {
      backgroundColor: value === 1 ? colors.player1 : colors.player2,
      border: themeStyles.cellBorder,
      boxShadow: themeStyles.cellShadow,
    };
  };

  return (
    <div className="w-full h-full p-1">
      <div
        className="w-full h-full rounded-full transition-all duration-300"
        style={getCellStyle()}
      />
    </div>
  );
};

export default Cell;