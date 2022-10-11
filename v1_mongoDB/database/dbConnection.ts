import {connect, connection} from 'mongoose'
const connectDatabase = (url: string) => connect(url)

let db: any = connection
db.on('error', () => {
    connectDatabase(process.env.DATABASE_URL!).then(() => {
        console.log('Connection error was detected, connection was restored!')
    })
})
export default connectDatabase