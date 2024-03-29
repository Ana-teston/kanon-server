"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const slotMachine_controller_1 = require("./slotMachine.controller");
const userCoinsModule = __importStar(require("../../data/userCoins"));
jest.mock('../../data/userCoins', () => ({
    ...jest.requireActual('../../data/userCoins'),
    getUserCoins: jest.fn(),
    setUserCoins: jest.fn(),
}));
describe('Slot Machine Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return correct spin result and coins won', async () => {
        const req = {};
        const jsonMock = jest.fn();
        const res = { json: jsonMock };
        const next = jest.fn();
        await (0, slotMachine_controller_1.spinSlotMachine)(req, res, next);
        expect(jsonMock).toHaveBeenCalled();
        const response = jsonMock.mock.calls[0][0];
        expect(response).toHaveProperty('spinResult');
        expect(response).toHaveProperty('coinsWon');
        expect(response).toHaveProperty('updatedCoins');
    });
    it('should handle game over scenario correctly', async () => {
        // Mock getUserCoins to return 0
        ;
        userCoinsModule.getUserCoins.mockReturnValue(0);
        const req = {};
        const jsonMock = jest.fn();
        const res = { json: jsonMock };
        const next = jest.fn();
        await (0, slotMachine_controller_1.spinSlotMachine)(req, res, next);
        expect(jsonMock).toHaveBeenCalledWith({
            message: 'Game over. Insufficient coins to play.',
        });
    });
    it('should handle coins deduction and update correctly', async () => {
        // Mock getUserCoins to return 10
        ;
        userCoinsModule.getUserCoins.mockReturnValue(10);
        const req = {};
        const jsonMock = jest.fn();
        const res = { json: jsonMock };
        const next = jest.fn();
        await (0, slotMachine_controller_1.spinSlotMachine)(req, res, next);
        // Verify that setUserCoins was called correctly
        expect(userCoinsModule.setUserCoins).toHaveBeenCalledWith(expect.any(Number));
    });
});
//# sourceMappingURL=slotMachine.test.js.map