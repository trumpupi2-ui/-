import React, { useState, useEffect } from 'react';
import {
  GameResources,
  GameFactions,
  GameDiplomacy,
  RegionState,
  Decree,
  ChronicleEntry,
  ChoiceOption,
  Ending,
  RepublicSetup,
  GameDifficulty,
  OligarchyDoctrine,
} from './types/game';
import { MONTHLY_EVENTS } from './data/events';
import { DECREES_CATALOG } from './data/decrees';
import { INITIAL_REGIONS } from './data/regions';
import { ADVISERS } from './data/advisers';
import { ENDINGS_DATABASE, evaluateEnding } from './data/endings';
import { evaluateReactiveCrisis } from './data/reactiveEvents';
import { getOligarchDemandForMonth } from './data/oligarchDemands';
import { sound } from './utils/audio';

import { Header } from './components/Header';
import { ResourceBar } from './components/ResourceBar';
import { NewspaperBriefing } from './components/NewspaperBriefing';
import { DecisionCabinet } from './components/DecisionCabinet';
import { OutcomeModal } from './components/OutcomeModal';
import { RepublicMap } from './components/RepublicMap';
import { DecreeModal } from './components/DecreeModal';
import { CabinetDossier } from './components/CabinetDossier';
import { ChronicleModal } from './components/ChronicleModal';
import { StartScreen } from './components/StartScreen';
import { EndingScreen } from './components/EndingScreen';
import { RulesModal } from './components/RulesModal';
import { OligarchDemandModal } from './components/OligarchDemandModal';
import { AlertTriangle } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'ENDING'>('START');
  const [republicSetup, setRepublicSetup] = useState<RepublicSetup>({
    name: 'Республика Новирия',
    leaderTitle: 'Председатель Совета Республики',
    leaderName: 'Александр Вольф',
    motto: 'Свобода, Труд и Суверенитет',
    heritage: 'industrial',
  });
  const [difficulty, setDifficulty] = useState<GameDifficulty>('standard');
  const [month, setMonth] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'cabinet' | 'map' | 'decrees' | 'ministers' | 'chronicle'>('cabinet');
  const [cabinetStep, setCabinetStep] = useState<'newspaper' | 'decision'>('newspaper');

  // Core Game Metrics
  const [resources, setResources] = useState<GameResources>({
    budget: 28,
    food: 45,
    industry: 50,
    military: 48,
  });

  const [factions, setFactions] = useState<GameFactions>({
    people: 50,
    army: 50,
    oligarchs: 48,
    intellectuals: 52,
  });

  const [diplomacy, setDiplomacy] = useState<GameDiplomacy>({
    geopolitics: 0,
    sovereignty: 55,
  });

  const [regions, setRegions] = useState<RegionState[]>(INITIAL_REGIONS);
  const [decrees, setDecrees] = useState<Decree[]>(DECREES_CATALOG);
  const [chronicle, setChronicle] = useState<ChronicleEntry[]>([]);
  const [lastSignedOption, setLastSignedOption] = useState<ChoiceOption | null>(null);
  const [ending, setEnding] = useState<Ending | null>(null);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(sound.enabled);

  // Dynamic reaction tracking
  const [flags, setFlags] = useState<string[]>([]);
  const [triggeredCrisisIds, setTriggeredCrisisIds] = useState<string[]>([]);
  const [activeCrisis, setActiveCrisis] = useState<any | null>(null);

  // Oligarch Cartel Monthly Extortion & State Doctrine
  const [oligarchyDoctrine, setOligarchyDoctrine] = useState<OligarchyDoctrine>('none');
  const [resolvedOligarchDemandMonths, setResolvedOligarchDemandMonths] = useState<number[]>([]);
  const [isOligarchDemandOpen, setIsOligarchDemandOpen] = useState<boolean>(false);

  // Load saved session if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem('republic_save_session');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.gameState && data.republicSetup) {
          setGameState(data.gameState);
          setRepublicSetup(data.republicSetup);
          setDifficulty(data.difficulty || 'standard');
          setMonth(data.month || 1);
          setResources(data.resources);
          setFactions(data.factions);
          setDiplomacy(data.diplomacy);
          setRegions(data.regions || INITIAL_REGIONS);
          setDecrees(data.decrees || DECREES_CATALOG);
          setChronicle(data.chronicle || []);
          setFlags(data.flags || []);
          setTriggeredCrisisIds(data.triggeredCrisisIds || []);
          setOligarchyDoctrine(data.oligarchyDoctrine || 'none');
          setResolvedOligarchDemandMonths(data.resolvedOligarchDemandMonths || []);
          if (data.activeCrisis) setActiveCrisis(data.activeCrisis);
          if (data.ending) setEnding(data.ending);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save session helper
  const persistSession = (overrides: Record<string, unknown> = {}) => {
    try {
      const payload = {
        gameState,
        republicSetup,
        difficulty,
        month,
        resources,
        factions,
        diplomacy,
        regions,
        decrees,
        chronicle,
        flags,
        triggeredCrisisIds,
        activeCrisis,
        ending,
        oligarchyDoctrine,
        resolvedOligarchDemandMonths,
        ...overrides,
      };
      localStorage.setItem('republic_save_session', JSON.stringify(payload));
    } catch {
      // ignore
    }
  };

  // Start Game with customized republic and heritage bonuses
  const handleStartGame = (setup: RepublicSetup, diff: GameDifficulty) => {
    const baseBudget = diff === 'hardcore' ? 18 : 28;
    const baseFood = diff === 'hardcore' ? 36 : 46;
    const basePeople = diff === 'hardcore' ? 42 : 50;
    const baseArmy = diff === 'hardcore' ? 44 : 50;

    let initRes: GameResources = {
      budget: baseBudget,
      food: baseFood,
      industry: 48,
      military: 48,
    };

    let initFac: GameFactions = {
      people: basePeople,
      army: baseArmy,
      oligarchs: 48,
      intellectuals: 50,
    };

    let initDip: GameDiplomacy = {
      geopolitics: 0,
      sovereignty: 55,
    };

    // Apply Heritage modifiers
    if (setup.heritage === 'industrial') {
      initRes.industry += 14;
      initRes.budget += 6;
      initFac.people -= 8;
    } else if (setup.heritage === 'agrarian') {
      initRes.food += 20;
      initFac.people += 10;
      initRes.industry -= 10;
    } else if (setup.heritage === 'trade') {
      initRes.budget += 18;
      initFac.oligarchs += 14;
      initDip.sovereignty -= 10;
    } else if (setup.heritage === 'liberty') {
      initFac.intellectuals += 16;
      initFac.people += 12;
      initFac.army -= 12;
    }

    setRepublicSetup(setup);
    setDifficulty(diff);
    setResources(initRes);
    setFactions(initFac);
    setDiplomacy(initDip);
    setMonth(1);
    setRegions(INITIAL_REGIONS);
    setDecrees(DECREES_CATALOG);
    setChronicle([]);
    setLastSignedOption(null);
    setEnding(null);
    setFlags([]);
    setTriggeredCrisisIds([]);
    setActiveCrisis(null);
    setOligarchyDoctrine('none');
    setResolvedOligarchDemandMonths([]);
    setIsOligarchDemandOpen(true); // Month 1 extortion demand presented
    setCabinetStep('newspaper');
    setActiveTab('cabinet');
    setGameState('PLAYING');

    persistSession({
      gameState: 'PLAYING',
      republicSetup: setup,
      difficulty: diff,
      month: 1,
      resources: initRes,
      factions: initFac,
      diplomacy: initDip,
      regions: INITIAL_REGIONS,
      decrees: DECREES_CATALOG,
      chronicle: [],
      flags: [],
      triggeredCrisisIds: [],
      activeCrisis: null,
      ending: null,
      oligarchyDoctrine: 'none',
      resolvedOligarchDemandMonths: [],
    });
  };

  // Reset Game
  const handleRestart = () => {
    localStorage.removeItem('republic_save_session');
    setGameState('START');
    setEnding(null);
    setLastSignedOption(null);
    setFlags([]);
    setTriggeredCrisisIds([]);
    setActiveCrisis(null);
    setOligarchyDoctrine('none');
    setResolvedOligarchDemandMonths([]);
    setIsOligarchDemandOpen(false);
  };

  // Current Month or Crisis Event
  const currentEvent = activeCrisis || MONTHLY_EVENTS.find((e) => e.month === month) || MONTHLY_EVENTS[0];

  // Check early failure states
  const checkEarlyDefeat = (
    newRes: GameResources,
    newFac: GameFactions,
    newMonth: number
  ): Ending | null => {
    if (newFac.army <= 10) {
      return ENDINGS_DATABASE.coup_defeat;
    }
    if (newFac.people <= 10) {
      return ENDINGS_DATABASE.revolution_defeat;
    }
    if (newRes.budget <= 0 && newRes.food <= 10) {
      return ENDINGS_DATABASE.bankruptcy_defeat;
    }
    if (newRes.military <= 10 && (newMonth === 3 || newMonth === 11)) {
      return ENDINGS_DATABASE.invasion_defeat;
    }
    return null;
  };

  // Check for condition-triggered and choice-triggered reactive crises
  const checkForReactiveCrisis = (
    currentRes: GameResources,
    currentFac: GameFactions,
    currentDip: GameDiplomacy,
    currentMonth: number,
    currentFlags: string[],
    currentTriggeredIds: string[]
  ) => {
    const crisis = evaluateReactiveCrisis({
      resources: currentRes,
      factions: currentFac,
      diplomacy: currentDip,
      month: currentMonth,
      flags: currentFlags,
      triggeredCrisisIds: currentTriggeredIds,
    });
    if (crisis) {
      setActiveCrisis(crisis);
      sound.playAlarm();
      setActiveTab('cabinet');
      setCabinetStep('newspaper');
      return crisis;
    }
    return null;
  };

  // Execute a choice from the cabinet
  const handleSelectOption = (option: ChoiceOption) => {
    // 1. Calculate new metrics
    const newResources: GameResources = {
      budget: Math.max(0, Math.min(100, resources.budget + (option.effects.budget || 0))),
      food: Math.max(0, Math.min(100, resources.food + (option.effects.food || 0))),
      industry: Math.max(0, Math.min(100, resources.industry + (option.effects.industry || 0))),
      military: Math.max(0, Math.min(100, resources.military + (option.effects.military || 0))),
    };

    const newFactions: GameFactions = {
      people: Math.max(0, Math.min(100, factions.people + (option.effects.people || 0))),
      army: Math.max(0, Math.min(100, factions.army + (option.effects.army || 0))),
      oligarchs: Math.max(0, Math.min(100, factions.oligarchs + (option.effects.oligarchs || 0))),
      intellectuals: Math.max(0, Math.min(100, factions.intellectuals + (option.effects.intellectuals || 0))),
    };

    const newDiplomacy: GameDiplomacy = {
      geopolitics: Math.max(-100, Math.min(100, diplomacy.geopolitics + (option.effects.geopolitics || 0))),
      sovereignty: Math.max(0, Math.min(100, diplomacy.sovereignty + (option.effects.sovereignty || 0))),
    };

    // 2. Region impact
    let newRegions = [...regions];
    if (option.regionImpact) {
      newRegions = newRegions.map((reg: RegionState) => {
        if (reg.id === option.regionImpact!.regionId) {
          const nextStab = Math.max(5, Math.min(100, reg.stability + option.regionImpact!.stabilityDelta));
          const nextUnrest: RegionState['unrest'] = nextStab <= 35 ? 'riot' : nextStab <= 60 ? 'agitated' : 'calm';
          return { ...reg, stability: nextStab, unrest: nextUnrest };
        }
        return reg;
      });
    }

    // 3. Flags and Crisis tracking
    let newFlags = [...flags];
    if (option.flagSetOnChoose && !newFlags.includes(option.flagSetOnChoose)) {
      newFlags.push(option.flagSetOnChoose);
      setFlags(newFlags);
    }

    let newTriggeredIds = [...triggeredCrisisIds];
    if (activeCrisis && !newTriggeredIds.includes(activeCrisis.id)) {
      newTriggeredIds.push(activeCrisis.id);
      setTriggeredCrisisIds(newTriggeredIds);
    }

    // 4. Chronicle entry
    const newEntry: ChronicleEntry = {
      month,
      eventTitle: currentEvent.title,
      choiceTitle: option.title,
      outcomeText: option.outcomeNarrative,
      impactSummary: `${option.effects.budget ? `Казна: ${option.effects.budget > 0 ? '+' : ''}${option.effects.budget} ` : ''}${option.effects.people ? `Народ: ${option.effects.people > 0 ? '+' : ''}${option.effects.people}` : ''}`,
    };
    const nextChronicle = [...chronicle, newEntry];

    setResources(newResources);
    setFactions(newFactions);
    setDiplomacy(newDiplomacy);
    setRegions(newRegions);
    setChronicle(nextChronicle);
    setLastSignedOption(option);

    // Check if early defeat triggered
    const earlyDefeat = checkEarlyDefeat(newResources, newFactions, month);
    if (earlyDefeat) {
      sound.playAlarm();
      setEnding(earlyDefeat);
    }

    persistSession({
      resources: newResources,
      factions: newFactions,
      diplomacy: newDiplomacy,
      regions: newRegions,
      chronicle: nextChronicle,
      flags: newFlags,
      triggeredCrisisIds: newTriggeredIds,
      ending: earlyDefeat,
    });
  };

  // Oligarch Extortion Handlers
  const handleYieldOligarchAsset = () => {
    const demand = getOligarchDemandForMonth(month);
    const eff = demand.yieldAssetEffects;

    const newRes: GameResources = {
      budget: Math.max(0, Math.min(100, resources.budget + (eff.budget || 0))),
      food: Math.max(0, Math.min(100, resources.food + (eff.food || 0))),
      industry: Math.max(0, Math.min(100, resources.industry + (eff.industry || 0))),
      military: Math.max(0, Math.min(100, resources.military + (eff.military || 0))),
    };

    const newFac: GameFactions = {
      people: Math.max(0, Math.min(100, factions.people + (eff.people || 0))),
      army: Math.max(0, Math.min(100, factions.army + (eff.army || 0))),
      oligarchs: Math.max(0, Math.min(100, factions.oligarchs + (eff.oligarchs || 0))),
      intellectuals: Math.max(0, Math.min(100, factions.intellectuals + (eff.intellectuals || 0))),
    };

    const nextResolved = [...resolvedOligarchDemandMonths, month];
    setResolvedOligarchDemandMonths(nextResolved);
    setIsOligarchDemandOpen(false);

    const chronicleEntry: ChronicleEntry = {
      month,
      eventTitle: `Шантаж синдиката: ${demand.assetName}`,
      choiceTitle: 'Уступка актива магнатам',
      outcomeText: `Правительство уступило ультиматуму, передав олигархам «${demand.assetName}». Синдикат временно доволен (+${eff.oligarchs}%), но авторитет власти в народе пошатнулся (${eff.people}%).`,
      impactSummary: `Олигархи: +${eff.oligarchs}%, Народ: ${eff.people}%`,
    };
    const nextChronicle = [...chronicle, chronicleEntry];
    setChronicle(nextChronicle);

    setResources(newRes);
    setFactions(newFac);

    const earlyDefeat = checkEarlyDefeat(newRes, newFac, month);
    if (earlyDefeat) {
      sound.playAlarm();
      setEnding(earlyDefeat);
      setGameState('ENDING');
    } else {
      checkForReactiveCrisis(newRes, newFac, diplomacy, month, flags, triggeredCrisisIds);
    }

    persistSession({
      resources: newRes,
      factions: newFac,
      resolvedOligarchDemandMonths: nextResolved,
      chronicle: nextChronicle,
      ending: earlyDefeat,
    });
  };

  const handleRefuseOligarchDemand = () => {
    const demand = getOligarchDemandForMonth(month);
    const eff = demand.refuseEffects;

    const newRes: GameResources = {
      budget: Math.max(0, Math.min(100, resources.budget + (eff.budget || 0))),
      food: Math.max(0, Math.min(100, resources.food + (eff.food || 0))),
      industry: Math.max(0, Math.min(100, resources.industry + (eff.industry || 0))),
      military: Math.max(0, Math.min(100, resources.military + (eff.military || 0))),
    };

    const newFac: GameFactions = {
      people: Math.max(0, Math.min(100, factions.people + (eff.people || 0))),
      army: Math.max(0, Math.min(100, factions.army + (eff.army || 0))),
      oligarchs: Math.max(0, Math.min(100, factions.oligarchs + (eff.oligarchs || 0))),
      intellectuals: Math.max(0, Math.min(100, factions.intellectuals + (eff.intellectuals || 0))),
    };

    const nextResolved = [...resolvedOligarchDemandMonths, month];
    setResolvedOligarchDemandMonths(nextResolved);
    setIsOligarchDemandOpen(false);

    const chronicleEntry: ChronicleEntry = {
      month,
      eventTitle: `Шантаж синдиката: ${demand.assetName}`,
      choiceTitle: 'Отказ в передаче актива',
      outcomeText: `Власти отклонили ультиматум и отстояли «${demand.assetName}». Синдикат пустил в ход медиа-активы: заказные разоблачения и газетная клевета обрушили рейтинг доверия на ${Math.abs(eff.people)}%.`,
      impactSummary: `Народная лояльность: ${eff.people}%, Олигархи: ${eff.oligarchs}%`,
    };
    const nextChronicle = [...chronicle, chronicleEntry];
    setChronicle(nextChronicle);

    setResources(newRes);
    setFactions(newFac);

    const earlyDefeat = checkEarlyDefeat(newRes, newFac, month);
    if (earlyDefeat) {
      sound.playAlarm();
      setEnding(earlyDefeat);
      setGameState('ENDING');
    } else {
      checkForReactiveCrisis(newRes, newFac, diplomacy, month, flags, triggeredCrisisIds);
    }

    persistSession({
      resources: newRes,
      factions: newFac,
      resolvedOligarchDemandMonths: nextResolved,
      chronicle: nextChronicle,
      ending: earlyDefeat,
    });
  };

  const handleOpenDoctrinesFromDemand = () => {
    setIsOligarchDemandOpen(false);
    setActiveTab('decrees');
  };

  // Proceed to next month from outcome modal
  const handleProceedNextMonth = () => {
    setLastSignedOption(null);

    // If early defeat occurred, transition to ending screen
    if (ending) {
      setGameState('ENDING');
      return;
    }

    // If we just resolved a reactive crisis
    if (activeCrisis) {
      setActiveCrisis(null);
      // Check if another crisis immediately flares up from the fallout
      const nextCrisis = checkForReactiveCrisis(
        resources,
        factions,
        diplomacy,
        month,
        flags,
        triggeredCrisisIds
      );
      if (nextCrisis) {
        return;
      }
      setCabinetStep('newspaper');
      setActiveTab('cabinet');
      return;
    }

    // If month 12 was completed, trigger final evaluation
    if (month >= 12) {
      sound.playGavel();
      const finalVerdict = evaluateEnding(resources, factions, diplomacy);
      setEnding(finalVerdict);
      setGameState('ENDING');
      persistSession({ gameState: 'ENDING', ending: finalVerdict });
      return;
    }

    // Otherwise advance to next month
    const nextMonth = month + 1;
    setMonth(nextMonth);
    setCabinetStep('newspaper');
    setActiveTab('cabinet');

    // If oligarchy doctrine has not been chosen, trigger monthly extortion demand
    if (oligarchyDoctrine === 'none' && !resolvedOligarchDemandMonths.includes(nextMonth)) {
      setIsOligarchDemandOpen(true);
    }

    // Check if a condition-triggered reactive crisis should intercept the new month!
    checkForReactiveCrisis(
      resources,
      factions,
      diplomacy,
      nextMonth,
      flags,
      triggeredCrisisIds
    );

    persistSession({ month: nextMonth });
  };

  // Regional actions
  const handleSendAidToRegion = (regionId: string) => {
    if (resources.budget < 6) return;
    const newRes = { ...resources, budget: resources.budget - 6 };
    const newRegions = regions.map((r: RegionState) => {
      if (r.id === regionId) {
        const nextStab = Math.min(100, r.stability + 15);
        return {
          ...r,
          stability: nextStab,
          unrest: (nextStab <= 35 ? 'riot' : nextStab <= 60 ? 'agitated' : 'calm') as RegionState['unrest'],
        };
      }
      return r;
    });
    setResources(newRes);
    setRegions(newRegions);
    persistSession({ resources: newRes, regions: newRegions });
  };

  const handleDeployGarrisonToRegion = (regionId: string) => {
    if (resources.budget < 4) return;
    const newRes = { ...resources, budget: resources.budget - 4 };
    const newRegions = regions.map((r: RegionState) => {
      if (r.id === regionId) {
        const nextStab = Math.min(100, r.stability + 10);
        return {
          ...r,
          stability: nextStab,
          unrest: (nextStab <= 35 ? 'riot' : nextStab <= 60 ? 'agitated' : 'calm') as RegionState['unrest'],
        };
      }
      return r;
    });
    setResources(newRes);
    setRegions(newRegions);
    persistSession({ resources: newRes, regions: newRegions });
  };

  // Enact decree (standard or doctrine)
  const handleEnactDecree = (decreeId: string) => {
    const dec = decrees.find((d: Decree) => d.id === decreeId);
    if (!dec) return;
    if (dec.costBudget > 0 && resources.budget < dec.costBudget) return;

    const newRes: GameResources = {
      budget: Math.max(0, Math.min(100, resources.budget - dec.costBudget + (dec.effects.budget || 0))),
      food: Math.max(0, Math.min(100, resources.food + (dec.effects.food || 0))),
      industry: Math.max(0, Math.min(100, resources.industry + (dec.effects.industry || 0))),
      military: Math.max(0, Math.min(100, resources.military + (dec.effects.military || 0))),
    };

    const newFac: GameFactions = {
      people: Math.max(0, Math.min(100, factions.people + (dec.effects.people || 0))),
      army: Math.max(0, Math.min(100, factions.army + (dec.effects.army || 0))),
      oligarchs: Math.max(0, Math.min(100, factions.oligarchs + (dec.effects.oligarchs || 0))),
      intellectuals: Math.max(0, Math.min(100, factions.intellectuals + (dec.effects.intellectuals || 0))),
    };

    const newDip: GameDiplomacy = {
      geopolitics: Math.max(-100, Math.min(100, diplomacy.geopolitics + (dec.effects.geopolitics || 0))),
      sovereignty: Math.max(0, Math.min(100, diplomacy.sovereignty + (dec.effects.sovereignty || 0))),
    };

    const updatedDecrees = decrees.map((d: Decree) => {
      if (d.id === decreeId) {
        return { ...d, lastEnactedMonth: month };
      }
      return d;
    });

    let nextDoctrine = oligarchyDoctrine;
    let nextChronicle = chronicle;

    // Check if this was one of the 3 Oligarchy Doctrine decrees
    if (dec.doctrineType) {
      nextDoctrine = dec.doctrineType;
      setOligarchyDoctrine(dec.doctrineType);
      setIsOligarchDemandOpen(false);

      const doctrineEntry: ChronicleEntry = {
        month,
        eventTitle: 'Утверждение Доктрины Отношений с Олигархатом',
        choiceTitle: dec.title,
        outcomeText: `${dec.description} ${dec.debuffDescription || ''}`,
        impactSummary: `Доктрина: ${dec.title}`,
      };
      nextChronicle = [...chronicle, doctrineEntry];
      setChronicle(nextChronicle);
    }

    setResources(newRes);
    setFactions(newFac);
    setDiplomacy(newDip);
    setDecrees(updatedDecrees);

    // Check early defeat from decree backfires
    const earlyDefeat = checkEarlyDefeat(newRes, newFac, month);
    if (earlyDefeat) {
      sound.playAlarm();
      setEnding(earlyDefeat);
      setGameState('ENDING');
    } else {
      // Check if enacting this decree tipped a metric into a reactive crisis!
      checkForReactiveCrisis(newRes, newFac, newDip, month, flags, triggeredCrisisIds);
    }

    persistSession({
      resources: newRes,
      factions: newFac,
      diplomacy: newDip,
      decrees: updatedDecrees,
      oligarchyDoctrine: nextDoctrine,
      chronicle: nextChronicle,
      ending: earlyDefeat,
    });
  };

  const availableDecreesCount = decrees.filter((d: Decree) => {
    if (d.category === 'Доктрина' && oligarchyDoctrine !== 'none') {
      return false;
    }
    if (d.lastEnactedMonth !== undefined && month - d.lastEnactedMonth < d.cooldownMonths) {
      return false;
    }
    if (d.costBudget > 0 && resources.budget < d.costBudget) {
      return false;
    }
    return true;
  }).length;

  // View Routing
  if (gameState === 'START') {
    return (
      <>
        <StartScreen
          onStartGame={handleStartGame}
          onOpenRules={() => setIsRulesOpen(true)}
        />
        {isRulesOpen && <RulesModal onClose={() => setIsRulesOpen(false)} />}
      </>
    );
  }

  if (gameState === 'ENDING' && ending) {
    return (
      <>
        <EndingScreen
          ending={ending}
          republicSetup={republicSetup}
          resources={resources}
          factions={factions}
          diplomacy={diplomacy}
          onRestart={handleRestart}
          onOpenChronicle={() => {
            setGameState('PLAYING');
            setActiveTab('chronicle');
          }}
        />
        {isRulesOpen && <RulesModal onClose={() => setIsRulesOpen(false)} />}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-900 selection:text-amber-100">
      {/* 3-Zone Header Bar */}
      <Header
        republicName={republicSetup.name}
        month={month}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRules={() => setIsRulesOpen(true)}
        onRestart={handleRestart}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
        availableDecreesCount={availableDecreesCount}
        isCrisisActive={!!activeCrisis}
      />

      {/* Resource & Faction Loyalty Dashboard */}
      <ResourceBar
        resources={resources}
        factions={factions}
        diplomacy={diplomacy}
        oligarchyDoctrine={oligarchyDoctrine}
        onOpenDecrees={() => setActiveTab('decrees')}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 pb-12">
        {/* Subtle persistent banner if an oligarch demand is pending this month and hasn't been dealt with yet */}
        {oligarchyDoctrine === 'none' && !resolvedOligarchDemandMonths.includes(month) && !isOligarchDemandOpen && (
          <div className="mb-4 bg-amber-950/70 border border-amber-600/70 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-lg animate-in fade-in">
            <div className="flex items-center gap-2 text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
              <span>
                <strong>Ультиматум Синдиката (Месяц {month}):</strong> Магнаты требуют передать «{getOligarchDemandForMonth(month).assetName}» под угрозой дискредитации в СМИ.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsOligarchDemandOpen(true)}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded font-semibold text-xs cursor-pointer shadow"
              >
                Рассмотреть ультиматум
              </button>
              <button
                onClick={() => setActiveTab('decrees')}
                className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded text-xs cursor-pointer"
              >
                Указы о Доктрине
              </button>
            </div>
          </div>
        )}

        {activeTab === 'cabinet' && (
          <>
            {cabinetStep === 'newspaper' ? (
              <NewspaperBriefing
                event={currentEvent}
                republicSetup={republicSetup}
                month={month}
                onProceedToDecision={() => {
                  sound.playTelegraph();
                  setCabinetStep('decision');
                }}
              />
            ) : (
              <DecisionCabinet
                event={currentEvent}
                advisers={ADVISERS}
                onSelectOption={handleSelectOption}
                onBackToNewspaper={() => setCabinetStep('newspaper')}
              />
            )}
          </>
        )}

        {activeTab === 'map' && (
          <RepublicMap
            regions={regions}
            budget={resources.budget}
            onSendAid={handleSendAidToRegion}
            onDeployGarrison={handleDeployGarrisonToRegion}
          />
        )}

        {activeTab === 'decrees' && (
          <DecreeModal
            decrees={decrees}
            budget={resources.budget}
            currentMonth={month}
            oligarchyDoctrine={oligarchyDoctrine}
            onEnactDecree={handleEnactDecree}
          />
        )}

        {activeTab === 'ministers' && (
          <CabinetDossier
            advisers={ADVISERS}
            factions={factions}
          />
        )}

        {activeTab === 'chronicle' && (
          <ChronicleModal
            entries={chronicle}
            currentMonth={month}
          />
        )}
      </main>

      {/* Monthly Oligarch Extortion Demand Modal */}
      {isOligarchDemandOpen && oligarchyDoctrine === 'none' && !lastSignedOption && (
        <OligarchDemandModal
          demand={getOligarchDemandForMonth(month)}
          month={month}
          onYieldAsset={handleYieldOligarchAsset}
          onRefuseDemand={handleRefuseOligarchDemand}
          onOpenDoctrines={handleOpenDoctrinesFromDemand}
        />
      )}

      {/* Signed Decision Outcome Modal */}
      {lastSignedOption && (
        <OutcomeModal
          option={lastSignedOption}
          month={month}
          onNextMonth={handleProceedNextMonth}
        />
      )}

      {/* Statecraft Rules / Manual Modal */}
      {isRulesOpen && <RulesModal onClose={() => setIsRulesOpen(false)} />}
    </div>
  );
}
