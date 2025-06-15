import { useState, useEffect, useCallback } from 'react';
import { TimerState } from '../types';

const FOCUS_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes

export const useTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    mode: 'focus',
    timeLeft: FOCUS_DURATION,
    isActive: false,
    isCompleted: false,
    focusDuration: FOCUS_DURATION,
    breakDuration: BREAK_DURATION,
    longBreakDuration: LONG_BREAK_DURATION,
    sessionsCompleted: 0,
  });

  const playNotificationSound = useCallback(() => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmoeAS1+ww==');
    audio.play().catch(() => {
      // Fallback for browsers that don't allow autoplay
      console.log('Could not play notification sound');
    });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState.isActive && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (timerState.timeLeft === 0 && timerState.isActive) {
      playNotificationSound();
      setTimerState(prev => ({
        ...prev,
        isActive: false,
        isCompleted: true,
      }));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isActive, timerState.timeLeft, playNotificationSound]);

  const startTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isActive: true,
      isCompleted: false,
    }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isActive: false,
      isCompleted: false,
      timeLeft: prev.mode === 'focus' 
        ? prev.focusDuration 
        : prev.mode === 'break' 
        ? prev.breakDuration 
        : prev.longBreakDuration,
    }));
  }, []);

  const switchMode = useCallback((mode: 'focus' | 'break' | 'longBreak') => {
    const duration = mode === 'focus' 
      ? timerState.focusDuration 
      : mode === 'break' 
      ? timerState.breakDuration 
      : timerState.longBreakDuration;

    setTimerState(prev => ({
      ...prev,
      mode,
      timeLeft: duration,
      isActive: false,
      isCompleted: false,
      sessionsCompleted: mode === 'focus' && prev.mode !== 'focus' 
        ? prev.sessionsCompleted + 1 
        : prev.sessionsCompleted,
    }));
  }, [timerState.focusDuration, timerState.breakDuration, timerState.longBreakDuration]);

  const updateDuration = useCallback((type: 'focus' | 'break' | 'longBreak', duration: number) => {
    setTimerState(prev => ({
      ...prev,
      [`${type}Duration`]: duration,
      timeLeft: prev.mode === type ? duration : prev.timeLeft,
    }));
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    updateDuration,
    formatTime,
  };
};