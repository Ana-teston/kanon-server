import { Request, Response } from 'express';
import { getUserCoins, setUserCoins } from '../../data/userCoins';

const reels = [
    ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"],
    ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"],
    ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]
];

export const spinSlotMachine = (req: Request, res: Response) => {
    // slot machine spin logic
    const spinResult = spinReels();
    const coinsWon = calculateCoinsWon(spinResult);
    const currentCoins = getUserCoins();

    // Update user coins
    setUserCoins(currentCoins - 1 + coinsWon);

    res.json({ spinResult, coinsWon, currentCoins });
};

// Helper function to simulate spinning the slot machine reels
const spinReels = () => {
    const result = [];
    for (let i = 0; i < reels.length; i++) {
        const randomIndex = Math.floor(Math.random() * reels[i].length);
        result.push(reels[i][randomIndex]);
    }
    return result;
};

// Helper function to calculate coins won based on spin result
const calculateCoinsWon = (spinResult: string[]) => {
    // For simplicity, let's say the user wins if all symbols in a reel are the same
    if (spinResult.every((symbol, index) => spinResult[0] === symbol)) {
        return 10; // Win 10 coins
    } else {
        return 0; // No win
    }
};