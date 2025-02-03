import React, { useState } from 'react';

interface RoomJoinProps {
  onBack: () => void;
  onJoin: (code: string) => void;
}

const RoomJoin: React.FC<RoomJoinProps> = ({ onBack, onJoin }) => {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (roomCode.length !== 6) {
      setError('Room code must be 6 characters');
      return;
    }
    setError('');
    onJoin(roomCode.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Join Room</h3>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
        >
          Back
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Enter Room Code
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-character code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="w-full px-4 py-2 bg-white/5 rounded-lg text-white placeholder-white/50 
              border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        <button
          onClick={handleJoin}
          className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 
            transition-colors font-semibold"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomJoin;