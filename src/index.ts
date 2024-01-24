import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import gamesRouter from "./routes/gamesRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
    res.send("same changes again and again");
});

app.use("/api/", gamesRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});