import express from 'express'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import router from "./routes/router";
import cors from 'cors'
const port: number = 3000

const app = express()

const FileStore = sessionFileStore(session)

app.use(session({
    store: new FileStore({retries: 0}),
    secret: 'samiyslozhnyparol',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 60 * 2,
        httpOnly: true
    }
}))

app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

declare module 'express-session' {
    interface SessionData {
        Id: string
    }
}

app.use('/api/v2', router)

app.listen(port, () => {
    console.log(`[INFO] Server started on port - ${port}`)
})

//START WITH COMMAND - npm run start
//URL - localhost:3000
