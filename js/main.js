// ============================================================================
// QUARTERMASTER COMMAND - MAIN ROUTER & EVENT DELEGATION
// ============================================================================

import { state, saveState, loadState, clearAll, generateShareCode, loadShareCode } from './state/store.js';
import { openModal, closeModal, switchTab, switchHelpTab, toggleSidebar } from './ui/modals.js';
import { restartPipeline, navFocus, setPipelineView, toggleGlobalPref, toggleStep, updatePathChoice, handlePipelineChange, updateSourceChoice } from './core/pipeline.js';
import { calculate, handleModeChange, targetMetalChanged, calculateMax, processByproduct, navigateByproduct, resetByproductHistory } from './core/app.js';
import { applyColors, resetColors, toggleTheme, syncColorPickers } from './ui/theme.js';
import { sendToDiscord, copyDiscord } from './network/discord.js';
import { renderBankTable } from './ui/bank.js';
import { initMarketData, renderMarketTable, autoFillCart, clearCart, updateVisibility } from './ui/market.js';
import { initUnifiedSearch, isLookupMode, refreshLookup } from './ui/lookup.js';
import { setLang } from './data/lang.js';

document.addEventListener('DOMContentLoaded', () => {

    // 1. PRE-STAMP TEMPLATES
    ['settingsModal', 'prefsModal', 'bankModal', 'cartModal', 'helpModal', 'maxCraftModal', 'usesModal'].forEach(id => {
        const container = document.getElementById(id);
        const template = document.getElementById(`tpl_${id}`);
        if (container && template && container.childElementCount === 0) {
            container.appendChild(template.content.cloneNode(true));
        }
    });

    // 2. BOOT SEQUENCE
    loadState();
    syncColorPickers();

    // Restore module visibility from saved state
    Object.entries(state.moduleVisibility).forEach(([modId, visible]) => {
        const el = document.getElementById(modId);
        if (el && !visible) el.classList.add('module-hidden');
    });

    // Restore module collapsed state from saved state
    Object.entries(state.collapsedState).forEach(([modId, isCollapsed]) => {
        const el = document.getElementById(modId);
        if (el && isCollapsed) el.classList.add('collapsed');
    });

    // Restore market initialization if missing
    if (Object.keys(state.marketData).length === 0) initMarketData();

    // Set initial UI values from state
    const modeEl = document.getElementById('mode');
    if (modeEl && state.prevMode) modeEl.value = state.prevMode;

    // Render the UI tables now that their DOM containers exist
    renderBankTable();
    renderMarketTable();

    // Initialise the unified material search in Production Command
    initUnifiedSearch();

    calculate();

    // --- Register the Service Worker ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => console.log('SW Registered:', registration.scope))
                .catch(err => console.log('SW Failed:', err));
        });
    }

    // ========================================================================
    // 3. GLOBAL CLICK DELEGATION
    // ========================================================================
    document.addEventListener('click', (e) => {
        // Haptic feedback for button presses on mobile
        if (e.target.closest('button') && 'vibrate' in navigator) {
            navigator.vibrate(30);
        }

        const target = e.target;

        // 1. Close modal when clicking the dark background overlay
        if (target.classList.contains('modal')) {
            if (target.id === 'usesModal') resetByproductHistory();
            closeModal(target.id);
            return;
        }

        // 2. Handle closing modals via the 'X' icon or 'Acknowledge' buttons
        if (target.closest('[data-close]')) {
            const modalId = target.closest('[data-close]').dataset.close;
            if (modalId === 'usesModal') resetByproductHistory();
            closeModal(modalId);
            return;
        }

        // --- Byproduct & Help Handlers ---
        if (target.closest('.clickable-byproduct')) {
            processByproduct(target.closest('.clickable-byproduct').dataset.byproduct);
            return;
        }

        if (target.closest('.set-target-btn')) {
            const setTargetBtn = target.closest('.set-target-btn');
            const targetKey = setTargetBtn.dataset.targetItem;
            const targetName = setTargetBtn.dataset.targetName;

            resetByproductHistory();
            closeModal('usesModal');

            document.getElementById('targetMetal').value = targetKey;
            document.getElementById('targetMetalSearch').value = targetName;
            document.getElementById('targetMetal').dispatchEvent(new Event('input', { bubbles: true }));

            const mode = document.getElementById('mode').value;
            document.getElementById('targetAmount').value = mode === 'stacks' ? "1" : "10000";

            setTimeout(() => {
                calculate();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
            return;
        }

        if (target.closest('#btnHelpMaterialsIcon')) {
            openModal('helpModal');
            switchHelpTab('materials');
            return;
        }
        // --------------------------------------

        // 3. Handle Source Toggle Choice FIRST (Extraction Material Selection)
        if (target.closest('.source-toggle-btn')) {
            const btn = target.closest('.source-toggle-btn');
            updateSourceChoice(e, btn.dataset.item, btn.dataset.source);
            return; // Stops the click from bubbling up to the step card!
        }

        // 4. Handle pipeline tool route choice (Machine Selection)
        if (target.closest('[data-action="changeRoute"]')) {
            const btn = target.closest('[data-action="changeRoute"]');
            updatePathChoice(null, btn.dataset.step, btn.dataset.route);
            return; // Stops the click from bubbling up!
        }

        // 5. Handle pipeline step toggle LAST
        if (target.closest('[data-action="toggleStep"]')) {
            toggleStep(Number(target.closest('[data-action="toggleStep"]').dataset.index));
            return;
        }

        if (target.closest('[data-action="openModal"]')) {
            openModal(target.closest('[data-action="openModal"]').dataset.modal);
            if (target.closest('.sidebar-links')) toggleSidebar();
            return;
        }

        if (target.closest('[data-action="switchTab"]')) {
            switchTab(target.closest('[data-action="switchTab"]').dataset.tab);
            return;
        }

        if (target.closest('[data-action="switchHelpTab"]')) {
            switchHelpTab(target.closest('[data-action="switchHelpTab"]').dataset.tab);
            return;
        }

        if (target.closest('#btnToggleSidebar') || target.id === 'sidebarOverlay' || target.closest('#btnCloseSidebar')) {
            toggleSidebar();
            return;
        }

        if (target.closest('#btnOpenPrefs')) {
            openModal('prefsModal');
            return;
        }

        if (target.closest('.module-header')) {
            const modId = target.closest('.module-header').id.replace('header_', 'mod_');
            const el = document.getElementById(modId);
            if (el) {
                el.classList.toggle('collapsed');
                state.collapsedState[modId] = el.classList.contains('collapsed');
                saveState();
            }
            return;
        }

        const btn = target.closest('button');
        if (btn) {
            if (btn.id === 'ui_btnResetColors') resetColors();
            if (btn.id === 'ui_btnMaxText') calculateMax();
            if (btn.id === 'ui_maxAcknowledge') closeModal('maxCraftModal');
            if (btn.id === 'ui_btnAutoFill') autoFillCart();
            if (btn.id === 'ui_btnClearCart') clearCart();
            if (btn.id === 'ui_btnSend') sendToDiscord();
            if (btn.id === 'ui_btnDiscord') copyDiscord();
            if (btn.id === 'ui_btnGenCode') generateShareCode();
            if (btn.id === 'ui_btnLoadCode') loadShareCode();

            if (btn.id === 'ui_btnReset') {
                clearAll();
                closeModal('settingsModal');
            }

            if (btn.id === 'btnPipeReset') restartPipeline();
            if (btn.id === 'btnFocusPrev') { navFocus(-1); btn.replaceWith(btn.cloneNode(true)); }
            if (btn.id === 'btnFocusNext') { navFocus(1); btn.replaceWith(btn.cloneNode(true)); }
            if (btn.id === 'ui_btnBpBack') { navigateByproduct(-1); btn.replaceWith(btn.cloneNode(true)); }
            if (btn.id === 'ui_btnBpFwd') { navigateByproduct(1); btn.replaceWith(btn.cloneNode(true)); }

            if (btn.id === 'ui_btnResetQty') {
                const mode = document.getElementById('mode').value;
                document.getElementById('targetAmount').value = mode === 'stacks' ? 1 : 10000;
                document.getElementById('targetAmount').dispatchEvent(new Event('input', { bubbles: true }));
                btn.blur();
            }
        }

        if (target.closest('[data-action="clearSearch"]')) {
            const inputId = target.closest('[data-action="clearSearch"]').dataset.target;
            const input = document.getElementById(inputId);
            if (input) {
                input.value = '';
                updateVisibility(document.getElementById('targetMetal')?.value || '');
            }
            return;
        }

        if (target.closest('[data-action="setPipeView"]')) {
            setPipelineView(target.closest('[data-action="setPipeView"]').dataset.view);
            return;
        }

        if (target.closest('#btnReturnTop')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Inside your DOMContentLoaded click listener
        if (target.closest('.material-item-link')) {
            const itemEl = target.closest('.material-item-link');
            const itemKey = itemEl.dataset.key;
            const itemName = itemEl.textContent.trim();

            // 1. Close the Help/Materials modal
            closeModal('helpModal');

            // 2. Set as Target
            const targetInput = document.getElementById('targetMetal');
            const targetSearch = document.getElementById('targetMetalSearch');
            const amountInput = document.getElementById('targetAmount');

            if (targetInput) targetInput.value = itemKey;
            if (targetSearch) targetSearch.value = itemName;
            if (amountInput) amountInput.value = 10000; // Force 10,000 units

            // 3. Trigger calculation
            targetInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });

    // ========================================================================
    // 4. GLOBAL CHANGE DELEGATION (Dropdowns, Checkboxes, Pickers)
    // ========================================================================
    document.addEventListener('change', (e) => {
        const target = e.target;

        if (target.id === 'mode') handleModeChange();
        if (target.id === 'lang') { setLang(target.value); renderBankTable(); renderMarketTable(); calculate(); }
        if (target.id === 'themeToggleCb') toggleTheme();
        if (['colorAccent', 'colorBg', 'colorText'].includes(target.id)) applyColors();

        if (target.id?.startsWith('view_')) {
            const modId = target.id.replace('view_', 'mod_');
            const el = document.getElementById(modId);
            if (el) {
                if (!target.checked) {
                    el.classList.add('module-fading');
                    setTimeout(() => {
                        el.classList.remove('module-fading');
                        el.classList.add('module-hidden');
                    }, 250);
                } else {
                    el.classList.remove('module-hidden');
                    el.classList.add('module-fading');
                    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('module-fading')));
                }
                state.moduleVisibility[modId] = target.checked;
                saveState();
            }
        }

        if (['modMast', 'modRef', 'modExt', 'chkBp', 'showAllBank', 'showAllCart'].includes(target.id)) calculate();
        if (target.id === 'chkEff') toggleGlobalPref('efficient', target.checked);
        if (target.id === 'chkYld') toggleGlobalPref('yield', target.checked);
    });

    document.addEventListener('input', (e) => {
        // Haptic feedback for typing on mobile
        if ((e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') && 'vibrate' in navigator) {
            navigator.vibrate(10);
        }

        const target = e.target;
        if (['targetAmount', 'crafters'].includes(target.id)) {
            if (isLookupMode()) refreshLookup();
            else calculate();
        }
        if (target.id === 'targetMetal') targetMetalChanged();
        if (target.id === 'searchBank' || target.id === 'searchCart') {
            const metal = document.getElementById('targetMetal')?.value || '';
            updateVisibility(metal);
        }
    });

    document.addEventListener('pipeline:changed', () => calculate());

    const scrollBtn = document.getElementById('btnReturnTop');
    const headerSentinel = document.querySelector('.app-header');
    if (scrollBtn && headerSentinel) {
        new IntersectionObserver(([entry]) => {
            scrollBtn.style.display = entry.isIntersecting ? 'none' : 'flex';
        }).observe(headerSentinel);
    }
});

// Expose these for any dynamically injected HTML strings that might still rely on them
window.toggleStep = toggleStep;
window.updatePathChoice = updatePathChoice;