import { CATEGORIES, getAllItems } from '../data/data.js';
import { i18n } from '../data/lang.js';
import { getRelevantItems } from '../core/engine.js';
import { state } from '../state/store.js';
import { openModal, closeModal } from '../ui/modals.js';
import { getItemName } from '../utils/format.js';
import { buildShareCode, copyToClipboard } from '../utils/clipboard.js';
import { showToast } from '../utils/toast.js';

export function buildDiscordMessage() {
    const t = i18n[state.currentLang] || i18n['en'];
    const mode = document.getElementById('mode').value;
    const targetVal = document.getElementById('targetAmount').value;
    const targetMetal = document.getElementById('targetMetal').value;
    const relevant = getRelevantItems(targetMetal);

    const targetName = getItemName(targetMetal, t);
    let msg = `**${t.discHeader || 'LOGISTICS ORDER'}: ${targetName.toUpperCase()}**\n*Targeting ${targetVal} ${mode === 'stacks' ? 'Stacks' : 'Units'} of ${targetName}*\n\n`;

    let bankString = "";
    getAllItems().forEach(k => {
        let bankRaw = Number(document.getElementById('b_' + k)?.value) || 0;
        if (bankRaw > 0 && relevant.has(k)) {
            let fmtAmt = mode === 'stacks' ? bankRaw.toFixed(2) + " Stacks" : bankRaw.toLocaleString();
            let itemName = getItemName(k, t);
            bankString += `- ${itemName}: ${fmtAmt}\n`;
        }
    });
    if (bankString !== "") msg += `**CURRENT BANK STOCK:**\n\`\`\`\n${bankString}\`\`\`\n`;

    let marketString = ""; let hasMarket = false; let totalGold = 0;
    getAllItems().forEach(k => {
        let totalQty = 0;
        if (state.marketData[k]) {
            state.marketData[k].forEach(tier => {
                totalQty += tier.q;
                totalGold += (tier.q / (mode === 'stacks' ? 1 : 10000)) * tier.p;
            });
        }
        if (totalQty > 0 && relevant.has(k)) {
            let fmtAmt = mode === 'stacks' ? totalQty.toFixed(2) + " Stacks" : totalQty.toLocaleString();
            let itemName = getItemName(k, t);
            marketString += `- ${itemName}: ${fmtAmt}\n`;
            hasMarket = true;
        }
    });

    if (hasMarket) {
        msg += `**${t.discMarket || 'MARKET PURCHASES:'}**\n\`\`\`\n${marketString}\`\`\`\n*Total Estimated Gold Cost: ${totalGold.toFixed(2)} g*\n\n`;
    }

    // UPDATED: Missing components categorized and numbered
    let gatherString = ""; let hasGather = false;
    CATEGORIES.forEach(cat => {
        let catItems = [];
        cat.items.forEach(k => {
            if (state.pureDeficits[k] > 0) {
                let fmtAmt = mode === 'stacks' ? (state.pureDeficits[k] / 10000).toFixed(2) + " Stacks" : state.pureDeficits[k].toLocaleString();
                let itemName = getItemName(k, t);
                catItems.push(`${itemName}: ${fmtAmt}`);
                hasGather = true;
            }
        });

        if (catItems.length > 0) {
            let catName = (t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id.toUpperCase();
            gatherString += `# ${catName}\n`;
            catItems.forEach((itemStr, idx) => {
                gatherString += `${idx + 1}. ${itemStr}\n`;
            });
            gatherString += `\n`;
        }
    });

    const reqLabel = "MISSING COMPONENTS";
    if (hasGather) msg += `**${reqLabel}**\n\`\`\`md\n${gatherString.trim()}\`\`\`\n\n`;
    else msg += `**${reqLabel}**\n\`\`\`yaml\n${t.discStock || 'All gathering covered.'}\`\`\`\n\n`;

    if (state.pipelineStepsRaw.length > 0) {
        msg += `**MANUFACTURING PIPELINE**\n\`\`\`md\n`;
        state.pipelineStepsRaw.forEach((stepObj, index) => {
            let checkmark = state.completedSteps.includes(index) ? '[x] ' : '[ ] ';
            let textAction = stepObj.htmlAction.replace(/<[^>]*>?/gm, '');
            msg += `${index + 1}. ${checkmark}${textAction}\n`;
        });
        msg += `\`\`\`\n`;
    }

    // UPDATED: Numbered Byproducts
    let hasByproducts = false;
    const bpLabel = t.byproductsTitle || "TOTAL RECOVERED BYPRODUCTS";
    let bpString = `**${bpLabel}**\n\`\`\`md\n`;
    let bpCount = 1;

    Object.keys(state.byproductsRaw).forEach(k => {
        if (state.byproductsRaw[k] > 0) {
            let fmtAmt = mode === 'stacks' ? (state.byproductsRaw[k] / 10000).toFixed(2) + " Stacks" : state.byproductsRaw[k].toLocaleString();
            let itemName = getItemName(k, t);
            bpString += `${bpCount}. ${itemName}: ${fmtAmt}\n`;
            bpCount++;
            hasByproducts = true;
        }
    });

    if (hasByproducts) msg += bpString + `\`\`\`\n`;

    // Inject the generated Share Code into the Discord Message
    // Build the share code data directly from the state and DOM
    const shareCode = buildShareCode({
        market: state.marketData,
        target: document.getElementById('targetAmount')?.value || 10000,
        metal: document.getElementById('targetMetal')?.value || 'bleck'
    });
    msg += `**LOAD ORDER DATA CODE:**\n\`${shareCode}\`\n`;

    return msg;
}

export function copyDiscord() {
    const t = i18n[state.currentLang] || i18n['en'];
    copyToClipboard(buildDiscordMessage())
        .then(() => { showToast(t.discCopied || "Copied to clipboard!", 'success'); closeModal('settingsModal'); })
        .catch(() => { showToast(t.discCopied || "Copied to clipboard!", 'success'); closeModal('settingsModal'); });
}

export async function sendToDiscord() {
    const webhookUrl = document.getElementById('webhookUrl')?.value;
    if (!webhookUrl || !webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
        showToast("Enter a valid Discord Webhook URL in settings.", 'error');
        return;
    }

    const msg = buildDiscordMessage();

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Required header
            body: JSON.stringify({ content: msg.length > 2000 ? msg.substring(0, 1996) + "..." : msg }) // Payload must be JSON stringified
        });

        if (response.ok) {
            showToast("Order sent to Discord!", 'success');
            closeModal('settingsModal');
        } else {
            const data = await response.json();
            showToast(`Discord Error: ${data.message}`, 'error');
        }
    } catch (err) {
        showToast("Network failure. Check your console.", 'error');
        console.error("Discord Webhook Error:", err);
    }
}