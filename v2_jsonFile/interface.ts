export interface Task {
    id: string,
    text: string,
    checked: boolean
}

export interface User {
    id: string,
    login: string,
    pass: string,
    tasks: Task[]
}

export interface Database {
    users: User[]
}