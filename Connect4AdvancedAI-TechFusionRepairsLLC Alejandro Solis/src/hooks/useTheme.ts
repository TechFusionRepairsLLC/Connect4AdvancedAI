import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { getThemeStyles } from '../utils/themeStyles';

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  const themeStyles = getThemeStyles(theme);

  return { theme, themeStyles };
};