import { CATEGORIES, getAllItems } from '../data/data.js';
import { i18n } from '../data/lang.js';
import { state } from '../state/store.js';
import { handlePipelineChange } from '../core/pipeline.js';
import { getItemName } from '../utils/format.js';

export function renderBankTable() {
    const container = document.getElementById('bankContainer');
    if (!container) return;
    const t = i18n[state.currentLang] || i18n['en'];
    const addLabel = document.getElementById('mode').value === 'stacks' ? (t.qAddStk || '+1 Stk') : (t.qAdd || '+10k');
    const subLabel = document.getElementById('mode').value === 'stacks' ? (t.qSubStk || '-1 Stk') : (t.qSub || '-10k');

    let html = "";
    CATEGORIES.forEach(cat => {
        html += `<div id="b_cat_${cat.id}" style="display:none;"><div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${(t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id}</div>`;

        cat.items.forEach(k => {
            const val = Number(document.getElementById('b_' + k)?.value) || state.bankData[k] || 0;
            let itemName = getItemName(k, t);

            html += `<div class="bank-row" id="row_b_${k}" style="display:none;">
                <div style="font-weight:bold; color:var(--text);">${itemName}</div>
                <div style="text-align:right;">
                    <div style="display:flex; gap: 4px; justify-content: flex-end; align-items:center; flex-wrap: wrap;">
                        <button class="btn-stack q-sub" style="margin: 0; min-width:30px; padding:0 4px;" data-action="quickSub" data-id="b_${k}">${subLabel}</button>
                        <input type="number" id="b_${k}" value="${val}" data-action="bankInput" style="width: 95px; margin: 0;">
                        <button class="btn-stack q-add" style="margin: 0; min-width:30px; padding:0 4px;" data-action="quickAdd" data-id="b_${k}">${addLabel}</button>
                        <button class="btn-clear" style="margin: 0; padding: 0 8px;" title="Clear Qty" data-action="clearItem" data-id="b_${k}">${t.btnClearCart || 'Clear'}</button>
                    </div>
                </div>
            </div>`;
        });
        html += `</div>`;
    });
    html += `<div id="bankSearchEmpty" class="search-empty" style="display:none;">No items match your search.</div>`;
    container.innerHTML = html;

    if (!container.dataset.listenersBound) {
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const id = btn.dataset.id;
            if (btn.dataset.action === 'quickSub') quickSub(id);
            else if (btn.dataset.action === 'quickAdd') quickAdd(id);
            else if (btn.dataset.action === 'clearItem') clearItem(id);
        });

        container.addEventListener('input', (e) => {
            if (e.target.dataset.action === 'bankInput') handlePipelineChange();
        });

        // SET THE FLAG
        container.dataset.listenersBound = 'true';
    }
}

export function quickAdd(id) {
    const el = document.getElementById(id);
    const isStacks = document.getElementById('mode').value === 'stacks';
    let current = Number(el.value) || 0;
    el.value = isStacks ? parseFloat((current + 1).toFixed(4)) : current + 10000;
    handlePipelineChange();
}

export function quickSub(id) {
    const el = document.getElementById(id);
    const isStacks = document.getElementById('mode').value === 'stacks';
    let current = Number(el.value) || 0;
    el.value = Math.max(0, isStacks ? parseFloat((current - 1).toFixed(4)) : current - 10000);
    handlePipelineChange();
}

export function clearItem(id) {
    const el = document.getElementById(id);
    if (el) { el.value = 0; handlePipelineChange(); }
}
