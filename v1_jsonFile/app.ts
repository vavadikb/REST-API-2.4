import express from 'express'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import routerItems from "./routes/routerItems";
import routerAuth from "./routes/routerAuth";
import cors from 'cors'
const port: number = 3000

const app = express()

const FileStore = sessionFileStore(session)

app.use(session({
    store: new FileStore({retries: 0}),
    secret: 'samiyslozhnyparol',
    resave: false,
    saveUninitialized: false
}))

declare module 'express-session' {
    interface SessionData {
        Id: string
    }
}

app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use('/api/v1', routerItems, routerAuth)

app.listen(port, () => {
    console.log(`[INFO] Server started on port - ${port}`)
})

//START WITH COMMAND - npm run start
//URL - localhost:3000
