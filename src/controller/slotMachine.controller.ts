import { Request, Response } from 'express';
import * as userCoinsModule from '../../data/userCoins';

const reels = [
  ['🍒', '🍋', '🍎', '🍋', '🍌', '🍌', '🍋', '🍋'],
  ['🍋', '🍎', '🍋', '🍋', '🍒', '🍎', '🍌', '🍋'],
  ['🍋', '🍎', '🍋', '🍎', '🍒', '🍋', '🍌', '🍋'],
];

const spinReel = async (reelIndex: number): Promise<number> => {
  let currentIndex = 0;

  // Define a function to spin one reel
  const spin = (offset = 0): Promise<number> => {
    return new Promise<number>((resolve) => {
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
    await spin(i);
  }

  return currentIndex;
};

// Helper function to calculate coins won based on spin result
const calculateCoinsWon = (spinResult: string[]): number => {
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
      return winConditions[condition as keyof typeof winConditions];
    }
  }
  return 0;
};
export const spinSlotMachine = async (req: Request, res: Response): Promise<void> => {
  let currentCoins = userCoinsModule.getUserCoins();

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

  const results = await Promise.all([spinReel(0), spinReel(1), spinReel(2)]);
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

};
