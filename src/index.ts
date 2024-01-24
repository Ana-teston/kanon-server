import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import gamesRouter from './routes/games.router'
import cors from 'cors'
import slotMachineRouter from './routes/slotMachine.router'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8000

app.get('/', (req: Request, res: Response) => {
  res.send('same changes again and again')
})

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use('/api/', gamesRouter)
app.use('/api/slot-machine', slotMachineRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
