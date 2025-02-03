import { Board, Player } from '../types/game';
import { isValidPosition } from './gameLogic';

// Scoring weights for different patterns
const WEIGHTS = {
  WIN: 100000,
  THREE_IN_ROW: 100,
  TWO_IN_ROW: 10,
  CENTER_CONTROL: 3,
};

export const evaluatePosition = (board: Board, player: Player): number => {
  let score = 0;

  // Evaluate center control (pieces in the middle columns are more valuable)
  score += evaluateCenterControl(board, player);

  // Evaluate horizontal, vertical, and diagonal patterns
  score += evaluateLines(board, player);

  return score;
};

const evaluateCenterControl = (board: Board, player: Player): number => {
  let score = 0;
  const centerColumn = 3;
  
  for (let row = 0; row < 6; row++) {
    if (board[row][centerColumn] === player) {
      score += WEIGHTS.CENTER_CONTROL;
    }
  }
  
  return score;
};

const evaluateLines = (board: Board, player: Player): number => {
  let score = 0;
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal right
    [1, -1],  // diagonal left
  ];

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      directions.forEach(([dx, dy]) => {
        score += evaluateLine(board, row, col, dx, dy, player);
      });
    }
  }

  return score;
};

const evaluateLine = (
  board: Board,
  startRow: number,
  startCol: number,
  dx: number,
  dy: number,
  player: Player
): number => {
  let score = 0;
  let count = 0;
  let empty = 0;
  let blocked = false;

  // Check four positions in the current direction
  for (let i = 0; i < 4; i++) {
    const row = startRow + (dx * i);
    const col = startCol + (dy * i);

    if (!isValidPosition(row, col)) {
      blocked = true;
      break;
    }

    const cell = board[row][col];
    if (cell === player) {
      count++;
    } else if (cell === null) {
      empty++;
    } else {
      blocked = true;
      break;
    }
  }

  if (!blocked && empty > 0) {
    if (count === 3) score += WEIGHTS.THREE_IN_ROW;
    else if (count === 2) score += WEIGHTS.TWO_IN_ROW;
  }

  if (count === 4) score += WEIGHTS.WIN;

  return score;
};