'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const games_controller_1 = __importDefault(
  require('../controller/games.controller')
)
const router = (0, express_1.Router)()
router.get('/games', games_controller_1.default.getGames)
router.get('/games/:id', games_controller_1.default.getGameById)
exports.default = router
