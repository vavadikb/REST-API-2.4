import { loginService, registerService } from "../services/auth";
import {Request, Response} from "express";

export function login(req: Request, res: Response) {
    const { login, pass } = req.body
    if (!(login && pass)) return res.status(500).send('Internal Server Error')
    const Id: string | undefined = loginService(login, pass)
    if(!Id) return res.status(404).json({ "error": "not found" })
    req.session.Id = Id
    res.status(200).json({ ok: true })
}

export function register(req: Request, res: Response) {
    const { login, pass } = req.body
    if (!(login && pass)) return res.status(500).send('Internal Server Error')
    const Id: string | undefined = registerService(login, pass)
    if(!Id) return res.status(400).json({ "error": "already exist" })
    req.session.Id = Id
    res.status(200).json({ ok: true })
}

export function logout(req: Request, res: Response) {
    req.session.destroy((err: any) => {
        if(!err) res.clearCookie('connect.sid').json({ok: true})
    })
}
