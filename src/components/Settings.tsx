import React from 'react';
import { Settings2 } from 'lucide-react';
import { GameColors, Difficulty, GameMode, PlayerNames } from '../types/game';

interface SettingsProps {
  colors: GameColors;
  setColors: (colors: GameColors) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  playerNames: PlayerNames;
  setPlayerNames: (names: PlayerNames) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({
  colors,
  setColors,
  difficulty,
  setDifficulty,
  gameMode,
  setGameMode,
  playerNames,
  setPlayerNames,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <Settings2 className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Game Mode</label>
              <select
                value={gameMode}
                onChange={(e) => setGameMode(e.target.value as GameMode)}
                className="w-full p-2 border rounded"
              >
                <option value="singleplayer">Single Player</option>
                <option value="multiplayer">Multiplayer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Player 1 Name</label>
              <input
                type="text"
                value={playerNames.player1}
                onChange={(e) =>
                  setPlayerNames({ ...playerNames, player1: e.target.value })
                }
                className="w-full p-2 border rounded"
                maxLength={20}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {gameMode === 'singleplayer' ? 'Computer' : 'Player 2'} Name
              </label>
              <input
                type="text"
                value={playerNames.player2}
                onChange={(e) =>
                  setPlayerNames({ ...playerNames, player2: e.target.value })
                }
                className="w-full p-2 border rounded"
                maxLength={20}
                disabled={gameMode === 'singleplayer'}
              />
            </div>

            {gameMode === 'singleplayer' && (
              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full p-2 border rounded"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Player 1 Color</label>
              <input
                type="color"
                value={colors.player1}
                onChange={(e) =>
                  setColors({ ...colors, player1: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Player 2 Color</label>
              <input
                type="color"
                value={colors.player2}
                onChange={(e) =>
                  setColors({ ...colors, player2: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Board Color</label>
              <input
                type="color"
                value={colors.board}
                onChange={(e) =>
                  setColors({ ...colors, board: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;