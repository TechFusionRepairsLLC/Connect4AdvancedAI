import React from 'react';
import { Volume2, HelpCircle } from 'lucide-react';
import { GameSettings } from '../../types/game';

interface SettingsTabProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onSettingsChange }) => {
  const handleChange = (key: keyof GameSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Game Settings</h2>

      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Volume2 className="w-6 h-6 mr-2" />
            Audio
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Background Music
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.backgroundMusicVolume}
                onChange={(e) => handleChange('backgroundMusicVolume', Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Sound Effects
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.soundEffectsVolume}
                onChange={(e) => handleChange('soundEffectsVolume', Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <HelpCircle className="w-6 h-6 mr-2" />
            Game Rules
          </h3>
          <div className="prose prose-invert max-w-none">
            <h4 className="text-lg font-medium text-white">How to Play</h4>
            <ul className="list-disc pl-5 text-white/80 space-y-2">
              <li>Players take turns dropping colored discs into a seven-column, six-row grid</li>
              <li>The pieces fall straight down, occupying the lowest available space within the column</li>
              <li>The objective is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs</li>
              <li>If the board fills up before either player achieves four in a row, then the game is a draw</li>
            </ul>
            
            <h4 className="text-lg font-medium text-white mt-4">Winning Conditions</h4>
            <ul className="list-disc pl-5 text-white/80 space-y-2">
              <li>Connect four of your colored discs in a row horizontally (→)</li>
              <li>Connect four of your colored discs in a row vertically (↓)</li>
              <li>Connect four of your colored discs in a row diagonally (↘ or ↙)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;