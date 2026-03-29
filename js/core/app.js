import { state, saveState } from '../state/store.js';
import { CATEGORIES, getAllItems, RECIPES, EXTRACTION_ROUTES, VENDOR_ITEMS } from '../data/data.js';
import { i18n } from '../data/lang.js';
import { renderBankTable } from '../ui/bank.js';
import { renderMarketTable, updateVisibility } from '../ui/market.js';
import { handlePipelineChange, clearPipelineProgress, updatePipelineVisuals, updateFocusView, navFocus } from './pipeline.js';
import { resolveTree, resolveExtractions, MULTI_SOURCES } from './engine.js';
import { closeModal, openModal } from '../ui/modals.js';
import { getMultiplier, getItemName } from '../utils/format.js';

let timer = null;

// Byproduct navigation history
let byproductHistory = [];
let byproductHistoryIndex = -1;

// Helper function to determine if a material can be crafted/extracted
export function isProduceable(k) {
    if (RECIPES[k]) return true;
    for (const src of Object.keys(EXTRACTION_ROUTES)) {
        for (const route of Object.values(EXTRACTION_ROUTES[src])) {
            if (route.yields && route.yields[k]) return true;
        }
    }
    return false;
}

export function handleModeChange() {
    const mode = document.getElementById('mode').value;
    const targetEl = document.getElementById('targetAmount');
    let targetVal = Number(targetEl.value) || 0;

    if (state.prevMode === 'units' && mode === 'stacks') targetEl.value = (targetVal / 10000).toFixed(4);
    else if (state.prevMode === 'stacks' && mode === 'units') targetEl.value = Math.round(targetVal * 10000);

    const convert = (id) => {
        const el = document.getElementById(id);
        if (el) {
            let val = Number(el.value) || 0;
            if (state.prevMode === 'units' && mode === 'stacks') el.value = (val / 10000).toFixed(4);
            else if (state.prevMode === 'stacks' && mode === 'units') el.value = Math.round(val * 10000);
        }
    };

    getAllItems().forEach(k => convert('b_' + k));

    getAllItems().forEach(k => {
        if (state.marketData[k]) {
            state.marketData[k].forEach(tier => {
                if (state.prevMode === 'units' && mode === 'stacks') tier.q = parseFloat((tier.q / 10000).toFixed(4));
                else if (state.prevMode === 'stacks' && mode === 'units') tier.q = Math.round(tier.q * 10000);
            });
        }
    });

    state.prevMode = mode;
    renderBankTable();
    renderMarketTable();
    handlePipelineChange();
}

export function targetMetalChanged() {
    handlePipelineChange();
}

export function run() {
    clearTimeout(timer);
    document.getElementById('gatherOutput')?.classList.add('calculating');
    document.getElementById('stepsOutput')?.classList.add('calculating');
    timer = setTimeout(calculate, 150);
}

