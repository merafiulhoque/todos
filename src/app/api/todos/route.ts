import { prisma } from "@/lib/prisma";
import { createErrorResponse, createGeneralResponse } from "@/utils/createResponse";
import { decryptToken } from "@/utils/jwt";
import { logUserOutAfterDeletingCookie } from "@/utils/logUserOut";
import { NextRequest } from "next/server";
import _ from "lodash"

export async function GET(req: NextRequest){
    try {
        const token = req.cookies.get("token")?.value
        
        if(!token){
            return logUserOutAfterDeletingCookie(req)
        }
        const decryptData = await decryptToken(token)
        if(!decryptData || !decryptData.email || !decryptData.id){
            return logUserOutAfterDeletingCookie(req)
        }
        const {email} = decryptData
        const userByEmail = await prisma.user.findUnique({
            where: {email},
            select: {
                id: true,
                name: true,
                email: true,
                todos: true
            }
        })
        if(!userByEmail){
            return logUserOutAfterDeletingCookie(req)
        }
        return createGeneralResponse(true, "Posts fetched successfully", 200, userByEmail.todos)
    } catch (error) {
        return createErrorResponse(error)
    }
}

export async function POST(req: NextRequest){
    try {
        const {title, content}: {title: string, content: string} = await req.json()
        if(!title || !content){
            return createGeneralResponse(false, "Invalid input", 403)
        }
        const token = req.cookies.get("token")?.value
        if(!token) return logUserOutAfterDeletingCookie(req)
        const decryptData = await decryptToken(token)
        if(!decryptData || !decryptData.email || !decryptData.id) return logUserOutAfterDeletingCookie(req)
        
        const userById = await prisma.user.findUnique({
            where: {id: decryptData.id},
            select: {
                id: true,
                todos: true
            }
        })

        if(!userById) {
            return logUserOutAfterDeletingCookie(req)
        }

        const newTodo = await prisma.todo.create({
            data: {title, content, authorId: userById.id}
        })

        return createGeneralResponse(true, "Todo created successfully", 201)

    } catch (error) {
        return createErrorResponse(error)
    }
}

export async function PUT(req: NextRequest){
    try {
        const {id, title, content} = await req.json()
        const existingTodo = await prisma.todo.findUnique({
            where: {id},
            select: {
                id: true,
                title: true,
                content: true
            }
        })
        if(!existingTodo){
            return createGeneralResponse(false, "Invalid Id", 403)
        }
        if(_.isEqual({id, title, content}, existingTodo)){
            return createGeneralResponse(false, "No changes found to save...", 400)
        }
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: {title,content}
        })
        return createGeneralResponse(true, "Updated successfully...", 200)
    } catch (error) {
        return createErrorResponse(error)
    }
}

export async function DELETE(req: NextRequest){
    try {
        const {id} = await req.json()
        const todo = await prisma.todo.delete({
            where: {id}
        })

        if(!todo){
            createGeneralResponse(false, "No todos found", 400)
        }
        return createGeneralResponse(true, "Todo Deleted Successfully...", 200)
    } catch (error) {
        return createErrorResponse(error)
    }
}