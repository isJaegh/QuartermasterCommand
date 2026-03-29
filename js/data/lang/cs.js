import { baseItems } from '../langBase.js';
import { helpContent } from '../helpContent.js';

export default {
    tabPrefs: "Předvolby", tabData: "Data", tabHelp: "Nápověda", tabView: "Zobrazit", tabGuide: "Průvodce", tabLegend: "Legenda",
    resetDesc: "Vymazat veškerý uložený inventář, košík a cíle.",
    shareTitle: "Sdílet / Importovat", shareDesc: "Vygenerujte kód pro sdílení nastavení.",
    btnGenCode: "Generovat a kopírovat", btnLoadCode: "Načíst kód", importSuccess: "Úspěšně načteno!", importError: "Neplatný kód.", exportSuccess: "Zkopírováno do schránky!",
    format: "Formát zobrazení", optUnits: "Jednotky", optStacks: "Hromádky (10k)", webhook: "Discord Webhook URL",

    btnProd: "Výroba", prodCmdTitle: "Výrobní panel", targetMetalLabel: "Cílový zdroj", crafters: "Řemeslníci", target: "Množství:",
    btnAutoFill: "Vyplnit vše", btnClearCart: "Vymazat",
    yieldMods: "Předvolby", mastery: "Mistrovství (+6%)", refining: "Rafinace (+3%)", extraction: "Těžba (+3%)", prefCatModifiers: "Modifikátory výnosu", prefCatRoute: "Trasa a zobrazení", prefCatWorkforce: "Pracovní síla",

    btnDiscord: "Kopírovat", btnSend: "Odeslat na Discord",
    btnPrefs: "Předvolby", yieldModsModal: "Předvolby",
    btnBank: "Inventář", invBankTitle: "Inventář",
    invBank: "Inventář", showAllBank: "Zobrazit vše", showAllCart: "Zobrazit vše", btnReset: "Resetovat vše", defGather: "Chybějící komponenty", mfgPipe: "Výrobní linka", marketCart: "Košík", marketCartTitle: "Košík",
    tblPrice: "Cena", tblBuy: "Koupit", tblCost: "Cena", tblStash: "Zásoba", cartTotal: "Košík celkem:", tblOrder: "Objednávka",
    noTarget: "Nebyl stanoven žádný cíl.", allCovered: "Inventář pokrývá všechny potřeby!", searchPlaceholder: "Hledat...",
    verbCrush: "Drtit", verbGrind: "Mlít", verbExtract: "Extrahovat", verbSmelt: "Tavit", verbBake: "Péct", verbAlloy: "Slévat", verbProcess: "Zpracovat",
    inMachine: "v", stepWith: "s", stepAnd: "a", perCrafter: "(Na řemeslníka)", stepPrefix: "Krok",
    stepYieldsMain: "Vynáší:", stepByproducts: "Vedlejší produkty:", none: "Žádné",
    pipeCompleted: "Pokrok", btnPipeReset: "Resetovat",
    tooltipBestYield: "Nejefektivnější (Nejnižší náklady)", tooltipMaxYield: "Max. vedlejších produktů", tooltipRegionLocked: "Regionálně uzamčeno",
    tooltipMaxCraft: "Vypočítat maximum z inventáře", tooltipShowAll: "Zobrazit nesouvisející předměty",
    resetPrompt: "Resetovat všechny hodnoty na nulu?", restartPrompt: "Restartovat linku?", modalActionsTitle: "Akce",
    discHeader: "LOGISTICKÁ OBJEDNÁVKA", discReq: "CHYBĚJÍCÍ KOMPONENTY:", discStock: "Všechny materiály pokryty.", discCopied: "Zkopírováno!",
    discMarket: "NÁKUPY NA TRHU:", errWebhook: "Zadejte platnou Discord URL.", errSend: "Chyba při odesílání.", sucSend: "Odesláno na Discord!",
    qAdd: "+10k", qAddStk: "+1 Hromádka", qSub: "-10k", qSubStk: "-1 Hromádka", byproductsTitle: "CELKEM VEDLEJŠÍ PRODUKTY", bpTitle: "CELKEM VEDLEJŠÍ PRODUKTY", btnBp: "Vedlejší produkty",
    btnPrefEfficient: "Efektivní cesta", btnPrefYield: "Max. Výnos", lblEfficient: "Efektivní", lblMaxYield: "Max. Výnos", lblRegionLocked: "Uzamčeno",
    chkBp: "Zobrazit vedlejší produkty", colorAccent: "Primární barva", colorBg: "Sekundární barva", colorText: "Barva textu", btnResetColors: "Resetovat barvy",
    viewPers: "Personalizace", viewVis: "Viditelnost modulů", viewLang: "Jazyk", viewGather: "Chybějící komponenty", viewPipe: "Výrobní linka", viewProdCmd: "Výrobní panel", viewByproducts: "Získané vedlejší produkty",
    btnCart: "Košík", btnSettings: "Nastavení", btnHelp: "Nápověda", btnExportCSV: "Exportovat CSV", actDiscord: "Odeslání Discord",
    btnMaxText: "Vypočítat Max. Výrobu", maxTitle: "Dosažen limit", maxAcknowledge: "Potvrdit",
    maxCraftAny: "S aktuálním inventářem nelze vyrobit [item].", maxMissing: "K dosažení cíle [target] chybí:", maxTotalCraft: "Máte materiály k výrobě", maxCalculatedGoal: "Dostatek materiálů pro cíl.",
    legAcronyms: "Zkratky", legEff: "Efektivní", legYld: "Max. Výnos", legReg: "Uzamčeno",

    categories: { raw: "Suroviny", basicExt: "Základní extrakce", intOre: "Mezirudy", advOre: "Pokročilé rudy", catalyst: "Katalyzátory", refined: "Rafinované kovy", "Raw Materials": "Suroviny", "Basic Extractions": "Základní extrakce", "Intermediate Ores": "Mezirudy", "Advanced Ores": "Pokročilé rudy", "Catalysts": "Katalyzátory", "Refined Metals": "Rafinované kovy" },
    items: baseItems,
    helpHtml: helpContent['cs'],

    ackBank: "Potvrdit", ackCart: "Potvrdit", ackPrefs: "Potvrdit", ackHelp: "Potvrdit", ackSettings: "Potvrdit",
    searchEmptyState: "Vyhledejte materiál pro zobrazení podrobností o výrobě.", searchNotFound: "Nebyl nalezen žádný materiál s tímto názvem.",
    tabMaterials: "Materiály",
    modByproductsTitle: "Získané vedlejší produkty", usesProducedFrom: "se vyrábí z:", usesCanMake: "lze použít k výrobě:", usesSetTarget: "Nastavit jako cíl", usesNone: "Žádné známé recepty nebo zdroje pro", usesDetails: "Podrobnosti", usesTitle: "Podrobnosti o materiálu", btnClose: "Zavřít",
    prodCmdHint: "Vyberte materiál pro výpočet vašeho výrobního plánu.", btnOverview: "Přehled", btnFocus: "Zaměření", statusReady: "Připraveno", statusSaved: "Uloženo", footerQuote: '"Ocel vyhrává bitvy, stříbro vyhrává války"', footerCopy: "© 2026 Vytvořil [MTM] Jaegh pro gildu MERCANTORM.", resetTooltip: "Resetovat na 10000"
};