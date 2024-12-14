"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../src/store");
const logger_1 = require("../src/logger");
(0, logger_1.startLogger)();
setInterval(() => {
    store_1.games.push({
        id: Math.random().toString(),
        whitePlayerName: "John",
        blackPlayerName: "Doe",
        moves: [],
    });
}, 5000);
// ws server
