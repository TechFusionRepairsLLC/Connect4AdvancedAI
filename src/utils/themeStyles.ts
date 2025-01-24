import { Theme } from '../types/game';
import { themes } from './themeStyles/themes';
import type { ThemeStyle } from './themeStyles/types';

export const getThemeStyles = (theme: Theme): ThemeStyle => {
  return themes[theme] || themes.classic;
};

export type { ThemeStyle };
export { themes };