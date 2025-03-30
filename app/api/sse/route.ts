/**
 * SSE Proxy Route
 * 
 * This file implements a proxy for SSE connections, redirecting requests to the appropriate MCP endpoint
 * based on the URL parameter.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get the target URL from the query parameters
  const url = req.nextUrl.searchParams.get('url');
  
  if (!url) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }
  
  try {
    // Parse the URL to extract the MCP endpoint
    const targetUrl = new URL(url);
    const path = targetUrl.pathname;
    
    // Create a new request to the target endpoint
    const response = await fetch(new URL(path, req.nextUrl.origin).toString(), {
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream',
      },
    });
    
    // Return the response with the appropriate headers for SSE
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (error) {
    console.error('Error proxying SSE request:', error);
    return new NextResponse('Error proxying request', { status: 500 });
  }
}
