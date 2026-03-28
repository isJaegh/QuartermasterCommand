import { CATEGORIES } from '../data/data.js';
import { i18n } from '../data/lang.js';
import { state } from '../state/store.js';
import { handlePipelineChange } from '../core/pipeline.js';
import { getRelevantItems } from '../core/engine.js';
import { closeModal } from './modals.js';
import { getItemName, getDefaultPrice } from '../utils/format.js';

export function initMarketData() {
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        if (!state.marketData[k]) state.marketData[k] = [{ p: getDefaultPrice(k), q: 0 }];
    });
}

export function addMarketTier(k) {
    state.marketData[k].push({ p: getDefaultPrice(k), q: 0 });
    renderMarketTable();
}

export function removeMarketTier(k, idx) {
    state.marketData[k].splice(idx, 1);
    renderMarketTable();
    handlePipelineChange();
}

export function clearMarketTier(k, idx) {
    state.marketData[k][idx].q = 0;
    renderMarketTable();
    handlePipelineChange();
}

export function clearCart() {
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        state.marketData[k] = [{ p: getDefaultPrice(k), q: 0 }];
    });
    renderMarketTable();
    handlePipelineChange();
}

export function updateMarketTier(k, idx, field, val) {
    state.marketData[k][idx][field] = Number(val) || 0;
    handlePipelineChange();
}

export function quickAddMarket(k, idx) {
    const isStacks = document.getElementById('mode').value === 'stacks';
    let current = Number(state.marketData[k][idx].q) || 0;
    state.marketData[k][idx].q = isStacks ? parseFloat((current + 1).toFixed(4)) : current + 10000;
    renderMarketTable();
    handlePipelineChange();
}

export function quickSubMarket(k, idx) {
    const isStacks = document.getElementById('mode').value === 'stacks';
    let current = Number(state.marketData[k][idx].q) || 0;
    state.marketData[k][idx].q = Math.max(0, isStacks ? parseFloat((current - 1).toFixed(4)) : current - 10000);
    renderMarketTable();
    handlePipelineChange();
}

export function autoFillMarketItem(k) {
    const mode = document.getElementById('mode').value;
    let needed = state.pureDeficits[k] || 0;
    let currentP = state.marketData[k]?.[0]?.p || getDefaultPrice(k);

    state.marketData[k] = [{
        p: currentP,
        q: mode === 'stacks' ? parseFloat((needed / 10000).toFixed(4)) : needed
    }];

    renderMarketTable();
    handlePipelineChange();
}

export function autoFillCart() {
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        const mode = document.getElementById('mode').value;
        let needed = state.pureDeficits[k] || 0;
        state.marketData[k] = [{
            p: state.marketData[k]?.[0]?.p || getDefaultPrice(k),
            q: mode === 'stacks' ? parseFloat((needed / 10000).toFixed(4)) : needed
        }];
    });
    renderMarketTable();
    handlePipelineChange();
    closeModal('cartModal');
}

