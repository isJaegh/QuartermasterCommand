import { baseItems } from '../langBase.js';
import { helpContent } from '../helpContent.js';

export default {
    tabPrefs: "Налаштування", tabData: "Дані", tabHelp: "Допомога", tabView: "Вигляд", tabGuide: "Гайд", tabLegend: "Легенда",
    resetDesc: "Очистити весь інвентар, кошик та цілі.",
    shareTitle: "Поділитися / Імпорт", shareDesc: "Створити код для обміну налаштуваннями.",
    btnGenCode: "Створити та Копіювати", btnLoadCode: "Завантажити Код", importSuccess: "Успішно завантажено!", importError: "Недійсний код.", exportSuccess: "Скопійовано!",
    format: "Формат відображення", optUnits: "Одиниці", optStacks: "Стаки (10k)", webhook: "Discord Webhook URL",

    btnProd: "Виробництво", prodCmdTitle: "Панель виробництва", targetMetalLabel: "Цільовий ресурс", crafters: "Ремісники", target: "Кількість:",
    btnAutoFill: "Заповнити все", btnClearCart: "Очистити",
    yieldMods: "Налаштування", mastery: "Майстерність (+6%)", refining: "Очищення (+3%)", extraction: "Видобуток (+3%)", prefCatModifiers: "Модифікатори виходу", prefCatRoute: "Маршрут та відображення", prefCatWorkforce: "Робоча сила",

    btnDiscord: "Скопіювати", btnSend: "Відправити в Discord",
    btnPrefs: "Налаштування", yieldModsModal: "Налаштування",
    btnBank: "Інвентар", invBankTitle: "Інвентар",
    invBank: "Інвентар", showAllBank: "Показати все", showAllCart: "Показати все", btnReset: "Скинути все", defGather: "Відсутні компоненти", mfgPipe: "Лінія виробництва", marketCart: "Кошик", marketCartTitle: "Кошик",
    tblPrice: "Ціна", tblBuy: "Купити", tblCost: "Вартість", tblStash: "Запас", cartTotal: "Всього кошик:", tblOrder: "Замовлення",
    noTarget: "Ціль не задана.", allCovered: "Інвентар покриває всі потреби!", searchPlaceholder: "Пошук...",
    verbCrush: "Подрібнити", verbGrind: "Молоти", verbExtract: "Видобувати", verbSmelt: "Плавити", verbBake: "Випікати", verbAlloy: "Сплавлять", verbProcess: "Обробляти",
    inMachine: "в", stepWith: "з", stepAnd: "та", perCrafter: "(На ремісника)", stepPrefix: "Крок",
    stepYieldsMain: "Дає:", stepByproducts: "Побічні продукти:", none: "Немає",
    pipeCompleted: "Прогрес", btnPipeReset: "Скинути",
    tooltipBestYield: "Найефективніший (Мін. витрати)", tooltipMaxYield: "Макс. побічних продуктів", tooltipRegionLocked: "Блок регіону",
    tooltipMaxCraft: "Розрахувати максимум з інвентарю", tooltipShowAll: "Показати незв'язані елементи",
    resetPrompt: "Скинути всі значення до нуля?", restartPrompt: "Перезапустити лінію?", modalActionsTitle: "Дії",
    discHeader: "ЛОГІСТИЧНЕ ЗАМОВЛЕННЯ", discReq: "ВІДСУТНІ КОМПОНЕНТИ:", discStock: "Всі матеріали в наявності.", discCopied: "Скопійовано!",
    discMarket: "ПОКУПКИ НА РИНКУ:", errWebhook: "Введіть коректний URL Discord.", errSend: "Помилка відправки.", sucSend: "Успішно відправлено!",
    qAdd: "+10k", qAddStk: "+1 Стак", qSub: "-10k", qSubStk: "-1 Стак", byproductsTitle: "ВСЬОГО ПОБІЧНИХ", bpTitle: "ВСЬОГО ПОБІЧНИХ", btnBp: "Побічні продукти",
    btnPrefEfficient: "Ефективний шлях", btnPrefYield: "Макс. Вихід", lblEfficient: "Ефективно", lblMaxYield: "Макс. Вихід", lblRegionLocked: "Блок регіону",
    chkBp: "Показати побічні", colorAccent: "Основний колір", colorBg: "Вторинний колір", colorText: "Колір тексту", btnResetColors: "Скинути кольори",
    viewPers: "Персоналізація", viewVis: "Видимість модулів", viewLang: "Мова", viewGather: "Відсутні компоненти", viewPipe: "Лінія виробництва", viewProdCmd: "Панель виробництва", viewByproducts: "Отримані побічні продукти",
    btnCart: "Кошик", btnSettings: "Налаштування", btnHelp: "Допомога", btnExportCSV: "Експорт CSV", actDiscord: "Відправка Discord",
    btnMaxText: "Розрахувати максимум", maxTitle: "Досягнуто межу", maxAcknowledge: "Підтвердити",
    maxCraftAny: "Неможливо створити [item] з поточного інвентарю.", maxMissing: "Для досягнення цілі [target] не вистачає:", maxTotalCraft: "У вас є матеріали для створення", maxCalculatedGoal: "Матеріалів достатньо для цілі.",
    legAcronyms: "Абревіатури", legEff: "Ефективно", legYld: "Макс. Вихід", legReg: "Блок регіону",

    categories: { raw: "Сировина", basicExt: "Базові екстракції", intOre: "Проміжні руди", advOre: "Просунуті руди", catalyst: "Каталізатори", refined: "Очищені метали", "Raw Materials": "Сировина", "Basic Extractions": "Базові екстракції", "Intermediate Ores": "Проміжні руди", "Advanced Ores": "Просунуті руди", "Catalysts": "Каталізатори", "Refined Metals": "Очищені метали" },
    items: baseItems,
    helpHtml: helpContent['uk'],

    ackBank: "Підтвердити", ackCart: "Підтвердити", ackPrefs: "Підтвердити", ackHelp: "Підтвердити", ackSettings: "Підтвердити",
    searchEmptyState: "Знайдіть матеріал, щоб переглянути деталі виробництва.", searchNotFound: "Матеріал з такою назвою не знайдено.",
    tabMaterials: "Матеріали",
    modByproductsTitle: "Отримані побічні продукти", usesProducedFrom: "виробляється з:", usesCanMake: "можна використати для створення:", usesSetTarget: "Встановити як ціль", usesNone: "Немає відомих рецептів або джерел для", usesDetails: "Деталі", usesTitle: "Деталі матеріалу", btnClose: "Закрити",
    prodCmdHint: "Виберіть матеріал для розрахунку плану виробництва.", btnOverview: "Огляд", btnFocus: "Фокус", statusReady: "Готово", statusSaved: "Збережено", footerQuote: '"Сталь виграє битви, срібло виграє війни"', footerCopy: "© 2026 Створено [MTM] Jaegh для гільдії MERCANTORM.", resetTooltip: "Скинути до 10000"
};