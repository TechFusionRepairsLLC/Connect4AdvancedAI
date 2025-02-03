import React from 'react';
import { GameColors, Player } from '../../types/game';

interface PlayerInfoProps {
  colors: GameColors;
  playerNames: { player1: string; player2: string };
  currentPlayer: Player;
  winner: Player | null;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  colors,
  playerNames,
  currentPlayer,
  winner
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors.player1 }}
          />
          <span className="font-medium text-white">{playerNames.player1}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-white">{playerNames.player2}</span>
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors.player2 }}
          />
        </div>
      </div>

      {!winner && (
        <div className="text-center text-lg font-medium text-white mt-4">
          Current Turn: {currentPlayer === 1 ? playerNames.player1 : playerNames.player2}
        </div>
      )}
    </>
  );
};

export default PlayerInfo;