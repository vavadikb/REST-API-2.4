import express from "express";
const router = express.Router()

import {
    getTasks,
    changeTask,
    addTask,
    deleteTask,
} from "../controllers/tasks";

router.route('/items')
    .get(getTasks)
    .post(addTask)
    .put(changeTask)
    .delete(deleteTask)

export default router