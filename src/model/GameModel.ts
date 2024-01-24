import fs from 'fs';
import path from 'path';

const dataFolder = path.join(__dirname, '../data');
const gamesFile = path.join(dataFolder, 'game-data.json');


const gameModel = {
    getAllGames: () => {
        try {
            const gamesData = fs.readFileSync(gamesFile, 'utf-8');
            const games = JSON.parse(gamesData);
            return games;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
}
 export default gameModel;