import { JWT_PAYLOAD } from "@/types"
import { SignJWT, jwtVerify } from "jose"

const jwt_key = process.env.JWT_SECRET_KEY

export async function generateToken(payload: JWT_PAYLOAD): Promise<string>{
    const secret = new TextEncoder().encode(jwt_key)
    const token = await new SignJWT(payload)
                            .setProtectedHeader({alg: "HS256"})
                            .setExpirationTime("1h")
                            .sign(secret);
    return token
}


export async function decryptToken(token: string): Promise<JWT_PAYLOAD | null>{
    try {
        const secret = new TextEncoder().encode(jwt_key)
        const { payload } = await jwtVerify(token, secret)
        return payload as JWT_PAYLOAD
        
    } catch (error) {
        return null
    }
}