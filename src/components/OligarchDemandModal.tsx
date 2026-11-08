import React from 'react';
import { OligarchDemand } from '../types/game';
import { sound } from '../utils/audio';
import { Briefcase, AlertTriangle, ArrowRight, ShieldCheck, Newspaper, Building2 } from 'lucide-react';

interface OligarchDemandModalProps {
  demand: OligarchDemand;
  month: number;
  onYieldAsset: () => void;
  onRefuseDemand: () => void;
  onOpenDoctrines: () => void;
}

export const OligarchDemandModal: React.FC<OligarchDemandModalProps> = ({
  demand,
  month,
  onYieldAsset,
  onRefuseDemand,
  onOpenDoctrines,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border-2 border-amber-600/70 rounded-xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono-numbers uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-600/60 font-bold">
                Ежемесячный шантаж элит · Месяц {month}
              </span>
            </div>
            <h3 className="text-xl font-serif-title font-bold text-stone-100 flex items-center gap-2 mt-1">
              <Briefcase className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Ультиматум Синдиката Промышленников</span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-950/80 border border-amber-600/50 flex items-center justify-center text-amber-400 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {/* Demanded Asset Box */}
        <div className="bg-stone-950/80 border border-stone-800 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-numbers uppercase tracking-wider text-amber-400 font-semibold">
              Требуемый государственный актив:
            </span>
            <span className="text-xs text-stone-400 font-mono-numbers">Рейдерский запрос</span>
          </div>
          <h4 className="text-base font-bold text-amber-100">
            {demand.assetName}
          </h4>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {demand.assetDescription}
          </p>
        </div>

        {/* Media Extortion Threat */}
        <div className="bg-red-950/40 border border-red-700/60 rounded-lg p-4 flex items-start gap-3">
          <Newspaper className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold uppercase tracking-wider text-red-300">
              Угроза медийным уничтожением рейтинга:
            </h5>
            <p className="text-xs text-stone-200 leading-relaxed italic">
              {demand.threatDetails}
            </p>
          </div>
        </div>

        {/* Informative Note about Stopping Demands */}
        <div className="text-[11px] text-stone-400 bg-stone-950/60 p-2.5 rounded border border-stone-800 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Эти требования будут повторяться каждый месяц, пока вы не примете один из трёх <strong>Указов о Доктрине Олигархата</strong> (Олигархический, Системный или Силовой).
            </span>
          </span>
        </div>

        {/* Decision Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          {/* Yield */}
          <button
            onClick={() => {
              sound.playStamp();
              onYieldAsset();
            }}
            className="p-3 rounded border border-stone-700 bg-stone-800 hover:bg-stone-750 text-left transition-all hover:border-amber-600/60 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="font-semibold text-xs text-stone-200">
                1. Отдать актив синдикату
              </div>
              <div className="text-[11px] text-stone-400 mt-1 leading-tight">
                Удовлетворить вымогательство. Олигархи довольны (+{demand.yieldAssetEffects.oligarchs}%), но народ возмущен ({demand.yieldAssetEffects.people}%).
              </div>
            </div>
            <span className="text-[10px] font-mono-numbers text-amber-300 mt-2">
              Уступить в этом месяце
            </span>
          </button>

          {/* Refuse */}
          <button
            onClick={() => {
              sound.playAlarm();
              onRefuseDemand();
            }}
            className="p-3 rounded border border-red-800/80 bg-red-950/40 hover:bg-red-950/60 text-left transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="font-semibold text-xs text-red-200">
                2. Отказать в передаче
              </div>
              <div className="text-[11px] text-stone-300 mt-1 leading-tight">
                Сохранить актив для страны. Олигархи включают клевету в СМИ: народная лояльность упадет на {Math.abs(demand.refuseEffects.people)}%!
              </div>
            </div>
            <span className="text-[10px] font-mono-numbers text-red-400 mt-2">
              Принять медийный удар
            </span>
          </button>

          {/* Enact Final Doctrine */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenDoctrines();
            }}
            className="p-3 rounded border border-amber-500 bg-amber-600 hover:bg-amber-500 text-stone-950 text-left transition-all flex flex-col justify-between shadow-lg cursor-pointer"
          >
            <div>
              <div className="font-bold text-xs">
                3. Решить вопрос навсегда
              </div>
              <div className="text-[11px] text-stone-900 mt-1 leading-tight font-medium">
                Перейти к Указам: выбрать Олигархическую, Системную или Силовую доктрину, чтобы прекратить вымогательства.
              </div>
            </div>
            <span className="text-[10px] font-mono-numbers uppercase tracking-wider flex items-center gap-1 font-bold mt-2">
              <span>Выбрать указ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
