import { UserModel } from "../schemas/usersSchemas";
import {Request, Response} from "express";

export async function login(req: Request, res: Response) {
    const { login, pass } = req.body
    if (!(login && pass)) return res.status(400).json({ok: false})
    const user = await UserModel.findOne({login,pass})
    if(!user) return res.status(404).json({error: "not found"})
    req.session.Id = user._id
    res.status(200).json({ "ok": true })
}

export async function register(req: Request, res: Response) {
    const { login, pass } = req.body
    if (!(login && pass)) return res.status(400).json({ok: false})
    const user = await UserModel.findOne({login})
    if(user) return res.status(400).json({ "error": "already exist" })
    await UserModel.create({login, pass})
    res.status(200).json({ok: true})
}

export function logout(req: Request, res: Response) {
    req.session.destroy((err: any) => {
        if(!err) res.clearCookie('connect.sid').json({ok: true})
    })
}
