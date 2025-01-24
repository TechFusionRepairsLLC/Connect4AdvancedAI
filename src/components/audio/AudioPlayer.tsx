import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { GameAudio } from '../../types/game';

interface AudioPlayerProps {
  audio: GameAudio;
  onAudioChange: (audio: GameAudio) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio, onAudioChange }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    {
      name: 'Upbeat Game Music',
      url: 'https://example.com/music/upbeat.mp3' // Replace with actual free music URL
    },
    {
      name: 'Relaxing Game Music',
      url: 'https://example.com/music/relaxing.mp3' // Replace with actual free music URL
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audio.backgroundMusic.volume / 100;
      if (audio.backgroundMusic.enabled) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [audio.backgroundMusic]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Background Music</h3>
        <button
          onClick={() => onAudioChange({
            ...audio,
            backgroundMusic: {
              ...audio.backgroundMusic,
              enabled: !audio.backgroundMusic.enabled
            }
          })}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
        >
          {audio.backgroundMusic.enabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>

      <select
        value={audio.backgroundMusic.track}
        onChange={(e) => onAudioChange({
          ...audio,
          backgroundMusic: {
            ...audio.backgroundMusic,
            track: e.target.value
          }
        })}
        className="w-full bg-white/10 text-white rounded-lg px-4 py-2"
      >
        {tracks.map((track) => (
          <option key={track.url} value={track.url}>
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
          value={audio.backgroundMusic.volume}
          onChange={(e) => onAudioChange({
            ...audio,
            backgroundMusic: {
              ...audio.backgroundMusic,
              volume: Number(e.target.value)
            }
          })}
          className="w-full"
        />
      </div>

      <audio
        ref={audioRef}
        src={audio.backgroundMusic.track}
        loop
      />
    </div>
  );
};

export default AudioPlayer;