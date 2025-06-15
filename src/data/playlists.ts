import { Playlist } from '../types';

export const playlists: Playlist[] = [
  {
    id: 'lofi',
    name: 'Lo-Fi Hip Hop',
    description: 'Relaxing beats for deep focus',
    color: 'from-purple-400 to-pink-400',
    icon: 'Music',
    tracks: [
      {
        id: 'lofi-1',
        title: 'Midnight Study',
        artist: 'Chill Beats',
        duration: 180,
        url: 'https://cdn.pixabay.com/audio/2022/10/30/audio_0c8e6d9d07.mp3', // real lo-fi
      },
      {
        id: 'lofi-2',
        title: 'Coffee Shop Vibes',
        artist: 'Focus Sounds',
        duration: 200,
        url: 'https://cdn.pixabay.com/audio/2022/08/15/audio_ea02967138.mp3',
      },
    ],
  },
  {
    id: 'nature',
    name: 'Nature Sounds',
    description: 'Peaceful natural ambience',
    color: 'from-green-400 to-blue-400',
    icon: 'TreePine',
    tracks: [
      {
        id: 'nature-1',
        title: 'Forest Rain',
        artist: 'Nature Sounds',
        duration: 300,
        url: 'https://cdn.pixabay.com/audio/2023/02/02/audio_f93b8ce9b1.mp3',
      },
      {
        id: 'nature-2',
        title: 'Ocean Waves',
        artist: 'Nature Sounds',
        duration: 280,
        url: 'https://cdn.pixabay.com/audio/2022/03/16/audio_0b2e68de0e.mp3',
      },
    ],
  },
  {
    id: 'ambient',
    name: 'Ambient',
    description: 'Atmospheric soundscapes',
    color: 'from-indigo-400 to-purple-400',
    icon: 'Waves',
    tracks: [
      {
        id: 'ambient-1',
        title: 'Deep Space',
        artist: 'Ambient Collective',
        duration: 240,
        url: 'https://cdn.pixabay.com/audio/2021/09/01/audio_7607cfc14e.mp3',
      },
      {
        id: 'ambient-2',
        title: 'Ethereal Dreams',
        artist: 'Soundscape Artists',
        duration: 260,
        url: 'https://cdn.pixabay.com/audio/2022/03/22/audio_65e0a1fdd4.mp3',
      },
    ],
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    description: 'Consistent background noise',
    color: 'from-gray-400 to-gray-600',
    icon: 'Volume2',
    tracks: [
      {
        id: 'white-1',
        title: 'Pink Noise',
        artist: 'Focus Generator',
        duration: 600,
        url: 'https://cdn.pixabay.com/audio/2021/08/08/audio_13fa3c83a2.mp3',
      },
      {
        id: 'white-2',
        title: 'Brown Noise',
        artist: 'Focus Generator',
        duration: 600,
        url: 'https://cdn.pixabay.com/audio/2021/10/07/audio_4b30aeab97.mp3',
      },
    ],
  },
];
