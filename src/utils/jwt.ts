
import { JWT_PAYLOAD } from "@/types"
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"

const jwt_key = process.env.JWT_SECRET_KEY

export function generateToken(data: JWT_PAYLOAD): string{
    

    if(!jwt_key) throw new Error("No jwt secret key found")

    const token = jwt.sign(data, jwt_key, { expiresIn: "1h" })
    return token
}


export function decryptToken(token: string): JWT_PAYLOAD | null{

    if(!jwt_key) throw new Error("No jwt secret key found")
    const decrypt: string | JwtPayload = jwt.verify(token, jwt_key)
    if(typeof decrypt === "string"){
        return null
    }
    return decrypt as JWT_PAYLOAD
}