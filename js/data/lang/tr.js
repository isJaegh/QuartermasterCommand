import { baseItems } from '../langBase.js';
import { helpContent } from '../helpContent.js';

export default {
    tabPrefs: "Tercihler", tabData: "Veri", tabHelp: "Yardım", tabView: "Görünüm", tabGuide: "Rehber", tabLegend: "Lejant",
    resetDesc: "Kayıtlı envanter, sepet ve hedefleri temizle.",
    shareTitle: "Paylaş / İçe Aktar", shareDesc: "Ayarlarınızı paylaşmak için bir kod oluşturun.",
    btnGenCode: "Oluştur ve Kopyala", btnLoadCode: "Kodu Yükle", importSuccess: "Başarıyla yüklendi!", importError: "Geçersiz kod.", exportSuccess: "Panoya kopyalandı!",
    format: "Görüntü Formatı", optUnits: "Birim", optStacks: "Yığın (10k)", webhook: "Discord Webhook URL",

    btnProd: "Üretim", prodCmdTitle: "Üretim Komutu", targetMetalLabel: "Hedef Kaynak", crafters: "Zanaatkarlar", target: "Miktar:",
    btnAutoFill: "Tümünü Doldur", btnClearCart: "Temizle",
    yieldMods: "Tercihler", mastery: "Ustalık (+6%)", refining: "Arıtma (+3%)", extraction: "Çıkarma (+3%)", prefCatModifiers: "Verim Değiştiricileri", prefCatRoute: "Rota ve Görünüm", prefCatWorkforce: "İşgücü",

    btnDiscord: "Panoya Kopyala", btnSend: "Discord'a Gönder",
    btnPrefs: "Tercihler", yieldModsModal: "Tercihler",
    btnBank: "Envanter", invBankTitle: "Envanter",
    invBank: "Envanter", showAllBank: "Tümünü Göster", showAllCart: "Tümünü Göster", btnReset: "Sıfırla", defGather: "Eksik Bileşenler", mfgPipe: "Üretim Hattı", marketCart: "Market Sepeti", marketCartTitle: "Market Sepeti",
    tblPrice: "Fiyat", tblBuy: "Alınacak", tblCost: "Maliyet", tblStash: "Zula", cartTotal: "Sepet Toplamı:", tblOrder: "Sipariş",
    noTarget: "Hedef belirlenmedi.", allCovered: "Envanter tüm ihtiyaçları karşılıyor!", searchPlaceholder: "Ara...",
    verbCrush: "Ez", verbGrind: "Öğüt", verbExtract: "Çıkar", verbSmelt: "Erit", verbBake: "Pişir", verbAlloy: "Alaşımla", verbProcess: "İşle",
    inMachine: "içinde", stepWith: "ile", stepAnd: "ve", perCrafter: "(Zanaatkar Başına)", stepPrefix: "Adım",
    stepYieldsMain: "Verim:", stepByproducts: "Yan Ürünler:", none: "Yok",
    pipeCompleted: "Üretim İlerlemesi", btnPipeReset: "Sıfırla",
    tooltipBestYield: "En Verimli (Düşük Maliyet)", tooltipMaxYield: "Maks. Yan Ürün", tooltipRegionLocked: "Bölge Kilitli",
    tooltipMaxCraft: "Envanterle yapılabilecek maksimum miktarı hesapla", tooltipShowAll: "İlgisiz öğeleri göster",
    resetPrompt: "Tüm değerler sıfırlansın mı?", restartPrompt: "Hattı yeniden başlat?", modalActionsTitle: "İşlemler",
    discHeader: "LOJİSTİK SİPARİŞİ", discReq: "EKSİK BİLEŞENLER:", discStock: "Tüm malzemeler tamam.", discCopied: "Kopyalandı!",
    discMarket: "MARKET ALIMLARI:", errWebhook: "Geçerli bir Discord URL'si girin.", errSend: "Gönderim hatası.", sucSend: "Discord'a gönderildi!",
    qAdd: "+10k", qAddStk: "+1 Yığın", qSub: "-10k", qSubStk: "-1 Yığın", byproductsTitle: "TOPLAM YAN ÜRÜN", bpTitle: "TOPLAM YAN ÜRÜN", btnBp: "Yan Ürünler",
    btnPrefEfficient: "Verimli Yol", btnPrefYield: "Maks. Verim", lblEfficient: "Verimli", lblMaxYield: "Maks. Verim", lblRegionLocked: "Bölge Kilitli",
    chkBp: "Yan ürünleri göster", colorAccent: "Birincil Renk", colorBg: "İkincil Renk", colorText: "Metin Rengi", btnResetColors: "Renkleri Sıfırla",
    viewPers: "Kişiselleştirme", viewVis: "Modül Görünürlüğü", viewLang: "Dil", viewGather: "Eksik Bileşenler", viewPipe: "Üretim Hattı", viewProdCmd: "Üretim Komutu", viewByproducts: "Geri Kazanılan Yan Ürünler",
    btnCart: "Sepet", btnSettings: "Ayarlar", btnHelp: "Yardım", btnExportCSV: "CSV Dışa Aktar", actDiscord: "Discord Gönderimi",
    btnMaxText: "Maks. Üretimi Hesapla", maxTitle: "Limit Aşıldı", maxAcknowledge: "Onayla",
    maxCraftAny: "Mevcut envanterle [item] yapılamıyor.", maxMissing: "[target] hedefine ulaşmak için eksik:", maxTotalCraft: "Şu kadar üretmek için malzeme var:", maxCalculatedGoal: "Hedef için yeterli malzeme var.",
    legAcronyms: "Kısaltmalar", legEff: "Verimli", legYld: "Maks. Verim", legReg: "Bölge Kilitli",

    categories: { raw: "Hammaddeler", basicExt: "Temel Çıkarımlar", intOre: "Ara Cevherler", advOre: "Gelişmiş Cevherler", catalyst: "Katalizörler", refined: "Rafine Metaller", "Raw Materials": "Hammaddeler", "Basic Extractions": "Temel Çıkarımlar", "Intermediate Ores": "Ara Cevherler", "Advanced Ores": "Gelişmiş Cevherler", "Catalysts": "Katalizörler", "Refined Metals": "Rafine Metaller" },
    items: baseItems,
    helpHtml: helpContent['tr'],

    ackBank: "Onayla", ackCart: "Onayla", ackPrefs: "Onayla", ackHelp: "Onayla", ackSettings: "Onayla",
    searchEmptyState: "Üretim detaylarını görmek için bir materyal arayın.", searchNotFound: "Bu isimde materyal bulunamadı.",
    tabMaterials: "Materyaller",
    modByproductsTitle: "Geri Kazanılan Yan Ürünler", usesProducedFrom: "şundan üretilir:", usesCanMake: "şunu yapmak için kullanılabilir:", usesSetTarget: "Hedef olarak belirle", usesNone: "Bilinen bir tarif veya kaynak yok:", usesDetails: "Detaylar", usesTitle: "Materiaalin tiedot", btnClose: "Kapat",
    prodCmdHint: "Üretim planınızı hesaplamak için bir materyal seçin.", btnOverview: "Genel Bakış", btnFocus: "Odak", statusReady: "Hazır", statusSaved: "Kaydedildi", footerQuote: '"Çelik savaşları, gümüş savaşları kazanır"', footerCopy: "© 2026 MERCANTORM loncası için [MTM] Jaegh tarafından yapılmıştır.", resetTooltip: "10000'e sıfırla"
};