import express from 'express'
import { spinSlotMachine } from '../controller/slotMachine.controller'

const router = express.Router()

router.post('/spin', spinSlotMachine)

export default router
