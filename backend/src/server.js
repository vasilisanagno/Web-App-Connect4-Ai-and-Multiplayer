import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import pgSession from 'connect-pg-simple'
import pg from 'pg'
import { UserRouter } from './api/routes/User.js'
import { AiGameRouter } from './api/routes/AiGame.js'
import { MultiplayerGameRouter } from './api/routes/MultiplayerGame.js'
import http from 'http'
import { createSocket } from './api/socketListeners/socket.js'

const PgSession = pgSession(session)

const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Connect4',
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
})
const app = express()
const PORT = process.env.PORT || 5000

app.options("*", cors({ 
    origin: ['http://localhost:3000'],
    methods: ["POST","GET"],
    credentials: true,
    optionsSuccessStatus: 200 }))
app.use(cors({ 
    origin: ['http://localhost:3000'],
    methods: ["POST","GET"],
    credentials: true,
    optionsSuccessStatus: 200 
}))

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new PgSession({ 
        pool,
        tableName: 'Session'
    }),
    resave: false,
    saveUninitialized: false,
    name: "Connect4-sid",
    rolling:true,
    cookie: {
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 20 // 20 minutes
    }
}))

app.use("/user",UserRouter)
app.use("/ai",AiGameRouter)
app.use("/multiplayer",MultiplayerGameRouter)

const server = http.createServer(app)
createSocket(server)

server.listen(PORT,() => {
    console.log(`Server is open at ${PORT}`)
})