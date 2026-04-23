/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface TimerProps {
  initialSeconds: number;
  onFinish: () => void;
  accentColor: string;
}

export function Timer({ initialSeconds, onFinish, accentColor }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSeconds(initialSeconds);
    setIsActive(false);
  }, [initialSeconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      onFinish();
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, seconds, onFinish]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress relative to initial seconds
  const progress = (seconds / initialSeconds);
  const circumference = 2 * Math.PI * 198; // r="198"

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-[380px] h-[380px] md:w-[420px] md:h-[420px] rounded-full border-[12px] border-white shadow-2xl flex items-center justify-center bg-white">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="47%"
            fill="transparent"
            stroke="#FED7AA"
            strokeWidth="12"
            opacity="0.3"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="47%"
            fill="transparent"
            stroke={accentColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            transition={{ duration: 1, ease: "linear" }}
            strokeLinecap="round"
          />
        </svg>

        <div className="text-center z-10">
          <span className="text-7xl md:text-8xl font-black tracking-tighter text-stone-900 tabular-nums">
            {formatTime(seconds)}
          </span>
          <p style={{ color: accentColor }} className="font-bold uppercase tracking-[0.3em] text-[10px] mt-2 opacity-80">
            Celestial Focus
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-12">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#f5f5f4' }}
          whileTap={{ scale: 0.9 }}
          onClick={resetTimer}
          className="w-16 h-16 rounded-full border-2 border-stone-100 flex items-center justify-center text-stone-400 bg-white transition-colors shadow-sm"
        >
          <RotateCcw size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          style={{ backgroundColor: accentColor }}
          className="w-24 h-24 rounded-full shadow-lg shadow-orange-100 flex items-center justify-center text-white transition-transform"
        >
          {isActive ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#f5f5f4' }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-full border-2 border-stone-100 flex items-center justify-center text-stone-400 bg-white transition-colors shadow-sm"
        >
          <RotateCcw size={20} className="rotate-180 opacity-20" />
        </motion.button>
      </div>
    </div>
  );
}
