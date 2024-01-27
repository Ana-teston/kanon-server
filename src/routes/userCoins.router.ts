import express from "express";
import {getUserCoins} from "../controller/userCoins.controller";

const router = express.Router();

router.get('/', getUserCoins);

export default router;