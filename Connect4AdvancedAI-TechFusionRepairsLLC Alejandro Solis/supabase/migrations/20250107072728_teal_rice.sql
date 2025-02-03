/*
  # Add profile statistics columns
  
  1. New Columns
    - `wins` (integer) - Number of games won
    - `losses` (integer) - Number of games lost  
    - `rank` (integer) - Player's current rank
    - `rating` (integer) - Player's ELO rating
    - `win_streak` (integer) - Current win streak
*/

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS wins integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS losses integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS rank integer DEFAULT 1000,
ADD COLUMN IF NOT EXISTS rating integer DEFAULT 1000,
ADD COLUMN IF NOT EXISTS win_streak integer DEFAULT 0;