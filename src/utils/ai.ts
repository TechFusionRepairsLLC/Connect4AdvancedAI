import { Board, Difficulty } from '../types/game';
import { findLowestEmptyRow } from './board';
import { evaluatePosition } from './evaluator';

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