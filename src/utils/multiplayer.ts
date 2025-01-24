import { supabase } from '../lib/supabase';
import { MultiplayerGame } from '../types/multiplayer';

export const createGame = async (playerId: string): Promise<string> => {
  const roomCode = generateRoomCode();
  
  const { data, error } = await supabase
    .from('games')
    .insert({
      room_code: roomCode,
      player1_id: playerId,
      board: Array(6).fill(Array(7).fill(null)),
      current_player: 1,
      status: 'waiting'
    })
    .select()
    .single();

  if (error) throw error;
  return roomCode;
};

export const joinGame = async (roomCode: string, playerId: string): Promise<string> => {
  const { data, error } = await supabase
    .from('games')
    .update({ 
      player2_id: playerId,
      status: 'playing'
    })
    .eq('room_code', roomCode)
    .eq('status', 'waiting')
    .select()
    .single();

  if (error) throw error;
  return data.id;
};

const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};