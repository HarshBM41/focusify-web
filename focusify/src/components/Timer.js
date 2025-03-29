"use client";

import { useState, useEffect, useRef } from 'react';
import { FaClock, FaTimes, FaSyncAlt, FaCoffee, FaPlay, FaPause, FaUndo } from 'react-icons/fa';

export default function Timer() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [breakDuration, setBreakDuration] = useState(5); // Default 5 minute break
  const [customMinutes, setCustomMinutes] = useState('25');
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [cycles, setCycles] = useState(0);
  const countdownRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      countdownRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdownRef.current);
            
            // Handle timer completion
            if (isRecurring) {
              if (isBreakTime) {
                // Break is over, start work session
                setIsBreakTime(false);
                setCycles(prev => prev + 1);
                notifyTimerEnd('Break time is over! Back to work.');
                return 25 * 60; // Default back to 25 mins work session
              } else {
                // Work session is over, start break
                setIsBreakTime(true);
                notifyTimerEnd('Work session complete! Time for a break.');
                return breakDuration * 60;
              }
            } else {
              setIsActive(false);
              notifyTimerEnd('Timer complete!');
              return 0;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(countdownRef.current);
    }

    return () => clearInterval(countdownRef.current);
  }, [isActive, isPaused, isRecurring, isBreakTime, breakDuration]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    clearInterval(countdownRef.current);
    setIsActive(false);
    setIsPaused(false);
    setIsBreakTime(false);
    setCycles(0);
    setTime(parseInt(customMinutes, 10) * 60 || 25 * 60);
  };

  const setPresetTime = (minutes) => {
    setTime(minutes * 60);
    setCustomMinutes(minutes.toString());
    setIsActive(false);
    setIsPaused(false);
    setIsBreakTime(false);
  };
  
  const handleCustomTimeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomMinutes(value);
    }
  };

  const applyCustomTime = () => {
    const minutes = parseInt(customMinutes, 10) || 25;
    setTime(minutes * 60);
    setIsActive(false);
    setIsPaused(false);
    setIsBreakTime(false);
  };

  const toggleRecurring = () => {
    setIsRecurring(!isRecurring);
  };

  const notifyTimerEnd = (message = 'Your focus session has ended.') => {
    // Play sound if browser supports it
    try {
      // Check if notification sound exists at the public directory
      const audio = new Audio('/notification.mp3');
      audio.play().catch(err => {
        console.log('Error playing audio:', err);
      });
    } catch (error) {
      console.log('Audio notification not supported');
    }
    
    // Show browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Focusify Timer', {
        body: message,
        icon: '/favicon.ico'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle Timer">
        <FaClock size={24} />
      </button>

      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            {isBreakTime ? <FaCoffee className="mr-2" /> : <FaClock className="mr-2" />}
            {isBreakTime ? 'Break Time' : 'Pomodoro Timer'}
            {isRecurring && <FaSyncAlt className="ml-2 text-[var(--accent-color)] text-sm" />}
          </h2>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="timer-container">
          {isRecurring && cycles > 0 && (
            <div className="mb-2 text-sm text-[var(--accent-color)]">
              Cycle: {cycles} {isBreakTime ? '(Break)' : '(Focus)'}
            </div>
          )}
          
          <div className={`timer-display ${isBreakTime ? 'text-[var(--accent-color)]' : 'text-white'}`}>
            {formatTime(time)}
          </div>

          <div className="timer-buttons">
            {!isActive ? (
              <button onClick={startTimer} className="timer-btn start-btn flex items-center gap-2">
                <FaPlay size={14} /> Start
              </button>
            ) : isPaused ? (
              <button onClick={resumeTimer} className="timer-btn start-btn flex items-center gap-2">
                <FaPlay size={14} /> Resume
              </button>
            ) : (
              <button onClick={pauseTimer} className="timer-btn pause-btn flex items-center gap-2">
                <FaPause size={14} /> Pause
              </button>
            )}
            <button onClick={resetTimer} className="timer-btn reset-btn flex items-center gap-2">
              <FaUndo size={14} /> Reset
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={toggleRecurring}
                className="mr-2"
              />
              <span>Recurring Mode</span>
              {isRecurring && (
                <span className="ml-2 text-xs text-gray-400">
                  (Automatically alternates between work and break)
                </span>
              )}
            </label>
            
            {isRecurring && (
              <div className="mb-4">
                <label className="block text-sm mb-1">Break Duration (minutes):</label>
                <div className="flex justify-center gap-2">
                  <button 
                    onClick={() => setBreakDuration(5)} 
                    className={`px-3 py-1 text-sm rounded ${breakDuration === 5 ? 'bg-[var(--accent-color)]' : 'bg-[#444]'}`}>
                    5
                  </button>
                  <button 
                    onClick={() => setBreakDuration(10)} 
                    className={`px-3 py-1 text-sm rounded ${breakDuration === 10 ? 'bg-[var(--accent-color)]' : 'bg-[#444]'}`}>
                    10
                  </button>
                  <button 
                    onClick={() => setBreakDuration(15)} 
                    className={`px-3 py-1 text-sm rounded ${breakDuration === 15 ? 'bg-[var(--accent-color)]' : 'bg-[#444]'}`}>
                    15
                  </button>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm mb-1">Custom Time (minutes):</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customMinutes}
                  onChange={handleCustomTimeChange}
                  className="w-20 px-2 py-1 bg-[#333] rounded text-center"
                />
                <button 
                  onClick={applyCustomTime}
                  className="bg-[#444] hover:bg-[#555] px-3 py-1 rounded text-sm">
                  Set
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Preset Timers:</h3>
            <div className="flex flex-wrap justify-center">
              <button onClick={() => setPresetTime(5)} className="preset-btn">5 min</button>
              <button onClick={() => setPresetTime(15)} className="preset-btn">15 min</button>
              <button onClick={() => setPresetTime(25)} className="preset-btn">25 min</button>
              <button onClick={() => setPresetTime(50)} className="preset-btn">50 min</button>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-300">
            <p>The Pomodoro Technique is a time management method that uses a timer to break work into intervals, 
            traditionally 25 minutes in length, separated by short breaks.</p>
          </div>
        </div>
      </div>
    </>
  );
}
