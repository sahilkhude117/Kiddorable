// src/app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define allowed origins
const allowedOrigins = [
  'https://kiddorable.vercel.app', // Production frontend URL
  'http://localhost:3000',        // Local development URL
];

export function middleware(request: NextRequest) {
  // Get the origin of the request
  const origin = request.headers.get('origin');

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, {
      status: 204, // No content for OPTIONS requests
    });

    // Set CORS headers for preflight requests
    response.headers.set('Access-Control-Allow-Origin', origin || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  }

  // Allow requests without an origin (e.g., during ISR build)
  if (!origin) {
    return NextResponse.next();
  }

  // Check if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    const response = NextResponse.next();

    // Set CORS headers for actual requests
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