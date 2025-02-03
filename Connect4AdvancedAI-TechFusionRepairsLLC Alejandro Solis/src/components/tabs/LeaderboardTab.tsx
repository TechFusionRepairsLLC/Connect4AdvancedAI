import React, { useEffect, useState } from 'react';
import { Trophy, TrendingUp, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar_url: string;
  wins: number;
  losses: number;
  rank: number;
  rating: number;
}

const LeaderboardTab: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, wins, losses, rank, rating')
        .order('rating', { ascending: false })
        .limit(100);

      if (data) {
        setEntries(data);
      }
      setLoading(false);
    };

    // Initial fetch
    fetchLeaderboard();

    // Subscribe to changes
    const subscription = supabase
      .channel('leaderboard_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        fetchLeaderboard();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const filteredEntries = entries.filter(entry =>
    entry.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Trophy className="w-8 h-8 mr-2 text-yellow-400" />
          Global Leaderboard
        </h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          type="text"
          placeholder="Search players..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 text-white rounded-lg pl-10 pr-4 py-2 placeholder-white/60"
        />
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-white/10 font-semibold text-white">
          <div className="col-span-2">Player</div>
          <div className="text-center">Rating</div>
          <div className="text-center">W/L</div>
          <div className="text-center">Win Rate</div>
          <div className="text-center">Rank</div>
        </div>

        <div className="divide-y divide-white/10">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-white/5">
              <div className="col-span-2 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={entry.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.username}`} 
                    alt={entry.username} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="font-medium text-white">{entry.username}</div>
              </div>
              <div className="text-center text-white">
                <div className="font-medium">{entry.rating}</div>
                <div className="text-sm text-white/60">ELO</div>
              </div>
              <div className="text-center text-white">
                {entry.wins}/{entry.losses}
              </div>
              <div className="text-center text-white">
                {entry.wins + entry.losses > 0
                  ? ((entry.wins / (entry.wins + entry.losses)) * 100).toFixed(1)
                  : '0.0'}%
              </div>
              <div className="text-center">
                <span className="px-2 py-1 rounded bg-white/10 text-white">
                  #{entry.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTab;