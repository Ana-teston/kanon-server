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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinSlotMachine = void 0;
const userCoinsModule = __importStar(require("../../data/userCoins"));
const reels = [
    ['🍒', '🍋', '🍎', '🍋', '🍌', '🍌', '🍋', '🍋'],
    ['🍋', '🍎', '🍋', '🍋', '🍒', '🍎', '🍌', '🍋'],
    ['🍋', '🍎', '🍋', '🍎', '🍒', '🍋', '🍌', '🍋'],
];
const spinReel = (reelIndex) => __awaiter(void 0, void 0, void 0, function* () {
    let currentIndex = 0;
    // Define a function to spin one reel
    const spin = (offset = 0) => {
        return new Promise((resolve) => {
            const delta = (offset + 2) * reels[reelIndex].length + Math.round(Math.random() * reels[reelIndex].length);
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
        yield spin(i);
    }
    return currentIndex;
});
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
const spinSlotMachine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let currentCoins = userCoinsModule.getUserCoins();
    try {
        // Check if the user has a session cookie indicating a page refresh
        const isPageRefresh = req.cookies && req.cookies.refreshed;
        // Reset coins if it's a page refresh
        if (isPageRefresh) {
            currentCoins = 20; // Reset coins to the initial value
            userCoinsModule.setUserCoins(currentCoins);
        }
        // Set a cookie to indicate that the page has been refreshed
        res.cookie('refreshed', 'true', { maxAge: 1000 * 60 * 5 }); // Expires in 5 minutes
        // Check if the user has enough coins to play
        if (currentCoins <= 0) {
            res.json({ message: 'Game over. Insufficient coins to play.' });
            return;
        }
        // Deduct one coin for playing
        userCoinsModule.setUserCoins(currentCoins - 1); // Update user coins after deduction
        currentCoins -= 1; // Update current coins locally
        const results = yield Promise.all([spinReel(0), spinReel(1), spinReel(2)]);
        const spinResult = results.map((index, i) => reels[i][index]);
        console.log('Spin Result:', spinResult);
        const coinsWon = calculateCoinsWon(spinResult);
        console.log('Coins Won:', coinsWon);
        const updatedCoins = currentCoins + coinsWon; // Update coins after winning
        console.log('Updated Coins:', updatedCoins);
        // Update user coins after winning
        userCoinsModule.setUserCoins(updatedCoins);
        res.json({ spinResult, coinsWon, updatedCoins });
        // Optionally, check if the user has run out of coins after the spin and display a message.
        if (updatedCoins <= 0) {
            console.log('Game over. You have run out of coins.');
        }
    }
    catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});
exports.spinSlotMachine = spinSlotMachine;
