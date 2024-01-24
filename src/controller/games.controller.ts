import { Request, Response } from 'express'
import gamesModel from '../model/games.model'

const gamesController = {
  getGames: (req: Request, res: Response) => {
    const games = gamesModel.getAllGames()
    return res.json({ games })
  },
  getGameById: (req: Request, res: Response) => {
    const gameId = req.params.id
    const game = gamesModel.getGameById(gameId)

    if (game) {
      return res.json({ game })
    } else {
      return res.status(404).json({ error: 'Game not found' })
    }
  },
}

export default gamesController
