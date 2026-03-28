/**
 * Shows a styled in-app confirmation dialog instead of the browser's native confirm().
 * @param {string} message
 * @param {function} onConfirm - called if user clicks Confirm
 */
export function showConfirm(message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
        <div class="confirm-box">
            <p class="confirm-msg">${message}</p>
            <div class="confirm-btns">
                <button class="btn-dispatch confirm-yes">Confirm</button>
                <button class="btn-dispatch btn-danger confirm-no">Cancel</button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));

    const close = () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 200);
    };

    overlay.querySelector('.confirm-yes').addEventListener('click', () => { close(); onConfirm(); });
    overlay.querySelector('.confirm-no').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
}
