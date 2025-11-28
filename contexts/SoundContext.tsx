import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

type SoundType = 'click' | 'correct' | 'wrong' | 'pass' | 'victory' | 'pop';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  const toggleMute = () => setIsMuted(prev => !prev);

  const playTone = (freq: number, type: OscillatorType, duration: number, startTime: number = 0, volume: number = 0.1) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    
    // Increased volume gain (3x boost)
    const boostedVolume = volume * 3;

    gain.gain.setValueAtTime(boostedVolume, ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  };

  const playSound = (type: SoundType) => {
    if (isMuted || !audioCtxRef.current) return;
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(e => console.error(e));
    }

    const ctx = audioCtxRef.current;

    switch (type) {
      case 'click':
        playTone(800, 'sine', 0.05, 0, 0.05);
        break;
      case 'correct':
        playTone(523.25, 'sine', 0.1, 0, 0.1); 
        playTone(659.25, 'sine', 0.1, 0.08, 0.1); 
        break;
      case 'wrong':
        playTone(150, 'sawtooth', 0.2, 0, 0.1);
        playTone(140, 'sawtooth', 0.2, 0.1, 0.1);
        break;
      case 'pass':
        playTone(523.25, 'sine', 0.2, 0, 0.1);
        playTone(659.25, 'sine', 0.2, 0.1, 0.1);
        playTone(783.99, 'sine', 0.4, 0.2, 0.1); 
        break;
      case 'victory':
        const now = 0;
        const v = 0.1;
        playTone(523.25, 'triangle', 0.2, now, v);
        playTone(659.25, 'triangle', 0.2, now + 0.15, v);
        playTone(783.99, 'triangle', 0.2, now + 0.30, v);
        playTone(1046.50, 'triangle', 0.8, now + 0.45, v); 
        break;
      case 'pop':
        // Pop sound for confetti
        playTone(600, 'square', 0.05, 0, 0.15);
        playTone(300, 'sine', 0.1, 0.02, 0.1);
        break;
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};