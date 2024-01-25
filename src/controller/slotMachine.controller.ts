import { Request, Response } from 'express'
import { getUserCoins, setUserCoins } from '../../data/userCoins'

const reels = [
  ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon'],
  ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon'],
  ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'lemon', 'banana', 'lemon'],
]

export const spinSlotMachine = (req: Request, res: Response) => {
  // slot machine spin logic
  const spinResult = spinReels()
  const coinsWon = calculateCoinsWon(spinResult)
  const currentCoins = getUserCoins()

  // Update user coins
  setUserCoins(currentCoins - 1 + coinsWon)

  res.json({ spinResult, coinsWon, currentCoins })
}

// Helper function to simulate spinning the slot machine reels
const spinReels = () => {
  const result = []
  for (let i = 0; i < reels.length; i++) {
    const randomIndex = Math.floor(Math.random() * reels[i].length)
    result.push(reels[i][randomIndex])
  }
  return result
}

// Helper function to calculate coins won based on spin result
const calculateCoinsWon = (spinResult: string[]): number => {
  const joinedResult = spinResult.join(',');

  const winConditions = {
    'cherry,cherry,cherry': 50,
    'cherry,cherry': 40,
    'apple,apple,apple': 20,
    'apple,apple': 10,
    'banana,banana,banana': 15,
    'banana,banana': 5,
    'lemon,lemon,lemon': 3,
  }

  //check for win conditions
  const conditions = Object.keys(winConditions);

  for (const condition of conditions) {
    if (joinedResult.startsWith(condition)) {
      return winConditions[condition as keyof typeof winConditions];
    }
  }
  return -1;
};
