/**
 * Zabbix MCP (Model Context Protocol) Implementation
 * 
 * This module implements the Model Context Protocol for Zabbix API integration.
 * It provides a standardized way for AI models to interact with Zabbix monitoring data.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from 'axios';

// Zabbix API client for making requests
class ZabbixClient {
  private url: string;
  private user: string;
  private password: string;
  private auth: string | null = null;
  private requestId = 1;

  constructor(config: { url: string; user: string; password: string }) {
    this.url = config.url;
    this.user = config.user;
    this.password = config.password;
  }

  /**
   * Login to the Zabbix API and get an authentication token
   */
  async login(): Promise<void> {
    try {
      const response = await this.request('user.login', {
        username: this.user,
        password: this.password
      }, false);

      if (response && response.result) {
        this.auth = response.result;
        console.log('Successfully logged in to Zabbix API');
      } else {
        throw new Error('Failed to authenticate with Zabbix API');
      }
    } catch (error) {
      console.error('Zabbix login error:', error);
      throw error;
    }
  }

  /**
   * Logout from the Zabbix API
   */
  async logout(): Promise<void> {
    if (!this.auth) return;

    try {
      await this.request('user.logout', {});
      this.auth = null;
      console.log('Successfully logged out from Zabbix API');
    } catch (error) {
      console.error('Zabbix logout error:', error);
    }
  }

  /**
   * Make a request to the Zabbix API
   */
  private async request(method: string, params: any, requireAuth = true): Promise<any> {
    const id = this.requestId++;
    const body = {
      jsonrpc: '2.0',
      method,
      params,
      id,
      auth: requireAuth ? this.auth : null
    };

    try {
      const response = await axios.post(this.url, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.error) {
        throw new Error(`Zabbix API error: ${JSON.stringify(response.data.error)}`);
      }

      return response.data;
    } catch (error) {
      console.error(`Zabbix API request error (${method}):`, error);
      throw error;
    }
  }

  // API methods that will be exposed through MCP
  async getHosts(params: any = {}): Promise<any> {
    const defaultParams = { output: 'extend', selectInterfaces: 'extend' };
    const response = await this.request('host.get', { ...defaultParams, ...params });
    return response.result;
  }

  async getItems(params: any = {}): Promise<any> {
    const defaultParams = { output: 'extend', selectHosts: 'extend' };
    const response = await this.request('item.get', { ...defaultParams, ...params });
    return response.result;
  }

  async getProblems(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      selectHosts: 'extend',
      selectTags: 'extend',
      recent: true,
      sortfield: ['eventid'],
      sortorder: 'DESC'
    };
    const response = await this.request('problem.get', { ...defaultParams, ...params });
    return response.result;
  }

  async getHistory(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      sortfield: 'clock',
      sortorder: 'DESC',
      history: 0
    };
    const response = await this.request('history.get', { ...defaultParams, ...params });
    return response.result;
  }

  async getTriggers(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      selectHosts: 'extend',
      selectDependencies: 'extend',
      expandDescription: true
    };
    const response = await this.request('trigger.get', { ...defaultParams, ...params });
    return response.result;
  }

  async getEvents(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      selectHosts: 'extend',
      sortfield: ['clock', 'eventid'],
      sortorder: 'DESC'
    };
    const response = await this.request('event.get', { ...defaultParams, ...params });
    return response.result;
  }

  async executeApiMethod(method: string, params: any = {}): Promise<any> {
    const response = await this.request(method, params);
    return response.result;
  }
}

