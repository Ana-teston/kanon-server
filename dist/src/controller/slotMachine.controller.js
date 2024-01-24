'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.spinSlotMachine = void 0
const userCoins_1 = require('../../data/userCoins')
const reels = [
  ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon'],
  ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon'],
  ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'lemon', 'banana', 'lemon'],
]
const spinSlotMachine = (req, res) => {
  // slot machine spin logic
  const spinResult = spinReels()
  const coinsWon = calculateCoinsWon(spinResult)
  const currentCoins = (0, userCoins_1.getUserCoins)()
  // Update user coins
  ;(0, userCoins_1.setUserCoins)(currentCoins - 1 + coinsWon)
  res.json({ spinResult, coinsWon, currentCoins })
}
exports.spinSlotMachine = spinSlotMachine
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
const calculateCoinsWon = (spinResult) => {
  // For simplicity, let's say the user wins if all symbols in a reel are the same
  if (spinResult.every((symbol, index) => spinResult[0] === symbol)) {
    return 10 // Win 10 coins
  } else {
    return 0 // No win
  }
}