export function calculateMax() {
    const t = i18n[state.currentLang] || i18n['en'];
    const targetMetal = document.getElementById('targetMetal').value;

    if (!targetMetal) return;

    const mode = document.getElementById('mode').value;
    const mult = getMultiplier(mode);
    let originalTarget = Number(document.getElementById('targetAmount').value) || 0;
    let targetUnits = originalTarget * mult;

    if (targetUnits <= 0) return;

    const mR = document.getElementById('modRef').checked ? 1.03 : 1;
    const mE = document.getElementById('modExt').checked ? 1.03 : 1;
    const mM = document.getElementById('modMast').checked ? 1.06 : 1;

    let bank = {};
    getAllItems().forEach(k => {
        bank[k] = (Number(document.getElementById('b_' + k)?.value) || 0) * mult;
    });

    let origTree = resolveTree(targetMetal, targetUnits, bank, mR);
    let origExts = resolveExtractions(origTree.deficits, mE, mM, bank);

    let origMissing = { ...origExts.raw };
    if (origTree.intermediates) {
        Object.keys(origTree.intermediates).forEach(k => {
            origMissing[k] = (origMissing[k] || 0) + origTree.intermediates[k];
        });
    }

    let low = 0;
    let high = 10000000;
    let best = 0;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let tree = resolveTree(targetMetal, mid, bank, mR);
        let exts = resolveExtractions(tree.deficits, mE, mM, bank);
        let hasDeficit = Object.values(exts.raw).some(v => v > 0);
        if (!hasDeficit) { best = mid; low = mid + 1; } else { high = mid - 1; }
    }

    let targetName = getItemName(targetMetal, t);
    let fmtOrig = mode === 'stacks' ? originalTarget + " Stk" : originalTarget.toLocaleString();
    let bestFmt = mode === 'stacks' ? (best / 10000).toFixed(4) : best.toLocaleString();

    let bodyHtml = '';

    document.getElementById('ui_maxTitle').innerText = t.maxTitle;
    const acknowledgeBtn = document.getElementById('ui_maxAcknowledge');
    if (acknowledgeBtn) acknowledgeBtn.innerText = t.maxAcknowledge;

    if (best > 0) {
        bodyHtml += `<p style="color:var(--text-dim); margin-top:0;">${t.maxTotalCraft} <strong style="color:var(--accent); font-size:1.1em;">${bestFmt} ${targetName}</strong>.</p>`;
    } else {
        let craftAnyMsg = t.maxCraftAny.replace('[item]', targetName);
        bodyHtml += `<p style="color:var(--danger); font-weight:bold; margin-top:0;">${craftAnyMsg}</p>`;
    }

    let hasMissing = Object.values(origMissing).some(v => v > 0);

    if (best < targetUnits && hasMissing) {
        let missingMsg = t.maxMissing.replace('[target]', `${fmtOrig} ${targetName}`);
        bodyHtml += `<p style="margin-bottom: 15px; border-top: 1px dashed var(--border); padding-top: 15px;">${missingMsg}</p>`;

        CATEGORIES.forEach(cat => {
            let catItems = [];
            cat.items.forEach(k => {
                if (origMissing[k] > 0) {
                    let itemName = getItemName(k, t);
                    let amt = mode === 'stacks' ? (origMissing[k] / 10000).toFixed(2) + " Stk" : origMissing[k].toLocaleString();
                    catItems.push(`
                        <div style="display:flex; justify-content:space-between; padding: 8px 12px; background: rgba(0,0,0,0.1); border: 1px solid var(--border); border-radius: 4px; margin-bottom: 4px;">
                            <span>${itemName}</span>
                            <span style="color:var(--danger); font-weight:bold;">${amt}</span>
                        </div>
                    `);
                }
            });
            if (catItems.length > 0) {
                let catName = (t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id;
                bodyHtml += `<div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${catName}</div>` + catItems.join('');
            }
        });
    } else if (best >= targetUnits) {
        bodyHtml += `<p style="color:var(--success); font-weight:bold; margin-top: 15px;">${t.maxCalculatedGoal}</p>`;
    }

    document.getElementById('maxCraftBody').innerHTML = bodyHtml;
    closeModal('bankModal');
    openModal('maxCraftModal');

    if (best > 0) {
        document.getElementById('targetAmount').value = mode === 'stacks' ? (best / 10000).toFixed(4) : best;
        handlePipelineChange();
    }
}

function readInputs() {
    const mode = document.getElementById('mode').value;
    const t = i18n[state.currentLang] || i18n['en'];
    const targetRaw = Number(document.getElementById('targetAmount').value) || 0;
    const crafters = Math.max(1, Number(document.getElementById('crafters').value));
    const targetMetal = document.getElementById('targetMetal').value;
    const mult = getMultiplier(mode);
    const chkBp = document.getElementById('chkBp');
    const showBp = chkBp ? chkBp.checked : false;
    const mR = document.getElementById('modRef').checked ? 1.03 : 1;
    const mE = document.getElementById('modExt').checked ? 1.03 : 1;
    const mM = document.getElementById('modMast').checked ? 1.06 : 1;

    const bank = {};
    const purchased = {};
    let totalGold = 0;

    getAllItems().forEach(k => {
        bank[k] = (Number(document.getElementById('b_' + k)?.value) || 0) * mult;

        let buyQtyUnits = 0;
        if (state.marketData[k]) {
            state.marketData[k].forEach(tier => {
                const tierUnits = tier.q * mult;
                buyQtyUnits += tierUnits;
                totalGold += (tierUnits / 10000) * tier.p;
            });
        }
        purchased[k] = buyQtyUnits;
    });

    return { mode, t, targetRaw, crafters, targetMetal, mult, showBp, mR, mE, mM, bank, purchased, totalGold };
}

