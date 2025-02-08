import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
    
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || "default",
        key_secret: process.env.RAZORPAY_SECRET_KEY || "default",
    })

    const body = await req.json();
    const { amount } = body;

    const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: `order_${Date.now()}`,
    }

    try {
        const order = await razorpay.orders.create(options);
        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}