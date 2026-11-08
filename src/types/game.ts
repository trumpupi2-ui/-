export interface GameResources {
  budget: number;       // Казна (0-100)
  food: number;         // Продовольствие (0-100)
  industry: number;     // Промышленность & энергетика (0-100)
  military: number;     // Армия и обороноспособность (0-100)
}

export interface GameFactions {
  people: number;       // Лояльность народа (0-100)
  army: number;         // Лояльность генералитета (0-100)
  oligarchs: number;    // Лояльность олигархов и бизнеса (0-100)
  intellectuals: number;// Лояльность реформаторов и прессы (0-100)
}

export interface GameDiplomacy {
  geopolitics: number;  // -100 (Западный Альянс) ... 0 (Суверенный Нейтралитет) ... +100 (Северная Империя)
  sovereignty: number;  // 0-100 (Независимость от внешнего диктата)
}

export interface RegionState {
  id: string;
  name: string;
  type: string;
  description: string;
  stability: number;    // 0-100
  unrest: 'calm' | 'agitated' | 'riot';
  economicOutput: string;
}

export interface Adviser {
  id: string;
  name: string;
  title: string;
  faction: keyof GameFactions | 'diplomacy';
  avatarInitials: string;
  description: string;
  stance: string;
}

export interface ChoiceOption {
  id: string;
  title: string;
  description: string;
  adviserBacking?: string; // adviser name
  outcomeNarrative: string;
  costDescription?: string;
  flagSetOnChoose?: string; // Flag stored to trigger future consequences
  effects: {
    budget?: number;
    food?: number;
    industry?: number;
    military?: number;
    people?: number;
    army?: number;
    oligarchs?: number;
    intellectuals?: number;
    geopolitics?: number;
    sovereignty?: number;
  };
  regionImpact?: {
    regionId: string;
    stabilityDelta: number;
  };
  tag?: string;
}

export interface GameEvent {
  id: string;
  month: number;
  title: string;
  category: 'Кризис' | 'Экономика' | 'Безопасность' | 'Дипломатия' | 'Политика' | 'Чрезвычайный Кризис';
  newspaperHeadline: string;
  newspaperSubtext: string;
  situationReport: string;
  intelligenceNote: string;
  isReactiveCrisis?: boolean;
  crisisTriggerReason?: string;
  adviserQuotes: {
    adviserId: string;
    advice: string;
  }[];
  options: ChoiceOption[];
}

export type OligarchyDoctrine = 'none' | 'corporate' | 'systemic' | 'iron';

export interface OligarchDemand {
  month: number;
  assetName: string;
  assetDescription: string;
  threatDetails: string;
  yieldAssetEffects: {
    budget?: number;
    industry?: number;
    food?: number;
    military?: number;
    oligarchs: number;
    people: number;
    army?: number;
    intellectuals?: number;
  };
  refuseEffects: {
    budget?: number;
    industry?: number;
    food?: number;
    military?: number;
    people: number;
    oligarchs: number;
    intellectuals: number;
    army?: number;
  };
}

export interface Decree {
  id: string;
  title: string;
  category: 'Экономика' | 'Безопасность' | 'Общество' | 'Дипломатия' | 'Доктрина';
  costBudget: number;
  description: string;
  cooldownMonths: number;
  lastEnactedMonth?: number;
  doctrineType?: 'corporate' | 'systemic' | 'iron';
  debuffDescription?: string;
  effects: {
    budget?: number;
    food?: number;
    industry?: number;
    military?: number;
    people?: number;
    army?: number;
    oligarchs?: number;
    intellectuals?: number;
    geopolitics?: number;
    sovereignty?: number;
  };
}

export interface ChronicleEntry {
  month: number;
  eventTitle: string;
  choiceTitle: string;
  outcomeText: string;
  impactSummary: string;
}

export interface Ending {
  id: string;
  title: string;
  statusTitle: string;
  category: 'victory' | 'reform' | 'authoritarian' | 'puppet' | 'collapse' | 'special';
  badge: string;
  synopsis: string;
  epilogue: string;
  legacyText: string;
  conditionsDescription: string;
}

export type GameDifficulty = 'standard' | 'hardcore';

export interface RepublicSetup {
  name: string;
  leaderTitle: string;
  leaderName: string;
  motto: string;
  heritage: 'industrial' | 'agrarian' | 'trade' | 'liberty';
}
