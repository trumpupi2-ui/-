import { Decree } from '../types/game';

export const DECREES_CATALOG: Decree[] = [
  // ТРИ ФУНДАМЕНТАЛЬНЫХ УКАЗА ПО БОРЬБЕ С ВЫМОГАТЕЛЬСТВАМИ ОЛИГАРХАТА
  {
    id: 'decree_oligarchy_corporate',
    title: 'Корпоративный Пакт (Олигархический выбор)',
    category: 'Доктрина',
    doctrineType: 'corporate',
    costBudget: -15, // Синдикат вносит 15 млн в знак "партнерства"
    description: 'Полный союз с крупным капиталом. Государство закрепляет монополии, передает стратегические активы магнатам и вводит их в Совет Республики.',
    debuffDescription: 'ДЕБАФФ: Народ чувствует себя преданным (-16% лояльность народа, -12% суверенитет, повышенная склонность рабочих к забастовкам). Постоянные ежемесячные требования активов навсегда прекращаются.',
    cooldownMonths: 999,
    effects: {
      budget: 15,
      oligarchs: 35,
      people: -16,
      intellectuals: -12,
      sovereignty: -12
    }
  },
  {
    id: 'decree_oligarchy_systemic',
    title: 'Антимонопольный Кодекс (Системный выбор)',
    category: 'Доктрина',
    doctrineType: 'systemic',
    costBudget: 12, // Институциональная реформа стоит 12 млн
    description: 'Создание здоровой рыночной системы: Антимонопольный Комитет, обязательные открытые тендеры, разделение медиа-активов и защита честной конкуренции.',
    debuffDescription: 'ДЕБАФФ: Высокая стоимость внедрения (-12 млн из казны, олигархи недовольны ограничениями -15%, бюрократическое замедление инициатив). Постоянные ежемесячные требования активов навсегда прекращаются.',
    cooldownMonths: 999,
    effects: {
      budget: -12,
      intellectuals: 25,
      people: 12,
      industry: 10,
      oligarchs: -15,
      sovereignty: 8
    }
  },
  {
    id: 'decree_oligarchy_iron',
    title: 'Декрет о Деолигархизации (Силовой выбор)',
    category: 'Доктрина',
    doctrineType: 'iron',
    costBudget: 6, // Силовая спецоперация
    description: 'Беспощадная зачистка олигархата силами спецслужб и военной юстиции: конфискация монополий, арест теневых счетов, национализация частных телеканалов.',
    debuffDescription: 'ДЕБАФФ: Экономический шок и отток частных инвестиций (-14% промышленность/экспорт из-за разрыва контрактов, олигархи в ярости -45%). Постоянные ежемесячные требования активов навсегда прекращаются.',
    cooldownMonths: 999,
    effects: {
      budget: 8,
      people: 25,
      sovereignty: 20,
      oligarchs: -45,
      industry: -14,
      army: 8
    }
  },

  {
    id: 'bread_subsidies',
    title: 'Субсидирование хлеба и базовых продуктов',
    category: 'Экономика',
    costBudget: 10,
    description: 'Государственная компенсация пекарням и магазинам для сдерживания цен. Спасает малоимущих от нищеты, но ложится грузом на бюджет.',
    cooldownMonths: 2,
    effects: {
      budget: -10,
      food: 12,
      people: 15,
      oligarchs: -6
    }
  },
  {
    id: 'military_pay',
    title: 'Индексация офицерского жалования',
    category: 'Безопасность',
    costBudget: 12,
    description: 'Срочная выплата боевых надбавок и квартирных субсидий командному составу. Укрепляет преданность генералов и дисциплину в частях.',
    cooldownMonths: 3,
    effects: {
      budget: -12,
      army: 18,
      military: 8,
      intellectuals: -5
    }
  },
  {
    id: 'press_charter',
    title: 'Хартия свободы слова и открытости правительства',
    category: 'Общество',
    costBudget: 3,
    description: 'Запрет цензуры, открытые заседания кабинета министров и аккредитация независимых изданий. Вызывает восторг прессы и тревогу спецслужб.',
    cooldownMonths: 4,
    effects: {
      budget: -3,
      intellectuals: 20,
      people: 10,
      army: -8,
      sovereignty: 5
    }
  },
  {
    id: 'curfew_order',
    title: 'Усиленное патрулирование и комендантский час',
    category: 'Безопасность',
    costBudget: 6,
    description: 'Вывод армейских патрулей на ночные улицы и досмотр подозрительного транспорта. Снижает уличную преступность ценой раздражения горожан.',
    cooldownMonths: 2,
    effects: {
      budget: -6,
      army: 10,
      military: 6,
      people: -12,
      intellectuals: -14
    }
  },
  {
    id: 'privatization_bonds',
    title: 'Продажа неликвидных госпредприятий олигархам',
    category: 'Экономика',
    costBudget: -18, // gives 18 budget!
    description: 'Аукцион по продаже простаивающих складов и части портовых терминалов крупному капиталу. Даёт немедленный приток валюты, но злит левых активистов.',
    cooldownMonths: 4,
    effects: {
      budget: 18,
      oligarchs: 18,
      people: -14,
      intellectuals: -10,
      sovereignty: -5
    }
  },
  {
    id: 'land_grant',
    title: 'Аграрный надел: поддержка семейных ферм',
    category: 'Экономика',
    costBudget: 8,
    description: 'Передача неиспользуемых государственных угодий молодым фермерам с беспроцентными ссудами на семена. Повышает урожайность в следующем квартале.',
    cooldownMonths: 3,
    effects: {
      budget: -8,
      food: 16,
      people: 12,
      oligarchs: -8
    }
  },
  {
    id: 'anti_corruption',
    title: 'Создание Независимого Антикоррупционного Бюро',
    category: 'Общество',
    costBudget: 9,
    description: 'Специальная прокуратура с мандатом на проверку счетов высших чиновников и генералов. Вдохновляет народ, но вызывает панику у элит.',
    cooldownMonths: 4,
    effects: {
      budget: -9,
      intellectuals: 16,
      people: 14,
      oligarchs: -16,
      army: -10
    }
  },
  {
    id: 'emergency_grain_levy',
    title: 'Чрезвычайный резервный продовольственный фонд',
    category: 'Экономика',
    costBudget: 7,
    description: 'Формирование государственного неприкосновенного запаса зерна и медикаментов на случай блокады или неурожая.',
    cooldownMonths: 3,
    effects: {
      budget: -7,
      food: 20,
      people: 6,
      industry: -4
    }
  }
];
