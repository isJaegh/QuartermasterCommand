import { baseItems } from '../langBase.js';
import { helpContent } from '../helpContent.js';

export default {
    tabPrefs: "Asetukset", tabData: "Tiedot", tabHelp: "Apua", tabView: "Näkymä", tabGuide: "Opas", tabLegend: "Selite",
    resetDesc: "Tyhjennä kaikki varasto, ostoskori ja tavoitteet.",
    shareTitle: "Jaa / Tuo asetukset", shareDesc: "Luo koodi jakamista varten.",
    btnGenCode: "Luo ja kopioi", btnLoadCode: "Lataa koodi", importSuccess: "Ladattu onnistuneesti!", importError: "Virheellinen koodi.", exportSuccess: "Kopioitu leikepöydälle!",
    format: "Esitysmuoto", optUnits: "Yksiköt", optStacks: "Pinot (10k)", webhook: "Discord Webhook URL",

    btnProd: "Tuotanto", prodCmdTitle: "Tuotantopaneeli", targetMetalLabel: "Kohderesurssi", crafters: "Käsityöläiset", target: "Määrä:",
    btnAutoFill: "Täytä Kaikki", btnClearCart: "Tyhjennä",
    yieldMods: "Asetukset", mastery: "Mestaruus (+6%)", refining: "Jalostus (+3%)", extraction: "Louhinta (+3%)", prefCatModifiers: "Tuottomuokkaimet", prefCatRoute: "Reitti ja näyttö", prefCatWorkforce: "Työvoima",

    btnDiscord: "Kopioi leikepöydälle", btnSend: "Lähetä Discordiin",
    btnPrefs: "Asetukset", yieldModsModal: "Asetukset",
    btnBank: "Varasto", invBankTitle: "Varasto",
    invBank: "Varasto", showAllBank: "Näytä kaikki", showAllCart: "Näytä kaikki", btnReset: "Nollaa kaikki", defGather: "Puuttuvat komponentit", mfgPipe: "Tuotantolinja", marketCart: "Ostoskori", marketCartTitle: "Ostoskori",
    tblPrice: "Hinta", tblBuy: "Osta", tblCost: "Kustannus", tblStash: "Varasto", cartTotal: "Korin yhteensä:", tblOrder: "Tilaus",
    noTarget: "Ei tavoitetta.", allCovered: "Varasto kattaa kaiken!", searchPlaceholder: "Etsi...",
    verbCrush: "Murskaa", verbGrind: "Jauha", verbExtract: "Erota", verbSmelt: "Sulata", verbBake: "Paista", verbAlloy: "Seosta", verbProcess: "Käsittele",
    inMachine: "koneessa", stepWith: "kanssa", stepAnd: "ja", perCrafter: "(Per käsityöläinen)", stepPrefix: "Vaihe",
    stepYieldsMain: "Tuottaa:", stepByproducts: "Sivutuotteet:", none: "Ei mitään",
    pipeCompleted: "Edistyminen", btnPipeReset: "Nollaa",
    tooltipBestYield: "Tehokkain (Pienimmät kustannukset)", tooltipMaxYield: "Maks. sivutuotteet", tooltipRegionLocked: "Aluelukittu",
    tooltipMaxCraft: "Laske maksimi varastosta", tooltipShowAll: "Näytä liittymättömät esineet",
    resetPrompt: "Nollataanko kaikki arvot?", restartPrompt: "Käynnistetäänkö linja uudelleen?", modalActionsTitle: "Toiminnot",
    discHeader: "LOGISTIIKKATILAUS", discReq: "PUUTTUVAT KOMPONENTIT:", discStock: "Kaikki materiaalit katettu.", discCopied: "Kopioitu!",
    discMarket: "MARKET-OSTOKSET:", errWebhook: "Anna kelvollinen Discord URL.", errSend: "Virhe lähetyksessä.", sucSend: "Lähetetty Discordiin!",
    qAdd: "+10k", qAddStk: "+1 Pino", qSub: "-10k", qSubStk: "-1 Pino", byproductsTitle: "SIVUTUOTTEET YHTEENSÄ", bpTitle: "SIVUTUOTTEET", btnBp: "Sivutuotteet",
    btnPrefEfficient: "Tehokas reitti", btnPrefYield: "Maks. Tuotto", lblEfficient: "Tehokas", lblMaxYield: "Maks. Tuotto", lblRegionLocked: "Aluelukittu",
    chkBp: "Näytä sivutuotteet", colorAccent: "Pääväri", colorBg: "Toissijainen väri", colorText: "Tekstin väri", btnResetColors: "Nollaa värit",
    viewPers: "Mukauttaminen", viewVis: "Moduulien näkyvyys", viewLang: "Kieli", viewGather: "Puuttuvat komponentit", viewPipe: "Tuotantolinja", viewProdCmd: "Tuotantopaneeli", viewByproducts: "Talteenotetut sivutuotteet",
    btnCart: "Ostoskori", btnSettings: "Asetukset", btnHelp: "Apua", btnExportCSV: "Vie CSV", actDiscord: "Discord-lähetys",
    btnMaxText: "Laske maksimituotanto", maxTitle: "Raja saavutettu", maxAcknowledge: "Hyväksy",
    maxCraftAny: "Ei voida valmistaa [item] nykyisellä varastolla.", maxMissing: "Tavoitteen [target] saavuttamiseksi puuttuu:", maxTotalCraft: "Materiaaleja riittää tuottamaan", maxCalculatedGoal: "Tarpeeksi materiaaleja tavoitteeseen.",
    legAcronyms: "Lyhenteet", legEff: "Tehokas", legYld: "Maks. Tuotto", legReg: "Aluelukittu",

    categories: { raw: "Raaka-aineet", basicExt: "Peruserottelut", intOre: "Välimalmit", advOre: "Edistyneet malmit", catalyst: "Katalyytit", refined: "Jalostetut metallit", "Raw Materials": "Raaka-aineet", "Basic Extractions": "Peruserottelut", "Intermediate Ores": "Välimalmit", "Advanced Ores": "Edistyneet malmit", "Catalysts": "Katalyytit", "Refined Metals": "Jalostetut metallit" },
    items: baseItems,
    helpHtml: helpContent['fi'],

    ackBank: "Vahvista", ackCart: "Vahvista", ackPrefs: "Vahvista", ackHelp: "Vahvista", ackSettings: "Vahvista",
    searchEmptyState: "Etsi materiaalia nähdäksesi tuotantotiedot.", searchNotFound: "Tällä nimellä ei löytynyt materiaalia.",
    tabMaterials: "Materiaalit",
    modByproductsTitle: "Talteenotetut sivutuotteet", usesProducedFrom: "valmistetaan:", usesCanMake: "voidaan käyttää valmistamaan:", usesSetTarget: "Aseta kohteeksi", usesNone: "Ei tunnettuja reseptejä tai lähteitä", usesDetails: "Tiedot", usesTitle: "Materiaalin tiedot", btnClose: "Sulje",
    prodCmdHint: "Valitse materiaali laskeaksesi tuotantosuunnitelmasi.", btnOverview: "Yleiskatsaus", btnFocus: "Keskity", statusReady: "Valmis", statusSaved: "Tallennettu", footerQuote: '"Teräs voittaa taistelut, hopea voittaa sodat"', footerCopy: "© 2026 Tehnyt [MTM] Jaegh MERCANTORM-killalle.", resetTooltip: "Palauta 10000:een"
};