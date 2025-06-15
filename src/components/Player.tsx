import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { Playlist, Track } from '../types';

interface PlayerProps {
  playlist: Playlist | null;
}

const Player: React.FC<PlayerProps> = ({ playlist }) => {
  const {
    playerState,
    playTrack,
    togglePlayPause,
    setVolume,
    nextTrack,
    previousTrack,
  } = useAudio();

  const handleTrackSelect = (track: Track) => {
    if (playlist) {
      playTrack(track, playlist);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
  };

  if (!playlist) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-700 text-center shadow-xl">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
            <Volume2 className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Choose Your Focus Sound
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Select a playlist above to start playing music
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 space-y-6 animate-slide-up shadow-xl">
      {/* Current Track Info */}
      {playerState.currentTrack && (
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {playerState.currentTrack.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {playerState.currentTrack.artist}
          </p>
        </div>
      )}

      {/* Playback Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={previousTrack}
          disabled={!playerState.currentTrack}
          className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        
        <button
          onClick={togglePlayPause}
          disabled={!playerState.currentTrack}
          className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          {playerState.isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        
        <button
          onClick={nextTrack}
          disabled={!playerState.currentTrack}
          className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3 px-4">
        <VolumeX className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={playerState.volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <Volume2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>

      {/* Track List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-800 dark:text-gray-200">
            {playlist.name}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {playlist.tracks.length} tracks
          </span>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {playlist.tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(track)}
              className={`w-full p-3 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] ${
                playerState.currentTrack?.id === track.id
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-200 dark:border-blue-700'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                    {track.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {track.artist}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500 ml-2 flex-shrink-0">
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Player;