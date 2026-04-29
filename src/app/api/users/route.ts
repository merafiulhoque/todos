import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/utils/bcrypt"
import { createGeneralResponse, zodValidationErrorResponse } from "@/utils/createResponse"
import { UserSignUpData } from "@/validation"

export async function POST(req: Request){
    const { name, email, password } = await req.json()
    const result = UserSignUpData.safeParse({ name, email, password })
    
    if(!result.success){
        return zodValidationErrorResponse("Validation error", 400, result.error.flatten().fieldErrors)
    }

    
    try {
        const userFoundByEmail = await prisma.user.findUnique({
            where: {email}
        })
        console.log(userFoundByEmail)
        if(userFoundByEmail){
            return createGeneralResponse(false, "User already exists, Please login...", 403)
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await prisma.user.create({
            data: {name, email, password: hashedPassword}
        })

        return createGeneralResponse(true, "User created successfully...",201)
    } catch (error) {
        if (error instanceof Error){
            return createGeneralResponse(false, error.message, 500)
        }
        return createGeneralResponse(false, "Internal Server Error", 500)
    }
}