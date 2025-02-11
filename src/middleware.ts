// src/app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define allowed origins
const allowedOrigins = [
  process.env.NEXT_PUBLIC_API_URL, // Production frontend URL
  'http://localhost:3000',        // Local development URL
];

export function middleware(request: NextRequest) {
  // Get the origin of the request
  const origin = request.headers.get('origin');

  // Check if the origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    const response = NextResponse.next();

    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  }

  // If the origin is not allowed, return a 403 Forbidden response
  return new NextResponse(null, {
    status: 403,
    statusText: 'Forbidden',
  });
}

// Match only API routes
export const config = {
  matcher: '/api/:path*', // Apply middleware only to API routes
};