export type GameStatus = 'waiting' | 'playing' | 'finished';

export interface MultiplayerGame {
  id: string;
  room_code: string;
  player1_id: string;
  player2_id: string | null;
  current_player: 1 | 2;
  board: (1 | 2 | null)[][];
  status: GameStatus;
  winner: 1 | 2 | null;
  created_at: string;
  updated_at: string;
}