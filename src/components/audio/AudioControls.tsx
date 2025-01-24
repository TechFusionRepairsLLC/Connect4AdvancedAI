import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { AUDIO_SOURCES } from '../../constants/audio';

interface AudioControlsProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  selectedTrack: string;
  onTrackChange: (track: string) => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  volume,
  onVolumeChange,
  isMusicPlaying,
  onToggleMusic,
  selectedTrack,
  onTrackChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Background Music</h3>
        <button
          onClick={onToggleMusic}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
        >
          {isMusicPlaying ? (
            <Volume2 className="w-5 h-5 text-white" />
          ) : (
            <VolumeX className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      <select
        value={selectedTrack}
        onChange={(e) => onTrackChange(e.target.value)}
        className="w-full bg-white/10 text-white rounded-lg px-4 py-2"
      >
        {AUDIO_SOURCES.backgroundMusic.map((track) => (
          <option key={track.name} value={track.name}>
            {track.name}
          </option>
        ))}
      </select>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Volume
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AudioControls;