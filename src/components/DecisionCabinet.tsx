import React, { useState } from 'react';
import { GameEvent, ChoiceOption, Adviser } from '../types/game';
import { sound } from '../utils/audio';
import { Check, User, ArrowRight, TrendingUp, TrendingDown, HelpCircle, FileCheck2 } from 'lucide-react';

interface DecisionCabinetProps {
  event: GameEvent;
  advisers: Adviser[];
  onSelectOption: (option: ChoiceOption) => void;
  onBackToNewspaper: () => void;
}

export const DecisionCabinet: React.FC<DecisionCabinetProps> = ({
  event,
  advisers,
  onSelectOption,
  onBackToNewspaper,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const selectedOption = event.options.find((opt) => opt.id === selectedOptionId) || null;

  const handleConfirmDecision = () => {
    if (!selectedOption) return;
    sound.playStamp();
    onSelectOption(selectedOption);
  };

  const getAdviserById = (id: string) => {
    return advisers.find((a) => a.id === id);
  };

  const renderEffectBadge = (label: string, val?: number) => {
    if (val === undefined || val === 0) return null;
    const isPositive = val > 0;
    return (
      <span
        key={label}
        className={`inline-flex items-center gap-0.5 text-[11px] font-mono-numbers px-1.5 py-0.5 rounded border ${
          isPositive
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
            : 'bg-red-950/60 text-red-300 border-red-800/60'
        }`}
      >
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span>{label} {isPositive ? `+${val}` : val}</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Presidential Office backdrop */}
      <div className="relative rounded-lg overflow-hidden border border-stone-800 bg-stone-900 shadow-xl">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/src/assets/images/cabinet_office_1794099637446.jpg"
            alt="Кабинет главы государства"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-transparent">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className={`text-xs font-mono-numbers uppercase tracking-widest ${
              event.isReactiveCrisis ? 'text-red-400 font-bold' : 'text-amber-400'
            }`}>
              {event.isReactiveCrisis ? 'ЧРЕЗВЫЧАЙНЫЙ СОЗЫВ СОВЕТА РЕСПУБЛИКИ' : 'Секретно · Заседание Совета Республики'}
            </span>
            <button
              onClick={onBackToNewspaper}
              className="text-xs text-stone-400 hover:text-stone-200 underline"
            >
              Вернуться к сводке газеты
            </button>
          </div>

          {event.isReactiveCrisis && event.crisisTriggerReason && (
            <div className="mb-3 bg-red-950/90 border border-red-600/80 rounded px-3 py-1.5 text-xs text-red-200 flex items-center gap-2">
              <span className="bg-red-600 text-stone-950 font-bold text-[10px] px-1.5 py-0.5 rounded uppercase font-mono-numbers">
                Причина созыва
              </span>
              <span>{event.crisisTriggerReason}</span>
            </div>
          )}

          <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-stone-100">
            {event.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
            {event.situationReport}
          </p>
        </div>
      </div>

      {/* Advisers' Conflicting Opinions Carousel / Grid */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span>Позиции министров и советников</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {event.adviserQuotes.map((quote) => {
            const adv = getAdviserById(quote.adviserId);
            if (!adv) return null;
            return (
              <div
                key={quote.adviserId}
                className="bg-stone-950/80 border border-stone-800/90 rounded p-3 text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-stone-800 border border-amber-600/30 flex items-center justify-center font-bold text-[10px] text-amber-300">
                      {adv.avatarInitials}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-200 leading-tight">{adv.name}</div>
                      <div className="text-[10px] text-stone-400 leading-tight">{adv.title}</div>
                    </div>
                  </div>
                  <p className="text-stone-300 italic text-[11px] leading-relaxed">
                    {quote.advice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decision Choice Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Варианты государственного решения:</span>
          </h3>
          <span className="text-[11px] text-stone-400">Выберите один вариант для подписания</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {event.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <div
                key={option.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedOptionId(option.id);
                }}
                className={`cursor-pointer rounded-lg border p-4 sm:p-5 transition-all text-left ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-stone-900 hover:bg-stone-850 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-800 text-stone-300 font-mono-numbers text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-base font-semibold text-stone-100">
                        {option.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-7">
                      {option.description}
                    </p>
                  </div>
                  <div className="shrink-0 pt-1">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-amber-500 border-amber-500 text-stone-950'
                          : 'border-stone-600 bg-stone-950'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {/* Projected Impact Preview */}
                <div className="mt-3 pt-3 border-t border-stone-800/80 pl-7 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider mr-1">
                    Ожидаемый эффект:
                  </span>
                  {renderEffectBadge('Казна', option.effects.budget)}
                  {renderEffectBadge('Хлеб', option.effects.food)}
                  {renderEffectBadge('Пром.', option.effects.industry)}
                  {renderEffectBadge('Армия', option.effects.military)}
                  {renderEffectBadge('Народ', option.effects.people)}
                  {renderEffectBadge('Генералы', option.effects.army)}
                  {renderEffectBadge('Олигархи', option.effects.oligarchs)}
                  {renderEffectBadge('Интеллигенция', option.effects.intellectuals)}
                  {renderEffectBadge('Суверенитет', option.effects.sovereignty)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation & Stamp Action */}
      <div className="bg-stone-950/80 border border-stone-800 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-stone-400">
          {selectedOption ? (
            <span className="text-stone-200">
              Выбран проект решения: <strong className="text-amber-300">{selectedOption.title}</strong>
            </span>
          ) : (
            <span className="italic flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              Нажмите на один из вариантов выше, чтобы утвердить указ.
            </span>
          )}
        </div>

        <button
          disabled={!selectedOption}
          onClick={handleConfirmDecision}
          className={`w-full sm:w-auto px-6 py-2.5 rounded font-serif-title font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
            selectedOption
              ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 cursor-pointer active:scale-98'
              : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
          }`}
        >
          <span>Утвердить государственное решение</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
