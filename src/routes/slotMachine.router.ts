import express from 'express'
import { spinSlotMachine } from '../controller/slotMachine.controller'
import {validateCoinsMiddleware} from "../middleware/validateSpinRequest";

const router = express.Router()

router.get('/spin', spinSlotMachine);
router.post('/spin', spinSlotMachine, validateCoinsMiddleware);

export default router
