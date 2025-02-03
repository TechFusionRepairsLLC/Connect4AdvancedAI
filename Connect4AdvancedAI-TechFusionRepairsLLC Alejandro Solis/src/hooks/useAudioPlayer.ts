import { useRef, useEffect, useCallback } from 'react';
import { AUDIO_SOURCES } from '../constants/audio';

export const useAudioPlayer = (initialVolume = 70) => {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
  const currentMusicRef = useRef<HTMLAudioElement | null>(null);

  const preloadAudio = useCallback(async () => {
    // Preload background music
    for (const music of AUDIO_SOURCES.backgroundMusic) {
      const audio = new Audio();
      audio.src = music.url;
      audio.preload = 'auto';
      audio.volume = initialVolume / 100;
      audioCache.current.set(music.name, audio);
    }

    // Preload sound effects
    for (const [key, url] of Object.entries(AUDIO_SOURCES.soundEffects)) {
      const audio = new Audio();
      audio.src = url;
      audio.preload = 'auto';
      audio.volume = initialVolume / 100;
      audioCache.current.set(key, audio);
    }
  }, [initialVolume]);

  useEffect(() => {
    preloadAudio();
    return () => {
      currentMusicRef.current?.pause();
      audioCache.current.clear();
    };
  }, [preloadAudio]);

  const playMusic = useCallback((name: string) => {
    const audio = audioCache.current.get(name);
    if (audio) {
      if (currentMusicRef.current && currentMusicRef.current !== audio) {
        currentMusicRef.current.pause();
      }
      audio.loop = true;
      audio.play().catch(() => {
        console.log('Music playback prevented - waiting for user interaction');
      });
      currentMusicRef.current = audio;
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (currentMusicRef.current) {
      currentMusicRef.current.pause();
      currentMusicRef.current = null;
    }
  }, []);

  const playSound = useCallback((name: keyof typeof AUDIO_SOURCES.soundEffects) => {
    const audio = audioCache.current.get(name);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        console.log('Sound playback prevented - waiting for user interaction');
      });
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const normalizedVolume = volume / 100;
    audioCache.current.forEach(audio => {
      audio.volume = normalizedVolume;
    });
  }, []);

  return {
    playMusic,
    stopMusic,
    playSound,
    setVolume
  };
};