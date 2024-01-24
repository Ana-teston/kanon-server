'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const gamesController_1 = __importDefault(
  require('../controller/gamesController')
)
const router = (0, express_1.Router)()
router.get('/games', gamesController_1.default.getGames)
router.get('/games/:id', gamesController_1.default.getGameById)
exports.default = router
