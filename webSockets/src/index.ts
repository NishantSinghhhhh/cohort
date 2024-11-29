import WebSocket, {WebSocketServer} from "ws";
import http from "http";

const server = http.createServer(function(request: any, response:any){
    console.log((new Date)) + 'Recieved reques for ' + request.url;
});

// server.listen(8080);

const wss = new WebSocketServer({server});

wss.on('connection', function connection(ws: WebSocket){
    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data)
            }
        });
    });

    ws.send("Hello Message from server: ");
});

server.listen(8080, function(){
    console.log((new Date()) + ' Server is listening on 8080')
})