function renderEmpty({ t, targetMetal }) {
    const emptyMsg = `<div class="empty-msg" style="text-align:center; padding: 20px; color: var(--text-dim); font-style: italic;">${t.searchEmptyState || 'Enter a material above to begin.'}</div>`;
    document.getElementById('gatherOutput').innerHTML = emptyMsg;
    document.getElementById('stepsOutput').innerHTML = "";
    document.getElementById('statStacks').innerText = "0.00";
    if (document.getElementById('cartTotalGold')) document.getElementById('cartTotalGold').innerText = "0.00 g";

    state.pipelineStepsRaw = [];
    state.byproductsRaw = {};
    state.pureDeficits = {};

    if (document.getElementById('mod_defGather')) document.getElementById('mod_defGather').style.display = 'none';
    if (document.getElementById('mod_mfgPipe')) document.getElementById('mod_mfgPipe').style.display = 'none';
    if (document.getElementById('mod_byproducts')) document.getElementById('mod_byproducts').style.display = 'none';

    const btnMax = document.getElementById('ui_btnMaxText');
    if (btnMax) btnMax.disabled = true;

    if (document.getElementById('gatherProgressBar')) {
        document.getElementById('gatherProgressBar').style.width = '0%';
        document.getElementById('gatherProgressBar').style.backgroundColor = 'transparent';
    }
    if (document.getElementById('gatherProgressText')) {
        document.getElementById('gatherProgressText').innerText = '0%';
        document.getElementById('gatherProgressText').style.color = 'var(--text)';
    }
    if (document.getElementById('projectProgressBar')) {
        document.getElementById('projectProgressBar').style.width = '0%';
        document.getElementById('projectProgressBar').style.backgroundColor = 'transparent';
    }
    if (document.getElementById('projectProgressText')) {
        document.getElementById('projectProgressText').innerText = "0%";
        document.getElementById('projectProgressText').style.color = "var(--text)";
    }

    getAllItems().forEach(k => {
        if (document.getElementById('cost_' + k)) document.getElementById('cost_' + k).innerText = "0.00";
        if (document.getElementById('stash_' + k)) document.getElementById('stash_' + k).innerText = "0";
    });
    updateVisibility(targetMetal);
    saveState();
}

function runCalculations({ targetRaw, targetMetal, mult, mR, mE, mM, bank, purchased }) {
    const grossTree = resolveTree(targetMetal, targetRaw * mult, {}, mR);
    const grossExtractions = resolveExtractions(grossTree.deficits, mE, mM, {});

    const virtualBank = {};
    Object.keys(bank).forEach(k => virtualBank[k] = bank[k] + purchased[k]);

    const actualTree = resolveTree(targetMetal, targetRaw * mult, virtualBank, mR);
    const actualExtractions = resolveExtractions(actualTree.deficits, mE, mM, virtualBank);

    const baseTree = resolveTree(targetMetal, targetRaw * mult, bank, mR);
    const baseExtractions = resolveExtractions(baseTree.deficits, mE, mM, bank);
    state.pureDeficits = { ...baseExtractions.raw };

    const finalDeficits = {};
    [...Object.keys(actualTree.intermediates), ...Object.keys(actualExtractions.raw), ...Object.keys(actualExtractions.extracted)].forEach(k => {
        let missing = 0;
        if (actualExtractions.raw[k]) missing += actualExtractions.raw[k];
        if (actualTree.intermediates[k]) missing += actualTree.intermediates[k];
        if (actualExtractions.extracted[k]) missing += actualExtractions.extracted[k];
        if (missing > 0) finalDeficits[k] = missing;
    });

    state.byproductsRaw = actualExtractions.bp;

    window.activeResources = new Set();
    [...Object.keys(grossExtractions.raw), ...Object.keys(grossTree.intermediates), ...Object.keys(grossExtractions.extracted)].forEach(k => {
        window.activeResources.add(k);
    });

    const prevPipelineStr = JSON.stringify(state.pipelineStepsRaw);
    const newPipeline = [...actualExtractions.extSteps, ...actualTree.steps];
    if (JSON.stringify(newPipeline) !== prevPipelineStr) {
        state.completedSteps = [];
        state.focusIndex = 0;
    }
    state.pipelineStepsRaw = newPipeline;

    return { grossTree, grossExtractions, actualExtractions, finalDeficits };
}

