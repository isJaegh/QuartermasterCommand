import { state, saveState } from '../state/store.js';
import { i18n } from '../data/lang.js';
import { showConfirm } from '../utils/confirm.js';
import { updateLogisticsOnly } from './app.js'; // Imported logistics updater

const triggerRecalc = () => document.dispatchEvent(new CustomEvent('pipeline:changed'));

export function clearPipelineProgress() {
    if (state.completedSteps.length === 0) return;

    const isStacks = document.getElementById('mode').value === 'stacks';

    state.completedSteps.forEach(index => {
        const stepObj = state.pipelineStepsRaw[index];
        if (!stepObj) return;

        let allYields = [];
        if (stepObj.mainYields) allYields.push(...stepObj.mainYields);
        if (stepObj.byproducts) allYields.push(...stepObj.byproducts);

        allYields.forEach(y => {
            const bankInput = document.getElementById('b_' + y.item);
            if (bankInput) {
                let current = Number(bankInput.value) || 0;
                let sub = isStacks ? y.amount / 10000 : y.amount;
                bankInput.value = Math.max(0, current - sub).toFixed(isStacks ? 4 : 0);
            }
        });
    });

    state.completedSteps = [];
    state.focusIndex = 0;
}

export function handlePipelineChange() {
    clearPipelineProgress();
    saveState();
    triggerRecalc(); // Recalculate everything
}

export function updatePrefVisuals() {
    const chkEff = document.getElementById('chkEff');
    const chkYld = document.getElementById('chkYld');
    const rowEff = document.getElementById('row_chkEff');
    const rowYld = document.getElementById('row_chkYld');

    if (chkEff && chkYld) {
        if (chkEff.checked) {
            chkYld.disabled = true;
            if (rowYld) { rowYld.style.opacity = '0.4'; rowYld.style.pointerEvents = 'none'; }
            if (rowEff) { rowEff.style.opacity = '1'; rowEff.style.pointerEvents = 'auto'; }
        } else if (chkYld.checked) {
            chkEff.disabled = true;
            if (rowEff) { rowEff.style.opacity = '0.4'; rowEff.style.pointerEvents = 'none'; }
            if (rowYld) { rowYld.style.opacity = '1'; rowYld.style.pointerEvents = 'auto'; }
        } else {
            chkEff.disabled = false;
            chkYld.disabled = false;
            if (rowEff) { rowEff.style.opacity = '1'; rowEff.style.pointerEvents = 'auto'; }
            if (rowYld) { rowYld.style.opacity = '1'; rowYld.style.pointerEvents = 'auto'; }
        }
    }
}

export function toggleGlobalPref(prefType, isChecked) {
    clearPipelineProgress();
    if (isChecked) {
        state.globalRoutePref = prefType;
        if (prefType === 'efficient') {
            const chkYld = document.getElementById('chkYld');
            if (chkYld) chkYld.checked = false;
        } else if (prefType === 'yield') {
            const chkEff = document.getElementById('chkEff');
            if (chkEff) chkEff.checked = false;
        }
    } else {
        if (state.globalRoutePref === prefType) {
            state.globalRoutePref = null;
        }
    }

    updatePrefVisuals();
    saveState();
    triggerRecalc();
}

export function updatePathChoice(e, stepKey, selectedRoute) {
    if (e) e.stopPropagation();

    clearPipelineProgress();
    if (state.globalRoutePref !== null) {
        state.globalRoutePref = null;
        const chkEff = document.getElementById('chkEff');
        const chkYld = document.getElementById('chkYld');
        if (chkEff) chkEff.checked = false;
        if (chkYld) chkYld.checked = false;
        updatePrefVisuals();
    }

    state.userPathChoices[stepKey] = selectedRoute;
    saveState();
    triggerRecalc();
}

export function setPipelineView(mode) {
    state.pipelineViewMode = mode;
    document.getElementById('btnOverview').classList.toggle('active', mode === 'overview');
    document.getElementById('btnFocus').classList.toggle('active', mode === 'focus');

    const container = document.getElementById('stepsOutput');
    const nav = document.getElementById('focusNav');

    if (mode === 'focus') {
        container.classList.add('focus-mode');
        if (nav) nav.style.display = 'flex';
        state.focusIndex = 0;
        for (let i = 0; i < state.pipelineStepsRaw.length; i++) {
            if (!state.completedSteps.includes(i)) { state.focusIndex = i; break; }
        }
        updateFocusView();
    } else {
        container.classList.remove('focus-mode');
        if (nav) nav.style.display = 'none';
        document.querySelectorAll('#stepsOutput .step-card').forEach(c => c.classList.remove('active-focus'));
    }
}

