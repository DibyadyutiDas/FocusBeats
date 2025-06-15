export interface Playlist {
  id: string;
  name: string;
  description: string;
  color: string;
  tracks: Track[];
  icon: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

export interface TimerState {
  mode: 'focus' | 'break' | 'longBreak';
  timeLeft: number;
  isActive: boolean;
  isCompleted: boolean;
  focusDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsCompleted: number;
}

export interface PlayerState {
  currentTrack: Track | null;
  currentPlaylist: Playlist | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}