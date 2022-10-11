import express from 'express'
const router = express.Router()

import {
    register,
    login,
    logout } from '../controllers/auth'

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/logout').post(logout)

export default router