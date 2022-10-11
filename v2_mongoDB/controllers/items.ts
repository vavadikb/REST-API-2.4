import { TaskModel } from "../schemas/tasksSchemas";
import {Request, Response} from "express";

export async function getItems(req: Request, res: Response) {
    try {
        if(!req.session.Id) return res.status(403).json({error: 'forbidden'})
        const Tasks = await TaskModel.find({ Userid: req.session.Id})
        res.status(200).json(Tasks)
    } catch (e) {
        console.log(`MONGOOSE get[err]: ${e}`)
        res.status(500).json({error: e})
    }
}

export async function createItem(req: Request, res: Response) {
    try {
        if(!req.session.Id && !req.body.hasOwnProperty('text')) return res.status(400).send('400 Bad Request')
        req.body.Userid = req.session.Id
        const task = await TaskModel.create(req.body)
        res.status(200).json({id: task._id})
    } catch (e) {
        console.log(`MONGOOSE add[err]: ${e}`)
        res.status(500).json({error: e})
    }
}

export async function editItem(req: Request, res: Response) {
    try {
        if (!req.session.Id) return res.status(400).send({ error: "Bad Request" })
        const task = await TaskModel.findOneAndUpdate({ _id: req.body._id }, req.body, {runValidators: true})
        if(!task) return res.status(400).json({error: 'Bad Request'})
        res.status(200).json({ok: true})
    } catch (e) {
        console.log(`MONGOOSE change[err]: ${e}`)
        res.status(500).json({error: e})
    }
}

export async function deleteItem(req: Request, res: Response) {
    try {
        if (!req.session.Id && !req.body.hasOwnProperty('_id')) return res.status(400).json({ "error": "Bad Request"})
        const task = await TaskModel.findOneAndDelete({ _id: req.body._id })
        if(!task) return res.status(404).json({error: '404 Not found'})
        res.status(200).json({ ok: true })
    } catch (e) {
        console.log(`MONGOOSE delete[err]: ${e}`)
        res.status(500).json({error: e})
    }
}
