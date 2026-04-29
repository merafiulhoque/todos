import { createErrorResponse, createGeneralResponse } from "@/utils/createResponse";

export async function POST(){
    try {
        const response = createGeneralResponse(true, "Logout Successful...", 200)
        response.cookies.delete("token")
        return response
    } catch (error) {
        return createErrorResponse(error)
    }
}