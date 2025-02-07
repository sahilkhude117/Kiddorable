import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    const totalUsers = await prisma.user.count();

    if(!totalUsers){
      return NextResponse.json({
          totalUsers : "0"
      },{
          status: 200
      })
  }

    return NextResponse.json({totalUsers}, {
      status:200
    })
  } catch (e){
    console.error(e);
    
    return NextResponse.json({
      error: "Failed to fetch total users"
    },{
      status: 500
    });
  }
}