export function renderMarketTable() {
    const container = document.getElementById('marketContainer');
    if (!container) return;
    const t = i18n[state.currentLang] || i18n['en'];
    const addLabel = document.getElementById('mode').value === 'stacks' ? (t.qAddStk || '+1 Stk') : (t.qAdd || '+10k');
    const subLabel = document.getElementById('mode').value === 'stacks' ? (t.qSubStk || '-1 Stk') : (t.qSub || '-10k');

    let html = ``;

    CATEGORIES.forEach(cat => {
        html += `<div id="m_cat_${cat.id}" style="display:none;"><div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${(t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id}</div>`;

        cat.items.forEach(k => {
            if (!state.marketData[k]) return;
            const tiers = state.marketData[k];
            let tiersHtml = '';

            tiers.forEach((tier, idx) => {
                let addRemoveBtn = idx > 0 ?
                    `<button class="btn-warning btn-sq" style="margin: 0; padding: 0; font-size:14px;" title="Remove Tier" onclick="removeMarketTier('${k}', ${idx})">-</button>` :
                    `<button class="btn-accent btn-sq" style="margin: 0; padding: 0; font-size:14px; color:#000;" title="Add Tier" onclick="addMarketTier('${k}')">+</button>`;

                tiersHtml += `
                    <div class="market-tier-row">
                        <div style="display: flex; align-items: center; gap: 8px; min-width: 130px;">
                            <span style="color:var(--text-dim); font-size:11px; font-weight:bold; white-space: nowrap;">↳ ${t.tblOrder || 'Order'} ${idx + 1}</span>
                            <input type="number" style="width: 55px; margin: 0;" value="${tier.p}" title="Price" max="999" oninput="updateMarketTier('${k}', ${idx}, 'p', this.value)">
                        </div>
                        <div style="display:flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                            <button class="btn-stack q-sub" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickSubMarket('${k}', ${idx})">${subLabel}</button>
                            <input type="number" style="width: 95px; margin: 0;" value="${tier.q}" title="Qty" oninput="updateMarketTier('${k}', ${idx}, 'q', this.value)">
                            <button class="btn-stack q-add" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickAddMarket('${k}', ${idx})">${addLabel}</button>
                            <button class="btn-cart btn-success" style="margin: 0; padding: 0 8px;" title="Auto-Fill Missing" onclick="autoFillMarketItem('${k}')">${t.btnAutoFill || 'Fill'}</button>
                            <button class="btn-clear" style="margin: 0; padding: 0 8px;" title="Clear Qty" onclick="clearMarketTier('${k}', ${idx})">${t.btnClearCart || 'Clear'}</button>
                            ${addRemoveBtn}
                        </div>
                    </div>`;
            });

            let itemName = getItemName(k, t);

            html += `<div class="market-card" id="row_m_${k}" style="display:none;">
                <div class="market-card-header">
                    <div style="font-weight:bold; color:var(--text); font-size: 1.1em;">${itemName}</div>
                    <div style="display: flex; gap: 15px; text-align: right;">
                        <div><span style="font-size: 10px; color: var(--text-dim); text-transform: uppercase;">${t.tblCost || 'Cost'}</span> <br><span style="font-weight:bold; color:var(--accent); font-size: 1.1em;" id="cost_${k}">0.00</span></div>
                        <div><span style="font-size: 10px; color: var(--text-dim); text-transform: uppercase;">${t.tblStash || 'Stash'}</span> <br><span style="color:var(--text-dim);" id="stash_${k}">0</span></div>
                    </div>
                </div>
                <div>${tiersHtml}</div>
            </div>`;
        });
        html += `</div>`;
    });

    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; padding-top:10px; border-top:1px solid var(--border);"><div style="font-weight:bold; text-transform:uppercase; color:var(--text-dim);">${t.cartTotal || 'Total'}</div><div id="cartTotalGold" style="font-weight:bold; color:var(--accent); font-size:1.3em;">0.00 g</div></div>`;
    container.innerHTML = html;

    if (document.getElementById('targetMetal')) {
        updateVisibility(document.getElementById('targetMetal').value);
    }
}

export function updateVisibility(targetMetal) {
    const relevant = getRelevantItems(targetMetal);
    const showAllBank = document.getElementById('showAllBank')?.checked;
    const showAllCart = document.getElementById('showAllCart')?.checked;

    const searchBank = (document.getElementById('searchBank')?.value || "").toLowerCase();
    const searchCart = (document.getElementById('searchCart')?.value || "").toLowerCase();
    const t = i18n[state.currentLang] || i18n['en'];

    CATEGORIES.forEach(cat => {
        let catHasVisibleBank = false;
        let catHasVisibleMarket = false;

        cat.items.forEach(k => {
            let itemName = getItemName(k, t).toLowerCase();
            let matchBankSearch = searchBank === "" || itemName.includes(searchBank);
            let matchCartSearch = searchCart === "" || itemName.includes(searchCart);

            let isActive = window.activeResources && window.activeResources.has(k);

            const rowB = document.getElementById('row_b_' + k);
            if (rowB) {
                let shouldShow = false;
                if (searchBank !== "") {
                    shouldShow = matchBankSearch;
                } else {
                    shouldShow = (showAllBank || relevant.has(k) || isActive);
                    if (!showAllBank && k === targetMetal) shouldShow = false;
                }

                rowB.style.display = shouldShow ? 'grid' : 'none';
                if (shouldShow) catHasVisibleBank = true;
            }

            const rowM = document.getElementById('row_m_' + k);
            if (rowM) {
                let shouldShow = false;
                if (searchCart !== "") {
                    shouldShow = matchCartSearch;
                } else {
                    shouldShow = (showAllCart || relevant.has(k) || isActive);
                    if (!showAllCart && k === targetMetal) shouldShow = false;
                }

                rowM.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) catHasVisibleMarket = true;
            }
        });

        const catDivB = document.getElementById('b_cat_' + cat.id);
        if (catDivB) catDivB.style.display = catHasVisibleBank ? 'block' : 'none';

        const mCatDiv = document.getElementById('m_cat_' + cat.id);
        if (mCatDiv) mCatDiv.style.display = catHasVisibleMarket ? 'block' : 'none';
    });
}
