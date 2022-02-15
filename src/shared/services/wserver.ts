import {WebSocketServer} from 'ws';
import {User} from "../mongodb/model/User";
import * as jwt from 'jsonwebtoken';


let wss: WebSocketServer;

const clientArr = []

function checkUser(ws,token) {
    return new Promise(resolve => {
        jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
            if (err) {
                resolve(false)
            } else {
                const candidate = await User.findOne({email: decoded.email})
                if (!candidate) {
                    resolve(false)
                } else {
                    ws.email = decoded.email
                    resolve(true)
                }
            }
        })
    })
}

function startServer() {
    wss = new WebSocketServer({
        port: 4444
    })

    wss.on('connection', async (ws, request) => {

        if (request.url.includes('token=')) {
            const token = request.url.split('=')[1]
            if (token) {
                const check = await checkUser(ws,token)
                if(!check){
                    ws.close()
                    return
                }
            } else {
                ws.close()
                return
            }
        } else {
            ws.close()
            return
        }
        clientArr.push(ws)

        const listUsers = {
            type: 'listUsers',
            data: clientArr.map(i => i.email)
        }

        ws.send(JSON.stringify(listUsers))


        ws.on('message', (message) => {

            console.log('massage from client:' + message)
        })

        ws.on('close', () => {
            for(let i=0;i<clientArr.length;i++){
                if(clientArr[i].email === ws.email){
                    clientArr.splice(i, 1)
                    break
                }
            }

        })

    })
}

export {startServer}




