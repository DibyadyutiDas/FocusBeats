import React from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

const Timer: React.FC = () => {
  const {
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    formatTime,
  } = useTimer();

  const progress = timerState.mode === 'focus' 
    ? ((timerState.focusDuration - timerState.timeLeft) / timerState.focusDuration) * 100
    : timerState.mode === 'break'
    ? ((timerState.breakDuration - timerState.timeLeft) / timerState.breakDuration) * 100
    : ((timerState.longBreakDuration - timerState.timeLeft) / timerState.longBreakDuration) * 100;

  const modeColors = {
    focus: 'from-blue-500 to-indigo-500',
    break: 'from-green-500 to-emerald-500',
    longBreak: 'from-purple-500 to-pink-500',
  };

  const modeNames = {
    focus: 'Focus Time',
    break: 'Short Break',
    longBreak: 'Long Break',
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 animate-slide-up shadow-xl">
      <div className="text-center space-y-6">
        {/* Mode Selector */}
        <div className="flex justify-center">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1 space-x-1">
            {(['focus', 'break', 'longBreak'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => switchMode(mode)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  timerState.mode === mode
                    ? `bg-gradient-to-r ${modeColors[mode]} text-white shadow-lg`
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {mode === 'longBreak' ? 'Long' : modeNames[mode].split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="relative">
          <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto relative">
            {/* Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${progress * 2.827} 282.7`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={timerState.mode === 'focus' ? 'text-blue-500' : timerState.mode === 'break' ? 'text-green-500' : 'text-purple-500'} stopColor="currentColor" />
                  <stop offset="100%" className={timerState.mode === 'focus' ? 'text-indigo-500' : timerState.mode === 'break' ? 'text-emerald-500' : 'text-pink-500'} stopColor="currentColor" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Timer Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">
                  {formatTime(timerState.timeLeft)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {modeNames[timerState.mode]}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={resetTimer}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          <button
            onClick={timerState.isActive ? pauseTimer : startTimer}
            className={`p-4 rounded-2xl bg-gradient-to-r ${modeColors[timerState.mode]} text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}
          >
            {timerState.isActive ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          
          <button
            onClick={() => {/* Add settings functionality */}}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
          >
            <Clock className="w-5 h-5" />
          </button>
        </div>

        {/* Session Counter */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Sessions: {timerState.sessionsCompleted}</span>
          </div>
        </div>

        {/* Completion Message */}
        {timerState.isCompleted && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl">
            <p className="text-green-800 dark:text-green-200 font-medium text-sm">
              {timerState.mode === 'focus' ? '🎉 Great work! Time for a break.' : '✨ Break time is over. Ready to focus?'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;