import React from 'react';
import { Volume2, VolumeX, BookOpen, RotateCcw, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  republicName: string;
  month: number;
  activeTab: 'cabinet' | 'map' | 'decrees' | 'ministers' | 'chronicle';
  setActiveTab: (tab: 'cabinet' | 'map' | 'decrees' | 'ministers' | 'chronicle') => void;
  onOpenRules: () => void;
  onRestart: () => void;
  isAudioOn: boolean;
  setIsAudioOn: (val: boolean) => void;
  availableDecreesCount: number;
  isCrisisActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  republicName,
  month,
  activeTab,
  setActiveTab,
  onOpenRules,
  onRestart,
  isAudioOn,
  setIsAudioOn,
  availableDecreesCount,
  isCrisisActive = false,
}) => {
  const toggleSound = () => {
    const nextState = sound.toggle();
    setIsAudioOn(nextState);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-amber-950/80 border border-amber-600/40 flex items-center justify-center text-amber-400 font-serif-title font-bold text-sm shadow-inner">
            {republicName.charAt(0) || 'Р'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-amber-200/90 whitespace-nowrap font-serif-title">
                {republicName || 'Республика'}
              </h1>
              {isCrisisActive && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono-numbers px-1.5 py-0.2 bg-red-600 text-stone-950 font-bold rounded uppercase animate-pulse">
                  <ShieldAlert className="w-3 h-3" />
                  ЧП
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-400 font-mono-numbers">
              Месяц {month} из 12 · {isCrisisActive ? 'Чрезвычайный созыв' : 'Совет Республики'}
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('cabinet');
            }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'cabinet'
                ? 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            Кабинет министров
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('map');
            }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'map'
                ? 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            Карта провинций
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('decrees');
            }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'decrees'
                ? 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <span>Указы Главы</span>
            {availableDecreesCount > 0 && (
              <span className="text-[10px] font-mono-numbers bg-amber-700 text-stone-100 px-1.5 py-0.2 rounded-full">
                {availableDecreesCount}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('ministers');
            }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'ministers'
                ? 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            Досье министров
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('chronicle');
            }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'chronicle'
                ? 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            Летопись
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleSound}
            aria-label={isAudioOn ? 'Выключить звук' : 'Включить звук'}
            className="p-1.5 rounded text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            title={isAudioOn ? 'Звук включен' : 'Звук выключен'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-600" />}
          </button>

          <button
            onClick={onOpenRules}
            aria-label="Справка по управлению"
            className="px-2.5 py-1.5 text-xs text-stone-300 hover:text-stone-100 bg-stone-800/80 hover:bg-stone-800 rounded border border-stone-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Памятка</span>
          </button>

          <button
            onClick={onRestart}
            aria-label="Начать заново"
            className="p-1.5 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded transition-colors"
            title="Перезапустить игру"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile navigation tab bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-800/80 px-2 py-1.5 bg-stone-900/90 text-xs">
        <button
          onClick={() => setActiveTab('cabinet')}
          className={`px-2 py-1 rounded ${activeTab === 'cabinet' ? 'text-amber-200 font-semibold' : 'text-stone-400'}`}
        >
          Кабинет
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`px-2 py-1 rounded ${activeTab === 'map' ? 'text-amber-200 font-semibold' : 'text-stone-400'}`}
        >
          Карта
        </button>
        <button
          onClick={() => setActiveTab('decrees')}
          className={`px-2 py-1 rounded ${activeTab === 'decrees' ? 'text-amber-200 font-semibold' : 'text-stone-400'}`}
        >
          Указы ({availableDecreesCount})
        </button>
        <button
          onClick={() => setActiveTab('ministers')}
          className={`px-2 py-1 rounded ${activeTab === 'ministers' ? 'text-amber-200 font-semibold' : 'text-stone-400'}`}
        >
          Министры
        </button>
        <button
          onClick={() => setActiveTab('chronicle')}
          className={`px-2 py-1 rounded ${activeTab === 'chronicle' ? 'text-amber-200 font-semibold' : 'text-stone-400'}`}
        >
          Летопись
        </button>
      </div>
    </header>
  );
};
