import fs from 'fs'
import path from 'path'

const dataFolder = path.join(__dirname, '../../data')
const gamesFile = path.join(dataFolder, 'game-data.json')

interface Game {
  id: string
  slug: string
  title: string
  providerName: string
  thumb: {
    url: string
  }
}

const gamesModel = {
  getAllGames: (): Game[] => {
    try {
      const gamesData = fs.readFileSync(gamesFile, 'utf-8')
      const games: Game[] = JSON.parse(gamesData)
      return games
    } catch (error) {
      console.error(error)
      return []
    }
  },

  getGameById: (id: string): Game | undefined => {
    const games = gamesModel.getAllGames()
    return games.find((game) => game.id === id)
  },
}

export default gamesModel
