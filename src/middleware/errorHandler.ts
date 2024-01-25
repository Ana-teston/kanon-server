import { Request, Response, NextFunction } from "express";
import { HttpException, GameNotFoundException } from "../exceptions";

const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if (error instanceof GameNotFoundException) {
        return res.status(404).json({ error: error.message });
    } else {
        console.error(`Global Error Handler: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default errorHandler;
