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
            const val = Number(document.getElementById('b_' + k)?.value) || 0;
            let itemName = getItemName(k, t);

            html += `<div class="bank-row" id="row_b_${k}" style="display:none;">
                <div style="font-weight:bold; color:var(--text);">${itemName}</div>
                <div style="text-align:right;">
                    <div style="display:flex; gap: 4px; justify-content: flex-end; align-items:center; flex-wrap: wrap;">
                        <button class="btn-stack q-sub" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickSub('b_${k}')">${subLabel}</button>
                        <input type="number" id="b_${k}" value="${val}" oninput="handlePipelineChange()" style="width: 95px; margin: 0;">
                        <button class="btn-stack q-add" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickAdd('b_${k}')">${addLabel}</button>
                        <button class="btn-clear" style="margin: 0; padding: 0 8px;" title="Clear Qty" onclick="clearItem('b_${k}')">${t.btnClearCart || 'Clear'}</button>
                    </div>
                </div>
            </div>`;
        });
        html += `</div>`;
    });
    container.innerHTML = html;
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
