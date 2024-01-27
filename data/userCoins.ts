// In memory storage for user coins
let userCoins = 20

export const getUserCoins = () => {
  return userCoins
}

export const setUserCoins = (coins: number): void => {
  if (typeof coins !== 'number') {
    throw new Error('Coins must be a number')
  }
  userCoins = coins
}
