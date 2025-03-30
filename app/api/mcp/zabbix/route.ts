/**
 * Zabbix MCP API Route
 * 
 * This file implements an API route that exposes the Zabbix MCP functionality
 * using Server-Sent Events (SSE) for real-time communication.
 */

import { NextRequest } from 'next/server';
import { createZabbixMCP } from '@/app/mcp/zabbix';
import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { ZabbixClient } from '@/app/mcp/zabbix/client';

// Global MCP server instance
let mcpServerPromise: Promise<any> | null = null;

// Handler for GET requests - establishes SSE connection
export async function GET(req: NextRequest) {
  // Create a TransformStream for SSE
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Initialize the Zabbix MCP server
  try {
    // Create or reuse the MCP server instance
    if (!mcpServerPromise) {
      mcpServerPromise = createZabbixMCP();
    }
    const mcpServer = await mcpServerPromise;
    
    // Write initial connection message
    await writer.write(encoder.encode('data: {"type":"connection","status":"established"}\n\n'));
    
    // Create a custom transport to handle communication between the MCP server and the client
    const transport: Transport = {
      start: async () => {
        // Already started with the initial connection message
      },
      
      send: async (message: any) => {
        try {
          await writer.write(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
        } catch (error: any) {
          console.error('Error sending message:', error);
        }
      },
      
      close: async () => {
        try {
          await writer.close();
        } catch (error: any) {
          console.error('Error closing transport:', error);
        }
      }
    };
    
    // Connect the MCP server to the transport
    mcpServer.connect(transport).catch((error: unknown) => {
      console.error('Error connecting to MCP server:', error);
    });
    
    // Return the response with the appropriate headers for SSE
    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (error: unknown) {
    console.error('Error initializing Zabbix MCP:', error);
    return new Response(JSON.stringify({ error: 'Failed to initialize Zabbix MCP' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Handler for POST requests - processes JSON-RPC requests
export async function POST(req: NextRequest) {
  let requestData: any;
  try {
    // Initialize the Zabbix MCP server if not already initialized
    if (!mcpServerPromise) {
      mcpServerPromise = createZabbixMCP();
    }
    const mcpServer = await mcpServerPromise;
    
    // Parse the request body
    requestData = await req.json();
    
    // Process the request manually since mcpServer doesn't have handleRequest
    if (requestData.method && requestData.jsonrpc === '2.0') {
      // Extract method and params from the request
      const { method, params, id } = requestData;
      
      // Create a response object
      const response: {
        jsonrpc: string;
        id: any;
        result?: any;
        error?: {
          code: number;
          message: string;
          data: string;
        };
      } = {
        jsonrpc: '2.0',
        id
      };
      
      try {
        // Call the appropriate method on the Zabbix client
        const client = new ZabbixClient({
          url: process.env.ZABBIX_API_URL || 'http://localhost:8080/api_jsonrpc.php',
          user: process.env.ZABBIX_USER || 'Admin',
          password: process.env.ZABBIX_PASSWORD || 'zabbix'
        });
        
        // Login to Zabbix API
        await client.login();
        
        // Call the method dynamically
        let result;
        switch (method) {
          case 'getHosts':
            result = await client.getHosts(params);
            break;
          case 'getProblems':
            result = await client.getProblems(params);
            break;
          case 'getItems':
            result = await client.getItems(params);
            break;
          case 'getTriggers':
            result = await client.getTriggers(params);
            break;
          case 'getEvents':
            result = await client.getEvents(params);
            break;
          default:
            throw new Error(`Method ${method} not supported`);
        }
        
        // Add result to response
        response.result = result;
        
        // Logout from Zabbix API
        await client.logout();
      } catch (error: any) {
        // Add error to response
        response.error = {
          code: -32603,
          message: error.message || 'Internal error',
          data: error.toString()
        };
      }
      
      // Return the response
      return new Response(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      throw new Error('Invalid JSON-RPC request');
    }
  } catch (error: any) {
    console.error('Error processing MCP request:', error);
    return new Response(JSON.stringify({
      jsonrpc: '2.0',
      id: requestData?.id || null,
      error: {
        code: -32603,
        message: 'Internal error',
        data: error instanceof Error ? error.message : String(error)
      }
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
