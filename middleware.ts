import { JWT_PAYLOAD } from "@/types";
import { decryptToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
    try {
        const token = req.cookies.get("token")?.value
        console.log(token)
        if(token && req.nextUrl.pathname === "/login"){
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if(!token){
            return NextResponse.redirect(new URL("/login", req.url))
        }
        const decrypt: JWT_PAYLOAD | null = await decryptToken(token)
        if(!decrypt){
            return NextResponse.redirect(new URL("/login", req.url))
        }
        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
}

export const config = {
    matcher: ["/dashboard","/dashboard/:path*"]
}