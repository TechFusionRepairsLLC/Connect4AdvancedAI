import React from 'react';
import { UserProfile } from '../../types/game';
import { Trophy } from 'lucide-react';

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white">{profile.username}</h3>
          <p className="text-white/60">{profile.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-white/80">Rank: {profile.rank}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;