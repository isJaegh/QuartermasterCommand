import { baseItems } from '../langBase.js';
import { helpContent } from '../helpContent.js';

export default {
    tabPrefs: "Inställningar", tabData: "Data", tabHelp: "Hjälp", tabView: "Vy", tabGuide: "Guide", tabLegend: "Teckenförklaring",
    resetDesc: "Rensa alla sparade förråd, kundvagn och mål.",
    shareTitle: "Dela / Importera", shareDesc: "Skapa en kod för att dela inställningar.",
    btnGenCode: "Skapa & Kopiera", btnLoadCode: "Ladda Kod", importSuccess: "Laddades framgångsrikt!", importError: "Ogiltig kod.", exportSuccess: "Kopierad till urklipp!",
    format: "Visningsformat", optUnits: "Enheter", optStacks: "Travar (10k)", webhook: "Discord Webhook URL",

    btnProd: "Produktion", prodCmdTitle: "Produktionspanel", targetMetalLabel: "Målresurs", crafters: "Hantverkare", target: "Mängd:",
    btnAutoFill: "Fyll i alla", btnClearCart: "Rensa",
    yieldMods: "Inställningar", mastery: "Mästerskap (+6%)", refining: "Raffinering (+3%)", extraction: "Extraktion (+3%)", prefCatModifiers: "Avkastningsmodifierare", prefCatRoute: "Rutt och visning", prefCatWorkforce: "Arbetskraft",

    btnDiscord: "Kopiera", btnSend: "Skicka till Discord",
    btnPrefs: "Inställningar", yieldModsModal: "Inställningar",
    btnBank: "Förråd", invBankTitle: "Förråd",
    invBank: "Förråd", showAllBank: "Visa allt", showAllCart: "Visa allt", btnReset: "Återställ allt", defGather: "Saknade komponenter", mfgPipe: "Produktionslinje", marketCart: "Kundvagn", marketCartTitle: "Kundvagn",
    tblPrice: "Pris", tblBuy: "Köpa", tblCost: "Kostnad", tblStash: "Lager", cartTotal: "Kundvagn Total:", tblOrder: "Beställning",
    noTarget: "Inget mål satt.", allCovered: "Förrådet täcker alla behov!", searchPlaceholder: "Sök...",
    verbCrush: "Krossa", verbGrind: "Mal", verbExtract: "Extrahera", verbSmelt: "Smält", verbBake: "Baka", verbAlloy: "Legera", verbProcess: "Bearbeta",
    inMachine: "i", stepWith: "med", stepAnd: "och", perCrafter: "(Per hantverkare)", stepPrefix: "Steg",
    stepYieldsMain: "Ger:", stepByproducts: "Biprodukter:", none: "Inga",
    pipeCompleted: "Framsteg", btnPipeReset: "Återställ",
    tooltipBestYield: "Mest Effektiv (Lägsta kostnad)", tooltipMaxYield: "Max. Biprodukter", tooltipRegionLocked: "Regionlåst",
    tooltipMaxCraft: "Beräkna max från förrådet", tooltipShowAll: "Visa orelaterade föremål",
    resetPrompt: "Återställ alla värden till noll?", restartPrompt: "Starta om linjen?", modalActionsTitle: "Åtgärder",
    discHeader: "LOGISTIKORDER", discReq: "SAKNADE KOMPONENTER:", discStock: "Alla material täckta.", discCopied: "Kopierad!",
    discMarket: "MARKNADSKÖP:", errWebhook: "Ange en giltig Discord URL.", errSend: "Kunde inte skicka.", sucSend: "Skickad till Discord!",
    qAdd: "+10k", qAddStk: "+1 Trave", qSub: "-10k", qSubStk: "-1 Trave", byproductsTitle: "TOTALA BIPRODUKTER", bpTitle: "TOTALA BIPRODUKTER", btnBp: "Biprodukter",
    btnPrefEfficient: "Effektiv Väg", btnPrefYield: "Max. Utbyte", lblEfficient: "Effektiv", lblMaxYield: "Max. Utbyte", lblRegionLocked: "Regionlåst",
    chkBp: "Visa biprodukter", colorAccent: "Primärfärg", colorBg: "Sekundärfärg", colorText: "Textfärg", btnResetColors: "Återställ färger",
    viewPers: "Personalisering", viewVis: "Modulsynlighet", viewLang: "Språk", viewGather: "Saknade komponenter", viewPipe: "Produktionslinje", viewProdCmd: "Produktionspanel", viewByproducts: "Återvunna biprodukter",
    btnCart: "Kundvagn", btnSettings: "Inställningar", btnHelp: "Hjälp", btnExportCSV: "Exportera CSV", actDiscord: "Discord Utskick",
    btnMaxText: "Beräkna Max. Tillverkning", maxTitle: "Gräns nådd", maxAcknowledge: "Acceptera",
    maxCraftAny: "Kan inte tillverka [item] med nuvarande förråd.", maxMissing: "För att nå målet [target] saknas:", maxTotalCraft: "Du har material för att tillverka", maxCalculatedGoal: "Tillräckligt med material finns.",
    legAcronyms: "Förkortningar", legEff: "Effektiv", legYld: "Max. Utbyte", legReg: "Regionlåst",

    categories: { raw: "Råmaterial", basicExt: "Grundextraktioner", intOre: "Mellanmalmer", advOre: "Avancerade Malmer", catalyst: "Katalysatorer", refined: "Raffinerade Metaller", "Raw Materials": "Råmaterial", "Basic Extractions": "Grundextraktioner", "Intermediate Ores": "Mellanmalmer", "Advanced Ores": "Avancerade Malmer", "Catalysts": "Katalysatorer", "Refined Metals": "Raffinerade Metaller" },
    items: baseItems,
    helpHtml: helpContent['sv'],

    ackBank: "Bekräfta", ackCart: "Bekräfta", ackPrefs: "Bekräfta", ackHelp: "Bekräfta", ackSettings: "Bekräfta",
    searchEmptyState: "Sök efter ett material för att se produktionsdetaljer.", searchNotFound: "Inget material hittades med det namnet.",
    tabMaterials: "Material",
    modByproductsTitle: "Återvunna biprodukter", usesProducedFrom: "produceras från:", usesCanMake: "kan användas för att göra:", usesSetTarget: "Sätt som mål", usesNone: "Inga kända recept eller källor för", usesDetails: "Detaljer", usesTitle: "Materialdetaljer", btnClose: "Stäng",
    prodCmdHint: "Välj ett material för att beräkna din produktionsplan.", btnOverview: "Översikt", btnFocus: "Fokus", statusReady: "Redo", statusSaved: "Sparad", footerQuote: '"Stål vinner strider, silver vinner krig"', footerCopy: "© 2026 Skapad av [MTM] Jaegh för MERCANTORM-gillet.", resetTooltip: "Återställ till 10000"
};