// Create a function to initialize the Zabbix MCP server
export async function createZabbixMCP() {
  // Create the MCP server
  const server = new McpServer({
    name: "Zabbix MCP",
    version: "1.0.0"
  });

  // Create Zabbix client
  const client = new ZabbixClient({
    url: process.env.ZABBIX_API_URL || 'http://localhost:8080/api_jsonrpc.php',
    user: process.env.ZABBIX_USER || 'Admin',
    password: process.env.ZABBIX_PASSWORD || 'zabbix'
  });

  // Initialize the client
  await client.login();

  // Register cleanup handler
  process.on('beforeExit', async () => {
    await client.logout();
  });

  // Define MCP resources
  
  // Hosts resource
  server.resource(
    "hosts",
    "zabbix://hosts",
    async (uri) => {
      try {
        const hosts = await client.getHosts();
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify(hosts, null, 2)
          }]
        };
      } catch (error) {
        console.error("Error fetching hosts:", error);
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching hosts: ${error}`
          }]
        };
      }
    }
  );

  // Problems resource
  server.resource(
    "problems",
    "zabbix://problems",
    async (uri) => {
      try {
        const problems = await client.getProblems();
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify(problems, null, 2)
          }]
        };
      } catch (error) {
        console.error("Error fetching problems:", error);
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching problems: ${error}`
          }]
        };
      }
    }
  );

  // Define MCP tools

  // Get hosts tool
  server.tool(
    "getHosts",
    {
      filter: z.object({
        host: z.array(z.string()).optional(),
        status: z.array(z.string()).optional(),
        groupids: z.array(z.string()).optional()
      }).optional(),
      limit: z.number().optional()
    },
    async (params) => {
      try {
        const hosts = await client.getHosts(params);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(hosts, null, 2) 
          }]
        };
      } catch (error: any) {
        return {
          content: [{ 
            type: "text", 
            text: `Error: ${error.message}` 
          }],
          isError: true
        };
      }
    }
  );

  // Get items tool
  server.tool(
    "getItems",
    {
      hostids: z.array(z.string()).optional(),
      itemids: z.array(z.string()).optional(),
      limit: z.number().optional()
    },
    async (params) => {
      try {
        const items = await client.getItems(params);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(items, null, 2) 
          }]
        };
      } catch (error: any) {
        return {
          content: [{ 
            type: "text", 
            text: `Error: ${error.message}` 
          }],
          isError: true
        };
      }
    }
  );

  // Get problems tool
  server.tool(
    "getProblems",
    {
      hostids: z.array(z.string()).optional(),
      time_from: z.number().optional(),
      time_till: z.number().optional(),
      severities: z.array(z.number()).optional(),
      recent: z.boolean().optional(),
      limit: z.number().optional()
    },
    async (params) => {
      try {
        const problems = await client.getProblems(params);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(problems, null, 2) 
          }]
        };
      } catch (error: any) {
        return {
          content: [{ 
            type: "text", 
            text: `Error: ${error.message}` 
          }],
          isError: true
        };
      }
    }
  );

  // Get history tool
  server.tool(
    "getHistory",
    {
      itemids: z.array(z.string()),
      history: z.number().optional(),
      time_from: z.number().optional(),
      time_till: z.number().optional(),
      limit: z.number().optional()
    },
    async (params) => {
      try {
        const history = await client.getHistory(params);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(history, null, 2) 
          }]
        };
      } catch (error: any) {
        return {
          content: [{ 
            type: "text", 
            text: `Error: ${error.message}` 
          }],
          isError: true
        };
      }
    }
  );

  // Get triggers tool
  server.tool(
    "getTriggers",
    {
      triggerids: z.array(z.string()).optional(),
      hostids: z.array(z.string()).optional(),
      only_true: z.boolean().optional(),
      min_severity: z.number().optional(),
      limit: z.number().optional()
    },
    async (params) => {
      try {
        const triggers = await client.getTriggers(params);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(triggers, null, 2) 
          }]
        };
      } catch (error: any) {
        return {
          content: [{ 
            type: "text", 
            text: `Error: ${error.message}` 
          }],
          isError: true
        };
      }
    }
  );

  // Get events tool
  server.tool(
    "getEvents",
    {
      eventids: z.array(z.string()).optional(),
      hostids: z.array(z.string()).optional(),
      time_from: z.number().optional(),
      time_till: z.number().optional(),
      limit: z.number().optional()
    },
    async (params) => {
      try {
        const events = await client.getEvents(params);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(events, null, 2) 
          }]
        };
      } catch (error: any) {
        return {
          content: [{ 
            type: "text", 
            text: `Error: ${error.message}` 
          }],
          isError: true
        };
      }
    }
  );

  // Execute API method tool
  server.tool(
    "executeApiMethod",
    {
      method: z.string(),
      params: z.record(z.any()).optional()
    },
    async ({ method, params = {} }) => {
      try {
        const result = await client.executeApiMethod(method, params);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(result, null, 2) 
          }]
        };
      } catch (error: any) {
        return {
          content: [{ 
            type: "text", 
            text: `Error: ${error.message}` 
          }],
          isError: true
        };
      }
    }
  );

  // Define MCP prompts
  
  // Analyze problems prompt
  server.prompt(
    "analyzeProblems",
    {
      timeRange: z.string().optional()
    },
    (args) => {
      let promptText = "Please analyze the recent problems in our Zabbix monitoring system.";
      
      if (args.timeRange) {
        promptText += ` Focus on the time period: ${args.timeRange}.`;
      }
      
      promptText += " Identify patterns, suggest root causes, and recommend actions to resolve the issues.";
      
      return {
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: promptText
          }
        }]
      };
    }
  );

  return server;
}
