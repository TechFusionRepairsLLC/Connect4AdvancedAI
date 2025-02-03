import { Board, Player } from '../types/game';
import { isValidPosition } from './board';

export const checkWinner = (board: Board, row: number, col: number, player: Player): boolean => {
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal right
    [1, -1],  // diagonal left
  ];

  return directions.some(([dx, dy]) => {
    let count = 1;
    
    // Check forward direction
    for (let i = 1; i < 4; i++) {
      const newRow = row + (dx * i);
      const newCol = col + (dy * i);
      if (!isValidPosition(newRow, newCol) || board[newRow][newCol] !== player) break;
      count++;
    }

    // Check backward direction
    for (let i = 1; i < 4; i++) {
      const newRow = row - (dx * i);
      const newCol = col - (dy * i);
      if (!isValidPosition(newRow, newCol) || board[newRow][newCol] !== player) break;
      count++;
    }

    return count >= 4;
  });
};