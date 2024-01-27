'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const exceptions_1 = require('../exceptions')
const errorHandler = (error, res) => {
  if (error instanceof exceptions_1.GameNotFoundException) {
    return res.status(404).json({ error: error.message })
  } else {
    console.error(`Global Error Handler: ${error.message}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
exports.default = errorHandler
