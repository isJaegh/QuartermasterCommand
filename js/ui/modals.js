// ============================================================================
// QUARTERMASTER COMMAND - LAZY LOAD MODAL ENGINE
// ============================================================================

import { i18n } from '../data/lang.js';
import { state } from '../state/store.js';
import { CATEGORIES } from '../data/data.js';
import { getItemName } from '../utils/format.js';

let _activeModal = null;

/**
 * Opens a modal. If it hasn't been opened yet, it lazy-loads the HTML from its template.
 * @param {string} modalId - The ID of the modal container (e.g., 'settingsModal')
 */
export function openModal(modalId) {
    // 1. Hide the previously open modal (avoids querying all .modal elements)
    if (_activeModal && _activeModal !== modalId) {
        const prev = document.getElementById(_activeModal);
        if (prev) prev.style.display = 'none';
    }
    _activeModal = modalId;

    const modalContainer = document.getElementById(modalId);
    if (!modalContainer) {
        console.error(`Modal container #${modalId} not found.`);
        return;
    }

    // 2. PHASE 3 LAZY LOAD: If the container is empty, stamp the template!
    if (modalContainer.childElementCount === 0) {
        const template = document.getElementById(`tpl_${modalId}`);
        if (template) {
            // Clone the template's content and inject it into the live DOM
            modalContainer.appendChild(template.content.cloneNode(true));

            // Re-run localization so the newly injected HTML gets translated immediately
            // if (typeof changeLang === 'function') changeLang(); 
        } else {
            console.error(`Template #tpl_${modalId} not found.`);
        }
    }

    // 3. Display the modal
    modalContainer.style.display = 'block';

    // 4. Reset specific states based on which modal opened
    if (modalId === 'settingsModal') {
        switchTab('view'); // Always open settings to the 'View' tab
    }

    if (modalId === 'helpModal') {
        const t = i18n[state.currentLang] || i18n['en'];
        const helpEl = document.getElementById('dynamicHelpContent');
        if (helpEl && t.helpHtml) helpEl.innerHTML = t.helpHtml;

        // Populate materials tab (fresh each open so language changes are reflected)
        const resourcesEl = document.getElementById('helpResourcesList');
        if (resourcesEl) {
            let html = '';
            CATEGORIES.forEach(cat => {
                if (cat.id === 'raw') return;
                const catLabel = (t.categories && t.categories[cat.id]) || cat.id;
                html += `<div style="margin-bottom:16px;">
                    <div class="bank-category" style="margin-bottom:6px;">${catLabel}</div>
                    <div style="display:flex; flex-wrap:wrap; gap:6px;">`;
                cat.items.forEach(k => {
                    html += `<span style="font-size:11px; padding:3px 8px; border-radius:4px; background:var(--bg-card); border:1px solid var(--border); color:var(--text);">${getItemName(k, t)}</span>`;
                });
                html += `</div></div>`;
            });
            resourcesEl.innerHTML = html;
        }

        // Always open on the Guide tab
        switchHelpTab('guide');
    }
}

/**
 * Closes a specific modal by ID.
 * @param {string} modalId 
 */
export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
    if (_activeModal === modalId) _activeModal = null;
}

/**
 * Handles switching between tabs inside the Help Modal
 * @param {string} tabId - 'guide' | 'materials' | 'legend'
 */
export function switchHelpTab(tabId) {
    document.querySelectorAll('#helpModal .tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('#helpModal .tab-btn').forEach(el => el.classList.remove('active'));
    const targetTab = document.getElementById('helpTab_' + tabId);
    const targetBtn = document.getElementById('helpTabBtn_' + tabId);
    if (targetTab) targetTab.style.display = 'block';
    if (targetBtn) targetBtn.classList.add('active');
}

/**
 * Handles switching between tabs inside the Settings Modal
 * @param {string} tabId - 'view' or 'data'
 */
export function switchTab(tabId) {
    // Hide all tab contents and remove active state from all buttons
    document.querySelectorAll('#settingsModal .tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('#settingsModal .tab-btn').forEach(el => el.classList.remove('active'));

    // Target the specific tab and button to activate
    const targetTab = document.getElementById('tab_' + tabId);
    const targetBtn = document.getElementById('tabBtn_' + tabId);

    if (targetTab) targetTab.style.display = 'block';
    if (targetBtn) targetBtn.classList.add('active');
}

/**
 * Toggles the mobile/desktop sidebar menu
 */
export function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
}