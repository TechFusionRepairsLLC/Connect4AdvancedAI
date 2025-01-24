import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface RoomCreationProps {
  onBack: () => void;
}

const RoomCreation: React.FC<RoomCreationProps> = ({ onBack }) => {
  const [roomCode, setRoomCode] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Create Room</h3>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
        >
          Back
        </button>
      </div>

      {!roomCode ? (
        <button
          onClick={generateRoomCode}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 
            transition-colors font-semibold"
        >
          Generate Room Code
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h4 className="text-lg font-medium text-white mb-4">Room Created!</h4>
            <div className="flex items-center space-x-4">
              <div className="bg-white/5 px-4 py-2 rounded-lg flex-grow">
                <p className="text-2xl font-mono text-white text-center">{roomCode}</p>
              </div>
              <button
                onClick={copyRoomCode}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {copied ? (
                  <Check className="w-6 h-6 text-green-500" />
                ) : (
                  <Copy className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <p className="text-lg font-medium text-white">Waiting for opponent...</p>
              </div>
              <p className="text-sm text-white/60">
                Share this code with your friend to start the game
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCreation;