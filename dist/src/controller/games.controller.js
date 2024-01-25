"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const games_model_1 = __importDefault(require("../model/games.model"));
const exceptions_1 = require("../exceptions");
const gamesController = {
    getGames: (req, res) => {
        try {
            const games = games_model_1.default.getAllGames();
            return res.json({ games });
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getGameById: (req, res) => {
        const gameId = req.params.id;
        const game = games_model_1.default.getGameById(gameId);
        if (game) {
            return res.json({ game });
        }
        else {
            // Throw the GameNotFoundException if the game is not found
            throw new exceptions_1.GameNotFoundException(gameId);
        }
    },
};
exports.default = gamesController;
