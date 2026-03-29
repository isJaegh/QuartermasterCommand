const defaultColors = {
    dark: { accent: '#d4af37', bg: '#1c1c21', text: '#e0e0e0' },
    light: { accent: '#8a6312', bg: '#ffffff', text: '#111111' }
};

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    syncThemeSwitch();
    syncColorPickers();
    save();
}

function syncThemeSwitch() {
    const cb = document.getElementById('themeToggleCb');
    if (cb) {
        cb.checked = document.body.classList.contains('light-theme');
    }
}

export function applyColors(fromLoad = false) {
    const isLight = document.body.classList.contains('light-theme');
    const themeKey = isLight ? 'light' : 'dark';

    const cAccent = document.getElementById('colorAccent')?.value;
    const cBg = document.getElementById('colorBg')?.value;
    const cText = document.getElementById('colorText')?.value;

    if (cAccent) document.documentElement.style.setProperty('--accent', cAccent);
    if (cBg) document.documentElement.style.setProperty('--bg-card', cBg);
    if (cText) document.documentElement.style.setProperty('--text', cText);

    const defs = defaultColors[themeKey];
    const isCustom = cAccent !== defs.accent || cBg !== defs.bg || cText !== defs.text;

    const btnReset = document.getElementById('ui_btnResetColors');
    if (btnReset) {
        btnReset.disabled = !isCustom;
    }

    if (!fromLoad) {
        try {
            let data = JSON.parse(localStorage.getItem('qm_data') || '{}');
            if (!data.customColors) data.customColors = {};
            data.customColors[themeKey] = {
                accent: cAccent, bg: cBg, text: cText
            };
            localStorage.setItem('qm_data', JSON.stringify(data));
        } catch (e) { }
        saveState();
    }
}

export function resetColors() {
    const isLight = document.body.classList.contains('light-theme');
    const themeKey = isLight ? 'light' : 'dark';
    const defs = defaultColors[themeKey];

    if (document.getElementById('colorAccent')) document.getElementById('colorAccent').value = defs.accent;
    if (document.getElementById('colorBg')) document.getElementById('colorBg').value = defs.bg;
    if (document.getElementById('colorText')) document.getElementById('colorText').value = defs.text;

    applyColors(false);
}

export function syncColorPickers() {
    const isLight = document.body.classList.contains('light-theme');
    const themeKey = isLight ? 'light' : 'dark';
    const defs = defaultColors[themeKey];

    let cAccent = defs.accent;
    let cBg = defs.bg;
    let cText = defs.text;

    try {
        let data = JSON.parse(localStorage.getItem('qm_data') || '{}');
        if (data.customColors && data.customColors[themeKey]) {
            cAccent = data.customColors[themeKey].accent || defs.accent;
            cBg = data.customColors[themeKey].bg || defs.bg;
            cText = data.customColors[themeKey].text || defs.text;
        }
    } catch (e) { }

    if (document.getElementById('colorAccent')) document.getElementById('colorAccent').value = cAccent;
    if (document.getElementById('colorBg')) document.getElementById('colorBg').value = cBg;
    if (document.getElementById('colorText')) document.getElementById('colorText').value = cText;

    applyColors(true);
}