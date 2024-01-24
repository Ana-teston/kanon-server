'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const games_model_1 = __importDefault(require('../model/games.model'))
const gamesController = {
  getGames: (req, res) => {
    const games = games_model_1.default.getAllGames()
    return res.json({ games })
  },
  getGameById: (req, res) => {
    const gameId = req.params.id
    const game = games_model_1.default.getGameById(gameId)
    if (game) {
      return res.json({ game })
    } else {
      return res.status(404).json({ error: 'Game not found' })
    }
  },
}
exports.default = gamesController