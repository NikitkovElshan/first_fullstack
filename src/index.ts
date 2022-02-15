import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from "body-parser";
import * as path from "path";

import {router as apiRoutes} from "./routes/api";
import {connectMongo} from "./shared/mongodb/connect";
import {startServer} from "./shared/services/wserver";


const port = process.env.PORT || 5000
const app = express()
const server = require('http').createServer(app)



app.use(cors({credentials: true, origin: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api', apiRoutes)

app.use(express.static(path.resolve(
    path.dirname(require.main.filename), '..', 'client', 'dist', 'client'
)))
app.get('/', (req, res) => {
    res.sendFile(
        path.resolve(
            path.dirname(require.main.filename), '..', 'client', 'dist', 'client', 'index.html'
        )
    )
})

connectMongo().then(()=>{console.log('mongo connected')}).catch(e=>console.log('error mongo connect: ' + e))

server.listen(port, () => console.log(`Сервак пашет через порт ${port}`))


startServer()
