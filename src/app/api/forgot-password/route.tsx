
import { v4 as uuidv4 } from 'uuid';
import { sendResetEmail } from '@/lib/email';
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import sendMail from '@/lib/test';


export const POST = async(req:Request) => {

    try {

        const body = await req.json()
        const {email} = body;
      // Find the user by email
      const user = await prisma.user.findUnique({ where: { email: email.trim() } });

      if (!user) {
        return NextResponse.json({ error: 'User not found' },{status: 400});
      }

      // Generate a unique token
      const token = uuidv4();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour

      // Save the token in the database
      await prisma.resetToken.create({
        data: {
          token,
          userId: user.id,
          expiresAt,
        },
      });

      // Generate the reset link
      const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${token}`;

      // Send the reset email
      // await sendResetEmail({ to: email, resetLink });
      await sendMail();

      return NextResponse.json({ message: 'Password reset link sent to your email' },{status: 200});
    } catch (error) {
      console.error('Error in forgot-password endpoint:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' },{status: 500});
    }
  }