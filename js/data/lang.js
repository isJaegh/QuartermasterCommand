import { state, saveState } from '../state/store.js';
export { baseItems, baseCategories } from './langBase.js';

import en from './lang/en.js';
import fr from './lang/fr.js';
import de from './lang/de.js';
import es from './lang/es.js';
import it from './lang/it.js';
import ar from './lang/ar.js';
import ro from './lang/ro.js';
import pl from './lang/pl.js';
import pt from './lang/pt.js';
import ru from './lang/ru.js';
import fi from './lang/fi.js';
import uk from './lang/uk.js';
import hu from './lang/hu.js';
import tr from './lang/tr.js';
import sv from './lang/sv.js';
import cs from './lang/cs.js';

export const i18n = { en, fr, de, es, it, ar, ro, pl, pt, ru, fi, uk, hu, tr, sv, cs };

export function setLang(lang) {
    state.currentLang = lang;
    const t = i18n[lang] || i18n['en'];

    // 1. Automatically update standard UI text elements
    Object.keys(t).forEach(key => {
        const el = document.getElementById('ui_' + key);
        if (el && typeof t[key] === 'string') el.innerText = t[key];
    });

    // 2. Manually update placeholders for the search inputs
    if (t.searchPlaceholder) {
        const targetSearch = document.getElementById('targetMetalSearch');
        const bankSearch = document.getElementById('searchBank');
        const cartSearch = document.getElementById('searchCart');

        if (targetSearch) targetSearch.placeholder = t.searchPlaceholder;
        if (bankSearch) bankSearch.placeholder = t.searchPlaceholder;
        if (cartSearch) cartSearch.placeholder = t.searchPlaceholder;
    }

    // 3. Update language dropdown selector
    const langEl = document.getElementById('lang');
    if (langEl) langEl.value = lang;

    saveState();
}