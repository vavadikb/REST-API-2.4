import { Schema, model } from 'mongoose'

interface Task {
    Userid: string,
    text: string,
    checked: boolean
}

const TaskSchema = new Schema<Task>({
    Userid: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    }
})

export const TaskModel = model<Task>('tasks', TaskSchema)