import React from 'react';
import { Music, TreePine, Waves, Volume2 } from 'lucide-react';
import { Playlist } from '../types';
import { playlists } from '../data/playlists';

interface PlaylistSelectorProps {
  selectedPlaylist: Playlist | null;
  onPlaylistSelect: (playlist: Playlist) => void;
}

const iconMap = {
  Music,
  TreePine,
  Waves,
  Volume2,
};

const PlaylistSelector: React.FC<PlaylistSelectorProps> = ({
  selectedPlaylist,
  onPlaylistSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center sm:text-left">
        Choose Your Focus Sound
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => {
          const IconComponent = iconMap[playlist.icon as keyof typeof iconMap];
          const isSelected = selectedPlaylist?.id === playlist.id;
          
          return (
            <button
              key={playlist.id}
              onClick={() => onPlaylistSelect(playlist)}
              className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 animate-fade-in ${
                isSelected
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 hover:border-gray-300 dark:hover:border-gray-600'
              } backdrop-blur-sm shadow-xl`}
            >
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${playlist.color} flex-shrink-0`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    {playlist.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {playlist.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {playlist.tracks.length} tracks
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistSelector;