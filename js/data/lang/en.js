import { baseItems, baseCategories } from '../langBase.js';
import { helpContent } from '../helpContent.js';

export default {
    tabPrefs: "Preferences", tabData: "Data", tabHelp: "Help", tabView: "View", tabGuide: "Guide", tabLegend: "Legend",
    resetDesc: "Clear all your saved inventory, market cart quantities, and targets.",
    shareTitle: "Share / Import Setup", shareDesc: "Generate a code to share your current inventory, market cart, and target with others, or paste a code to load theirs.",
    btnGenCode: "Generate & Copy", btnLoadCode: "Load Code", importSuccess: "Setup loaded successfully!", importError: "Invalid code provided.", exportSuccess: "Code copied to clipboard!",
    format: "Display Format", optUnits: "Units", optStacks: "Stacks (10k)", webhook: "Discord Webhook URL",

    btnProd: "Production", prodCmdTitle: "Production Command", targetMetalLabel: "Target Resource", crafters: "Crafters", target: "Amount:",
    btnAutoFill: "Fill All", btnClearCart: "Clear",
    yieldMods: "Preferences", mastery: "Mastery (+6%)", refining: "Refining (+3%)", extraction: "Extraction (+3%)", prefCatModifiers: "Yield Modifiers", prefCatRoute: "Route & Display", prefCatWorkforce: "Workforce",

    btnDiscord: "Copy to Clipboard", btnSend: "Send Order to Discord",
    btnPrefs: "Preferences", yieldModsModal: "Preferences",
    btnBank: "Inventory", invBankTitle: "Inventory",
    invBank: "Inventory", showAllBank: "Show All Materials", showAllCart: "Show All Materials", btnReset: "Reset All", defGather: "Missing Components", mfgPipe: "Manufacturing Pipeline", marketCart: "Market Cart", marketCartTitle: "Market Cart",
    tblPrice: "Price", tblBuy: "Amount to Buy", tblCost: "Cost", tblStash: "Stash", cartTotal: "Cart Total:", tblOrder: "Order",
    noTarget: "No target set.", allCovered: "Inventory & Cart cover all required materials!", searchPlaceholder: "Search...",
    verbCrush: "Crush", verbGrind: "Grind", verbExtract: "Extract", verbSmelt: "Smelt", verbBake: "Bake", verbAlloy: "Alloy", verbProcess: "Process",
    vendorSource: "Magic Vendor",
    inMachine: "in the", stepWith: "with", stepAnd: "and", perCrafter: "(Per Crafter)", stepPrefix: "Step",
    stepYieldsMain: "Yields:", stepByproducts: "Byproducts:", none: "None",
    pipeCompleted: "Production Progress", btnPipeReset: "Reset",
    tooltipBestYield: "Most Efficient (Lowest Total Material Cost)", tooltipMaxYield: "Max Byproducts Generated", tooltipRegionLocked: "Region Locked Machine",
    tooltipMaxCraft: "Calculate how much you can make with just your inventory", tooltipShowAll: "Show items not strictly related to the target metal",
    resetPrompt: "Reset all inventory values and shopping cart to zero?", restartPrompt: "Restart the pipeline? This will un-check all steps and remove their yields from your inventory.", modalActionsTitle: "Pipeline Actions",
    discHeader: "LOGISTICS ORDER", discReq: "MISSING COMPONENTS:", discStock: "All gathering covered.", discCopied: "Copied to clipboard!",
    discMarket: "MARKET PURCHASES:", errWebhook: "Please enter a valid Discord Webhook URL.", errSend: "Failed to send to Discord.", sucSend: "Order dispatched to Discord!",
    qAdd: "+10k", qAddStk: "+1 Stk", qSub: "-10k", qSubStk: "-1 Stk", byproductsTitle: "TOTAL RECOVERED BYPRODUCTS", bpTitle: "TOTAL RECOVERED BYPRODUCTS", btnBp: "Byproducts",
    btnPrefEfficient: "Efficient Path", btnPrefYield: "Max Yield", lblEfficient: "Efficient", lblMaxYield: "Max Yield", lblRegionLocked: "Region Locked",
    chkBp: "Show byproducts", colorAccent: "Primary Color", colorBg: "Secondary Color", colorText: "Text Color", btnResetColors: "Reset Colors to Default",
    viewPers: "Personalization", viewVis: "Module Visibility", viewLang: "Language", viewGather: "Missing Components", viewPipe: "Manufacturing Pipeline", viewProdCmd: "Production Command", viewByproducts: "Recovered Byproducts",
    btnCart: "Cart", btnSettings: "Settings", btnHelp: "Help", btnExportCSV: "Export to CSV", actDiscord: "Discord Dispatch",
    btnMaxText: "Calculate Max Craftable", maxTitle: "Crafting Limit Reached", maxAcknowledge: "Acknowledge",
    maxCraftAny: "Cannot craft any [item] with your current bank.", maxMissing: "To reach your original target of [target], you are still missing:", maxTotalCraft: "You have enough materials to craft", maxCalculatedGoal: "You have enough to meet or exceed your target.",
    legAcronyms: "Acronyms", legEff: "Efficient", legYld: "Max Yield", legReg: "Region Locked",

    categories: baseCategories,
    items: baseItems,
    helpHtml: helpContent['en'],

    ackBank: "Acknowledge", ackCart: "Acknowledge", ackPrefs: "Acknowledge", ackHelp: "Acknowledge", ackSettings: "Acknowledge",
    searchEmptyState: "Search for a material to view production details.", searchNotFound: "No material found with that name.",
    tabMaterials: "Materials",
    modByproductsTitle: "Recovered Byproducts", usesProducedFrom: "is produced from:", usesCanMake: "can be used to make:", usesSetTarget: "Set as Target", usesNone: "No known recipes or sources for", usesDetails: "Details", usesTitle: "Material Details", btnClose: "Close",
    prodCmdHint: "Select a material to calculate your production plan.", btnOverview: "Overview", btnFocus: "Focus", statusReady: "Ready", statusSaved: "Saved", footerQuote: '"Steel wins battles, silver wins wars"', footerCopy: "© 2026 Made by [MTM] Jaegh for MERCANTORM guild.", resetTooltip: "Reset to 10000"
};