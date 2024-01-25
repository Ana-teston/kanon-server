import { describe, test, expect } from '@jest/globals'
import gamesController from './games.controller'
import { Request, Response } from 'express'
import {GameNotFoundException} from "../exceptions";
describe('Games Controller', () => {
  describe('getGames', () => {
    test('It should return a JSON response with games', () => {
      const req = {} as Request
      const res = {
        json: jest.fn(),
      } as unknown as Response

      gamesController.getGames(req, res)

      expect(res.json).toHaveBeenCalledWith({ games: expect.any(Array) })
    })
  })

  describe('getGameById', () => {
    test('It should return a JSON response with the specified game', () => {
      const req = {
        params: { id: 'playngo_legacy-of-dead' },
      } as unknown as Request;
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      gamesController.getGameById(req, res);

      expect(res.json).toHaveBeenCalledWith({ game: expect.any(Object) });
    });

    test('It should return a 404 error if the game is not found', () => {
      const req = {
        params: { id: 'nonexistent' },
      } as unknown as Request;
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      expect(() => gamesController.getGameById(req, res)).toThrow(GameNotFoundException);
    });

  });

});

