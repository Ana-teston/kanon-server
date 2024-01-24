"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gameController_1 = __importDefault(require("../controller/gameController"));
const router = (0, express_1.Router)();
router.get('/games', gameController_1.default.getGames);
exports.default = router;
