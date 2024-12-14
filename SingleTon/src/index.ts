import { GameManager } from "./store";
import { startLogger } from "./logger";

const gameManager = new GameManager();

startLogger();

setInterval(() =>{
    gameManager.addGame(Math.random().toString(36).substring(2, 15));
}, 5000)