function renderLogistics({ mode, t, targetMetal, mult, showBp, bank, purchased, totalGold }, { grossTree, grossExtractions, actualExtractions, finalDeficits }) {
    getAllItems().forEach(k => {
        const costEl = document.getElementById('cost_' + k);
        const stashEl = document.getElementById('stash_' + k);

        if (costEl) {
            let totalCostThisItem = 0;
            if (state.marketData[k]) {
                state.marketData[k].forEach(tier => { totalCostThisItem += (tier.q * (mode === 'stacks' ? 1 : 0.0001)) * tier.p; });
            }
            costEl.innerText = totalCostThisItem.toFixed(2);
        }
        if (stashEl) {
            const stashRaw = (bank[k] + purchased[k]) / mult;
            stashEl.innerText = mode === 'stacks' ? stashRaw.toFixed(2) + " Stk" : stashRaw.toLocaleString();
        }
    });

    if (document.getElementById('cartTotalGold')) document.getElementById('cartTotalGold').innerText = totalGold.toFixed(2) + " g";

    let gHTML = '';
    let totalGatherUnits = 0;
    let totalAcquiredUnits = 0;
    let totalNeededUnits = 0;

    CATEGORIES.forEach(cat => {
        let catHtml = '';
        cat.items.forEach(k => {
            let totalNeeded = (grossExtractions.raw[k] || 0) + (grossTree.intermediates[k] || 0) + (grossExtractions.extracted[k] || 0);

            if (totalNeeded > 0 && k !== targetMetal) {
                let itemName = getItemName(k, t);
                let missingAmt = finalDeficits[k] || 0;

                if (actualExtractions.raw[k]) totalGatherUnits += actualExtractions.raw[k];
                let isComplete = missingAmt <= 0;
                if (isComplete) missingAmt = 0;

                const fmtVal = mode === 'stacks' ? (missingAmt / 10000).toFixed(2) + " Stk" : missingAmt.toLocaleString();
                let amountAcquired = totalNeeded - missingAmt;
                let progressPct = totalNeeded > 0 ? Math.min(100, Math.max(0, (amountAcquired / totalNeeded) * 100)) : 0;

                totalAcquiredUnits += amountAcquired;
                totalNeededUnits += totalNeeded;

                let hueVal = Math.max(0, Math.min(120, Math.round((progressPct / 100) * 120)));
                let dynColor = `hsl(${hueVal}, 85%, 45%)`;

                // Render as static text so it is not clickable in Missing Components
                const isVendorSourced = VENDOR_ITEMS.has(k) && state.userSourcePrefs && state.userSourcePrefs[k] === 'vendor';
                const vendorTag = isVendorSourced
                    ? ` <span style="font-size:0.75em; color:var(--accent); font-weight:normal;">[${(t.vendorSource || 'Magic Vendor')}]</span>`
                    : '';
                let itemNameStr = `<span style="color:var(--text);">${itemName}${vendorTag}</span>`;
                let itemNameCompleteStr = `<span style="color:var(--text-dim); text-decoration: line-through; opacity: 0.6;">${itemName}</span>`;

                if (isComplete) {
                    catHtml += `<div class="logistics-item" style="border-left-color: ${dynColor}; --prog: 100%; --hue: 120;">
                        ${itemNameCompleteStr}
                        <div style="display: flex; align-items: center; justify-content: flex-end;">
                            <span style="color:var(--text-dim); font-weight:normal; margin-right: 12px; text-align: right; text-decoration: line-through; opacity: 0.6;">${fmtVal}</span>
                            <span style="color:${dynColor}; font-weight: bold; text-align: right; min-width: 40px;">100%</span>
                        </div>
                    </div>`;
                } else {
                    catHtml += `<div class="logistics-item" style="border-left-color: ${dynColor}; --prog: ${progressPct}%; --hue: ${hueVal};">
                        ${itemNameStr}
                        <div style="display: flex; align-items: center; justify-content: flex-end;">
                            <span style="color:var(--text-dim); font-weight:normal; margin-right: 12px; text-align: right;">${fmtVal}</span>
                            <span style="color:${dynColor}; font-weight: bold; text-align: right; min-width: 40px;">${progressPct.toFixed(0)}%</span>
                        </div>
                    </div>`;
                }
            }
        });
        if (catHtml !== '') {
            let catName = (t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id;
            gHTML += `<div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${catName}</div>` + catHtml;
        }
    });

    document.getElementById('gatherOutput').innerHTML = gHTML !== '' ? gHTML : `<div class="empty-msg">${t.allCovered || 'All covered!'}</div>`;
    document.getElementById('statStacks').innerText = (totalGatherUnits / 10000).toFixed(2);

    const gatherOverallPct = totalNeededUnits > 0 ? (totalAcquiredUnits / totalNeededUnits) * 100 : 100;
    let gatherHue = Math.max(0, Math.min(120, Math.round((gatherOverallPct / 100) * 120)));
    const gatherColor = totalNeededUnits > 0 ? `hsl(${gatherHue}, 85%, 45%)` : 'var(--success)';

    if (document.getElementById('gatherProgressBar')) {
        document.getElementById('gatherProgressBar').style.width = gatherOverallPct + '%';
        document.getElementById('gatherProgressBar').style.backgroundColor = gatherColor;
    }
    if (document.getElementById('gatherProgressText')) {
        document.getElementById('gatherProgressText').innerText = gatherOverallPct.toFixed(0) + '%';
        document.getElementById('gatherProgressText').style.color = gatherColor;
    }
}

function renderPipeline({ t, mode, crafters, showBp }) {
    const perCr = crafters > 1 ? ` <span style="color:var(--warning); font-size:0.8em;">${t.perCrafter || '(Per Crafter)'}</span>` : "";

    const modPipe = document.getElementById('mod_mfgPipe');
    if (modPipe) modPipe.style.display = '';

    let outputHTML = state.pipelineStepsRaw.map((stepObj, index) => {
        let isCompleted = state.completedSteps.includes(index);
        let completedClass = isCompleted ? 'completed' : '';
        let checkIcon = isCompleted ? '[X]' : '[ ]';

        let modAction = stepObj.htmlAction.replace(/<span class="highlight">([\d,]+)/g, (match, p1) => {
            let num = parseInt(p1.replace(/,/g, ''));
            return `<span class="highlight">${Math.ceil(num / crafters).toLocaleString()}`;
        });

        let mainYieldsStr = (stepObj.mainYields && stepObj.mainYields.length > 0) ? stepObj.mainYields.map(y => {
            let yName = getItemName(y.item, t);
            return `<span class="highlight">${y.amount.toLocaleString()} ${yName}</span>`;
        }).join(', ') : "";

        let sourceHtml = '';
        if (stepObj.extractedItems && stepObj.extractedItems.length > 0) {
            let primaryItem = stepObj.extractedItems[0];
            if (MULTI_SOURCES[primaryItem]) {
                let btns = MULTI_SOURCES[primaryItem].map(src => {
                    let activeClass = src === stepObj.source ? 'active' : '';
                    let srcName = src === 'vendor'
                        ? (t.vendorSource || 'Magic Vendor')
                        : getItemName(src, t);
                    return `<button class="btn-route source-toggle-btn ${activeClass}" data-item="${primaryItem}" data-source="${src}">Source: ${srcName}</button>`;
                }).join('');
                sourceHtml = `<div class="route-choices" style="margin-top: 4px; padding-bottom: 6px; border-bottom: 1px dashed var(--border);">${btns}</div>`;
            }
        }

        let routeHtml = '';
        if (stepObj.routeStats && stepObj.routeStats.length > 1) {
            let btns = stepObj.routeStats.map(rs => {
                let classes = ['btn-route'];
                let badges = [];

                if (rs.name === stepObj.selectedRoute) classes.push('active');
                if (rs.isBestYield) { classes.push('rt-eff'); badges.push('<span class="acronym-box acronym-eff">E</span>'); }
                if (rs.isMaxYield) { classes.push('rt-max'); badges.push('<span class="acronym-box acronym-max">Y</span>'); }
                if (rs.isRegionLocked) { classes.push('rt-reg'); badges.push('<span class="acronym-box acronym-reg">R</span>'); }

                let badgeHtml = badges.length > 0 ? `<span style="margin-left:8px; display:inline-flex; gap:4px;">${badges.join('')}</span>` : '';
                let safeStepKey = stepObj.stepKey.replace(/'/g, "\\'");
                let safeRouteName = rs.name.replace(/'/g, "\\'");

                return `<button class="${classes.join(' ')}" data-action="changeRoute" data-step="${safeStepKey}" data-route="${safeRouteName}"><span>${rs.name}</span>${badgeHtml}</button>`;
            }).join('');
            routeHtml = `<div class="route-choices">${btns}</div>`;
        }

        const sep = `<hr style="border:none; border-top: 1px dashed var(--border); margin: 6px 0;">`;
        const hasButtons = sourceHtml !== '' || routeHtml !== '';

        // Build per-step byproducts string
        let byproductsStr = '';
        if (showBp && stepObj.byproducts && stepObj.byproducts.length > 0) {
            byproductsStr = stepObj.byproducts.map(y => {
                let yName = getItemName(y.item, t);
                return `<span style="color:var(--text-dim);">${y.amount.toLocaleString()} ${yName}</span>`;
            }).join(', ');
        }

        const hasOutputs = mainYieldsStr !== '' || byproductsStr !== '';

        return `<div class="step-card ${completedClass}" id="step_${index}" data-action="toggleStep" data-index="${index}">
            <div style="display:flex; align-items:baseline; gap:6px; margin-bottom:4px;">
                <span style="cursor:pointer; font-size:1.1em; flex-shrink:0;">${checkIcon}</span>
                <span style="color:var(--text-dim); font-size:0.85em; flex-shrink:0;">${t.stepPrefix || 'Step'} ${index + 1}.</span>
            </div>
            <div style="padding-left: 26px; margin-bottom:${hasOutputs || hasButtons ? '6px' : '0'};">
                ${modAction}${perCr}
            </div>
            ${hasOutputs ? `
            <div style="padding-left: 26px; font-size: 11px; display:flex; flex-direction:column; gap:4px;">
                ${sep}
                ${mainYieldsStr !== '' ? `<div><span style="color:var(--success); font-weight:bold;">${t.stepYieldsMain || 'Yields:'}</span> ${mainYieldsStr}</div>` : ''}
                ${byproductsStr !== '' ? `<div><span style="color:var(--warning); font-weight:bold;">${t.stepByproducts || 'Byproducts:'}</span> ${byproductsStr}</div>` : ''}
            </div>` : ''}
            ${hasButtons ? `<div style="padding-left: 26px;">${sep}${sourceHtml}${routeHtml}</div>` : ''}
        </div>`;
    }).join('');

    document.getElementById('stepsOutput').innerHTML = outputHTML;

    let bpHTML = '';
    CATEGORIES.forEach(cat => {
        let catHtml = '';
        cat.items.forEach(k => {
            if (state.byproductsRaw[k] > 0) {
                let itemName = getItemName(k, t);
                const fmtVal = mode === 'stacks' ? (state.byproductsRaw[k] / 10000).toFixed(2) + " Stk" : state.byproductsRaw[k].toLocaleString();

                let nameHtml = `<span class="clickable-byproduct" data-byproduct="${k}" style="cursor:pointer; color:var(--accent); text-decoration:underline;" title="View material details">${itemName}</span>`;

                catHtml += `<div class="logistics-item" style="border-left-color: var(--border); --prog: 0%;">
                    ${nameHtml}
                    <div style="display: flex; align-items: center; justify-content: flex-end;">
                        <span style="color:var(--text); font-weight:bold; text-align: right;">${fmtVal}</span>
                    </div>
                </div>`;
            }
        });
        if (catHtml !== '') {
            let catName = (t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id;
            bpHTML += `<div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${catName}</div>` + catHtml;
        }
    });

    const modBp = document.getElementById('mod_byproducts');
    if (bpHTML !== "" && showBp) {
        document.getElementById('bpOutput').innerHTML = bpHTML;
        if (modBp) modBp.style.display = '';
    } else {
        if (modBp) modBp.style.display = 'none';
    }

    updatePipelineVisuals();
    if (state.pipelineViewMode === 'focus') updateFocusView();
}

export function calculate() {
    document.getElementById('gatherOutput')?.classList.remove('calculating');
    document.getElementById('stepsOutput')?.classList.remove('calculating');
    const inputs = readInputs();

    const btnMax = document.getElementById('ui_btnMaxText');
    const hint = document.getElementById('prodCmdHint');

    if (!inputs.targetMetal || inputs.targetRaw <= 0) {
        if (btnMax) btnMax.disabled = true;
        if (hint) hint.style.display = 'block';
        renderEmpty(inputs);
        return;
    }

    if (btnMax) btnMax.disabled = false;
    const wasEmpty = hint && hint.style.display !== 'none';
    if (hint) hint.style.display = 'none';
    if (wasEmpty) {
        const prodCmd = document.getElementById('mod_prodCmd');
        if (prodCmd && !prodCmd.classList.contains('collapsed')) {
            prodCmd.classList.add('collapsed');
            state.collapsedState['mod_prodCmd'] = true;
        }
    }
    const defGather = document.getElementById('mod_defGather');
    if (defGather) defGather.style.display = '';

    const results = runCalculations(inputs);
    renderLogistics(inputs, results);
    renderPipeline(inputs, results);
    updateVisibility(inputs.targetMetal);
    saveState();
}

export function updateLogisticsOnly() {
    const inputs = readInputs();
    if (!inputs.targetMetal || inputs.targetRaw <= 0) return;

    const grossTree = resolveTree(inputs.targetMetal, inputs.targetRaw * inputs.mult, {}, inputs.mR);
    const grossExtractions = resolveExtractions(grossTree.deficits, inputs.mE, inputs.mM, {});

    const virtualBank = {};
    Object.keys(inputs.bank).forEach(k => virtualBank[k] = inputs.bank[k] + inputs.purchased[k]);

    const actualTree = resolveTree(inputs.targetMetal, inputs.targetRaw * inputs.mult, virtualBank, inputs.mR);
    const actualExtractions = resolveExtractions(actualTree.deficits, inputs.mE, inputs.mM, virtualBank);

    const finalDeficits = {};
    [...Object.keys(actualTree.intermediates), ...Object.keys(actualExtractions.raw), ...Object.keys(actualExtractions.extracted)].forEach(k => {
        let missing = 0;
        if (actualExtractions.raw[k]) missing += actualExtractions.raw[k];
        if (actualTree.intermediates[k]) missing += actualTree.intermediates[k];
        if (actualExtractions.extracted[k]) missing += actualExtractions.extracted[k];
        if (missing > 0) finalDeficits[k] = missing;
    });

    renderLogistics(inputs, { grossTree, grossExtractions, actualExtractions, finalDeficits });
}

function updateBpNavButtons() {
    const backBtn = document.getElementById('ui_btnBpBack');
    const fwdBtn = document.getElementById('ui_btnBpFwd');
    if (backBtn) backBtn.disabled = byproductHistoryIndex <= 0;
    if (fwdBtn) fwdBtn.disabled = byproductHistoryIndex >= byproductHistory.length - 1;
}

export function resetByproductHistory() {
    byproductHistory = [];
    byproductHistoryIndex = -1;
}

export function navigateByproduct(direction) {
    const newIndex = byproductHistoryIndex + direction;
    if (newIndex < 0 || newIndex >= byproductHistory.length) return;
    byproductHistoryIndex = newIndex;
    renderByproductModal(byproductHistory[byproductHistoryIndex]);
    updateBpNavButtons();
}

export function processByproduct(k) {
    // Truncate forward history when navigating to a new item from the middle
    if (byproductHistoryIndex < byproductHistory.length - 1) {
        byproductHistory = byproductHistory.slice(0, byproductHistoryIndex + 1);
    }
    byproductHistory.push(k);
    byproductHistoryIndex = byproductHistory.length - 1;
    renderByproductModal(k);
    updateBpNavButtons();
}

function renderByproductModal(k) {
    const uses = new Set();
    const sources = new Set();

    for (const [outputItem, routes] of Object.entries(RECIPES)) {
        for (const rec of Object.values(routes)) {
            if (rec.primary === k || rec.cat1 === k || rec.cat2 === k || rec.ore === k || rec.cat === k) {
                uses.add(outputItem);
            }
        }
    }

    if (EXTRACTION_ROUTES[k]) {
        for (const route of Object.values(EXTRACTION_ROUTES[k])) {
            for (const yItem of Object.keys(route.yields)) {
                if (yItem !== k) uses.add(yItem);
            }
        }
    }

    if (RECIPES[k]) {
        for (const rec of Object.values(RECIPES[k])) {
            if (rec.type === 'alloy' && rec.primary) sources.add(rec.primary);
            if (rec.type === 'smelt' && rec.ore) sources.add(rec.ore);
        }
    }

    for (const [sourceItem, routes] of Object.entries(EXTRACTION_ROUTES)) {
        for (const route of Object.values(routes)) {
            if (route.yields && route.yields[k]) {
                sources.add(sourceItem);
            }
        }
    }

    const usesArr = Array.from(uses);
    const sourcesArr = Array.from(sources);
    const t = i18n[state.currentLang] || i18n['en'];
    const itemName = getItemName(k, t);

    let strProducedFrom = t.usesProducedFrom || "is produced from:";
    let strCanMake = t.usesCanMake || "can be used to make:";
    let strSetTarget = t.usesSetTarget || "Set as Target";
    let strNoRecipes = t.usesNone || "No known recipes or sources for";

    let html = '';

    if (sourcesArr.length > 0) {
        html += `<p style="color:var(--text-dim); margin-top:0; margin-bottom: 10px;"><strong>${itemName}</strong> ${strProducedFrom}</p>`;
        html += `<div style="display:flex; flex-direction:column; gap:8px; margin-bottom: 20px;">`;
        sourcesArr.sort((a, b) => getItemName(a, t).localeCompare(getItemName(b, t))).forEach(u => {
            let uName = getItemName(u, t);

            let uNameHtml = `<span class="clickable-byproduct" data-byproduct="${u}" style="color:var(--text); cursor:pointer; text-decoration:underline; font-size: 14px;" title="View material details">${uName}</span>`;

            let btnHtml = isProduceable(u)
                ? `<button class="btn-mini btn-route set-target-btn" data-target-item="${u}" data-target-name="${uName.replace(/"/g, '&quot;')}">${strSetTarget}</button>`
                : '';

            html += `<div class="market-card" style="margin-bottom:0; padding: 10px 15px; display:flex; justify-content:space-between; align-items:center;">
                ${uNameHtml}
                ${btnHtml}
            </div>`;
        });
        html += `</div>`;
    }

    if (usesArr.length > 0) {
        html += `<p style="color:var(--text-dim); margin-top:0; margin-bottom: 10px;"><strong>${itemName}</strong> ${strCanMake}</p>`;
        html += `<div style="display:flex; flex-direction:column; gap:8px;">`;
        usesArr.sort((a, b) => getItemName(a, t).localeCompare(getItemName(b, t))).forEach(u => {
            let uName = getItemName(u, t);

            let uNameHtml = `<span class="clickable-byproduct" data-byproduct="${u}" style="color:var(--text); cursor:pointer; text-decoration:underline; font-size: 14px;" title="View material details">${uName}</span>`;

            let btnHtml = isProduceable(u)
                ? `<button class="btn-mini btn-route set-target-btn" data-target-item="${u}" data-target-name="${uName.replace(/"/g, '&quot;')}">${strSetTarget}</button>`
                : '';

            html += `<div class="market-card" style="margin-bottom:0; padding: 10px 15px; display:flex; justify-content:space-between; align-items:center;">
                ${uNameHtml}
                ${btnHtml}
            </div>`;
        });
        html += `</div>`;
    }

    if (usesArr.length === 0 && sourcesArr.length === 0) {
        html += `<p style="color:var(--text-dim); margin-top:0;">${strNoRecipes} <strong>${itemName}</strong>.</p>`;
    }

    document.getElementById('usesModalBody').innerHTML = html;
    openModal('usesModal');
}