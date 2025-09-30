import {WebSocketServer} from "ws";
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "@repo/backend-common/config"

const wss = new WebSocketServer({port: 8080});

wss.on("connection", function connection(ws, request) {
    const url = request.url; // ws:localhost:8080?token="1213"
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') ?? ""
    const decoded = jwt.verify(token,JWT_SECRET);

    if (!decoded || !(decoded as jwt.JwtPayload).userId) {
        ws.close();
        return;
    }

    ws.on("message", function message(data){
        console.log('recevied: ', data);
        ws.send('pong')
    })

});