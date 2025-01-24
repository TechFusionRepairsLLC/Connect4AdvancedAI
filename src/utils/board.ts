import { Board, CellValue } from '../types/game';

export const createEmptyBoard = (): Board => {
  return Array(6).fill(null).map(() => Array(7).fill(null));
};

export const isValidPosition = (row: number, col: number): boolean => {
  return row >= 0 && row < 6 && col >= 0 && col < 7;
};

export const findLowestEmptyRow = (board: Board, col: number): number => {
  for (let row = 5; row >= 0; row--) {
    if (!board[row][col]) return row;
  }
  return -1;
};

export const isBoardFull = (board: Board): boolean => {
  return board[0].every(cell => cell !== null);
};