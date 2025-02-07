import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async() => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            take: 5,
            orderBy: {createdAt: 'desc'},
            select: {
                name: true,
                profession: true,
                content: true,
            }
        })

        return NextResponse.json({
            testimonials
        },{
           status: 200
        })
    } catch(e){
        console.error(e);

        return NextResponse.json({
            error: "Failed to fetch testimonials"
        })
    }
}