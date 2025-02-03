import { useState, useCallback } from 'react';
import { Board, Player } from '../types/game';
import { createEmptyBoard, findLowestEmptyRow, checkWinner, getAIMove } from '../utils/gameLogic';

export const useGameState = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player | null>(null);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(1);
    setWinner(null);
  }, []);

  const handleMove = useCallback((col: number) => {
    if (winner) return;

    const row = findLowestEmptyRow(board, col);
    if (row === -1) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setWinner(currentPlayer);
      return;
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);

    // AI move
    if (currentPlayer === 1 && !winner) {
      setTimeout(() => {
        const aiCol = getAIMove(newBoard, 'medium');
        const aiRow = findLowestEmptyRow(newBoard, aiCol);
        if (aiRow !== -1) {
          const finalBoard = newBoard.map(row => [...row]);
          finalBoard[aiRow][aiCol] = 2;
          setBoard(finalBoard);
          if (checkWinner(finalBoard, aiRow, aiCol, 2)) {
            setWinner(2);
            return;
          }
          setCurrentPlayer(1);
        }
      }, 500); // Add slight delay for AI move
    }
  }, [board, currentPlayer, winner]);

  return {
    board,
    currentPlayer,
    winner,
    handleMove,
    resetGame
  };
};