import React, { useState } from 'react';
import { Swords, Trophy, Timer } from 'lucide-react';

interface MatchmakingProps {
  onBack: () => void;
  onModeSelect: (mode: 'ranked' | 'casual') => void;
}

const Matchmaking: React.FC<MatchmakingProps> = ({ onBack, onModeSelect }) => {
  const [searching, setSearching] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'ranked' | 'casual' | null>(null);

  const handleModeSelect = (mode: 'ranked' | 'casual') => {
    setSelectedMode(mode);
    setSearching(true);
    onModeSelect(mode);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Online Matchmaking</h3>
        {!searching && (
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
          >
            Back
          </button>
        )}
      </div>

      {searching ? (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Searching for opponent...
              </h4>
              <p className="text-white/60">
                {selectedMode === 'ranked' 
                  ? 'Finding a player of similar rank...'
                  : 'Looking for a casual match...'}
              </p>
            </div>
            <button
              onClick={() => setSearching(false)}
              className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleModeSelect('ranked')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 
              transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex flex-col items-center space-y-4">
              <Trophy className="w-12 h-12 text-yellow-500" />
              <h4 className="text-xl font-semibold">Ranked Mode</h4>
              <p className="text-sm text-white/80 text-center">
                Compete for ranking points and climb the leaderboard
              </p>
            </div>
          </button>

          <button
            onClick={() => handleModeSelect('casual')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 
              transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex flex-col items-center space-y-4">
              <Swords className="w-12 h-12 text-blue-500" />
              <h4 className="text-xl font-semibold">Casual Mode</h4>
              <p className="text-sm text-white/80 text-center">
                Play relaxed matches without affecting your rank
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Matchmaking;