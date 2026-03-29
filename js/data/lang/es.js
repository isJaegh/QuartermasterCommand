import { baseItems } from '../langBase.js';
import { helpContent } from '../helpContent.js';

export default {
    tabPrefs: "Preferencias", tabData: "Datos", tabHelp: "Ayuda", tabView: "Vista", tabGuide: "Guía", tabLegend: "Leyenda",
    resetDesc: "Borra todo tu inventario guardado, carrito y objetivos.",
    shareTitle: "Compartir / Importar Configuración", shareDesc: "Genera un código para compartir tu configuración, o pega uno para cargarlo.",
    btnGenCode: "Generar y Copiar", btnLoadCode: "Cargar Código", importSuccess: "¡Configuración cargada!", importError: "Código inválido.", exportSuccess: "¡Copiado al portapapeles!",
    format: "Formato de Visualización", optUnits: "Unidades", optStacks: "Pilas (10k)", webhook: "URL de Webhook de Discord",

    btnProd: "Producción", prodCmdTitle: "Comando de Producción", targetMetalLabel: "Recurso Objetivo", crafters: "Artesanos", target: "Cantidad:",
    btnAutoFill: "Llenar Todo", btnClearCart: "Limpiar",
    yieldMods: "Preferencias", mastery: "Maestría (+6%)", refining: "Refinado (+3%)", extraction: "Extracción (+3%)", prefCatModifiers: "Modificadores de rendimiento", prefCatRoute: "Ruta y visualización", prefCatWorkforce: "Mano de obra",

    btnDiscord: "Copiar al Portapapeles", btnSend: "Enviar Pedido a Discord",
    btnPrefs: "Preferencias", yieldModsModal: "Preferencias",
    btnBank: "Inventario", invBankTitle: "Inventario",
    invBank: "Inventario", showAllBank: "Mostrar todos los materiales", showAllCart: "Mostrar todos los materiales", btnReset: "Restablecer Todo", defGather: "Componentes Faltantes", mfgPipe: "Línea de Fabricación", marketCart: "Carrito de Mercado", marketCartTitle: "Carrito de Mercado",
    tblPrice: "Precio", tblBuy: "Cantidad a Comprar", tblCost: "Costo", tblStash: "Reserva", cartTotal: "Total del Carrito:", tblOrder: "Pedido",
    noTarget: "Sin objetivo establecido.", allCovered: "¡El inventario cubre todos los materiales requeridos!", searchPlaceholder: "Buscar...",
    verbCrush: "Triturar", verbGrind: "Moler", verbExtract: "Extraer", verbSmelt: "Fundir", verbBake: "Hornear", verbAlloy: "Alear", verbProcess: "Procesar",
    inMachine: "en la", stepWith: "con", stepAnd: "y", perCrafter: "(Por Artesano)", stepPrefix: "Paso",
    stepYieldsMain: "Produce:", stepByproducts: "Subproductos:", none: "Ninguno",
    pipeCompleted: "Progreso de Producción", btnPipeReset: "Restablecer",
    tooltipBestYield: "Más Eficiente (Menor Costo de Materiales)", tooltipMaxYield: "Máx. Subproductos Generados", tooltipRegionLocked: "Bloqueado por Región",
    tooltipMaxCraft: "Calcular cuánto se puede hacer solo con el inventario", tooltipShowAll: "Mostrar elementos no relacionados",
    resetPrompt: "¿Restablecer todos los valores a cero?", restartPrompt: "¿Reiniciar la línea de producción? Esto desmarcará los pasos y eliminará las ganancias.", modalActionsTitle: "Acciones de la Línea",
    discHeader: "PEDIDO LOGÍSTICO", discReq: "COMPONENTES FALTANTES:", discStock: "Toda la recolección está cubierta.", discCopied: "¡Copiado!",
    discMarket: "COMPRAS EN EL MERCADO:", errWebhook: "Por favor, introduce una URL válida.", errSend: "Error al enviar a Discord.", sucSend: "¡Pedido enviado a Discord!",
    qAdd: "+10k", qAddStk: "+1 Pila", qSub: "-10k", qSubStk: "-1 Pila", byproductsTitle: "TOTAL DE SUBPRODUCTOS", bpTitle: "TOTAL DE SUBPRODUCTOS", btnBp: "Subproductos",
    btnPrefEfficient: "Ruta Eficiente", btnPrefYield: "Máx. Rendimiento", lblEfficient: "Eficiente", lblMaxYield: "Máx. Rendimiento", lblRegionLocked: "Bloqueo Regional",
    chkBp: "Mostrar subproductos", colorAccent: "Color Principal", colorBg: "Color Secundario", colorText: "Color de Texto", btnResetColors: "Restablecer Colores",
    viewPers: "Personalización", viewVis: "Visibilidad de Módulos", viewLang: "Idioma", viewGather: "Componentes Faltantes", viewPipe: "Línea de Fabricación", viewProdCmd: "Comando de Producción", viewByproducts: "Subproductos recuperados",
    btnCart: "Carrito", btnSettings: "Ajustes", btnHelp: "Ayuda", btnExportCSV: "Exportar a CSV", actDiscord: "Despacho Discord",
    btnMaxText: "Calcular Máximo Fabricable", maxTitle: "Límite de Elaboración", maxAcknowledge: "Aceptar",
    maxCraftAny: "No se puede elaborar [item] con el banco actual.", maxMissing: "Para alcanzar tu objetivo original de [target], todavía te falta:", maxTotalCraft: "Tienes suficientes materiales para elaborar", maxCalculatedGoal: "Tienes suficiente para alcanzar tu objetivo.",
    legAcronyms: "Acrónimos", legEff: "Eficiente", legYld: "Máx. Rendimiento", legReg: "Bloqueo Regional",

    categories: { raw: "Materias Primas", basicExt: "Extracciones Básicas", intOre: "Minerales Intermedios", advOre: "Minerales Avanzados", catalyst: "Catalizadores", refined: "Metales Refinados", "Raw Materials": "Materias Primas", "Basic Extractions": "Extracciones Básicas", "Intermediate Ores": "Minerales Intermedios", "Advanced Ores": "Minerales Avanzados", "Catalysts": "Catalizadores", "Refined Metals": "Metales Refinados" },
    items: baseItems,
    helpHtml: helpContent['es'],

    ackBank: "Aceptar", ackCart: "Aceptar", ackPrefs: "Aceptar", ackHelp: "Aceptar", ackSettings: "Aceptar",
    searchEmptyState: "Busque un material para ver los detalles de producción.", searchNotFound: "No se encontró ningún material con ese nombre.",
    tabMaterials: "Materiales",
    modByproductsTitle: "Subproductos recuperados", usesProducedFrom: "se produce a partir de:", usesCanMake: "se puede usar para hacer:", usesSetTarget: "Establecer como objetivo", usesNone: "No hay recetas ni fuentes conocidas para", usesDetails: "Detalles", usesTitle: "Detalles del material", btnClose: "Cerrar",
    prodCmdHint: "Seleccione un material para calcular su plan de producción.", btnOverview: "Resumen", btnFocus: "Enfoque", statusReady: "Listo", statusSaved: "Guardado", footerQuote: '"El acero gana batallas, la plata gana guerras"', footerCopy: "© 2026 Creado por [MTM] Jaegh para el gremio MERCANTORM.", resetTooltip: "Restablecer a 10000"
};