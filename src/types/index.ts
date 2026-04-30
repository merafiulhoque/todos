import { JwtPayload } from "jsonwebtoken";

export interface JWT_PAYLOAD extends JwtPayload {
    id: number
    email: string
    name: string
}

export interface Todo {
    id: number
    title: string
    content: string | null
}

export interface ApiResponse {
    success: boolean
    message: string
    data: any
}