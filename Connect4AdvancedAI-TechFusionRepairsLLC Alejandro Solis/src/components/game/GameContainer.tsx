import React from 'react';
import SoloTab from '../tabs/SoloTab';
import MultiplayerTab from '../tabs/MultiplayerTab';
import LeaderboardTab from '../tabs/LeaderboardTab';
import ProfileTab from '../tabs/ProfileTab';
import SettingsTab from '../tabs/SettingsTab';
import CustomizeTab from '../tabs/CustomizeTab';
import { Tab, GameState } from '../../types/game';
import { useCustomization } from '../../hooks/useCustomization';

interface GameContainerProps {
  activeTab: Tab;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const GameContainer: React.FC<GameContainerProps> = ({
  activeTab,
  gameState,
  setGameState,
}) => {
  const { currentTheme, colors, updateTheme, updateColors } = useCustomization();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'solo':
        return (
          <SoloTab
            onStartGame={(difficulty) => {
              setGameState((prev) => ({ ...prev, difficulty }));
            }}
            colors={colors}
            theme={currentTheme}
          />
        );
      case 'multiplayer':
        return <MultiplayerTab colors={colors} theme={currentTheme} />;
      case 'leaderboard':
        return <LeaderboardTab />;
      case 'profile':
        return <ProfileTab />;
      case 'settings':
        return (
          <SettingsTab
            settings={gameState.settings}
            onSettingsChange={(settings) => {
              setGameState((prev) => ({ ...prev, settings }));
            }}
          />
        );
      case 'customize':
        return (
          <CustomizeTab
            currentTheme={currentTheme}
            colors={colors}
            onThemeChange={updateTheme}
            onColorsChange={updateColors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
      {renderActiveTab()}
    </div>
  );
};

export default GameContainer;