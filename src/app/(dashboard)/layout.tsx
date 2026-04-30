
import Navbar from "@/components/Navbar";
import { JWT_PAYLOAD } from "@/types";
import { getUser } from "@/utils/getUserDataFromToken";
import { redirect } from "next/navigation";

export default async function DashboardLayout(
    {children}: Readonly<{children: React.ReactNode}>

){
    const user: JWT_PAYLOAD | null = await getUser()
    if(!user) redirect("/login")
    
    return(
        <>
            <Navbar  userData={user}/>
            {children}
        </>
    )
}