import { RECIPES, EXTRACT_MAP, EXTRACTION_ROUTES } from '../data/data.js';
import { i18n } from '../data/lang.js';
import { state } from '../state/store.js';
import { getItemName } from '../utils/format.js';
export function getPrimaryChain(targetMetal) {
    let chain = [targetMetal];
    let current = targetMetal;
    while (current) {
        let rec = RECIPES[current];
        if (rec) {
            let rKey = Object.keys(rec)[0];
            if (rec[rKey] && rec[rKey].type === 'alloy') current = rec[rKey].primary;
            else current = null;
        } else if (EXTRACT_MAP[current]) {
            current = EXTRACT_MAP[current];
        } else {
            current = null;
        }
        if (current) chain.push(current);
    }
    return chain;
}

export function getRelevantItems(targetMetal) {
    let relevant = new Set([targetMetal]);
    let queue = [targetMetal];

    while (queue.length > 0) {
        let item = queue.shift();
        let rec = RECIPES[item];

        if (rec) {
            Object.values(rec).forEach(variant => {
                let deps = [variant.primary, variant.cat1, variant.cat2, variant.ore, variant.cat];
                deps.forEach(d => { if (d && !relevant.has(d)) { relevant.add(d); queue.push(d); } });
            });
        }

        if (EXTRACT_MAP[item]) {
            let d = EXTRACT_MAP[item];
            if (d && !relevant.has(d)) { relevant.add(d); queue.push(d); }
        }
    }
    return relevant;
}

export function resolveTree(targetMetal, amount, bankData, mR) {
    let deficits = {};
    let intermediates = {};
    let steps = [];
    const t = i18n[state.currentLang] || i18n['en'];
    const bankCopy = { ...bankData };

    const vAlloy = t.verbAlloy || "Alloy";
    const vSmelt = t.verbSmelt || "Smelt";
    const vAnd = t.stepAnd || "and";
    const vWith = t.stepWith || "with";
    const vInMachine = t.inMachine || "in the";

    function decompose(item, qty) {
        if (!qty || qty <= 0) return;
        let available = bankCopy[item] || 0;
        let missing = qty;

        if (available > 0) {
            let used = Math.min(available, missing);
            bankCopy[item] -= used;
            missing -= used;
        }

        if (missing <= 0) return;

        let recipe = RECIPES[item];
        if (!recipe) {
            deficits[item] = (deficits[item] || 0) + missing;
            return;
        }

        intermediates[item] = (intermediates[item] || 0) + missing;

        let availableRoutes = Object.keys(recipe);
        let stepKey = `recipe_${item}`;
        let rKey = state.userPathChoices[stepKey] || availableRoutes[0];
        if (!recipe[rKey]) rKey = availableRoutes[0];

        let routeStats = [];
        if (availableRoutes.length > 1) {
            routeStats = availableRoutes.map(rName => ({
                name: rName,
                isBestYield: false,
                isMaxYield: false,
                isRegionLocked: false
            }));
        }

        let recObj = recipe[rKey];

        if (recObj.type === 'alloy') {
            const primaryNeeded = Math.ceil(missing / (0.7 * mR));
            const cat1Needed = Math.ceil(primaryNeeded * 0.5);
            const cat2Needed = Math.ceil(primaryNeeded * 0.5);

            let itemNamePrimary = getItemName(recObj.primary, t);
            let itemNameCat1 = getItemName(recObj.cat1, t);
            let itemNameCat2 = getItemName(recObj.cat2, t);

            let htmlStr = `<strong>${vAlloy} <span class="highlight">${primaryNeeded.toLocaleString()} ${itemNamePrimary}</span>, <span class="highlight">${cat1Needed.toLocaleString()} ${itemNameCat1}</span> ${vAnd} <span class="highlight">${cat2Needed.toLocaleString()} ${itemNameCat2}</span></strong>`;

            steps.unshift({
                htmlAction: htmlStr,
                mainYields: [{ item: item, amount: missing }],
                byproducts: [],
                stepKey: stepKey,
                routeStats: routeStats,
                selectedRoute: rKey
            });

            decompose(recObj.primary, primaryNeeded);
            decompose(recObj.cat1, cat1Needed);
            decompose(recObj.cat2, cat2Needed);
        } else if (recObj.type === 'smelt') {
            const oreNeeded = Math.ceil(missing / (recObj.oreYield * mR));
            const catNeeded = Math.ceil(oreNeeded * recObj.catReq);

            let itemNameOre = getItemName(recObj.ore, t);
            let itemNameCat = getItemName(recObj.cat, t);

            let htmlStr = `<strong>${vSmelt} <span class="highlight">${oreNeeded.toLocaleString()} ${itemNameOre}</span> ${vInMachine} Furnace ${vWith} <span class="highlight">${catNeeded.toLocaleString()} ${itemNameCat}</span></strong>`;

            steps.unshift({
                htmlAction: htmlStr,
                mainYields: [{ item: item, amount: missing }],
                byproducts: [],
                stepKey: stepKey,
                routeStats: routeStats,
                selectedRoute: rKey
            });

            decompose(recObj.ore, oreNeeded);
            decompose(recObj.cat, catNeeded);
        }
    }

    decompose(targetMetal, amount);
    return { deficits, intermediates, steps };
}

