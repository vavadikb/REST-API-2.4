import { Schema, model } from 'mongoose'

interface User {
    login: string,
    pass: string,
}

const UserSchema = new Schema<User>({
    login: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
})

export const UserModel = model<User>('users', UserSchema)
