"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const games_controller_1 = __importDefault(require("./games.controller"));
const exceptions_1 = require("../exceptions");
(0, globals_1.describe)('Games Controller', () => {
    (0, globals_1.describe)('getGames', () => {
        (0, globals_1.test)('It should return a JSON response with games', () => {
            const req = {};
            const res = {
                json: jest.fn(),
            };
            games_controller_1.default.getGames(req, res);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ games: globals_1.expect.any(Array) });
        });
    });
    (0, globals_1.describe)('getGameById', () => {
        (0, globals_1.test)('It should return a JSON response with the specified game', () => {
            const req = {
                params: { id: 'playngo_legacy-of-dead' },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            games_controller_1.default.getGameById(req, res);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ game: globals_1.expect.any(Object) });
        });
        (0, globals_1.test)('It should return a 404 error if the game is not found', () => {
            const req = {
                params: { id: 'nonexistent' },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            (0, globals_1.expect)(() => games_controller_1.default.getGameById(req, res)).toThrow(exceptions_1.GameNotFoundException);
        });
    });
});
