import express from 'express'
const router = express.Router()

import {
    registerAcc,
    loginAcc,
    logout } from '../controllers/auth'

router.route('/login').post(loginAcc)
router.route('/register').post(registerAcc)
router.route('/logout').post(logout)

export default router