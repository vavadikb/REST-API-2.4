import { Task, Database, User } from '../interface'
import { addItem, getItems, deleteItem, changeItem} from "../services/tasks";
import {Request, Response} from "express";

const DatabasePath: string = './database/db.json'

export function getTasks(req: Request, res: Response) {
    if(!req.session.Id) return res.status(403).json({error: 'forbidden'})
    const Tasks: Task[] | undefined = getItems(req.session.Id)
    res.status(200).json(Tasks)
}

export function addTask(req: Request, res: Response) {
    if(!req.session.Id && !req.body.hasOwnProperty('text')) return res.status(400).send('400 Bad Request')
    const task: Task = addItem(req.session.Id, req.body.text)
    res.status(200).json({id: task.id})
}

export function changeTask(req: Request, res: Response) {
    if (!req.session.Id && !req.body.hasOwnProperty('id')) res.status(400).send('400 Bad Request')
    const task: object | undefined = changeItem(req.session.Id, req.body)
    if(task === undefined) return res.status(404).json({ok: false})
    res.status(200).json({ok: true})
}

export function deleteTask(req: Request, res: Response) {
    if (!req.session.Id && !req.body.hasOwnProperty('id')) return res.status(400).send('400 Bad Request')
    const task: object | undefined = deleteItem(req.session.Id, req.body.id)
    if (!task) return res.status(404).json({ "ok": false })
    res.status(200).json({ "ok": true })
}
