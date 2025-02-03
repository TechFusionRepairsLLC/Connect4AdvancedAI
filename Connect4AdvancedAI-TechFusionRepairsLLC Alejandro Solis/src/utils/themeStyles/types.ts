import { Theme } from '../../types/game';

export interface ThemeStyle {
  boardWrapper: string;
  boardGrid: string;
  cellWrapper: string;
  cell: string;
  emptyCellColor: string;
  cellBorder: string;
  cellShadow: string;
  cellContent?: string;
}