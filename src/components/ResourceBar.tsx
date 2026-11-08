import { GameResources, GameFactions, GameDiplomacy, OligarchyDoctrine } from '../types/game';
import { Coins, Wheat, Factory, Shield, Users, Award, Briefcase, GraduationCap, Compass, AlertTriangle, ShieldCheck, Scale, Swords, Building } from 'lucide-react';

interface ResourceBarProps {
  resources: GameResources;
  factions: GameFactions;
  diplomacy: GameDiplomacy;
  oligarchyDoctrine?: OligarchyDoctrine;
  onOpenDecrees?: () => void;
}

export const ResourceBar: React.FC<ResourceBarProps> = ({
  resources,
  factions,
  diplomacy,
  oligarchyDoctrine = 'none',
  onOpenDecrees,
}) => {
  const getMeterColor = (val: number, isCrisisMetric = false) => {
    if (val <= 20) return 'text-red-400 bg-red-500/20 border-red-500/40';
    if (val <= 40) return 'text-amber-400 bg-amber-500/20 border-amber-500/40';
    if (val >= 75) return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40';
    return 'text-stone-200 bg-stone-800/60 border-stone-700/60';
  };

  const getBarWidth = (val: number) => {
    return `${Math.max(4, Math.min(100, val))}%`;
  };

  const getBarColor = (val: number) => {
    if (val <= 20) return 'bg-red-500';
    if (val <= 40) return 'bg-amber-500';
    return 'bg-amber-400';
  };

  // Geopolitical indicator text
  const getGeoText = (geo: number) => {
    if (geo <= -40) return 'Прозападный блок';
    if (geo <= -15) return 'Уклон к Западу';
    if (geo >= 40) return 'Проимперский блок';
    if (geo >= 15) return 'Уклон к Империи';
    return 'Суверенный нейтралитет';
  };

  return (
    <div className="bg-stone-900 border-b border-stone-800 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Urgent Warnings Row if critical thresholds reached */}
        {(factions.people <= 20 || factions.army <= 20 || resources.budget <= 10 || resources.food <= 15) && (
          <div className="bg-red-950/60 border border-red-600/60 text-red-200 px-3 py-2 rounded text-xs flex items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="font-medium">
                {factions.people <= 20 && 'КРИТИЧЕСКАЯ УГРОЗА: Народная лояльность на нуле! В столице назревает всеобщее восстание! '}
                {factions.army <= 20 && 'КРИТИЧЕСКАЯ УГРОЗА: Генералитет на грани военного переворота! '}
                {resources.budget <= 10 && 'ФИНАНСОВЫЙ КРИЗИС: Казна пуста, грозит суверенный дефолт! '}
                {resources.food <= 15 && 'ПРОДОВОЛЬСТВЕННЫЙ КРИЗИС: Запасы зерна истощены, начинается голодный бунт! '}
              </span>
            </div>
            <span className="text-[11px] text-red-300 font-mono-numbers whitespace-nowrap">Угроза падения Республики</span>
          </div>
        )}

        {/* Top Strip: 4 Key State Resources */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {/* Budget */}
          <div className="bg-stone-950/80 border border-stone-800 rounded p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <div className="flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>Казна</span>
              </div>
              <span className="font-mono-numbers font-semibold text-stone-200 text-sm">
                {resources.budget} <span className="text-[10px] text-stone-400">млн</span>
              </span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getBarColor(resources.budget)}`}
                style={{ width: getBarWidth(resources.budget) }}
              />
            </div>
          </div>

          {/* Food */}
          <div className="bg-stone-950/80 border border-stone-800 rounded p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <div className="flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5 text-amber-500" />
                <span>Продовольствие</span>
              </div>
              <span className="font-mono-numbers font-semibold text-stone-200 text-sm">
                {resources.food}%
              </span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getBarColor(resources.food)}`}
                style={{ width: getBarWidth(resources.food) }}
              />
            </div>
          </div>

          {/* Industry */}
          <div className="bg-stone-950/80 border border-stone-800 rounded p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <div className="flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5 text-stone-300" />
                <span>Инфраструктура</span>
              </div>
              <span className="font-mono-numbers font-semibold text-stone-200 text-sm">
                {resources.industry}%
              </span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getBarColor(resources.industry)}`}
                style={{ width: getBarWidth(resources.industry) }}
              />
            </div>
          </div>

          {/* Military Readiness */}
          <div className="bg-stone-950/80 border border-stone-800 rounded p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span>Боеготовность</span>
              </div>
              <span className="font-mono-numbers font-semibold text-stone-200 text-sm">
                {resources.military}%
              </span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getBarColor(resources.military)}`}
                style={{ width: getBarWidth(resources.military) }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Strip: 4 Faction Loyalties + Geopolitics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 text-xs">
          {/* People Loyalty */}
          <div className={`p-2 rounded border transition-colors ${getMeterColor(factions.people, true)}`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 truncate text-stone-300">
                <Users className="w-3 h-3 text-amber-300 shrink-0" />
                <span>Народ</span>
              </span>
              <span className="font-mono-numbers font-semibold">{factions.people}%</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {factions.people <= 20 ? 'Мятеж' : factions.people <= 45 ? 'Недовольство' : 'Поддержка'}
            </div>
          </div>

          {/* Army Loyalty */}
          <div className={`p-2 rounded border transition-colors ${getMeterColor(factions.army, true)}`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 truncate text-stone-300">
                <Award className="w-3 h-3 text-sky-300 shrink-0" />
                <span>Генералы</span>
              </span>
              <span className="font-mono-numbers font-semibold">{factions.army}%</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {factions.army <= 20 ? 'Риск путча' : factions.army <= 45 ? 'Брожение' : 'Верность'}
            </div>
          </div>

          {/* Oligarchs */}
          <div className={`p-2 rounded border transition-colors ${getMeterColor(factions.oligarchs)}`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 truncate text-stone-300">
                <Briefcase className="w-3 h-3 text-amber-500 shrink-0" />
                <span>Олигархи</span>
              </span>
              <span className="font-mono-numbers font-semibold">{factions.oligarchs}%</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {factions.oligarchs <= 20 ? 'Саботаж' : factions.oligarchs <= 45 ? 'Осторожность' : 'Партнерство'}
            </div>
          </div>

          {/* Intellectuals */}
          <div className={`p-2 rounded border transition-colors ${getMeterColor(factions.intellectuals)}`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 truncate text-stone-300">
                <GraduationCap className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Реформаторы</span>
              </span>
              <span className="font-mono-numbers font-semibold">{factions.intellectuals}%</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {factions.intellectuals <= 20 ? 'Протест' : factions.intellectuals <= 45 ? 'Скепсис' : 'Доверие'}
            </div>
          </div>

          {/* Geopolitical Compass */}
          <div className="col-span-2 sm:col-span-1 p-2 rounded border border-stone-800 bg-stone-950/80">
            <div className="flex items-center justify-between text-stone-300 mb-1">
              <span className="flex items-center gap-1 truncate">
                <Compass className="w-3 h-3 text-indigo-400 shrink-0" />
                <span>Вектор</span>
              </span>
              <span className="font-mono-numbers text-[11px] text-stone-300">
                {diplomacy.sovereignty}% сув.
              </span>
            </div>
            <div className="text-[10px] text-amber-300/90 truncate font-medium">
              {getGeoText(diplomacy.geopolitics)}
            </div>
          </div>
        </div>

        {/* State Doctrine on Oligarchy Status Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-1.5 rounded bg-stone-950/70 border border-stone-800 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 uppercase font-mono-numbers text-[10px] tracking-wider">
              Доктрина по олигархату:
            </span>
            {oligarchyDoctrine === 'none' && (
              <span className="text-amber-400 flex items-center gap-1 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>Не решена (Ежемесячный шантаж медиа-активами активен)</span>
              </span>
            )}
            {oligarchyDoctrine === 'corporate' && (
              <span className="text-amber-300 flex items-center gap-1 font-semibold">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>Корпоративный Пакт (Поборы сняты · Дебафф: -16% доверие народа)</span>
              </span>
            )}
            {oligarchyDoctrine === 'systemic' && (
              <span className="text-sky-300 flex items-center gap-1 font-semibold">
                <Scale className="w-3.5 h-3.5 text-sky-400" />
                <span>Антимонопольный Кодекс (Поборы сняты · Дебафф: бюрократический надзор)</span>
              </span>
            )}
            {oligarchyDoctrine === 'iron' && (
              <span className="text-red-300 flex items-center gap-1 font-semibold">
                <Swords className="w-3.5 h-3.5 text-red-400" />
                <span>Деолигархизация (Поборы сняты · Дебафф: инвестиционный шок -14% пром.)</span>
              </span>
            )}
          </div>

          {oligarchyDoctrine === 'none' && onOpenDecrees && (
            <button
              onClick={onOpenDecrees}
              className="text-[11px] text-amber-300 hover:text-amber-200 underline font-medium self-start sm:self-auto cursor-pointer"
            >
              Выбрать указ и остановить поборы →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
