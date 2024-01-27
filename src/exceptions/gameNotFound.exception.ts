import { HttpException } from './http.exception'
export class GameNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Game with ID ${id} not found`)
  }
}
