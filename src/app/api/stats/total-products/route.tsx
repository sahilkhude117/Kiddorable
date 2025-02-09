import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    const totalProducts = await prisma.product.count();

    if(!totalProducts){
      return NextResponse.json({
          totalProducts : "0"
      },{
          status: 200
      })
  }

    return NextResponse.json({totalProducts}, {
      status:200
    })
  } catch (e){
    console.error(e);
    
    return NextResponse.json({
      error: "Failed to fetch total products"
    },{
      status: 500
    });
  }
}