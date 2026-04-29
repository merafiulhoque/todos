import { prisma } from "@/lib/prisma"
import { JWT_PAYLOAD } from "@/types"
import { comparePassword } from "@/utils/bcrypt"
import { createErrorResponse, createGeneralResponse, zodValidationErrorResponse } from "@/utils/createResponse"
import { generateToken } from "@/utils/jwt"
import { UserLoginSchema } from "@/validation"

export async function POST(req: Request) {
    const {email, password} = await req.json()
    const result = UserLoginSchema.safeParse({email, password})

    if(!result.success){
        console.log(result.error.flatten().fieldErrors)
        return zodValidationErrorResponse( 400, result.error.flatten().fieldErrors)
    }

    try {
        const userByEmail = await prisma.user.findUnique({
            where: {email}
        })
        if(!userByEmail){
            return createGeneralResponse(false, "invalid credentials",400)
        }
         const isPassCorrect = await comparePassword(password, userByEmail.password)
         if(!isPassCorrect){
            return createGeneralResponse(false, "invalid credentials",400)
         }
        const userData: JWT_PAYLOAD = {
            id: userByEmail.id,
            name: userByEmail.name,
            email: userByEmail.email
        }
        const token = generateToken(userData)
        const response = createGeneralResponse(true, "Login Successfull", 200)

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60*60*24*7 // 7 days in seconds
        })
        
        return response

    } catch (error) {
        return createErrorResponse(error)
    }
}
