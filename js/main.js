// ============================================================================
// QUARTERMASTER COMMAND - MAIN ROUTER & EVENT DELEGATION
// ============================================================================

import { state, saveState, loadState, clearAll, generateShareCode, loadShareCode } from './state/store.js';
import { openModal, closeModal, switchTab, switchHelpTab, toggleSidebar } from './ui/modals.js';
import { restartPipeline, navFocus, setPipelineView, toggleGlobalPref, toggleStep, updatePathChoice, handlePipelineChange } from './core/pipeline.js';
import { calculate, handleModeChange, targetMetalChanged, calculateMax } from './core/app.js';
import { applyColors, resetColors, toggleTheme, syncColorPickers } from './ui/theme.js';
import { sendToDiscord, copyDiscord } from './network/discord.js';
import { renderBankTable } from './ui/bank.js';
import { initMarketData, renderMarketTable, autoFillCart, clearCart, updateVisibility } from './ui/market.js';
import { initUnifiedSearch, isLookupMode, refreshLookup } from './ui/lookup.js';
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
    syncColorPickers();

    // Restore module visibility from saved state
    Object.entries(state.moduleVisibility).forEach(([modId, visible]) => {
        const el = document.getElementById(modId);
        if (el && !visible) el.classList.add('module-hidden');
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

        // 1. Close modal when clicking the dark background overlay
        if (target.classList.contains('modal')) {
            closeModal(target.id);
            return;
        }

        // 2. Handle closing modals via the 'X' icon or 'Acknowledge' buttons
        if (target.closest('[data-close]')) {
            closeModal(target.closest('[data-close]').dataset.close);
            return;
        }

        // 3. Handle pipeline tool route choice FIRST (Machine Selection)
        if (target.closest('[data-action="changeRoute"]')) {
            const btn = target.closest('[data-action="changeRoute"]');
            updatePathChoice(null, btn.dataset.step, btn.dataset.route);
            return;
        }

        // 4. Handle pipeline step toggle SECOND
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
            if (btn.id === 'btnFocusPrev') navFocus(-1);
            if (btn.id === 'btnFocusNext') navFocus(1);
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
        const target = e.target;
        if (['targetAmount', 'crafters'].includes(target.id)) {
            // In lookup mode re-render the lookup cards with the new qty;
            // otherwise let the normal pipeline calculate() run.
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

// ============================================================================
// 5. GLOBAL SCOPE EXPOSURE (CRITICAL FOR DYNAMIC HTML)
// ============================================================================
// toggleStep and updatePathChoice are still used via inline onclick in renderPipeline (app.js)
// but mapping them here ensures fallback functionality if custom data-actions are missed
window.toggleStep = toggleStep;
window.updatePathChoice = updatePathChoice;