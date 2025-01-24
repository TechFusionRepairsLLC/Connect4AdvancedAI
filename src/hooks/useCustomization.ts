import { useState } from 'react';
import { Theme, GameColors } from '../types/game';
import { getThemeStyles } from '../utils/themeStyles';

export const useCustomization = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('classic');
  const [colors, setColors] = useState<GameColors>({
    player1: '#FF4136',
    player2: '#FFDC00',
    board: '#2E4052'
  });

  const updateTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    const themeStyles = getThemeStyles(theme);
    setColors({
      ...colors,
      board: themeStyles.boardWrapper
    });
  };

  const updateColors = (newColors: Partial<GameColors>) => {
    setColors({ ...colors, ...newColors });
  };

  return {
    currentTheme,
    colors,
    updateTheme,
    updateColors
  };
};