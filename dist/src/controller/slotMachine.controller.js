"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinSlotMachine = void 0;
const userCoinsModule = __importStar(require("../../data/userCoins"));
const reels = [
    ['🍒', '🍋', '🍎', '🍋', '🍌', '🍌', '🍋', '🍋'],
    ['🍋', '🍎', '🍋', '🍋', '🍒', '🍎', '🍌', '🍋'],
    ['🍋', '🍎', '🍋', '🍎', '🍒', '🍋', '🍌', '🍋'],
];
const spinReel = async (reelIndex) => {
    let currentIndex = 0;
    // Define a function to spin one reel
    const spin = (offset = 0) => {
        return new Promise((resolve) => {
            const delta = (offset + 2) * reels[reelIndex].length +
                Math.round(Math.random() * reels[reelIndex].length);
            setTimeout(() => {
                // Update the current index for the next spin
                currentIndex = (currentIndex + delta) % reels[reelIndex].length;
                resolve(currentIndex);
            }, offset * 150);
        });
    };
    // Spin the reel for a certain duration
    const spinDuration = 3 + Math.random() * 2;
    for (let i = 0; i < spinDuration; i++) {
        await spin(i);
    }
    return currentIndex;
};
// Helper function to calculate coins won based on spin result
const calculateCoinsWon = (spinResult) => {
    const joinedResult = spinResult.join(',');
    const winConditions = {
        '🍒,🍒,🍒': 50,
        '🍒,🍒': 40,
        '🍎,🍎,🍎': 20,
        '🍎,🍎': 10,
        '🍌,🍌,🍌': 15,
        '🍌,🍌': 5,
        '🍋,🍋,🍋': 3,
    };
    // Check for win conditions
    const conditions = Object.keys(winConditions);
    for (const condition of conditions) {
        if (joinedResult.startsWith(condition)) {
            return winConditions[condition];
        }
    }
    return 0;
};
const spinSlotMachine = async (req, res, next) => {
    let currentCoins = userCoinsModule.getUserCoins();
    try {
        // Check if the user has enough coins to play
        if (currentCoins <= 0) {
            res.json({ message: 'Game over. Insufficient coins to play.' });
            return;
        }
        // Deduct one coin for playing
        userCoinsModule.setUserCoins(currentCoins - 1); // Update user coins after deduction
        currentCoins -= 1; // Update current coins locally
        const results = await Promise.all([spinReel(0), spinReel(1), spinReel(2)]);
        const spinResult = results.map((index, i) => reels[i][index]);
        const coinsWon = calculateCoinsWon(spinResult);
        const updatedCoins = currentCoins + coinsWon; // Update coins after winning
        // Update user coins after winning
        userCoinsModule.setUserCoins(updatedCoins);
        res.json({
            reelStates: results.map((index, i) => ({
                reelIndex: i,
                currentIndex: index,
                symbols: reels[i],
            })),
            spinResult,
            coinsWon,
            updatedCoins,
            currentCoins,
        });
        // Optionally, check if the user has run out of coins after the spin and display a message.
        if (updatedCoins <= 0 || currentCoins <= 0) {
            // Check if the user is requesting a restart
            const isRestartRequested = req.query.restart === 'true';
            if (isRestartRequested) {
                // Give the user 20 coins to start again
                currentCoins = 20;
                userCoinsModule.setUserCoins(currentCoins);
                // Clear the restart query parameter to avoid unnecessary restarts
                res.redirect('/api/slot-machine/spin');
                return;
            }
        }
    }
    catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
exports.spinSlotMachine = spinSlotMachine;
//# sourceMappingURL=slotMachine.controller.js.map