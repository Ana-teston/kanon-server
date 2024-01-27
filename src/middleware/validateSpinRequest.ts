import { Request, Response, NextFunction } from 'express';

export const validateCoinsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const coinsWon = req.body.coinsWon;
    const updatedCoins = req.body.updatedCoins;

    // Additional validation to ensure coinsWon and updatedCoins are valid numbers
    if (!validateCoins(coinsWon, 'coinsWon', res) || !validateCoins(updatedCoins, 'updatedCoins', res)) {
        return;
    }

    next();
};

const validateCoins = (value: any, fieldName: string, res: Response): boolean => {
    if (typeof value !== 'number' || isNaN(value)) {
        res.status(500).json({ message: `Internal server error. Invalid ${fieldName} value.` });
        return false;
    }
    return true;
};

