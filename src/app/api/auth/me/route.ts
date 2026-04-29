import { createErrorResponse, createGeneralResponse } from "@/utils/createResponse";
import { decryptToken } from "@/utils/jwt";
import { cookies } from "next/headers";

export async function GET(req: Request){
    try {
        const cookieStore = cookies()
        const token = (await cookieStore).get("token")?.value
        if(!token){
            return createGeneralResponse(false, "Invalid token, Please login...", 400)
        }
        const decrypt = decryptToken(token)
        if(!decrypt){
            const response = createGeneralResponse(false, "Invalid token, Please login...", 400)
            response.cookies.delete("token")
            return response
        }
        const response = createGeneralResponse(true, "Data fetched successfully...", 200, decrypt)
        return response
    } catch (error) {
        return createErrorResponse(error)
    }
}