/**
 * Copies text to the clipboard using the modern Clipboard API.
 */
export async function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}

/**
 * Encodes an object to a base64 share code string.
 */
export function buildShareCode(data) {
    return btoa(JSON.stringify(data));
}

/**
 * Decodes a base64 share code string back to an object.
 * Throws if the string is invalid.
 */
export function parseShareCode(str) {
    return JSON.parse(atob(str));
}