export function resolveExtractions(deficits, mE, mM, bankData) {
    let raw = { ...deficits };
    let extracted = {};
    let bp = {};
    let extSteps = [];

    let localExtractMap = { ...EXTRACT_MAP };

    const sequence = [
        'skadite', 'electrum', 'gemmetal', 'sanguinite', 'almine', 'acronite', 'lupium',
        'pi', 'cuprum', 'coke', 'pitch', 'ichor',
        'bo', 'pyroxene', 'galbinum', 'redbleckblende', 'maalite', 'pyropite', 'aabam', 'calamine', 'silver', 'chalkglance', 'waterstone',
        'bleck', 'bleckblende', 'jadeite', 'malachite', 'sp', 'granumpowder', 'amarantum', 'flakestone', 'calspar', 'coal', 'cp', 'cinnabar', 'magmum', 'volcanicash', 'pyrite', 'gaborepowder', 'lodestonepowder', 'ritualash'
    ];

    let processing = true;
    let loopCount = 0;

    while (processing && loopCount < 50) {
        processing = false;
        loopCount++;

        for (let i = 0; i < sequence.length; i++) {
            let item = sequence[i];
            if (raw[item] > 0 && localExtractMap[item]) {
                let source = localExtractMap[item];
                let itemsFromSource = Object.keys(raw).filter(k => raw[k] > 0 && localExtractMap[k] === source);
                if (itemsFromSource.length === 0) continue;

                let stepKey = `${source}_${itemsFromSource.slice().sort().join('_')}`;
                let availableRoutes = Object.keys(EXTRACTION_ROUTES[source]);

                let routeStats = availableRoutes.map(rName => {
                    let r = EXTRACTION_ROUTES[source][rName];
                    let req = 0;
                    itemsFromSource.forEach(k => {
                        let y = r.yields[k] || 0;
                        if (y > 0) {
                            let modifier = mE;
                            if (k === 'bo' && r.action !== 'stepFurnace' && r.action !== 'stepBlastFurnace') modifier = mE * mM;
                            let rReq = Math.ceil(raw[k] / (y * modifier));
                            if (rReq > req) req = rReq;
                        }
                    });

                    let catCost = r.cat ? Math.ceil(req * r.catReq) : 0;
                    let totalCost = req + catCost;

                    let totalByproducts = 0;
                    Object.keys(r.yields).forEach(yItem => {
                        if (!itemsFromSource.includes(yItem)) {
                            let modifier = mE;
                            if (yItem === 'bo' && r.action !== 'stepFurnace' && r.action !== 'stepBlastFurnace') modifier = mE * mM;
                            totalByproducts += Math.ceil(req * r.yields[yItem] * modifier);
                        }
                    });

                    let isRegionLocked = rName.includes('Blast Furnace') || rName.includes('Fabricula') || rName.includes('Greater Natorus') || rName.includes('Natorus') || rName.includes('Grizzly') || rName.includes('Hearth');

                    return { name: rName, req: req, catCost: catCost, totalCost: totalCost, totalByproducts: totalByproducts, isRegionLocked: isRegionLocked };
                });

                let validReqs = routeStats.filter(s => s.req > 0);
                if (validReqs.length > 0) {
                    let minTotal = Math.min(...validReqs.map(s => s.totalCost));
                    let maxBp = Math.max(...validReqs.map(s => s.totalByproducts));

                    validReqs.forEach(s => {
                        s.isBestYield = (s.totalCost === minTotal);
                        s.isMaxYield = (s.totalByproducts === maxBp && maxBp > 0);
                    });
                }

                let routeName = state.userPathChoices[stepKey];

                if (!routeName || !validReqs.find(s => s.name === routeName)) {
                    routeName = validReqs.length > 0 ? validReqs[0].name : availableRoutes[0];
                }

                if (state.globalRoutePref === 'efficient') {
                    let best = validReqs.find(s => s.isBestYield);
                    if (best) routeName = best.name;
                } else if (state.globalRoutePref === 'yield') {
                    let max = validReqs.find(s => s.isMaxYield);
                    if (max) routeName = max.name;
                }

                state.userPathChoices[stepKey] = routeName;
                let route = EXTRACTION_ROUTES[source][routeName];

                let maxSourceReq = routeStats.find(s => s.name === routeName)?.req || 0;

                if (maxSourceReq > 0) {
                    raw[source] = (raw[source] || 0) + maxSourceReq;

                    let catQty = 0;
                    if (route.cat) {
                        catQty = Math.ceil(maxSourceReq * route.catReq);
                        raw[route.cat] = (raw[route.cat] || 0) + catQty;
                    }

                    let mainYieldsList = [];
                    let bpYieldsList = [];

                    Object.keys(route.yields).forEach(yItem => {
                        let modifier = mE;
                        if (yItem === 'bo' && route.action !== 'stepFurnace' && route.action !== 'stepBlastFurnace') modifier = mE * mM;

                        let produced = Math.ceil(maxSourceReq * route.yields[yItem] * modifier);

                        if (itemsFromSource.includes(yItem)) {
                            mainYieldsList.push({ item: yItem, amount: produced });
                        } else {
                            bpYieldsList.push({ item: yItem, amount: produced });
                        }

                        if (raw[yItem]) {
                            extracted[yItem] = (extracted[yItem] || 0) + Math.min(raw[yItem], produced);

                            if (produced > raw[yItem]) {
                                bp[yItem] = (bp[yItem] || 0) + (produced - raw[yItem]);
                                delete raw[yItem];
                            } else {
                                raw[yItem] -= produced;
                                if (raw[yItem] === 0) delete raw[yItem];
                            }
                        } else {
                            bp[yItem] = (bp[yItem] || 0) + produced;
                        }
                    });

                    const t = i18n[state.currentLang] || i18n['en'];
                    let verbKey = 'verbProcess';
                    if (route.action === 'stepCrush') verbKey = 'verbCrush';
                    else if (route.action === 'stepGrind') verbKey = 'verbGrind';
                    else if (route.action === 'stepExtract') verbKey = 'verbExtract';
                    else if (route.action === 'stepFurnace' || route.action === 'stepBlastFurnace') verbKey = 'verbSmelt';
                    else if (route.action === 'stepBake') verbKey = 'verbBake';

                    let verb = t[verbKey] || "Process";
                    let vInMachine = t.inMachine || "in the";
                    let vWith = t.stepWith || "with";

                    let machine = routeName.split(' (')[0];
                    let itemNameSource = getItemName(source, t);

                    let htmlAction = `<strong>${verb} <span class="highlight">${maxSourceReq.toLocaleString()} ${itemNameSource}</span> ${vInMachine} ${machine}`;
                    if (catQty > 0 && route.cat) {
                        let itemNameCat = getItemName(route.cat, t);
                        htmlAction += ` ${vWith} <span class="highlight">${catQty.toLocaleString()} ${itemNameCat}</span>`;
                    }
                    htmlAction += `</strong>`;

                    extSteps.unshift({
                        htmlAction: htmlAction,
                        mainYields: mainYieldsList,
                        byproducts: bpYieldsList,
                        stepKey: stepKey,
                        routeStats: validReqs,
                        selectedRoute: routeName
                    });

                    processing = true;
                    break;
                } else {
                    itemsFromSource.forEach(k => {
                        if (!route.yields[k]) localExtractMap[k] = null;
                    });
                    processing = true;
                    break;
                }
            }
        }
    }

    let grossRaw = { ...raw };
    Object.keys(raw).forEach(k => { raw[k] = Math.max(0, raw[k] - (bankData[k] || 0)); });

    return { raw, grossRaw, bp, extSteps, extracted };
}

