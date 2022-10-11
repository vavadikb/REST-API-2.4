import { Database, User } from '../interface'
import crypto from 'crypto'
import fs from 'fs'

const DatabasePath: string = './database/db.json'

export function loginService(login: string, pass: string): string | undefined {
    const db: Database = JSON.parse(fs.readFileSync(DatabasePath, 'utf-8'))
    const user: User | undefined = db.users.find((Data: User) => Data.login === login && Data.pass === pass)
    if(user === undefined) return undefined
    return user.id
}

export function registerService(login: string, pass: string): string | undefined {
    const db: Database = JSON.parse(fs.readFileSync(DatabasePath, 'utf-8'))
    const userCheck: User | undefined = db.users.find((Data: User) => Data.login === login && Data.pass === pass)
    if(userCheck !== undefined) return undefined
    const user: User  = {
        id: crypto.randomBytes(20).toString('hex'),
        login,
        pass,
        tasks: []
    }
    db.users.push(user)
    fs.writeFileSync(DatabasePath, JSON.stringify(db, undefined, '\t'))

    return user.id
}