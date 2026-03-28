import { defaultPrices } from '../data/data.js';

/**
 * Returns the unit multiplier for the current display mode.
 * 'stacks' → 10000, 'units' → 1
 */
export function getMultiplier(mode) {
    return mode === 'stacks' ? 10000 : 1;
}

/**
 * Formats a raw unit count for display in the current mode.
 * @param {number} units - Amount in raw units
 * @param {string} mode - 'units' or 'stacks'
 * @param {number} decimals - Decimal places for stacks display (default 2)
 */
export function toDisplay(units, mode, decimals = 2) {
    if (mode === 'stacks') return (units / 10000).toFixed(decimals) + ' Stk';
    return units.toLocaleString();
}

/**
 * Returns the localized display name for an item key.
 * Falls back to capitalizing the key if no translation exists.
 */
export function getItemName(key, t) {
    return (t.items && t.items[key]) ? t.items[key] : (key.charAt(0).toUpperCase() + key.slice(1));
}

/**
 * Returns the default market price for an item.
 * Centralizes the tephra special case and the generic fallback.
 */
export function getDefaultPrice(key) {
    return defaultPrices[key] || (key === 'tephra' ? 40 : 15);
}
