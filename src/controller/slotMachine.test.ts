import { spinSlotMachine } from './slotMachine.controller';
import * as userCoinsModule from '../../data/userCoins';

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
        const req = {} as any;
        const jsonMock = jest.fn();
        const res = { json: jsonMock } as any;
        const next: any = jest.fn();

        await spinSlotMachine(req, res, next);

        expect(jsonMock).toHaveBeenCalled();
        const response = jsonMock.mock.calls[0][0];

        expect(response).toHaveProperty('spinResult');
        expect(response).toHaveProperty('coinsWon');
        expect(response).toHaveProperty('updatedCoins');

    });

    it('should handle game over scenario correctly', async () => {
        // Mock getUserCoins to return 0
        (userCoinsModule.getUserCoins as jest.Mock).mockReturnValue(0);

        const req = {} as any;
        const jsonMock = jest.fn();
        const res = { json: jsonMock } as any;
        const next: any = jest.fn();

        await spinSlotMachine(req, res, next);

        expect(jsonMock).toHaveBeenCalledWith({
            message: 'Game over. Insufficient coins to play.',
        });
    });

    it('should handle coins deduction and update correctly', async () => {
        // Mock getUserCoins to return 10
        (userCoinsModule.getUserCoins as jest.Mock).mockReturnValue(10);
        const req = {} as any;
        const jsonMock = jest.fn();
        const res = { json: jsonMock } as any;
        const next: any = jest.fn();

        await spinSlotMachine(req, res, next);

        // Verify that setUserCoins was called correctly
        expect(userCoinsModule.setUserCoins).toHaveBeenCalledWith(expect.any(Number));
    });
});

