'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const fs_1 = __importDefault(require('fs'))
const path_1 = __importDefault(require('path'))
const dataFolder = path_1.default.join(__dirname, '../../data')
const gamesFile = path_1.default.join(dataFolder, 'game-data.json')
const gameModel = {
  getAllGames: () => {
    try {
      const gamesData = fs_1.default.readFileSync(gamesFile, 'utf-8')
      const games = JSON.parse(gamesData)
      return games
    } catch (error) {
      console.log(error)
      return []
    }
  },
}
exports.default = gameModel
