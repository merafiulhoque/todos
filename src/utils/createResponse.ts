import { NextResponse } from "next/server";

export function createGeneralResponse<T>(success: boolean, message: string, status: number, data: T | null = null): NextResponse {
    return NextResponse.json({ success, message, data }, {status})
}

export function zodValidationErrorResponse( status: number, errors: { name?: string[] | undefined; email?: string[] | undefined; password?: string[] | undefined; }){
    const fieldErrors = errors
    const fieldMessage = Object.values(fieldErrors)[0]?.[0]

    return NextResponse.json({
        success: false,
        message: fieldMessage
    }, {status})
}

export function createErrorResponse(error: any){
    if (error instanceof Error){
        return NextResponse.json({
            success: false,
            message: error.message
        }, {status: 500})
    }

    return NextResponse.json({
        success: false,
        message: "Internal server error..."
    }, {status: 500})
}

