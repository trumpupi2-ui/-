import { OligarchDemand } from '../types/game';

export const OLIGARCH_DEMANDS: Record<number, OligarchDemand> = {
  1: {
    month: 1,
    assetName: 'Медный рудник «Северный»',
    assetDescription: 'Крупнейший государственный рудник меди в предгорьях. Синдикат Вернера требует передачи бессрочной лицензии на добычу за символические 5% от роялти.',
    threatDetails: '«Медиа-холдинг Вернера готов выпустить в эфир сюжет о тайных счетах премьера. Рейтинг народного доверия рухнет на 12%, если вы откажете!»',
    yieldAssetEffects: {
      oligarchs: 20,
      people: -8,
      industry: -6,
      budget: 6
    },
    refuseEffects: {
      people: -14,
      oligarchs: -12,
      intellectuals: -4
    }
  },
  2: {
    month: 2,
    assetName: 'Глубоководный терминал «Порт-Надежда»',
    assetDescription: 'Главные экспортные пирсы для налива нефтепродуктов и зерна. Олигархи требуют приватизации 70% акций терминала под предлогом "инвестиций в краны".',
    threatDetails: '«Наши радиостанции и столичные газеты уже подготовили расследование о некомпетентности правительства. Откажетесь — мы парализуем ваш авторитет!»',
    yieldAssetEffects: {
      oligarchs: 22,
      people: -10,
      industry: -8,
      budget: 8
    },
    refuseEffects: {
      people: -14,
      oligarchs: -14,
      intellectuals: -6
    }
  },
  3: {
    month: 3,
    assetName: 'Центральные зернохранилища Степнополья',
    assetDescription: 'Сеть стратегических элеваторов для государственного резерва. Синдикат намерен взять их в долгосрочную концессию для экспорта зерна за границу.',
    threatDetails: '«В случае отказа наши телеканалы начнут кампанию о неизбежном голоде по вине власти. Народ выйдет на улицы сметать ваши магазины!»',
    yieldAssetEffects: {
      oligarchs: 18,
      people: -12,
      food: -10,
      budget: 6
    },
    refuseEffects: {
      people: -15,
      oligarchs: -10,
      intellectuals: -4
    }
  },
  4: {
    month: 4,
    assetName: 'Черногорская энергораспределительная сеть',
    assetDescription: 'Высоковольтные подстанции промышленного бассейна. Магнаты хотят право единолично устанавливать тарифы на электричество для населения и фабрик.',
    threatDetails: '«Мы включим рупор всех подконтрольных изданий: назовем вас душителями свободного предпринимательства и обвалим котировки облигаций Республики!»',
    yieldAssetEffects: {
      oligarchs: 24,
      people: -14,
      industry: -8,
      budget: 10
    },
    refuseEffects: {
      people: -16,
      oligarchs: -16,
      intellectuals: -6
    }
  },
  5: {
    month: 5,
    assetName: 'Государственный химический комбинат «Азот»',
    assetDescription: 'Единственный в Республике завод минеральных удобрений. Олигархи требуют передать его за долги по льготным кредитам.',
    threatDetails: '«Откажете — завтра на первых полосах выйдет компромат на генералов и министров. Мы устроим вам медийный ад!»',
    yieldAssetEffects: {
      oligarchs: 20,
      people: -8,
      industry: -6,
      budget: 8
    },
    refuseEffects: {
      people: -14,
      oligarchs: -12,
      intellectuals: -4
    }
  },
  6: {
    month: 6,
    assetName: 'Магистральная железная дорога «Север — Юг»',
    assetDescription: 'Главная транспортная артерия страны. Картель требует приватизировать локомотивное депо и передать частным операторам грузовые тарифы.',
    threatDetails: '«Наши таблоиды выставят правительство шайкой дилетантов. Рейтинги главы государства упадут до исторического минимума!»',
    yieldAssetEffects: {
      oligarchs: 22,
      people: -12,
      industry: -10,
      budget: 8
    },
    refuseEffects: {
      people: -15,
      oligarchs: -14,
      intellectuals: -5
    }
  },
  7: {
    month: 7,
    assetName: 'Нефтеперерабатывающий завод «Аврора-Ойл»',
    assetDescription: 'НПЗ, снабжающий бензином армию и сельхозтехнику. Синдикат жаждет эксклюзивного контроля над переработкой.',
    threatDetails: '«Выборы не за горами. Без нашей медийной поддержки вас сомнут на первом же митинге. Отдайте завод!»',
    yieldAssetEffects: {
      oligarchs: 25,
      people: -12,
      budget: 12
    },
    refuseEffects: {
      people: -16,
      oligarchs: -15,
      intellectuals: -6
    }
  },
  8: {
    month: 8,
    assetName: 'Золотоносные прииски долины Рифей',
    assetDescription: 'Государственные запасы золотого песка. Олигархи настаивают на передаче лицензии их закрытому акционерному обществу.',
    threatDetails: '«Отказ будет стоить вам доверия столицы. Медиа-холдинг запустит цикл репортажей о краже народных богатств чиновниками!»',
    yieldAssetEffects: {
      oligarchs: 22,
      people: -10,
      budget: 10
    },
    refuseEffects: {
      people: -14,
      oligarchs: -14,
      intellectuals: -4
    }
  },
  9: {
    month: 9,
    assetName: 'Столичная телевышка и радиорелейная сеть',
    assetDescription: 'Стратегический узел государственного телерадиовещания. Магнаты хотят приватизировать частоты и продавать эфирное время.',
    threatDetails: '«Если мы не договоримся по-хорошему, завтра на экранах будут круглосуточно крутить сюжеты с критикой каждого вашего шага!»',
    yieldAssetEffects: {
      oligarchs: 26,
      people: -16,
      budget: 8
    },
    refuseEffects: {
      people: -18,
      oligarchs: -16,
      intellectuals: -8
    }
  },
  10: {
    month: 10,
    assetName: 'Торговый морской флот Республики',
    assetDescription: 'Сухогрузы и танкеры, закупленные на остатки союзного бюджета. Синдикат требует списать суда на их баланс.',
    threatDetails: '«Не злите спонсоров вашей государственности. Мы профинансируем любую оппозицию, если вы пойдете против нас!»',
    yieldAssetEffects: {
      oligarchs: 24,
      people: -12,
      industry: -8,
      budget: 10
    },
    refuseEffects: {
      people: -15,
      oligarchs: -15,
      intellectuals: -6
    }
  },
  11: {
    month: 11,
    assetName: 'Лесопромышленный комплекс Таёжный',
    assetDescription: 'Экспорт ценных пород древесины. Олигархи требуют снять квоты на вырубку и отдать комбинат в частные руки.',
    threatDetails: '«Финальный ультиматум: отдайте актив, или медийная машина уничтожит вашу репутацию перед годовщиной!»',
    yieldAssetEffects: {
      oligarchs: 22,
      people: -10,
      budget: 8
    },
    refuseEffects: {
      people: -15,
      oligarchs: -14,
      intellectuals: -5
    }
  },
  12: {
    month: 12,
    assetName: 'Здание Национального Резервного Банка',
    assetDescription: 'Сердце валютной системы страны. Банковский картель требует приватизации права на выпуск коммерческих векселей.',
    threatDetails: '«Олигархат решает, кому править страной. Подпишите акт передачи, либо мы обвалим курс валюты перед референдумом!»',
    yieldAssetEffects: {
      oligarchs: 25,
      people: -14,
      budget: 12
    },
    refuseEffects: {
      people: -16,
      oligarchs: -18,
      intellectuals: -8
    }
  }
};

export function getOligarchDemandForMonth(month: number): OligarchDemand {
  return OLIGARCH_DEMANDS[month] || OLIGARCH_DEMANDS[1];
}
