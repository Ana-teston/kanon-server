'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const dotenv_1 = __importDefault(require('dotenv')) // Import dotenv first
dotenv_1.default.config() // Load environment variables
const express_1 = __importDefault(require('express'))
const games_router_1 = __importDefault(require('./routes/games.router'))
const cors_1 = __importDefault(require('cors'))
const slotMachine_router_1 = __importDefault(
  require('./routes/slotMachine.router')
)
const userCoins_router_1 = __importDefault(require('./routes/userCoins.router'))
const app = (0, express_1.default)()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NODE_ENV = process.env.NODE_ENV || 'development'
if (NODE_ENV === 'production') {
  // Configure for production
  console.log('Running in production mode')
} else {
  // Configure for development
  console.log('Running in development mode')
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000
app.get('/', (req, res) => {
  res.send(`Request received from ${req.ip}`)
})
app.use(
  (0, cors_1.default)({
    origin: [
      'http://localhost:3000',
      'https://kanon-front-fdaef99181ef.herokuapp.com',
    ],
  })
)
app.use(express_1.default.json())
app.use('/api/', games_router_1.default)
app.use('/api/slot-machine', slotMachine_router_1.default)
app.use('/api/user-coins', userCoins_router_1.default)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
//# sourceMappingURL=index.js.map
