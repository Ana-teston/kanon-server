// In memory storage for user coins
let userCoins = 20;

export const getUserCoins = () => {
    return userCoins;
};

export const setUserCoins = (coins: number) => {
    userCoins = coins;
};