"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserCoins = exports.getUserCoins = void 0;
// In memory storage for user coins
let userCoins = 20;
const getUserCoins = () => {
    return userCoins;
};
exports.getUserCoins = getUserCoins;
const setUserCoins = (coins) => {
    userCoins = coins;
};
exports.setUserCoins = setUserCoins;
