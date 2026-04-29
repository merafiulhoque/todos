import bcrypt from "bcryptjs";

export function hashPassword(password: string): Promise<string>{
    const hashedPassword = bcrypt.hash(password, 10)
    return hashedPassword
}

export async function comparePassword(pass: string, hashedPass: string): Promise<boolean>{
    const isPassCorrect: boolean = await bcrypt.compare(pass, hashedPass)
    return isPassCorrect
}