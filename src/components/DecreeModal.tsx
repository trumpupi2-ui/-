import React from 'react';
import { Decree, OligarchyDoctrine } from '../types/game';
import { sound } from '../utils/audio';
import { Stamp, Clock, TrendingUp, TrendingDown, Coins, ShieldCheck, ShieldAlert, Scale, Building, Swords } from 'lucide-react';

interface DecreeModalProps {
  decrees: Decree[];
  budget: number;
  currentMonth: number;
  oligarchyDoctrine: OligarchyDoctrine;
  onEnactDecree: (decreeId: string) => void;
}

export const DecreeModal: React.FC<DecreeModalProps> = ({
  decrees,
  budget,
  currentMonth,
  oligarchyDoctrine,
  onEnactDecree,
}) => {
  const isAvailable = (decree: Decree) => {
    // If it's a doctrine decree and a doctrine has already been chosen
    if (decree.category === 'Доктрина' && oligarchyDoctrine !== 'none') {
      return false;
    }
    if (decree.lastEnactedMonth !== undefined) {
      const elapsed = currentMonth - decree.lastEnactedMonth;
      if (elapsed < decree.cooldownMonths) {
        return false;
      }
    }
    // Budget check (if costBudget > 0, need sufficient budget)
    if (decree.costBudget > 0 && budget < decree.costBudget) {
      return false;
    }
    return true;
  };

  const doctrineDecrees = decrees.filter((d) => d.category === 'Доктрина');
  const standardDecrees = decrees.filter((d) => d.category !== 'Доктрина');

  const renderEffectPill = (name: string, val?: number) => {
    if (val === undefined || val === 0) return null;
    const isPositive = val > 0;
    return (
      <span
        key={name}
        className={`inline-flex items-center gap-0.5 text-[10px] font-mono-numbers px-1.5 py-0.5 rounded border ${
          isPositive
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
            : 'bg-red-950/60 text-red-300 border-red-800/60'
        }`}
      >
        {isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
        <span>{name} {isPositive ? `+${val}` : val}</span>
      </span>
    );
  };

  const getDoctrineIcon = (type?: string) => {
    switch (type) {
      case 'corporate':
        return <Building className="w-5 h-5 text-amber-400" />;
      case 'systemic':
        return <Scale className="w-5 h-5 text-sky-400" />;
      case 'iron':
        return <Swords className="w-5 h-5 text-red-400" />;
      default:
        return <Stamp className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-serif-title font-bold text-amber-100 flex items-center gap-2">
              <Stamp className="w-5 h-5 text-amber-400" />
              <span>Чрезвычайные Указы и Государственные Доктрины</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Прямые постановления исполнительной власти. Издание указов меняет баланс сил и курс страны.
            </p>
          </div>
          <div className="bg-stone-950 border border-stone-800 px-3 py-1.5 rounded flex items-center gap-2 text-xs shrink-0 self-start sm:self-auto">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-stone-400">Доступно в казне:</span>
            <span className="font-mono-numbers font-bold text-stone-100">{budget} млн крон</span>
          </div>
        </div>
      </div>

      {/* SPECIAL SECTION: THE 3 OLIGARCHY DOCTRINE CHOICES */}
      <div className="bg-stone-900/90 border-2 border-amber-600/50 rounded-xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-numbers bg-amber-950 text-amber-300 border border-amber-700 px-2 py-0.5 rounded font-bold uppercase">
                Фундаментальный выбор курса
              </span>
              {oligarchyDoctrine !== 'none' && (
                <span className="text-[10px] font-mono-numbers bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  Доктрина утверждена · Поборы синдиката прекращены
                </span>
              )}
            </div>
            <h3 className="text-lg font-serif-title font-bold text-stone-100 mt-1 flex items-center gap-2">
              <span>Доктрина Отношений с Олигархатом</span>
            </h3>
          </div>
        </div>

        {oligarchyDoctrine === 'none' ? (
          <div className="space-y-3">
            <p className="text-xs text-stone-300 leading-relaxed">
              Олигархический синдикат ежемесячно шантажирует власть, требуя передачи государственных заводов и рудников под угрозой медийных атак.
              Принятие одного из трех указов ниже <strong>навсегда остановит ежемесячный шантаж</strong>, но наложит постоянный дебафф.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {doctrineDecrees.map((decree) => {
                const available = isAvailable(decree);
                return (
                  <div
                    key={decree.id}
                    className="bg-stone-950/80 border border-stone-800 rounded-lg p-4 flex flex-col justify-between space-y-3 hover:border-amber-600/60 transition-all shadow"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {getDoctrineIcon(decree.doctrineType)}
                          <h4 className="font-bold text-stone-100 text-xs sm:text-sm">
                            {decree.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono-numbers font-semibold text-amber-400 shrink-0">
                          {decree.costBudget > 0 ? `-${decree.costBudget} млн` : `+${Math.abs(decree.costBudget)} млн`}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed">
                        {decree.description}
                      </p>

                      {decree.debuffDescription && (
                        <div className="bg-red-950/40 border border-red-800/60 rounded p-2 text-[11px] text-red-200 leading-tight">
                          {decree.debuffDescription}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 pt-1">
                        {renderEffectPill('Казна', decree.effects.budget)}
                        {renderEffectPill('Народ', decree.effects.people)}
                        {renderEffectPill('Олигархи', decree.effects.oligarchs)}
                        {renderEffectPill('Интелл.', decree.effects.intellectuals)}
                        {renderEffectPill('Пром.', decree.effects.industry)}
                        {renderEffectPill('Суверен.', decree.effects.sovereignty)}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800">
                      <button
                        disabled={!available}
                        onClick={() => {
                          sound.playStamp();
                          onEnactDecree(decree.id);
                        }}
                        className={`w-full py-2 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-all ${
                          available
                            ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 cursor-pointer shadow active:scale-98'
                            : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                        }`}
                      >
                        <Stamp className="w-3.5 h-3.5" />
                        <span>Утвердить доктрину навсегда</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-stone-950/80 border border-emerald-800/60 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm font-serif-title">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>
                {oligarchyDoctrine === 'corporate' && 'Действует Корпоративный Пакт: Государство опирается на крупный бизнес'}
                {oligarchyDoctrine === 'systemic' && 'Действует Антимонопольный Кодекс: Прозрачная правовая система рынка'}
                {oligarchyDoctrine === 'iron' && 'Действует Декрет о Деолигархизации: Полный силовой разгром монополий'}
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Ежемесячные ультиматумы синдиката остановлены. Выбранный указ определил экономическую модель Республики до конца игры.
            </p>
          </div>
        )}
      </div>

      {/* STANDARD EXECUTIVE DECREES SECTION */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          Текущие министерские постановления:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {standardDecrees.map((decree) => {
            const available = isAvailable(decree);
            const hasCooldown =
              decree.lastEnactedMonth !== undefined &&
              currentMonth - decree.lastEnactedMonth < decree.cooldownMonths;
            const monthsLeft = decree.lastEnactedMonth !== undefined
              ? decree.cooldownMonths - (currentMonth - decree.lastEnactedMonth)
              : 0;

            return (
              <div
                key={decree.id}
                className={`rounded-lg border p-4 flex flex-col justify-between transition-all ${
                  available
                    ? 'bg-stone-900 border-stone-800 hover:border-amber-700/60 shadow'
                    : 'bg-stone-950/60 border-stone-900 opacity-70'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono-numbers uppercase tracking-wider text-amber-400/90">
                        {decree.category}
                      </span>
                      <h4 className="font-semibold text-stone-100 text-sm">
                        {decree.title}
                      </h4>
                    </div>
                    <div className="shrink-0">
                      {decree.costBudget > 0 ? (
                        <span className="text-xs font-mono-numbers font-semibold text-amber-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                          -{decree.costBudget} млн
                        </span>
                      ) : (
                        <span className="text-xs font-mono-numbers font-semibold text-emerald-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                          +{Math.abs(decree.costBudget)} млн
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {decree.description}
                  </p>

                  {/* Effect Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {renderEffectPill('Хлеб', decree.effects.food)}
                    {renderEffectPill('Пром.', decree.effects.industry)}
                    {renderEffectPill('Армия', decree.effects.military)}
                    {renderEffectPill('Народ', decree.effects.people)}
                    {renderEffectPill('Генералы', decree.effects.army)}
                    {renderEffectPill('Олигархи', decree.effects.oligarchs)}
                    {renderEffectPill('Интеллигенция', decree.effects.intellectuals)}
                    {renderEffectPill('Суверенитет', decree.effects.sovereignty)}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-stone-800/80 mt-3 flex items-center justify-between">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 font-mono-numbers">
                    {hasCooldown ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Кулдаун: ещё {monthsLeft} мес.
                      </span>
                    ) : (
                      <span>Действует {decree.cooldownMonths} мес.</span>
                    )}
                  </div>

                  <button
                    disabled={!available}
                    onClick={() => {
                      sound.playStamp();
                      onEnactDecree(decree.id);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-all ${
                      available
                        ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow cursor-pointer'
                        : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700/60'
                    }`}
                  >
                    <Stamp className="w-3.5 h-3.5" />
                    <span>Издать указ</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
