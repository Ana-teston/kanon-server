import dotenv from 'dotenv' // Import dotenv first
dotenv.config() // Load environment variables
import express, { Express, Request, Response } from 'express'
import gamesRouter from './routes/games.router'
import cors from 'cors'
import slotMachineRouter from './routes/slotMachine.router'
import userCoinsRouter from './routes/userCoins.router'

const app: Express = express()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NODE_ENV: string = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'production') {
  // Configure for production
  console.log('Running in production mode');
} else {
  // Configure for development
  console.log('Running in development mode');
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000

app.get('/', (req: Request, res: Response) => {
  res.send(`Request received from ${req.ip}`)
})
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use('/api/', gamesRouter)
app.use('/api/slot-machine', slotMachineRouter)
app.use('/api/user-coins', userCoinsRouter)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
