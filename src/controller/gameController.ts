import { Request, Response } from "express";
import gameModel from "../model/GameModel";


const gameController = {
    getGames: (req: Request, res: Response) => {
        const games = gameModel.getAllGames();
        return res.json({games});
    }
}

export default gameController;