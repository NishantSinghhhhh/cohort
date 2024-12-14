import { games } from "./store";
import { startLogger } from "./logger";

setInterval(() =>{
    games.push(
        {
            id: Math.random().toString(),
            whitePlayerName: "John",
            blackPlayerName: "Doe",
            moves: [],
        })
}, 5000)