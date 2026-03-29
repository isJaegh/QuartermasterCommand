// ============================================================================
// QUARTERMASTER COMMAND - HELP PAGE CONTENT (per language)
// ============================================================================

export const helpContent = {

    en: `
            <p>Welcome to the <strong>Quartermaster Command</strong> Help Page. This is an advanced, offline-capable crafting logistics dashboard for Mortal Online 2. Enter a target material in <strong>Production Command</strong> to begin calculating your production pipeline.</p>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Getting Started</h3>
            <ol style="margin-top: 0; padding-left: 20px;">
                <li style="margin-bottom: 6px;">Search for a material in <strong>Production Command</strong> and enter the desired amount.</li>
                <li style="margin-bottom: 6px;">Fill in materials you already have in the <strong>Inventory</strong> panel.</li>
                <li style="margin-bottom: 6px;">Add missing materials to the <strong>Market Cart</strong> with prices.</li>
                <li style="margin-bottom: 6px;">Check off steps in the <strong>Manufacturing Pipeline</strong> as you work.</li>
            </ol>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Production Command</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Search:</strong> Type any material name to find it. Click <strong>?</strong> to browse all produceable materials.</li>
                <li style="margin-bottom: 6px;"><strong>Amount &amp; Reset:</strong> Enter your target quantity. The <strong>↺</strong> button resets to the default (10,000 units or 1 stack).</li>
                <li style="margin-bottom: 6px;"><strong>Display Mode:</strong> Switch between <em>Units</em> and <em>Stacks (10k)</em> in Settings → View.</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Preferences</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Skill Modifiers:</strong> Toggle Mastery (+6%), Refining (+3%), and Extraction (+3%) to adjust yield calculations based on your character's skills.</li>
                <li style="margin-bottom: 6px;"><strong>[E] Efficient Path:</strong> Routes the pipeline to minimize raw material cost. Selecting this turns off Max Yield, and vice versa. Both can be deselected for a neutral calculation.</li>
                <li style="margin-bottom: 6px;"><strong>[Y] Max Yield:</strong> Routes the pipeline to maximize secondary byproduct generation.</li>
                <li style="margin-bottom: 6px;"><strong>Show Byproducts:</strong> Toggle visibility of the Recovered Byproducts module.</li>
                <li style="margin-bottom: 6px;"><strong>Crafters:</strong> Set the number of crafters splitting the workload. All pipeline step quantities are divided equally and rounded up per crafter.</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Manufacturing Pipeline</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Steps:</strong> Each step shows what to craft, how much, and in which machine. Check off a step when done — yields are automatically added to your inventory.</li>
                <li style="margin-bottom: 6px;"><strong>Overview / Focus Mode:</strong> Switch between seeing all steps at once or one step at a time using the Prev/Next navigation.</li>
                <li style="margin-bottom: 6px;"><strong>Source Selection:</strong> For steps with multiple material sources (e.g., vendor vs. gathered), tap the source button to choose.</li>
                <li style="margin-bottom: 6px;"><strong>Route Selection:</strong> When a step has multiple machine options, buttons show [E], [Y], or [R] badges. Select the route that fits your situation.</li>
                <li style="margin-bottom: 6px;"><strong>Reset Pipeline:</strong> Clears all completed step checkmarks and removes their yields from inventory.</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Recovered Byproducts</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;">Shows all secondary materials generated during the full pipeline.</li>
                <li style="margin-bottom: 6px;"><strong>Click any byproduct</strong> to open its Material Details — see what it's produced from and what it can be used to make.</li>
                <li style="margin-bottom: 6px;"><strong>Back / Forward navigation:</strong> Use the ← and → arrows in the Material Details window to move through your lookup history, just like a browser.</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Calculate Max Craftable</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;">Opens the Inventory panel — click <strong>Calculate Max</strong> to find the maximum amount you can produce with your current stock.</li>
                <li style="margin-bottom: 6px;">Uses a binary search algorithm to find the exact limit. Results show any shortfall still needed.</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Discord Dispatch</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Webhook URL:</strong> Enter your Discord webhook URL in Settings → Data. It is saved automatically so you don't need to re-enter it each session.</li>
                <li style="margin-bottom: 6px;"><strong>Send Order to Discord:</strong> Posts a fully formatted logistics work order to your Discord channel and closes the settings panel.</li>
                <li style="margin-bottom: 6px;"><strong>Copy to Clipboard:</strong> Copies the same formatted message for manual pasting, then closes the settings panel.</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">State Sharing</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Generate &amp; Copy:</strong> Creates a compact Base64 code containing your inventory, cart, target, and amount. Share it with guildmates.</li>
                <li style="margin-bottom: 6px;"><strong>Load Code:</strong> Paste a code from a guildmate to instantly load their setup.</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Mobile &amp; Accessibility</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Haptic Feedback:</strong> On supported devices, brief vibrations occur when typing and pressing buttons for tactile confirmation.</li>
                <li style="margin-bottom: 6px;"><strong>PWA Install:</strong> Tap "Add to Home Screen" on mobile to install the app for offline use.</li>
                <li style="margin-bottom: 6px;"><strong>Dark / Light Mode:</strong> Toggle in the sidebar footer. Accent colors are fully customizable in Settings → View.</li>
            </ul>`,

    fr: `
            <p>Bienvenue sur la page d'aide de <strong>Quartermaster Command</strong>. Tableau de bord logistique avancé pour Mortal Online 2. Entrez un matériau dans <strong>Commande de Production</strong> pour commencer.</p>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Démarrage Rapide</h3>
            <ol style="margin-top: 0; padding-left: 20px;">
                <li style="margin-bottom: 6px;">Recherchez un matériau dans <strong>Commande de Production</strong> et entrez la quantité désirée.</li>
                <li style="margin-bottom: 6px;">Renseignez vos matériaux en stock dans l'<strong>Inventaire</strong>.</li>
                <li style="margin-bottom: 6px;">Ajoutez les matériaux manquants dans le <strong>Panier du Marché</strong>.</li>
                <li style="margin-bottom: 6px;">Cochez les étapes du <strong>Pipeline de Fabrication</strong> au fur et à mesure.</li>
            </ol>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Commande de Production</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Recherche :</strong> Tapez un nom de matériau. Cliquez sur <strong>?</strong> pour parcourir tous les matériaux productibles.</li>
                <li style="margin-bottom: 6px;"><strong>Quantité &amp; Réinitialisation :</strong> Le bouton <strong>↺</strong> remet la valeur par défaut (10 000 unités ou 1 pile).</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Préférences</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Modificateurs de compétences :</strong> Maîtrise (+6%), Raffinage (+3%), Extraction (+3%).</li>
                <li style="margin-bottom: 6px;"><strong>[E] Voie Efficace / [Y] Rendement Max :</strong> Ces deux options sont mutuellement exclusives — sélectionner l'une désactive l'autre. Les deux peuvent être désélectionnées.</li>
                <li style="margin-bottom: 6px;"><strong>Artisans :</strong> Nombre de crafters partageant le travail. Les quantités du pipeline sont divisées équitablement.</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Pipeline de Fabrication</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Mode Aperçu / Focus :</strong> Basculez entre toutes les étapes ou une étape à la fois avec Préc./Suiv.</li>
                <li style="margin-bottom: 6px;"><strong>Sélection de source :</strong> Choisissez la provenance du matériau (vendeur ou récolte).</li>
                <li style="margin-bottom: 6px;"><strong>Sélection de route :</strong> Choisissez la machine selon les badges [E], [Y] ou [R].</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Sous-produits Récupérés</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>Cliquez</strong> sur un sous-produit pour voir ses détails (sources et utilisations).</li>
                <li style="margin-bottom: 6px;"><strong>Navigation ← →</strong> pour parcourir l'historique des consultations.</li>
            </ul>

            <h3 style="border-bottom: 1px solid var(--border); padding-bottom: 4px; margin-top: 20px;">Dispatch Discord</h3>
            <ul style="margin-top: 0;">
                <li style="margin-bottom: 6px;"><strong>URL Webhook :</strong> Enregistrée automatiquement — pas besoin de la saisir à chaque session.</li>
                <li style="margin-bottom: 6px;"><strong>Envoyer / Copier :</strong> Le panneau paramètres se ferme automatiquement après l'envoi ou la copie.</li>
            </ul>`,

    de: `<p>Willkommen auf der <strong>Quartermaster Command</strong> Hilfeseite. Verwenden Sie das Seitenleistenmenü für die Navigation. Das System wählt automatisch die besten Routen zum Raffinieren.</p>`,

    es: `<p>Bienvenido a la página de ayuda de <strong>Quartermaster Command</strong>. Usa la barra lateral para navegar. El sistema calcula automáticamente la mejor ruta de fabricación.</p>`,

    it: `<p>Benvenuti in <strong>Quartermaster Command</strong>. Questo sistema calcola automaticamente i requisiti per la raffinazione dei metalli.</p>`,

    ar: `<p>مرحبًا بك في <strong>Quartermaster Command</strong>. استخدم القائمة الجانبية للتنقل.</p>`,

    ro: `<p>Bun venit la <strong>Quartermaster Command</strong>. Sistemul calculează automat cele mai bune rute de rafinare.</p>`,

    pl: `<p>Witamy w <strong>Quartermaster Command</strong>. System automatycznie oblicza najlepsze trasy rafinacji metali.</p>`,

    pt: `<p>Bem-vindo ao <strong>Quartermaster Command</strong>. O sistema calcula automaticamente as melhores rotas de refino.</p>`,

    ru: `<p>Добро пожаловать в <strong>Quartermaster Command</strong>. Система автоматически рассчитывает оптимальные маршруты переработки.</p>`,

    fi: `<p>Tervetuloa <strong>Quartermaster Commandiin</strong>. Järjestelmä laskee optimaaliset jalostusreitit automaattisesti.</p>`,

    uk: `<p>Ласкаво просимо в <strong>Quartermaster Command</strong>. Система автоматично розраховує оптимальні маршрути переробки.</p>`,

    hu: `<p>Üdvözöljük a <strong>Quartermaster Command</strong> súgójában. A rendszer automatikusan kiszámítja a legjobb finomítási útvonalakat.</p>`,

    tr: `<p><strong>Quartermaster Command</strong> yardım sayfasına hoş geldiniz. Sistem en iyi arıtma yollarını otomatik olarak hesaplar.</p>`,

    sv: `<p>Välkommen till <strong>Quartermaster Command</strong>. Systemet beräknar de bästa raffineringsvägarna automatiskt.</p>`,

    cs: `<p>Vítejte v <strong>Quartermaster Command</strong>. Systém automaticky vypočítá nejlepší rafinační cesty.</p>`

};
