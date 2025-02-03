/*
  # Create multiplayer games table and functions

  1. New Tables
    - `games`
      - `id` (uuid, primary key)
      - `room_code` (text, unique)
      - `player1_id` (uuid, references profiles)
      - `player2_id` (uuid, references profiles, nullable)
      - `current_player` (smallint)
      - `board` (jsonb)
      - `status` (text)
      - `winner` (smallint, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Functions
    - `make_move`: Handles game moves with validation
*/

CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code text UNIQUE NOT NULL,
  player1_id uuid REFERENCES profiles(id) NOT NULL,
  player2_id uuid REFERENCES profiles(id),
  current_player smallint NOT NULL DEFAULT 1,
  board jsonb NOT NULL DEFAULT '[[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]]',
  status text NOT NULL DEFAULT 'waiting',
  winner smallint,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Players can read their own games
CREATE POLICY "Players can read own games"
  ON games
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = player1_id OR 
    auth.uid() = player2_id
  );

-- Function to make a move
CREATE OR REPLACE FUNCTION make_move(
  p_game_id uuid,
  p_column integer,
  p_player smallint
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_board jsonb;
  v_row integer;
BEGIN
  -- Get current board
  SELECT board INTO v_board
  FROM games
  WHERE id = p_game_id;

  -- Find lowest empty row
  SELECT 5 - row_number() INTO v_row
  FROM jsonb_array_elements(v_board) WITH ORDINALITY arr(row, rn)
  WHERE row->p_column IS NULL
  ORDER BY rn DESC
  LIMIT 1;

  -- Update board
  UPDATE games
  SET 
    board = jsonb_set(
      board,
      array[v_row::text, p_column::text],
      to_jsonb(p_player)
    ),
    current_player = CASE WHEN p_player = 1 THEN 2 ELSE 1 END,
    updated_at = now()
  WHERE id = p_game_id;
END;
$$;