import { Task, Database, User } from '../interface'
import { addItemService, getTasksService, deleteItemService, changeItemService} from "../services/tasks";
import {Request, Response} from "express";

const DatabasePath: string = './database/db.json'

export function getItems(req: Request, res: Response) {
    if(!req.session.Id) return res.status(403).json({error: 'forbidden'})
    const Tasks: Task[] | undefined = getTasksService(req.session.Id)
    res.status(200).json(Tasks)
}

export function createItem(req: Request, res: Response) {
    if(!req.session.Id && !req.body.hasOwnProperty('text')) return res.status(400).send('400 Bad Request')
    const task: Task = addItemService(req.session.Id, req.body.text)
    res.status(200).json({id: task.id})
}

export function editItem(req: Request, res: Response) {
    if (!req.session.Id && !req.body.hasOwnProperty('id')) res.status(400).send('400 Bad Request')
    const task: object | undefined = changeItemService(req.session.Id, req.body)
    if(task === undefined) return res.status(404).json({ok: false})
    res.status(200).json({ok: true})
}

export function deleteItem(req: Request, res: Response) {
    if (!req.session.Id && !req.body.hasOwnProperty('id')) return res.status(400).send('400 Bad Request')
    const task: object | undefined = deleteItemService(req.session.Id, req.body.id)
    if (!task) return res.status(404).json({ "ok": false })
    res.status(200).json({ "ok": true })
}
