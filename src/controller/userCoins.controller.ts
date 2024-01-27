import { Request, Response } from 'express'
import * as userCoinsModule from '../../data/userCoins'

export const getUserCoins = (req: Request, res: Response) => {
  const userCoins = userCoinsModule.getUserCoins()
  res.status(200).json({ userCoins })
}
