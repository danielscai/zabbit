/**
 * AI API Route
 * 
 * This file implements an API route that connects the DeepSeek LLM (via OpenRouter) with the Zabbix MCP.
 * It processes user queries, retrieves relevant data from Zabbix, and returns AI-generated responses.
 */

import { NextRequest } from 'next/server';
import { getDeepSeekClient, DeepSeekMessage } from '@/app/lib/deepseek';
import { ZabbixClient } from '@/app/mcp/zabbix/client';

// System prompt for the AI
const SYSTEM_PROMPT = `
你是Zabbit监控系统的AI助手。你的角色是帮助用户分析监控数据、识别问题并根据Zabbix监控信息提供建议。
请始终基于提供的数据提供清晰、简洁和可操作的见解。
如果你生成图表或可视化内容，请解释它们代表什么以及可以从中得出哪些见解。
`;

// Handler for POST requests
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const requestData = await req.json();
    const { query } = requestData;
    
    if (!query || typeof query !== 'string') {
      return new Response(JSON.stringify({ error: '无效的查询参数' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Initialize the Zabbix client
    const zabbixClient = new ZabbixClient({
      url: process.env.ZABBIX_API_URL || 'http://localhost:8080/api_jsonrpc.php',
      user: process.env.ZABBIX_USER || 'Admin',
      password: process.env.ZABBIX_PASSWORD || 'zabbix'
    });
    
    // Login to Zabbix API
    await zabbixClient.login();
    
    // Fetch relevant data from Zabbix based on the query
    const zabbixData = await fetchRelevantZabbixData(zabbixClient, query);
    
    // Logout from Zabbix API
    await zabbixClient.logout();
    
    // Prepare messages for DeepSeek
    const messages: DeepSeekMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { 
        role: 'user', 
        content: `
我需要关于Zabbix监控系统的信息。以下是我的查询:
${query}

以下是从我的Zabbix监控系统中获取的相关数据:
${JSON.stringify(zabbixData, null, 2)}

请分析这些数据，并根据这些信息提供见解、建议或答案。
如果适当，描述任何有用的可视化内容（如图表或图形）。
如果你想生成图表，请使用格式 [VISUALIZATION:图表描述] 来标记。
`
      }
    ];
    
    // Get response from DeepSeek via OpenRouter
    const deepseekClient = getDeepSeekClient();
    const aiResponse = await deepseekClient.chat(messages, {
      temperature: 0.7,
      max_tokens: 2048
    });
    
    // Extract and process the response content
    const responseContent = aiResponse.choices[0]?.message.content || '';
    const processedResponse = processAIResponse(responseContent);
    
    // Return the response
    return new Response(JSON.stringify(processedResponse), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error processing AI request:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Function to fetch relevant data from Zabbix based on the query
async function fetchRelevantZabbixData(zabbixClient: ZabbixClient, query: string) {
  // Initialize data object
  const data: Record<string, any> = {};
  
  // Determine what data to fetch based on keywords in the query
  const queryLower = query.toLowerCase();
  
  // Fetch hosts data if relevant
  if (queryLower.includes('host') || queryLower.includes('server') || 
      queryLower.includes('system') || queryLower.includes('主机') || 
      queryLower.includes('服务器') || queryLower.includes('系统')) {
    data.hosts = await zabbixClient.getHosts({});
  }
  
  // Fetch problems data if relevant
  if (queryLower.includes('problem') || queryLower.includes('issue') || 
      queryLower.includes('alert') || queryLower.includes('alarm') || 
      queryLower.includes('warning') || queryLower.includes('error') ||
      queryLower.includes('问题') || queryLower.includes('告警') || 
      queryLower.includes('警告') || queryLower.includes('错误')) {
    data.problems = await zabbixClient.getProblems({ recent: true });
  }
  
  // Fetch triggers data if relevant
  if (queryLower.includes('trigger') || queryLower.includes('alert condition') ||
      queryLower.includes('触发器') || queryLower.includes('告警条件')) {
    data.triggers = await zabbixClient.getTriggers({ only_true: true });
  }
  
  // Fetch events data if relevant
  if (queryLower.includes('event') || queryLower.includes('history') || 
      queryLower.includes('log') || queryLower.includes('activity') ||
      queryLower.includes('事件') || queryLower.includes('历史') || 
      queryLower.includes('日志') || queryLower.includes('活动')) {
    data.events = await zabbixClient.getEvents({ limit: 20 });
  }
  
  // If no specific data was requested, fetch a summary of everything
  if (Object.keys(data).length === 0) {
    data.hosts = await zabbixClient.getHosts({});
    data.problems = await zabbixClient.getProblems({ recent: true });
    data.events = await zabbixClient.getEvents({ limit: 10 });
  }
  
  return data;
}

// Function to process the AI response and extract any visualization requests
function processAIResponse(responseText: string) {
  // Initialize response object
  const response: {
    text: string;
    images?: { url: string; alt: string; caption: string }[];
  } = {
    text: responseText
  };
  
  // Check for visualization markers in the response
  const visualizationRegex = /\[VISUALIZATION:([^\]]+)\]/g;
  let match;
  const visualizations = [];
  
  // Use a while loop instead of matchAll to avoid lint error
  while ((match = visualizationRegex.exec(responseText)) !== null) {
    visualizations.push(match);
  }
  
  if (visualizations.length > 0) {
    response.images = [];
    
    // For each visualization request, create a placeholder image
    for (const match of visualizations) {
      const description = match[1];
      
      // In a real implementation, you would generate actual visualizations here
      // For now, we'll use placeholder images
      const imageType = description.toLowerCase().includes('cpu') ? 'cpu-usage-graph' :
                        description.toLowerCase().includes('memory') || 
                        description.toLowerCase().includes('内存') ? 'memory-usage-graph' :
                        'network-connections';
      
      response.images.push({
        url: `/images/${imageType}.png`,
        alt: description,
        caption: description
      });
      
      // Remove the visualization marker from the text
      response.text = response.text.replace(match[0], '');
    }
  }
  
  // Clean up the response text
  response.text = response.text.trim();
  
  return response;
}
