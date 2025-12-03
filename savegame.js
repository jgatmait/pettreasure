// =============================
// Global game state (client-side)
// =============================

// Coins and happiness are fully client-controlled
// (no server, no signature, no encryption)
let coins = parseInt(localStorage.getItem("coins") || "50");
let happiness = parseInt(localStorage.getItem("happy") || "50");

function revealFlag(flagId, text) {
    const box = document.getElementById(flagId);
    if (box) box.innerText = text;
}

function updateUI() {
    const coinsSpan = document.getElementById("coins");
    if (coinsSpan) coinsSpan.innerText = coins;

    const happySpan = document.getElementById("happy");
    if (happySpan) happySpan.innerText = happiness;
}

// Initialize on load
updateUI();




// =============================
// Pet actions
// =============================
function earnCoins() {
    coins++;
    localStorage.setItem("coins", coins);
    updateUI();
}

function petHappy() {
    happiness++;
    localStorage.setItem("happy", happiness);
    updateUI();
}

// =============================
// Shop logic
// =============================
function buyItem(price) {
    if (coins >= price) {
        coins -= price;
        localStorage.setItem("coins", coins);
        updateUI();
        alert("You bought something!");
    } else {
        alert("Not enough coins!");
    }
}

// =============================
// Save / Load – OWASP A02 Demo
// =============================

function toHex(str) {
    return Array.from(str).map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join('');
}

function downloadSave() {
    const saveObj = { coins, happiness };
    const json = JSON.stringify(saveObj);
    const hex = toHex(json);

    const a = document.createElement("a");
    a.href = "data:text/plain," + hex;
    a.download = "savegame.txt";
    a.click();
}


// =============================
// RESET GAME
// =============================
function resetSave() {
    if (!confirm("Are you sure you want to reset your pet? All progress will be lost.")) {
        return;
    }

    // Default values
    coins = 50;
    happiness = 50;

    // Clear storage
    localStorage.removeItem("coins");
    localStorage.removeItem("happy");

    updateUI();
    alert("Game has been reset!");
}


function loadSave() {
    const input = prompt("Paste your save file:");

    try {
        // No encoding/decoding, just direct JSON parsing
        const obj = JSON.parse(input);

        coins = obj.coins;
        happiness = obj.happiness;

        localStorage.setItem("coins", coins);
        localStorage.setItem("happy", happiness);

        updateUI();
        alert("Save loaded!");
    } catch (e) {
        alert("Invalid save file!");
    }
}





