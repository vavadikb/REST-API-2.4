import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'

const port: number = 3000

import routerItems from "./routes/routerItems";
import routerAuth from "./routes/routerAuth";
import connectDatabase from "./database/dbConnection";

// import dotenv from 'dotenv'
// dotenv.config();

const database:string = 'mongodb+srv://vadim:29092006Vb!@cluster0.x4bzusj.mongodb.net/test'
const app = express()

app.use(session({
    store: MongoStore.create({
        mongoUrl:database
    }),
    secret: 'samiyslozhnyparol',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1', routerItems, routerAuth)

declare module 'express-session' {
    interface SessionData {
        Id: string
    }
}

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

async function serverStart() {
    try {
        await connectDatabase(database!).then(() => {
            console.log(`Connected to DB`)
            app.listen(3000, () => {
                console.log(`Server listening on port: ${port}`)
            })
        })
    } catch (e) {
        console.log(`Connection crashed with error: ${e}`)
    }
}

serverStart().then(() => {
    console.log('Server fully started!')
})

//START WITH COMMAND - npm start
//URL - localhost:3000
