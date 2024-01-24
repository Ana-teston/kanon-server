import { Router } from 'express';
import gameController from '../controller/gameController';

const router = Router();

router.get('/games', gameController.getGames);

export default router;