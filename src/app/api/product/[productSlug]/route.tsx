import prisma from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";


export const GET = async ({ params }: { params: { productSlug: string } }) => {
    try {
        const productSlug = params.productSlug;

        const  product = await prisma.product.findUnique({
            where: { slug: productSlug},
            select: {
                id: true,
                title: true,
                description: true,
                thumbnailImage: true,
                previewPages: true,
                originalPrice: true,
                discountedPrice: true,
                rating: true,
                downloadCount: true,
            },
        });

        if(!product){
            return NextResponse.json({
                error: "Product not found"
            },{
                status: 404
            })
        }

        return NextResponse.json({
            product
        },{
            status: 200
        })
    } catch (e) {
        console.error(e);

        return NextResponse.json({
            error: "failed to fetch product details"
        },{
            status: 500
        })
    }
}