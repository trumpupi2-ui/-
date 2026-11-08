import React from 'react';
import { Ending, GameResources, GameFactions, GameDiplomacy, RepublicSetup } from '../types/game';
import { sound } from '../utils/audio';
import { RotateCcw, Award, ShieldAlert, Sparkles, Scroll, Coins, Wheat, Factory, Shield, Users } from 'lucide-react';

interface EndingScreenProps {
  ending: Ending;
  republicSetup: RepublicSetup;
  resources: GameResources;
  factions: GameFactions;
  diplomacy: GameDiplomacy;
  onRestart: () => void;
  onOpenChronicle: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  ending,
  republicSetup,
  resources,
  factions,
  diplomacy,
  onRestart,
  onOpenChronicle,
}) => {
  const isVictory = ending.category === 'victory' || ending.category === 'reform' || ending.category === 'special';

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Presidential Office Ambient Scenery */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          src="/src/assets/images/cabinet_office_1794099637446.jpg"
          alt="Фон"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-3xl w-full bg-stone-900/95 border border-stone-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Seal and Badge */}
        <div className="text-center space-y-3 border-b border-stone-800 pb-5">
          <div className="flex justify-center">
            <img
              src="/src/assets/images/republic_seal_1794099637406.jpg"
              alt="Государственная печать"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full border-2 border-amber-600/50 shadow-lg object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-mono-numbers px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-amber-300 uppercase tracking-widest inline-block">
              {ending.badge}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-100 mt-2">
              {ending.title}
            </h1>
            <h2 className="text-sm sm:text-base text-amber-300/90 font-serif-title italic mt-0.5">
              {ending.statusTitle}
            </h2>
            <p className="text-xs text-stone-400 font-mono-numbers mt-1">
              {republicSetup.name} · Правление {republicSetup.leaderTitle} {republicSetup.leaderName}
            </p>
          </div>
        </div>

        {/* Narrative Verdict */}
        <div className="space-y-4">
          <div className="bg-stone-950/80 border border-stone-800 rounded p-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
            {ending.synopsis}
          </div>

          <div className="bg-amber-950/20 border-l-2 border-amber-600/60 p-4 rounded text-xs sm:text-sm text-stone-200 leading-relaxed font-serif-title">
            <h3 className="font-bold text-amber-300 text-xs uppercase tracking-wider mb-1">
              Эпилог: Республика пять лет спустя
            </h3>
            {ending.epilogue}
          </div>

          <div className="bg-stone-950/60 border border-stone-800/80 p-3 rounded text-center text-xs text-stone-400 italic font-serif-title">
            {ending.legacyText}
          </div>
        </div>

        {/* Final State Metrics Summary */}
        <div className="space-y-2 pt-2 border-t border-stone-800">
          <h4 className="text-[11px] font-mono-numbers uppercase tracking-wider text-stone-400">
            Итоговые показатели страны на момент подведения итогов:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-stone-950 p-2 rounded border border-stone-800 flex justify-between">
              <span className="text-stone-400 flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-400" />
                <span>Казна:</span>
              </span>
              <span className="font-mono-numbers font-bold text-stone-200">{resources.budget} млн</span>
            </div>
            <div className="bg-stone-950 p-2 rounded border border-stone-800 flex justify-between">
              <span className="text-stone-400 flex items-center gap-1">
                <Wheat className="w-3 h-3 text-amber-500" />
                <span>Хлеб:</span>
              </span>
              <span className="font-mono-numbers font-bold text-stone-200">{resources.food}%</span>
            </div>
            <div className="bg-stone-950 p-2 rounded border border-stone-800 flex justify-between">
              <span className="text-stone-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-amber-300" />
                <span>Народ:</span>
              </span>
              <span className="font-mono-numbers font-bold text-stone-200">{factions.people}%</span>
            </div>
            <div className="bg-stone-950 p-2 rounded border border-stone-800 flex justify-between">
              <span className="text-stone-400 flex items-center gap-1">
                <Shield className="w-3 h-3 text-sky-400" />
                <span>Генералы:</span>
              </span>
              <span className="font-mono-numbers font-bold text-stone-200">{factions.army}%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-800">
          <button
            onClick={() => {
              sound.playClick();
              onOpenChronicle();
            }}
            className="w-full sm:w-auto px-4 py-2.5 text-xs text-stone-300 hover:text-stone-100 bg-stone-800 hover:bg-stone-750 rounded border border-stone-700 flex items-center justify-center gap-2"
          >
            <Scroll className="w-4 h-4 text-amber-400" />
            <span>Просмотреть хронологию решений</span>
          </button>

          <button
            onClick={() => {
              sound.playGavel();
              onRestart();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-serif-title font-bold text-sm rounded shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Начать новую партию с другой доктриной</span>
          </button>
        </div>
      </div>
    </div>
  );
};
