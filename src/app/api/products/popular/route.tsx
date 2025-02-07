import prisma from "@/lib/db"
import { NextResponse } from "next/server";

export const GET = async() => {
    try {
        const popularProducts = await prisma.product.findMany({
            take: 5,
            orderBy: { downloadCount: 'desc'},
            select: {
                id: true,
                title: true,
                slug: true,
                thumbnailImage: true,
                originalPrice: true,
                discountedPrice: true,
            },
        });

        return NextResponse.json({
            popularProducts
        },{
            status: 200
        })
    } catch(e){
        console.error(e);
        
        return NextResponse.json({
            error : "Failed to fetch popular products "
        },{
            status: 500
        });
    }
}