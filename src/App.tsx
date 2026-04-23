/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Sun, Cloud, CloudRain, Snowflake, Moon, Zap, Settings, Volume2, Info, Play, Pause } from 'lucide-react';
import { Timer } from './components/Timer';
import { ZodiacSelector } from './components/ZodiacSelector';
import { ZODIAC_SIGNS, POMODORO_PRESETS } from './constants';
import { ZodiacInfo, WeatherType, DailyVibe } from './types';
import { getCurrentWeather } from './services/weatherService';
import { getDailyVibe } from './services/geminiService';

export default function App() {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacInfo | null>(() => {
    const saved = localStorage.getItem('zodiac');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  
  const [weather, setWeather] = useState<{ type: WeatherType; city: string }>({ type: 'sunny', city: '載入中...' });
  const [vibe, setVibe] = useState<DailyVibe>({ quote: '專注於當下的繁星。', vibe: '寧靜' });
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [showSettings, setShowSettings] = useState(!localStorage.getItem('zodiac'));
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initData = async () => {
      const w = await getCurrentWeather();
      setWeather(w);
      if (selectedZodiac) {
        const v = await getDailyVibe(selectedZodiac, w.type);
        setVibe(v);
      }
    };
    initData();
  }, [selectedZodiac]);

  const handleZodiacSelect = (z: ZodiacInfo) => {
    setSelectedZodiac(z);
    localStorage.setItem('zodiac', JSON.stringify(z));
    setShowSettings(false);
  };

  const onTimerFinish = () => {
    if (alarmRef.current) {
      alarmRef.current.currentTime = 0;
      alarmRef.current.play().catch(e => console.error(e));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback error", e));
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  const getWeatherIcon = (type: WeatherType) => {
    switch (type) {
      case 'sunny': return '☀️';
      case 'rainy': return '🌧️';
      case 'snowy': return '❄️';
      case 'cloudy': return '☁️';
      case 'night': return '🌙';
      case 'storm': return '⚡';
      default: return '☀️';
    }
  };

  const accentColor = selectedZodiac?.color || '#F97316';

  return (
    <div className="h-screen w-full bg-[#FFF9F5] flex flex-row overflow-hidden font-sans text-stone-800 transition-colors duration-700">
      {/* Left Sidebar: Context */}
      <aside className="w-80 h-full p-8 flex flex-col gap-6 bg-[#FFEFE6] border-r border-orange-100 relative z-20">
        <div className="flex items-center gap-3 mb-4">
          <div style={{ backgroundColor: accentColor }} className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold transition-colors">P.</div>
          <h1 className="text-xl font-bold tracking-tight text-orange-900">PomoZodiac</h1>
        </div>

        {/* Zodiac Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Your Sign</span>
            <span className="text-3xl">{selectedZodiac?.symbol || '✨'}</span>
          </div>
          <h2 className="text-2xl font-bold text-orange-900">{selectedZodiac?.name || '---'}</h2>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            {selectedZodiac ? `${selectedZodiac.element} 元素正在運行。專注於妳的宇宙呼吸。` : '點擊設定圖示選擇星座。'}
          </p>
        </motion.div>

        {/* Weather Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Environment</span>
            <span className="text-3xl">{getWeatherIcon(weather.type)}</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-800">{weather.city}</h2>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed capitalize">
            {weather.type} • 當前氣候將影響背景氛圍。
          </p>
        </motion.div>

        <div className="mt-auto space-y-4">
          <button 
            onClick={() => setShowSettings(true)}
            className="w-full p-4 bg-orange-100 hover:bg-orange-200 rounded-2xl flex items-center justify-between text-orange-800 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Settings size={18} className="group-hover:rotate-45 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Settings</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content: Timer */}
      <main className="flex-1 h-full flex flex-col items-center justify-center relative bg-white/50">
        {/* Abstract Patterns */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div style={{ backgroundColor: accentColor }} className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-300 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative flex flex-col items-center z-10">
          {/* Mode Tabs */}
          <div className="flex gap-4 mb-12">
            {(Object.keys(POMODORO_PRESETS) as Array<keyof typeof POMODORO_PRESETS>).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  mode === m 
                    ? 'bg-stone-800 text-white shadow-lg' 
                    : 'text-stone-400 hover:text-stone-800 bg-transparent'
                }`}
              >
                {m === 'focus' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
              </button>
            ))}
          </div>

          <Timer 
            initialSeconds={POMODORO_PRESETS[mode]} 
            onFinish={onTimerFinish}
            accentColor={accentColor}
          />
        </div>
      </main>

      {/* Right Sidebar: Vibes & Player */}
      <aside className="w-80 h-full p-8 flex flex-col gap-8 bg-white border-l border-stone-100 z-20">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Daily Guidance</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={vibe.quote}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-[#FFF9F5] p-6 rounded-3xl border border-orange-100"
            >
              <h3 className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-2">Energy: {vibe.vibe}</h3>
              <p className="text-stone-800 font-serif italic text-lg leading-relaxed">"{vibe.quote}"</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Ambient Sound</span>
          <div style={{ background: `linear-gradient(135deg, ${accentColor}, #EF4444)` }} className="h-[220px] w-full rounded-3xl p-6 flex flex-col justify-end text-white relative overflow-hidden transition-all duration-700">
            <div className="absolute top-4 right-4 flex gap-1 items-end h-6">
              {[0.4, 0.8, 0.4, 0.6].map((op, i) => (
                <motion.div 
                  key={i}
                  animate={isPlayingMusic ? { height: [8, 20, 8] } : { height: 8 }}
                  transition={{ repeat: Infinity, duration: 1 + i*0.2, ease: "easeInOut" }}
                  style={{ opacity: op }}
                  className="w-1 bg-white rounded-full" 
                />
              ))}
            </div>
            <p className="text-xs opacity-70 font-medium mb-1">LoFi Celestial Mix</p>
            <h3 className="text-xl font-bold leading-tight">Coffee in {selectedZodiac?.name || 'the Cosmos'}</h3>
          </div>
          
          <div className="flex justify-between items-center px-2">
            <div className="flex gap-6 items-center">
               <button className="text-stone-300 hover:text-orange-500 transition-colors">⏮</button>
               <button 
                 onClick={toggleMusic}
                 className="text-stone-800 hover:text-orange-600 transition-colors bg-stone-100 p-2 rounded-full"
               >
                 {isPlayingMusic ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
               </button>
               <button className="text-stone-300 hover:text-orange-500 transition-colors">⏭</button>
            </div>
            <span className="text-[10px] font-mono text-stone-400">{isPlayingMusic ? 'STREAMING' : 'READY'}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-stone-100 text-[10px] text-stone-400 font-mono flex justify-between uppercase">
          <span>{new Date().toLocaleDateString()}</span>
          <span>System Active</span>
        </div>
      </aside>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-orange-950/20 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={(e) => { if (e.target === e.currentTarget && selectedZodiac) setShowSettings(false); }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="w-full max-w-xl bg-white rounded-[3rem] p-10 shadow-2xl overflow-hidden relative"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-stone-900">Select Sign</h2>
                <p className="text-stone-500 mt-1">Your themes adjust based on your celestial essence.</p>
              </div>
              
              <ZodiacSelector 
                onSelect={handleZodiacSelect} 
                selected={selectedZodiac?.name || null} 
              />
              
              {selectedZodiac && (
                <button 
                  onClick={() => setShowSettings(false)}
                  className="mt-8 w-full py-4 rounded-2xl bg-stone-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-colors"
                >
                  Confirm Selection
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" loop />
      <audio ref={alarmRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" />
    </div>
  );
}
