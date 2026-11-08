import React from 'react';
import { ChronicleEntry } from '../types/game';
import { Scroll, Calendar, CheckCircle2 } from 'lucide-react';

interface ChronicleModalProps {
  entries: ChronicleEntry[];
  currentMonth: number;
}

export const ChronicleModal: React.FC<ChronicleModalProps> = ({ entries, currentMonth }) => {
  return (
    <div className="space-y-6">
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-5">
        <h2 className="text-xl font-serif-title font-bold text-amber-100 flex items-center gap-2">
          <Scroll className="w-5 h-5 text-amber-400" />
          <span>Летопись Республики: Хроника государственных решений</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1">
          Архив всех принятых постановлений и их последствий для истории страны (текущий ход: {currentMonth}-й месяц).
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-8 text-center text-stone-400 text-sm">
          Летопись только начинается. Примите первое государственное решение в Кабинете министров.
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.month}
              className="bg-stone-900 border border-stone-800 rounded-lg p-5 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 text-xs font-mono-numbers flex items-center justify-center font-bold">
                    {entry.month}
                  </span>
                  <span className="text-xs font-mono-numbers uppercase tracking-wider text-amber-400 font-semibold">
                    Месяц {entry.month} · {entry.eventTitle}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 flex items-center gap-1 font-mono-numbers">
                  <Calendar className="w-3 h-3 text-stone-500" />
                  Год I
                </span>
              </div>

              <div>
                <div className="text-xs text-stone-400">Утверждённый указ:</div>
                <div className="font-semibold text-stone-100 text-sm flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{entry.choiceTitle}</span>
                </div>
              </div>

              <div className="bg-stone-950/70 border border-stone-800/80 rounded p-3 text-xs text-stone-300 italic font-serif-title leading-relaxed">
                «{entry.outcomeText}»
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
