'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const GameModel_1 = __importDefault(require('../model/GameModel'))
const gameController = {
  getGames: (req, res) => {
    const games = GameModel_1.default.getAllGames()
    return res.json({ games })
  },
}
exports.default = gameController
