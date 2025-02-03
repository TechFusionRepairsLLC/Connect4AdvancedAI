import React from 'react';
import { UserProfile } from '../../types/game';
import { Trophy, Target, Percent } from 'lucide-react';

interface ProfileStatsProps {
  profile: UserProfile;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ profile }) => {
  const winRate = ((profile.wins / profile.gamesPlayed) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h4 className="text-lg font-medium text-white">Wins</h4>
        </div>
        <p className="text-3xl font-bold text-white">{profile.wins}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-6 h-6 text-blue-400" />
          <h4 className="text-lg font-medium text-white">Games Played</h4>
        </div>
        <p className="text-3xl font-bold text-white">{profile.gamesPlayed}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <Percent className="w-6 h-6 text-green-400" />
          <h4 className="text-lg font-medium text-white">Win Rate</h4>
        </div>
        <p className="text-3xl font-bold text-white">{winRate}%</p>
      </div>
    </div>
  );
};

export default ProfileStats;