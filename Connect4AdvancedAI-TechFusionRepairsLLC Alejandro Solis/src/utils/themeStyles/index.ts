import { Theme } from '../../types/game';
import { ThemeStyle } from './types';
import { themes } from './themes';

export const getThemeStyles = (theme: Theme): ThemeStyle => {
  return themes[theme] || themes.classic;
};

export type { ThemeStyle };
export { themes };