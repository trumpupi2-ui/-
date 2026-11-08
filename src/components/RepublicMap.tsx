import React, { useState } from 'react';
import { RegionState } from '../types/game';
import { MapPin, ShieldAlert, CheckCircle2, AlertTriangle, Coins, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

interface RepublicMapProps {
  regions: RegionState[];
  budget: number;
  onSendAid: (regionId: string) => void;
  onDeployGarrison: (regionId: string) => void;
}

export const RepublicMap: React.FC<RepublicMapProps> = ({
  regions,
  budget,
  onSendAid,
  onDeployGarrison,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>(regions[0]?.id || 'capital');

  const selectedRegion = regions.find((r) => r.id === selectedRegionId) || regions[0];

  const getStabilityBadge = (val: number) => {
    if (val <= 35) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-red-400 bg-red-950/60 border border-red-800/80 px-2 py-0.5 rounded">
          <AlertTriangle className="w-3 h-3" />
          <span>Критическое напряжение</span>
        </span>
      );
    }
    if (val <= 60) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded">
          <ShieldAlert className="w-3 h-3" />
          <span>Брожение</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
        <CheckCircle2 className="w-3 h-3" />
        <span>Стабильно</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-5">
        <h2 className="text-xl font-serif-title font-bold text-amber-100 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-400" />
          <span>Военно-административная карта Республики</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1">
          Контроль за стабильностью ключевых провинций. Падение стабильности в регионах провоцирует забастовки и вооруженные мятежи.
        </p>
      </div>

      {/* Main Map Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Region List / Tactical Sectors */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {regions.map((reg) => {
            const isSelected = selectedRegion.id === reg.id;
            return (
              <div
                key={reg.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedRegionId(reg.id);
                }}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-500/40'
                    : 'bg-stone-900 hover:bg-stone-850 border-stone-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-stone-100 text-sm">{reg.name}</h3>
                    <p className="text-[11px] text-stone-400">{reg.type}</p>
                  </div>
                  {getStabilityBadge(reg.stability)}
                </div>

                {/* Stability Progress Bar */}
                <div className="space-y-1 mt-3">
                  <div className="flex justify-between text-[11px] text-stone-400 font-mono-numbers">
                    <span>Индекс стабильности</span>
                    <span className="font-bold text-stone-200">{reg.stability}%</span>
                  </div>
                  <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800">
                    <div
                      className={`h-full transition-all duration-300 ${
                        reg.stability <= 35
                          ? 'bg-red-500'
                          : reg.stability <= 60
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${reg.stability}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-stone-300 border-t border-stone-800 pt-2 truncate">
                  <span className="text-stone-400">Ресурсы:</span> {reg.economicOutput}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Region Detailed Dossier & Actions */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-stone-800 pb-3">
              <span className="text-[10px] font-mono-numbers text-amber-400 uppercase tracking-widest">
                Сводка комендатуры
              </span>
              <h3 className="text-lg font-serif-title font-bold text-stone-100">
                {selectedRegion.name}
              </h3>
              <p className="text-xs text-stone-400">{selectedRegion.type}</p>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {selectedRegion.description}
            </p>

            <div className="bg-stone-950/70 rounded p-3 text-xs space-y-2 border border-stone-800">
              <div className="flex justify-between">
                <span className="text-stone-400">Экономическая база:</span>
                <span className="text-stone-200 font-medium text-right">{selectedRegion.economicOutput}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Уровень стабильности:</span>
                <span className="font-mono-numbers font-bold text-amber-300">{selectedRegion.stability}%</span>
              </div>
            </div>
          </div>

          {/* Emergency Local Governor Directives */}
          <div className="space-y-2 pt-2 border-t border-stone-800">
            <div className="text-[11px] text-stone-400 uppercase tracking-wider">
              Меры стабилизации региона:
            </div>

            <button
              disabled={budget < 6 || selectedRegion.stability >= 90}
              onClick={() => {
                sound.playStamp();
                onSendAid(selectedRegion.id);
              }}
              className={`w-full py-2 px-3 text-xs rounded font-medium flex items-center justify-between border transition-all ${
                budget >= 6 && selectedRegion.stability < 90
                  ? 'bg-stone-800 hover:bg-stone-750 text-stone-100 border-stone-700 cursor-pointer'
                  : 'bg-stone-950 text-stone-600 border-stone-900 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>Направить гуманитарный транш (+15% стабильность)</span>
              </div>
              <span className="font-mono-numbers text-amber-400 font-semibold">-6 млн</span>
            </button>

            <button
              disabled={budget < 4 || selectedRegion.stability >= 90}
              onClick={() => {
                sound.playStamp();
                onDeployGarrison(selectedRegion.id);
              }}
              className={`w-full py-2 px-3 text-xs rounded font-medium flex items-center justify-between border transition-all ${
                budget >= 4 && selectedRegion.stability < 90
                  ? 'bg-stone-800 hover:bg-stone-750 text-stone-100 border-stone-700 cursor-pointer'
                  : 'bg-stone-950 text-stone-600 border-stone-900 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span>Усилить военный гарнизон (+10% стабильность)</span>
              </div>
              <span className="font-mono-numbers text-amber-400 font-semibold">-4 млн</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
