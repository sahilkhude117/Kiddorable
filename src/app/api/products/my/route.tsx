import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prisma from "@/lib/db";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";


export const GET = async () => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const user = session?.user;

    try{
        const myProducts = await prisma.purchase.findMany({
            where:{
                user: {
                    email: user?.email
                }
            },
            select:{
                purchasedAt: true,
                product:{
                    select: {
                        id: true,
                        title: true,
                        thumbnailImage: true,
                        driveLink: true,
                    }
                }
            }
        })

        return NextResponse.json({
            myProducts
        },{
            status:200
        })
    } catch(e) {
        console.log('Error', e);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: e,
      },
      {
        status: 500,
      }
    );
    }   
}