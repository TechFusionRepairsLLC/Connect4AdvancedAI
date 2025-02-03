export type Theme = 
  | 'classic'
  | 'neon'
  | 'retro'
  | 'galaxy'
  | 'cyberpunk'
  | 'nature'
  | 'ocean'
  | 'sunset'
  | 'midnight'
  | 'volcanic';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Tab = 'solo' | 'multiplayer' | 'leaderboard' | 'profile' | 'settings' | 'customize' | 'about';

export type Player = 1 | 2;

export type CellValue = Player | null;

export type Board = CellValue[][];

export interface GameSettings {
  backgroundMusicVolume: number;
  soundEffectsVolume: number;
  enableAnimations: boolean;
  enablePowerUps: boolean;
  boardSize: {
    rows: number;
    cols: number;
  };
  winCondition: number;
}

export interface GameState {
  settings: GameSettings;
  currentTheme: Theme;
  difficulty: Difficulty;
}

export interface GameColors {
  player1: string;
  player2: string;
  board: string;
}

export interface PlayerNames {
  player1: string;
  player2: string;
}