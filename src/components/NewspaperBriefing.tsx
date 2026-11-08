import React from 'react';
import { GameEvent, RepublicSetup } from '../types/game';
import { Radio, FileText, ChevronRight } from 'lucide-react';

interface NewspaperBriefingProps {
  event: GameEvent;
  republicSetup: RepublicSetup;
  month: number;
  onProceedToDecision: () => void;
}

export const NewspaperBriefing: React.FC<NewspaperBriefingProps> = ({
  event,
  republicSetup,
  month,
  onProceedToDecision,
}) => {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-5 sm:p-7 shadow-xl space-y-6">
      {/* Newspaper Masthead */}
      <div className="border-b-2 border-stone-700/80 pb-4 text-center">
        <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono-numbers uppercase tracking-wider mb-2">
          <span>Официальный вестник «Свободная Аврора»</span>
          <span>Месяц {month} · Год I независимости</span>
          <span>Цена: 25 грошей</span>
        </div>
        <div className="flex items-center justify-center gap-4 my-2">
          <img
            src="/src/assets/images/republic_seal_1794099637406.jpg"
            alt="Государственная печать"
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full border border-amber-600/40 shadow object-cover"
          />
          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-100 tracking-tight">
            {republicSetup.name.toUpperCase()}
          </h2>
        </div>
        <p className="text-xs text-amber-300/80 italic font-serif-title">
          «{republicSetup.motto || 'Свобода, Труд и Суверенитет'}»
        </p>
      </div>

      {/* Main Front Page Headline */}
      <div className="space-y-3">
        {event.isReactiveCrisis && event.crisisTriggerReason && (
          <div className="bg-red-950/80 border border-red-600/70 rounded-md p-3 text-xs text-red-200 flex items-start gap-2.5 animate-pulse">
            <span className="font-mono-numbers bg-red-600 text-stone-950 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase shrink-0 mt-0.5">
              Следствие вашего курса
            </span>
            <div className="leading-snug">
              <strong>Срочный созыв Совета Министров:</strong> {event.crisisTriggerReason}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono-numbers px-2 py-0.5 rounded border ${
              event.isReactiveCrisis
                ? 'bg-red-950 text-red-300 border-red-700 font-bold'
                : 'bg-amber-950/80 text-amber-300 border-amber-700/60'
            }`}
          >
            {event.category.toUpperCase()}
          </span>
          <span className="text-xs text-stone-400">
            {event.isReactiveCrisis ? 'Экстренный специальный выпуск' : 'Экстренная передовица'}
          </span>
        </div>
        <h3
          className={`text-xl sm:text-2xl font-serif-title font-bold leading-snug ${
            event.isReactiveCrisis ? 'text-red-100' : 'text-amber-100'
          }`}
        >
          {event.newspaperHeadline}
        </h3>
        <p className="text-stone-300 text-sm leading-relaxed border-l-2 border-amber-600/60 pl-3 italic">
          {event.newspaperSubtext}
        </p>
      </div>

      {/* Intelligence & Wire Cable Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="md:col-span-2 bg-stone-950/70 border border-stone-800 rounded p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-300 uppercase tracking-wide">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Доклад Совета Министров</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {event.situationReport}
          </p>
        </div>

        <div className="bg-stone-950/70 border border-amber-900/40 rounded p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wide">
            <Radio className="w-4 h-4 text-amber-400" />
            <span>Шифрограмма разведки</span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed font-mono-numbers">
            {event.intelligenceNote}
          </p>
        </div>
      </div>

      {/* Bottom CTA to Cabinet Table */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onProceedToDecision}
          className="w-full sm:w-auto px-5 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm rounded shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Перейти к экстренному совету кабинета</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
