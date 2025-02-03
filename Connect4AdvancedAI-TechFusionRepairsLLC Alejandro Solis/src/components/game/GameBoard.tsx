import React from 'react';
import { Board as BoardType, GameColors, Player } from '../../types/game';
import { useTheme } from '../../hooks/useTheme';
import { useGameAudio } from '../../hooks/useGameAudio';
import { useWinStreak } from '../../hooks/useWinStreak';
import { useAuth } from '../../hooks/useAuth';
import PlayerInfo from './PlayerInfo';
import GameGrid from './GameGrid';
import WinnerModal from './WinnerModal';

interface GameBoardProps {
  board: BoardType;
  colors: GameColors;
  onColumnClick: (col: number) => void;
  currentPlayer: Player;
  gameMode: 'solo' | 'multiplayer-local' | 'multiplayer-online';
  playerNames: { player1: string; player2: string };
  winner: Player | null;
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  colors,
  onColumnClick,
  currentPlayer,
  playerNames,
  gameMode,
  winner,
  onPlayAgain,
  onReturnToMenu
}) => {
  const { theme } = useTheme();
  const { playSound } = useGameAudio(70);
  const { user } = useAuth();
  const { winStreak, incrementStreak } = useWinStreak(user?.id);

  const handleColumnClick = (col: number) => {
    if (winner) return;
    playSound('move');
    onColumnClick(col);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <PlayerInfo
        colors={colors}
        playerNames={playerNames}
        currentPlayer={currentPlayer}
        winner={winner}
      />

      <GameGrid
        board={board}
        colors={colors}
        theme={theme}
        onColumnClick={handleColumnClick}
      />

      {winner && (
        <WinnerModal
          winner={winner === 1 ? playerNames.player1 : playerNames.player2}
          winStreak={winStreak}
          isAI={gameMode === 'solo' && winner === 2}
          onPlayAgain={onPlayAgain}
          onReturnToMenu={onReturnToMenu}
        />
      )}
    </div>
  );
};

export default GameBoard;