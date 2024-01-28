'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.setUserCoins = exports.getUserCoins = void 0
// In memory storage for user coins
let userCoins = 20
const getUserCoins = () => {
  return userCoins
}
exports.getUserCoins = getUserCoins
const setUserCoins = (coins) => {
  if (typeof coins !== 'number') {
    throw new Error('Coins must be a number')
  }
  userCoins = coins
}
exports.setUserCoins = setUserCoins
//# sourceMappingURL=userCoins.js.map
