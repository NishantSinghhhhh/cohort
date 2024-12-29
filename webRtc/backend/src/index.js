"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
// WebSocket Server
const wss = new ws_1.WebSocketServer({ port: 8080 });
console.log("WebSocket server running on ws://localhost:8080");
// Store connected clients
const clients = {};
let senderSocket = null;
let receiverSocket = null;
// WebSocket Server Connection Handler
wss.on('connection', (ws, req) => {
    var _a;
    console.log('New client connected');
    // Identify sender or receiver based on a query parameter (optional, customizable)
    const clientType = ((_a = req.url) === null || _a === void 0 ? void 0 : _a.includes('sender')) ? 'sender' : 'receiver';
    // Assign the socket to the correct role
    if (clientType === 'sender') {
        clients.sender = ws;
        console.log('Sender connected');
    }
    else {
        clients.receiver = ws;
        console.log('Receiver connected');
    }
    // Handle incoming messages
    ws.on('message', (message) => {
        try {
            // Parse the message as JSON
            const parsedMessage = JSON.parse(message);
            // Handle different message types
            if (parsedMessage.type === "identify-as-sender") {
                senderSocket = ws;
                console.log("Sender identified");
            }
            else if (parsedMessage.type === "identify-as-receiver") {
                receiverSocket = ws;
                console.log("Receiver identified");
            }
            else if (parsedMessage.type === "create-offer") {
                if (receiverSocket) {
                    receiverSocket.send(JSON.stringify({ type: "offer", payload: parsedMessage.payload }));
                    console.log("Offer sent to receiver");
                }
                else {
                    console.error("Receiver is not connected");
                }
            }
            else {
                console.error("Unknown message type:", parsedMessage.type);
            }
        }
        catch (err) {
            console.error("Error parsing message:", err);
        }
    });
    // Handle client disconnection
    ws.on('close', () => {
        console.log(`[${clientType}] Client disconnected`);
        if (clientType === 'sender')
            clients.sender = undefined;
        if (clientType === 'receiver')
            clients.receiver = undefined;
    });
});
