import { NextResponse } from "next/server"
import { createGeneralResponse } from "./createResponse"

export function logUserOutAfterDeletingCookie(){

    const response = createGeneralResponse(false, "Unauthorized", 401)

    response.cookies.delete("token")
    return response
}