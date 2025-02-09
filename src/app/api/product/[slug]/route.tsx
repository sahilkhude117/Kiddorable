// src/app/api/product/[productSlug]/route.ts
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params}: { params: { slug: string } }) => {
  try {
  
    const {slug} = await params;

    const product = await prisma.product.findUnique({
      where: { 
        slug: slug
    },
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

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { product },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
};