import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useWinStreak = (userId?: string) => {
  const [winStreak, setWinStreak] = useState(0);

  const incrementStreak = async () => {
    setWinStreak(prev => prev + 1);
    
    if (userId) {
      // Update streak in database if user is logged in
      await supabase
        .from('profiles')
        .update({ win_streak: winStreak + 1 })
        .eq('id', userId);
    }
  };

  const resetStreak = async () => {
    setWinStreak(0);
    
    if (userId) {
      await supabase
        .from('profiles')
        .update({ win_streak: 0 })
        .eq('id', userId);
    }
  };

  // Load initial streak from database if user is logged in
  useEffect(() => {
    if (userId) {
      supabase
        .from('profiles')
        .select('win_streak')
        .eq('id', userId)
        .single()
        .then(({ data }) => {
          if (data?.win_streak) {
            setWinStreak(data.win_streak);
          }
        });
    }
  }, [userId]);

  return { winStreak, incrementStreak, resetStreak };
};