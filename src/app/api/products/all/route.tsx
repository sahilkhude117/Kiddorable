import prisma from "@/lib/db"
import { NextResponse } from "next/server";

export const GET = async() => {
    try {
        const allProducts = await prisma.product.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                thumbnailImage: true,
                discountedPrice: true,
                originalPrice: true,
            },
        });

        return NextResponse.json({
            allProducts
        },{
            headers: {
                'Cache-Control': 'public, s-maxage=216000, stale-while-revalidate=59'
            },
        })
    } catch(e) {
        console.error(e);

        return NextResponse.json({
            error: "Failed to fetch all products"
        },{
            status: 500
        })
    }
}