export function navFocus(dir) {
    state.focusIndex += dir;
    if (state.focusIndex < 0) state.focusIndex = 0;
    if (state.focusIndex >= state.pipelineStepsRaw.length) state.focusIndex = state.pipelineStepsRaw.length - 1;
    updateFocusView();
}

export function updateFocusView() {
    if (state.pipelineViewMode !== 'focus') return;
    const t = i18n[state.currentLang] || i18n['en'];
    const cards = document.querySelectorAll('#stepsOutput .step-card');
    cards.forEach((card, index) => {
        if (index === state.focusIndex) card.classList.add('active-focus');
        else card.classList.remove('active-focus');
    });
    const navText = document.getElementById('focusProgressText');
    if (navText && state.pipelineStepsRaw.length > 0) {
        navText.innerText = `${t.stepPrefix || 'Step'} ${state.focusIndex + 1} / ${state.pipelineStepsRaw.length}`;
    }
}

export function updatePipelineVisuals() {
    document.querySelectorAll('#stepsOutput .step-card').forEach((card, index) => {
        if (state.completedSteps.includes(index)) {
            card.classList.add('completed');
            const iconSpan = card.querySelector('span[style*="cursor:pointer"]');
            if (iconSpan) iconSpan.innerText = '✅';
        } else {
            card.classList.remove('completed');
            const iconSpan = card.querySelector('span[style*="cursor:pointer"]');
            if (iconSpan) iconSpan.innerText = '⬜';
        }
    });

    let percent = state.pipelineStepsRaw.length === 0 ? 100 : Math.round((state.completedSteps.length / state.pipelineStepsRaw.length) * 100);
    if (percent > 100) percent = 100;

    const progBar = document.getElementById('projectProgressBar');
    const progText = document.getElementById('projectProgressText');

    let colorStr = percent === 100 ? 'var(--success)' : 'var(--accent)';

    if (progBar) {
        progBar.style.width = percent + '%';
        progBar.style.backgroundColor = colorStr;
    }
    if (progText) {
        progText.innerText = `${percent}%`;
        progText.style.color = colorStr;
        progText.style.fontWeight = 'bold';
        progText.style.fontSize = '12px';
    }

    if (percent === 100 && state.pipelineStepsRaw.length > 0) {
        if (progBar) progBar.classList.add('complete-pulse');
    } else {
        if (progBar) progBar.classList.remove('complete-pulse');
    }
}

export function toggleStep(index) {
    const idx = state.completedSteps.indexOf(index);
    const stepObj = state.pipelineStepsRaw[index];
    const isStacks = document.getElementById('mode').value === 'stacks';

    if (idx > -1) {
        state.completedSteps.splice(idx, 1);

        let allYields = [];
        if (stepObj.mainYields) allYields.push(...stepObj.mainYields);
        if (stepObj.byproducts) allYields.push(...stepObj.byproducts);

        allYields.forEach(y => {
            const bankInput = document.getElementById('b_' + y.item);
            if (bankInput) {
                let current = Number(bankInput.value) || 0;
                let sub = isStacks ? y.amount / 10000 : y.amount;
                bankInput.value = Math.max(0, current - sub).toFixed(isStacks ? 4 : 0);
            }
        });

    } else {
        state.completedSteps.push(index);

        let allYields = [];
        if (stepObj.mainYields) allYields.push(...stepObj.mainYields);
        if (stepObj.byproducts) allYields.push(...stepObj.byproducts);

        allYields.forEach(y => {
            const bankInput = document.getElementById('b_' + y.item);
            if (bankInput) {
                let current = Number(bankInput.value) || 0;
                let add = isStacks ? y.amount / 10000 : y.amount;
                bankInput.value = (current + add).toFixed(isStacks ? 4 : 0);
            }
        });
        if (state.pipelineViewMode === 'focus') navFocus(1);
    }

    updatePipelineVisuals();
    saveState();
    updateLogisticsOnly(); // Instantly update missing components
}

export function restartPipeline() {
    const t = i18n[state.currentLang] || i18n['en'];
    showConfirm(t.restartPrompt || "Restart the pipeline? This will un-check all steps and remove their yields from your inventory.", () => {
        clearPipelineProgress();
        updatePipelineVisuals();
        if (state.pipelineViewMode === 'focus') updateFocusView();
        saveState();
        updateLogisticsOnly(); // Instantly revert missing components
    });
}