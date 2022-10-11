import { Task, Database, User } from '../interface'
import crypto from 'crypto'
import fs from 'fs'

const DatabasePath: string = './database/db.json'

export function getItems(Id: string): Task[] | undefined {
    const db: Database = JSON.parse(fs.readFileSync(DatabasePath, 'utf-8'))
    const Tasks: Task[] | undefined = db.users.find((data: User) => data.id === Id)?.tasks
    return Tasks
}

export function addItem(Id: string | undefined, text: string): Task {
    const db: Database = JSON.parse(fs.readFileSync(DatabasePath, 'utf-8'))
    const userInd: number = db.users.findIndex((data: User) => data.id === Id)
    const id: string = crypto.randomBytes(10).toString('hex')
    const task: Task = {
        id,
        text,
        checked: false
    }
    db.users[userInd].tasks.push(task)
    fs.writeFileSync(DatabasePath, JSON.stringify(db, undefined, '\t'))
    return task
}

export function changeItem(Id: string | undefined, NewTask: Task): object | undefined {
    const db: Database = JSON.parse(fs.readFileSync(DatabasePath, 'utf-8'))
    const userInd: number = db.users.findIndex((data: User) => data.id === Id)
    const ChangingTaskIndex: number = db.users[userInd].tasks.findIndex((task: Task) => task.id === NewTask.id)
    if (ChangingTaskIndex === -1) return undefined
    db.users[userInd].tasks[ChangingTaskIndex] = NewTask
    fs.writeFileSync(DatabasePath, JSON.stringify(db, undefined, '\t'))
    return {success: true}
}

export function deleteItem(Id: string | undefined, TaskId: string): object | undefined {
    const db = JSON.parse(fs.readFileSync(DatabasePath, 'utf-8'))
    const userInd: number = db.users.findIndex((user: User) => user.id === Id)
    const DeleteIndex: number = db.users[userInd].tasks.findIndex((task: Task) => task.id === TaskId)
    if (DeleteIndex === -1) return undefined
    const deletedTask: Task = db.users[userInd].tasks[DeleteIndex]
    db.users[userInd].tasks.splice(DeleteIndex, 1)
    fs.writeFileSync(DatabasePath, JSON.stringify(db, undefined, '\t'))
    return {ok: true}
}

