import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MultiplayerGame } from '../types/multiplayer';
import { useAuth } from './useAuth';

export const useMultiplayerGame = (gameId?: string) => {
  const { user } = useAuth();
  const [game, setGame] = useState<MultiplayerGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId || !user) return;

    // Subscribe to game changes
    const subscription = supabase
      .channel(`game:${gameId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'games',
        filter: `id=eq.${gameId}`,
      }, (payload) => {
        setGame(payload.new as MultiplayerGame);
      })
      .subscribe();

    // Initial game fetch
    const fetchGame = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', gameId)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setGame(data);
      }
      setLoading(false);
    };

    fetchGame();

    return () => {
      subscription.unsubscribe();
    };
  }, [gameId, user]);

  const makeMove = async (col: number) => {
    if (!game || !user) return;

    const playerNumber = game.player1_id === user.id ? 1 : 2;
    if (game.current_player !== playerNumber) return;

    // Update game state
    const { error } = await supabase
      .rpc('make_move', {
        p_game_id: game.id,
        p_column: col,
        p_player: playerNumber
      });

    if (error) {
      setError(error.message);
    }
  };

  return { game, loading, error, makeMove };
};