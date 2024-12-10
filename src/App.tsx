import React, { useState, useCallback, useEffect } from 'react';
import Board from './components/Board';
import Settings from './components/Settings';
import { GameState, GameColors, Player, Difficulty, GameMode, PlayerNames } from './types/game';
import { createEmptyBoard, checkWinner, findLowestEmptyRow, isBoardFull, getAIMove } from './utils/gameLogic';

const initialColors: GameColors = {
  player1: '#FF4136',  // A vibrant red
  player2: '#FFDC00',  // A bright yellow
  board: '#2E4052',    // A deep blue-grey
};

const initialNames: PlayerNames = {
  player1: 'Player 1',
  player2: 'Computer',
};

function App() {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 1,
    winner: null,
    isDraw: false,
    gameMode: 'singleplayer',
    difficulty: 'medium',
    colors: initialColors,
    playerNames: initialNames,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleMove = useCallback((col: number) => {
    if (gameState.winner || gameState.isDraw) return;

    const row = findLowestEmptyRow(gameState.board, col);
    if (row === -1) return;

    const newBoard = gameState.board.map(row => [...row]);
    newBoard[row][col] = gameState.currentPlayer;

    const isWinner = checkWinner(newBoard, row, col, gameState.currentPlayer);
    const isDraw = !isWinner && isBoardFull(newBoard);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
      winner: isWinner ? prev.currentPlayer : null,
      isDraw,
    }));
  }, [gameState]);

  useEffect(() => {
    if (
      gameState.gameMode === 'singleplayer' &&
      gameState.currentPlayer === 2 &&
      !gameState.winner &&
      !gameState.isDraw
    ) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(gameState.board, gameState.difficulty);
        handleMove(aiMove);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [gameState, handleMove]);

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      board: createEmptyBoard(),
      currentPlayer: 1,
      winner: null,
      isDraw: false,
    }));
  };

  const updateColors = (colors: GameColors) => {
    setGameState(prev => ({ ...prev, colors }));
  };

  const updateDifficulty = (difficulty: Difficulty) => {
    setGameState(prev => ({ ...prev, difficulty }));
  };

  const updateGameMode = (gameMode: GameMode) => {
    setGameState(prev => ({
      ...prev,
      gameMode,
      playerNames: {
        ...prev.playerNames,
        player2: gameMode === 'singleplayer' ? 'Computer' : 'Player 2'
      }
    }));
    resetGame();
  };

  const updatePlayerNames = (names: PlayerNames) => {
    setGameState(prev => ({ ...prev, playerNames: names }));
  };

  const getCurrentPlayerName = () => {
    return gameState.playerNames[`player${gameState.currentPlayer}`];
  };

  const getWinnerName = () => {
    if (!gameState.winner) return '';
    return gameState.playerNames[`player${gameState.winner}`];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Connect Four</h1>
          <Settings
            colors={gameState.colors}
            setColors={updateColors}
            difficulty={gameState.difficulty}
            setDifficulty={updateDifficulty}
            gameMode={gameState.gameMode}
            setGameMode={updateGameMode}
            playerNames={gameState.playerNames}
            setPlayerNames={updatePlayerNames}
            isOpen={isSettingsOpen}
            setIsOpen={setIsSettingsOpen}
          />
        </div>

        <div className="mb-6">
          {gameState.winner ? (
            <div className="text-xl font-semibold text-center text-green-600">
              {getWinnerName()} wins!
            </div>
          ) : gameState.isDraw ? (
            <div className="text-xl font-semibold text-center text-yellow-600">It's a draw!</div>
          ) : (
            <div 
              className="text-xl font-semibold text-center"
              style={{ color: gameState.colors[`player${gameState.currentPlayer}`] }}
            >
              {getCurrentPlayerName()}'s turn
            </div>
          )}
        </div>

        <div className="flex justify-center mb-6">
          <Board
            board={gameState.board}
            colors={gameState.colors}
            onColumnClick={handleMove}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;