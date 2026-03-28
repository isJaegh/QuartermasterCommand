// ============================================================================
// QUARTERMASTER COMMAND - CENTRAL STATE MANAGEMENT
// ============================================================================

import { buildShareCode, copyToClipboard, parseShareCode } from '../utils/clipboard.js';
import { showToast } from '../utils/toast.js';
import { showConfirm } from '../utils/confirm.js';

export const state = {
    currentLang: 'en',
    prevMode: 'units',
    marketData: {},
    bankData: {},
    pipelineStepsRaw: [],
    completedSteps: [],
    focusIndex: 0,
    byproductsRaw: {},
    pureDeficits: {},
    userPathChoices: {},
    collapsedState: {},
    moduleVisibility: {},
    pipelineViewMode: 'overview',
    globalRoutePref: null
};

/**
 * Gathers the current state and DOM values, then saves to localStorage
 */
export function saveState() {
    const isLight = document.body.classList.contains('light-theme');

    // Safely grab DOM values (they might not exist if modals aren't lazy-loaded yet)
    const targetEl = document.getElementById('targetAmount');
    const metalEl = document.getElementById('targetMetal');
    const craftEl = document.getElementById('crafters');
    const modeEl = document.getElementById('mode');

    const bankData = {};
    document.querySelectorAll('#bankContainer input[id^="b_"]').forEach(el => {
        bankData[el.id.slice(2)] = Number(el.value) || 0;
    });
    state.bankData = bankData;

    const data = {
        lang: state.currentLang,
        market: state.marketData,
        bank: bankData,
        target: targetEl ? targetEl.value : 10000,
        metal: metalEl ? metalEl.value : 'bleck',
        crafters: craftEl ? craftEl.value : 1,
        mode: modeEl ? modeEl.value : 'units',
        mods: {
            mast: document.getElementById('modMast')?.checked ?? true,
            ref: document.getElementById('modRef')?.checked ?? true,
            ext: document.getElementById('modExt')?.checked ?? true
        },
        choices: state.userPathChoices,
        collapsed: state.collapsedState,
        visibility: state.moduleVisibility,
        theme: isLight ? 'light' : 'dark'
    };

    localStorage.setItem('qm_data', JSON.stringify(data));

    // Flash the save status indicator in the footer
    const status = document.getElementById('saveStatus');
    if (status) {
        status.innerText = "Saved";
        setTimeout(() => { if (status) status.innerText = "Ready"; }, 2000);
    }
}

/**
 * Loads data from localStorage on boot
 */
export function loadState() {
    try {
        const raw = localStorage.getItem('qm_data');
        if (raw) {
            const data = JSON.parse(raw);

            // Restore state object
            if (data.lang) state.currentLang = data.lang;
            if (data.market) state.marketData = data.market;
            if (data.bank) state.bankData = data.bank;
            if (data.choices) state.userPathChoices = data.choices;
            if (data.collapsed) state.collapsedState = data.collapsed;
            if (data.visibility) state.moduleVisibility = data.visibility;
            if (data.mode) state.prevMode = data.mode;

            // Restore DOM values (templates must be pre-stamped before calling this)
            const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
            const check = (id, val) => { const el = document.getElementById(id); if (el) el.checked = val; };

            if (data.target) set('targetAmount', data.target);
            if (data.metal) set('targetMetal', data.metal);
            if (data.crafters) set('crafters', data.crafters);
            if (data.mode) set('mode', data.mode);
            if (data.lang) set('lang', data.lang);
            if (data.mods) {
                check('modMast', data.mods.mast ?? true);
                check('modRef', data.mods.ref ?? true);
                check('modExt', data.mods.ext ?? true);
            }
            if (data.theme === 'light') {
                document.body.classList.add('light-theme');
                check('themeToggleCb', true);
            }
        }
    } catch (e) {
        console.error("Save load failed", e);
    }
}

/**
 * Nuke the state
 */
export function clearAll() {
    showConfirm("Reset all inventory values and shopping cart to zero?", () => {
        localStorage.removeItem('qm_data');
        location.reload();
    });
}

/**
 * Generates a base64 share code for Discord/Guild members
 */
export function generateShareCode() {
    const bank = {};
    document.querySelectorAll('#bankContainer input[id^="b_"]').forEach(el => {
        bank[el.id.slice(2)] = Number(el.value) || 0;
    });

    const data = {
        market: state.marketData,
        bank,
        target: document.getElementById('targetAmount')?.value,
        metal: document.getElementById('targetMetal')?.value
    };
    const str = buildShareCode(data);
    const shareCodeEl = document.getElementById('shareCode');

    if (shareCodeEl) {
        shareCodeEl.value = str;
        copyToClipboard(str)
            .then(() => { showToast("Share code copied to clipboard!", 'success'); })
            .catch(() => { showToast("Share code generated — copy it manually from the box above.", 'info'); });
    }
}

/**
 * Imports a base64 share code and applies it to the state
 */
export function loadShareCode() {
    const shareCodeEl = document.getElementById('shareCode');
    if (!shareCodeEl || !shareCodeEl.value) return;

    try {
        const data = parseShareCode(shareCodeEl.value);
        if (data.market) state.marketData = data.market;

        if (data.bank) {
            state.bankData = data.bank;
            Object.keys(data.bank).forEach(k => {
                const el = document.getElementById('b_' + k);
                if (el) el.value = data.bank[k];
            });
        }

        const targetEl = document.getElementById('targetAmount');
        if (targetEl && data.target) targetEl.value = data.target;

        const metalEl = document.getElementById('targetMetal');
        if (metalEl && data.metal) metalEl.value = data.metal;

        saveState();
        location.reload(); // Reload to apply the new state across the entire app
    } catch (e) {
        showToast("Invalid share code.", 'error');
        console.error(e);
    }
}