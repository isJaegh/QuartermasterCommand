// ============================================================================
// QUARTERMASTER COMMAND - MAIN ROUTER & EVENT DELEGATION
// ============================================================================

import { state, saveState, loadState, clearAll, generateShareCode, loadShareCode } from './state/store.js';
import { openModal, closeModal, switchTab, toggleSidebar } from './ui/modals.js';
import { restartPipeline, navFocus, setPipelineView, toggleGlobalPref, toggleStep, updatePathChoice } from './core/pipeline.js';
import { calculate, handleModeChange, targetMetalChanged, calculateMax } from './core/app.js';
import { applyColors, resetColors, toggleTheme } from './ui/theme.js';
import { sendToDiscord, copyDiscord } from './network/discord.js';
import { initMarketData, renderMarketTable, renderBankTable, autoFillCart, clearCart, quickAdd, quickSub, clearItem, removeMarketTier, addMarketTier, quickAddMarket, quickSubMarket, autoFillMarketItem, clearMarketTier, updateMarketTier } from './ui/market_bank.js';
import { setLang } from './data/lang.js';

document.addEventListener('DOMContentLoaded', () => {

    // 1. PRE-STAMP TEMPLATES (CRITICAL FIX)
    // We must build the HTML for the modals before calculating, otherwise the math engine
    // crashes when trying to read settings like "mode" or "modRef" from the DOM.
    ['settingsModal', 'prefsModal', 'bankModal', 'cartModal', 'helpModal', 'maxCraftModal'].forEach(id => {
        const container = document.getElementById(id);
        const template = document.getElementById(`tpl_${id}`);
        if (container && template && container.childElementCount === 0) {
            container.appendChild(template.content.cloneNode(true));
        }
    });

    // 2. BOOT SEQUENCE
    loadState();

    // Restore market initialization if missing
    if (Object.keys(state.marketData).length === 0) initMarketData();

    // Set initial UI values from state
    const modeEl = document.getElementById('mode');
    if (modeEl && state.prevMode) modeEl.value = state.prevMode;

    // Render the UI tables now that their DOM containers exist
    renderBankTable();
    renderMarketTable();

    calculate(); // Now this runs perfectly without crashing!

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
        const target = e.target;

        if (target.closest('.close[data-close]')) {
            closeModal(target.closest('.close').dataset.close);
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

        if (target.closest('#btnToggleSidebar') || target.id === 'sidebarOverlay' || target.closest('#btnCloseSidebar')) {
            toggleSidebar();
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

        if (target.closest('#btnOpenPrefs')) {
            e.stopPropagation();
            openModal('prefsModal');
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
            if (btn.id === 'btnFocusPrev') navFocus(-1);
            if (btn.id === 'btnFocusNext') navFocus(1);
        }

        if (target.closest('[data-action="setPipeView"]')) {
            setPipelineView(target.closest('[data-action="setPipeView"]').dataset.view);
            return;
        }

        if (target.closest('#btnReturnTop')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
    });

    // ========================================================================
    // 4. GLOBAL CHANGE DELEGATION (Dropdowns, Checkboxes, Pickers)
    // ========================================================================
    document.addEventListener('change', (e) => {
        const target = e.target;

        if (target.id === 'mode') handleModeChange();
        if (target.id === 'lang') setLang(target.value);
        if (target.id === 'themeToggleCb') toggleTheme();
        if (['colorAccent', 'colorBg', 'colorText'].includes(target.id)) applyColors();

        if (target.id?.startsWith('view_')) {
            const modId = target.id.replace('view_', 'mod_');
            const el = document.getElementById(modId);
            if (el) {
                el.classList.toggle('module-hidden', !target.checked);
                state.moduleVisibility[modId] = target.checked;
                saveState();
            }
        }

        if (['modMast', 'modRef', 'modExt', 'chkBp', 'showAllBank', 'showAllCart'].includes(target.id)) calculate();
        if (target.id === 'chkEff') toggleGlobalPref('efficient', target.checked);
        if (target.id === 'chkYld') toggleGlobalPref('yield', target.checked);
    });

    document.addEventListener('input', (e) => {
        const target = e.target;
        if (['targetAmount', 'crafters'].includes(target.id)) calculate();
        if (target.id === 'targetMetal') targetMetalChanged();
    });

    window.addEventListener('scroll', () => {
        const btn = document.getElementById('btnReturnTop');
        if (btn) btn.style.display = (window.scrollY > 200) ? 'flex' : 'none';
    });
});

// ============================================================================
// 5. GLOBAL SCOPE EXPOSURE (CRITICAL FOR DYNAMIC HTML)
// ============================================================================
window.toggleStep = toggleStep;
window.updatePathChoice = updatePathChoice;
window.quickAdd = quickAdd;
window.quickSub = quickSub;
window.clearItem = clearItem;
window.removeMarketTier = removeMarketTier;
window.addMarketTier = addMarketTier;
window.quickAddMarket = quickAddMarket;
window.quickSubMarket = quickSubMarket;
window.autoFillMarketItem = autoFillMarketItem;
window.clearMarketTier = clearMarketTier;
window.updateMarketTier = updateMarketTier;