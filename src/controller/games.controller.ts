import { Request, Response } from 'express'
import gamesModel from '../model/games.model'
import {GameNotFoundException} from "../exceptions";

const gamesController = {
  getGames: (req: Request, res: Response) => {
    try {
      const games = gamesModel.getAllGames()
      return res.json({ games });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  getGameById: (req: Request, res: Response) => {
    const gameId = req.params.id;
    const game = gamesModel.getGameById(gameId);

    if (game) {
      return res.json({ game });
    } else {
      // Throw the GameNotFoundException if the game is not found
      throw new GameNotFoundException(gameId);
    }
  },
};

export default gamesController
