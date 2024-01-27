'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.GameNotFoundException = void 0
const http_exception_1 = require('./http.exception')
class GameNotFoundException extends http_exception_1.HttpException {
  constructor(id) {
    super(404, `Game with ID ${id} not found`)
  }
}
exports.GameNotFoundException = GameNotFoundException
