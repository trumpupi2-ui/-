import React, { useState } from 'react';
import { RepublicSetup, GameDifficulty } from '../types/game';
import { sound } from '../utils/audio';
import { Shield, Sparkles, Award, ArrowRight, BookOpen, Flag } from 'lucide-react';

interface StartScreenProps {
  onStartGame: (setup: RepublicSetup, difficulty: GameDifficulty) => void;
  onOpenRules: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, onOpenRules }) => {
  const [name, setName] = useState('Республика Новирия');
  const [leaderTitle, setLeaderTitle] = useState('Председатель Совета Республики');
  const [leaderName, setLeaderName] = useState('Александр Вольф');
  const [motto, setMotto] = useState('Свобода, Труд и Суверенитет');
  const [heritage, setHeritage] = useState<RepublicSetup['heritage']>('industrial');
  const [difficulty, setDifficulty] = useState<GameDifficulty>('standard');

  const presetNames = [
    'Республика Новирия',
    'Республика Острия',
    'Нордландская Федерация',
    'Загорская Республика',
    'Свободный Союз Авроры'
  ];

  const handleStart = () => {
    sound.playGavel();
    onStartGame(
      {
        name: name.trim() || 'Республика Новирия',
        leaderTitle,
        leaderName: leaderName.trim() || 'Глава Государства',
        motto: motto.trim() || 'Свобода и Закон',
        heritage,
      },
      difficulty
    );
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Presidential Office Ambient Scenery */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="/src/assets/images/cabinet_office_1794099637446.jpg"
          alt="Фон"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-2xl w-full bg-stone-900/95 border border-stone-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* State Seal & Title Header */}
        <div className="text-center space-y-3 border-b border-stone-800 pb-5">
          <div className="flex justify-center">
            <img
              src="/src/assets/images/republic_seal_1794099637406.jpg"
              alt="Государственная печать"
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full border-2 border-amber-600/50 shadow-lg object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-mono-numbers text-amber-400 uppercase tracking-widest">
              Военно-политическая текстовая стратегия
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-100 mt-1">
              Бремя Власти: Молодая Республика
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-md mx-auto leading-relaxed">
              Метрополия пала три месяца назад. Вы стоите у штурвала юного независимого государства.
              Сможете ли вы уберечь страну от бунта, военного переворота и иностранного диктата?
            </p>
          </div>
        </div>

        {/* Customization Controls */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Republic Name & Presets */}
          <div className="space-y-1.5">
            <label className="text-stone-300 font-medium flex items-center justify-between">
              <span>Название Республики:</span>
              <span className="text-[11px] text-stone-400">или выберите шаблон</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                placeholder="Республика Новирия"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {presetNames.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setName(p)}
                  className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                    name === p
                      ? 'bg-amber-950 text-amber-300 border-amber-700'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Leader Title & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-stone-300 font-medium">Ваш официальный титул:</label>
              <select
                value={leaderTitle}
                onChange={(e) => setLeaderTitle(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Председатель Совета Республики">Председатель Совета Республики</option>
                <option value="Президент Республики">Президент Республики</option>
                <option value="Канцлер Республики">Канцлер Республики</option>
                <option value="Первый Гражданин">Первый Гражданин</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-stone-300 font-medium">Имя руководителя:</label>
              <input
                type="text"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                placeholder="Александр Вольф"
              />
            </div>
          </div>

          {/* National Motto */}
          <div className="space-y-1">
            <label className="text-stone-300 font-medium">Государственный девиз:</label>
            <input
              type="text"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500 italic"
              placeholder="Свобода, Труд и Суверенитет"
            />
          </div>

          {/* Economic Heritage Foundation */}
          <div className="space-y-2 pt-2">
            <label className="text-stone-300 font-medium flex items-center gap-1.5">
              <Flag className="w-4 h-4 text-amber-400" />
              <span>Историческое наследие Республики (влияет на стартовые ресурсы):</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div
                onClick={() => setHeritage('industrial')}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  heritage === 'industrial'
                    ? 'bg-amber-950/60 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="font-semibold text-stone-100 text-xs">Индустриальный Бассейн</div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  Развитая металлургия и заводы (+15 пром., +10 казна, -8 доверие рабочих).
                </div>
              </div>

              <div
                onClick={() => setHeritage('agrarian')}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  heritage === 'agrarian'
                    ? 'bg-amber-950/60 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="font-semibold text-stone-100 text-xs">Аграрная Житница</div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  Чернозёмы и элеваторы (+20 хлеб, +12 лояльность народа, -10 пром.).
                </div>
              </div>

              <div
                onClick={() => setHeritage('trade')}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  heritage === 'trade'
                    ? 'bg-amber-950/60 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="font-semibold text-stone-100 text-xs">Морской Торговый Хаб</div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  Порт и таможенные пошлины (+20 казна, +15 олигархи, -12 суверенитет).
                </div>
              </div>

              <div
                onClick={() => setHeritage('liberty')}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  heritage === 'liberty'
                    ? 'bg-amber-950/60 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="font-semibold text-stone-100 text-xs">Очаг Гражданской Свободы</div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  Сильные профсоюзы и пресса (+18 интеллигенция, +15 народ, -15 армия).
                </div>
              </div>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="flex items-center justify-between p-3 rounded bg-stone-950 border border-stone-800">
            <div>
              <div className="font-semibold text-xs text-stone-200">Режим сложности:</div>
              <div className="text-[11px] text-stone-400">
                {difficulty === 'standard' ? 'Сбалансированный кризис' : 'Реализм: скудные ресурсы и суровые восстания'}
              </div>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setDifficulty('standard')}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  difficulty === 'standard'
                    ? 'bg-amber-600 text-stone-950 font-bold border-amber-500'
                    : 'bg-stone-900 text-stone-400 border-stone-700'
                }`}
              >
                Обычный
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('hardcore')}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  difficulty === 'hardcore'
                    ? 'bg-red-600 text-stone-100 font-bold border-red-500'
                    : 'bg-stone-900 text-stone-400 border-stone-700'
                }`}
              >
                Реализм
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-800">
          <button
            onClick={onOpenRules}
            type="button"
            className="w-full sm:w-auto px-4 py-2.5 text-xs text-stone-300 hover:text-stone-100 bg-stone-800 hover:bg-stone-750 rounded border border-stone-700 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Правила выживания Республики</span>
          </button>

          <button
            onClick={handleStart}
            type="button"
            className="w-full sm:w-auto px-7 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-serif-title font-bold text-sm rounded shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Принять присягу и возглавить государство</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
