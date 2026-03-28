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

function applyColors(fromLoad = false) {
    const isLight = document.body.classList.contains('light-theme');
    const themeKey = isLight ? 'light' : 'dark';
    const defs = defaultColors[themeKey];

    let cAccent = document.getElementById('colorAccent')?.value || defs.accent;
    let cBg = document.getElementById('colorBg')?.value || defs.bg;
    let cText = document.getElementById('colorText')?.value || defs.text;

    document.documentElement.style.setProperty('--accent', cAccent);
    document.documentElement.style.setProperty('--bg-card', cBg);
    document.documentElement.style.setProperty('--text', cText);

    const btnReset = document.getElementById('ui_btnResetColors');
    if (btnReset) {
        const isCustom = (cAccent.toLowerCase() !== defs.accent.toLowerCase() ||
            cBg.toLowerCase() !== defs.bg.toLowerCase() ||
            cText.toLowerCase() !== defs.text.toLowerCase());
        btnReset.disabled = !isCustom;
    }

    if (!fromLoad) save();
}

function resetColors() {
    const isLight = document.body.classList.contains('light-theme');
    const themeKey = isLight ? 'light' : 'dark';
    const defs = defaultColors[themeKey];

    if (document.getElementById('colorAccent')) document.getElementById('colorAccent').value = defs.accent;
    if (document.getElementById('colorBg')) document.getElementById('colorBg').value = defs.bg;
    if (document.getElementById('colorText')) document.getElementById('colorText').value = defs.text;

    applyColors();
}

function syncColorPickers() {
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

    // HTML input[type=color] expects exactly a 7 char hex (e.g. #FFFFFF)
    if (document.getElementById('colorAccent')) document.getElementById('colorAccent').value = cAccent;
    if (document.getElementById('colorBg')) document.getElementById('colorBg').value = cBg;
    if (document.getElementById('colorText')) document.getElementById('colorText').value = cText;

    applyColors(true);
}