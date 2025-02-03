import { useEffect, useRef } from 'react';
import { gameAudio } from '../utils/audio';

export const useGameAudio = (volume: number) => {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const soundEffectsRef = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    // Initialize background music
    backgroundMusicRef.current = new Audio(gameAudio.backgroundMusic[0].url);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = volume / 100;

    // Initialize sound effects
    Object.entries(gameAudio.soundEffects).forEach(([key, url]) => {
      soundEffectsRef.current[key] = new Audio(url);
      soundEffectsRef.current[key].volume = volume / 100;
    });

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };
  }, []);

  const playSound = (soundName: keyof typeof gameAudio.soundEffects) => {
    const sound = soundEffectsRef.current[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  const toggleBackgroundMusic = (play: boolean) => {
    if (backgroundMusicRef.current) {
      if (play) {
        backgroundMusicRef.current.play();
      } else {
        backgroundMusicRef.current.pause();
      }
    }
  };

  const updateVolume = (newVolume: number) => {
    const volume = newVolume / 100;
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
    }
    Object.values(soundEffectsRef.current).forEach(sound => {
      sound.volume = volume;
    });
  };

  return {
    playSound,
    toggleBackgroundMusic,
    updateVolume
  };
};