// ============================================================================
// QUARTERMASTER COMMAND - UNIFIED MATERIAL SEARCH
// ============================================================================

import { CATEGORIES, RECIPES, EXTRACTION_ROUTES } from '../data/data.js';
import { i18n } from '../data/lang.js';
import { state } from '../state/store.js';
import { getItemName } from '../utils/format.js';

// ============================================================================
// SHARED AUTOCOMPLETE HELPER
// ============================================================================

function createAutocomplete({ inputId, dropdownId, clearBtnId, getItems, onSelect, onClear, onInput }) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return null;

    let _isOpen = false;

    function positionDropdown() {
        const rect = input.getBoundingClientRect();
        dropdown.style.top = (rect.bottom + 2) + 'px';
        dropdown.style.left = rect.left + 'px';
        dropdown.style.width = rect.width + 'px';
    }

    function openWith(items) {
        dropdown.innerHTML = items.slice(0, 24).map(item =>
            `<div class="lookup-drop-item" data-key="${item.key}">${item.name}</div>`
        ).join('');
        positionDropdown();
        dropdown.classList.add('open');
        _isOpen = true;
    }

    function close() {
        if (!_isOpen) return;
        _isOpen = false;
        dropdown.classList.remove('open');
        dropdown.innerHTML = '';
    }

    function selectItem(key) {
        const t = i18n[state.currentLang] || i18n['en'];
        input.value = getItemName(key, t);
        close();
        onSelect(key);
    }

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) { close(); if (onClear) onClear(); return; }
        const matches = getItems(q);
        if (matches.length > 0) {
            openWith(matches);
            if (onInput) onInput(q, true);
        } else {
            close();
            if (onInput) onInput(q, false);
        }
    });

    dropdown.addEventListener('click', (e) => {
        const item = e.target.closest('.lookup-drop-item');
        if (item) selectItem(item.dataset.key);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const first = dropdown.querySelector('.lookup-drop-item');
            if (first) { e.preventDefault(); selectItem(first.dataset.key); }
        }
        if (e.key === 'Escape') close();
    });

    if (clearBtnId) {
        const clearBtn = document.getElementById(clearBtnId);
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                input.value = '';
                close();
                if (onClear) onClear();
            });
        }
    }

    window.addEventListener('scroll', () => { if (_isOpen) positionDropdown(); }, true);
    window.addEventListener('resize', () => { if (_isOpen) positionDropdown(); });

    document.addEventListener('click', (e) => {
        if (_isOpen && !input.contains(e.target) && !dropdown.contains(e.target)) close();
    });

    return { close, selectItem };
}

// ============================================================================
// MODULE STATE
// ============================================================================

let _mode = null;
let _activeKey = null;
let _hiddenInput = null;
let _initialized = false;

export function isLookupMode() {
    return _mode === 'lookup';
}

export function refreshLookup() { }

// ============================================================================
// INIT: UNIFIED SEARCH
// ============================================================================

export function isProduceable(key) {
    if (RECIPES[key]) return true;
    for (const src of Object.keys(EXTRACTION_ROUTES)) {
        for (const route of Object.values(EXTRACTION_ROUTES[src])) {
            if (route.yields[key]) return true;
        }
    }
    return false;
}

export function initUnifiedSearch() {
    if (_initialized) return;

    const searchInput = document.getElementById('targetMetalSearch');
    _hiddenInput = document.getElementById('targetMetal');
    if (!searchInput || !_hiddenInput) return;
    _initialized = true;

    _hiddenInput.value = '';
    searchInput.value = '';

    function getAllSearchItems(q) {
        const t = i18n[state.currentLang] || i18n['en'];
        const items = [];
        CATEGORIES.forEach(cat => {
            cat.items.forEach(key => {
                // Only allow searching for materials that can be produced/extracted
                if (isProduceable(key)) {
                    items.push({ key, name: getItemName(key, t) });
                }
            });
        });
        return items
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter(item => item.name.toLowerCase().includes(q));
    }

    createAutocomplete({
        inputId: 'targetMetalSearch',
        dropdownId: 'targetMetalDropdown',
        clearBtnId: 'ui_clearTargetMetal',
        getItems: getAllSearchItems,

        onInput: (_q, hasMatches) => {
            _activeKey = null;
            if (!hasMatches) {
                _mode = 'typing';
                _showNotFoundState();
            }
        },

        onSelect: (key) => {
            _activeKey = key;
            _mode = 'refined';
            _hiddenInput.value = key;
            _hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
        },

        onClear: () => {
            _mode = null;
            _activeKey = null;
            _hiddenInput.value = '';
            _hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
}

export const initTargetMetalSearch = initUnifiedSearch;
export function initLookupWidget() { }

function _showNotFoundState() {
    const t = i18n[state.currentLang] || i18n['en'];
    const msg = `<div class="empty-msg">${t.searchNotFound || 'No material found with that name.'}</div>`;
    const gather = document.getElementById('gatherOutput');
    const steps = document.getElementById('stepsOutput');
    if (gather) gather.innerHTML = msg;
    if (steps) steps.innerHTML = msg;
    _resetStatusElements();
}

function _resetStatusElements() {
    const el = (id) => document.getElementById(id);
    if (el('statStacks')) el('statStacks').innerText = '0.00';
    if (el('cartTotalGold')) el('cartTotalGold').innerText = '0.00 g';
    if (el('gatherProgressBar')) el('gatherProgressBar').style.width = '0%';
    if (el('projectProgressBar')) el('projectProgressBar').style.width = '0%';
    if (el('projectProgressText')) {
        el('projectProgressText').innerText = '0%';
        el('projectProgressText').style.color = 'var(--text)';
    }
    if (el('bpContainer')) el('bpContainer').style.display = 'none';
}