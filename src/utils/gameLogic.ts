import { Board, Player, Difficulty } from '../types/game';
import { evaluatePosition } from './evaluator';

export const createEmptyBoard = (): Board => {
  return Array(6).fill(null).map(() => Array(7).fill(null));
};

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

export const getAIMove = (board: Board, difficulty: Difficulty): number => {
  const depthMap = {
    easy: 2,
    medium: 4,
    hard: 6
  };

  const depth = depthMap[difficulty];
  return getBestMove(board, depth);
};

const getBestMove = (board: Board, depth: number): number => {
  let bestScore = -Infinity;
  let bestMove = 0;

  for (let col = 0; col < 7; col++) {
    const row = findLowestEmptyRow(board, col);
    if (row !== -1) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = 2;
      
      const score = minimax(newBoard, depth - 1, false, -Infinity, Infinity);
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = col;
      }
    }
  }

  return bestMove;
};

const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number
): number => {
  // Terminal conditions
  if (depth === 0) {
    return evaluatePosition(board, 2) - evaluatePosition(board, 1);
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (let col = 0; col < 7; col++) {
      const row = findLowestEmptyRow(board, col);
      if (row !== -1) {
        board[row][col] = 2;
        const score = minimax(board, depth - 1, false, alpha, beta);
        board[row][col] = null;
        
        maxScore = Math.max(score, maxScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let col = 0; col < 7; col++) {
      const row = findLowestEmptyRow(board, col);
      if (row !== -1) {
        board[row][col] = 1;
        const score = minimax(board, depth - 1, true, alpha, beta);
        board[row][col] = null;
        
        minScore = Math.min(score, minScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
    return minScore;
  }
};