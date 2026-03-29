import { baseItems } from '../langBase.js';
import { helpContent } from '../helpContent.js';

export default {
    tabPrefs: "Préférences", tabData: "Données", tabHelp: "Aide", tabView: "Vue", tabGuide: "Aide", tabLegend: "Légende",
    resetDesc: "Effacez tout votre inventaire, les quantités du panier et les objectifs.",
    shareTitle: "Partager / Importer", shareDesc: "Générez un code pour partager votre inventaire, votre panier et votre objectif, ou collez un code pour charger celui d'un autre.",
    btnGenCode: "Générer & Copier", btnLoadCode: "Charger le Code", importSuccess: "Configuration chargée avec succès !", importError: "Code invalide fourni.", exportSuccess: "Code copié dans le presse-papiers !",
    format: "Format d'affichage", optUnits: "Unités", optStacks: "Piles (10k)", webhook: "URL du Webhook Discord",

    btnProd: "Production", prodCmdTitle: "Commande de Production", targetMetalLabel: "Ressource Cible", crafters: "Artisans", target: "Quantité :",
    btnAutoFill: "Tout Remplir", btnClearCart: "Vider",
    yieldMods: "Préférences", mastery: "Maîtrise (+6%)", refining: "Raffinage (+3%)", extraction: "Extraction (+3%)", prefCatModifiers: "Modificateurs de rendement", prefCatRoute: "Itinéraire & Affichage", prefCatWorkforce: "Main-d'œuvre",

    btnDiscord: "Copier dans le presse-papiers", btnSend: "Envoyer l'ordre sur Discord",
    btnPrefs: "Préférences", yieldModsModal: "Préférences",
    btnBank: "Inventaire", invBankTitle: "Inventaire",
    invBank: "Inventaire", showAllBank: "Afficher tous les matériaux", showAllCart: "Afficher tous les matériaux", btnReset: "Tout réinitialiser", defGather: "Composants manquants", mfgPipe: "Pipeline de fabrication", marketCart: "Panier du marché", marketCartTitle: "Panier du marché",
    tblPrice: "Prix", tblBuy: "Quantité à acheter", tblCost: "Coût", tblStash: "Stock", cartTotal: "Total du panier :", tblOrder: "Commande",
    noTarget: "Aucun objectif défini.", allCovered: "L'inventaire et le panier couvrent tous les matériaux requis !", searchPlaceholder: "Rechercher...",
    verbCrush: "Concassez", verbGrind: "Broyez", verbExtract: "Extrayez", verbSmelt: "Fondez", verbBake: "Cuisez", verbAlloy: "Alliez", verbProcess: "Traitez",
    inMachine: "dans le", stepWith: "avec", stepAnd: "et", perCrafter: "(Par artisan)", stepPrefix: "Étape",
    stepYieldsMain: "Produits :", stepByproducts: "Sous-produits :", none: "Aucun",
    pipeCompleted: "Progression de la production", btnPipeReset: "Réinitialiser",
    tooltipBestYield: "Plus efficace (Coût matériel total le plus bas)", tooltipMaxYield: "Maximum de sous-produits générés", tooltipRegionLocked: "Restreint par région",
    tooltipMaxCraft: "Calculez ce que vous pouvez fabriquer uniquement avec votre inventaire", tooltipShowAll: "Afficher les éléments non strictement liés au métal cible",
    resetPrompt: "Réinitialiser toutes les valeurs d'inventaire et le panier à zéro ?", restartPrompt: "Redémarrer le pipeline ? Cela décochea toutes les étapes et supprimera leurs produits de votre inventaire.", modalActionsTitle: "Actions du pipeline",
    discHeader: "ORDRE LOGISTIQUE", discReq: "COMPOSANTS MANQUANTS :", discStock: "Toute la récolte est couverte.", discCopied: "Copié dans le presse-papiers !",
    discMarket: "ACHATS AU MARCHÉ :", errWebhook: "Veuillez entrer une URL de Webhook Discord valide.", errSend: "Échec de l'envoi vers Discord.", sucSend: "Ordre envoyé sur Discord !",
    qAdd: "+10k", qAddStk: "+1 Pile", qSub: "-10k", qSubStk: "-1 Pile", byproductsTitle: "TOTAL DES SOUS-PRODUITS RÉCUPÉRÉS", bpTitle: "TOTAL DES SOUS-PRODUITS RÉCUPÉRÉS", btnBp: "Sous-produits",
    btnPrefEfficient: "Route Efficace", btnPrefYield: "Rendement Max", lblEfficient: "Efficace", lblMaxYield: "Rendement Max", lblRegionLocked: "RESTREINT PAR RÉGION",
    chkBp: "Afficher les sous-produits", colorAccent: "Couleur primaire", colorBg: "Couleur secondaire", colorText: "Couleur du texte", btnResetColors: "Réinitialiser les couleurs par défaut",
    viewPers: "Personnalisation", viewVis: "Visibilité des modules", viewLang: "Langue", viewGather: "Composants manquants", viewPipe: "Pipeline de fabrication", viewProdCmd: "Commande de production", viewByproducts: "Sous-produits récupérés",
    btnCart: "Panier", btnSettings: "Paramètres", btnHelp: "Aide", btnExportCSV: "Exporter en CSV", actDiscord: "Envoi Discord",
    btnMaxText: "Calculer le max fabricable", maxTitle: "Limite de fabrication atteinte", maxAcknowledge: "Accepter",
    maxCraftAny: "Impossible de fabriquer du [item] avec votre banque actuelle.", maxMissing: "Pour atteindre votre objectif initial de [target], il vous manque encore :", maxTotalCraft: "Vous avez assez de matériaux pour fabriquer", maxCalculatedGoal: "Vous avez tout ce qu'il faut pour atteindre votre objectif !",
    legAcronyms: "Acronymes", legEff: "Efficace", legYld: "Rendement Max", legReg: "Restreint par région",

    categories: { raw: "Matières premières", basicExt: "Extractions de base", intOre: "Minerais intermédiaires", advOre: "Minerais avancés", catalyst: "Catalyseurs", refined: "Métaux raffinés", "Raw Materials": "Matières premières", "Basic Extractions": "Extractions de base", "Intermediate Ores": "Minerais intermédiaires", "Advanced Ores": "Minerais avancés", "Catalysts": "Catalyseurs", "Refined Metals": "Métaux raffinés" },
    items: baseItems,
    helpHtml: helpContent['fr'],

    ackBank: "Accepter", ackCart: "Accepter", ackPrefs: "Accepter", ackHelp: "Accepter", ackSettings: "Accepter",
    searchEmptyState: "Recherchez un matériau pour voir les détails de production.", searchNotFound: "Aucun matériau trouvé avec ce nom.",
    tabMaterials: "Matériaux",
    modByproductsTitle: "Sous-produits récupérés", usesProducedFrom: "est produit à partir de :", usesCanMake: "peut être utilisé pour fabriquer :", usesSetTarget: "Définir comme cible", usesNone: "Aucune recette ou source connue pour", usesDetails: "Détails", usesTitle: "Détails du matériau", btnClose: "Fermer",
    prodCmdHint: "Sélectionnez un matériau pour calculer votre plan de production.", btnOverview: "Aperçu", btnFocus: "Focus", statusReady: "Prêt", statusSaved: "Enregistré", footerQuote: '"L\'acier gagne les batailles, l\'argent gagne les guerres"', footerCopy: "© 2026 Créé par [MTM] Jaegh pour la guilde MERCANTORM.", resetTooltip: "Réinitialiser à 10000"
};