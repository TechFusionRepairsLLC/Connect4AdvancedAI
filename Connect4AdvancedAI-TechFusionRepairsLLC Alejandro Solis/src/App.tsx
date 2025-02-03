import React, { useState } from 'react';
import TabMenu from './components/ui/TabMenu';
import GameContainer from './components/game/GameContainer';
import Layout from './components/layout/Layout';
import { Tab, GameState, GameSettings } from './types/game';

const defaultSettings: GameSettings = {
  backgroundMusicVolume: 50,
  soundEffectsVolume: 70,
  enableAnimations: true,
  enablePowerUps: false,
  boardSize: { rows: 6, cols: 7 },
  winCondition: 4
};

const defaultGameState: GameState = {
  settings: defaultSettings,
  currentTheme: 'classic',
  difficulty: 'medium'
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('solo');
  const [gameState, setGameState] = useState<GameState>(defaultGameState);

  return (
    <Layout>
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          TechFusion Repairs LLC Connect4
        </h1>
        <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />
      </header>

      <main className="max-w-6xl mx-auto">
        <GameContainer
          activeTab={activeTab}
          gameState={gameState}
          setGameState={setGameState}
        />
      </main>

      <footer className="max-w-6xl mx-auto mt-8 text-center text-white/60">
        <p>Made by Alejandro X. Solis, TechFusion Repairs LLC</p>
      </footer>
    </Layout>
  );
};

export default App;