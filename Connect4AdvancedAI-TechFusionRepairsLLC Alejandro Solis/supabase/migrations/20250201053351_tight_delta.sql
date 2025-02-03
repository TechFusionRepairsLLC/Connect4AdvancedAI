/*
  # Connect4 Game Schema Setup

  1. New Tables
    - `game_sessions`
      - Tracks active and completed game sessions
      - Stores game state, players, and results
    - `game_moves`
      - Records each move made during a game
      - Enables move history and replay functionality
    - `player_stats`
      - Tracks player statistics and rankings
      - Stores win/loss records and ratings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Game Sessions Table
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  player1_id uuid REFERENCES auth.users(id),
  player2_id uuid REFERENCES auth.users(id),
  current_player smallint DEFAULT 1,
  board jsonb DEFAULT '[[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]]',
  game_mode text DEFAULT 'solo',
  difficulty text DEFAULT 'medium',
  status text DEFAULT 'active',
  winner_id uuid REFERENCES auth.users(id),
  ended_at timestamptz
);

-- Game Moves Table
CREATE TABLE IF NOT EXISTS game_moves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES game_sessions(id) ON DELETE CASCADE,
  player_id uuid REFERENCES auth.users(id),
  column_number smallint NOT NULL,
  row_number smallint NOT NULL,
  move_number smallint NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Player Stats Table
CREATE TABLE IF NOT EXISTS player_stats (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  games_played integer DEFAULT 0,
  wins integer DEFAULT 0,
  losses integer DEFAULT 0,
  draws integer DEFAULT 0,
  rating integer DEFAULT 1000,
  highest_rating integer DEFAULT 1000,
  win_streak integer DEFAULT 0,
  best_win_streak integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_moves ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- Game Sessions Policies
CREATE POLICY "Users can view their own games"
  ON game_sessions
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = player1_id OR 
    auth.uid() = player2_id
  );

CREATE POLICY "Users can create games"
  ON game_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = player1_id);

CREATE POLICY "Players can update their active games"
  ON game_sessions
  FOR UPDATE
  TO authenticated
  USING (
    (auth.uid() = player1_id OR auth.uid() = player2_id) AND
    status = 'active'
  );

-- Game Moves Policies
CREATE POLICY "Users can view moves from their games"
  ON game_moves
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM game_sessions
      WHERE game_sessions.id = game_moves.game_id
      AND (player1_id = auth.uid() OR player2_id = auth.uid())
    )
  );

CREATE POLICY "Players can add moves to active games"
  ON game_moves
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM game_sessions
      WHERE game_sessions.id = game_moves.game_id
      AND (player1_id = auth.uid() OR player2_id = auth.uid())
      AND status = 'active'
    )
  );

-- Player Stats Policies
CREATE POLICY "Users can view any player stats"
  ON player_stats
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own stats"
  ON player_stats
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Functions
CREATE OR REPLACE FUNCTION update_player_stats()
RETURNS trigger AS $$
BEGIN
  -- Update winner stats
  IF NEW.winner_id IS NOT NULL AND OLD.winner_id IS NULL THEN
    UPDATE player_stats
    SET 
      wins = wins + 1,
      games_played = games_played + 1,
      win_streak = win_streak + 1,
      best_win_streak = GREATEST(best_win_streak, win_streak + 1),
      rating = CASE 
        WHEN NEW.game_mode = 'ranked' THEN rating + 25
        ELSE rating
      END,
      highest_rating = GREATEST(
        highest_rating, 
        CASE 
          WHEN NEW.game_mode = 'ranked' THEN rating + 25
          ELSE rating
        END
      ),
      updated_at = now()
    WHERE id = NEW.winner_id;

    -- Update loser stats
    UPDATE player_stats
    SET 
      losses = losses + 1,
      games_played = games_played + 1,
      win_streak = 0,
      rating = CASE 
        WHEN NEW.game_mode = 'ranked' THEN GREATEST(rating - 25, 0)
        ELSE rating
      END,
      updated_at = now()
    WHERE id IN (NEW.player1_id, NEW.player2_id) 
    AND id != NEW.winner_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for updating stats when game ends
CREATE TRIGGER on_game_end
  AFTER UPDATE OF winner_id ON game_sessions
  FOR EACH ROW
  WHEN (OLD.winner_id IS NULL AND NEW.winner_id IS NOT NULL)
  EXECUTE FUNCTION update_player_stats();

-- Function to create initial player stats
CREATE OR REPLACE FUNCTION create_player_stats()
RETURNS trigger AS $$
BEGIN
  INSERT INTO player_stats (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create player stats on user creation
CREATE TRIGGER on_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_player_stats();