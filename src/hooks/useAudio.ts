import { useState, useEffect, useRef, useCallback } from 'react';
import { PlayerState, Track, Playlist } from '../types';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    currentPlaylist: null,
    isPlaying: false,
    volume: 0.7,
    currentTime: 0,
    duration: 0,
  });

  useEffect(() => {
    if (playerState.currentTrack) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(playerState.currentTrack.url);
      audioRef.current.volume = playerState.volume;
      audioRef.current.loop = true;

      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setPlayerState(prev => ({
            ...prev,
            currentTime: audioRef.current!.currentTime,
          }));
        }
      };

      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setPlayerState(prev => ({
            ...prev,
            duration: audioRef.current!.duration,
          }));
        }
      };

      const handleEnded = () => {
        setPlayerState(prev => ({
          ...prev,
          isPlaying: false,
        }));
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [playerState.currentTrack, playerState.volume]);

  const playTrack = useCallback((track: Track, playlist: Playlist) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      currentPlaylist: playlist,
      isPlaying: true,
    }));
  }, []);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (playerState.isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      
      setPlayerState(prev => ({
        ...prev,
        isPlaying: !prev.isPlaying,
      }));
    }
  }, [playerState.isPlaying]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    
    setPlayerState(prev => ({
      ...prev,
      volume,
    }));
  }, []);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const nextTrack = useCallback(() => {
    if (playerState.currentPlaylist && playerState.currentTrack) {
      const currentIndex = playerState.currentPlaylist.tracks.findIndex(
        track => track.id === playerState.currentTrack!.id
      );
      const nextIndex = (currentIndex + 1) % playerState.currentPlaylist.tracks.length;
      const nextTrack = playerState.currentPlaylist.tracks[nextIndex];
      
      playTrack(nextTrack, playerState.currentPlaylist);
    }
  }, [playerState.currentPlaylist, playerState.currentTrack, playTrack]);

  const previousTrack = useCallback(() => {
    if (playerState.currentPlaylist && playerState.currentTrack) {
      const currentIndex = playerState.currentPlaylist.tracks.findIndex(
        track => track.id === playerState.currentTrack!.id
      );
      const prevIndex = currentIndex === 0 
        ? playerState.currentPlaylist.tracks.length - 1 
        : currentIndex - 1;
      const prevTrack = playerState.currentPlaylist.tracks[prevIndex];
      
      playTrack(prevTrack, playerState.currentPlaylist);
    }
  }, [playerState.currentPlaylist, playerState.currentTrack, playTrack]);

  return {
    playerState,
    playTrack,
    togglePlayPause,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
  };
};