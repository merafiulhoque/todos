import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { decryptToken } from "@/utils/jwt"
import DashboardPage from "@/components/DashboardClient"
import { Todo } from "@/types"

export default async function page(){
  const token = (await cookies()).get("token")?.value

  if (!token) redirect("/login")

  const decrypt = await decryptToken(token)

  if (!decrypt) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: decrypt.email },
    select: { id: true, todos: true }
  })
  if(!user){
    redirect("/login")
  }
  const todos: Todo[] = await  prisma.todo.findMany({
    where: {authorId: user.id},
    select: {id: true, title: true, content: true}
  })

  if (!user) redirect("/login")

  return <DashboardPage initialTodos={user.todos}/>
}