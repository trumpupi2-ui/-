import React from 'react';
import { X, ShieldAlert, Coins, Users, Award, BookOpen, Compass } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-750 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-serif-title font-bold text-stone-100">
              Руководство Главы Государства: Памятка по выживанию
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-stone-200 hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <section className="space-y-1.5">
            <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-xs">
              1. Главная цель правления:
            </h4>
            <p>
              Вы управляете молодой республикой в критический первый год после распада старой империи (12 месяцев).
              Ваша задача — удержать баланс между враждующими сословиями, избежать банкротства и внешнего вторжения,
              и привести страну к одной из уникальных концовок (Демократия, Военная диктатура, Народный социализм, Олигархия, Вооружённый нейтралитет и др.).
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>2. Ресурсы Республики:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong>Казна:</strong> Бюджетные запасы в млн крон. Если казна упадёт до 0 при нехватке хлеба — наступит суверенный дефолт и крах.</li>
              <li><strong>Продовольствие:</strong> Обеспеченность хлебом и базовыми продуктами. Дефицит хлеба провоцирует голодные бунты рабочих.</li>
              <li><strong>Инфраструктура:</strong> Работоспособность ТЭЦ, шахт, заводов и железных дорог.</li>
              <li><strong>Боеготовность:</strong> Способность вооруженных сил отразить пограничный рейд или внешнюю интервенцию.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>3. Лояльность фракций и смертельные пороги:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-amber-200">Народ (Рабочие и крестьяне):</strong> Если лояльность упадёт ниже 10%, разъярённая толпа пойдёт на штурм правительственного дворца!</li>
              <li><strong className="text-sky-200">Генералы:</strong> Если лояльность генералитета упадёт ниже 10%, армия выведет танки на проспекты и объявит военный путч!</li>
              <li><strong className="text-amber-400">Олигархи:</strong> При отчуждении начинают вывод валюты за рубеж и саботаж сырьевых комбинатов.</li>
              <li><strong className="text-emerald-300">Интеллигенция и пресса:</strong> Обеспечивают моральную легитимность законов и открытость общества.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>4. Геополитика и Указы:</span>
            </h4>
            <p>
              Вы можете лавировать между Западным Альянсом, Северной Империей или сохранять абсолютный вооружённый нейтралитет.
              Во вкладке «Указы» вы можете в любой момент издавать внеочередные указы (субсидии на хлеб, повышение жалования офицерам, продажа активов), если позволяет казна.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>5. Динамическая реакция прямо во время игры:</span>
            </h4>
            <p>
              Игра мгновенно реагирует на ваши решения и опасные показатели, вызывая <strong>Чрезвычайные Кризисы</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-stone-300">
              <li><strong className="text-red-300">Казна &lt; 10 млн:</strong> Экстренное событие спасения от суверенного дефолта (распродажа золота, сбор с олигархов или печатный станок).</li>
              <li><strong className="text-amber-300">Продовольствие &lt; 50%:</strong> Хлебный кризис, очереди и разграбление амбаров (карточная система или закуп муки).</li>
              <li><strong className="text-amber-200">Лояльность народа &le; 40%:</strong> Антиправительственные демонстрации и баррикады на проспекте Независимости.</li>
              <li><strong className="text-sky-300">Лояльность генералов &le; 40%:</strong> Ультиматум Совета Офицеров и конфликт с армейским командованием.</li>
              <li><strong className="text-amber-400">Лояльность олигархов &le; 35%:</strong> Забастовка капитала, остановка печей и отток валюты в офшоры.</li>
              <li><strong className="text-stone-100">Последствия выборов:</strong> Национализация меди повлечет международный арест судов в портах; приглашение западных инструкторов вызовет налет имперской авиации; приватизация рудников приведет к аварии на шахте.</li>
              <li><strong className="text-emerald-300">Экономический бум:</strong> Если казна &gt; 50 млн и народ &gt; 60%, откроется событие создания Фонда будущих поколений!</li>
            </ul>
          </section>
        </div>

        <div className="pt-3 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs rounded transition-colors"
          >
            Понятно, вернуться к государственным делам
          </button>
        </div>
      </div>
    </div>
  );
};
