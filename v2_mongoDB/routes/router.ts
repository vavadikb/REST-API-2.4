import express, {Request, Response} from "express";
const router = express.Router()

import {
    getItems,
    editItem,
    createItem,
    deleteItem,
} from "../controllers/items";

import {
    login,
    register,
    logout
} from "../controllers/auth";

const functions: {[index: string]:any} = {
    getItems,
    editItem,
    createItem,
    deleteItem,
    login,
    register,
    logout
}

router.route('/router')
    .get((req: Request, res: Response) => {
        try {
            const funcName: string = req.query.action as string
            functions[funcName](req, res)
        } catch (e) {
            res.status(404).json({error: 'not found'})
        }
    })
    .post((req: Request, res: Response) => {
        try {
            if(Object.keys(req.query).length == 0) return logout(req, res);
            const funcName: string = req.query.action as string
            functions[funcName](req, res)
        } catch (e) {
            res.status(404).json({error: 'not found'})
        }
    })
    .put((req: Request, res: Response) => {
        try {
            const funcName: string = req.query.action as string
            functions[funcName](req, res)
        } catch (e) {
            res.status(404).json({error: 'not found'})
        }
    })
    .delete((req: Request, res: Response) => {
        try {
            const funcName: string = req.query.action as string
            functions[funcName](req, res)
        } catch (e) {
            res.status(404).json({error: 'not found'})
        }
    })

export default router
