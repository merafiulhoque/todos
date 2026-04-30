import { cookies } from "next/headers";
import { decryptToken } from "./jwt";
import { JWT_PAYLOAD } from "@/types";

export async function getUser(){
    const token = (await cookies()).get("token")?.value
    if(!token) return null
    const user: JWT_PAYLOAD | null = await decryptToken(token)
    if(!user){
        return null
    }
    return user
}