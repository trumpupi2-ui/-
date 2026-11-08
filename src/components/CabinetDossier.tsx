import React from 'react';
import { Adviser, GameFactions } from '../types/game';
import { Users, Shield, Briefcase, GraduationCap, Globe } from 'lucide-react';

interface CabinetDossierProps {
  advisers: Adviser[];
  factions: GameFactions;
}

export const CabinetDossier: React.FC<CabinetDossierProps> = ({ advisers, factions }) => {
  const getFactionScore = (faction: keyof GameFactions | 'diplomacy') => {
    if (faction === 'diplomacy') return null;
    return factions[faction];
  };

  const getFactionIcon = (faction: keyof GameFactions | 'diplomacy') => {
    switch (faction) {
      case 'people':
        return <Users className="w-4 h-4 text-amber-400" />;
      case 'army':
        return <Shield className="w-4 h-4 text-sky-400" />;
      case 'oligarchs':
        return <Briefcase className="w-4 h-4 text-amber-500" />;
      case 'intellectuals':
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      default:
        return <Globe className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-5">
        <h2 className="text-xl font-serif-title font-bold text-amber-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-400" />
          <span>Персональные досье кабинета министров и советников</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1">
          Ключевые политические акторы молодой Республики. Каждый представляет интересы определенного сословия и фракции.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {advisers.map((adviser) => {
          const score = getFactionScore(adviser.faction);
          return (
            <div
              key={adviser.id}
              className="bg-stone-900 border border-stone-800 rounded-lg p-5 space-y-3 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-stone-950 border-2 border-amber-600/50 flex items-center justify-center font-bold font-serif-title text-base text-amber-300 shadow">
                      {adviser.avatarInitials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-100 text-base">
                        {adviser.name}
                      </h3>
                      <p className="text-xs text-amber-300/80">{adviser.title}</p>
                    </div>
                  </div>
                  <div className="p-1.5 rounded bg-stone-950 border border-stone-800">
                    {getFactionIcon(adviser.faction)}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {adviser.description}
                </p>

                <div className="bg-stone-950/70 border border-stone-800/80 rounded p-3 text-xs text-stone-300 italic font-serif-title">
                  {adviser.stance}
                </div>
              </div>

              {score !== null && (
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Текущая лояльность фракции:</span>
                  <span className="font-mono-numbers font-bold text-amber-400">{score}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
