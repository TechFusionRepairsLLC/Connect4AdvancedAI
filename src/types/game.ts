export type Player = 1 | 2;
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'singleplayer' | 'multiplayer';
export type CellValue = Player | null;
export type Board = CellValue[][];

export interface GameColors {
  player1: string;
  player2: string;
  board: string;
}

export interface PlayerNames {
  player1: string;
  player2: string;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  gameMode: GameMode;
  difficulty: Difficulty;
  colors: GameColors;
  playerNames: PlayerNames;
}