import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


export const POST = async (req: Request) => {
    const body = await req.json();
    const {
        token,
        newPassword
    } = body;

    const resetToken = await prisma.resetToken.findUnique({
        where: {token},
        include: { user: true }
    })

    if (!resetToken || resetToken.expiresAt < new Date()) {
        return NextResponse.json({
            error: 'Invalid or expired token'
        },{
            status: 400
        })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id : resetToken.userId},
        data : { password: hashedPassword}
    })

    await prisma.resetToken.delete({ where: {
        id: resetToken.id
    }})

    return NextResponse.json({
        message: 'Password updated succesfully'
    })
}