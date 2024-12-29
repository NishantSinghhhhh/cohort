import WebSocket, { WebSocketServer } from 'ws';

// WebSocket Server
const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server running on ws://localhost:8080");

// Store connected clients
const clients: { sender?: WebSocket; receiver?: WebSocket } = {};

let senderSocket: WebSocket | null = null;
let receiverSocket: WebSocket | null = null;

// WebSocket Server Connection Handler
wss.on('connection', (ws: WebSocket, req) => {
    console.log('New client connected');

    // Identify sender or receiver based on a query parameter (optional, customizable)
    const clientType = req.url?.includes('sender') ? 'sender' : 'receiver';

    // Assign the socket to the correct role
    if (clientType === 'sender') {
        clients.sender = ws;
        senderSocket = ws;
        console.log('Sender connected');
    } else {
        clients.receiver = ws;
        receiverSocket = ws;
        console.log('Receiver connected');
    }

    // Handle incoming messages
    ws.on('message', (message: string) => {
        try {
            // Parse the message as JSON
            const parsedMessage = JSON.parse(message);

            // Handle different message types
            if (parsedMessage.type === "identify-as-sender") {
                senderSocket = ws;
                console.log("Sender identified");
            } else if (parsedMessage.type === "identify-as-receiver") {
                receiverSocket = ws;
                console.log("Receiver identified");
            } else if (parsedMessage.type === "create-offer") {
                // Forward the offer to the receiver
                if (receiverSocket) {
                    receiverSocket.send(
                        JSON.stringify({ type: "offer", payload: parsedMessage.payload })
                    );
                    console.log("Offer sent to receiver");
                } else {
                    console.error("Receiver is not connected");
                }
            } else if (parsedMessage.type === "ice-candidate") {
                // Handle ICE candidate forwarding
                const targetSocket = clientType === 'sender' ? receiverSocket : senderSocket;

                if (targetSocket) {
                    targetSocket.send(
                        JSON.stringify({ type: "ice-candidate", payload: parsedMessage.payload })
                    );
                    console.log("ICE candidate forwarded");
                } else {
                    console.error("Target client is not connected");
                }
            } else {
                console.error("Unknown message type:", parsedMessage.type);
            }
        } catch (err) {
            console.error("Error parsing message:", err);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log(`[${clientType}] Client disconnected`);
        if (clientType === 'sender') {
            clients.sender = undefined;
            senderSocket = null;
        }
        if (clientType === 'receiver') {
            clients.receiver = undefined;
            receiverSocket = null;
        }
    });
});
