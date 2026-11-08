import React from 'react';
import { ChoiceOption } from '../types/game';
import { FileCheck, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface OutcomeModalProps {
  option: ChoiceOption;
  month: number;
  onNextMonth: () => void;
}

export const OutcomeModal: React.FC<OutcomeModalProps> = ({
  option,
  month,
  onNextMonth,
}) => {
  const renderStatDelta = (name: string, val?: number) => {
    if (val === undefined || val === 0) return null;
    const isPositive = val > 0;
    return (
      <div
        key={name}
        className={`flex items-center justify-between p-2 rounded text-xs border ${
          isPositive
            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
            : 'bg-red-950/40 border-red-800/60 text-red-200'
        }`}
      >
        <span>{name}</span>
        <span className="font-mono-numbers font-bold flex items-center gap-1">
          {isPositive ? <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> : <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
          {isPositive ? `+${val}` : val}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-700/80 rounded-lg max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Official Decree Stamp */}
        <div className="flex items-start justify-between border-b border-stone-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono-numbers uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-700/60">
                Указ исполнен · Месяц {month}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif-title font-bold text-stone-100">
              {option.title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-950 border border-amber-600/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Narrative Outcome */}
        <div className="bg-stone-950/70 border border-stone-800/80 rounded p-4 text-xs sm:text-sm text-stone-200 leading-relaxed font-serif-title italic">
          «{option.outcomeNarrative}»
        </div>

        {/* Real Dynamic Shifts */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-mono-numbers uppercase tracking-wider text-stone-400">
            Изменения баланса сил и резервов:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {renderStatDelta('Казна', option.effects.budget)}
            {renderStatDelta('Продовольствие', option.effects.food)}
            {renderStatDelta('Инфраструктура', option.effects.industry)}
            {renderStatDelta('Боеготовность', option.effects.military)}
            {renderStatDelta('Народ', option.effects.people)}
            {renderStatDelta('Генералитет', option.effects.army)}
            {renderStatDelta('Олигархи', option.effects.oligarchs)}
            {renderStatDelta('Реформаторы', option.effects.intellectuals)}
            {renderStatDelta('Суверенитет', option.effects.sovereignty)}
          </div>
        </div>

        {/* Next Month Button */}
        <div className="pt-2">
          <button
            onClick={onNextMonth}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm rounded shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{month >= 12 ? 'Перейти к итогам года и вердикту истории' : 'Принять следующий государственный месяц'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