// ============================================================================
// RECIPE LOOKUP — supports any item, not just target metals
// ============================================================================

let _reverseIndex = null;
function buildReverseIndex() {
    if (_reverseIndex) return _reverseIndex;
    _reverseIndex = {};
    for (const [source, routes] of Object.entries(EXTRACTION_ROUTES)) {
        for (const [routeName, route] of Object.entries(routes)) {
            for (const [item, yieldRate] of Object.entries(route.yields)) {
                if (!_reverseIndex[item]) _reverseIndex[item] = [];
                _reverseIndex[item].push({
                    source,
                    routeName,
                    action: route.action,
                    cat: route.cat || null,
                    catReq: route.catReq || 0,
                    yieldRate
                });
            }
        }
    }
    return _reverseIndex;
}

/**
 * Returns an array of route result objects for any craftable item at a given quantity.
 * Covers refined metals (alloy/smelt via RECIPES) and all extracted/intermediate items
 * (via reverse-indexed EXTRACTION_ROUTES). Returns [] for raw materials.
 */
export function lookupRecipe(itemKey, qty) {
    const results = [];

    // 1. Refined metals — alloy or smelt recipes
    if (RECIPES[itemKey]) {
        for (const [recipeName, recObj] of Object.entries(RECIPES[itemKey])) {
            if (recObj.type === 'alloy') {
                const primaryNeeded = Math.ceil(qty / 0.7);
                const cat1Needed = Math.ceil(primaryNeeded * 0.5);
                const cat2Needed = Math.ceil(primaryNeeded * 0.5);
                results.push({ type: 'alloy', routeName: recipeName, primary: recObj.primary, primaryNeeded, cat1: recObj.cat1, cat1Needed, cat2: recObj.cat2, cat2Needed });
            } else if (recObj.type === 'smelt') {
                const oreNeeded = Math.ceil(qty / recObj.oreYield);
                const catNeeded = Math.ceil(oreNeeded * recObj.catReq);
                results.push({ type: 'smelt', routeName: recipeName, ore: recObj.ore, oreNeeded, cat: recObj.cat, catNeeded });
            }
        }
    }

    // 2. Extracted / intermediate items — reverse lookup through EXTRACTION_ROUTES
    const reverseIndex = buildReverseIndex();
    if (reverseIndex[itemKey]) {
        for (const route of reverseIndex[itemKey]) {
            const sourceNeeded = Math.ceil(qty / route.yieldRate);
            const catNeeded = route.cat ? Math.ceil(sourceNeeded * route.catReq) : 0;
            const byproducts = [];
            const routeData = EXTRACTION_ROUTES[route.source]?.[route.routeName];
            if (routeData) {
                for (const [yItem, yRate] of Object.entries(routeData.yields)) {
                    if (yItem !== itemKey) {
                        const amount = Math.floor(sourceNeeded * yRate);
                        if (amount > 0) byproducts.push({ item: yItem, amount });
                    }
                }
            }
            results.push({ type: 'extraction', source: route.source, routeName: route.routeName, action: route.action, cat: route.cat, catNeeded, sourceNeeded, byproducts });
        }
    }

    return results;
}