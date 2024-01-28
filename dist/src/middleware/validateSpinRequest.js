"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCoinsMiddleware = void 0;
const validateCoinsMiddleware = (req, res, next) => {
    const coinsWon = req.body.coinsWon;
    const updatedCoins = req.body.updatedCoins;
    // Additional validation to ensure coinsWon and updatedCoins are valid numbers
    if (!validateCoins(coinsWon, 'coinsWon', res) ||
        !validateCoins(updatedCoins, 'updatedCoins', res)) {
        return;
    }
    next();
};
exports.validateCoinsMiddleware = validateCoinsMiddleware;
const validateCoins = (value, fieldName, res) => {
    if (typeof value !== 'number' || isNaN(value)) {
        res
            .status(500)
            .json({ message: `Internal server error. Invalid ${fieldName} value.` });
        return false;
    }
    return true;
};
//# sourceMappingURL=validateSpinRequest.js.map