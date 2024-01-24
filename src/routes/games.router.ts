import { Router } from 'express'
import gamesController from '../controller/games.controller'

const router = Router()

router.get('/games', gamesController.getGames)

router.get('/games/:id', gamesController.getGameById)

export default router
