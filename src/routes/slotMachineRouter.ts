import express from "express";
import { spinSlotMachine } from "../controller/slotMachineController";

const router = express.Router();

router.post("/spin", spinSlotMachine);

export default router;