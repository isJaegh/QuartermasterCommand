/**
 * Copies text to the clipboard using the modern Clipboard API.
 */
export async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }
    // Fallback for http/file contexts
    const el = document.createElement('textarea');
    el.value = text;
    el.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    try {
        if (!document.execCommand('copy')) throw new Error('execCommand failed');
    } finally {
        document.body.removeChild(el);
    }
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
    try {
        return JSON.parse(atob(str));
    } catch {
        // Fallback for codes generated with encodeURIComponent encoding
        return JSON.parse(decodeURIComponent(atob(str)));
    }
}
