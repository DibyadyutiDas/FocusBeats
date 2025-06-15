import React, { useState } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import PlaylistSelector from './components/PlaylistSelector';
import Player from './components/Player';
import Timer from './components/Timer';
import { Playlist } from './types';

function App() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  return (
    <div className="min-h-screen relative">
      <Background />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 pb-12 space-y-6 sm:space-y-8">
          {/* Pomodoro Timer - Featured at Top */}
          <div className="flex justify-center animate-fade-in">
            <div className="w-full max-w-md">
              <Timer />
            </div>
          </div>

          {/* Playlist Selection */}
          <div className="animate-fade-in">
            <PlaylistSelector
              selectedPlaylist={selectedPlaylist}
              onPlaylistSelect={setSelectedPlaylist}
            />
          </div>

          {/* Music Player - Full Width */}
          <div className="animate-fade-in">
            <Player playlist={selectedPlaylist} />
          </div>

          {/* Tips Section */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              💡 Focus Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">🎯</span>
                <p>Use the Pomodoro technique: 25 minutes focused work, 5 minute breaks</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">🌿</span>
                <p>Choose nature sounds for deeper concentration and stress relief</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-purple-500">🎵</span>
                <p>Lo-fi and ambient music help maintain focus without being distracting</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;